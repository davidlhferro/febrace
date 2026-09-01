/**
 * PORTAL VOLTZ — Renderizador de SVGs Vetoriais Autênticos das Cartas
 * 100% Paridade Visual com as Cartas Físicas de cartas_print_visual.html
 */

const VOLTZ_SVG_DEFS = `
<defs>
    <linearGradient id="pipeGradH" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fbb034"/>
        <stop offset="35%" stop-color="#e07a1e"/>
        <stop offset="85%" stop-color="#b25509"/>
        <stop offset="100%" stop-color="#5a2702"/>
    </linearGradient>
    <linearGradient id="pipeGradV" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#fbb034"/>
        <stop offset="35%" stop-color="#e07a1e"/>
        <stop offset="85%" stop-color="#b25509"/>
        <stop offset="100%" stop-color="#5a2702"/>
    </linearGradient>
    <pattern id="bandidoGroundSvg" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#141c2b"/>
        <circle cx="3" cy="5" r="0.8" fill="#1e2c44"/>
        <circle cx="14" cy="12" r="1.1" fill="#090f1a"/>
        <circle cx="9" cy="17" r="0.7" fill="#1e2c44"/>
        <circle cx="18" cy="4" r="0.9" fill="#090f1a"/>
    </pattern>
</defs>
`;

function getCardBaseBackground() {
    return `
    <rect width="238" height="332" fill="url(#bandidoGroundSvg)"/>
    <path d="M 15 30 Q 35 45 45 40" stroke="#090f1a" stroke-width="1.5" fill="none"/>
    <path d="M 200 280 Q 215 295 225 290" stroke="#090f1a" stroke-width="1.5" fill="none"/>
    <path d="M 210 50 Q 195 70 205 90" stroke="#090f1a" stroke-width="1.5" fill="none"/>
    `;
}

