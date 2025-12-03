/* === script.js: LÓGICA V18 - CORREÇÃO DE INICIALIZAÇÃO === */

const NIVEIS_RISCO = { ALERTA: 'marrom', EMERGENCIA: 'vermelho', ESTAVEL: 'verde' };
let statusAmeaca = NIVEIS_RISCO.ALERTA; 
let modoAtual = 'geopolitico'; // O modo começa em geopolitico por padrão no HTML

function monitorarAmeacas() {
    const mapaRisco = document.getElementById('mapa-risco');
    
    // Lógica para forçar a visualização do modo Crise
    if (statusAmeaca === NIVEIS_RISCO.EMERGENCIA) {
        if (modoAtual !== 'crise') trocarModo('crise');
    } else if (statusAmeaca !== NIVEIS_RISCO.EMERGENCIA && modoAtual === 'crise') {
        // Se a crise acabar, volta para geopolítico
        trocarModo('geopolitico');
    }

    // Atualiza a cor do mapa
    mapaRisco.className = 'risco-' + statusAmeaca;
}

function trocarModo(modoNovo) {
    if (modoAtual === modoNovo) return;
    
    // 1. Oculta todos os painéis e remove a classe 'ativo'
    document.querySelectorAll('.modo-painel').forEach(panel => {
        panel.classList.remove('ativo'); 
        panel.style.display = 'none'; // Continua escondendo via JS
    });
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.classList.remove('ativo');
    });

    // 2. Exibe o painel selecionado e adiciona a classe 'ativo'
    const painelSelecionado = document.getElementById('modo-' + modoNovo);
    if (painelSelecionado) {
        painelSelecionado.classList.add('ativo');
        painelSelecionado.style.display = 'block'; 
    }

    // 3. Marca o botão
    const botaoSelecionado = document.querySelector('.btn-modo[data-modo="' + modoNovo + '"]');
    if (botaoSelecionado) {
        botaoSelecionado.classList.add('ativo');
    }
    modoAtual = modoNovo;
}

function fecharAlertaPrioritario() {
    document.getElementById('alerta-prioridade').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    // Liga os event listeners
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.addEventListener('click', function() {
            trocarModo(this.getAttribute('data-modo'));
        });
    });
    
    // Configura o botão inicial como ativo
    document.querySelector('.btn-modo[data-modo="geopolitico"]').classList.add('ativo');

    // Inicia a monitoração de ameaças
    setInterval(monitorarAmeacas, 5000); 
    monitorarAmeacas();
});
