// CONFIGURAÇÃO DO GATE RUBI
const CONFIG = {
    PASS_KEY: "RUBI2025", // Defina sua senha aqui
    REDIRECT_URL: null    // Se quiser redirecionar para outro site ao logar, coloque a URL aqui
};

// Elementos do DOM
const btnAuth = document.getElementById('btn-auth');
const btnLogout = document.getElementById('btn-logout');
const inputKey = document.getElementById('access-key');
const gateLock = document.getElementById('gate-lock');
const systemCore = document.getElementById('system-core');
const errorMsg = document.getElementById('error-msg');

// Função de Login
function unlockGate() {
    const userKey = inputKey.value;

    if(userKey === CONFIG.PASS_KEY) {
        // Sucesso
        inputKey.style.borderColor = "#10b981"; // Verde
        
        // Animação de Saída do Login
        gateLock.style.opacity = "0";
        gateLock.style.transform = "scale(1.1)";
        
        setTimeout(() => {
            gateLock.classList.add('hidden');
            systemCore.classList.remove('hidden');
            
            // Salvar sessão (opcional)
            sessionStorage.setItem('rubi_session', 'active');
        }, 500);

    } else {
        // Erro
        errorMsg.style.display = "block";
        inputKey.style.borderColor = "red";
        
        // Efeito de "Tremer" (Shake)
        gateLock.animate([
            { transform: "translateX(0)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(0)" }
        ], { duration: 300 });
    }
}

// Função de Logout
function lockGate() {
    sessionStorage.removeItem('rubi_session');
    location.reload();
}

// Event Listeners
btnAuth.addEventListener('click', unlockGate);

inputKey.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') unlockGate();
});

if(btnLogout) {
    btnLogout.addEventListener('click', lockGate);
}

// Verificar Sessão ao Carregar
window.addEventListener('load', () => {
    if(sessionStorage.getItem('rubi_session') === 'active') {
        gateLock.classList.add('hidden');
        systemCore.classList.remove('hidden');
    }
});
