/* --- THE EYE V20.0: CONTEXTO TÁTICO E SEVERIDADE DE ALERTA --- */

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

// Coordenadas de Chapecó (Fallback de Emergência)
const CHAPECO_LAT = -27.095; 
const CHAPECO_LON = -52.618;
const HIGH_TEMP_THRESHOLD = 30.0; // 30 graus para Alerta Térmico

// === 1.1. NÍVEIS DE SEVERIDADE ===
const RISK_THRESHOLD = {
    RED: 70, // Crise / Super Potente
    YELLOW: 30 // Alerta
};

const MODES = {
    'CRISIS': { color: '#ff003c', label: 'RISCO GLOBAL', labels: ['SISMO', 'NEOs', 'CLIMA LOCAL', 'GUERRA'] },
    'CYBER': { color: '#00d9ff', label: 'RISCO CYBER', labels: ['FIREWALL', 'LOAD', 'BLOCKS', 'VPN'] },
    'MARKETING': { color: '#00ff41', label: 'RISCO DE MERCADO', labels: ['LEADS', 'ROI', 'SENTIMENT', 'VIEWS'] }
};

let currentMode = 'CRISIS';
let currentRisk = 0; 
let activeThreats = [];

// Dados Mock de Crise Geopolítica (para contexto detalhado)
const GEOPOLITICAL_CRISES = [
    { name: 'Conflito de Fronteira (Europa)', location: 'Leste Europeu', cause: 'Escalada de tensões sobre recursos energéticos.', source: 'Relatório de Agência (Simulado)' },
    { name: 'Sanções Cibernéticas (Ásia)', location: 'Sudeste Asiático', cause: 'Ataques direcionados à infraestrutura financeira.', source: 'Relatório de Inteligência de Mercado' },
    { name: 'Instabilidade Política (Oriente Médio)', location: 'Golfo Pérsico', cause: 'Protestos e ameaças à navegação marítima.', source: 'Monitoramento de Redes Sociais' },
];

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
    getGeolocation();
    updateHardwareStatus();
    fetchAllData();
    setInterval(fetchAllData, UPDATE_INTERVAL); 
}

// === 3. GEOLOCALIZAÇÃO E CLIMA LOCAL ===

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(3);
                const lon = position.coords.longitude.toFixed(3);
                userCoords = { lat, lon };
                document.getElementById('location-box').innerText = `📍 LOCAL: ${lat}, ${lon}`;
            },
            (error) => {
                document.getElementById('location-box').innerText = `📍 GEOLOC. NEGADA (Fallback C.P.)`;
            }
        );
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
        
        // Alerta de Crise: Temperatura Acima de 30°C
        if (temp > HIGH_TEMP_THRESHOLD) {
            activeThreats.push("Alerta Térmico Local");
            speak(`Alerta Térmico! Temperatura local atingiu ${temp} graus. Protocolo de resfriamento ativado.`);
            addToMissionLog({ 
                type: 'TÉRMICO', 
                location: isFallback ? 'Chapecó' : 'Localidade Atual', 
                magnitude: temp,
                details: `Temperatura crítica acima de ${HIGH_TEMP_THRESHOLD}°C. Risco de falha de hardware.`,
                source: 'API Open-Meteo'
            });
        }
    } catch(e) {
        document.getElementById('val-3').innerHTML = "CLIMA OFFLINE";
    }
}

// === 4. COLETA DE DADOS E EVENTOS ===

async function fetchAllData() {
    activeThreats = [];
    
    // Atualiza o clima (usa userCoords ou fallback)
    if (userCoords) {
        await fetchWeatherByCoords(userCoords.lat, userCoords.lon, false);
    } else {
        await fetchWeatherByCoords(CHAPECO_LAT, CHAPECO_LON, true);
    }
    
    // Chamadas de API
    await Promise.all([
        fetchEarthquakes(), 
        fetchAsteroidData(),
        fetchNewsAndCyber()
    ]);
    
    runAIAnalysis();
}

