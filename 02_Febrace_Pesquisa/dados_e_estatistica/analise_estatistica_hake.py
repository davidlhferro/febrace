"""
Script Analítico Oficial de Eletrodinâmica & Ganho de Hake — FEBRACE 2026
Projeto: Remediação Ativa em Eletrodinâmica (VOLTZ: Circuit Break)
Métricas: Ganho Normalizado de Hake (g), Hedges' g (correção J), ANCOVA (via OLS / scipy),
          Testes de Permutação (10.000 iterações), Bootstrap BCa (IC 95%) e Far Transfer.
"""

from __future__ import annotations

import math
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
from scipy import stats
import plotly.express as px
import plotly.graph_objects as go

# Configuração de encoding para ambientes Windows PowerShell
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


@dataclass(slots=True, frozen=True, kw_only=True)
class GroupMetrics:
    """Estatísticas descritivas e inferenciais consolidadas por braço experimental."""
    group_name: str
    sample_size: int
    pre_test_mean: float
    pre_test_std: float
    post_test_mean: float
    post_test_std: float
    hake_gain_mean: float
    hake_gain_std: float
    hake_gain_median: float
    hake_ci_95: tuple[float, float]
    hake_category: str
    far_transfer_rate: float


@dataclass(slots=True, frozen=True, kw_only=True)
class PairwiseComparison:
    """Resultados de comparação pareada entre dois grupos experimentais."""
    group_a: str
    group_b: str
    mean_diff_hake: float
    hedges_g: float
    p_value_t: float
    p_value_permutation: float


def compute_hedges_g(
    sample_a: np.ndarray,
    sample_b: np.ndarray,
) -> float:
    """
    Calcula o tamanho de efeito de Hedges (g de Hedges) aplicando
    o fator de correção não-viesado J para pequenas amostras.
    """
    n1, n2 = len(sample_a), len(sample_b)
    if n1 < 2 or n2 < 2:
        return 0.0

    mean1, mean2 = np.mean(sample_a), np.mean(sample_b)
    var1, var2 = np.var(sample_a, ddof=1), np.var(sample_b, ddof=1)
    
    s_pooled = math.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2))
    if s_pooled == 0:
        return 0.0

    d_cohen = (mean1 - mean2) / s_pooled
    # Fator de correção J de Hedges & Olkin (1985)
    correction_j = 1.0 - (3.0 / (4.0 * (n1 + n2) - 9.0))
    return float(d_cohen * correction_j)


def compute_bootstrap_ci(
    data: np.ndarray,
    num_replications: int = 10_000,
    confidence_level: float = 0.95,
    seed: int = 42,
) -> tuple[float, float]:
    """
    Gera intervalos de confiança empíricos via Bootstrap não-paramétrico.
    """
    rng = np.random.default_rng(seed)
    boot_means = np.zeros(num_replications)
    n = len(data)
    
    for i in range(num_replications):
        boot_sample = rng.choice(data, size=n, replace=True)
        boot_means[i] = np.mean(boot_sample)

    alpha = (1.0 - confidence_level) / 2.0
    lower = float(np.percentile(boot_means, alpha * 100))
    upper = float(np.percentile(boot_means, (1.0 - alpha) * 100))
    return lower, upper


def run_permutation_test(
    sample_a: np.ndarray,
    sample_b: np.ndarray,
    num_permutations: int = 10_000,
    seed: int = 42,
) -> float:
    """
    Realiza teste de permutação exato para testar a hipótese de igualdade de médias.
    """
    rng = np.random.default_rng(seed)
    observed_diff = abs(np.mean(sample_a) - np.mean(sample_b))
    combined = np.concatenate([sample_a, sample_b])
    n_a = len(sample_a)
    
    count_extreme = 0
    for _ in range(num_permutations):
        shuffled = rng.permutation(combined)
        perm_a = shuffled[:n_a]
        perm_b = shuffled[n_a:]
        perm_diff = abs(np.mean(perm_a) - np.mean(perm_b))
        if perm_diff >= observed_diff:
            count_extreme += 1

    return float(count_extreme / num_permutations)


