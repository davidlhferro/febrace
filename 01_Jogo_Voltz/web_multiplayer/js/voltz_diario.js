/**
 * PORTAL VOLTZ — Módulo do Diário de Bordo Coletivo
 * Registra atas de desenvolvimento, playtests de bancada, testes de sala e exporta para Markdown e PDF/HTML.
 */

const DIARIO_INITIAL_ENTRIES = [
    {
        id: 'entry_01',
        date: '2026-08-25',
        type: 'Pesquisa & Epistemologia',
        title: 'Diagnóstico do Modelo Atenuativo e Desacoplamento do VOLTZ',
        author: 'David e Equipe',
        description: 'Revisão bibliográfica sobre as dificuldades no ensino de eletrodinâmica (McDermott, 1992; Engelhardt & Beichner, 2004). Identificação do modelo atenuativo sequencial como raiz dos bloqueios conceituais.',
        findings: 'Decisão de modelar a resistência por blocos físicos aditivos e transformar o Cabo Terra (GND) no gatilho de fechamento de malha.',
        actionItems: 'Construir os primeiros protótipos de cartas vetoriais sem clichês de IA.'
    },
    {
        id: 'entry_02',
        date: '2026-08-28',
        type: 'Auditoria Visual & Unslop',
        title: 'Rejeição Radical de AI-Slop e Adoção do Estilo Bandido/Helvetiq',
        author: 'Equipe de Design',
        description: 'Auditoria visual eliminou gradientes roxos genéricos, glassmorphism e caixas de wireframe. Adoção de tiles contínuos full-bleed com tubos de cobre de 10mm (48px) e alinhamento milimétrico.',
        findings: 'O estilo Bandido elimina a poluição de texto e força o raciocínio puramente topológico de continuidade do circuito.',
        actionItems: 'Exportar os 6 arquivos A4 em alta resolução para impressão física.'
    },
    {
        id: 'entry_03',
        date: '2026-08-30',
        type: 'Simulação Monte Carlo',
        title: 'Otimização Topológica de 2.000 Partidas e Matriz de 70 Cartas',
        author: 'David e João Vitor',
        description: 'Desenvolvimento do script de simulação Monte Carlo em Node.js. Testes revelaram que 70 cartas (padrão ouro Bandido) oferecem o equilíbrio ideal para 2, 3 e 4 jogadores.',
        findings: 'Taxa de vitória cooperativa de 98.5% com reserva de 24 cartas para absorver surtos de 24V e desarmes sem quebrar o jogo.',
        actionItems: 'Implementar a Central de Comando e Portal Web integrado.'
    }
];

class VoltzDiarioManager {
    constructor() {
        this.storageKey = 'voltz_diario_entries_v1';
        this.entries = this.loadEntries();
    }

    loadEntries() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) return JSON.parse(saved);
        } catch (e) {}
        return JSON.parse(JSON.stringify(DIARIO_INITIAL_ENTRIES));
    }

    saveEntries() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
        } catch (e) {}
    }

    addEntry(entry) {
        const newEntry = {
            id: 'entry_' + Date.now(),
            date: entry.date || new Date().toISOString().split('T')[0],
            type: entry.type || 'Playtest de Bancada',
            title: entry.title,
            author: entry.author || 'Pesquisador da Equipe',
            description: entry.description,
            findings: entry.findings || '',
            actionItems: entry.actionItems || ''
        };
        this.entries.unshift(newEntry);
        this.saveEntries();
        return newEntry;
    }

    deleteEntry(id) {
        this.entries = this.entries.filter(e => e.id !== id);
        this.saveEntries();
    }

    // Exportação para Markdown (.md)
    exportMarkdown() {
        let md = `# 📖 Diário de Bordo Oficial — Projeto VOLTZ (FEBRACE 2026)\n`;
        md += `**Registro Histórico e Atas de Desenvolvimento Científico**\n\n`;
        md += `*Data de Exportação: ${new Date().toLocaleDateString('pt-BR')}*\n\n---\n\n`;

        for (const entry of this.entries) {
            md += `## 📅 ${entry.date} — ${entry.title}\n`;
            md += `* **Tipo de Atividade**: \`${entry.type}\`\n`;
            md += `* **Pesquisador(es)**: ${entry.author}\n\n`;
            md += `### 📝 Descrição dos Fatos & Procedimentos:\n${entry.description}\n\n`;
            if (entry.findings) {
                md += `### 💡 Descobertas & Resultados:\n${entry.findings}\n\n`;
            }
            if (entry.actionItems) {
                md += `### 🎯 Encaminhamentos & Próximos Passos:\n${entry.actionItems}\n\n`;
            }
            md += `---\n\n`;
        }
        return md;
    }

    // Exportação para HTML Imprimível / PDF
    exportPrintableHTML() {
        return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Diário de Bordo Oficial — VOLTZ (FEBRACE)</title>
            <style>
                @page { size: A4; margin: 20mm; }
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; line-height: 1.6; }
                h1 { font-size: 22pt; text-align: center; margin-bottom: 4px; color: #0f172a; }
                .subtitle { text-align: center; color: #64748b; font-size: 11pt; margin-bottom: 24px; }
                .entry-card { border-bottom: 1px solid #cbd5e1; padding-bottom: 18px; margin-bottom: 22px; page-break-inside: avoid; }
                .entry-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 13pt; color: #b45309; }
                .entry-meta { font-size: 10pt; color: #475569; margin: 4px 0 12px 0; }
                .section-title { font-weight: bold; font-size: 10.5pt; color: #0f172a; margin-top: 8px; }
            </style>
        </head>
        <body>
            <h1>DIÁRIO DE BORDO OFICIAL</h1>
            <div class="subtitle">Projeto VOLTZ: Circuit Break — FEBRACE 2026</div>
            ${this.entries.map(e => `
                <div class="entry-card">
                    <div class="entry-header">${e.title}</div>
                    <div class="entry-meta">Data: ${e.date} | Categoria: ${e.type} | Autor: ${e.author}</div>
                    <div class="section-title">Procedimentos e Fatos:</div>
                    <p>${e.description}</p>
                    ${e.findings ? `<div class="section-title">Descobertas e Análises:</div><p>${e.findings}</p>` : ''}
                    ${e.actionItems ? `<div class="section-title">Próximos Passos:</div><p>${e.actionItems}</p>` : ''}
                </div>
            `).join('')}
        </body>
        </html>
        `;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzDiarioManager, DIARIO_INITIAL_ENTRIES };
}