// --- API 1: SISMOS (USGS) ---
async function fetchEarthquakes() {
    try {
        const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
        const data = await res.json();
        
        let maxMag = 0;
        let maxPlace = 'NENHUM';
        
        data.features.forEach(q => { 
            if(q.properties.mag > maxMag) { maxMag = q.properties.mag; maxPlace = q.properties.place; } 
        });

        const valElement = document.getElementById('val-1');
        
        if (maxMag >= 3.0) {
            valElement.innerHTML = `MAG ${maxMag.toFixed(1)}<br><span style="font-size:0.7em;">${maxPlace.split(',')[0].toUpperCase()}</span>`;
        } else {
             valElement.innerHTML = `MAG 0.0<br><span style="font-size:0.7em;">NOMINAL</span>`;
        }

        // Contribuição para o Risco Global e LOG (6.0+ é Crítico)
        if (maxMag >= 6.0) {
            activeThreats.push("Sismo > 6.0");
            const location = maxPlace.split(',')[0];
            speak(`ALERTA GEOFÍSICO. Sismo de magnitude ${maxMag.toFixed(1)} detectado em ${location}.`);
            addToMissionLog({ 
                type: 'SISMOS', 
                location: maxPlace, 
                magnitude: maxMag,
                details: `Sismo de alta magnitude (${maxMag.toFixed(1)}) capaz de causar danos.`,
                source: 'USGS Real-Time Data'
            });
        }
    } catch(e) { 
        document.getElementById('val-1').innerHTML = "ERRO SISMOS";
    }
}

// --- API 2: ASTEROIDES (SIMULAÇÃO ESTÁVEL) ---
async function fetchAsteroidData() {
    const hazards = Math.random() > 0.95 ? 1 : 0; // 5% chance de ameaça
    const count = Math.floor(Math.random() * 50) + 10;
    
    document.getElementById('val-2').innerHTML = `${count} ASTEROIDES<br><span style="font-size:0.7em;">${hazards > 0 ? 'AMEAÇA DETECTADA' : 'CÉU LIMPO'}</span>`;
    
    if (hazards > 0) {
        activeThreats.push("Asteroide Próximo");
        speak(`ALERTA ORBITAL. Um objeto de risco foi rastreado. Trajetória incerta.`);
        addToMissionLog({ 
            type: 'ASTEROIDE', 
            location: 'Próximo à Terra', 
            magnitude: count,
            details: `Objeto próximo (NEO) rastreado. Total de ${count} objetos sendo monitorados.`,
            source: 'NASA/Simulação Orbital'
        });
    }
}

// --- API 3: NOTÍCIAS DE GUERRA (GEOPOLÍTICA COM CONTEXTO) ---
async function fetchNewsAndCyber() {
    let warCount = Math.floor(Math.random() * 5); 
    document.getElementById('val-4').innerText = `${warCount} Ocorrências`;
    
    if (warCount >= 3) {
        const crisis = GEOPOLITICAL_CRISES[Math.floor(Math.random() * GEOPOLITICAL_CRISES.length)];
        activeThreats.push("Tensão Geopolítica");
        
        // Voz e Log com contexto
        speak(`ALERTA GEOPOLÍTICO. Crise sobre ${crisis.name} em ${crisis.location}.`);
        addToMissionLog({ 
            type: 'GEOPOLÍTICA', 
            location: crisis.location, 
            magnitude: warCount,
            details: `**O quê:** ${crisis.name}. **Porquê:** ${crisis.cause}.`,
            source: crisis.source
        });
    }
}

// === 5. HISTÓRICO E DRILL-DOWN ===

function addToMissionLog(eventData) {
    const lastEvent = missionLog[0];
    // Evita duplicatas (se o tipo de evento for o mesmo e a magnitude/valor for igual)
    if (lastEvent && lastEvent.type === eventData.type && lastEvent.magnitude === eventData.magnitude) return; 

    const logEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        type: eventData.type,
        location: eventData.location,
        magnitude: eventData.magnitude,
        details: eventData.details || `Alerta de ${eventData.type} registrado com sucesso.`,
        source: eventData.source || 'Sistema Interno'
    };
    
    missionLog.unshift(logEntry);
    if (missionLog.length > 20) missionLog.pop();
    renderMissionLog();
}

function renderMissionLog() {
    const ul = document.getElementById('mission-log-list');
    ul.innerHTML = '';
    
    missionLog.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `[${entry.timestamp}] ${entry.type}: ${entry.location.toUpperCase().substring(0, 15)}...`;
        li.onclick = () => displayAlertDetails(entry); 
        ul.appendChild(li);
    });
}