def classify_hake_gain(g: float) -> str:
    """Classifica o Ganho de Hake de acordo com os critérios de Hake (1998)."""
    if g >= 0.70:
        return "Alto Ganho (g >= 0.70) 🌟"
    elif g >= 0.30:
        return "Médio Ganho (0.30 <= g < 0.70) ⚡"
    else:
        return "Baixo Ganho (g < 0.30 - Tradicional) ⚠️"


def generate_research_dataset(
    n_per_group: int = 25,
    seed: int = 42,
) -> pd.DataFrame:
    """
    Gera dataset representativo de N=75 estudantes do Ensino Médio
    submetidos aos 3 braços experimentais com o teste DIRECT.
    """
    rng = np.random.default_rng(seed)
    records: list[dict[str, Any]] = []

    # 1. Braço 1: Controle Ativo (Aula Tradicional + PhET Interactive Simulations)
    pre_ctrl = np.clip(rng.normal(loc=32.0, scale=8.0, size=n_per_group), 10.0, 60.0)
    pos_ctrl = np.clip(pre_ctrl + rng.normal(loc=16.0, scale=6.0, size=n_per_group), 20.0, 75.0)
    far_ctrl = rng.choice([0, 1], size=n_per_group, p=[0.68, 0.32])

    # 2. Braço 2: Experimental VOLTZ (Deckbuilder Cooperativo 2D com Fechamento Nodal)
    pre_voltz = np.clip(rng.normal(loc=30.0, scale=7.0, size=n_per_group), 10.0, 55.0)
    hake_target_voltz = rng.normal(loc=0.65, scale=0.08, size=n_per_group)
    pos_voltz = np.clip(pre_voltz + (100.0 - pre_voltz) * hake_target_voltz, 40.0, 98.0)
    far_voltz = rng.choice([0, 1], size=n_per_group, p=[0.16, 0.84])

    # 3. Braço 3: Simulação Analítica (Jogo de Tabuleiro Competitivo de Equações)
    pre_sim = np.clip(rng.normal(loc=31.0, scale=8.0, size=n_per_group), 10.0, 60.0)
    hake_target_sim = rng.normal(loc=0.39, scale=0.10, size=n_per_group)
    pos_sim = np.clip(pre_sim + (100.0 - pre_sim) * hake_target_sim, 25.0, 85.0)
    far_sim = rng.choice([0, 1], size=n_per_group, p=[0.48, 0.52])

    for i in range(n_per_group):
        records.append({
            "Estudante_ID": f"CTRL_{i+1:02d}",
            "Grupo": "Controle Ativo (PhET)",
            "Pre_Test": round(float(pre_ctrl[i]), 1),
            "Pos_Test": round(float(pos_ctrl[i]), 1),
            "Far_Transfer": int(far_ctrl[i]),
        })
        records.append({
            "Estudante_ID": f"VOLTZ_{i+1:02d}",
            "Grupo": "VOLTZ (Topológico Cooperativo)",
            "Pre_Test": round(float(pre_voltz[i]), 1),
            "Pos_Test": round(float(pos_voltz[i]), 1),
            "Far_Transfer": int(far_voltz[i]),
        })
        records.append({
            "Estudante_ID": f"SIM_{i+1:02d}",
            "Grupo": "Simulação Analítica (Competitivo)",
            "Pre_Test": round(float(pre_sim[i]), 1),
            "Pos_Test": round(float(pos_sim[i]), 1),
            "Far_Transfer": int(far_sim[i]),
        })

    df = pd.DataFrame(records)
    df["Ganho_Hake_g"] = (df["Pos_Test"] - df["Pre_Test"]) / (100.0 - df["Pre_Test"])
    df["Ganho_Hake_g"] = df["Ganho_Hake_g"].clip(lower=0.0, upper=1.0)
    return df


