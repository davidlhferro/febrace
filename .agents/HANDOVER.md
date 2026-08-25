# 📌 Handoff Briefing — VOLTZ: Circuit Break (FEBRACE 2026)

- **Última Atualização:** 2026-08-25T11:00:00-03:00
- **Projeto:** VOLTZ: Circuit Break (Jogo 2 do David para a FEBRACE 2026)
- **Status:** Baralho, Regulamento e Manuais Refinados pós-LLM Council. PDF Oficial Compilado.

---

## 🎯 Objetivo Ativo
Executar o plano de ação validado pelo **LLM Council** para o jogo "VOLTZ: Circuit Break":
1. **Ajustes de Design Pedagógico Realizados**:
   - Meta Pronta (🎯 X blocos) removida das cartas de equipamentos para forçar dedução real de divisor de tensão ($V_{out} = V_{in} \cdot \frac{R_{equip}}{R_{total}}$).
   - Tabela de Conversão Proporcional centralizada no Guia Rápido de Mesa (Player Aid).
   - Uso da carta de Cabo Terra (GND) passa a gastar 1 Ação de Turno para evitar exploits de tentativa e erro sem custo.
   - Adicionada a Ação de Descarte Ativo (descartar até 2 cartas para renovar a mão) para prevenir travamentos (deadlock).
2. **Arquivos Atualizados & Verificados**:
   - `baralho_cartas_jogo2.md`: Catálogo completo das 54 cartas para impressão.
   - `cartas_print_visual.html`: Interface visual A4 (grid 3x3) pronta para impressão/PDF.
   - `manual_jogo2_cooperativo.md` e `manual_ilustrado_febrace.html`: Regras completas e guia do jogador.
   - `gerar_pdf_regulamento.py`: Script de compilação em ReportLab executado com sucesso.
   - `Regulamento_Oficial_Voltz_FEBRACE_Refinado.pdf`: PDF oficial gerado e pronto para entrega.

---

## 🚀 Próximos Passos Imediatos
1. **Impressão do Protótipo (Couchê 250g)**: Imprimir 1 baralho A4 via `cartas_print_visual.html` (ou salvar PDF pelo navegador) e 1 Guia de Mesa plastificado.
2. **Blind Playtest Cronometrado**: Realizar 1 teste cego de 25 minutos com 4 estudantes/colegas sem intervenção das regras faladas.
3. **Ajustes de Ambiguidades**: Refinar o texto do Guia de Mesa com base no feedback do playtest.
4. **Vídeo Demonstrativo (60s)**: Gravar a execução de 1 turno real de jogo para a banca e estande da FEBRACE.

---

## 🔒 Decisões Trancadas & Racional Pedagógico
* **Meta estampada na carta**: PROIBIDA. Estampar a meta mata o raciocínio físico da Lei de Ohm/Divisor de Tensão, reduzindo o jogo a simples soma de números primários.
* **Custo do Terra (GND)**: SEMPRE consome 1 Ação. Impede a tática dominante de testar terras aleatórios sem gastar turno.
* **Papel Sulfite 75g**: INVIÁVEL. Usar couchê 250g/300g ou sleeves plásticos para durabilidade em sala de aula.
