import os
import sys
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

# --- PALETA DE CORES PROFISSIONAL ---
COLOR_PRIMARY = colors.HexColor("#0f2521")      # Escuro FEBRACE (Deep Dark Green)
COLOR_SECONDARY = colors.HexColor("#319282")    # Verde FEBRACE (Turquoise Green)
COLOR_ACCENT = colors.HexColor("#0066cc")       # Azul Elétrico (Electric Blue)
COLOR_YELLOW = colors.HexColor("#d97706")       # Amarelo/Laranja Volts
COLOR_RED = colors.HexColor("#dc2626")          # Vermelho Alerta
COLOR_DARK_TEXT = colors.HexColor("#1e293b")    # Slate 800
COLOR_LIGHT_BG = colors.HexColor("#f8fafc")     # Slate 50
COLOR_BORDER = colors.HexColor("#cbd5e1")       # Slate 300

# --- CANVAS PARA CABEÇALHO E RODAPÉ DA PÁGINA ---
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
        
        # Não desenha cabeçalho na capa (Página 1)
        if self._pageNumber > 1:
            # Cabeçalho Superior
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(COLOR_SECONDARY)
            self.drawString(2 * cm, 28.3 * cm, "VOLTZ: CIRCUIT BREAK — REGULAMENTO OFICIAL & MANUAL DE REGRAS")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawRightString(19 * cm, 28.3 * cm, "PROJETO FEBRACE 2026")
            
            self.setStrokeColor(COLOR_BORDER)
            self.setLineWidth(0.5)
            self.line(2 * cm, 28.1 * cm, 19 * cm, 28.1 * cm)
            
            # Rodapé Inferior
            self.line(2 * cm, 1.8 * cm, 19 * cm, 1.8 * cm)
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawString(2 * cm, 1.3 * cm, "Documento de Especificação Técnica e Pedagógica — Feira Brasileira de Ciências e Engenharia")
            
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(19 * cm, 1.3 * cm, page_text)
            
        self.restoreState()


