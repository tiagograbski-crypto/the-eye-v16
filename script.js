/* --- THE EYE V17.1: CORREÇÃO TOTAL DE DADOS E INTEGRAÇÃO LOCAL --- */

// === 1. CONFIGURAÇÕES DE SEGURANÇA ===
const SECURE_HASH = "8d23cf6c86e834a7aa6ededb4078cd297594451087f941f7112ee5608b471207";
const ACCESS_PIN = "1984";
const EMERGENCY_OVERRIDE = "OMEGA-ZERO-RESET-SYSTEM";
const MAX_ATTEMPTS = 3;
let failedAttempts = 0;
let voiceEnabled = true; 

// === 2. CONFIGURAÇÕES GLOBAIS E LOCAIS ===
let myChart = null;
let chartData = Array(10).fill(0);
const UPDATE_INTERVAL = 5000; // 5 segundos para o gráfico

let userCoords = null; // Armazena a localização do usuário após permissão

// Coordenadas de Chapecó (Fallback de Emergência)
const CHAPECO_LAT = -27.095; 
const CHAPECO_LON = -52.618;

const MODES = {
    'CRISIS': { color: '#ff003c', label: 'NÍVEL GLOBAL', labels: ['SISMO', 'NEOs', 'CLIMA LOCAL', 'GUERRA'] },
    'CYBER': { color: '#00d9ff', label: 'REDE', labels: ['FIREWALL', 'LOAD', 'BLOCKS', 'VPN'] },
    'MARKETING': { color: '#00ff41', label: 'LEADS', labels: ['LEADS', 'ROI', 'SENTIMENT', 'VIEWS'] }
};

let currentMode = 'CRISIS';
let currentRisk = 0; // Valor que alimenta o gráfico e o %
let activeThreats = [];

// Elementos DOM (Necessários para todas as funções)
const elPrediction = document.getElementById('prediction-percent');
const elSummary = document.getElementById('ai-summary');
const elStatusTitle = document.getElementById('status-title');
const elStatusCard = document.getElementById('status-card');

// === 3. INICIALIZAÇÃO E LOOPS ===
document.addEventListener("DOMContentLoaded", () => {
    // A tela de login está oculta no HTML, então o sistema inicia forçadamente aqui.
    initSystem();
});

function initSystem() {
    startClock(); 
    initChart(); 
    getGeolocation(); // Pede a localização do usuário
    // Chamada inicial de coleta e análise
    fetchAllData();
    // Loop de atualização a cada 5 segundos
    setInterval(fetchAllData, UPDATE_INTERVAL); 
}

// === 4. GEOLOCALIZAÇÃO E CLIMA LOCAL ===

function getGeolocation() {
    // Pede a permissão do usuário para usar a localização
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(3);
                const lon = position.coords.longitude.toFixed(3);
                userCoords = { lat, lon }; // Salva as coordenadas
                document.getElementById('location-box').innerText = `📍 LOCAL: ${lat}, ${lon}`;
                fetchWeatherByCoords(lat, lon, false); // Puxa o clima
            },
            (error) => {
                // Se o usuário negar, usa o fallback de Chapecó
                document.getElementById('location-box').innerText = `📍 GEOLOC. NEGADA (Fallback C.P.)`;
                fetchWeatherByCoords(CHAFECO_LAT, CHAPECO_LON, true); 
            }
        );
    } else {
        document.getElementById('location-box').innerText = "📍 GEOLOC. INDISPONÍVEL";
        fetchWeatherByCoords(CHAFECO_LAT, CHAPECO_LON, true);
    }
}

async function fetchWeatherByCoords(lat, lon, isFallback) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const res = await fetch(url);
        const data = await res.json();
        
        const temp = data.current_weather.temperature;
        
        let label = isFallback ? "CLIMA (C.P.)" : "CLIMA (LOCAL)";
        document.getElementById('val-3').innerHTML = `${temp}°C <br><span style="font-size:0.7em;">${label}</span>`;
        
        // Alerta de Crise: Temperatura Acima de 30°C (em qualquer localização que ele esteja vendo)
        if (temp > 30.0) {
            activeThreats.push("Alerta Térmico Local");
            speak(`Alerta! Temperatura local atingiu ${temp} graus.`);
        }
    } catch(e) {
        document.getElementById('val-3').innerHTML = "CLIMA OFFLINE";
    }
}

// === 5. COLETA E PROCESSAMENTO DE DADOS (INTERVALO) ===

async function fetchAllData() {
    activeThreats = []; // Limpa alertas
    
    // 1. Atualiza Clima: Usa a localização do usuário, se disponível
    if (userCoords) {
        fetchWeatherByCoords(userCoords.lat, userCoords.lon, false);
    } else {
        // Se ainda não conseguiu a localização, tenta o fallback
        fetchWeatherByCoords(CHAFECO_LAT, CHAPECO_LON, true);
    }
    
    // 2. Outras Chamadas de API
    await Promise.all([
        fetchEarthquakes(), 
        fetchNewsAndCyber()
    ]);
    
    runAIAnalysis();
}

