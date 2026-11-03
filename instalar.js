// TEAM GO! — convite pra instalar (app do aluno e painel do treinador usam o mesmo).
// Abre sozinho logo depois que a página aparece, com o caminho certo pra cada celular:
//   Android/Chrome: 1 toque ("Instalar agora")  ·  Instagram/Facebook: 1 toque pra abrir no Chrome/Safari
//   iPhone: demonstração animada + seta apontando o botão certo (a Apple não deixa site nenhum instalar sozinho).
// Nada é enviado pra internet: só guarda no celular quando a pessoa tocou "Agora não" ou "Já instalei".
(function () {
  'use strict';
  var CSS = '' +
    '#tgs-instala{display:none;position:fixed;left:0;right:0;bottom:0;z-index:8500;align-items:center;gap:12px;padding:12px max(16px,env(safe-area-inset-right)) calc(12px + env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));background:#1B1B1B;border-top:1px solid rgba(247,243,239,.13);font-family:"Libre Franklin",Arial,sans-serif;box-sizing:border-box}' +
    '#tgs-instala.on{display:flex}#tgs-instala img{width:40px;height:40px;border-radius:10px;flex:none}' +
    '#tgs-instala .tgs-tx{flex:1;min-width:0;font-size:13.5px;line-height:1.35;color:#B8ACA9}#tgs-instala .tgs-tx b{color:#F7F3EF;display:block;font-size:14.5px}' +
    '#tgs-instala .tgs-btn{padding:10px 14px;font-size:14px;flex:none}#tgs-instala .tgs-x{background:none;border:0;color:#B8ACA9;font-size:22px;line-height:1;padding:6px;cursor:pointer;flex:none}' +
    '.tgs-btn{font:inherit;font-weight:700;font-size:16px;padding:14px 18px;border-radius:12px;border:0;background:linear-gradient(180deg,#FF2A3B,#C80016);color:#fff;cursor:pointer}' +
    '.tgs-btn.gh{background:transparent;border:1px solid rgba(247,243,239,.13);color:#F7F3EF}' +
    'html.tgs-convite:not(.tgs-q) .tabs{bottom:calc(var(--tgs-barra,0px) + 10px)}html.tgs-convite:not(.tgs-q) body{padding-bottom:var(--tgs-barra,0px)}' +
    '#tgs-folha{position:fixed;inset:0;z-index:9500;display:none;align-items:flex-end;justify-content:center;font-family:"Libre Franklin",Arial,sans-serif;color:#F7F3EF}' +
    '#tgs-folha.on{display:flex}#tgs-folha .tgs-fundo{position:absolute;inset:0;background:rgba(0,0,0,.62);opacity:0;transition:opacity .3s ease;backdrop-filter:blur(3px)}#tgs-folha.vis .tgs-fundo{opacity:1}' +
    '#tgs-folha .tgs-cx{position:relative;width:100%;max-width:480px;max-height:94vh;overflow-y:auto;box-sizing:border-box;padding:12px 20px calc(20px + env(safe-area-inset-bottom));border-radius:24px 24px 0 0;background:radial-gradient(120% 60% at 50% 0,#3a0710 0,#1B1B1B 60%);border:1px solid rgba(247,243,239,.13);border-bottom:0;transform:translateY(105%);transition:transform .42s cubic-bezier(.2,.8,.2,1);text-align:center;outline:none}' +
    '#tgs-folha.vis .tgs-cx{transform:none}.tgs-pega{width:44px;height:5px;border-radius:9px;background:rgba(247,243,239,.25);margin:0 auto 12px}' +
    '.tgs-ic{width:68px;height:68px;border-radius:18px;display:block;margin:2px auto 10px;box-shadow:0 10px 30px -6px rgba(244,0,26,.6);animation:tgsFlut 2.6s ease-in-out infinite}@keyframes tgsFlut{50%{transform:translateY(-5px)}}' +
    '#tgs-folha h2{font-family:"Big Shoulders Display","Arial Narrow",Arial,sans-serif;font-weight:900;font-size:27px;line-height:1;text-transform:uppercase;margin:0 0 8px}' +
    '#tgs-folha .tgs-sub{margin:0 auto 14px;color:#B8ACA9;font-size:15px;line-height:1.45;max-width:34ch}' +
    '.tgs-passos{list-style:none;margin:0 0 14px;padding:0;text-align:left;display:flex;flex-direction:column;gap:8px;counter-reset:p}' +
    '.tgs-passos li{counter-increment:p;display:flex;gap:12px;align-items:center;padding:11px 13px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(247,243,239,.13);font-size:14.5px;line-height:1.4;transition:border-color .3s,background .3s}' +
    '.tgs-passos li::before{content:counter(p);flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#E00018;color:#fff;font-weight:700;font-size:14px}' +
    '.tgs-passos li.ag{border-color:#E00018;background:rgba(224,0,24,.12)}.tgs-passos b{color:#fff}.tgs-passos small{display:block;color:#B8ACA9;font-size:13px;margin-top:2px}' +
    '#tgs-folha .tgs-cx svg{display:inline-block;width:20px;height:20px;vertical-align:-4px;margin:0 2px}' +
    '#tgs-folha .tgs-btn{display:block;width:100%;box-sizing:border-box;text-decoration:none;font-size:17px;padding:15px;margin:2px 0 6px;box-shadow:0 10px 26px -10px rgba(224,0,24,.9);transition:transform .12s ease}' +
    '#tgs-folha .tgs-btn:active{transform:scale(.97)}#tgs-folha .tgs-btn.gh{box-shadow:none}' +
    '.tgs-pulso{animation:tgsPulsoB 1.8s ease-in-out infinite}@keyframes tgsPulsoB{50%{box-shadow:0 0 0 8px rgba(224,0,24,.18),0 10px 26px -10px rgba(224,0,24,.9)}}' +
    '.tgs-linha{display:flex;gap:8px;justify-content:center;margin-top:6px;flex-wrap:wrap}.tgs-linha button,.tgs-linha a{font:inherit;font-size:14.5px;background:none;border:0;color:#B8ACA9;padding:10px 12px;cursor:pointer;text-decoration:underline;text-underline-offset:3px}' +
    '.tgs-aviso{font-size:13px;color:#B8ACA9;margin:8px 0 6px;line-height:1.4}' +
    '.tgs-seta{position:fixed;z-index:9600;width:48px;height:48px;pointer-events:none;display:none;animation:tgsSeta 1.1s ease-in-out infinite}.tgs-seta.on{display:block}.tgs-seta svg{width:100%;height:100%;filter:drop-shadow(0 4px 10px rgba(0,0,0,.6))}' +
    '@keyframes tgsSeta{50%{translate:0 10px}}.tgs-seta.cima{animation-name:tgsSetaC}@keyframes tgsSetaC{50%{translate:0 -10px}}' +
    '.tgs-dica{position:fixed;z-index:9600;left:12px;right:12px;bottom:calc(68px + env(safe-area-inset-bottom));display:none;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:#E00018;color:#fff;font:600 15px/1.35 "Libre Franklin",Arial,sans-serif;box-shadow:0 12px 30px -8px rgba(0,0,0,.7)}' +
    '.tgs-dica.topo{bottom:auto;top:64px}.tgs-dica.on{display:flex;animation:tgsDica .4s cubic-bezier(.2,.8,.2,1)}.tgs-dica span{flex:1}.tgs-dica button{background:none;border:0;color:#fff;font-size:24px;line-height:1;padding:4px 6px;cursor:pointer}@keyframes tgsDica{from{opacity:0;transform:translateY(12px)}}' +
    // demonstração animada do iPhone (um celular desenhado mostrando onde tocar)
    '.tgi{display:flex;flex-direction:column;align-items:center;gap:8px;margin:0 0 12px}' +
    '.tgi-tel{position:relative;width:150px;height:236px;border-radius:26px;border:3px solid #3a3a3a;background:#0e0e0e;overflow:hidden;box-shadow:0 14px 34px -14px rgba(224,0,24,.7)}' +
    '.tgi-c{position:absolute;inset:0;opacity:0;transition:opacity .35s ease}.tgi-c.on{opacity:1}' +
    '.tgi-pg{position:absolute;left:12px;right:12px;top:22px;display:flex;flex-direction:column;gap:7px}.tgi-pg i{display:block;height:8px;border-radius:4px;background:#2a2a2a}.tgi-pg i:nth-child(1){height:34px;background:linear-gradient(135deg,#3a0710,#1b1b1b)}.tgi-pg i:nth-child(3){width:70%}' +
    '.tgi-barra{position:absolute;left:8px;right:8px;bottom:10px;height:30px;border-radius:16px;background:#2b2b2b;display:flex;align-items:center;justify-content:space-between;padding:0 9px}' +
    '.tgi-barra b{flex:1;height:14px;margin:0 8px;border-radius:7px;background:#3d3d3d}.tgi-barra svg{width:15px!important;height:15px!important;margin:0!important;vertical-align:0!important}' +
    '.tgi-menu{position:absolute;right:8px;bottom:46px;width:112px;border-radius:12px;background:#2b2b2b;padding:5px 0;font:600 10px/1 "Libre Franklin",Arial,sans-serif;color:#ddd;text-align:left}' +
    '.tgi-menu span{display:flex;align-items:center;justify-content:space-between;padding:6px 9px}.tgi-menu span.al{background:#E00018;color:#fff}' +
    '.tgi-folha{position:absolute;left:0;right:0;bottom:0;height:150px;border-radius:14px 14px 0 0;background:#232323;padding:10px 8px;font:600 9.5px/1 "Libre Franklin",Arial,sans-serif;color:#ddd;text-align:left;display:flex;flex-direction:column;gap:5px}' +
    '.tgi-folha span{display:flex;align-items:center;justify-content:space-between;padding:7px 8px;border-radius:8px;background:#2e2e2e}.tgi-folha span.al{background:#E00018;color:#fff}.tgi-folha svg{width:12px!important;height:12px!important;margin:0!important;vertical-align:0!important}' +
    '.tgi-home{position:absolute;inset:0;padding:26px 14px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;align-content:start;background:linear-gradient(160deg,#2a1216,#101010)}' +
    '.tgi-home i{display:block;aspect-ratio:1;border-radius:7px;background:#333}.tgi-home img{width:100%;aspect-ratio:1;border-radius:7px;display:block;opacity:0;transform:scale(.3)}.tgi-c.on .tgi-home img{animation:tgiPop .6s .25s cubic-bezier(.2,1.6,.4,1) forwards}@keyframes tgiPop{to{opacity:1;transform:none}}' +
    '.tgi-dedo{position:absolute;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.85);box-shadow:0 0 0 4px rgba(255,59,74,.6);pointer-events:none;opacity:0}.tgi-c.on .tgi-dedo{animation:tgiToque 1.6s .3s ease-out}@keyframes tgiToque{0%{opacity:0;transform:scale(1.6)}30%{opacity:1;transform:scale(1)}45%{transform:scale(.8)}100%{opacity:0;transform:scale(.8)}}' +
    '.tgi-leg{margin:0;font-size:14px;font-weight:700;color:#fff;min-height:2.6em;max-width:30ch;line-height:1.3}' +
    '@media (prefers-reduced-motion:reduce){.tgs-ic,.tgs-pulso,.tgs-seta{animation:none}#tgs-folha .tgs-cx,#tgs-folha .tgs-fundo,.tgi-c{transition:none}.tgi-c.on .tgi-dedo{animation:none;opacity:1}.tgi-c.on .tgi-home img{animation:none;opacity:1;transform:none}}';

  var IC = {
    comp: '<svg viewBox="0 0 24 24" aria-label="Compartilhar"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M5 11v9h14v-9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mais: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="#fff" stroke-width="2"/><path d="M12 8v8M8 12h8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
    pts: '<svg viewBox="0 0 24 24" aria-label="três pontinhos"><circle cx="12" cy="5" r="2" fill="#fff"/><circle cx="12" cy="12" r="2" fill="#fff"/><circle cx="12" cy="19" r="2" fill="#fff"/></svg>',
    ptsH: '<svg viewBox="0 0 24 24" aria-label="três pontinhos"><circle cx="5" cy="12" r="2" fill="#fff"/><circle cx="12" cy="12" r="2" fill="#fff"/><circle cx="19" cy="12" r="2" fill="#fff"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-label="menu"><path d="M4 7h16M4 12h16M4 17h16" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
    volta: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="#aaa" stroke-width="2.4" stroke-linecap="round"/></svg>'
  };
  var SETA = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 44V8M10 22 24 8l14 14" fill="none" stroke="#FF3B4A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  window.TGInstalar = function (op) {
    op = op || {};
    var guarda = op.guarda, ch = op.chaves || {}, nome = op.nome || 'TEAM GO!', oQue = op.oQue || 'o app', icone = op.icone || 'icones/icone-192.png';
    var ler = function (k) { try { return guarda ? guarda.ler(k) : localStorage.getItem(k); } catch (e) { return null; } };
    var por = function (k, v) { try { return guarda ? guarda.por(k, v) : localStorage.setItem(k, v); } catch (e) { return false; } };
    var instalado = function () { return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true; };
    if (instalado() || window.TG_INSTALADOR) return;
    window.TG_INSTALADOR = true;
    if (!document.getElementById('tgs-inst-css')) { var st = document.createElement('style'); st.id = 'tgs-inst-css'; st.textContent = CSS; document.head.appendChild(st); }

    var ua = navigator.userAgent || '', raiz = document.documentElement;
    var ios = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var ipad = /iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var android = /Android/i.test(ua);
    var dentro = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Line\/|TikTok|musical_ly|Snapchat|LinkedInApp|GSA\//i.test(ua) || (android && /; wv\)/.test(ua));
    var outroIOS = ios && /CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
    var samsung = /SamsungBrowser/i.test(ua);
    // versão do iPhone: pelo Safari ("Version/26") ou pelo sistema ("OS 26_0")
    var safariV = +((/Version\/(\d+)/.exec(ua) || [])[1] || 0) || +((/OS (\d+)_/.exec(ua) || [])[1] || 0);
    var novo = safariV >= 26;
    var linkFora = android ? 'intent://' + location.href.replace(/^https?:\/\//, '') + '#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=' + encodeURIComponent(location.href) + ';end'
      : ios ? 'x-safari-' + location.href : '';
    var celular = ios || android || !!(window.matchMedia && matchMedia('(pointer:coarse)').matches);
    var agora = Date.now(), dia = 864e5;
    var adiou = agora - (+(ler(ch.adia) || 0)) < dia;
    var disseJa = agora - (+(ler(ch.ja) || 0)) < 30 * dia;
    var barraFechada = agora - (+(ler(ch.barra) || 0)) < 3 * dia;

    // barrinha de baixo (fica quando a pessoa fecha a folha)
    var barra = document.getElementById('tgs-instala');
    if (!barra) {
      barra = document.createElement('div'); barra.id = 'tgs-instala'; barra.setAttribute('role', 'region'); barra.setAttribute('aria-label', 'Instalar');
      barra.innerHTML = '<img alt=""><div class="tgs-tx" id="tgs-instalaTx"></div><button class="tgs-btn" id="tgs-instalaBtn" type="button">Instalar</button><button class="tgs-x" id="tgs-instalaX" type="button" aria-label="Agora não">×</button>';
      document.body.appendChild(barra);
    }
    var bImg = barra.querySelector('img'); if (bImg) bImg.src = icone;
    var bBtn = barra.querySelector('#tgs-instalaBtn'), bX = barra.querySelector('#tgs-instalaX');
    barra.querySelector('#tgs-instalaTx').innerHTML = '<b>Instale ' + oQue + ' ' + nome + '</b>' + (ios ? 'Toque em Instalar que eu te mostro onde.' : 'Fica na tela do celular e abre com um toque.');
    bBtn.textContent = 'Instalar';
    var mostraBarra = function () { if (barraFechada || disseJa) return; barra.classList.add('on'); raiz.classList.add('tgs-convite'); raiz.style.setProperty('--tgs-barra', barra.offsetHeight + 'px'); };
    var escondeBarra = function () { barra.classList.remove('on'); raiz.classList.remove('tgs-convite'); raiz.style.setProperty('--tgs-barra', '0px'); };
    bX.addEventListener('click', function () { escondeBarra(); por(ch.barra, String(Date.now())); });

    var folha = document.createElement('div');
    folha.id = 'tgs-folha'; folha.setAttribute('role', 'dialog'); folha.setAttribute('aria-modal', 'true'); folha.setAttribute('aria-labelledby', 'tgs-fT');
    folha.innerHTML = '<div class="tgs-fundo"></div><div class="tgs-cx" tabindex="-1"><div class="tgs-pega"></div><div id="tgs-fC"></div></div>';
    document.body.appendChild(folha);
    var corpo = folha.querySelector('#tgs-fC'), cx = folha.querySelector('.tgs-cx');
    var seta = document.createElement('div'); seta.className = 'tgs-seta'; seta.innerHTML = SETA; document.body.appendChild(seta);
    var dica = document.createElement('div'); dica.className = 'tgs-dica'; dica.innerHTML = '<span></span><button type="button" aria-label="Fechar">×</button>'; document.body.appendChild(dica);
    dica.querySelector('button').addEventListener('click', function () { dica.classList.remove('on'); setaEm(''); mostraBarra(); });
    var pedido = null, modoAtual = '', roda = null, posAtual = '', dicaTxt = '';

    function setaEm(onde) {
      seta.className = 'tgs-seta'; seta.style.cssText = '';
      if (onde === 'cimaDir') { seta.style.cssText = 'top:6px;right:10px'; seta.classList.add('on', 'cima'); }
      else if (onde === 'baixoMeio') { seta.style.cssText = 'bottom:calc(8px + env(safe-area-inset-bottom));left:50%;margin-left:-24px;rotate:180deg'; seta.classList.add('on'); }
      else if (onde === 'baixoDir') { seta.style.cssText = 'bottom:calc(10px + env(safe-area-inset-bottom));right:12px;rotate:180deg'; seta.classList.add('on'); }
    }
    function passos(l) { return '<ol class="tgs-passos">' + l.map(function (t) { return '<li><span>' + t + '</span></li>'; }).join('') + '</ol>'; }

    // celular desenhado: cada cena mostra um toque
    function demo() {
      var pg = '<div class="tgi-pg"><i></i><i></i><i></i><i></i></div>';
      var cenas = [], leg = [];
      if (novo && !ipad) {
        cenas.push(pg + '<div class="tgi-barra">' + IC.volta + '<b></b>' + IC.ptsH + '</div><i class="tgi-dedo" style="right:10px;bottom:14px"></i>');
        leg.push('1. Toque nos três pontinhos, embaixo à direita');
        cenas.push(pg + '<div class="tgi-menu"><span>Favoritos</span><span class="al">Compartilhar ' + IC.comp + '</span><span>Nova aba</span></div><div class="tgi-barra">' + IC.volta + '<b></b>' + IC.ptsH + '</div><i class="tgi-dedo" style="right:24px;bottom:84px"></i>');
        leg.push('2. Toque em Compartilhar');
      } else {
        cenas.push(pg + '<div class="tgi-barra">' + IC.volta + '<b style="flex:.4"></b>' + IC.comp + '<b style="flex:.4"></b>' + IC.ptsH + '</div><i class="tgi-dedo" style="left:64px;bottom:14px"></i>');
        leg.push(ipad ? '1. Toque em Compartilhar, lá em cima à direita' : '1. Toque em Compartilhar, no meio da barra de baixo');
      }
      cenas.push('<div class="tgi-folha"><span>Copiar</span><span>Adicionar aos Favoritos</span><span class="al">Adicionar à Tela de Início ' + IC.mais + '</span><span>Imprimir</span></div><i class="tgi-dedo" style="left:60px;bottom:78px"></i>');
      leg.push((novo && !ipad ? '3' : '2') + '. Role e toque em “Adicionar à Tela de Início”');
      cenas.push('<div class="tgi-home"><i></i><i></i><i></i><i></i><i></i><i></i><img src="' + icone + '" alt=""><i></i></div>');
      leg.push('Pronto! ' + nome + ' fica aqui, junto dos seus apps');
      return { html: '<div class="tgi" aria-hidden="true"><div class="tgi-tel">' + cenas.map(function (c, i) { return '<div class="tgi-c' + (i ? '' : ' on') + '">' + c + '</div>'; }).join('') + '</div><p class="tgi-leg">' + leg[0] + '</p></div>', leg: leg };
    }
    function rodaDemo(leg) {
      clearInterval(roda);
      var cs = folha.querySelectorAll('.tgi-c'), lg = folha.querySelector('.tgi-leg'), lis = folha.querySelectorAll('.tgs-passos li'), i = 0;
      if (!cs.length) return;
      var pinta = function () {
        [].forEach.call(cs, function (c, j) { c.classList.toggle('on', j === i); });
        lg.textContent = leg[i];
        [].forEach.call(lis, function (l, j) { l.classList.toggle('ag', j === Math.min(i, lis.length - 1) && i < cs.length - 1); });
      };
      pinta();
      roda = setInterval(function () { i = (i + 1) % cs.length; pinta(); }, 2300);
    }

    function conteudo(modo) {
      modoAtual = modo; clearInterval(roda);
      var t = 'Deixe ' + oQue + ' na tela do seu celular', sub = 'Assim ' + (oQue === 'o app' ? 'ele' : 'ele') + ' abre com um toque, em tela cheia, sem precisar procurar o link.', h = '', ja = true, pos = '', ic = true, dm = null;
      dicaTxt = '';
      if (modo === 'android') {
        h = '<button class="tgs-btn tgs-pulso" type="button" data-a="instalar">Instalar agora</button><p class="tgs-aviso">Leva 2 segundos. O ícone aparece junto dos seus outros apps.</p>';
        ja = false;
      } else if (modo === 'androidManual') {
        h = passos(['Toque nos três pontinhos ' + IC.pts + ' no canto de cima da tela', 'Toque em <b>“Instalar app”</b> ou <b>“Adicionar à tela inicial”</b>', 'Confirme em <b>“Instalar”</b>. Pronto!']);
        pos = 'cimaDir';
      } else if (modo === 'samsung') {
        h = passos(['Toque no menu ' + IC.menu + ' no canto de baixo', 'Toque em <b>“Adicionar página a”</b>', 'Escolha <b>“Tela inicial”</b>. Pronto!']);
        pos = 'baixoDir';
      } else if (modo === 'iphone') {
        t = 'Só 3 toques e pronto'; ic = false;
        sub = 'O iPhone não deixa nenhum site instalar sozinho. Veja onde tocar:';
        dm = demo();
        if (ipad) { h = passos(['Toque em Compartilhar ' + IC.comp + ' lá em cima, no canto direito', 'Toque em <b>“Adicionar à Tela de Início”</b> ' + IC.mais, 'Toque em <b>“Adicionar”</b>. Pronto!']); pos = 'cimaDir'; }
        else if (novo) {
          h = passos(['Toque nos três pontinhos ' + IC.ptsH + ' embaixo, à direita <small>Se o Compartilhar ' + IC.comp + ' já aparece na barra, toque direto nele.</small>', 'Toque em <b>Compartilhar</b> e role até <b>“Adicionar à Tela de Início”</b> ' + IC.mais + ' <small>Não achou? Toque em “Ver mais”.</small>', 'Deixe <b>“Abrir como App Web”</b> ligado e toque em <b>“Adicionar”</b>.']);
          pos = 'baixoDir'; dicaTxt = 'Toque nos três pontinhos aqui 👇, depois em <b>Compartilhar</b> e em <b>“Adicionar à Tela de Início”</b>';
        } else {
          h = passos(['Toque em Compartilhar ' + IC.comp + ' no meio da barra de baixo', 'Role e toque em <b>“Adicionar à Tela de Início”</b> ' + IC.mais, 'Toque em <b>“Adicionar”</b>, no canto de cima. Pronto!']);
          pos = 'baixoMeio';
        }
        h = dm.html + '<button class="tgs-btn tgs-pulso" type="button" data-a="mostrar">Mostrar no meu celular</button>' + h +
          '<p class="tgs-aviso">Não aparece a barra de baixo? Toque uma vez bem no rodapé da tela.</p>';
      } else if (modo === 'iphoneOutro') {
        h = passos(['Toque em Compartilhar ' + IC.comp + ', no canto de cima, ao lado do endereço', 'Toque em <b>“Adicionar à Tela de Início”</b> ' + IC.mais, 'Toque em <b>“Adicionar”</b>. Pronto!']) +
          '<a class="tgs-btn" href="' + linkFora + '" data-a="fora">Abrir no Safari (mais fácil)</a>';
      } else if (modo === 'dentro') {
        t = 'Abra no ' + (ios ? 'Safari' : 'Chrome') + ' pra instalar';
        sub = 'Aqui dentro deste app o celular não deixa instalar. Toque no botão:';
        h = (linkFora ? '<a class="tgs-btn tgs-pulso" href="' + linkFora + '" data-a="fora">Abrir no ' + (ios ? 'Safari' : 'Chrome') + '</a>' : '') +
          '<p class="tgs-aviso">Não abriu? Toque nos três pontinhos ' + (ios ? IC.ptsH : IC.pts) + ' lá em cima e escolha <b>“Abrir no navegador”</b>.</p>' +
          '<button class="tgs-btn gh" type="button" data-a="copiar">Copiar o link</button>';
        pos = 'cimaDir';
      } else if (modo === 'pronto') {
        t = 'Pronto!'; sub = nome + ' já está na tela do seu celular. Da próxima vez, é só tocar no ícone.'; ja = false;
      }
      var ajuda = op.ajuda ? '<a href="' + op.ajuda + '" target="_blank" rel="noopener">Não consegui, me ajuda</a>' : '';
      corpo.innerHTML = (ic ? '<img class="tgs-ic" src="' + icone + '" alt="">' : '') + '<h2 id="tgs-fT">' + t + '</h2><p class="tgs-sub">' + sub + '</p>' + h +
        (modo === 'pronto' ? '' : '<div class="tgs-linha"><button type="button" data-a="depois">Agora não</button>' + (ja ? '<button type="button" data-a="ja">Já instalei</button>' : '') + (modo !== 'android' ? ajuda : '') + '</div>');
      posAtual = pos;
      if (folha.classList.contains('vis')) setaEm(pos);
      if (dm) rodaDemo(dm.leg);
    }
    function abre(modo) {
      conteudo(modo); escondeBarra(); dica.classList.remove('on');
      folha.classList.add('on'); raiz.classList.add('tgs-folhaon');
      requestAnimationFrame(function () { requestAnimationFrame(function () { folha.classList.add('vis'); setaEm(posAtual); try { cx.focus({ preventScroll: true }); } catch (e) {} }); });
    }
    function fecha(dep) {
      clearInterval(roda);
      folha.classList.remove('vis'); setaEm('');
      setTimeout(function () { folha.classList.remove('on'); raiz.classList.remove('tgs-folhaon'); }, 380);
      if (dep) mostraBarra();
    }
    function instalarAndroid() {
      if (!pedido) { abre(samsung ? 'samsung' : 'androidManual'); return; }
      var p = pedido; pedido = null; p.prompt();
      p.userChoice.then(function (r) { if (r && r.outcome === 'accepted') { conteudo('pronto'); setaEm(''); setTimeout(function () { fecha(false); }, 2200); } else { abre(samsung ? 'samsung' : 'androidManual'); } });
    }
    function modoCerto() { return dentro ? 'dentro' : ios ? (outroIOS ? 'iphoneOutro' : 'iphone') : pedido ? 'android' : samsung ? 'samsung' : 'androidManual'; }

    folha.addEventListener('click', function (e) {
      if (e.target.classList.contains('tgs-fundo')) { por(ch.adia, String(Date.now())); return fecha(true); }
      var b = e.target.closest('[data-a]'); if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'fora') return;
      if (a === 'instalar') instalarAndroid();
      else if (a === 'mostrar') {
        fecha(false); setaEm(posAtual);
        var cima = posAtual.indexOf('cima') === 0;
        dica.classList.toggle('topo', cima);
        dica.querySelector('span').innerHTML = dicaTxt || ('Toque aqui ' + (cima ? '👆' : '👇') + ' e depois em <b>“Adicionar à Tela de Início”</b>');
        dica.classList.add('on');
      }
      else if (a === 'depois') { por(ch.adia, String(Date.now())); fecha(true); }
      else if (a === 'ja') { por(ch.ja, String(Date.now())); fecha(false); }
      else if (a === 'copiar') {
        var lk = location.href, ok = function () { b.textContent = 'Link copiado! Cole no navegador'; };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(lk).then(ok, function () { prompt('Copie o link:', lk); });
        else prompt('Copie o link:', lk);
      }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && folha.classList.contains('on')) { por(ch.adia, String(Date.now())); fecha(true); } });
    bBtn.addEventListener('click', function () { if (pedido && !ios && !dentro) instalarAndroid(); else abre(modoCerto()); });
    window.TG_INSTALAR = function () { if (pedido && !dentro) instalarAndroid(); else abre(modoCerto()); return true; };

    window.addEventListener('beforeinstallprompt', function (ev) {
      ev.preventDefault(); pedido = ev;
      if (folha.classList.contains('on') && (modoAtual === 'androidManual' || modoAtual === 'samsung')) conteudo('android');
      else if (!celular) mostraBarra();
    });
    window.addEventListener('appinstalled', function () { escondeBarra(); if (folha.classList.contains('on')) { conteudo('pronto'); setTimeout(function () { fecha(false); }, 2200); } });

    if (!celular) return;                        // no computador fica só a barrinha (quando o navegador deixa instalar)
    if (adiou || disseJa) { mostraBarra(); return; }
    setTimeout(function () { if (!instalado()) abre(modoCerto()); }, ios || dentro ? 1200 : 1800);
  };
})();