function renderCardSvg(card) {
    if (!card) return '';
    const id = card.id || '';
    const shape = card.shape || 'STRAIGHT';

    let innerContent = '';

    if (id === 'gen_12v') {
        innerContent = `
            <!-- 4 Tubos Grossos para Norte, Sul, Leste, Oeste -->
            <rect x="95" y="0" width="48" height="166" fill="url(#pipeGradV)" stroke="#0a0908" stroke-width="5"/>
            <rect x="95" y="166" width="48" height="166" fill="url(#pipeGradV)" stroke="#0a0908" stroke-width="5"/>
            <rect x="0" y="142" width="119" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>
            <rect x="119" y="142" width="119" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>

            <!-- Reator Central Redondo do Gerador -->
            <circle cx="119" cy="166" r="62" fill="#0a0908"/>
            <circle cx="119" cy="166" r="56" fill="#e07a1e" stroke="#fbb034" stroke-width="4"/>
            <circle cx="119" cy="166" r="44" fill="#141c2b" stroke="#0a0908" stroke-width="4"/>

            <!-- Raio de Alta Tensão -->
            <polygon points="119,130 102,168 116,168 110,202 136,158 122,158" fill="#fbb034" stroke="#0a0908" stroke-width="2.5"/>

            <rect x="64" y="240" width="110" height="24" rx="4" fill="#0a0908"/>
            <text x="119" y="257" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#fbb034" text-anchor="middle">GERADOR 12V</text>
        `;
    } else if (card.type === 'resistor') {
        const ringColor = card.r === 1 ? '#059669' : (card.r === 2 ? '#2563eb' : (card.r === 3 ? '#ea580c' : '#78350f'));
        
        if (shape === 'CORNER_90') {
            innerContent = `
                <!-- Curva 90° (Esquerda para Baixo) -->
                <path d="M 0 166 Q 119 166 119 332" fill="none" stroke="url(#pipeGradH)" stroke-width="48"/>
                <path d="M 0 166 Q 119 166 119 332" fill="none" stroke="#0a0908" stroke-width="52" stroke-linecap="square"/>
                <path d="M 0 166 Q 119 166 119 332" fill="none" stroke="url(#pipeGradH)" stroke-width="44"/>

                <!-- Corpo Cerâmico no Joelho -->
                <circle cx="95" cy="190" r="46" fill="#f5eedc" stroke="#0a0908" stroke-width="5"/>
                <circle cx="95" cy="190" r="32" fill="${ringColor}"/>
                <text x="95" y="198" font-family="'Rubik', sans-serif" font-weight="900" font-size="20" fill="#ffffff" text-anchor="middle">${card.r}Ω</text>

                <rect x="54" y="50" width="130" height="24" rx="4" fill="#0a0908"/>
                <text x="119" y="67" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#f5eedc" text-anchor="middle">${card.name}</text>
            `;
        } else {
            innerContent = `
                <!-- Tubo Reto Leste-Oeste -->
                <rect x="0" y="142" width="238" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>
                <polygon points="36,166 22,154 22,178" fill="#0a0908"/>
                <polygon points="216,166 202,154 202,178" fill="#0a0908"/>

                <!-- Corpo Cerâmico -->
                <rect x="64" y="122" width="110" height="88" rx="20" fill="#f5eedc" stroke="#0a0908" stroke-width="6"/>
                <rect x="82" y="122" width="14" height="88" fill="${ringColor}" stroke="#0a0908" stroke-width="2"/>
                <rect x="106" y="122" width="14" height="88" fill="#0a0908"/>
                <rect x="130" y="122" width="14" height="88" fill="#e07a1e" stroke="#0a0908" stroke-width="2"/>

                <circle cx="119" cy="68" r="28" fill="#0a0908"/>
                <circle cx="119" cy="68" r="24" fill="${ringColor}"/>
                <text x="119" y="76" font-family="'Rubik', sans-serif" font-weight="900" font-size="18" fill="#ffffff" text-anchor="middle">${card.r}Ω</text>

                <rect x="64" y="246" width="110" height="24" rx="4" fill="#0a0908"/>
                <text x="119" y="263" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#f5eedc" text-anchor="middle">${card.name}</text>
            `;
        }
    } else if (id === 'load_led') {
        innerContent = `
            <rect x="0" y="142" width="238" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>
            <circle cx="119" cy="166" r="62" fill="#0a0908"/>
            <circle cx="119" cy="166" r="54" fill="#fde047" stroke="#ca8a04" stroke-width="4"/>
            <circle cx="119" cy="166" r="38" fill="#ffffff"/>

            <path d="M 104 186 L 112 150 L 126 150 L 134 186" fill="none" stroke="#ca8a04" stroke-width="6" stroke-linecap="round"/>
            <line x1="119" y1="92" x2="119" y2="72" stroke="#fde047" stroke-width="6" stroke-linecap="round"/>
            <line x1="68" y1="115" x2="52" y2="100" stroke="#fde047" stroke-width="6" stroke-linecap="round"/>
            <line x1="170" y1="115" x2="186" y2="100" stroke="#fde047" stroke-width="6" stroke-linecap="round"/>

            <rect x="64" y="246" width="110" height="24" rx="4" fill="#0a0908"/>
            <text x="119" y="263" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#fde047" text-anchor="middle">LED 3V // 1Ω</text>
        `;
    } else if (id === 'load_servidor') {
        innerContent = `
            <rect x="0" y="142" width="238" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>
            
            <rect x="54" y="106" width="130" height="120" rx="8" fill="#0a0908"/>
            <rect x="60" y="112" width="118" height="108" rx="6" fill="#1e293b" stroke="#0a0908" stroke-width="3"/>

            <rect x="68" y="124" width="102" height="26" rx="3" fill="#0f172a"/>
            <circle cx="80" cy="137" r="4" fill="#22c55e"/><circle cx="92" cy="137" r="4" fill="#38bdf8"/>
            <line x1="106" y1="137" x2="160" y2="137" stroke="#475569" stroke-width="3" stroke-dasharray="6,4"/>

            <rect x="68" y="156" width="102" height="26" rx="3" fill="#0f172a"/>
            <circle cx="80" cy="169" r="4" fill="#22c55e"/><circle cx="92" cy="169" r="4" fill="#eab308"/>
            <line x1="106" y1="169" x2="160" y2="169" stroke="#475569" stroke-width="3" stroke-dasharray="6,4"/>

            <rect x="68" y="188" width="102" height="24" rx="3" fill="#0f172a"/>
            <circle cx="80" cy="200" r="4" fill="#38bdf8"/><circle cx="92" cy="200" r="4" fill="#38bdf8"/>

            <rect x="54" y="248" width="130" height="24" rx="4" fill="#0a0908"/>
            <text x="119" y="265" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#38bdf8" text-anchor="middle">SERVIDOR 4V // 1Ω</text>
        `;
    } else if (id === 'load_sirene') {
        innerContent = `
            <rect x="0" y="142" width="238" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>
            
            <path d="M 68 146 Q 52 166 68 186" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
            <path d="M 170 146 Q 186 166 170 186" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>

            <rect x="80" y="192" width="78" height="24" rx="5" fill="#0a0908"/>
            <path d="M 86 192 C 86 110 152 110 152 192 Z" fill="#0a0908"/>
            <path d="M 90 192 C 90 118 148 118 148 192 Z" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
            <circle cx="119" cy="162" r="14" fill="#ffffff" opacity="0.9"/>
            <circle cx="119" cy="162" r="8" fill="#fef08a"/>

            <circle cx="119" cy="64" r="28" fill="#0a0908"/>
            <circle cx="119" cy="64" r="24" fill="#dc2626"/>
            <text x="119" y="72" font-family="'Rubik', sans-serif" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle">6V // 1Ω</text>

            <rect x="54" y="254" width="130" height="24" rx="4" fill="#0a0908"/>
            <text x="119" y="271" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#fca5a5" text-anchor="middle">SIRENE 6V</text>
        `;
    } else if (id === 'load_motor') {
        innerContent = `
            <path d="M 0 166 Q 119 166 119 332" fill="none" stroke="#0a0908" stroke-width="52" stroke-linecap="square"/>
            <path d="M 0 166 Q 119 166 119 332" fill="none" stroke="url(#pipeGradH)" stroke-width="44"/>

            <circle cx="120" cy="166" r="56" fill="#0a0908"/>
            <circle cx="120" cy="166" r="50" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
            <circle cx="120" cy="166" r="36" fill="#0369a1"/>

            <g stroke="#bae6fd" stroke-width="3" stroke-linecap="round" fill="none">
                <path d="M 120 166 Q 138 152 152 142"/>
                <path d="M 120 166 Q 134 184 144 198"/>
                <path d="M 120 166 Q 102 180 88 190"/>
                <path d="M 120 166 Q 106 148 96 134"/>
            </g>
            <circle cx="120" cy="166" r="12" fill="#f59e0b" stroke="#0a0908" stroke-width="2"/>

            <circle cx="119" cy="64" r="28" fill="#0a0908"/>
            <circle cx="119" cy="64" r="24" fill="#0284c7"/>
            <text x="119" y="72" font-family="'Rubik', sans-serif" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle">6V // 2Ω</text>

            <rect x="54" y="254" width="130" height="24" rx="4" fill="#0a0908"/>
            <text x="119" y="271" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#bae6fd" text-anchor="middle">BOMBA 6V (90°)</text>
        `;
    } else if (id === 'load_tomografo') {
        innerContent = `
            <rect x="0" y="142" width="238" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>
            <circle cx="119" cy="166" r="66" fill="#0a0908"/>
            <circle cx="119" cy="166" r="58" fill="#dc2626" stroke="#ffffff" stroke-width="4"/>
            <circle cx="119" cy="166" r="38" fill="#0a0908"/>
            <circle cx="119" cy="166" r="20" fill="#ffffff"/>

            <rect x="113" y="112" width="12" height="20" fill="#ffffff"/>
            <rect x="109" y="116" width="20" height="12" fill="#ffffff"/>

            <rect x="44" y="246" width="150" height="24" rx="4" fill="#0a0908"/>
            <text x="119" y="263" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#ffffff" text-anchor="middle">TOMÓGRAFO 12V // 4Ω</text>
        `;
    } else if (card.type === 'gnd') {
        innerContent = `
            <rect x="0" y="142" width="130" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>
            <polygon points="45,166 30,154 30,178" fill="#0a0908"/>
            <polygon points="65,166 50,154 50,178" fill="#0a0908"/>

            <rect x="115" y="90" width="108" height="152" rx="14" fill="#0a0908"/>
            <rect x="121" y="96" width="96" height="140" rx="10" fill="#0d9488" stroke="#14b8a6" stroke-width="4"/>

            <line x1="121" y1="166" x2="155" y2="166" stroke="#0a0908" stroke-width="10"/>
            <line x1="155" y1="120" x2="155" y2="212" stroke="#0a0908" stroke-width="12" stroke-linecap="round"/>
            <line x1="172" y1="135" x2="172" y2="197" stroke="#0a0908" stroke-width="10" stroke-linecap="round"/>
            <line x1="187" y1="150" x2="187" y2="182" stroke="#0a0908" stroke-width="8" stroke-linecap="round"/>
            <line x1="200" y1="160" x2="200" y2="172" stroke="#0a0908" stroke-width="6" stroke-linecap="round"/>

            <rect x="74" y="254" width="150" height="24" rx="4" fill="#0a0908"/>
            <text x="149" y="271" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#2dd4bf" text-anchor="middle">CABO TERRA (0V)</text>
        `;
    } else if (card.type === 'fuse') {
        innerContent = `
            <rect x="0" y="142" width="238" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>
            <rect x="45" y="118" width="148" height="96" rx="22" fill="#0a0908"/>
            <rect x="51" y="124" width="136" height="84" rx="18" fill="#e0f2fe" stroke="#0284c7" stroke-width="4"/>
            <rect x="51" y="124" width="30" height="84" rx="4" fill="#94a3b8" stroke="#0a0908" stroke-width="3"/>
            <rect x="157" y="124" width="30" height="84" rx="4" fill="#94a3b8" stroke="#0a0908" stroke-width="3"/>

            <path d="M 81 166 Q 105 132 119 166 T 157 166" fill="none" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/>

            <rect x="54" y="246" width="130" height="24" rx="4" fill="#0a0908"/>
            <text x="119" y="263" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#38bdf8" text-anchor="middle">FUSÍVEL 1A</text>
        `;
    } else if (card.type === 'node_y') {
        innerContent = `
            <rect x="0" y="142" width="238" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>
            <rect x="95" y="0" width="48" height="166" fill="url(#pipeGradV)" stroke="#0a0908" stroke-width="5"/>

            <circle cx="119" cy="166" r="42" fill="#0a0908"/>
            <circle cx="119" cy="166" r="34" fill="#e07a1e" stroke="#fbb034" stroke-width="4"/>
            <circle cx="119" cy="166" r="18" fill="#0a0908"/>

            <rect x="54" y="246" width="130" height="24" rx="4" fill="#0a0908"/>
            <text x="119" y="263" font-family="'Rubik', sans-serif" font-weight="900" font-size="11" fill="#fbb034" text-anchor="middle">CONECTOR Y</text>
        `;
    } else {
        innerContent = `
            <rect x="0" y="142" width="238" height="48" fill="url(#pipeGradH)" stroke="#0a0908" stroke-width="5"/>
            <rect x="95" y="0" width="48" height="332" fill="url(#pipeGradV)" stroke="#0a0908" stroke-width="5"/>
            <circle cx="119" cy="166" r="28" fill="#8b5cf6" stroke="#0a0908" stroke-width="4"/>
            <text x="119" y="172" font-family="'Rubik', sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">➕</text>
        `;
    }

    return `
    <svg viewBox="0 0 238 332" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%; display:block; border-radius:4px;">
        ${VOLTZ_SVG_DEFS}
        ${getCardBaseBackground()}
        ${innerContent}
    </svg>
    `;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderCardSvg };
}
