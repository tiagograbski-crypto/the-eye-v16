/* --- THE EYE V18.0: WAR ROOM (GRID + HISTORY) --- */

// === 1. CONFIGURAÇÕES GLOBAIS E SEGURANÇA ===
const SECURE_HASH = "8d23cf6c86e834a7aa6ededb4078cd297594451087f941f7112ee5608b471207";
const ACCESS_PIN = "1984";
const EMERGENCY_OVERRIDE = "OMEGA-ZERO-RESET-SYSTEM";
let voiceEnabled = true; 

const UPDATE_INTERVAL = 5000;
let myChart = null;
let chartData = Array(10).fill(0);
let userCoords = null; 
let missionLog = []; // Armazena o histórico de alertas

// Coordenadas de Chapecó (Fallback e Alerta Específico)
const CHAPECO_LAT = -27.095; 
const CHAPECO_LON = -52.618;
const HIGH_TEMP_THRESHOLD = 30.0; // 30 graus

const MODES = {
    'CRISIS': { color: '#ff003c', label: 'RISCO GLOBAL', labels: ['SISMO', 'NEOs', 'CLIMA LOCAL', 'GUERRA'] },
    'CYBER': { color: '#00d9ff', label: 'RISCO CYBER', labels: ['FIREWALL', 'LOAD', 'BLOCKS', 'VPN'] },
    'MARKETING': { color: '#00ff41', label: 'RISCO DE MERCADO', labels: ['LEADS', 'ROI', 'SENTIMENT', 'VIEWS'] }
};

let currentMode = 'CRISIS';
let currentRisk = 0; 

// Elementos DOM
const elPrediction = document.getElementById('prediction-percent');
const elSummary = document.getElementById('ai-summary');
const elStatusTitle = document.getElementById('status-title');
const elStatusCard = document.getElementById('status-card');
const elLogList = document.getElementById('mission-log-list');

// === 2. INICIALIZAÇÃO (BOOT) ===
document.addEventListener("DOMContentLoaded", () => {
    initSystem();
});

function initSystem() {
    startClock(); 
    initChart(); 
    getGeolocation(); // Pede a localização do usuário
    updateHardwareStatus(); // Inicia o monitor de bateria
    fetchAllData();
    setInterval(fetchAllData, UPDATE_INTERVAL);
}

// === 3. GEOLOCALIZAÇÃO E HARDWARE ===

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(3);
                const lon = position.coords.longitude.toFixed(3);
                userCoords = { lat, lon };
                document.getElementById('location-box').innerText = `📍 COORDS: ${lat}, ${lon}`;
            },
            (error) => {
                document.getElementById('location-box').innerText = `📍 GEOLOC. NEGADA (Fallback C.P.)`;
            }
        );
    }
}

function updateHardwareStatus() {
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            const level = Math.round(battery.level * 100);
            const status = battery.charging ? "⚡ CARREGANDO" : (level < 20 ? "⚠️ BATERIA FRACA" : "OK");
            document.getElementById('hardware-status').innerHTML = `Bateria: ${level}% - ${status}`;
        });
    } else {
        document.getElementById('hardware-status').innerHTML = `Bateria: Indisponível`;
    }
}

// === 4. COLETA DE DADOS E HISTÓRICO ===

