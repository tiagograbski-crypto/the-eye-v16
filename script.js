/* === CONFIGURAÇÕES GERAIS === */
const PASSWORDS = {
    // Senha padrão (pode ser alterada via terminal)
    default: "0000",
};

const MODE_CONFIGS = {
    // Cores e descrições para cada modo
    ORACLE: {
        accent: '#00d9ff', // Azul ciano
        title: 'ORACLE MODE V16',
        summary: 'Análise de Probabilidade e Processamento de Dados Multivetorial em Tempo Real.',
        status: 'ONLINE',
        status_class: 'status-green'
    },
    RED_ALERT: {
        accent: '#ff003c', // Vermelho
        title: 'ALERT MODE V16',
        summary: 'Alerta de Segurança e Bloqueio de Sistema Ativado. Autenticação Necessária.',
        status: 'LOCKDOWN',
        status_class: 'status-red'
    }
};

let currentMode = 'ORACLE'; // Modo inicial

/* === INICIALIZAÇÃO DO SISTEMA === */

window.onload = function() {
    // 1. Inicia o overlay de introdução
    setTimeout(startIntro, 50); 
    
    // 2. Define o modo inicial
    setSystemMode(currentMode); 
    
    // 3. Adiciona listeners
    document.getElementById('mode-selector').addEventListener('change', handleModeChange);
    document.getElementById('command-form').addEventListener('submit', handleCommand);
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', () => setSystemMode('RED_ALERT'));

    // 4. Inicia o loop de animação de dados
    setInterval(updateTelemetry, 1000);
    setInterval(updateOracleData, 3000);
    setInterval(updateChatLog, 500);

    // 5. Inicia o gráfico
    initChart();
};

/* --- TELA DE INTRODUÇÃO --- */

function startIntro() {
    const introOverlay = document.getElementById('intro-overlay');
    const introContent = document.querySelector('.intro-content');
    const securityOverlay = document.getElementById('security-overlay');

    // Atraso de 2 segundos para simular a inicialização
    setTimeout(() => {
        // Mostra a tela de login (RED_ALERT)
        securityOverlay.style.display = 'flex';
        // Começa a animação de fade-out da introdução
        introOverlay.classList.add('fade-out');

        // Remove o overlay de intro após a transição
        setTimeout(() => {
            introOverlay.style.display = 'none';
        }, 1500); 
    }, 2000); 
}


/* --- TELA DE LOGIN (RED_ALERT) --- */

function handleLogin(e) {
    e.preventDefault();
    const passwordInput = document.getElementById('password-input').value;
    const loginMsg = document.getElementById('login-msg');
    
    // Verifica a senha. A senha é a default (0000) por enquanto.
    if (passwordInput === PASSWORDS.default) {
        loginMsg.textContent = 'ACESSO CONCEDIDO';
        loginMsg.style.color = MODE_CONFIGS.ORACLE.accent;
        
        setTimeout(() => {
            document.getElementById('security-overlay').style.display = 'none';
            setSystemMode('ORACLE'); // Muda para o modo normal
        }, 1000);
    } else {
        loginMsg.textContent = 'FALHA DE AUTENTICAÇÃO';
        loginMsg.style.color = MODE_CONFIGS.RED_ALERT.accent;
        // Limpa a mensagem após um tempo
        setTimeout(() => {
            loginMsg.textContent = '';
        }, 2000);
    }
}


/* === CONTROLE DE MODO DO SISTEMA === */

function setSystemMode(mode) {
    // Guarda o modo atual
    currentMode = mode; 
    
    // Carrega a configuração de cores e textos
    const config = MODE_CONFIGS[mode];
    
    // 1. Atualiza as variáveis CSS para cores
    document.documentElement.style.setProperty('--accent-blue', config.accent);
    
    // 2. Atualiza o status do dashboard
    document.getElementById('system-title').textContent = config.title;
    document.getElementById('ai-summary').textContent = config.summary;
    document.getElementById('status-card').className = 'ai-card status-card ' + config.status_class;
    document.getElementById('status-title').textContent = config.status;

    // 3. Controla a tela de bloqueio
    if (mode === 'RED_ALERT') {
        document.getElementById('lockdown-screen').style.display = 'flex';
    } else {
        document.getElementById('lockdown-screen').style.display = 'none';
    }

    // 4. Seleciona a opção correta no dropdown
    document.getElementById('mode-selector').value = mode;

    // 5. Adiciona mensagem de log
    if (mode === 'RED_ALERT') {
        addToChatLog('SYSTEM', 'PROTOCOL RED_ALERT ATIVADO. BLOQUEIO DE SISTEMA.');
    } else if (mode === 'ORACLE') {
        addToChatLog('SYSTEM', 'PROTOCOL ORACLE RESTAURADO. ANÁLISE INICIADA.');
    }
}

function handleModeChange(e) {
    const newMode = e.target.value;
    // O modo RED_ALERT só pode ser ativado, não desativado por aqui
    if (newMode === 'RED_ALERT') {
        setSystemMode('RED_ALERT');
    } else if (newMode === 'ORACLE') {
        // Redireciona para o login se estiver em modo de alerta
        if (currentMode === 'RED_ALERT') {
            document.getElementById('security-overlay').style.display = 'flex';
            document.getElementById('password-input').value = '';
            document.getElementById('login-msg').textContent = '';
        } else {
            setSystemMode('ORACLE');
        }
    }
}

