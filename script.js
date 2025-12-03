/* === script.js: LÓGICA E DINAMISMO === */

// Função de troca de modos: Garante que apenas um modo e um botão estejam ativos.
function trocarModo(modoAtivo) {
    // 1. Oculta todos os painéis
    document.querySelectorAll('.modo-painel').forEach(panel => {
        panel.style.display = 'none';
    });

    // 2. Desativa o estilo 'ativo' de todos os botões
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.classList.remove('ativo');
    });

    // 3. Exibe o painel selecionado
    const painelSelecionado = document.getElementById('modo-' + modoAtivo);
    if (painelSelecionado) {
        painelSelecionado.style.display = 'block';
    }

    // 4. Marca o botão correspondente como ativo
    const botaoSelecionado = document.querySelector('.btn-modo[data-modo="' + modoAtivo + '"]');
    if (botaoSelecionado) {
        botaoSelecionado.classList.add('ativo');
    }
}

// Função para fechar o alerta prioritário (Ação Crítica)
function fecharAlertaPrioritario() {
    const alerta = document.getElementById('alerta-prioridade');
    if (confirm("CONFIRMAR FECHAMENTO: Esta é uma Ação Prioritária. Deseja prosseguir?")) {
        alerta.style.display = 'none';
        console.log("Alerta prioritário fechado.");
    }
}

// Função para expandir/colapsar o Histórico de Missões (Prévia)
function toggleHistorico() {
    const detalhes = document.getElementById('detalhes-historico');
    // Alterna o estilo de display (block/none)
    if (detalhes.style.display === 'none' || detalhes.style.display === '') {
        detalhes.style.display = 'block';
    } else {
        detalhes.style.display = 'none';
    }
}

// Inicialização: Ativa o modo Geopolítico por padrão e configura os listeners
document.addEventListener('DOMContentLoaded', () => {
    // Configura o evento de clique para todos os botões de modo
    document.querySelectorAll('.btn-modo').forEach(button => {
        button.addEventListener('click', function() {
            trocarModo(this.getAttribute('data-modo'));
        });
    });
    
    // Inicia o painel no modo padrão
    trocarModo('geopolitico');
});
