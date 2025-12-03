/* === script.js: LÓGICA DE MONITORAMENTO SIMPLIFICADA === */

const NIVEIS_RISCO = {
    ESTAVEL: 'verde',
    ATENCAO: 'amarelo',
    ALERTA: 'marrom', 
    EMERGENCIA: 'vermelho' 
};

let statusAmeacaEnergia = NIVEIS_RISCO.ALERTA; 
let statusAmeacaInternet = NIVEIS_RISCO.ALERTA; 
let modoAtual = 'geopolitico';
let vozAtiva = false; 


function monitorarAmeacas() {
    const mapaRisco = document.getElementById('mapa-risco');
    const alertaGatilho = NIVEIS_RISCO.ALERTA; 

    // GATILHO: SE HOUVER ALERTA OU EMERGÊNCIA, FORÇA O MODO CRÍTICO
    if (statusAmeacaEnergia === NIVEIS_RISCO.EMERGENCIA || statusAmeacaInternet === NIVEIS_RISCO.EMERGENCIA || statusAmeacaEnergia === alertaGatilho || statusAmeacaInternet === alertaGatilho) {
        if (modoAtual !== 'crise') {
             // Se for Emergência (Vermelho), troca para crise. Se for Alerta (Marrom), permanece.
             trocarModo('crise');
        }
    } else if (modoAtual !== 'geopolitico') {
        trocarModo('geopolitico');
    }

    // ATUALIZA A COR DO MAPA
    let maiorRisco = NIVEIS_RISCO.ESTAVEL;
    if (statusAmeacaEnergia === NIVEIS_RISCO.EMERGENCIA || statusAmeacaInternet === NIVEIS_RISCO.EMERGENCIA) {
        maiorRisco = NIVEIS_RISCO.EMERGENCIA;
    } else if (statusAmeacaEnergia === NIVEIS_RISCO.ALERTA || statusAmeacaInternet === NIVEIS_RISCO.ALERTA) {
        maiorRisco = NIVEIS_RISCO.ALERTA;
    }
    
    mapaRisco.className = ''; 
    mapaRisco.classList.add('risco-' + maiorRisco);
}

function trocarModo(modoNovo) {
    if (modoAtual === modoNovo) return;
    
    document.querySelectorAll('.modo-painel').forEach(panel => {
        panel.classList.remove('ativo'); 
        panel.style.display = 'none'; 
    });
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.classList.remove('ativo');
    });

    const painelSelecionado = document.getElementById('modo-' + modoNovo);
    if (painelSelecionado) {
        painelSelecionado.classList.add('ativo');
        painelSelecionado.style.display = 'block'; 
    }

    const botaoSelecionado = document.querySelector('.btn-modo[data-modo="' + modoNovo + '"]');
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


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.addEventListener('click', function() {
            trocarModo(this.getAttribute('data-modo'));
        });
    });
    
    document.getElementById('icone-voz').addEventListener('click', toggleComandoVoz);

    trocarModo('geopolitico');

    // Inicia a monitoração de ameaças
    setInterval(monitorarAmeacas, 5000); 
    monitorarAmeacas();
});
