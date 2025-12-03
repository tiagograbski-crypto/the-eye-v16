/* === CÓDIGO JAVASCRIPT ESSENCIAL === */

// Função para fechar o alerta prioritário
function fecharAlertaPrioritario() {
    const alerta = document.getElementById('alerta-prioridade');
    if (confirm("Você confirma o fechamento deste Alerta Prioritário? Somente você pode fazer isso.")) {
        // Você pode apenas ocultar o alerta após a confirmação
        alerta.style.display = 'none';
        console.log("Alerta prioritário fechado e confirmado.");
    }
}

// Função para alternar entre os modos do painel
function trocarModo(modoAtivo) {
    // 1. Oculta todos os painéis
    document.querySelectorAll('.modo-painel').forEach(panel => {
        panel.style.display = 'none';
        panel.classList.remove('ativo');
    });

    // 2. Desativa o estilo 'ativo' de todos os botões
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.classList.remove('ativo');
    });

    // 3. Exibe o painel selecionado e marca o botão como ativo
    const painelSelecionado = document.getElementById('modo-' + modoAtivo);
    if (painelSelecionado) {
        painelSelecionado.style.display = 'block';
        painelSelecionado.classList.add('ativo');
    }

    // 4. Marca o botão clicado como ativo
    document.querySelector('.btn-modo[data-modo="' + modoAtivo + '"]').classList.add('ativo');
}

// Função para expandir/colapsar o Histórico de Missões
function toggleHistorico() {
    const detalhes = document.getElementById('detalhes-historico');
    if (detalhes.style.display === 'none') {
        detalhes.style.display = 'block';
    } else {
        detalhes.style.display = 'none';
    }
}

// Event Listener para a troca de modos (ativa a função de troca)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.addEventListener('click', function() {
            trocarModo(this.getAttribute('data-modo'));
        });
    });
    
    // Configura o modo Geopolítico como inicial
    trocarModo('geopolitico');
});
