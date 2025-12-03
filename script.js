/* === script.js: LÓGICA ESTÁVEL V17 === */

const NIVEIS_RISCO = { ALERTA: 'marrom', EMERGENCIA: 'vermelho', ESTAVEL: 'verde' };
let statusAmeaca = NIVEIS_RISCO.ALERTA; // Inicia em Alerta (Marrom)
let modoAtual = 'geopolitico';

function monitorarAmeacas() {
    const mapaRisco = document.getElementById('mapa-risco');
    
    // Lógica simples para forçar a visualização do modo Crise
    if (statusAmeaca === NIVEIS_RISCO.EMERGENCIA) {
        if (modoAtual !== 'crise') trocarModo('crise');
    } else if (modoAtual !== 'geopolitico') {
        trocarModo('geopolitico');
    }

    // Atualiza a cor do mapa
    mapaRisco.className = 'risco-' + statusAmeaca;
}

function trocarModo(modoNovo) {
    if (modoAtual === modoNovo) return;
    
    // O JS gerencia a exibição explicitamente (Correção de estabilidade)
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

function fecharAlertaPrioritario() {
    // Simplesmente esconde o alerta
    document.getElementById('alerta-prioridade').style.display = 'none';
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.addEventListener('click', function() {
            trocarModo(this.getAttribute('data-modo'));
        });
    });
    
    trocarModo('geopolitico');
    setInterval(monitorarAmeacas, 5000); 
    monitorarAmeacas();
});
