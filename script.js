/* --- THE EYE V16.2: MODO SEGURO (SEM INTRO) --- */

// === 1. CONFIGURAÇÕES DE SEGURANÇA ===
const SECURE_HASH = "8d23cf6c86e834a7aa6ededb4078cd297594451087f941f7112ee5608b471207";
const ACCESS_PIN = "1984";
const EMERGENCY_OVERRIDE = "OMEGA-ZERO-RESET-SYSTEM"; // CHAVE DE EMERGÊNCIA
const MAX_ATTEMPTS = 3;
let failedAttempts = 0;
let voiceEnabled = true; 

// === 2. CONFIGURAÇÕES DE DADOS E MODOS ===
let myChart = null;
let chartData = Array(10).fill(0);

const MODES = {
    'CRISIS': { color: '#ff003c', label: 'NÍVEL GLOBAL', labels: ['SISMO', 'NEOs', 'CLIMA', 'WAR'] },
    'CYBER': { color: '#00d9ff', label: 'REDE', labels: ['FIREWALL', 'LOAD', 'BLOCKS', 'VPN'] },
    'MARKETING': { color: '#00ff41', label: 'LEADS', labels: ['LEADS', 'ROI', 'SENTIMENT', 'VIEWS'] }
};

let currentMode = 'CRISIS';
let currentRisk = 0;

// === 3. INICIALIZAÇÃO (BOOT) ===
document.addEventListener("DOMContentLoaded", () => {
    // A tela de login (overlay) aparece imediatamente no DOMContentLoaded
    // Não temos mais a lógica do Globo 3D, garantindo que o sistema não trave.
});


// === 4. SISTEMA DE LOGIN (PEN DRIVE + PIN + EMERGÊNCIA) ===
async function attemptLogin() {
    const fileInput = document.getElementById('usb-key-input');
    // .trim() garante que espaços extras não quebrem a senha
    const pinInput = document.getElementById('pin-input').value.trim();
    const msg = document.getElementById('login-msg');

    // 🚨 CHECK DE EMERGÊNCIA (A CHAVE QUE ESTAVA FALHANDO)
    if (pinInput === EMERGENCY_OVERRIDE) { 
        unlockSystem(); 
        return; 
    }

    // CHECK DE CHAVE FÍSICA E ERROS
    if (fileInput.files.length === 0) { 
        msg.textContent = "ERRO: CHAVE FÍSICA AUSENTE"; 
        return; 
    }
    
    // Leitura e Criptografia (SHA-256)
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = async function(e) {
        const content = e.target.result.trim();
        const msgBuffer = new TextEncoder().encode(content);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        // Conversão do Hash
        const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
        
        // CHECK FINAL (Hash Válido E PIN normal)
        if (hashHex === SECURE_HASH && pinInput === ACCESS_PIN) {
            unlockSystem();
        } else {
            failedAttempts++;
            msg.textContent = FALHA DE ACESSO ${failedAttempts}/${MAX_ATTEMPTS};
            if(failedAttempts >= MAX_ATTEMPTS) {
                document.getElementById('security-overlay').style.display = 'none';
                document.getElementById('lockdown-screen').style.display = 'flex';
            }
        }
    };
    reader.readAsText(file);
}

function unlockSystem() {
    document.getElementById('security-overlay').style.display = 'none';
    initSystem();
    speak("Identidade confirmada. Bem-vindo ao sistema Omniscient versão 16.");
}

function initSystem() {
    startClock(); 
    initChart(); 
    initStealthMode(); 
    updateDashboard();
    setInterval(updateDashboard, 5000);
}

// === 5. FUNÇÕES DE CONTROLE (VOZ, TELA, RELATÓRIO) ===

function speak(text) {
    if(!voiceEnabled) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.1; 
    window.speechSynthesis.speak(utterance);
}

function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    const btn = document.getElementById('btn-voice');
    btn.innerText = voiceEnabled ? "🔊 VOZ: ON" : "🔇 VOZ: OFF";
    btn.style.borderColor = voiceEnabled ? "var(--accent-blue)" : "#444";
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}

function downloadReport() {
    const date = new Date().toLocaleString();
    const content = === RELATÓRIO TÁTICO THE EYE V16 ===\nDATA: ${date}\nMODO: ${currentMode}\nRISCO ATUAL: ${currentRisk}%\nLOGS:\n${document.getElementById('hidden-log').value};
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = RELATORIO_${Date.now()}.txt;
    a.click();
    speak("Relatório tático baixado com sucesso.");
}

