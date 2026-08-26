import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

# --- PALETA DE CORES PROFISSIONAL VOLTZ ---
COLOR_PRIMARY = colors.HexColor("#0f172a")      # Slate 900 (Azul Marinho Quase Preto)
COLOR_SECONDARY = colors.HexColor("#059669")    # Verde Esmeralda Técnico
COLOR_ACCENT = colors.HexColor("#0284c7")       # Azul Elétrico
COLOR_YELLOW = colors.HexColor("#d97706")       # Âmbar / Laranja Volts
COLOR_RED = colors.HexColor("#dc2626")          # Vermelho Alerta
COLOR_DARK_TEXT = colors.HexColor("#1e293b")    # Slate 800
COLOR_LIGHT_BG = colors.HexColor("#f8fafc")     # Slate 50
COLOR_BORDER = colors.HexColor("#cbd5e1")       # Slate 300

# --- CANVAS PARA CABEÇALHO E RODAPÉ ---
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super().showPage()
        super().save()

    def draw_header_footer(self, page_count):
        self.saveState()
        
        # Cabeçalho Superior (Apenas a partir da página 2)
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(COLOR_SECONDARY)
            self.drawString(2 * cm, 28.3 * cm, "VOLTZ: CIRCUIT BREAK")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawRightString(19 * cm, 28.3 * cm, "MANUAL OFICIAL DE REGRAS & GUIA RÁPIDO")
            
            self.setStrokeColor(COLOR_BORDER)
            self.setLineWidth(0.5)
            self.line(2 * cm, 28.1 * cm, 19 * cm, 28.1 * cm)
        
        # Rodapé Inferior em todas as páginas
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.5)
        self.line(2 * cm, 1.8 * cm, 19 * cm, 1.8 * cm)
        
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(2 * cm, 1.4 * cm, "VOLTZ: Circuit Break • Jogo de Cartas Cooperativo de Engenharia Elétrica • Licença CC BY-NC 4.0")
        self.drawRightString(19 * cm, 1.4 * cm, f"Página {self._pageNumber} de {page_count}")
        
        self.restoreState()