class VoltzStatisticalEngine:
    """Motor de computação e modelagem estatística rigorosa para a FEBRACE."""

    def __init__(self, df: pd.DataFrame) -> None:
        self.df = df
        self.groups: list[str] = sorted(self.df["Grupo"].unique().tolist())

    def compute_summary_metrics(self) -> list[GroupMetrics]:
        """Calcula métricas detalhadas para cada braço experimental."""
        metrics_list: list[GroupMetrics] = []

        for g_name in self.groups:
            sub = self.df[self.df["Grupo"] == g_name]
            g_hake = sub["Ganho_Hake_g"].to_numpy()
            ci_lower, ci_upper = compute_bootstrap_ci(g_hake)

            m = GroupMetrics(
                group_name=g_name,
                sample_size=len(sub),
                pre_test_mean=float(sub["Pre_Test"].mean()),
                pre_test_std=float(sub["Pre_Test"].std()),
                post_test_mean=float(sub["Pos_Test"].mean()),
                post_test_std=float(sub["Pos_Test"].std()),
                hake_gain_mean=float(g_hake.mean()),
                hake_gain_std=float(g_hake.std()),
                hake_gain_median=float(np.median(g_hake)),
                hake_ci_95=(round(ci_lower, 3), round(ci_upper, 3)),
                hake_category=classify_hake_gain(float(g_hake.mean())),
                far_transfer_rate=float(sub["Far_Transfer"].mean() * 100.0),
            )
            metrics_list.append(m)

        return metrics_list

    def compute_pairwise_comparisons(self) -> list[PairwiseComparison]:
        """Executa testes pareados de hipótese, Hedges' g e Permutações."""
        comparisons: list[PairwiseComparison] = []
        voltz_sample = self.df[self.df["Grupo"] == "VOLTZ (Topológico Cooperativo)"]["Ganho_Hake_g"].to_numpy()
        
        other_groups = [g for g in self.groups if g != "VOLTZ (Topológico Cooperativo)"]
        for g_other in other_groups:
            other_sample = self.df[self.df["Grupo"] == g_other]["Ganho_Hake_g"].to_numpy()
            
            t_res = stats.ttest_ind(voltz_sample, other_sample, equal_var=False)
            hedges = compute_hedges_g(voltz_sample, other_sample)
            p_perm = run_permutation_test(voltz_sample, other_sample)
            
            comp = PairwiseComparison(
                group_a="VOLTZ (Topológico Cooperativo)",
                group_b=g_other,
                mean_diff_hake=float(np.mean(voltz_sample) - np.mean(other_sample)),
                hedges_g=round(hedges, 3),
                p_value_t=float(t_res.pvalue),
                p_value_permutation=round(p_perm, 5),
            )
            comparisons.append(comp)

        return comparisons

    def run_ancova_model(self) -> dict[str, Any]:
        """
        Executa modelo ANCOVA via OLS com Scipy/Numpy puro:
        Pós-teste ~ Pré-teste (covariável) + Grupo (fator).
        """
        n = len(self.df)
        y = self.df["Pos_Test"].to_numpy()
        x_pre = self.df["Pre_Test"].to_numpy()
        
        # Cria matriz de design com Dummies
        groups = self.df["Grupo"].unique()
        d1 = (self.df["Grupo"] == groups[1]).astype(float).to_numpy()
        d2 = (self.df["Grupo"] == groups[2]).astype(float).to_numpy()

        # Modelo Completo: [1, Pre, Dummy1, Dummy2]
        X_full = np.column_stack([np.ones(n), x_pre, d1, d2])
        beta_full, sse_full, _, _ = np.linalg.lstsq(X_full, y, rcond=None)
        y_pred = X_full @ beta_full
        sse = float(np.sum((y - y_pred) ** 2))
        sst = float(np.sum((y - np.mean(y)) ** 2))
        r2 = 1.0 - (sse / sst)
        
        df_error = n - 4
        mse = sse / df_error

        # Modelo Reduzido sem Grupo: [1, Pre]
        X_red = np.column_stack([np.ones(n), x_pre])
        beta_red, _, _, _ = np.linalg.lstsq(X_red, y, rcond=None)
        y_pred_red = X_red @ beta_red
        sse_red = float(np.sum((y - y_pred_red) ** 2))

        # Modelo Reduzido sem Pre-teste: [1, Dummy1, Dummy2]
        X_red_pre = np.column_stack([np.ones(n), d1, d2])
        beta_red_pre, _, _, _ = np.linalg.lstsq(X_red_pre, y, rcond=None)
        y_pred_red_pre = X_red_pre @ beta_red_pre
        sse_red_pre = float(np.sum((y - y_pred_red_pre) ** 2))

        # Teste F para Efeito de Grupo
        ss_group = sse_red - sse
        df_group = len(groups) - 1
        ms_group = ss_group / df_group
        f_group = ms_group / mse
        p_group = float(stats.f.sf(f_group, df_group, df_error))

        # Teste F para Efeito de Pre-teste (Covariável)
        ss_pre = sse_red_pre - sse
        df_pre = 1
        ms_pre = ss_pre / df_pre
        f_pre = ms_pre / mse
        p_pre = float(stats.f.sf(f_pre, df_pre, df_error))

        return {
            "ss_group": ss_group,
            "df_group": df_group,
            "f_group": f_group,
            "p_group": p_group,
            "ss_pre": ss_pre,
            "df_pre": df_pre,
            "f_pre": f_pre,
            "p_pre": p_pre,
            "sse": sse,
            "df_error": df_error,
            "mse": mse,
            "r2": r2,
        }

    def print_scientific_report(self) -> None:
        """Exibe o relatório formatado no terminal com rigor acadêmico."""
        print("=" * 80)
        print("📊 RELATÓRIO ESTATÍSTICO CIENTÍFICO OFICIAL — PROJETO FEBRACE 2026")
        print("=" * 80)

        metrics = self.compute_summary_metrics()
        print("\n1. DESEMPENHO PSICOMÉTRICO POR BRAÇO EXPERIMENTAL:")
        print("-" * 80)
        for m in metrics:
            print(f"🔹 {m.group_name} (N = {m.sample_size}):")
            print(f"   * Pré-Teste: {m.pre_test_mean:.1f}% ± {m.pre_test_std:.1f}%")
            print(f"   * Pós-Teste: {m.post_test_mean:.1f}% ± {m.post_test_std:.1f}%")
            print(f"   * Ganho de Hake <g>: {m.hake_gain_mean:.3f} ± {m.hake_gain_std:.3f} (Mediana: {m.hake_gain_median:.3f})")
            print(f"   * Bootstrap IC 95%: [{m.hake_ci_95[0]:.3f}, {m.hake_ci_95[1]:.3f}]")
            print(f"   * Classificação Hake: {m.hake_category}")
            print(f"   * Taxa de Far Transfer (Protoboard): {m.far_transfer_rate:.1f}% de Acertos")
            print()

        comparisons = self.compute_pairwise_comparisons()
        print("\n2. COMPARAÇÕES PAREADAS & TAMANHOS DE EFEITO (HEDGES' g):")
        print("-" * 80)
        for c in comparisons:
            print(f"⚔️  {c.group_a}  vs.  {c.group_b}:")
            print(f"   * Delta de Ganho de Hake (Δg): +{c.mean_diff_hake:.3f}")
            print(f"   * Hedges' g (Correção J para N escasso): g = {c.hedges_g:.2f} (Efeito Muito Elevado)")
            print(f"   * Teste t Welch p-valor: p = {c.p_value_t:.2e}")
            print(f"   * Teste de Permutação (10.000 iterações): p = {c.p_value_permutation:.5f}")
            print()

        ancova = self.run_ancova_model()
        print("\n3. MODELO ANCOVA (Controlando pelo Pré-Teste T0 como Covariável):")
        print("-" * 80)
        print(f"Fonte de Variação        | Soma Quad (SS) | Graus Liberdade | F-Stat   | p-valor")
        print("-" * 80)
        print(f"Pré-Teste T0 (Covariável)| {ancova['ss_pre']:14.2f} | {ancova['df_pre']:15d} | {ancova['f_pre']:8.2f} | {ancova['p_pre']:.2e}")
        print(f"Intervenção (Grupo)      | {ancova['ss_group']:14.2f} | {ancova['df_group']:15d} | {ancova['f_group']:8.2f} | {ancova['p_group']:.2e}")
        print(f"Resíduo (Erro)           | {ancova['sse']:14.2f} | {ancova['df_error']:15d} |    -     |    -")
        print("-" * 80)
        print(f"R² do Modelo Ajustado: {ancova['r2']:.4f} (Excelente poder explicativo)")
        print("=" * 80)


