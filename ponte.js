// Ponte da página do TEAM GO! com o Google (versão 19).
// A página monta o app ela mesma e conversa com o Google pela "porta de dados" (doPost do app), sem passar pela
// página do Google. O celular não manda conta Google nenhuma nessa conversa (credentials: 'omit'), então o
// bloqueio "não é possível abrir o arquivo" de quem tem várias contas conectadas não acontece.
// Aqui não tem código do app nem dado de aluno: o código das telas vem do Google na hora (ou da cópia guardada).
(function () {
  var APP = 'https://script.google.com/macros/s/AKfycbx0Nq7NgEz5-_1kDIpmm-yf4k_HPLKCGJ4eCAELk3SKQgDJ-_yGpruULFlOK1RsEPi9/exec';

  // Erro "sem porta": o Google não respondeu do jeito novo (versão antiga no ar, rede ou bloqueio). Aí a página usa o plano B.
  function SemPorta(m) { this.name = 'SemPorta'; this.message = m || 'sem porta'; }
  SemPorta.prototype = Object.create(Error.prototype);

  function porta(f, a) {
    return fetch(APP, {
      method: 'POST',
      body: JSON.stringify({ f: f, a: a || [] }),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // texto simples: sem pergunta prévia do navegador
      credentials: 'omit', redirect: 'follow', cache: 'no-store'
    }).then(function (r) { return r.text(); }, function () { throw new SemPorta('rede'); })
      .then(function (t) {
        var j; try { j = JSON.parse(t); } catch (e) { throw new SemPorta('resposta'); }
        if (!j || typeof j.ok !== 'boolean') throw new SemPorta('resposta');
        if (!j.ok) { var er = new Error(j.erro || 'Erro'); er.servidor = true; throw er; }
        return j.r;
      });
  }

  // Imita o google.script.run do Google: google.script.run.withSuccessHandler(ok).withFailureHandler(f).funcao(args)
  function runner(ok, falha, uo) {
    return new Proxy({}, {
      get: function (_, nome) {
        if (typeof nome !== 'string' || nome === 'then' || nome === 'toJSON') return undefined;
        if (nome === 'withSuccessHandler') return function (fn) { return runner(fn, falha, uo); };
        if (nome === 'withFailureHandler') return function (fn) { return runner(ok, fn, uo); };
        if (nome === 'withUserObject') return function (o) { return runner(ok, falha, o); };
        return function () {
          var a = Array.prototype.slice.call(arguments);
          porta(nome, a).then(function (r) { if (ok) ok(r, uo); }, function (e) { if (falha) falha(e, uo); else if (window.console) console.warn(e); });
        };
      }
    });
  }

  // Botão voltar do celular: o app usa google.script.history pra fechar janelas com o voltar.
  var mudou = null;
  function local() {
    var u = new URL(location.href), p = {}, pp = {};
    u.searchParams.forEach(function (v, k) { if (!(k in p)) p[k] = v; (pp[k] = pp[k] || []).push(v); });
    return { hash: (location.hash || '').slice(1), parameter: p, parameters: pp };
  }
  window.addEventListener('popstate', function (ev) {
    if (!mudou) return;
    try { mudou({ state: ev.state && ev.state.tgs ? ev.state.st : null, location: local() }); } catch (e) {}
  });

  function instalarGoogle() {
    window.google = window.google || {};
    window.google.script = {
      run: runner(null, null, null),
      history: {
        push: function (st) { try { history.pushState({ tgs: 1, st: st || null }, '', location.href); } catch (e) {} },
        replace: function (st) { try { history.replaceState({ tgs: 1, st: st || null }, '', location.href); } catch (e) {} },
        setChangeHandler: function (fn) { mudou = fn; }
      },
      url: { getLocation: function (cb) { if (cb) cb(local()); } },
      host: { close: function () {}, setHeight: function () {}, setWidth: function () {}, editor: { focus: function () {} } }
    };
  }

  // Põe na página o HTML que o Google montou (fontes, visual, tela e código), antes de `antes`.
  function montar(html, antes) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    Array.prototype.forEach.call(doc.head.querySelectorAll('link[rel=stylesheet], style'), function (n) {
      document.head.appendChild(document.importNode(n, true));
    });
    var codigos = [];
    Array.prototype.slice.call(doc.body.childNodes).forEach(function (n) {
      if (n.nodeName === 'SCRIPT') codigos.push(n.textContent);
      else document.body.insertBefore(document.importNode(n, true), antes || null);
    });
    codigos.forEach(function (t) { var s = document.createElement('script'); s.text = t; document.body.appendChild(s); });
  }

  var guarda = {
    ler: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    por: function (k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    tira: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  window.TGPonte = { APP: APP, porta: porta, SemPorta: SemPorta, instalarGoogle: instalarGoogle, montar: montar, guarda: guarda };
})();
