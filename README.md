<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plano de Aceleração - Thiago Grabski</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <style>
        /* --- ESTILOS GERAIS (ULTRA LUXURY) --- */
        :root {
            --bg-dark: #020202; /* Preto Absoluto */
            --bg-panel: #0a0a0a;
            --text-primary: #ffffff;
            --text-secondary: #b0b0b0;
            
            /* Gold Gradient - Mais Rico e Metálico */
            --gold-gradient: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
            --gold-text: #eebb4d;
            
            --success: #27ae60;
            --danger: #c0392b;
        }

        * { box-sizing: border-box; }

        body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--bg-dark);
            height: 100vh;
            overflow: hidden;
            color: var(--text-primary);
        }

        /* TIPOGRAFIA */
        h1, h2, h3 { font-family: 'Cormorant Garamond', serif; font-weight: 400; }
        
        .gold-text {
            background: var(--gold-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
            text-shadow: 0 0 30px rgba(212, 175, 55, 0.15);
        }

        /* ANIMAÇÕES CINEMATOGRÁFICAS */
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseGold {
            0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
            100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }

        /* SCROLLBAR */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

        /* NAVEGAÇÃO */
        .nav-tabs {
            display: flex;
            background-color: rgba(2, 2, 2, 0.95);
            backdrop-filter: blur(20px);
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 100;
            height: 80px;
            align-items: center;
            padding: 0 40px;
            overflow-x: auto;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .tab-btn {
            flex: 1;
            min-width: 130px;
            border: none;
            background: none;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            color: #666;
            transition: all 0.5s ease;
            padding: 28px 0;
            white-space: nowrap;
        }

        .tab-btn:hover { color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.3); }

        .tab-btn.active {
            color: #fff;
            position: relative;
        }
        
        .tab-btn.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 2px;
            background: var(--gold-gradient);
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
        }

        /* CONTEÚDO */
        .tab-content {
            display: none;
            padding: 120px 20px 140px;
            height: 100vh;
            overflow-y: auto;
            flex-direction: column;
            align-items: center;
        }
        
        .tab-content.active { display: flex; animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }

        .container { width: 100%; max-width: 1100px; text-align: center; margin: 0 auto; }

        h1 { font-size: 4em; margin-bottom: 20px; letter-spacing: -1px; line-height: 1; color: #fff; text-shadow: 0 10px 30px rgba(0,0,0,0.8); }
        .subtitle { font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: 1.1em; color: var(--text-secondary); max-width: 800px; margin: 0 auto 60px; line-height: 1.8; letter-spacing: 0.5px; }

        /* --- CAPA INTRO (ENTRADA TRIUNFAL) --- */
        #intro-section {
            background: radial-gradient(circle at center, rgba(0,0,0,0), #000 80%), url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop'); 
            background-size: cover;
            background-position: center;
            justify-content: center;
            padding: 0;
        }

        .intro-content {
            max-width: 1000px;
            padding: 80px 60px;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(30px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 100px rgba(0,0,0,0.9);
            border-radius: 2px;
        }

        /* Animação em Cascata */
        .intro-label { 
            font-size: 0.8em; letter-spacing: 6px; color: var(--gold-text); 
            text-transform: uppercase; margin-bottom: 30px; display: block; font-weight: 700;
            opacity: 0; animation: fadeUp 1s forwards 0.3s;
        }

        .intro-brand {
            font-family: 'Cormorant Garamond', serif;
            font-size: 6em;
            color: white;
            margin-bottom: 5px;
            font-style: italic;
            line-height: 0.9;
            opacity: 0; animation: fadeUp 1s forwards 0.6s;
        }
        
        .client-box {
            margin: 40px auto;
            border-top: 1px solid rgba(255,255,255,0.1);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding: 20px 0;
            display: inline-block;
            width: 100%;
            opacity: 0; animation: fadeUp 1s forwards 0.9s;
        }
        
        .client-name { font-family: 'Montserrat', sans-serif; font-size: 1.2em; letter-spacing: 2px; text-transform: uppercase; color: #fff; font-weight: 300;}
        .client-name strong { font-weight: 700; color: var(--gold-text); }

        .tech-stack {
            display: flex; justify-content: center; gap: 15px; margin-bottom: 50px;
            opacity: 0; animation: fadeUp 1s forwards 1.2s;
        }
        .tech-pill { 
            font-size: 0.65em; border: 1px solid rgba(255,255,255,0.2); padding: 8px 15px; 
            color: #888; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;
            background: rgba(255,255,255,0.02);
        }

        .consultant-badge {
            display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 40px;
            opacity: 0; animation: fadeUp 1s forwards 1.5s;
        }
        .consultant-img { width: 60px; height: 60px; border-radius: 50%; background: #222; border: 2px solid var(--gold-text); }
        .consultant-text { text-align: left; }
        .consultant-name { font-weight: 700; color: #fff; font-size: 1.1rem; letter-spacing: 1px; text-transform: uppercase; display: block;}
        .consultant-role { color: #888; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 400; }

        .btn-wrapper { opacity: 0; animation: fadeUp 1s forwards 1.8s; }

        /* --- CALCULADORA DE PREJUÍZO --- */
        .loss-calculator {
            background: rgba(192, 57, 43, 0.1);
            border: 1px solid rgba(192, 57, 43, 0.3);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
        .loss-input-group { text-align: left; }
        .loss-input-group label { display: block; font-size: 0.8em; color: #aaa; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
        .loss-input { 
            background: rgba(0,0,0,0.5); border: 1px solid #444; color: white; 
            padding: 10px; border-radius: 4px; width: 150px; font-family: 'Montserrat', sans-serif;
        }
        .loss-result { text-align: right; }
        .loss-amount { font-family: 'Cormorant Garamond', serif; font-size: 2.5em; color: #e74c3c; font-weight: 700; display: block; line-height: 1; }
        .loss-label { font-size: 0.8em; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }

        /* --- CARDS & GRID --- */
        .audit-container { display: flex; gap: 50px; text-align: left; align-items: flex-start; max-width: 1200px; flex-direction: column; }
        
        .audit-visual { 
            width: 100%;
            background: #111; 
            padding: 20px; 
            border-radius: 8px; 
            border: 1px solid rgba(255,255,255,0.1); 
            box-shadow: 0 30px 60px rgba(0,0,0,0.5); 
        }
        
        .browser-mockup { background: #fff; border-radius: 6px; overflow: hidden; }
        .browser-bar { background: #f1f1f1; padding: 10px 15px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #ddd; }
        .traffic-lights { display: flex; gap: 6px; margin-right: 15px; }
        .light { width: 10px; height: 10px; border-radius: 50%; }
        .red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
        .address-bar { background: #fff; flex: 1; border-radius: 3px; padding: 4px 10px; font-size: 0.7em; color: #333; text-align: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); font-family: system-ui; font-weight: 500;}

        /* ESTILOS DE RESULTADOS DE BUSCA */
        .search-results { padding: 20px; background: white; color: #333; font-family: arial, sans-serif; }
        .result-item { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
        .result-title { color: #1a0dab; font-size: 18px; line-height: 1.2; margin-bottom: 3px; cursor: pointer; text-decoration: underline; display: block;}
        .result-url { color: #006621; font-size: 14px; margin-bottom: 5px; display: block;}
        .result-desc { font-size: 14px; color: #545454; line-height: 1.4; display: block; margin-top: 5px;}
        .warning-tag { background: #fce8e6; color: #c5221f; font-size: 11px; padding: 2px 6px; border-radius: 4px; font-weight: bold; display: inline-block; margin-left: 8px; border: 1px solid #fad2cf; }
        .location-highlight { font-weight: bold; color: #d93025; }

        .audit-analysis { width: 100%; margin-top: 30px; }
        .analysis-list { list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px; }
        .analysis-list li { 
            padding-left: 20px; border-left: 1px solid rgba(255,255,255,0.1); 
            transition: all 0.4s; position: relative;
        }
        .analysis-list li:hover { border-left-color: var(--gold-text); }
        .analysis-list strong { display: block; color: #fff; font-size: 1.2em; margin-bottom: 8px; font-weight: 500; font-family: 'Cormorant Garamond', serif;}
        .analysis-list p { margin: 0; font-size: 0.95em; color: #bbb; line-height: 1.6; font-weight: 300;}

        /* --- ROADMAP --- */
        #solution-section, #future-section, #calendar-section { background-color: #f9f9f9; color: #111; }
        
        #solution-section h1, #future-section h1, #calendar-section h1 { color: #111; font-weight: 600; text-shadow: none; }
        #solution-section .subtitle, #future-section .subtitle, #calendar-section .subtitle { color: #555; font-weight: 400; }

        .step-card { 
            flex: 1; min-width: 300px; padding: 40px; 
            background: #fff; border: 1px solid #e0e0e0; border-radius: 4px; 
            text-align: left; position: relative; overflow: hidden; 
            transition: all 0.4s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }
        .step-card:hover { transform: translateY(-10px); border-color: #d4af37; box-shadow: 0 20px 50px rgba(0,0,0,0.08); }
        .step-number { 
            font-family: 'Cormorant Garamond', serif; font-size: 6em; 
            position: absolute; top: -30px; right: 20px; color: #f5f5f5; z-index: 0; font-style: italic;
        }
        .step-list li { margin-bottom: 12px; color: #444; display: flex; align-items: center; font-size: 0.9em; font-weight: 500; }
        .check-icon { color: #d4af37; margin-right: 15px; }

        /* Metrics Grid & ROI Calc */
        .metrics-grid { display: flex; gap: 30px; justify-content: center; margin: 40px 0; flex-wrap: wrap; }
        .metric-item { 
            padding: 40px; background: #fff; border: 1px solid #e0e0e0; border-radius: 4px; min-width: 250px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center;
        }
        .metric-val { font-family: 'Cormorant Garamond', serif; font-size: 4em; color: #111; display: block; line-height: 1; font-weight: 700; }
        .metric-label { font-size: 0.8em; text-transform: uppercase; letter-spacing: 2px; color: #888; display: block; margin-top: 10px; }
        
        .roi-calc-box {
            background: white; border: 1px solid #27ae60; padding: 20px 40px; border-radius: 8px; margin-top: 30px;
            display: flex; gap: 30px; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(39, 174, 96, 0.1);
        }
        .roi-input { padding: 10px; border: 1px solid #ddd; border-radius: 4px; width: 120px; text-align: center; font-family: 'Montserrat'; }
        .roi-result { font-weight: 700; color: #27ae60; font-size: 1.2em; }

        /* TIMELINE REFINED */
        .timeline { position: relative; max-width: 1000px; margin: 0 auto; padding: 40px 0; }
        .timeline::after { content: ''; position: absolute; width: 3px; background: linear-gradient(to bottom, #d4af37, #ddd); top: 0; bottom: 0; left: 50%; margin-left: -1px; }
        .timeline-item { padding: 10px 50px; position: relative; width: 50%; box-sizing: border-box; }
        .timeline-item::after { content: ''; position: absolute; width: 20px; height: 20px; right: -11px; background-color: white; border: 5px solid var(--secondary); top: 25px; border-radius: 50%; z-index: 1; box-shadow: 0 0 0 4px rgba(255,255,255,0.5); }
        .left { left: 0; text-align: right; }
        .right { left: 50%; text-align: left; }
        .right::after { left: -11px; }
        .content-box { padding: 30px; background: white; border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-top: 4px solid #111; transition: transform 0.3s; }
        .content-box:hover { transform: scale(1.02); }
        .week-badge { background: #111; color: white; padding: 6px 14px; border-radius: 2px; font-size: 0.8em; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 15px; }
        .week-detail { margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px; }
        .week-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9em; border-bottom: 1px dashed #f0f0f0; padding-bottom: 5px;}
        .week-name { font-weight: 700; color: #d4af37; min-width: 70px; }
        .week-task { color: #555; text-align: left; flex: 1; }

        /* --- NEUROVENDAS (PHONE) --- */
        .neuro-grid { display: grid; grid-template-columns: 1fr 360px 1fr; gap: 60px; align-items: center; max-width: 1400px; }
        .phone-frame { width: 340px; height: 680px; background: #000; border-radius: 50px; padding: 12px; border: 4px solid #333; box-shadow: 0 50px 100px rgba(0,0,0,0.8); position: relative; margin: 0 auto; }
        .dynamic-island { width: 100px; height: 25px; background: #000; border-radius: 20px; position: absolute; top: 20px; left: 50%; transform: translateX(-50%); z-index: 50; }
        
        .neuro-card { padding: 30px; border-left: 1px solid rgba(255,255,255,0.1); text-align: left; margin-bottom: 40px; transition: 0.3s; }
        .neuro-card:hover { border-left-color: var(--gold-text); background: rgba(255,255,255,0.03); }
        .neuro-card h4 { color: #fff; margin: 0 0 10px 0; font-family: 'Montserrat', sans-serif; font-size: 0.9em; text-transform: uppercase; letter-spacing: 2px;}
        .neuro-card p { font-size: 0.95em; color: #bbb; line-height: 1.6; }

        /* --- MOCKUP INTERNO SOFISTICADO --- */
        .phone-screen-neuro { 
            width: 100%; height: 100%; background: #050505; border-radius: 30px; overflow-y: auto; overflow-x: hidden; position: relative; font-family: 'Montserrat', sans-serif; color: #eee;
            scrollbar-width: none; /* Firefox */
        }
        .phone-screen-neuro::-webkit-scrollbar { display: none; } /* Chrome/Safari */

        /* Header Fixo */
        .lp-header { 
            position: sticky; top: 0; z-index: 30; background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(12px);
            padding: 45px 20px 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .lp-logo { font-family: 'Cormorant Garamond', serif; font-size: 16px; letter-spacing: 1px; color: #fff; font-style: italic; }
        .lp-menu-icon { font-size: 18px; color: var(--gold-text); cursor: pointer;}

        /* Hero Simples e Elegante */
        .lp-hero { 
            height: 320px; background: linear-gradient(to bottom, rgba(0,0,0,0), #050505), url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop'); 
            background-size: cover; background-position: center; display: flex; flex-direction: column; justify-content: flex-end; padding: 30px 20px;
        }
        .lp-hero h2 { font-family: 'Cormorant Garamond', serif; font-size: 32px; line-height: 1; color: white; margin-bottom: 10px; }
        .lp-hero p { font-size: 10px; color: #bbb; text-transform: uppercase; letter-spacing: 2px; font-weight: 500; }

        /* Selos de Luxo */
        .lp-badges { display: flex; gap: 10px; padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .lp-badge-item { 
            flex: 1; text-align: center; padding: 12px 5px; background: rgba(255,255,255,0.03); 
            border: 1px solid rgba(255,255,255,0.05); border-radius: 4px; 
        }
        .lp-badge-icon { display: block; font-size: 16px; margin-bottom: 5px; color: var(--gold-text); }
        .lp-badge-text { font-size: 7px; text-transform: uppercase; color: #888; letter-spacing: 1px; font-weight: 600; display: block; line-height: 1.2; }

        /* Galeria e Conteúdo */
        .lp-section-title { padding: 30px 20px 15px; font-family: 'Montserrat', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: var(--gold-text); font-weight: 600; }
        
        .lp-gallery-scroll { 
            display: flex; overflow-x: auto; padding: 0 20px 20px; gap: 15px; scrollbar-width: none; 
        }
        .lp-project-card { 
            min-width: 200px; height: 260px; background-color: #111; border-radius: 2px; position: relative; overflow: hidden; 
            border: 1px solid rgba(255,255,255,0.1); 
        }
        .lp-project-img { width: 100%; height: 85%; object-fit: cover; filter: brightness(0.8); }
        .lp-project-info { 
            position: absolute; bottom: 0; width: 100%; height: 15%; background: #0a0a0a; 
            display: flex; align-items: center; justify-content: center; 
            font-family: 'Cormorant Garamond', serif; font-size: 14px; color: #ccc; font-style: italic; 
        }

        /* FAQ Clean */
        .lp-faq { padding: 0 20px 100px; }
        .lp-faq-item { border-bottom: 1px solid rgba(255,255,255,0.1); padding: 15px 0; display: flex; justify-content: space-between; align-items: center;}
        .lp-faq-q { font-size: 11px; color: #ccc; font-weight: 400; }
        .lp-faq-icon { color: var(--gold-text); font-size: 10px; }

        /* Action Bar (Dock) */
        .lp-action-bar {
            position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 100;
            width: 85%; background: rgba(30, 30, 30, 0.8); backdrop-filter: blur(15px);
            padding: 5px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1);
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
            cursor: pointer;
            transition: all 0.3s;
        }
        .lp-action-bar:hover { background: rgba(40, 40, 40, 0.9); transform: translateX(-50%) translateY(-2px); }
        .lp-action-btn {
            background: var(--gold-gradient); color: #000;
            padding: 12px 30px; border-radius: 50px; font-weight: 700; font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2);
            flex: 1; text-align: center;
        }
        .lp-action-icon {
            width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
            background: #000; border-radius: 50%; margin-right: 5px; color: var(--gold-text);
        }

        /* --- CHECKLIST LINE BY LINE (NOVO LAYOUT) --- */
        #checklist-section { background-color: #fff; }
        .checklist-container { max-width: 900px; margin: 0 auto; text-align: left; }
        
        .check-line-item {
            display: flex; align-items: flex-start;
            padding: 20px 0;
            border-bottom: 1px solid #eee;
            transition: all 0.3s;
        }
        .check-line-item:hover { transform: translateX(10px); background: #fafafa; padding-left: 10px; }
        
        .check-line-num {
            font-family: 'Cormorant Garamond', serif; font-size: 1.5em; color: #d4af37; font-style: italic;
            width: 50px; flex-shrink: 0; margin-top: -5px;
        }
        
        .check-line-content h4 { margin: 0 0 5px 0; color: #111; font-weight: 700; font-size: 1.1em; }
        .check-line-content p { margin: 0; color: #666; font-size: 0.9em; line-height: 1.5; }
        
        .check-line-category {
            margin-top: 40px; margin-bottom: 15px;
            font-size: 0.8em; text-transform: uppercase; letter-spacing: 2px; color: #999; font-weight: 700;
            border-left: 3px solid #d4af37; padding-left: 15px;
        }

        /* --- ORÇAMENTO --- */
        #budget-section { background-color: #fcfcfc; }
        .budget-container { width: 100%; max-width: 900px; margin: 0 auto; text-align: left; }
        
        .module-row {
            display: flex; align-items: flex-start;
            background: #fff; border: 1px solid #e0e0e0;
            border-radius: 4px; padding: 40px; margin-bottom: 20px; 
            transition: all 0.3s; box-shadow: 0 5px 20px rgba(0,0,0,0.03);
        }
        .module-row.selected { background: #fffdf5; border-color: #d4af37; box-shadow: 0 10px 40px rgba(212, 175, 55, 0.15); }
        
        .module-checkbox {
            appearance: none; min-width: 24px; height: 24px; border: 2px solid #ccc; border-radius: 50%; margin-right: 30px; margin-top: 5px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s;
        }
        .module-checkbox:checked { background: #d4af37; border-color: #d4af37; }
        .module-checkbox:checked::after { content: '✔'; color: white; font-size: 14px; font-weight: bold; }

        .module-badge { font-size: 0.65em; text-transform: uppercase; font-weight: 700; padding: 5px 12px; border-radius: 2px; margin-left: 15px; letter-spacing: 1px; color: white; }
        .badge-essential { background: #111; }
        .badge-recommended { background: linear-gradient(45deg, #d4af37, #aa771c); }
        .badge-extra { background: #2980b9; }
        .badge-optional { background: #95a5a6; }

        .module-title { color: #111; font-weight: 700; font-size: 1.4em; font-family: 'Cormorant Garamond', serif; }
        .module-desc { font-size: 0.95em; color: #555; margin-bottom: 20px; line-height: 1.6; margin-top: 10px; }
        .module-detail-list { margin-top: 15px; padding-left: 18px; font-size: 0.9em; color: #444; }
        .module-detail-list li { margin-bottom: 8px; }
        .module-argument { font-size: 0.85em; background: #f4f6f8; padding: 15px; border-left: 3px solid #111; margin-bottom: 20px; font-style: italic; color: #444; }

        .price-value { font-family: 'Cormorant Garamond', serif; font-size: 2em; font-style: italic; color: #111; font-weight: 600;}
        .price-label { font-size: 0.65em; letter-spacing: 2px; text-transform: uppercase; color: #777; margin-bottom: 5px; display: block; font-weight: 700;}

        /* FOOTER DE VALORES */
        .budget-footer {
            position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%);
            width: 95%; max-width: 1000px;
            background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px);
            border: 1px solid #ddd; border-radius: 100px; padding: 15px 50px;
            z-index: 200; display: flex; justify-content: space-between; align-items: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        .total-value { color: #111; font-size: 1.8em; font-weight: 700; font-family: 'Cormorant Garamond', serif; }
        .total-value.monthly { color: #27ae60; }

        /* BOTÕES DE OURO */
        .cta-gold {
            background: var(--gold-gradient); color: #000; box-shadow: 0 10px 30px rgba(189, 153, 56, 0.3);
            font-size: 0.9em; text-transform: uppercase; padding: 18px 50px; border: none; border-radius: 2px;
            font-weight: 800; cursor: pointer; letter-spacing: 2px; transition: all 0.4s; position: relative; overflow: hidden;
            animation: pulseGold 2s infinite;
        }
        .cta-gold:hover { transform: translateY(-3px); box-shadow: 0 20px 50px rgba(189, 153, 56, 0.5); }

        .next-btn {
            background: transparent; border: 1px solid #ddd; color: #111; padding: 15px 40px;
            font-size: 0.8em; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; transition: all 0.3s; margin-top: 40px; font-weight: 600;
        }
        .next-btn:hover { border-color: #d4af37; color: #d4af37; background: #fff; }
        
        #pain-section .next-btn, #gold-section .next-btn { border-color: rgba(255,255,255,0.3); color: #fff; }
        #pain-section .next-btn:hover, #gold-section .next-btn:hover { border-color: var(--gold-text); color: var(--gold-text); background: transparent; }

        /* RODAPÉ GLOBAL */
        .global-footer {
            position: fixed; bottom: 0; left: 0; width: 100%;
            background-color: #050505; color: #666;
            text-align: center; padding: 12px 0;
            font-size: 0.6rem; text-transform: uppercase; letter-spacing: 3px;
            z-index: 1000; border-top: 1px solid rgba(255,255,255,0.05);
        }
        .global-footer strong { color: #999; font-weight: 600; }
        
        /* CHAT OVERLAY SIMPLIFICADO */
        .chat-overlay { position: absolute; bottom: 0; left: 0; width: 100%; height: 0; background: rgba(0,0,0,0.6); z-index: 200; transition: height 0.3s; display: flex; flex-direction: column; justify-content: flex-end; border-radius: 0 0 30px 30px; overflow: hidden; }
        .chat-overlay.active { height: 100%; }
        .chat-window { background: #0b141a; height: 60%; width: 100%; border-radius: 20px 20px 0 0; padding: 0; display: flex; flex-direction: column; transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s; position: relative;}
        .chat-overlay.active .chat-window { transform: translateY(0); }
        .chat-header-fake { background: #202c33; display: flex; align-items: center; padding: 10px 15px; border-bottom: 1px solid #2f3b43; z-index: 2;}
        .chat-avatar { width: 35px; height: 35px; background: var(--gold-text); border-radius: 50%; color: #121212; display: flex; align-items: center; justify-content: center; font-size: 11px; margin-right: 10px; font-weight: bold;}
        .chat-name { font-size: 14px; font-weight: 500; color: #e9edef; display: block;}
        .chat-status { font-size: 11px; color: #25D366; display: block;}
        .chat-body { padding: 15px; flex: 1; display: flex; flex-direction: column; gap: 8px; z-index: 2;}
        .chat-bubble { background: #2c2c2c; padding: 8px 12px; border-radius: 0 12px 12px 12px; font-size: 12px; color: #e9edef; opacity: 0; transform: translateY(10px); max-width: 85%;}
        .chat-bubble.sent { background: #005c4b; align-self: flex-end; border-radius: 12px 0 12px 12px; color: #e9edef; }
        .typing-indicator { font-style: italic; color: #25D366; font-size: 11px; margin-left: 15px; display: none; margin-bottom: 5px;}
        .chat-overlay.active .msg-1 { animation: popIn 0.3s forwards 0.5s; }
        .chat-overlay.active .msg-2 { animation: popIn 0.3s forwards 1.2s; }
        .chat-overlay.active .msg-3 { animation: popIn 0.3s forwards 2.0s; }
        @keyframes popIn { to { opacity: 1; transform: translateY(0); } }

        /* Responsividade */
        @media screen and (max-width: 900px) {
            .audit-container, .neuro-grid { flex-direction: column; }
            .phone-frame { margin: 40px auto; }
            .budget-footer { width: 100%; border-radius: 0; bottom: 35px; flex-direction: column; gap: 15px; padding: 20px;}
            .intro-brand { font-size: 3em; }
            .analysis-list { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

    <nav class="nav-tabs">
        <button class="tab-btn active" onclick="openTab('intro-section', this)">Início</button>
        <button class="tab-btn" onclick="openTab('pain-section', this)">1. Diagnóstico</button>
        <button class="tab-btn" onclick="openTab('solution-section', this)">2. Estratégia</button>
        <button class="tab-btn" onclick="openTab('future-section', this)">3. ROI & Metas</button>
        <button class="tab-btn" onclick="openTab('calendar-section', this)">4. Cronograma</button>
        <button class="tab-btn" onclick="openTab('gold-section', this)">5. Neurovendas</button>
        <button class="tab-btn" onclick="openTab('checklist-section', this)">6. Checklist</button>
        <button class="tab-btn" onclick="openTab('budget-section', this)">7. Investimento</button>
    </nav>

    <!-- 0. INTRO / CAPA -->
    <div id="intro-section" class="tab-content active">
        <div class="intro-content">
            <span class="intro-label">Estratégia & Performance</span>
            <div class="intro-brand">Demarchi <span class="gold-text">&bull;</span> Móveis</div>
            <div class="client-name">Preparado exclusivamente para: <strong>Lucas Demarchi</strong></div>
            <div class="intro-tagline">Plano de Aceleração Comercial</div>
            
            <div class="tech-stack">
                <span class="tech-pill">Google Ads</span>
                <span class="tech-pill">Meta Business</span>
                <span class="tech-pill">Neuro-Copy</span>
            </div>

            <div class="consultant-badge">
                <div class="consultant-img"></div>
                <div class="consultant-text">
                    <span class="consultant-name">Tiago Grabski</span>
                    <span class="consultant-role">Business Partner</span>
                </div>
            </div>

            <div class="btn-wrapper">
                <button class="cta-gold" onclick="goToTab(1)">INICIAR APRESENTAÇÃO</button>
            </div>
        </div>
    </div>

    <!-- 1. DIAGNÓSTICO -->
    <div id="pain-section" class="tab-content">
        <div class="container">
            <h1>Auditoria Digital: O Efeito Fantasma</h1>
            <p class="subtitle">Análise Forense: A sua marca está invisível em Chapecó ou sendo confundida.</p>

            <!-- Calculadora de Prejuízo (RECUPERADO) -->
            <div class="loss-calculator">
                <div class="loss-input-group">
                    <label>Buscas/Mês (Estimada)</label>
                    <input type="number" class="loss-input" id="searches" value="500" onchange="calculateLoss()">
                </div>
                <div class="loss-input-group">
                    <label>Ticket Médio (Cozinha)</label>
                    <input type="number" class="loss-input" id="ticket-loss" value="20000" onchange="calculateLoss()">
                </div>
                <div class="loss-result">
                    <span class="loss-label">Potencial de Venda Perdido</span>
                    <span class="loss-amount" id="loss-display">R$ 100.000,00</span>
                    <span style="font-size:0.7em; color:#888;">(Considerando 1% de conversão)</span>
                </div>
            </div>

            <div class="audit-container">
                <div class="audit-visual">
                    <div class="browser-mockup">
                        <div class="browser-bar">
                            <div class="traffic-lights"><div class="light red"></div><div class="light yellow"></div><div class="light green"></div></div>
                            <div class="address-bar">google.com.br/search?q=demarchi+moveis</div>
                        </div>
                        <div class="search-results">
                            <div class="result-item">
                                <div class="result-title">De Marchi Marcenaria e Estofados</div>
                                <div class="result-url">Frederico Westphalen - RS</div>
                                <div class="result-desc">⚠ Aparece no topo. O cliente liga enganado para o RS. <span class="warning-tag">Perda de Tráfego</span></div>
                            </div>
                            <div class="result-item">
                                <div class="result-title">Demarchi Móveis Sob Medida</div>
                                <div class="result-url">Pato Branco - PR</div>
                                <div class="result-desc">⚠ Outra marca forte que rouba seu tráfego de pesquisa. <span class="warning-tag">Confusão de Marca</span></div>
                            </div>
                            <div class="result-item" style="border:none;">
                                <div class="result-title">Marceneiros em Chapecó (StarOfService)</div>
                                <div class="result-url">Listas Genéricas</div>
                                <div class="result-desc">❌ Sua empresa NÃO aparece no mapa local de Chapecó. <span class="warning-tag" style="background:#fadbd8; color:#c0392b; border-color:#fadbd8;">Crítico: Invisível</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="audit-analysis">
                    <ul class="analysis-list">
                        <li class="critical">
                            <strong>1. Conflito de Identidade</strong>
                            <p>O nome "Demarchi" já tem donos digitais no RS e PR. Sem blindar a marca "Demarchi Chapecó", você está fazendo propaganda gratuita para eles.</p>
                        </li>
                        <li class="critical">
                            <strong>2. Invisibilidade Geográfica</strong>
                            <p>Para o Google, sua empresa não existe fisicamente em Chapecó. Quem busca "cozinha planejada" cai na Todeschini ou na Felicittá.</p>
                        </li>
                        <li class="medium">
                            <strong>3. Dependência da Sorte</strong>
                            <p>Se a indicação falhar, o cliente não consegue te achar na internet.</p>
                        </li>
                    </ul>
                </div>
            </div>

            <button class="next-btn" onclick="goToTab(2)">VER A SOLUÇÃO</button>
        </div>
    </div>

    <!-- 2. SOLUÇÃO -->
    <div id="solution-section" class="tab-content">
        <div class="container">
            <h1 style="color:#111;">Engenharia de Vendas</h1>
            <p class="subtitle">Um ecossistema comercial completo para transformar curiosos em contratos.</p>
            <div class="roadmap-container">
                <div class="step-card">
                    <div class="step-number">1</div>
                    <h3 style="color:#111;">Setup & Alicerce</h3>
                    <ul class="step-list">
                        <li><span class="check-icon">✔</span> Google Meu Negócio Pro</li>
                        <li><span class="check-icon">✔</span> Palavras-chave SEO Local</li>
                        <li><span class="check-icon">✔</span> Árvore de Links Própria</li>
                        <li><span class="check-icon">✔</span> Script de Triagem</li>
                    </ul>
                </div>
                <div class="step-card" style="border-top: 3px solid var(--gold-text);">
                    <div class="step-number">2</div>
                    <h3 style="color:#111;">Máquina de Tráfego</h3>
                    <ul class="step-list">
                        <li><span class="check-icon">✔</span> LP de Neurovendas</li>
                        <li><span class="check-icon">✔</span> Ads Geolocalizados</li>
                        <li><span class="check-icon">✔</span> Conteúdo de Bastidores</li>
                    </ul>
                </div>
                <div class="step-card">
                    <div class="step-number">3</div>
                    <h3 style="color:#111;">Conversão & Pós</h3>
                    <ul class="step-list">
                        <li><span class="check-icon">✔</span> Recuperação de Lead</li>
                        <li><span class="check-icon">✔</span> Automação de Avaliação</li>
                        <li><span class="check-icon">✔</span> Relatório de ROI</li>
                    </ul>
                </div>
            </div>
            <button class="next-btn" style="color:#111; border-color:#ccc;" onclick="goToTab(3)">PROJEÇÃO DE RESULTADOS</button>
        </div>
    </div>

    <!-- 3. RESULTADOS (ROI INTERATIVO) -->
    <div id="future-section" class="tab-content">
        <div class="container">
            <h1 style="color:#111;">O Novo Padrão Demarchi</h1>
            <p class="subtitle">Metas conservadoras para os primeiros 90 dias.</p>
            
            <div class="roi-calc-box">
                <span style="font-weight:600; color:#555;">Seu Ticket Médio: R$</span>
                <input type="number" class="roi-input" id="ticket-roi" value="20000" onchange="calculateROI()">
                <span style="font-weight:600; color:#555;">Investimento Mensal: R$ 1.500</span>
                <div class="roi-result" id="roi-text">Ponto de Equilíbrio: 0.08 vendas/mês</div>
            </div>

            <div class="metrics-grid">
                <div class="metric-item">
                    <span class="metric-val">+300%</span>
                    <span class="metric-label">Visibilidade Google</span>
                </div>
                <div class="metric-item">
                    <span class="metric-val">20+</span>
                    <span class="metric-label">Leads Qualificados/Mês</span>
                </div>
                <div class="metric-item">
                    <span class="metric-val">Alto</span>
                    <span class="metric-label">Valor Percebido</span>
                </div>
            </div>
            
            <button class="next-btn" style="color:#111; border-color:#ccc;" onclick="goToTab(4)">VER CRONOGRAMA</button>
        </div>
    </div>

    <!-- 4. CRONOGRAMA -->
    <div id="calendar-section" class="tab-content">
        <div class="container">
            <h1 style="color:#111;">Roadmap Estratégico (90 Dias)</h1>
            <p class="subtitle">A execução é detalhada e sequencial. Não pulamos etapas.</p>
            
            <div class="timeline">
                <div class="timeline-item left">
                    <div class="content-box">
                        <span class="week-badge">Mês 1: A Fundação (Setup)</span>
                        <h4 style="color:#111; font-weight:700;">Arrumando a Casa & Identidade</h4>
                        <div class="week-detail">
                            <div class="week-row"><span class="week-name">Sem 1</span><span class="week-task">Diagnóstico, Acesso a Contas e Reivindicação do Google.</span></div>
                            <div class="week-row"><span class="week-name">Sem 2</span><span class="week-task">Definição da Identidade Visual, Bio e Linktree Próprio.</span></div>
                            <div class="week-row"><span class="week-name">Sem 3</span><span class="week-task">Engenharia da Landing Page (Site) e Textos.</span></div>
                            <div class="week-row"><span class="week-name">Sem 4</span><span class="week-task">Infraestrutura de Dados (Pixel/API) para rastreamento.</span></div>
                        </div>
                    </div>
                </div>
                <div class="timeline-item right">
                    <div class="content-box">
                        <span class="week-badge">Mês 2: A Máquina (Tráfego)</span>
                        <h4 style="color:#111; font-weight:700;">Início das Campanhas Ativas</h4>
                        <div class="week-detail">
                            <div class="week-row"><span class="week-name">Sem 1</span><span class="week-task">Configuração de Públicos e Campanhas (Meta/Google).</span></div>
                            <div class="week-row"><span class="week-name">Sem 2</span><span class="week-task">Go-Live: Lançamento oficial dos anúncios na região.</span></div>
                            <div class="week-row"><span class="week-name">Sem 3</span><span class="week-task">Análise de Criativos (Otimização de imagens/vídeos).</span></div>
                            <div class="week-row"><span class="week-name">Sem 4</span><span class="week-task">Implementação de Remarketing para recuperar visitas.</span></div>
                        </div>
                    </div>
                </div>
                <div class="timeline-item left">
                    <div class="content-box">
                        <span class="week-badge">Mês 3: A Escala (Otimização)</span>
                        <h4 style="color:#111; font-weight:700;">Refinamento & Lucro</h4>
                        <div class="week-detail">
                            <div class="week-row"><span class="week-name">Sem 1</span><span class="week-task">Auditoria de Qualidade dos Leads recebidos.</span></div>
                            <div class="week-row"><span class="week-name">Sem 2</span><span class="week-task">Ajuste de Script de Vendas com a equipe interna.</span></div>
                            <div class="week-row"><span class="week-name">Sem 3</span><span class="week-task">Escala de Orçamento nas campanhas vencedoras.</span></div>
                            <div class="week-row"><span class="week-name">Sem 4</span><span class="week-task">Fechamento de ciclo e planejamento de expansão.</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="next-btn" style="color:#111; border-color:#ccc;" onclick="goToTab(5)">ANALYZE NEUROVENDAS</button>
        </div>
    </div>

    <!-- 5. NEUROVENDAS -->
    <div id="gold-section" class="tab-content">
        <div class="container">
            <h1>Neuro-Conversão 2025</h1>
            <p class="subtitle">Experiência <strong>Dark Luxury</strong>: O cliente rola, se encanta e compra.</p>

            <div class="neuro-grid">
                <div class="neuro-left">
                    <div class="neuro-card"><h4>1. Estética da Riqueza</h4><p>O fundo preto com fotos iluminadas cria percepção imediata de exclusividade.</p></div>
                    <div class="neuro-card"><h4>2. Selos de Garantia</h4><p>Matamos as dúvidas técnicas (MDF, Montagem) no primeiro scroll.</p></div>
                </div>

                <div class="phone-frame">
                    <div class="dynamic-island"></div>
                    <div class="phone-screen-neuro">
                        <div class="lp-header"><span class="lp-logo">DEMARCHI | ATELIER</span><span class="lp-menu-icon">☰</span></div>
                        <div class="lp-hero">
                            <h2>SUA CASA,<br>SUA ASSINATURA.</h2>
                            <p>Projetos de Alta Marcenaria em Chapecó.</p>
                        </div>
                        <div class="lp-badges">
                            <div class="lp-badge-item"><span class="lp-badge-icon">🛡️</span><span class="lp-badge-text">100% MDF</span></div>
                            <div class="lp-badge-item"><span class="lp-badge-icon">🏗️</span><span class="lp-badge-text">MONTAGEM</span></div>
                            <div class="lp-badge-item"><span class="lp-badge-icon">📐</span><span class="lp-badge-text">PROJETO 3D</span></div>
                        </div>
                        <div class="lp-section-title">Coleção 2025</div>
                        <div class="lp-gallery-scroll">
                            <div class="lp-project-card"><img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80" class="lp-project-img"><div class="lp-project-info">Minimal Dark</div></div>
                            <div class="lp-project-card"><img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=300&q=80" class="lp-project-img"><div class="lp-project-info">Nogueira Classic</div></div>
                        </div>
                        <div class="lp-section-title" style="margin-top:20px;">Paleta de Tendência</div>
                        <div class="lp-trends">
                            <div class="lp-color-grid">
                                <div><div class="lp-color-circle" style="background:#2C3E50;"></div><div class="lp-color-name">Navy</div></div>
                                <div><div class="lp-color-circle" style="background:#5D4037;"></div><div class="lp-color-name">Mocca</div></div>
                                <div><div class="lp-color-circle" style="background:#111;"></div><div class="lp-color-name">Matte</div></div>
                            </div>
                        </div>
                        <div style="height:100px;"></div>
                        
                        <!-- Botão Flutuante (Action Bar) -->
                        <div class="lp-action-bar" onclick="activateChat()">
                            <div class="lp-action-btn">
                                <span>💬 ORÇAMENTO VIP</span>
                            </div>
                        </div>
                        
                        <div class="chat-overlay" id="simulatedChat">
                            <div class="chat-window">
                                <div class="chat-header-fake"><div class="chat-avatar">DM</div><div style="flex:1;"><span class="chat-name">Demarchi Projetos</span><span class="chat-status">online agora</span></div></div>
                                <div class="chat-body">
                                    <div class="typing-indicator" id="typing">Digitando...</div>
                                    <div class="chat-bubble msg-1">Olá! Bem-vindo ao canal exclusivo.</div>
                                    <div class="chat-bubble msg-2">Vi que tem interesse em um projeto.</div>
                                    <div class="chat-bubble msg-3">Qual ambiente você sonha em transformar?</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="neuro-right">
                    <div class="neuro-card"><h4>3. Autoridade de Tendência</h4><p>Ao mostrar "Cores 2025/26", saímos da posição de vendedor e viramos Consultores.</p></div>
                    <div class="neuro-card"><h4>4. Conversão Sem Fricção</h4><p>O botão flutuante e o Chat simulado (clique para testar) eliminam a burocracia.</p></div>
                </div>
            </div>

            <div style="margin-top: 50px;">
                <button class="next-btn" onclick="goToTab(6)">VER O ESCOPO DETALHADO</button>
            </div>
        </div>
    </div>

    <!-- 6. CHECKLIST -->
    <div id="checklist-section" class="tab-content">
        <div class="container">
            <h1 style="color:#111;">Escopo de Execução: 15 Entregáveis</h1>
            <p class="subtitle">Isto não é apenas "marketing". É uma reestruturação completa.</p>

            <div class="checklist-container">
                <div class="check-line-category">Fase 1: Identidade & Alicerce</div>
                <div class="check-line-item"><div class="check-line-num">01</div><div class="check-line-content"><h4>Auditoria de Identidade</h4><p>Unificação de nome e foto em todas as redes.</p></div></div>
                <div class="check-line-item"><div class="check-line-num">02</div><div class="check-line-content"><h4>Blindagem Google</h4><p>Cadastro completo e validação postal no GMN.</p></div></div>
                <div class="check-line-item"><div class="check-line-num">03</div><div class="check-line-content"><h4>SEO Local</h4><p>Inserção de "Móveis Chapecó" para busca orgânica.</p></div></div>
                <div class="check-line-item"><div class="check-line-num">04</div><div class="check-line-content"><h4>Link Biográfico Pro</h4><p>Página de links própria sem marcas d'água.</p></div></div>
                
                <div class="check-line-category">Fase 2: Conteúdo & Autoridade</div>
                <div class="check-line-item"><div class="check-line-num">05</div><div class="check-line-content"><h4>Destaques de Prova</h4><p>Stories fixos: "Quem Somos", "Obras", "Dúvidas".</p></div></div>
                <div class="check-line-item"><div class="check-line-num">06</div><div class="check-line-content"><h4>Design Premium</h4><p>Ajuste de logo circular e capas padronizadas.</p></div></div>
                <div class="check-line-item"><div class="check-line-num">07</div><div class="check-line-content"><h4>PDF Institucional</h4><p>Arquivo PDF leve para envio rápido no WhatsApp.</p></div></div>

                <div class="check-line-category">Fase 3: Inteligência de Dados</div>
                <div class="check-line-item"><div class="check-line-num">08</div><div class="check-line-content"><h4>Pixel Setup</h4><p>Instalação de códigos de rastreamento no site.</p></div></div>
                <div class="check-line-item"><div class="check-line-num">09</div><div class="check-line-content"><h4>Público Negativo</h4><p>Lista de exclusão para não gastar com curiosos.</p></div></div>
                <div class="check-line-item"><div class="check-line-num">10</div><div class="check-line-content"><h4>Raio de Atuação</h4><p>Configuração de pinos geográficos nos bairros alvo.</p></div></div>
                <div class="check-line-item"><div class="check-line-num">11</div><div class="check-line-content"><h4>Tag Manager</h4><p>Configuração de eventos de botão no site.</p></div></div>

                <div class="check-line-category">Fase 4: Comercial & Vendas</div>
                <div class="check-line-item"><div class="check-line-num">12</div><div class="check-line-content"><h4>Script de Saudação</h4><p>Áudio/Texto padrão para triagem do lead.</p></div></div>
                <div class="check-line-item"><div class="check-line-num">13</div><div class="check-line-content"><h4>FAQ Automático</h4><p>Respostas rápidas configuradas no WhatsApp Business.</p></div></div>
                <div class="check-line-item"><div class="check-line-num">14</div><div class="check-line-content"><h4>CRM Básico</h4><p>Planilha de controle de status dos orçamentos.</p></div></div>
                <div class="check-line-item"><div class="check-line-num">15</div><div class="check-line-content"><h4>Pesquisa NPS</h4><p>Mensagem de pós-venda para pedir indicação.</p></div></div>
            </div>

            <div style="margin-top: 50px;">
                <button class="next-btn" style="color:#111; border-color:#ccc;" onclick="goToTab(7)">VER VALORES DO PROJETO</button>
            </div>
        </div>
    </div>

    <!-- 7. ORÇAMENTO -->
    <div id="budget-section" class="tab-content">
        <div class="container">
            <h1 style="color:#111;">Plano de Investimento</h1>
            <p class="subtitle">Selecione os módulos para o momento atual da Demarchi.</p>
            
            <div class="budget-container">
                <div class="module-row selected" id="row-1">
                    <input type="checkbox" class="module-checkbox" id="mod-1" checked onchange="calculateTotal()">
                    <div class="module-content">
                        <div class="module-header"><span class="module-title">1. O Alicerce (Setup Completo)</span><span class="module-badge badge-essential">Indispensável</span></div>
                        <div class="module-desc"><strong>Entrega Única:</strong> Configuração Google, Identidade Visual, SEO Local, Linktree, Business Manager Meta.</div>
                        <div class="module-pricing"><div class="price-tag"><span class="price-label">Taxa de Implementação</span><span class="price-value">R$ 2.000,00</span></div></div>
                    </div>
                </div>

                <div class="module-row selected" id="row-2">
                    <input type="checkbox" class="module-checkbox" id="mod-2" checked onchange="calculateTotal()">
                    <div class="module-content">
                        <div class="module-header"><span class="module-title">2. A Máquina (Performance)</span><span class="module-badge badge-recommended">Ciclo 90 Dias</span></div>
                        <div class="module-desc"><strong>Mensalidade:</strong> Gestão de Tráfego, Design (8 artes), Otimização Diária.</div>
                        <div class="module-argument">💡 <strong>Nota:</strong> Valor cobre estratégia e edição. Não inclui visita para filmagem.</div>
                        <div class="module-pricing">
                            <div class="price-tag"><span class="price-label">LP & Pixel</span><span class="price-value">R$ 1.000,00</span></div>
                            <div class="price-tag"><span class="price-label">Gestão Mensal</span><span class="price-value">R$ 1.500,00 <span style="font-size:0.6em; color:#666; font-weight:400;">(Inicia em 30 dias)</span></span></div>
                        </div>
                    </div>
                </div>

                <div class="module-row" id="row-extra" style="border-left: 5px solid var(--secondary);">
                    <input type="checkbox" class="module-checkbox" id="mod-extra" onchange="calculateTotal()">
                    <div class="module-content">
                        <div class="module-header"><span class="module-title">★ Extra: Diária de Filmmaker</span><span class="module-badge badge-extra">Opcional</span></div>
                        <div class="module-desc">Visita técnica para captação de vídeo e foto profissional na fábrica/obra.</div>
                        <div class="module-pricing"><div class="price-tag"><span class="price-label">Por Visita</span><span class="price-value">R$ 950,00</span></div></div>
                    </div>
                </div>

                <div class="module-row" id="row-3">
                    <input type="checkbox" class="module-checkbox" id="mod-3" onchange="calculateTotal()">
                    <div class="module-content">
                        <div class="module-header"><span class="module-title">3. Conversão & CRM</span><span class="module-badge badge-optional">Opcional</span></div>
                        <div class="module-desc">Treinamento de Vendas e Recuperação de Leads.</div>
                        <div class="module-pricing"><div class="price-tag"><span class="price-label">Consultoria Única</span><span class="price-value">R$ 1.500,00</span></div></div>
                    </div>
                </div>
            </div>
            <div style="height:100px;"></div>
        </div>
        
        <div class="budget-footer">
            <div class="total-block"><span class="total-label">Setup (Agora)</span><span class="total-value" id="total-setup">R$ 3.000,00</span></div>
            <div style="font-size: 2em; color: #ddd; font-weight: 300;">+</div>
            <div class="total-block"><span class="total-label">Mensal (Em 30 Dias)</span><span class="total-value monthly" id="total-monthly">R$ 1.500,00</span></div>
            <button class="cta-gold" onclick="closeDeal()">APROVAR PROJETO</button>
        </div>
    </div>
    
    <!-- MODAL DE FECHAMENTO -->
    <div id="success-modal" class="modal">
        <div class="modal-content">
            <span class="success-icon">✓</span>
            <h2 style="color:#111; margin-bottom:10px;">Projeto Aprovado!</h2>
            <p style="color:#666;">Estamos gerando o contrato para: <strong>Lucas Demarchi</strong>.</p>
            <p style="color:#666; font-size:0.8em; margin-top:20px;">Bem-vindo à nova era da sua empresa.</p>
        </div>
    </div>

    <!-- RODAPÉ GLOBAL -->
    <div class="global-footer"><span>Responsável Performance Business: <strong>Tiago Grabski</strong></span></div>

    <script>
        function openTab(tabId, btnElement) {
            var contents = document.getElementsByClassName('tab-content');
            for (var i = 0; i < contents.length; i++) contents[i].classList.remove('active');
            var btns = document.getElementsByClassName('tab-btn');
            for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
            document.getElementById(tabId).classList.add('active');
            if(btnElement) btnElement.classList.add('active');
        }

        function goToTab(index) {
            var tabsIds = ['intro-section', 'pain-section', 'solution-section', 'future-section', 'calendar-section', 'gold-section', 'checklist-section', 'budget-section'];
            var buttons = document.getElementsByClassName('tab-btn');
            if(index < tabsIds.length) { openTab(tabsIds[index], buttons[index]); window.scrollTo(0,0); }
        }

        function calculateLoss() {
            var searches = document.getElementById('searches').value;
            var ticket = document.getElementById('ticket-loss').value;
            var conversionRate = 0.01; 
            var loss = searches * conversionRate * ticket;
            document.getElementById('loss-display').innerText = loss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        function calculateROI() {
            var ticket = document.getElementById('ticket-roi').value;
            var investment = 1500;
            var salesNeeded = investment / ticket;
            document.getElementById('roi-text').innerText = "Ponto de Equilíbrio: Apenas " + salesNeeded.toFixed(2) + " vendas/mês";
        }

        function calculateTotal() {
            let setupTotal = 0; let monthlyTotal = 0;
            if(document.getElementById('mod-1').checked) { setupTotal += 2000; document.getElementById('row-1').classList.add('selected'); } else { document.getElementById('row-1').classList.remove('selected'); }
            if(document.getElementById('mod-2').checked) { setupTotal += 1000; monthlyTotal += 1500; document.getElementById('row-2').classList.add('selected'); } else { document.getElementById('row-2').classList.remove('selected'); }
            if(document.getElementById('mod-extra').checked) { setupTotal += 950; document.getElementById('row-extra').classList.add('selected'); } else { document.getElementById('row-extra').classList.remove('selected'); }
            if(document.getElementById('mod-3').checked) { setupTotal += 1500; document.getElementById('row-3').classList.add('selected'); } else { document.getElementById('row-3').classList.remove('selected'); }
            document.getElementById('total-setup').innerText = setupTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.getElementById('total-monthly').innerText = monthlyTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

        function activateChat() {
            var overlay = document.getElementById('simulatedChat');
            var typing = document.getElementById('typing');
            overlay.classList.add('active');
            typing.style.display = 'block';
            setTimeout(() => { typing.style.display = 'none'; }, 1000);
            setTimeout(() => { typing.style.display = 'block'; }, 1500);
            setTimeout(() => { typing.style.display = 'none'; }, 2500);
            setTimeout(() => { typing.style.display = 'block'; }, 3000);
            setTimeout(() => { typing.style.display = 'none'; }, 4000);
        }
        
        function closeDeal() {
            document.getElementById('success-modal').style.display = 'flex';
            setTimeout(() => { 
                document.getElementById('success-modal').style.display = 'none'; 
                alert("Redirecionando para assinatura digital...");
            }, 3000);
        }

        // Init
        calculateLoss();
        calculateROI();
    </script>
</body>
</html>