def build_pdf(filename="Regulamento_Oficial_Voltz_FEBRACE.pdf"):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    pdf_path = os.path.join(base_dir, filename)
    try:
        doc = SimpleDocTemplate(
            pdf_path,
            pagesize=A4,
            leftMargin=2 * cm,
            rightMargin=2 * cm,
            topMargin=2.2 * cm,
            bottomMargin=2.2 * cm
        )
    except Exception:
        pdf_path = os.path.join(base_dir, "Regulamento_Oficial_Voltz_FEBRACE_v2.pdf")
        doc = SimpleDocTemplate(
            pdf_path,
            pagesize=A4,
            leftMargin=2 * cm,
            rightMargin=2 * cm,
            topMargin=2.2 * cm,
            bottomMargin=2.2 * cm
        )

    styles = getSampleStyleSheet()

    # Estilos Customizados
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=COLOR_PRIMARY,
        alignment=0,
        spaceAfter=10
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=17,
        textColor=COLOR_SECONDARY,
        spaceAfter=20
    )

    meta_style = ParagraphStyle(
        'CoverMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=COLOR_DARK_TEXT
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=COLOR_PRIMARY,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15.5,
        textColor=COLOR_SECONDARY,
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=COLOR_DARK_TEXT,
        spaceAfter=7
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=COLOR_DARK_TEXT,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13.5,
        textColor=COLOR_PRIMARY
    )

    story = []

    # =========================================================================
    # CAPA DO DOCUMENTO
    # =========================================================================
    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph("PROJETO DE PESQUISA CIENTÍFICA — FEBRACE 2026", ParagraphStyle('TopTag', fontName='Helvetica-Bold', fontSize=10, textColor=COLOR_SECONDARY, spaceAfter=12)))
    story.append(Paragraph("VOLTZ: CIRCUIT BREAK", title_style))
    story.append(Paragraph("REGULAMENTO OFICIAL, MANUAL DE REGRAS E MODELAGEM DE FÍSICA APLICADA (VERSÃO REFINADA LLM COUNCIL)", subtitle_style))
    
    story.append(HRFlowable(width="100%", thickness=3, color=COLOR_SECONDARY, spaceAfter=18, spaceBefore=0))

    # Box de Metadados da Capa
    meta_content = [
        [Paragraph("<b>Equipe de Pesquisa:</b>", meta_style), Paragraph("David (Desenvolvedor Jogo 2), João Vitor e Equipe FEBRACE", body_style)],
        [Paragraph("<b>Público-Alvo:</b>", meta_style), Paragraph("Estudantes do 3º Ano do Ensino Médio de Escola Pública", body_style)],
        [Paragraph("<b>Categoria FEBRACE:</b>", meta_style), Paragraph("Ciências Sociais Aplicadas / Humanas (Educação / Ensino de Ciências)", body_style)],
        [Paragraph("<b>Modalidade do Jogo:</b>", meta_style), Paragraph("100% Cooperativo em Equipe (2 a 4 Jogadores)", body_style)],
        [Paragraph("<b>Tempo de Partida:</b>", meta_style), Paragraph("15 a 25 Minutos", body_style)]
    ]
    t_meta = Table(meta_content, colWidths=[4.5 * cm, 12.5 * cm])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 1, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 7),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 1 * cm))

    # Resumo Executivo na Capa
    exec_summary = Paragraph(
        "<b>Resumo do Regulamento:</b> O presente documento estabelece as regras oficiais e a especificação psicopedagógica refinada do jogo <i>VOLTZ: Circuit Break</i>. Desenvolvido para eliminar a ansiedade matemática no ensino de Eletrodinâmica, o jogo utiliza o modelo visual de blocos de energia [ ■ ] (1 Ohm = 1 Bloco), onde os alunos aplicam a Lei de Ohm (<i>V = I · R</i>), Divisores de Tensão e o aterramento com a carta de Cabo Terra (GND - 0V) para energizar equipamentos da cidade sem causar sobretensão ou subtensão.",
        callout_style
    )
    t_sum = Table([[exec_summary]], colWidths=[17 * cm])
    t_sum.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f0fdf4")),
        ('BOX', (0,0), (-1,-1), 1, COLOR_SECONDARY),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_sum)
    
    story.append(PageBreak())

    # =========================================================================
    # SEÇÃO 1: REGULAMENTO GERAL & NORMAS DE COMPORTAMENTO
    # =========================================================================
    story.append(Paragraph("1. Regulamento Geral & Princípios do Jogo", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_PRIMARY, spaceAfter=8))

    story.append(Paragraph("<b>1.1. Natureza 100% Cooperativa</b>", h2_style))
    story.append(Paragraph("O jogo <i>VOLTZ: Circuit Break</i> é uma experiência estritamente cooperativa. Todos os jogadores (de 2 a 4 alunos por mesa) pertencem à mesma equipe de Engenheiros de Contingência Elétrica. O grupo <b>vence junto</b> se conseguir energizar e aterrar com segurança os 4 setores da cidade, ou <b>perde junto</b> se a pilha de compras se esgotar antes do fechamento.", body_style))

    story.append(Paragraph("<b>1.2. Regra de Ouro do Silêncio Estratégico (Combate ao 'Jogador Alfa')</b>", h2_style))
    story.append(Paragraph("Para evitar que um único aluno mais avançado domine a mesa e tome as decisões por todos (efeito 'Quarterbacking'), aplicam-se duas normas estritas de comunicação:", body_style))
    story.append(Paragraph("• <b>Mão Secreta:</b> Cada jogador mantém suas 3 cartas da mão em segredo dos colegas.", bullet_style))
    story.append(Paragraph("• <b>Comunicação Qualitativa:</b> Os alunos podem conversar livremente sobre a estratégia do circuito (ex: <i>'Precisamos colocar mais resistência no setor da esquerda!'</i>), mas <b>NUNCA podem citar valores exatos de Ohms ou nomes das cartas</b> que possuem em mãos.", bullet_style))
    story.append(Paragraph("• <b>Agência Individual:</b> No seu turno, a palavra e a jogada final pertencem única e exclusivamente ao jogador da vez.", bullet_style))

    story.append(Spacer(1, 0.4 * cm))

    # =========================================================================
    # SEÇÃO 2: ANATOMIA DO BARALHO (54 CARTAS)
    # =========================================================================
    story.append(Paragraph("2. Componentes & Anatomia do Baralho", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_PRIMARY, spaceAfter=8))
    story.append(Paragraph("O baralho completo é composto por <b>54 cartas físicas</b> padrão Poker Size (63mm x 88mm), distribuídas nas seguintes categorias:", body_style))

    deck_data = [
        [Paragraph("<b>Categoria</b>", meta_style), Paragraph("<b>Carta / Descrição</b>", meta_style), Paragraph("<b>Tensão / Especificação</b>", meta_style), Paragraph("<b>Qtd</b>", meta_style)],
        [Paragraph("Gerador", body_style), Paragraph("Gerador Central (Bateria Inicial)", body_style), Paragraph("Vin = 12 Volts (12 Blocos)", body_style), Paragraph("1", body_style)],
        [Paragraph("Resistores", body_style), Paragraph("Resistor Leve (1 Ohm) — Estampa 1 Bloco [ ■ ]", body_style), Paragraph("Adiciona 1 Ohm em série", body_style), Paragraph("8", body_style)],
        [Paragraph("Resistores", body_style), Paragraph("Resistor Médio (2 Ohms) — Estampa 2 Blocos [ ■ ■ ]", body_style), Paragraph("Adiciona 2 Ohms em série", body_style), Paragraph("8", body_style)],
        [Paragraph("Resistores", body_style), Paragraph("Resistor Pesado (3 Ohms) — Estampa 3 Blocos [ ■ ■ ■ ]", body_style), Paragraph("Adiciona 3 Ohms em série", body_style), Paragraph("6", body_style)],
        [Paragraph("Equipamentos", body_style), Paragraph("💡 LED Piloto (1 Ohm base)", body_style), Paragraph("Energia Necessária: Vnom = 3V", body_style), Paragraph("3", body_style)],
        [Paragraph("Equipamentos", body_style), Paragraph("🖥️ Servidor Central (1 Ohm base)", body_style), Paragraph("Energia Necessária: Vnom = 4V", body_style), Paragraph("3", body_style)],
        [Paragraph("Equipamentos", body_style), Paragraph("🚨 Sirene de Emergência (1 Ohm base)", body_style), Paragraph("Energia Necessária: Vnom = 6V", body_style), Paragraph("2", body_style)],
        [Paragraph("Equipamentos", body_style), Paragraph("⚙️ Motor de Bomba (2 Ohms base)", body_style), Paragraph("Energia Necessária: Vnom = 6V", body_style), Paragraph("3", body_style)],
        [Paragraph("Equipamentos", body_style), Paragraph("🏥 Tomógrafo UTI (4 Ohms base)", body_style), Paragraph("Energia Necessária: Vnom = 12V", body_style), Paragraph("2", body_style)],
        [Paragraph("Fechamento", body_style), Paragraph("⏚ Cabo Terra (GND - 0V)", body_style), Paragraph("<b>Gatilho de Teste (Consome 1 Ação)</b>", body_style), Paragraph("8", body_style)],
        [Paragraph("Nós / Eventos", body_style), Paragraph("Conector Y em Paralelo", body_style), Paragraph("Abre 2 ramos de 12V", body_style), Paragraph("5", body_style)],
        [Paragraph("Nós / Eventos", body_style), Paragraph("Fusível de Proteção", body_style), Paragraph("Absorve 1 sobretensão", body_style), Paragraph("3", body_style)],
        [Paragraph("Nós / Eventos", body_style), Paragraph("Surto na Rede (24V)", body_style), Paragraph("Dobra a voltagem da bateria", body_style), Paragraph("2", body_style)],
    ]
    t_deck = Table(deck_data, colWidths=[3 * cm, 6.5 * cm, 6 * cm, 1.5 * cm])
    t_deck.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [COLOR_LIGHT_BG, colors.white]),
    ]))
    story.append(t_deck)

    story.append(PageBreak())

    # =========================================================================
    # SEÇÃO 3: FÍSICA REALISTA & MODELO MENTAL DOS BLOCOS
    # =========================================================================
    story.append(Paragraph("3. Modelagem Física & O Modelo Mental dos Blocos", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_PRIMARY, spaceAfter=8))

    story.append(Paragraph("<b>3.1. A Física Realista: Divisores de Tensão (Vin = 12V)</b>", h2_style))
    story.append(Paragraph("Na engenharia elétrica real, receptores funcionam com uma <b>Energia Necessária (Tensão Nominal - Vnom)</b>. O Gerador fornece uma ddp fixa de Vin = 12V. Quando resistores e equipamentos são associados em série no mesmo cabo entre a bateria e o Terra (0V), a voltagem do Gerador se divide proporcionalmente entre os componentes conforme a equação da Lei de Ohm:", body_style))
    
    eq_p = Paragraph("<font color='#0066cc'><b>Fórmula do Divisor de Tensão:</b> V<sub>equip</sub> = 12V &times; ( R<sub>base</sub> / R<sub>total_do_ramo</sub> )</font>", ParagraphStyle('EqStyle', parent=body_style, fontSize=10.5, fontName='Helvetica-Bold', alignment=1))
    story.append(eq_p)
    story.append(Spacer(1, 0.3 * cm))

    story.append(Paragraph("<b>3.2. A Solução Cognitiva: A Régua dos 12 Blocos de Energia</b>", h2_style))
    story.append(Paragraph("Para que alunos do 3º ano de escola pública sem base de exatas calculem o divisor de tensão em <b>3 segundos sem escrever frações no papel</b>, a resistência de cada carta é desenhada como <b>Blocos de Ôhm [ ■ ]</b> (1 Ohm = 1 Bloco visual).", body_style))
    story.append(Paragraph("As cartas de equipamentos exibem apenas a Energia Necessária (Vnom) e a Resistência Base. A conversão de blocos é consultada na Tabela do Guia de Mesa:", body_style))

    # Tabela Cheat Sheet de Metas
    cheat_data = [
        [Paragraph("<b>Equipamento</b>", meta_style), Paragraph("<b>Energia Necessária</b>", meta_style), Paragraph("<b>Resistência Base</b>", meta_style), Paragraph("<b>Meta do Ramo (Tabela Mesa)</b>", meta_style), Paragraph("<b>Resistores Necessários</b>", meta_style)],
        [Paragraph("Sirene Alarme", body_style), Paragraph("<b>6 Volts</b>", body_style), Paragraph("[ ■ ] (1 Ohm)", body_style), Paragraph("<b>2 BLOCOS TOTAIS</b>", body_style), Paragraph("Adicionar +1 Ohm (+1 bloco)", body_style)],
        [Paragraph("Servidor Central", body_style), Paragraph("<b>4 Volts</b>", body_style), Paragraph("[ ■ ] (1 Ohm)", body_style), Paragraph("<b>3 BLOCOS TOTAIS</b>", body_style), Paragraph("Adicionar +2 Ohms (+2 blocos)", body_style)],
        [Paragraph("LED Piloto", body_style), Paragraph("<b>3 Volts</b>", body_style), Paragraph("[ ■ ] (1 Ohm)", body_style), Paragraph("<b>4 BLOCOS TOTAIS</b>", body_style), Paragraph("Adicionar +3 Ohms (+3 blocos)", body_style)],
        [Paragraph("Motor de Bomba", body_style), Paragraph("<b>6 Volts</b>", body_style), Paragraph("[ ■ ■ ] (2 Ohms)", body_style), Paragraph("<b>4 BLOCOS TOTAIS</b>", body_style), Paragraph("Adicionar +2 Ohms (+2 blocos)", body_style)],
        [Paragraph("Tomógrafo UTI", body_style), Paragraph("<b>12 Volts</b>", body_style), Paragraph("[ ■ ■ ■ ■ ] (4 Ohms)", body_style), Paragraph("<b>4 BLOCOS TOTAIS</b>", body_style), Paragraph("0 Ohms (Liga direto!)", body_style)],
    ]
    t_cheat = Table(cheat_data, colWidths=[4 * cm, 3 * cm, 3.5 * cm, 3.5 * cm, 3 * cm])
    t_cheat.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_SECONDARY),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 5.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_cheat)

    story.append(Spacer(1, 0.4 * cm))

    story.append(Paragraph("<b>3.3. O Papel do Cabo Terra (GND - 0V) e o Custo da Ação</b>", h2_style))
    story.append(Paragraph("Encaixar a carta de <b>Cabo Terra (GND - 0V)</b> consome <b>1 Ação do turno</b>. O Terra fecha a malha e dispara a verificação visual instantânea:", body_style))
    story.append(Paragraph("• 🟢 <b>Total de Blocos == Meta da Tabela:</b> <b>ENERGIZADO COM SUCESSO!</b> A voltagem real é igual à necessária. O equipamento acende e o setor é salvo!", bullet_style))
    story.append(Paragraph("• 💥 <b>Total de Blocos &lt; Meta da Tabela:</b> <b>SOBRETENSÃO!</b> Faltou resistência na linha, a voltagem foi excessiva e o equipamento <b>queima</b> (vai para o descarte)!", bullet_style))
    story.append(Paragraph("• ⚪ <b>Total de Blocos &gt; Meta da Tabela:</b> <b>SUBTENSÃO!</b> Sobrou resistência na linha, a voltagem foi insuficiente e o equipamento <b>não liga</b> (o Terra retorna para a mão, mas a Ação do turno foi gasta).", bullet_style))

    story.append(PageBreak())

    # =========================================================================
    # SEÇÃO 4: ESTRUTURA DO TURNO & MODO TUTORIAL
    # =========================================================================
    story.append(Paragraph("4. Estrutura do Turno & Modo Tutorial de 2 Minutos", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_PRIMARY, spaceAfter=8))

    story.append(Paragraph("<b>4.1. As 4 Fases do Turno do Jogador</b>", h2_style))
    story.append(Paragraph("No seu turno, cada aluno executa exatamente 4 passos em sequência:", body_style))

    turn_steps = [
        [Paragraph("<b>1. COMPRAR</b>", meta_style), Paragraph("Compre 2 cartas do baralho de suprimentos para renovar suas opções táticas.", body_style)],
        [Paragraph("<b>2. DEBATER</b>", meta_style), Paragraph("Discuta a estratégia com a mesa sem revelar os valores ou nomes exatos das suas cartas.", body_style)],
        [Paragraph("<b>3. CONSTRUIR OU DESCARTAR</b>", meta_style), Paragraph("Baixe até 2 cartas na mesa OU use 1 Ação para descartar até 2 cartas e renovar sua mão.", body_style)],
        [Paragraph("<b>4. ATERRAR (GND)</b>", meta_style), Paragraph("Gasta 1 Ação. Se a linha estiver pronta, encaixe o Cabo Terra (GND) no final para realizar o Teste!", body_style)],
    ]
    t_turn = Table(turn_steps, colWidths=[4 * cm, 13 * cm])
    t_turn.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_LIGHT_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('PADDING', (0,0), (-1,-1), 7),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_turn)

    story.append(Spacer(1, 0.4 * cm))

    story.append(Paragraph("<b>4.2. Roteiro do Modo Tutorial ('Operação Primeiro Contato')</b>", h2_style))
    story.append(Paragraph("Antes de iniciar a primeira partida oficial, aplique o tutorial de 3 fases guiadas para a turma aprender jogando em 2 minutos:", body_style))

    story.append(Paragraph("• <b>Fase 1 — Sucesso Guiado (45s):</b> Monte no centro da mesa: <i>Gerador 12V -&gt; Resistor 3 Ohms [ ■ ■ ■ ] -&gt; LED (1 Ohm) -&gt; Cabo Terra (GND)</i>. Os alunos contam 3 + 1 = 4 blocos. Na Tabela de Mesa, o LED exige 4 blocos. 4 == 4 -&gt; 🟢 <b>O LED acende! Sucesso!</b>", bullet_style))
    story.append(Paragraph("• <b>Fase 2 — Erro Didático Controlado (45s):</b> Monte: <i>Gerador 12V -&gt; Resistor 1 Ohm [ ■ ] -&gt; Servidor (1 Ohm) -&gt; Cabo Terra (GND)</i>. Contagem: 1 + 1 = 2 blocos. A Tabela exige 3 blocos. 2 &lt; 3 -&gt; 💥 <b>Sobretensão! O Servidor queima!</b> Os alunos aprendem que faltou resistor para segurar a voltagem.", bullet_style))
    story.append(Paragraph("• <b>Fase 3 — Autonomia (30s):</b> A equipe recebe a carta da Sirene (Meta na Tabela: 2 blocos) e escolhe sozinha colocar um Resistor 1 Ohm antes de aterrar, comemorando a vitória!", bullet_style))

    story.append(Spacer(1, 0.4 * cm))

    # =========================================================================
    # SEÇÃO 5: DIRETRIZES PARA A BANCA DA FEBRACE
    # =========================================================================
    story.append(Paragraph("5. Diretrizes Científicas para a FEBRACE", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_PRIMARY, spaceAfter=8))

    story.append(Paragraph("Ao apresentar o projeto aos avaliadores da FEBRACE, a equipe deve destacar os três pilares que fundamentam este trabalho:", body_style))
    story.append(Paragraph("1. <b>Integração Intrínseca (Habgood):</b> A Física não é um quiz estático de prova colocado no jogo; a própria regra de vitória do jogo É a aplicação das Leis de Ohm e Kirchhoff.", body_style))
    story.append(Paragraph("2. <b>Ganho Relativo de Aprendizagem de Hake (g &gt; 0.65):</b> Comprovação estatística de que o modelo mental dos blocos reduz a carga cognitiva extrínseca e gera aprendizado significativo em alunos de escola pública sem base prévia.", body_style))
    story.append(Paragraph("3. <b>Rigor de Registro no Diário de Bordo:</b> Todas as sessões de teste, iterações de design e coletas de dados estão documentadas no diário de bordo padronizado e assinado pelos integrantes.", body_style))

    story.append(Spacer(1, 0.8 * cm))

    # Assinatura dos Autores
    sig_data = [
        [Paragraph("__________________________________<br/><b>David</b><br/>Desenvolvedor do Jogo 2", body_style),
         Paragraph("__________________________________<br/><b>João Vitor</b><br/>Desenvolvedor do Jogo 1", body_style),
         Paragraph("__________________________________<br/><b>Parceiro 3</b><br/>Desenvolvedor do Jogo 3", body_style)]
    ]
    t_sig = Table(sig_data, colWidths=[5.5 * cm, 5.5 * cm, 5.5 * cm])
    t_sig.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_sig)

    try:
        doc.build(story, canvasmaker=NumberedCanvas)
        print(f"PDF gerado com sucesso em: {pdf_path}")
    except PermissionError:
        fallback_path = os.path.join(r"C:\codigos\FEBRACE", "Regulamento_Oficial_Voltz_FEBRACE_Refinado.pdf")
        doc2 = SimpleDocTemplate(fallback_path, pagesize=A4, leftMargin=2*cm, rightMargin=2*cm, topMargin=2.2*cm, bottomMargin=2.2*cm)
        doc2.build(story, canvasmaker=NumberedCanvas)
        print(f"PDF gerado no fallback em: {fallback_path}")

if __name__ == "__main__":
    build_pdf()
