/* === script.js: LÓGICA DE MONITORAMENTO E COMUNICAÇÃO ATIVA === */

// VARIÁVEIS DE ESTADO GLOBAL (Simulando dados de backend/API)
const NIVEIS_RISCO = {
    ESTAVEL: 'verde',
    ATENCAO: 'amarelo',
    ALERTA: 'marrom', // Grau Médio (Gatilho de Crise)
    EMERGENCIA: 'vermelho' // Grau Forte (Gatilho de Crise Total)
};

// SIMULAÇÃO DO STATUS DE AMEAÇA ATUAL
let statusAmeacaEnergia = NIVEIS_RISCO.ALERTA; 
let statusAmeacaInternet = NIVEIS_RISCO.ALERTA; 
let modoAtual = 'geopolitico';
let vozAtiva = false; 

// ====================================================================
// FUNÇÕES DE LÓGICA DO PAINEL
// ====================================================================

function monitorarAmeacas() {
    const mapaRisco = document.getElementById('mapa-risco');
    const alertaGatilho = NIVEIS_RISCO.ALERTA; 

    // 1. CHECA GATILHO PARA MUDANÇA AUTOMÁTICA DE MODO
    if (statusAmeacaEnergia === NIVEIS_RISCO.EMERGENCIA || statusAmeacaInternet === NIVEIS_RISCO.EMERGENCIA) {
        if (modoAtual !== 'crise') {
            trocarModo('crise');
        }
    } else if (statusAmeacaEnergia === alertaGatilho || statusAmeacaInternet === alertaGatilho) {
        if (modoAtual !== 'geopolitico' && modoAtual !== 'crise') {
            trocarModo('geopolitico');
        }
    }

    // 2. ATUALIZA A COR DO MAPA (Implementação do Heatmap)
    let maiorRisco = NIVEIS_RISCO.ESTAVEL;
    if (statusAmeacaEnergia === NIVEIS_RISCO.EMERGENCIA || statusAmeacaInternet === NIVEIS_RISCO.EMERGENCIA) {
        maiorRisco = NIVEIS_RISCO.EMERGENCIA;
    } else if (statusAmeacaEnergia === NIVEIS_RISCO.ALERTA || statusAmeacaInternet === NIVEIS_RISCO.ALERTA) {
        maiorRisco = NIVEIS_RISCO.ALERTA;
    } else if (statusAmeacaEnergia === NIVEIS_RISCO.ATENCAO || statusAmeacaInternet === NIVEIS_RISCO.ATENCAO) {
        maiorRisco = NIVEIS_RISCO.ATENCAO;
    }

    mapaRisco.className = ''; 
    mapaRisco.classList.add('risco-' + maiorRisco);
}

function trocarModo(modoNovo) {
    if (modoAtual === modoNovo) return;
    
    document.querySelectorAll('.modo-painel').forEach(panel => {
        panel.classList.remove('ativo'); // O CSS com !important cuida do display
    });
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.classList.remove('ativo');
    });

    const painelSelecionado = document.getElementById('modo-' + modoNovo);
    if (painelSelecionado) {
        painelSelecionado.classList.add('ativo');
    }

    const botaoSelecionado = document.querySelector('.btn-modo[data-modo="' + modoNovo + '']');
    if (botaoSelecionado) {
        botaoSelecionado.classList.add('ativo');
    }
    modoAtual = modoNovo;
}


function toggleComandoVoz() {
    const iconeVoz = document.getElementById('icone-voz');
    
    if (vozAtiva) {
        vozAtiva = false;
        iconeVoz.classList.remove('voz-ativa');
    } else {
        vozAtiva = true;
        iconeVoz.classList.add('voz-ativa');
    }
}


// ====================================================================
// FUNÇÕES DE INTERAÇÃO BÁSICA (UX)
// ====================================================================

function fecharAlertaPrioritario() {
    const alerta = document.getElementById('alerta-prioridade');
    if (confirm("CONFIRMAR FECHAMENTO: Esta é uma Ação Prioritária. Deseja prosseguir?")) {
        alerta.style.display = 'none';
    }
}

function toggleHistorico() {
    const detalhes = document.getElementById('detalhes-historico');
    if (detalhes.style.display === 'none' || detalhes.style.display === '') {
        detalhes.style.display = 'block';
    } else {
        detalhes.style.display = 'none';
    }
}


// ====================================================================
// INICIALIZAÇÃO DO PAINEL
// ====================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Configura o evento de clique para os botões de modo
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.addEventListener('click', function() {
            trocarModo(this.getAttribute('data-modo'));
        });
    });
    
    // Configura o evento de clique para o ícone de voz
    document.getElementById('icone-voz').addEventListener('click', toggleComandoVoz);

    // Inicia o painel no modo padrão
    trocarModo('geopolitico');

    // Inicia a monitoração de ameaças
    setInterval(monitorarAmeacas, 5000); 
    monitorarAmeacas();
});