// === 6. DASHBOARD CORE ===
function initChart() {
    const ctx = document.getElementById('liveChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: { labels: ['','','','','','','','','','AGORA'], datasets: [{ label: 'Atividade', data: chartData, borderColor: '#00d9ff', backgroundColor: 'rgba(0,217,255,0.1)', borderWidth: 2, fill: true, tension: 0.4 }] },
        options: { responsive: true, maintainAspectRatio: false, animation: { duration: 1000 }, scales: { y: {display:false}, x: {display:false} }, plugins: { legend: {display:false} } }
    });
}

function updateChart(val, color) {
    chartData.shift(); chartData.push(val);
    myChart.data.datasets[0].borderColor = color;
    myChart.data.datasets[0].backgroundColor = color + '20';
    myChart.update();
}

function changeMode() {
    currentMode = document.getElementById('mode-selector').value;
    updateDashboard();
    addChatMsg("system", > Modo alterado para: ${currentMode});
    speak(Mudando para modo ${currentMode}.);
}

function updateDashboard() {
    const config = MODES[currentMode];
    document.documentElement.style.setProperty('--accent-blue', config.color);
    document.querySelectorAll('.t-item .label').forEach((lbl, i) => { if(config.labels[i]) lbl.innerText = config.labels[i]; });

    let val = 0;
    if (currentMode === 'CRISIS') {
        val = Math.floor(Math.random() * 30) + 10;
        document.getElementById('val-1').innerText = "MAG " + (val/10).toFixed(1);
        document.getElementById('val-2').innerText = "SCAN"; document.getElementById('val-3').innerText = "24°C"; document.getElementById('val-4').innerText = "NOMINAL";
    } else if (currentMode === 'CYBER') {
        val = Math.floor(Math.random() * 80) + 10;
        document.getElementById('val-1').innerText = "ON"; document.getElementById('val-2').innerText = val + "%"; document.getElementById('val-3').innerText = "0"; document.getElementById('val-4').innerText = "SECURE";
    } else {
        val = Math.floor(Math.random() * 10) + 1;
        document.getElementById('val-1').innerText = "+" + val; document.getElementById('val-2').innerText = "15x"; document.getElementById('val-3').innerText = "GOOD"; document.getElementById('val-4').innerText = "HIGH";
    }

    currentRisk = val;
    updateChart(val, config.color);
    
    document.getElementById('prediction-percent').innerText = val + "%";
    document.getElementById('prediction-percent').style.color = config.color;
    
    const statusTitle = document.getElementById('status-title');
    const statusCard = document.getElementById('status-card');
    
    if (val > 80) {
        statusTitle.innerText = "CRÍTICO";
        statusCard.className = 'status-red';
    } else {
        statusTitle.innerText = "NOMINAL";
        statusCard.className = 'status-green';
    }
    statusCard.style.borderColor = config.color;
    
    document.getElementById('hidden-log').value += [${new Date().toLocaleTimeString()}] ${currentMode}: ${val}% Risk\n;
}

// === 7. TERMINAL DE CHAT IA + VOZ (SIMPLIFICADO) ===
function handleEnter(e) { if(e.key === 'Enter') sendMessage(); }
function sendMessage() {
    const input = document.getElementById('user-command');
    const txt = input.value.trim();
    if(!txt) return;
    addChatMsg("user", txt);
    input.value = "";
    setTimeout(() => { processAIResponse(txt); }, 600);
}

function addChatMsg(type, text) {
    const div = document.createElement('div');
    div.className = msg ${type};
    div.innerText = text;
    const output = document.getElementById('chat-output');
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

function clearTerminal() { document.getElementById('chat-output').innerHTML = '<div class="msg system">> Memória limpa.</div>'; }

function processAIResponse(userText) {
    const txt = userText.toLowerCase();
    let response = "";

    if (txt.includes('status')) response = Status de ${currentMode}: Operando a ${currentRisk}% da capacidade de risco.;
    else if (txt.includes('analise')) response = "Análise preliminar indica estabilidade.";
    else response = "Comando processado. Sem anomalias.";

    addChatMsg("ai", > ${response});
    speak(response);
}

function startClock() { setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000); }
function initStealthMode() {
    const locBox = document.getElementById('location-box');
    const locs = ["SAT-LINK: ALPHA", "SAT-LINK: BRAVO", "SAT-LINK: OMEGA"];
    setInterval(() => { locBox.innerText = 📍 ${locs[Math.floor(Math.random()*locs.length)]}; }, 4000);
}
