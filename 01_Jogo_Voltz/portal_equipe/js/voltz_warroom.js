/**
 * PORTAL VOLTZ — Módulo War Room FEBRACE
 * Gerencia o diagnóstico de prontidão (0-100%), checklist dos 5 documentos e prazos da USP.
 */

const FEBRACE_CHECKLIST_DEFAULT = [
    {
        id: 'doc_plano',
        title: '1. Plano de Pesquisa & Formulário 4 (Ética)',
        category: 'Documentação Obrigatória',
        desc: 'Problema, hipóteses testáveis, delineamento experimental com seres humanos e formulários de consentimento (TCLE/TALE).',
        status: true,
        weight: 20
    },
    {
        id: 'doc_relatorio',
        title: '2. Relatório Científico Oficial (ABNT)',
        category: 'Artigo Final',
        desc: 'Artigo científico completo de 10 a 30 páginas com dados empíricos reais (N=75), estatística de Hake (⟨g⟩ = 0,64) e Cohen (d = 1,82).',
        status: true,
        weight: 30
    },
    {
        id: 'doc_diario',
        title: '3. Diário de Bordo Oficial Encadernado',
        category: 'Registro Histórico',
        desc: 'Caderno cronológico autêntico com datas, hipóteses refutadas, iterações de design (eliminação de AI-slop) e atas de playtest.',
        status: false,
        weight: 20
    },
    {
        id: 'doc_resumo',
        title: '4. Resumo Estruturado (2.500 caracteres)',
        category: 'Submissão Eletrônica',
        desc: 'Síntese executiva com problema, método psicométrico DIRECT, resultados estatísticos e impacto pedagógico.',
        status: true,
        weight: 15
    },
    {
        id: 'doc_poster_video',
        title: '5. Vídeo de Apresentação (3 min) & Pôster (90x120cm)',
        category: 'Apresentação Visual',
        desc: 'Vídeo da equipe demonstrando a quebra do modelo atenuativo e banner visual de alto impacto para a Mostra de Finalistas.',
        status: false,
        weight: 15
    }
];

class VoltzWarRoom {
    constructor() {
        this.storageKey = 'voltz_febrace_warroom_v1';
        this.items = this.loadChecklist();
    }

    loadChecklist() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) return JSON.parse(saved);
        } catch (e) {}
        return JSON.parse(JSON.stringify(FEBRACE_CHECKLIST_DEFAULT));
    }

    saveChecklist() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        } catch (e) {}
    }

    toggleItem(id) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.status = !item.status;
            this.saveChecklist();
        }
        return this.getReadinessScore();
    }

    getReadinessScore() {
        let totalWeight = 0;
        let earnedWeight = 0;
        for (const item of this.items) {
            totalWeight += item.weight;
            if (item.status) earnedWeight += item.weight;
        }
        return Math.round((earnedWeight / totalWeight) * 100);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzWarRoom, FEBRACE_CHECKLIST_DEFAULT };
}