/* === DADOS E GRÁFICOS === */

// Função de Chart.js
let telemtryChart;
let chartData = [50, 50, 50, 50, 50];

function initChart() {
    const ctx = document.getElementById('telemetry-chart').getContext('2d');
    telemtryChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0', '1', '2', '3', '4'],
            datasets: [{
                label: 'Sinal',
                data: chartData,
                backgroundColor: 'rgba(0, 217, 255, 0.1)',
                borderColor: 'var(--accent-blue)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0, max: 100,
                    grid: { color: 'rgba(51, 51, 51, 0.5)' },
                    ticks: { color: '#666' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#666' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            animation: false
        }
    });
}

function updateTelemetry() {
    if (currentMode !== 'ORACLE') return;

    // 1. Atualiza o gráfico (rolling data)
    const newValue = Math.floor(Math.random() * 80) + 10; // 10 a 90
    chartData.push(newValue);
    chartData.shift();
    
    telemtryChart.data.datasets[0].data = chartData;
    telemtryChart.update();

    // 2. Atualiza os dados do grid (telemetry-grid)
    document.getElementById('temp-value').textContent = (Math.random() * (45 - 30) + 30).toFixed(2) + '°C';
    document.getElementById('load-value').textContent = (Math.random() * 100).toFixed(1) + '%';
    document.getElementById('band-value').textContent = (Math.random() * 500).toFixed(0) + 'Mbps';
    document.getElementById('latency-value').textContent = (Math.random() * 10).toFixed(1) + 'ms';
}

function updateOracleData() {
    if (currentMode !== 'ORACLE') return;
    
    // Atualiza o medidor de probabilidade
    const prob = (Math.random() * (99.9 - 70.0) + 70.0).toFixed(1);
    document.getElementById('prob-meter').textContent = prob + '%';
    
    // Troca a cor do medidor dependendo da probabilidade
    const probColor = prob > 90 ? MODE_CONFIGS.ORACLE.accent : '#ffcc00';
    document.getElementById('prob-meter').style.color = probColor;
    document.getElementById('prob-meter').style.textShadow = 0 0 10px ${probColor};

}

/* === TERMINAL DE CHAT === */

function handleCommand(e) {
    e.preventDefault();
    const commandInput = document.getElementById('user-command');
    const command = commandInput.value.trim().toLowerCase();
    commandInput.value = '';

    if (command === '') return;

    // 1. Adiciona o comando do usuário ao log
    addToChatLog('USER', command);

    // 2. Processa o comando
    let response = '';
    
    if (currentMode === 'RED_ALERT') {
        response = 'ERRO: SISTEMA BLOQUEADO. NECESSÁRIA AUTENTICAÇÃO.';
    } else if (command === 'help') {
        response = 'COMANDOS DISPONÍVEIS: status, log, lockdown, setpass <senha>.';
    } else if (command === 'status') {
        response = STATUS OPERACIONAL: ${MODE_CONFIGS[currentMode].status}. PROB: ${document.getElementById('prob-meter').textContent};
    } else if (command === 'log') {
        response = 'LOG: Nenhuma anomalia crítica registrada nas últimas 24 horas.';
    } else if (command === 'lockdown') {
        response = 'ATIVANDO PROTOCOL RED_ALERT...';
        setTimeout(() => setSystemMode('RED_ALERT'), 1000);
    } else if (command.startsWith('setpass')) {
        const parts = command.split(' ');
        if (parts.length === 2 && parts[1].length >= 4) {
            PASSWORDS.default = parts[1];
            response = SUCESSO: Senha alterada para ${parts[1]}.;
        } else {
            response = 'ERRO: Formato incorreto. Use: setpass <nova senha com 4 ou mais dígitos>.';
        }
    } else {
        response = COMANDO "${command}" NÃO RECONHECIDO. Tente 'help'.;
    }

    // 3. Adiciona a resposta da IA ao log após um pequeno delay
    setTimeout(() => addToChatLog('AI', response), 500);
}

function addToChatLog(type, message) {
    const chatOutput = document.getElementById('chat-output');
    const msgDiv = document.createElement('div');
    
    msgDiv.className = 'msg ' + type.toLowerCase();
    
    // Prefixo para a mensagem
    let prefix = '';
    if (type === 'USER') prefix = '>> ';
    else if (type === 'AI') prefix = 'ORACLE: ';
    else if (type === 'SYSTEM') prefix = '[SYSTEM]: ';

    msgDiv.textContent = prefix + message;

    // Adiciona ao final e rola para baixo
    chatOutput.appendChild(msgDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Resposta automática da IA (para simular a atividade)
function updateChatLog() {
    if (currentMode !== 'ORACLE' || Math.random() > 0.99) return; // 1% de chance a cada 0.5s

    const messages = [
        "PROCESSANDO: Análise de sinais de entrada concluída. Padrão estável.",
        "MONITORANDO: Tráfego de dados na banda V-10 está nominal.",
        "ALARME: Nível de anomalia abaixo do limiar de alerta. Continuar monitoramento.",
        "INFO: Reconfigurando o algoritmo de predição temporal."
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    addToChatLog('AI', randomMessage);
}
