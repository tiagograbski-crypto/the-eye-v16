/* === script.js: LÓGICA DE MONITORAMENTO E COMUNICAÇÃO ATIVA === */

// VARIÁVEIS DE ESTADO GLOBAL (Simulando dados de backend/API)
const NIVEIS_RISCO = {
    ESTAVEL: 'verde',
    ATENCAO: 'amarelo',
    ALERTA: 'marrom', // Grau Médio (Gatilho de Crise)
    EMERGENCIA: 'vermelho' // Grau Forte (Gatilho de Crise Total)
};

// SIMULAÇÃO DO STATUS DE AMEAÇA ATUAL
let statusAmeacaEnergia = NIVEIS_RISCO.ALERTA; // Exemplo: Começa em Alerta (Marrom)
let statusAmeacaInternet = NIVEIS_RISCO.ALERTA; // Exemplo: Começa em Alerta (Laranja/Marrom)
let modoAtual = 'geopolitico';
let vozAtiva = false; // Status inicial do comando de voz

// ====================================================================
// FUNÇÕES DE LÓGICA DO PAINEL
// ====================================================================

/**
 * Funcao principal: Monitora ameacas e dispara a mudanca automatica de modo.
 * Esta funcao deve ser rodada em loop (setInterval).
 */
function monitorarAmeacas() {
    const mapaRisco = document.getElementById('mapa-risco');
    const alertaGatilho = NIVEIS_RISCO.ALERTA; 

    // 1. CHECA GATILHO PARA MUDANÇA AUTOMÁTICA DE MODO (Se houver crise, o painel muda sozinho)
    if (statusAmeacaEnergia === NIVEIS_RISCO.EMERGENCIA || statusAmeacaInternet === NIVEIS_RISCO.EMERGENCIA) {
        // Se houver Emergência (Vermelho), forçamos o Modo Crise
        if (modoAtual !== 'crise') {
            trocarModo('crise');
            console.warn("GATILHO AUTOMÁTICO: Ameaça de Emergência detectada. Modo CRISE ativado.");
        }
    } else if (statusAmeacaEnergia === alertaGatilho || statusAmeacaInternet === alertaGatilho) {
        // Se houver Alerta (Marrom), mantemos em Geopolítico, mas atualizamos o mapa.
        if (modoAtual !== 'geopolitico' && modoAtual !== 'crise') {
            trocarModo('geopolitico');
        }
    }

    // 2. ATUALIZA A COR DO MAPA (Baseado na ameaça mais alta)
    let maiorRisco = NIVEIS_RISCO.ESTAVEL;
    if (statusAmeacaEnergia === NIVEIS_RISCO.EMERGENCIA || statusAmeacaInternet === NIVEIS_RISCO.EMERGENCIA) {
        maiorRisco = NIVEIS_RISCO.EMERGENCIA;
    } else if (statusAmeacaEnergia === NIVEIS_RISCO.ALERTA || statusAmeacaInternet === NIVEIS_RISCO.ALERTA) {
        maiorRisco = NIVEIS_RISCO.ALERTA;
    }

    // Aplica a classe de cor correspondente ao mapa
    mapaRisco.className = ''; 
    mapaRisco.classList.add('risco-' + maiorRisco);
}


/**
 * Funcao de troca de modos (ativa/passiva).
 */
function trocarModo(modoNovo) {
    if (modoAtual === modoNovo) return;
    
    // 1. Oculta todos os painéis e desativa botões
    document.querySelectorAll('.modo-painel').forEach(panel => {
        panel.style.display = 'none';
    });
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.classList.remove('ativo');
    });

    // 2. Exibe o painel selecionado
    const painelSelecionado = document.getElementById('modo-' + modoNovo);
    if (painelSelecionado) {
        painelSelecionado.style.display = 'block';
    }

    // 3. Marca o botão e atualiza o estado
    const botaoSelecionado = document.querySelector('.btn-modo[data-modo="' + modoNovo + '"]');
    if (botaoSelecionado) {
        botaoSelecionado.classList.add('ativo');
    }
    modoAtual = modoNovo;
    console.log("Modo alterado para: " + modoNovo);
}


/**
 * LOGICA DE COMANDO DE VOZ (Ativar/Desativar Microfone)
 */
function toggleComandoVoz() {
    const iconeVoz = document.getElementById('icone-voz');
    
    if (vozAtiva) {
        // Desativa
        vozAtiva = false;
        iconeVoz.classList.remove('voz-ativa');
        console.log("Comando de Voz DESATIVADO.");
    } else {
        // Ativa
        vozAtiva = true;
        iconeVoz.classList.add('voz-ativa');
        console.log("Comando de Voz ATIVADO. Aguardando comandos...");
    }
}


// ====================================================================
// FUNÇÕES DE INTERAÇÃO BÁSICA (UX)
// ====================================================================

function fecharAlertaPrioritario() {
    const alerta = document.getElementById('alerta-prioridade');
    if (confirm("CONFIRMAR FECHAMENTO: Esta é uma Ação Prioritária. Deseja prosseguir?")) {
        alerta.style.display = 'none';
        console.log("Alerta prioritário fechado pelo usuário.");
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

    // Inicia a monitoração de ameaças a cada 5 segundos (simulação de polling de API)
    setInterval(monitorarAmeacas, 5000); 

    // Força a primeira execução da monitoração para aplicar o estado inicial
    monitorarAmeacas();
});
