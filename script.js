/* --- THE EYE V17.0: CORREÇÃO TOTAL DE DADOS E INTEGRAÇÃO LOCAL --- */

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

// Coordenadas de Chapecó (para o Alerta de 30°C)
const CHAPECO_LAT = -27.095; 
const CHAPECO_LON = -52.618;

const MODES = {
    'CRISIS': { color: '#ff003c', label: 'NÍVEL GLOBAL', labels: ['SISMO', 'NEOs', 'CLIMA C.P.', 'GUERRA'] },
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
    initStealthMode();
    // Chamada inicial de coleta e análise
    fetchAllData();
    // Loop de atualização a cada 5 segundos
    setInterval(fetchAllData, UPDATE_INTERVAL); 
}

// === 4. COLETA E PROCESSAMENTO DE DADOS ===

async function fetchAllData() {
    activeThreats = []; // Limpa alertas
    
    // Chamadas de API (promessas para rodarem juntas)
    await Promise.all([
        fetchEarthquakes(), 
        fetchChapecowWeather(), // Alerta de Chapecó
        fetchNewsAndCyber()
        // NASA e outros dados serão puxados aqui no futuro
    ]);
    
    runAIAnalysis();
}

// --- API 1: SISMOS (USGS) - CORREÇÃO DE LOCALIZAÇÃO ---
async function fetchEarthquakes() {
    try {
        const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
        const data = await res.json();
        
        // Puxa o maior sismo
        let maxMag = 0;
        let maxPlace = 'Sem Sismos Relevantes';
        
        data.features.forEach(q => { 
            if(q.properties.mag > maxMag) {
                maxMag = q.properties.mag;
                maxPlace = q.properties.place; // Puxa a localização
            } 
        });

        const valElement = document.getElementById('val-1');
        valElement.innerHTML = `MAG ${maxMag.toFixed(1)}<br><span style="font-size:0.7em;">${maxPlace.split(',')[0]}</span>`;
        
        // Contribuição para o Risco Global
        if (maxMag >= 6.0) activeThreats.push("Sismo > 6.0");
    } catch(e) { 
        document.getElementById('val-1').innerHTML = "ERRO SISMOS";
    }
}

// --- API 2: CLIMA LOCAL (OPEN-METEO) - ALERTA DE CHAPECÓ ---
async function fetchChapecowWeather() {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${CHAFECO_LAT}&longitude=${CHAFECO_LON}&current_weather=true`;
        const res = await fetch(url);
        const data = await res.json();
        
        const temp = data.current_weather.temperature;
        
        document.getElementById('val-3').innerHTML = `${temp}°C (C.P.)`;
        
        // Alerta de Crise: Temperatura Acima de 30°C
        if (temp > 30.0) {
            activeThreats.push("Alerta Térmico Chapecó");
            speak(`Alerta! Temperatura em Chapecó atingiu ${temp} graus.`);
        }
    } catch(e) {
        document.getElementById('val-3').innerHTML = "CLIMA OFFLINE";
    }
}

// --- API 3: NOTÍCIAS DE GUERRA (RSS) - CONTRIBUIÇÃO PARA O RISCO ---
async function fetchNewsAndCyber() {
    // (Simplificado)
    let warCount = Math.floor(Math.random() * 5); // Simula 0-5 notícias de guerra
    document.getElementById('val-4').innerText = `${warCount} Ocorrências`;
    
    if (warCount >= 3) activeThreats.push("Tensão Geopolítica");
}

// --- 5. LÓGICA DA IA E GRÁFICO ---
function runAIAnalysis() {
    // SOMA DOS RISCOS: 1 ponto por ameaça ativa.
    currentRisk = activeThreats.length * 15 + Math.floor(Math.random() * 10);
    if (currentRisk > 99) currentRisk = 99;

    // 1. Atualiza Gráfico
    const config = MODES[currentMode];
    updateChart(currentRisk, config.color);
    
    // 2. Atualiza Nível de Atividade (Porcentagem)
    elPrediction.innerText = `${currentRisk}%`;
    elPrediction.style.color = currentRisk < 30 ? "var(--accent-green)" : currentRisk < 70 ? "#ffcc00" : "var(--accent-red)";
    
    // 3. Resumo da IA
    if (activeThreats.length > 0) {
        elSummary.innerText = `ALERTA: Detectados ${activeThreats.join(', ')}.`;
        elSummary.style.color = "#ffcc00";
        elStatusTitle.innerText = "ALERTA";
        elStatusCard.className = 'status-red';
        speak(`Alerta! ${activeThreats[0]} detectado.`);
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
    const locBox = document.getElementById('location-box');
    const locs = ["SAT-LINK: ALPHA", "SAT-LINK: BRAVO", "SAT-LINK: OMEGA"];
    setInterval(() => { locBox.innerText = `📍 ${locs[Math.floor(Math.random()*locs.length)]}`; }, 4000);
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

function changeMode() {
    currentMode = document.getElementById('mode-selector').value;
    updateDashboard();
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

// (O restante das funções de terminal, login, etc., é mantido mas ocultado aqui para foco)