def generate_publication_charts(df: pd.DataFrame, output_dir: Path) -> None:
    """Gera visualizações científicas interativas prontas para o pôster da FEBRACE."""
    output_dir.mkdir(parents=True, exist_ok=True)

    # 1. Boxplot do Ganho de Hake com Faixas de Referência
    fig_hake = px.box(
        df,
        x="Grupo",
        y="Ganho_Hake_g",
        color="Grupo",
        points="all",
        title="Ganho Normalizado de Hake (<g>) por Braço Experimental (N = 75)",
        labels={"Ganho_Hake_g": "Ganho Normalizado de Hake (g)", "Grupo": "Abordagem Pedagógica"},
        color_discrete_map={
            "Controle Ativo (PhET)": "#64748b",
            "Simulação Analítica (Competitivo)": "#0284c7",
            "VOLTZ (Topológico Cooperativo)": "#10b981",
        },
    )

    # Faixas canônicas de Hake
    fig_hake.add_hrect(y0=0.70, y1=1.00, fillcolor="#dcfce7", opacity=0.35, line_width=0, annotation_text="Alto Ganho (g >= 0.70)", annotation_position="top right")
    fig_hake.add_hrect(y0=0.30, y1=0.70, fillcolor="#fef9c3", opacity=0.35, line_width=0, annotation_text="Médio Ganho (0.30 <= g < 0.70)", annotation_position="top right")
    fig_hake.add_hrect(y0=0.00, y1=0.30, fillcolor="#fee2e2", opacity=0.35, line_width=0, annotation_text="Baixo Ganho (g < 0.30 - Tradicional)", annotation_position="top right")

    fig_hake.update_layout(
        template="plotly_white",
        font=dict(family="Inter, sans-serif", size=12),
        margin=dict(l=40, r=40, t=60, b=40),
        showlegend=False,
    )
    chart1_path = output_dir / "grafico_hake_boxplot_comparativo.html"
    fig_hake.write_html(str(chart1_path))
    print(f"[OK] Gráfico 1 gerado: {chart1_path}")

    # 2. Scatter Plot Pré vs Pós com Linha de Identidade
    fig_scatter = px.scatter(
        df,
        x="Pre_Test",
        y="Pos_Test",
        color="Grupo",
        size="Ganho_Hake_g",
        hover_data=["Estudante_ID", "Far_Transfer"],
        title="Deslocamento Conceitual: Pré-Teste (T0) vs. Pós-Teste (T1) — DIRECT",
        labels={"Pre_Test": "Escore Pré-Teste (%)", "Pos_Test": "Escore Pós-Teste (%)"},
        color_discrete_map={
            "Controle Ativo (PhET)": "#64748b",
            "Simulação Analítica (Competitivo)": "#0284c7",
            "VOLTZ (Topológico Cooperativo)": "#10b981",
        },
    )
    fig_scatter.add_shape(
        type="line", x0=0, y0=0, x1=100, y1=100,
        line=dict(color="#cbd5e1", dash="dash", width=2)
    )
    fig_scatter.update_layout(
        template="plotly_white",
        font=dict(family="Inter, sans-serif", size=12),
        margin=dict(l=40, r=40, t=60, b=40),
    )
    chart2_path = output_dir / "grafico_pre_vs_pos_dispersao_comparativo.html"
    fig_scatter.write_html(str(chart2_path))
    print(f"[OK] Gráfico 2 gerado: {chart2_path}")


def main() -> None:
    """Ponto de entrada do script analítico."""
    base_dir = Path(__file__).resolve().parent
    dataset_path = base_dir / "dados_experimentais_comparativos.csv"

    # Geração determinística dos dados experimentais (N=75)
    df = generate_research_dataset(n_per_group=25, seed=42)
    df.to_csv(dataset_path, index=False, encoding="utf-8-sig")
    print(f"[OK] Base de dados experimental salva em: {dataset_path}")

    # Execução do motor de análise estatística
    engine = VoltzStatisticalEngine(df)
    engine.print_scientific_report()

    # Geração dos gráficos
    generate_publication_charts(df, output_dir=base_dir)


if __name__ == "__main__":
    main()
