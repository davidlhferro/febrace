import os
import subprocess
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def exportar_pdfs():
    # Caminhos absolutos
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    cartas_dir = os.path.join(base_dir, "cartas")
    output_dir = os.path.join(base_dir, "dist_print_and_play")
    os.makedirs(output_dir, exist_ok=True)

    # Localizar Microsoft Edge ou Chrome
    edge_paths = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
    ]
    
    browser_exe = None
    for p in edge_paths:
        if os.path.exists(p):
            browser_exe = p
            break

    if not browser_exe:
        print("Erro: Navegador compatível (Edge ou Chrome) não encontrado para compilação headless.")
        return False

    targets = [
        {
            "html": os.path.join(cartas_dir, "cartas_print_visual.html"),
            "pdf": os.path.join(output_dir, "VOLTZ_Baralho_54_Cartas_PrintAndPlay.pdf"),
            "desc": "Frente do Baralho (54 Cartas em 6 Páginas A4)"
        },
        {
            "html": os.path.join(cartas_dir, "verso_cartas_a4.html"),
            "pdf": os.path.join(output_dir, "VOLTZ_Verso_Oficial_A4.pdf"),
            "desc": "Verso Oficial do Baralho (Card Back Anti-Cheat A4)"
        }
    ]

    for t in targets:
        cmd = [
            browser_exe,
            "--headless",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={t['pdf']}",
            t['html']
        ]

        print(f"\n[Compilando {t['desc']}]...")
        result = subprocess.run(cmd, capture_output=True, text=True)

        if os.path.exists(t['pdf']) and os.path.getsize(t['pdf']) > 1000:
            print(f"✅ {t['desc']} gerado com sucesso ({os.path.getsize(t['pdf'])} bytes) em:")
            print(f"   -> {t['pdf']}")
        else:
            print(f"❌ Erro ao gerar {t['desc']}: {result.stderr}")
            return False

    return True

if __name__ == "__main__":
    exportar_pdfs()