function displayAlertDetails(entry) {
    // Exibe os detalhes completos, incluindo a fonte (requisito final)
    document.getElementById('detail-content').innerHTML = `
        <span class="ai-label">DETALHE COMPLETO</span>
        <p style="color: ${entry.type === 'SISMOS' || entry.type === 'TÉRMICO' ? 'var(--accent-red)' : 'var(--accent-blue)'}; font-weight: bold; margin-top:5px;">
            ${entry.type.toUpperCase()} - ${entry.location.toUpperCase()}
        </p>
        <p style="font-size:0.9rem;">
            **MAGNITUDE/VALOR:** ${entry.magnitude.toFixed(2)}<br>
            **HORA:** ${entry.timestamp}<br>
            **FONTE DA INFORMAÇÃO:** <span style="color:#ffcc00">${entry.source}</span><br>
            **DESCRIÇÃO:** ${entry.details.split('. ').join('.<br>')}
        </p>
    `;
    speak(`Detalhes. ${entry.type} em ${entry.location}.`);
}

// === 6. LÓGICA DA IA E SEVERIDADE ===

function runAIAnalysis() {
    currentRisk = activeThreats.length * 15 + Math.floor(Math.random() * 10);
    if (currentRisk > 99) currentRisk = 99;

    const config = MODES[currentMode];
    updateChart(currentRisk, config.color);
    
    elPrediction.innerText = `${currentRisk}%`;
    
    // Graduação de Severidade (Vermelho, Amarelo, Verde)
    let summaryText = "Sistemas operacionais. Monitoramento nominal.";
    
    if (currentRisk >= RISK_THRESHOLD.RED) {
        // ALERTA VERMELHO (Super Potente)
        elStatusTitle.innerText = "CRISE";
        elStatusCard.className = 'status-red';
        elPrediction.style.color = "#ff003c";
        summaryText = `CRISE: ${activeThreats.join(', ')}. PROTOCOLO DE ALERTA MÁXIMO ATIVADO.`;
    } else if (currentRisk >= RISK_THRESHOLD.YELLOW) {
        // ALERTA AMARELO
        elStatusTitle.innerText = "ALERTA";
        elStatusCard.className = 'status-yellow'; // É necessário adicionar essa classe no CSS
        elPrediction.style.color = "#ffcc00";
        summaryText = `ALERTA: Detectados ${activeThreats.join(', ')}. ANALISANDO PRIORIDADES.`;
    } else {
        // ALERTA VERDE (Nominal)
        elStatusTitle.innerText = "NOMINAL";
        elStatusCard.className = 'status-green';
        elPrediction.style.color = "#00ff41";
    }
    
    elSummary.innerText = summaryText;
}

// --- UTILS (Funções Auxiliares) ---
function startClock() { setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000); }
function updateHardwareStatus() {
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            const level = Math.round(battery.level * 100);
            const status = battery.charging ? "⚡ CARREGANDO" : (level < 20 ? "⚠️ BATERIA FRACA" : "OK");
            document.getElementById('hardware-status').innerHTML = `Bateria: ${level}% - ${status}`;
            if (level < 15 && !battery.charging) speak("Atenção, bateria crítica. Carregamento recomendado.");
        });
    } else {
        document.getElementById('hardware-status').innerHTML = `Bateria: Indisponível`;
    }
}
function initChart() { /* ... */ }
function updateChart(val, color) { /* ... */ }
function speak(text) {
    if(!voiceEnabled) return;
    // Interrompe a fala anterior para dar prioridade ao novo alerta
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.1; 
    window.speechSynthesis.speak(utterance);
}
function toggleVoice() { /* ... */ }
function toggleFullScreen() { /* ... */ }
function downloadReport() { /* ... */ }
function changeMode() { /* ... */ }
function addChatMsg(type, text) { /* ... */ }
function clearTerminal() { /* ... */ }
function handleEnter(e) { /* ... */ }
function sendMessage() { /* ... */ }
function processAIResponse(userText) { /* ... */ }

// OBS: As funções UTILs completas do V19 devem ser mantidas, apenas as listadas acima foram detalhadas por terem mudado.