def build_pdf():
    # Diretório de destino limpo na pasta Print-and-Play
    output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "dist_print_and_play"))
    os.makedirs(output_dir, exist_ok=True)
    pdf_path = os.path.join(output_dir, "VOLTZ_Manual_de_Regras.pdf")

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2.2 * cm,
        bottomMargin=2.2 * cm
    )

    styles = getSampleStyleSheet()

    # --- ESTILOS TIPOGRÁFICOS ---
    title_style = ParagraphStyle(
        'MainTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=COLOR_PRIMARY,
        spaceAfter=3
    )

    subtitle_style = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=COLOR_SECONDARY,
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=COLOR_PRIMARY,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=COLOR_SECONDARY,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=COLOR_DARK_TEXT,
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=COLOR_DARK_TEXT,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=COLOR_PRIMARY
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
        alignment=1 # Centralizado
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=COLOR_DARK_TEXT
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=COLOR_PRIMARY
    )

    story = []

    # =========================================================================
    # PÁGINA 1: CAPA & VISÃO GERAL & GUIA RÁPIDO DE MESA
    # =========================================================================
    story.append(Paragraph("VOLTZ: CIRCUIT BREAK", title_style))
    story.append(Paragraph("MANUAL OFICIAL DE REGRAS & GUIA DE ENGENHARIA ELÉTRICA", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=COLOR_SECONDARY, spaceAfter=10, spaceBefore=0))

    # Box de Visão Geral do Jogo
    meta_content = [
        [Paragraph("<b>Modalidade:</b>", table_cell_bold), Paragraph("100% Cooperativo (2 a 4 Jogadores)", table_cell_style),
         Paragraph("<b>Duração Média:</b>", table_cell_bold), Paragraph("15 a 25 Minutos", table_cell_style)],
        [Paragraph("<b>Faixa Etária:</b>", table_cell_bold), Paragraph("12+ Anos", table_cell_style),
         Paragraph("<b>Objetivo:</b>", table_cell_bold), Paragraph("Salvar os 4 setores da cidade antes que a energia acabe", table_cell_style)]
    ]
    t_meta = Table(meta_content, colWidths=[2.8 * cm, 5.7 * cm, 2.8 * cm, 5.7 * cm])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 1, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 0.3 * cm))

    # Seção 1: Conceito do Jogo
    story.append(Paragraph("1. O Conceito do Jogo (Em 30 Segundos!)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=COLOR_PRIMARY, spaceAfter=6))
    
    story.append(Paragraph(
        "Você e seus colegas são <b>Engenheiros de Contingência Elétrica</b> convocados para restabelecer a infraestrutura de uma metrópole após um blecaute crítico. "
        "O <b>Gerador Central de 12V</b> fornece energia contínua através de 4 portas radiais. As cartas do VOLTZ funcionam como <b>módulos de circuito impresso com trilhas condutoras borda a borda (estilo Bandido / PCB)</b>: ao baixar cartas na mesa, sua equipe alinha fisicamente os fios condutores das cartas para estender a rede até os equipamentos, finalizando cada ramo com o <b>Cabo Terra (GND - 0V)</b>. "
        "No modelo de blocos de energia [ ■ ] (onde 1 Ohm = 1 Bloco), a tensão total de 12V é dividida proporcionalmente pela resistência total do caminho. Para o equipamento ligar sem queimar, a contagem de blocos em linha deve atingir exatamente a meta exigida!",
        body_style
    ))

    story.append(Spacer(1, 0.2 * cm))

    # Seção 2: Tabela de Mesa (Player Aid)
    story.append(Paragraph("2. Guia Rápido de Mesa (Player Aid / Tabela de Conversão)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=COLOR_PRIMARY, spaceAfter=6))
    story.append(Paragraph("<i>Deixe esta tabela no centro da mesa para consulta rápida durante a partida.</i>", body_style))

    cheat_data = [
        [
            Paragraph("EQUIPAMENTO", table_header_style),
            Paragraph("TENSÃO NOMINAL (Vnom)", table_header_style),
            Paragraph("RESISTÊNCIA INTERNA", table_header_style),
            Paragraph("META TOTAL DO RAMO (🎯)", table_header_style),
            Paragraph("STATUS DE FUNCIONAMENTO", table_header_style)
        ],
        [
            Paragraph("<b>Sirene de Alerta</b>", table_cell_bold),
            Paragraph("6 Volts", table_cell_style),
            Paragraph("1Ω [ ■ ]", table_cell_style),
            Paragraph("<b>🎯 2 Blocos Totais</b>", table_cell_bold),
            Paragraph("12V / 2 = 6V (Exige 1Ω externo)", table_cell_style)
        ],
        [
            Paragraph("<b>Servidor Central</b>", table_cell_bold),
            Paragraph("4 Volts", table_cell_style),
            Paragraph("1Ω [ ■ ]", table_cell_style),
            Paragraph("<b>🎯 3 Blocos Totais</b>", table_cell_bold),
            Paragraph("12V / 3 = 4V (Exige 2Ω externo)", table_cell_style)
        ],
        [
            Paragraph("<b>LED Piloto</b>", table_cell_bold),
            Paragraph("3 Volts", table_cell_style),
            Paragraph("1Ω [ ■ ]", table_cell_style),
            Paragraph("<b>🎯 4 Blocos Totais</b>", table_cell_bold),
            Paragraph("12V / 4 = 3V (Exige 3Ω externo)", table_cell_style)
        ],
        [
            Paragraph("<b>Motor de Bomba</b>", table_cell_bold),
            Paragraph("6 Volts", table_cell_style),
            Paragraph("2Ω [ ■ ■ ]", table_cell_style),
            Paragraph("<b>🎯 4 Blocos Totais</b>", table_cell_bold),
            Paragraph("12V · 2/4 = 6V (Exige 2Ω externo)", table_cell_style)
        ],
        [
            Paragraph("<b>Tomógrafo da UTI</b>", table_cell_bold),
            Paragraph("12 Volts", table_cell_style),
            Paragraph("4Ω [ ■ ■ ■ ■ ]", table_cell_style),
            Paragraph("<b>🎯 4 Blocos Totais</b>", table_cell_bold),
            Paragraph("12V direto (Liga sem resistor)", table_cell_style)
        ]
    ]

    t_cheat = Table(cheat_data, colWidths=[3.5 * cm, 3.2 * cm, 2.8 * cm, 3.5 * cm, 4.0 * cm])
    t_cheat.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_PRIMARY),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, COLOR_LIGHT_BG]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t_cheat)

    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 2: REGRAS DE JOGO, FLUXO DO TURNO E DIAGNÓSTICO GND
    # =========================================================================
    story.append(Paragraph("3. Princípios Cooperativos & Regra de Ouro", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=COLOR_PRIMARY, spaceAfter=6))
    
    story.append(Paragraph("• <b>Vitória Coletiva:</b> A equipe vence junta se energizar os 4 setores antes que o baralho de compras se esgote.", bullet_style))
    story.append(Paragraph("• <b>Mão Oculta & Silêncio Estratégico:</b> Cada jogador mantém suas 3 cartas em segredo. É permitido debater estratégias qualitativas (ex: <i>'Precisamos aumentar a resistência no setor leste!'</i>), mas é <b>proibido citar valores numéricos exatos de Ohms</b> que você possui em mãos. Isso garante que todos participem ativamente sem que um jogador domine a mesa.", bullet_style))

    story.append(Paragraph("4. Fluxo do Turno do Jogador", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=COLOR_PRIMARY, spaceAfter=6))

    turn_steps = [
        [Paragraph("<b>1. COMPRAR</b>", table_cell_bold), Paragraph("Compre 2 cartas do baralho de compras para sua mão (limite de 5 cartas na mão).", table_cell_style)],
        [Paragraph("<b>2. DEBATER</b>", table_cell_bold), Paragraph("Converse com a equipe para decidir em qual dos 4 setores a energia deve ser concentrada.", table_cell_style)],
        [Paragraph("<b>3. AÇÕES (Até 2 Ações)</b>", table_cell_bold), Paragraph("Você tem <b>2 Ações</b> por turno para usar entre:<br/>"
                                                                     "• <b>Construir:</b> Baixar 1 Resistor, Nó Paralelo (Y) ou Equipamento na linha do circuito.<br/>"
                                                                     "• <b>Descarte Ativo:</b> Descartar até 2 cartas da mão para renovar opções travadas.", table_cell_style)],
        [Paragraph("<b>4. ATERRAR (GND)</b>", table_cell_bold), Paragraph("Se o circuito estiver completo, coloque o <b>Cabo Terra (GND)</b> no terminal final (consome 1 Ação de Turno) para disparar a verificação imediata de voltagem!", table_cell_style)]
    ]
    t_turn = Table(turn_steps, colWidths=[3.8 * cm, 13.2 * cm])
    t_turn.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_LIGHT_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_turn)

    story.append(Spacer(1, 0.2 * cm))

    story.append(Paragraph("5. Diagnóstico e Verificação do Cabo Terra (GND)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=COLOR_PRIMARY, spaceAfter=6))
    story.append(Paragraph("Ao posicionar o Cabo Terra (GND) no final do ramo, a equipe conta todos os bloquinhos `[ ■ ]` daquela linha e compara com a Tabela de Mesa:", body_style))

    gnd_cases = [
        [Paragraph("🟢 <b>SUCESSO!</b><br/>(Total de Blocos == Meta)", table_cell_bold), Paragraph("A voltagem sobre o equipamento é exatamente a nominal. <b>O setor é salvo permanentemente e a carta de setor é virada para o lado energizado!</b>", table_cell_style)],
        [Paragraph("💥 <b>SOBRETENSÃO!</b><br/>(Total de Blocos &lt; Meta)", table_cell_bold), Paragraph("A resistência foi insuficiente e a corrente excessiva queimou o equipamento! <i>(O equipamento é descartado na pilha de sucatas, a menos que haja um Fusível protetor no ramo).</i>", table_cell_style)],
        [Paragraph("⚪ <b>SUBTENSÃO!</b><br/>(Total de Blocos &gt; Meta)", table_cell_bold), Paragraph("A resistência está alta demais e a voltagem foi insuficiente para acionar a carga. <i>(O Cabo Terra retorna à mão do jogador, mas a Ação do turno foi gasta).</i>", table_cell_style)]
    ]
    t_gnd = Table(gnd_cases, colWidths=[4.5 * cm, 12.5 * cm])
    t_gnd.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor("#dcfce7")),
        ('BACKGROUND', (0,1), (0,1), colors.HexColor("#fee2e2")),
        ('BACKGROUND', (0,2), (0,2), colors.HexColor("#f1f5f9")),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_gnd)

    story.append(Spacer(1, 0.2 * cm))

    story.append(Paragraph("6. Cartas Especiais: Fusíveis & Nós Paralelos (Y)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=COLOR_PRIMARY, spaceAfter=6))
    story.append(Paragraph("• <b>Fusível de Proteção (1A):</b> Se colocado no ramo antes da carga, queima no lugar do equipamento em caso de sobretensão, salvando o equipamento de ir para o descarte!", bullet_style))
    story.append(Paragraph("• <b>Nó Paralelo (Y):</b> Conecta 2 ramos independentes a uma mesma saída do gerador. A corrente se divide entre os dois caminhos, mas cada ramo recebe os 12V integrais da fonte.", bullet_style))

    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 3: TUTORIAL RÁPIDO & COLOFÃO DE AUTORIA E LICENÇA
    # =========================================================================
    story.append(Paragraph("7. Modo Tutorial: Aprenda a Jogar em 2 Minutos", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=COLOR_PRIMARY, spaceAfter=6))
    story.append(Paragraph("<i>Realize esta rodada rápida guiada antes de começar sua primeira partida oficial:</i>", body_style))

    story.append(Paragraph("<b>🟢 Fase 1 — O Primeiro Sucesso Guiado (LED 3V):</b>", h2_style))
    story.append(Paragraph("1. Posicione na mesa: <b>Gerador 12V</b> &rarr; <b>Resistor 3Ω</b> [ ■ ■ ■ ] &rarr; <b>LED Piloto 1Ω</b> [ ■ ] &rarr; <b>Cabo Terra (GND)</b>.<br/>"
                           "2. Conte os blocos da linha: $3 + 1 = 4$ blocos. Na Tabela de Mesa, o LED exige <b>🎯 4 Blocos</b>!<br/>"
                           "3. Como $4 == 4$, a voltagem no LED é exatamente $12\\text{V} \\cdot \\frac{1}{4} = 3\\text{V}$. <b>O LED acende e a equipe comemora o primeiro setor salvo!</b>", body_style))

    story.append(Paragraph("<b>💥 Fase 2 — O Erro Controlado (Sobretensão no Servidor):</b>", h2_style))
    story.append(Paragraph("1. Posicione na mesa: <b>Gerador 12V</b> &rarr; <b>Resistor 1Ω</b> [ ■ ] &rarr; <b>Servidor 1Ω</b> [ ■ ] &rarr; <b>Cabo Terra (GND)</b>.<br/>"
                           "2. Conte os blocos: $1 + 1 = 2$ blocos. Na Tabela de Mesa, o Servidor exige <b>🎯 3 Blocos</b>!<br/>"
                           "3. Como $2 < 3$, a voltagem subiu para $6\\text{V}$ ($12\\text{V} \\cdot \\frac{1}{2}$). <b>Sobretensão! O Servidor queima!</b> A equipe aprende que faltou resistor para segurar a voltagem.", body_style))

    story.append(Paragraph("<b>🎯 Fase 3 — Autonomia da Equipe (Sirene de Alerta):</b>", h2_style))
    story.append(Paragraph("A equipe recebe a carta da <b>Sirene (1Ω, Meta: 🎯 2 Blocos)</b>. Os jogadores decidem sozinhos colocar um <b>Resistor de 1Ω</b> antes de aterrar, atingindo $1+1=2$ blocos e vencendo o desafio sem ajuda!", body_style))

    story.append(Spacer(1, 0.4 * cm))

    # Box de Telemetria e Feedback Comunitário
    feedback_box = Paragraph(
        "<b>💬 Central da Comunidade & Feedback dos Jogadores:</b><br/>"
        "O VOLTZ é um projeto de jogo de tabuleiro aberto e cooperativo. Queremos saber como foi a experiência da sua equipe! "
        "Envie relatos de partidas, dúvidas de balanceamento ou sugestões de novas cartas através do repositório oficial ou canais dos desenvolvedores. "
        "Sua colaboração ajuda a aprimorar o jogo para jogadores e escolas de todo o país.",
        callout_style
    )
    t_feed = Table([[feedback_box]], colWidths=[17 * cm])
    t_feed.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BOX', (0,0), (-1,-1), 1, COLOR_SECONDARY),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_feed)

    story.append(Spacer(1, 0.4 * cm))

    # Colofão e Créditos Formais
    story.append(Paragraph("8. Créditos & Licença de Uso", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=COLOR_PRIMARY, spaceAfter=6))
    story.append(Paragraph("<b>Game Design & Modelagem Topológica:</b> David e Equipe VOLTZ.<br/>"
                           "<b>Conceito Didático:</b> Eletrodinâmica Lúdica baseada no modelo mental de divisores de tensão e Leis de Ohm/Kirchhoff.<br/>"
                           "<b>Licença de Distribuição:</b> <i>Creative Commons Atribuição-NãoComercial-CompartilhaIgual 4.0 Internacional (CC BY-NC-SA 4.0)</i>. "
                           "Este material pode ser compartilhado, impresso e adaptado livremente para fins educacionais e lúdicos não comerciais, desde que atribuída a autoria original.", body_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF Oficial do Jogo compilado com sucesso em: {pdf_path}")

if __name__ == "__main__":
    build_pdf()