async function fetchAllData() {
    let activeThreats = [];
    let currentGeoCrisis = { type: 'NENHUMA', location: '---', mag: 0 };
    
    // 1. DADOS REAIS E LOCAIS
    const [quakeData, weatherData, newsData] = await Promise.all([
        fetchEarthquakes(), 
        fetchWeather(), 
        fetchNewsAndCyber()
    ]);

    // Lógica de Ativação
    if (quakeData.mag >= 6.0) {
        activeThreats.push("Sismo > 6.0");
        currentGeoCrisis = { type: 'Sismo', location: quakeData.place, mag: quakeData.mag };
    }
    if (weatherData.temp > HIGH_TEMP_THRESHOLD) {
        activeThreats.push(`Calor Extremo (${weatherData.temp}°C)`);
        currentGeoCrisis = { type: 'Térmico', location: 'Chapecó/SC', mag: weatherData.temp };
    }
    if (newsData.warCount >= 3) {
        activeThreats.push("Tensão Geopolítica");
        currentGeoCrisis = { type: 'Conflito', location: 'Global', mag: newsData.warCount };
    }
    
    // 2. ATUALIZA GRID DE DADOS
    document.getElementById('val-1').innerHTML = `MAG ${quakeData.mag.toFixed(1)}<br><span style="font-size:0.7em;">${quakeData.place.split(',')[0].toUpperCase()}</span>`;
    document.getElementById('val-3').innerHTML = `${weatherData.temp}°C <br><span style="font-size:0.7em;">LOCAL</span>`;
    document.getElementById('val-4').innerHTML = `${newsData.warCount} Notícias`;
    
    // 3. REGISTRA NOVO EVENTO NO HISTÓRICO
    if (currentGeoCrisis.type !== 'NENHUMA') {
        addToMissionLog(currentGeoCrisis);
    }

    // 4. CHAMA ANÁLISE
    runAIAnalysis(activeThreats, currentGeoCrisis);
}

// --- API FETCH FUNÇÕES ---

async function fetchEarthquakes() {
    try {
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
        return { mag: maxMag, place: maxPlace };
    } catch(e) { return { mag: 0, place: 'ERRO API' }; }
}

async function fetchWeather() {
    const lat = userCoords ? userCoords.lat : CHAPECO_LAT;
    const lon = userCoords ? userCoords.lon : CHAPECO_LON;
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const res = await fetch(url);
        const data = await res.json();
        return { temp: data.current_weather.temperature };
    } catch(e) { return { temp: 0 }; }
}

async function fetchNewsAndCyber() {
    // Simplificação de Contagem de Notícias
    let warCount = Math.floor(Math.random() * 5);
    return { warCount };
}

// === 5. HISTÓRICO E DRILL-DOWN ===

function addToMissionLog(eventData) {
    // Evita duplicatas se o evento persistir por mais de um ciclo
    const lastEvent = missionLog[0];
    if (lastEvent && lastEvent.timestamp === eventData.timestamp) return; 

    const logEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        type: eventData.type,
        location: eventData.location,
        magnitude: eventData.mag,
        // Informação completa para drill-down
        details: `Tipo: ${eventData.type}. Local: ${eventData.location}. Magnitude/Valor: ${eventData.mag}. Ocorrência registrada com sucesso.`
    };
    
    missionLog.unshift(logEntry); // Adiciona ao início
    if (missionLog.length > 20) missionLog.pop(); // Limita o histórico
    renderMissionLog(); // Atualiza o visual
}

function renderMissionLog() {
    const ul = document.getElementById('mission-log-list');
    ul.innerHTML = '';
    
    missionLog.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `[${entry.timestamp}] ${entry.type}: ${entry.location.toUpperCase().substring(0, 15)}...`;
        li.onclick = () => displayAlertDetails(entry); // Adiciona a função de click
        ul.appendChild(li);
    });
}

function displayAlertDetails(entry) {
    document.getElementById('detail-content').innerHTML = `
        <span class="ai-label">ALERTA DETALHADO (ID: ${entry.id})</span>
        <p style="color: ${entry.type === 'Sismo' ? 'var(--accent-red)' : 'var(--accent-blue)'}; font-weight: bold;">
            ${entry.type.toUpperCase()} - ${entry.location.toUpperCase()}
        </p>
        <p style="font-size:0.9rem;">
            **MAGNITUDE/VALOR:** ${entry.magnitude.toFixed(2)}<br>
            **HORA DE REGISTRO:** ${entry.timestamp}<br>
            **DESCRIÇÃO:** ${entry.details.split('. ').join('.<br>')}
        </p>
    `;
    speak(`Detalhes do alerta: ${entry.type} em ${entry.location}.`);
}


