#!/usr/bin/env python3
"""
Compilador Automático de LaTeX e Diagramas TikZ para o Projeto VOLTZ (FEBRACE)

Este script localiza o arquivo LaTeX, identifica o compilador disponível no sistema 
(pdflatex, latexmk, xelatex, lualatex), realiza as passadas necessárias para 
resolver referências e TikZ, e limpa arquivos temporários.
"""

import os
import sys
import shutil
import subprocess
from pathlib import Path

# Configura encoding UTF-8 para o terminal Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

def find_latex_compiler():
    """Detecta qual compilador LaTeX está instalado no PATH do sistema."""
    compilers = ["pdflatex", "latexmk", "xelatex", "lualatex"]
    for comp in compilers:
        if shutil.which(comp):
            return comp
    return None

def clean_temp_files(base_path):
    """Remove arquivos auxiliares gerados pela compilação do TeX."""
    extensions = [".aux", ".log", ".out", ".toc", ".fls", ".fdb_latexmk", ".synctex.gz"]
    for ext in extensions:
        temp_file = base_path.with_suffix(ext)
        if temp_file.exists():
            try:
                temp_file.unlink()
                print(f"  [LIXO LIMPO] {temp_file.name}")
            except Exception as e:
                print(f"  [AVISO] Nao foi possivel remover {temp_file.name}: {e}")

def compile_tex(tex_path):
    """Compila o arquivo .tex para .pdf executando 2 passadas para TikZ/referências."""
    tex_path = Path(tex_path).resolve()
    if not tex_path.exists():
        print(f"[ERRO] Arquivo {tex_path} nao encontrado.")
        return False

    compiler = find_latex_compiler()
    if not compiler:
        print("[AVISO] Compilador LaTeX local (pdflatex/latexmk) nao encontrado no PATH.")
        print("  -> Para compilar localmente no Windows, instale o MiKTeX ou TeX Live:")
        print("     https://miktex.org/download  OU  https://www.tug.org/texlive/")
        print("  -> Alternativamente, abra e compile o arquivo METODOLOGIA_TESTES.tex diretamente no Overleaf (https://overleaf.com).")
        return False

    work_dir = tex_path.parent
    pdf_path = tex_path.with_suffix(".pdf")

    print(f"[COMPILANDO] '{tex_path.name}' usando '{compiler}'...")

    try:
        # Passada 1
        print("  [1/2] Executando Passada 1/2...")
        cmd = [compiler, "-interaction=nonstopmode", tex_path.name]
        result1 = subprocess.run(cmd, cwd=work_dir, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8', errors='replace')

        # Passada 2 (Garante renderização completa do TikZ e numerações)
        print("  [2/2] Executando Passada 2/2 (Referencias & TikZ)...")
        result2 = subprocess.run(cmd, cwd=work_dir, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8', errors='replace')

        if pdf_path.exists():
            print(f"[SUCESSO] PDF gerado com sucesso em: {pdf_path}")
            clean_temp_files(tex_path)
            return True
        else:
            print(f"[ERRO] Falha na geracao do PDF. Trecho do log de erro:")
            print(result2.stdout[-1000:] if result2.stdout else result2.stderr[-1000:])
            return False

    except Exception as e:
        print(f"[ERRO] Erro na execucao do comando: {e}")
        return False

if __name__ == "__main__":
    target_tex = Path(__file__).parent / "METODOLOGIA_TESTES.tex"
    print("=" * 65)
    print("COMPILADOR DE LATEX & DIAGRAMAS TIKZ - VOLTZ FEBRACE")
    print("=" * 65)
    success = compile_tex(target_tex)
    print("=" * 65)
    sys.exit(0 if success else 1)
