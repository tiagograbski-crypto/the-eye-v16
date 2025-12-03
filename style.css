/* --- CONFIGURAÇÕES GERAIS --- */
:root {
    --bg-color: #050505;
    --panel-bg: #0f1215;
    --accent-blue: #00d9ff;
    --accent-green: #00ff41;
    --accent-red: #ff003c;
    --text-main: #e0e0e0;
}

* { box-sizing: border-box; }

body {
    background-color: var(--bg-color);
    color: var(--text-main);
    font-family: 'Rajdhani', sans-serif;
    margin: 0; padding: 0;
    font-size: 16px;
}

/* --- TELA DE LOGIN --- */
#security-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index: 999; display: flex; align-items: center; justify-content: center; }
.login-box { width: 90%; max-width: 400px; padding: 20px; border: 2px solid var(--accent-red); box-shadow: 0 0 30px rgba(255,0,60,0.2); background: #0a0a0a; text-align: center; }
.full-width { width: 100%; padding: 15px; margin: 5px 0 15px 0; background: #222; border: 1px solid #444; color: #fff; font-size: 1rem; font-family: 'Roboto Mono'; }
.btn-main { width: 100%; padding: 15px; background: var(--accent-red); color: #fff; border: none; font-weight: bold; font-size: 1.1rem; text-transform: uppercase; cursor: pointer; transition: 0.3s; }
#login-msg { margin-top: 10px; font-weight: bold; color: var(--accent-red); }


/* --- PAINEL PRINCIPAL (100% LARGURA) --- */
.container {
    width: 100%; 
    height: 100vh; /* Altura total da tela */
    padding: 15px;
    background: var(--panel-bg);
    margin: 0;
}

/* Header */
header { padding: 10px 0; border-bottom: 2px solid var(--accent-blue); margin-bottom: 10px; }
.header-top { display: flex; justify-content: space-between; align-items: center; font-size: 0.7rem; color: #666; font-family: 'Roboto Mono'; margin-bottom: 10px; }
.sys-controls button { background: transparent; border: 1px solid #444; color: var(--accent-blue); font-family: 'Roboto Mono'; font-size: 0.7rem; padding: 4px 8px; cursor: pointer; border-radius: 2px; }
.header-main { text-align: center; }
h1 { margin: 0; letter-spacing: 3px; display: inline-block; font-size: 1.5rem; }
.version { font-size: 0.6em; color: var(--accent-blue); vertical-align: super; }
.mode-control { margin-top: 5px; background: #111; padding: 5px 15px; border: 1px solid #333; border-radius: 4px; display: inline-flex; align-items: center; gap: 10px; }
#mode-selector { background: transparent; border: none; color: var(--accent-blue); font-family: 'Rajdhani', sans-serif; font-weight: bold; font-size: 1rem; cursor: pointer; text-transform: uppercase; }


/* === ESTRUTURA PRINCIPAL (GRID 4 COLUNAS) === */
.main-grid {
    display: grid;
    /* 1.5fr (Histórico) | 3fr (Dados) | 2fr (Detalhes) | 1.5fr (Oracle/Status) */
    grid-template-columns: 1.5fr 3fr 2fr 1.5fr; 
    gap: 15px;
    height: calc(100vh - 150px); /* Altura da tela menos o header */
}

/* Regra para Mobile (Empilha) */
@media (max-width: 1024px) {
    .main-grid {
        grid-template-columns: 1fr;
        height: auto;
    }
    .container { height: auto; }
}

/* Estilos das Colunas */
.grid-col-1, .grid-col-3, .grid-col-4 {
    background: #000;
    border: 1px solid #222;
    padding: 10px;
    overflow-y: auto;
    box-shadow: 0 0 5px rgba(0, 217, 255, 0.1);
}
.grid-col-2 {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* --- COLUNA 1: HISTÓRICO --- */
.history-panel { margin-bottom: 15px; }
#mission-log-list { list-style: none; padding: 0; }
#mission-log-list li {
    background: #0f1215;
    border: 1px solid #1a1a1a;
    padding: 8px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: 0.2s;
    font-size: 0.8rem;
    font-family: 'Roboto Mono';
}
#mission-log-list li:hover { background: #222; border-color: var(--accent-blue); }
.ai-label { font-size: 0.8rem; color: #888; display: block; margin-bottom: 5px; letter-spacing: 1px; }

/* --- COLUNA 2: GRÁFICO / DADOS / CHAT --- */
.ai-dashboard { display: grid; grid-template-columns: 1fr 2fr; gap: 10px; margin-bottom: 10px; }
#status-card { padding: 15px; text-align: center; border: 2px solid #333; transition: 0.3s; }
.status-green { background: rgba(0, 255, 65, 0.1); border-color: var(--accent-green) !important; color: var(--accent-green); }
.status-red { background: rgba(255, 0, 60, 0.2); border-color: var(--accent-red) !important; color: var(--accent-red); animation: pulse 1s infinite; }
#status-title { margin: 0; }
.analyst { background: rgba(0,0,0,0.3); padding: 15px; border-left: 3px solid #ffcc00; }
#ai-summary { font-size: 1.1rem; line-height: 1.4; font-weight: 500; }
.chart-container { background: rgba(0,0,0,0.3); border: 1px solid #222; padding: 10px; flex-grow: 1; min-height: 200px; }

/* --- COLUNA 3: DETALHES DE ALERTA --- */
.detail-panel { margin-bottom: 15px; }
#detail-content { padding: 10px 0; }
.telemetry-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
.t-item { background: #1a1a1a; padding: 10px; text-align: center; border-radius: 4px; border: 1px solid #333; }
.t-item .label { font-size: 0.7rem; color: #666; margin-bottom: 5px; }
.t-item .value { font-size: 1rem; font-weight: bold; font-family: 'Roboto Mono'; color: #fff; }

/* --- COLUNA 4: ORACLE/HARDWARE --- */
.oracle { border-left-color: var(--accent-blue); text-align: center; background: rgba(0,0,0,0.3); padding: 15px; }
.probability-meter { font-size: 2.5rem; font-weight: bold; color: var(--accent-blue); text-shadow: 0 0 10px var(--accent-blue); }
#hardware-status { font-family: 'Roboto Mono'; font-size: 0.9rem; margin-top: 10px; }
.agent-log { background: #000; border: 1px solid #222; padding: 10px; font-family: 'Roboto Mono'; font-size: 0.8rem; margin-top: 15px; height: 50%; overflow-y: auto; color: #00ff41; }
#system-log { list-style: none; padding: 0; }
#system-log li { margin-bottom: 5px; border-bottom: 1px solid #111; }


/* --- TERMINAL DE CHAT (COLUNA 2) --- */
.terminal-wrapper { background: rgba(10, 15, 20, 0.95); border: 1px solid #222; border-radius: 4px; flex-grow: 1; display: flex; flex-direction: column; }
#chat-output { flex: 1; padding: 10px; overflow-y: auto; font-family: 'Roboto Mono'; font-size: 0.85rem; color: #a0a0a0; }
.chat-input-area { display: flex; border-top: 1px solid #333; }
#user-command { flex: 1; background: transparent; border: none; color: #fff; padding: 15px; font-family: 'Roboto Mono'; }
.msg.ai { color: var(--accent-blue); text-shadow: 0 0 2px var(--accent-blue); }

/* Utilitários */
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }
