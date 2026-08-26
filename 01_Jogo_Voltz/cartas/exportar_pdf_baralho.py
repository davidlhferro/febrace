import os
import subprocess
import sys

def exportar_pdf():
    # Caminhos absolutos
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    html_path = os.path.join(base_dir, "cartas", "cartas_print_visual.html")
    output_dir = os.path.join(base_dir, "dist_print_and_play")
    os.makedirs(output_dir, exist_ok=True)
    pdf_path = os.path.join(output_dir, "VOLTZ_Baralho_54_Cartas_PrintAndPlay.pdf")

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

    cmd = [
        browser_exe,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        html_path
    ]

    print(f"Executando compilação do baralho com {os.path.basename(browser_exe)}...")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if os.path.exists(pdf_path) and os.path.getsize(pdf_path) > 1000:
        print(f"PDF do Baralho gerado com sucesso ({os.path.getsize(pdf_path)} bytes) em:")
        print(f"-> {pdf_path}")
        return True
    else:
        print(f"Erro ao gerar PDF: {result.stderr}")
        return False

if __name__ == "__main__":
    exportar_pdf()