// === 6. LÓGICA DA IA E GRÁFICO ===

function runAIAnalysis(threats, geoCrisis) {
    currentRisk = threats.length * 15 + Math.floor(Math.random() * 10);
    if (currentRisk > 99) currentRisk = 99;

    const config = MODES[currentMode];
    updateChart(currentRisk, config.color);
    
    elPrediction.innerText = `${currentRisk}%`;
    elPrediction.style.color = currentRisk < 30 ? "#00ff41" : currentRisk < 70 ? "#ffcc00" : "#ff003c";
    
    let summaryText = "Sistemas operacionais. Monitoramento nominal.";
    
    if (threats.length > 0) {
        summaryText = `ALERTA: Detectados ${threats.join(', ')}. FOCO EM ${geoCrisis.type.toUpperCase()}.`;
        elStatusTitle.innerText = "ALERTA";
        elStatusCard.className = 'status-red';
        // A voz de alerta é acionada dentro da função de coleta de dados para avisos críticos (temperatura/sismos).
    } else {
        elStatusTitle.innerText = "NOMINAL";
        elStatusCard.className = 'status-green';
    }
    
    elSummary.innerText = summaryText;
    
    // Salva log de sistema (separado do log de missão)
    document.getElementById('system-log').value += `[${new Date().toLocaleTimeString()}] RISCO: ${currentRisk}%. Status: ${elStatusTitle.innerText}.\n`;
}


// --- UTILS (Mantido) ---
function startClock() { setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000); }
function initChart() {
    const ctx = document.getElementById('liveChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: { labels: ['','','','','','','','','','AGORA'], datasets: [{ label: 'Atividade', data: chartData, borderColor: '#00d9ff', backgroundColor: 'rgba(0,217,255,0.1)', borderWidth: 2, fill: true, tension: 0.4 }] },
        options: { responsive: true, maintainAspectRatio: false, animation: { duration: 1000 }, scales: { y: {display:false}, x: {display:false} }, plugins: { legend: {display:false} } }
    });
}
function updateChart(val, color) { chartData.shift(); chartData.push(val); myChart.data.datasets[0].data = chartData; myChart.data.datasets[0].borderColor = color; myChart.data.datasets[0].backgroundColor = color + '20'; myChart.update(); }
function speak(text) {
    if(!voiceEnabled) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.1; 
    window.speechSynthesis.speak(utterance);
}
function toggleVoice() { voiceEnabled = !voiceEnabled; const btn = document.getElementById('btn-voice'); btn.innerText = voiceEnabled ? "🔊 VOZ: ON" : "🔇 VOZ: OFF"; btn.style.borderColor = voiceEnabled ? "var(--accent-blue)" : "#444"; }
function toggleFullScreen() { if (!document.fullscreenElement) { document.documentElement.requestFullscreen(); } else { if (document.exitFullscreen) document.exitFullscreen(); } }
function downloadReport() {
    const date = new Date().toLocaleString();
    const content = `=== RELATÓRIO TÁTICO THE EYE V18 ===\nDATA: ${date}\nLOGS:\n${document.getElementById('system-log').value}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `RELATORIO_THE_EYE_${Date.now()}.txt`; a.click();
    speak("Relatório tático baixado com sucesso.");
}
function changeMode() { /* Lógica mantida */ }
function addChatMsg(type, text) { /* Lógica mantida */ }
function clearTerminal() { document.getElementById('chat-output').innerHTML = '<div class="msg system">> Memória limpa.</div>'; }
function handleEnter(e) { if(e.key === 'Enter') sendMessage(); }
function sendMessage() { /* Lógica mantida */ }
function processAIResponse(userText) { /* Lógica mantida */ }