// --- API 1: SISMOS (USGS) - CORREÇÃO DE LOCALIZAÇÃO ---
async function fetchEarthquakes() {
    try {
        // Puxa sismos maiores que 2.5 nas últimas 24h
        const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
        const data = await res.json();
        
        let maxMag = 0;
        let maxPlace = 'NENHUM';
        
        data.features.forEach(q => { 
            if(q.properties.mag > maxMag) {
                maxMag = q.properties.mag;
                maxPlace = q.properties.place; 
            } 
        });

        const valElement = document.getElementById('val-1');
        
        if (maxMag > 0) {
            // Exibe Magnitude e Cidade
            valElement.innerHTML = `MAG ${maxMag.toFixed(1)}<br><span style="font-size:0.7em;">${maxPlace.split(',')[0].toUpperCase()}</span>`;
        } else {
            valElement.innerHTML = `SCAN <br><span style="font-size:0.7em;">NOMINAL</span>`;
        }

        // Contribuição para o Risco Global
        if (maxMag >= 6.0) activeThreats.push("Sismo > 6.0");
    } catch(e) { 
        document.getElementById('val-1').innerHTML = "ERRO SISMOS";
    }
}

// --- API 3: NOTÍCIAS DE GUERRA (RSS) - CONTRIBUIÇÃO PARA O RISCO ---
async function fetchNewsAndCyber() {
    // (Simplificado)
    let warCount = Math.floor(Math.random() * 5); // Simula 0-5 notícias de guerra
    document.getElementById('val-4').innerText = `${warCount} Ocorrências`;
    
    if (warCount >= 3) activeThreats.push("Tensão Geopolítica");
}

// --- 6. LÓGICA DA IA E GRÁFICO ---
function runAIAnalysis() {
    // SOMA DOS RISCOS: 15 pontos por ameaça ativa.
    currentRisk = activeThreats.length * 15 + Math.floor(Math.random() * 10);
    if (currentRisk > 99) currentRisk = 99;

    // 1. Atualiza Gráfico
    const config = MODES[currentMode];
    updateChart(currentRisk, config.color);
    
    // 2. Atualiza Nível de Atividade (Porcentagem)
    elPrediction.innerText = `${currentRisk}%`;
    elPrediction.style.color = currentRisk < 30 ? "#00ff41" : currentRisk < 70 ? "#ffcc00" : "#ff003c";
    
    // 3. Resumo da IA
    if (activeThreats.length > 0) {
        elSummary.innerText = `ALERTA: Detectados ${activeThreats.join(', ')}. ANALISANDO PRIORIDADES.`;
        elSummary.style.color = "#ffcc00";
        elStatusTitle.innerText = "ALERTA";
        elStatusCard.className = 'status-red';
        // A voz é ativada dentro do fetchWeatherByCoords ou fetchEarthquakes se o alerta for crítico
    } else {
        elSummary.innerText = "Sistemas Globais e Locais Estáveis. Sensores operacionais.";
        elSummary.style.color = "var(--text-main)";
        elStatusTitle.innerText = "NOMINAL";
        elStatusCard.className = 'status-green';
    }

    // 4. Salva Log
    document.getElementById('hidden-log').value += `[${new Date().toLocaleTimeString()}] ${currentMode}: Risco ${currentRisk}%\n`;
}


// --- UTILS (Mantido) ---
function startClock() { setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000); }
function initStealthMode() {
    // Remove a parte de "SATÉLITE BUSCANDO SINAL..." para focar na Geolocalização real
    // A função de localização real (getGeolocation) agora é responsável por atualizar 'location-box'.
}
// Gráfico (Chart.js)
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
    myChart.data.datasets[0].data = chartData;
    myChart.data.datasets[0].borderColor = color;
    myChart.data.datasets[0].backgroundColor = color + '20';
    myChart.update();
}

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
    const content = `=== RELATÓRIO TÁTICO THE EYE V17.1 ===\nDATA: ${date}\nMODO: ${currentMode}\nRISCO ATUAL: ${currentRisk}%\nLOGS:\n${document.getElementById('hidden-log').value}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `RELATORIO_${Date.now()}.txt`;
    a.click();
    speak("Relatório tático baixado com sucesso.");
}

function changeMode() {
    currentMode = document.getElementById('mode-selector').value;
    // Força a atualização dos dados e cores para o novo modo
    runAIAnalysis(); 
    addChatMsg("system", `> Modo alterado para: ${currentMode}`);
    speak(`Mudando para modo ${currentMode}.`);
}

function addChatMsg(type, text) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = text;
    document.getElementById('chat-output').appendChild(div);
    document.getElementById('chat-output').scrollTop = document.getElementById('chat-output').scrollHeight;
}

function clearTerminal() { document.getElementById('chat-output').innerHTML = '<div class="msg system">> Memória limpa.</div>'; }

function handleEnter(e) { if(e.key === 'Enter') sendMessage(); }
function sendMessage() {
    const input = document.getElementById('user-command');
    const txt = input.value.trim();
    if(!txt) return;
    addChatMsg("user", txt);
    input.value = "";
    setTimeout(() => { processAIResponse(txt); }, 600);
}

function processAIResponse(userText) {
    const txt = userText.toLowerCase();
    let response = "";

    if (txt.includes('status')) response = `Status de ${currentMode}: Operando a ${currentRisk}% da capacidade de risco.`;
    else if (txt.includes('analise')) response = "Análise preliminar indica estabilidade.";
    else response = "Comando processado. Sem anomalias.";

    addChatMsg("ai", `> ${response}`);
    speak(response);
}

// (As funções de login (attemptLogin, unlockSystem) estão ocultas para foco, mas não devem ser apagadas se estiverem no seu script)
