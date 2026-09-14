/* Traquejo e Talento · Versão Completa
   Páginas por separadores, obras, opiniões e pedido de orçamento.
   Para mudar serviços, obras ou opiniões, basta editar as listas de dados abaixo. */
(function () {
  'use strict';

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function marcar(el, invalido) {
    var c = el.closest('.campo');
    if (c) c.classList.toggle('erro', !!invalido);
    el.setAttribute('aria-invalid', invalido ? 'true' : 'false');
  }
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ao abrir do disco (file://), as pastas não abrem o index.html sozinhas */
  if (location.protocol === 'file:') {
    $$('a[href]').forEach(function (a) {
      var h = a.getAttribute('href'), m = h.match(/^([^#?:]*\/)([#?].*)?$/);
      if (m) a.setAttribute('href', m[1] + 'index.html' + (m[2] || ''));
    });
  }

  /* dados */

  var TIPOS = {
    moradia: 'Moradia nova',
    habitacao: 'Edifício de habitação',
    naores: 'Edifício para empresa',
    reabilitacao: 'Reabilitação',
    ampliacao: 'Ampliação ou alteração',
    interiores: 'Remodelação interior'
  };

  var SERVICOS = [
    { id: 'moradia', filtro: 'moradias', img: 'moradia-jardim.jpg', w: 1600, h: 1067, alt: 'Moradia com piscina e alpendre',
      t: 'Moradias', resumo: 'Construção de moradias de raiz, das fundações aos acabamentos.',
      d: 'Construímos moradias de raiz a partir do projeto aprovado. Tratamos da obra toda, das fundações aos acabamentos.',
      inc: ['Fundações e estrutura', 'Paredes, isolamentos e cobertura', 'Canalização, esgotos e eletricidade', 'Revestimentos, carpintarias e pintura'] },
    { id: 'habitacao', filtro: 'habitacao', img: 'habitacao-obra.jpg', w: 1400, h: 787, alt: 'Edifício de habitação em construção, com andaimes',
      t: 'Edifícios de habitação', resumo: 'Prédios e conjuntos de moradias.',
      d: 'Construção de prédios e de conjuntos de moradias, para particulares, promotores e investidores.',
      inc: ['Planeamento da obra por fases', 'Estrutura, paredes e fachadas', 'Partes comuns', 'Arranjos exteriores'] },
    { id: 'naores', filtro: 'empresas', img: 'pavilhao.jpg', w: 933, h: 1400, alt: 'Armazém com zona de escritórios',
      t: 'Edifícios para empresas', resumo: 'Armazéns, pavilhões, lojas e escritórios.',
      d: 'Armazéns, pavilhões, lojas e escritórios para empresas da região.',
      inc: ['Armazéns e pavilhões', 'Lojas e espaços comerciais', 'Escritórios', 'Obra por fases, quando a empresa não pode parar'] },
    { id: 'reabilitacao', filtro: 'reabilitacao', img: 'casa-antiga.jpg', w: 1400, h: 933, alt: 'Casa antiga de pedra antes da recuperação',
      t: 'Reabilitação', resumo: 'Recuperação de casas antigas e fachadas.',
      d: 'Recuperação de casas antigas, edifícios de pedra e fachadas.',
      inc: ['Reforço de paredes e estruturas', 'Coberturas novas', 'Recuperação de fachadas', 'Adaptação a habitação'] },
    { id: 'ampliacao', filtro: '', img: 'estrutura-betao.jpg', w: 933, h: 1400, alt: 'Estrutura de betão armado em construção',
      t: 'Ampliações e alterações', resumo: 'Mais um piso, um anexo ou uma garagem.',
      d: 'Ampliação de casas e edifícios existentes: mais um piso, um anexo, uma garagem ou uma divisão nova.',
      inc: ['Novos pisos e anexos', 'Garagens e alpendres', 'Alteração de paredes e vãos', 'Ligação à construção existente'] },
    { id: 'interiores', filtro: 'reabilitacao', img: 'remodelacao-cozinha.jpg', w: 1400, h: 933, alt: 'Cozinha em remodelação',
      t: 'Remodelações interiores', resumo: 'Cozinhas, casas de banho e casas inteiras.',
      d: 'Remodelação de cozinhas, casas de banho e casas inteiras.',
      inc: ['Cozinhas e casas de banho', 'Pavimentos e revestimentos', 'Tetos falsos e divisórias', 'Pintura'] }
  ];

  /* Obras de exemplo, com fotografias ilustrativas. */
  var OBRAS = [
    { img: 'moradia-nova.jpg', w: 1800, h: 1200, cat: 'moradias', tipo: 'moradia', t: 'Moradia de dois pisos', l: 'Óbidos', estado: 'Concluída',
      d: 'Moradia construída de raiz, com estrutura em betão armado e cobertura plana.' },
    { img: 'moradia-jardim.jpg', w: 1600, h: 1067, cat: 'moradias', tipo: 'moradia', t: 'Moradia com piscina', l: 'Foz do Arelho', estado: 'Concluída',
      d: 'Moradia térrea com alpendre e piscina.' },
    { img: 'moradia-betao.jpg', w: 1049, h: 1400, cat: 'moradias', tipo: 'moradia', t: 'Moradia em betão', l: 'Gaeiras', estado: 'Concluída',
      d: 'Moradia com paredes em betão à vista e jardim.' },
    { img: 'obra-tijolo.jpg', w: 1800, h: 1200, cat: 'habitacao', tipo: 'habitacao', t: 'Moradias em banda', l: 'Óbidos', estado: 'Em curso',
      d: 'Conjunto de moradias em banda, na fase de estrutura e paredes.' },
    { img: 'habitacao-obra.jpg', w: 1400, h: 787, cat: 'habitacao', tipo: 'habitacao', t: 'Edifício de habitação', l: 'Caldas da Rainha', estado: 'Em curso',
      d: 'Prédio de habitação com vários pisos, em construção.' },
    { img: 'estrutura-betao.jpg', w: 933, h: 1400, cat: 'habitacao', tipo: 'habitacao', t: 'Estrutura de edifício', l: 'Peniche', estado: 'Em curso',
      d: 'Estrutura em betão armado de um edifício de habitação.' },
    { img: 'pavilhao.jpg', w: 933, h: 1400, cat: 'empresas', tipo: 'naores', t: 'Armazém e escritórios', l: 'Bombarral', estado: 'Concluída',
      d: 'Armazém com zona de escritórios para uma empresa da região.' },
    { img: 'casa-antiga.jpg', w: 1400, h: 933, cat: 'reabilitacao', tipo: 'reabilitacao', t: 'Recuperação de casa de pedra', l: 'Cadaval', estado: 'Em curso',
      d: 'Casa antiga de pedra, a recuperar para habitação.' },
    { img: 'andaimes-fachada.jpg', w: 1400, h: 932, cat: 'reabilitacao', tipo: 'reabilitacao', t: 'Reabilitação de fachada', l: 'Caldas da Rainha', estado: 'Concluída',
      d: 'Reparação e pintura da fachada de um prédio.' },
    { img: 'remodelacao-cozinha.jpg', w: 1400, h: 933, cat: 'reabilitacao', tipo: 'interiores', t: 'Remodelação de cozinha', l: 'Óbidos', estado: 'Em curso',
      d: 'Remodelação completa de uma cozinha, com canalização e eletricidade novas.' }
  ];
  var DESTAQUE = [0, 4, 8, 2, 9, 5];   /* obras do carrossel da página inicial */

  /* Opiniões de exemplo, só para mostrar como fica a página. */
  var OPINIOES = [
    { nota: 5, autor: 'M. C.', tipo: 'Moradia', local: 'Óbidos', data: '2026-07',
      texto: 'Construíram a nossa moradia. Cumpriram o prazo e o orçamento, e sempre que tivemos dúvidas houve alguém para responder.' },
    { nota: 5, autor: 'J. F.', tipo: 'Reabilitação', local: 'Cadaval', data: '2026-06',
      texto: 'Recuperaram uma casa de pedra da família. Bom trabalho e muito cuidado com o que era para manter.',
      resposta: 'Obrigado pela confiança. Foi uma obra de que gostámos muito.' },
    { nota: 4, autor: 'A. R.', tipo: 'Remodelação', local: 'Caldas da Rainha', data: '2026-05',
      texto: 'A cozinha ficou muito bem. Houve um atraso de uma semana num material, mas avisaram a tempo.' },
    { nota: 5, autor: 'P. L.', tipo: 'Armazém', local: 'Bombarral', data: '2026-03',
      texto: 'Fizeram o nosso armazém dentro do prazo combinado. Recomendo.' },
    { nota: 5, autor: 'S. M.', tipo: 'Ampliação', local: 'Peniche', data: '2025-11',
      texto: 'Profissionais e organizados. No fim de cada dia a obra ficava arrumada.' },
    { nota: 4, autor: 'R. S.', tipo: 'Moradia', local: 'Gaeiras', data: '2025-09',
      texto: 'Bom acabamento e preço justo. Voltaria a trabalhar com eles.' }
  ];
  var MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  /* menu */

  var nav = $('#nav'), menuBtn = $('#menu-btn');
  function fecharMenu() { nav.classList.remove('aberto'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () {
    var abrir = !nav.classList.contains('aberto');
    nav.classList.toggle('aberto', abrir);
    menuBtn.setAttribute('aria-expanded', String(abrir));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('aberto')) { fecharMenu(); menuBtn.focus(); }
  });

  /* serviços */

  $('#inicio-servicos').innerHTML = [0, 2, 3].map(function (k) {
    var s = SERVICOS[k];
    return '<a class="cartao-s" href="#servicos/' + s.id + '">' +
      '<img src="../img/' + s.img + '" alt="' + esc(s.alt) + '" width="' + s.w + '" height="' + s.h + '" loading="lazy">' +
      '<h3>' + esc(s.t) + '</h3><p>' + esc(s.resumo) + '</p></a>';
  }).join('');

  $('#servicos-lista').innerHTML = SERVICOS.map(function (s) {
    return '<article class="sv" id="sv-' + s.id + '">' +
      '<img src="../img/' + s.img + '" alt="' + esc(s.alt) + '" width="' + s.w + '" height="' + s.h + '" loading="lazy">' +
      '<div><h2>' + esc(s.t) + '</h2><p>' + esc(s.d) + '</p>' +
      '<ul>' + s.inc.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<div class="sv-acoes"><a class="btn btn-principal" href="#orcamento/' + s.id + '">Pedir orçamento</a>' +
      '<a class="btn btn-contorno" href="#obras' + (s.filtro ? '/' + s.filtro : '') + '">Ver obras</a></div></div></article>';
  }).join('');

  /* obras */

  function cartaoObra(i) {
    var o = OBRAS[i];
    return '<li><button type="button" class="obra" data-obra="' + i + '" aria-haspopup="dialog">' +
      '<img src="../img/' + o.img + '" alt="" width="' + o.w + '" height="' + o.h + '" loading="lazy">' +
      '<span class="obra-tit">' + esc(o.t) + '</span>' +
      '<span class="obra-sub">' + esc(o.l) + ' · ' + esc(o.estado.toLowerCase()) + '</span></button></li>';
  }

  var filtroObras = 'todas', visiveis = [];
  function pintarObras() {
    visiveis = OBRAS.map(function (o, i) { return i; }).filter(function (i) {
      return filtroObras === 'todas' || OBRAS[i].cat === filtroObras;
    });
    $('#obras-grelha').innerHTML = visiveis.map(cartaoObra).join('');
    $$('#obras-filtros button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-filtro') === filtroObras ? 'true' : 'false');
    });
  }
  $('#obras-filtros').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    filtroObras = b.getAttribute('data-filtro');
    pintarObras();
  });
  $('#obras-destaque').innerHTML = DESTAQUE.map(cartaoObra).join('');
  pintarObras();

  /* carrossel das obras recentes */
  var carrossel = (function () {
    var raiz = $('#carrossel-obras'), pista = $('#obras-destaque'), pontos = $('.carrossel-pontos', raiz);
    var calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var relogio = null, parado = false, espera = null;

    function espaco() { return parseFloat(getComputedStyle(pista).columnGap) || 0; }
    function passo() { var li = pista.firstElementChild; return li ? li.getBoundingClientRect().width + espaco() : 0; }
    function visiveis() { var p = passo(); return p ? Math.max(1, Math.floor((pista.clientWidth + espaco()) / p + 0.05)) : 1; }
    function posicoes() { return Math.max(1, pista.children.length - visiveis() + 1); }
    function atual() { var p = passo(); return p ? Math.min(posicoes() - 1, Math.round(pista.scrollLeft / p)) : 0; }
    function ir(i) {
      var n = posicoes();
      pista.scrollTo({ left: ((i % n) + n) % n * passo(), behavior: calmo ? 'auto' : 'smooth' });
    }

    function pintarPontos() {
      var n = posicoes();
      if (pontos.children.length !== n) {
        pontos.innerHTML = '';
        for (var k = 0; k < n; k++) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'carrossel-ponto';
          b.setAttribute('aria-label', 'Ir para a obra ' + (k + 1) + ' de ' + n);
          b.setAttribute('data-pos', k);
          pontos.appendChild(b);
        }
      }
      var a = atual();
      $$('button', pontos).forEach(function (b, k) { b.setAttribute('aria-current', k === a ? 'true' : 'false'); });
      pontos.parentNode.hidden = n < 2;
    }

    function pausar() { clearInterval(relogio); relogio = null; }
    function arrancar() {
      if (calmo || parado || relogio) return;
      relogio = setInterval(function () {
        if (!document.hidden && vistaAtiva === 'inicio') ir(atual() + 1);
      }, 6000);
    }
    function parar() { parado = true; pausar(); }

    $$('.carrossel-btn', raiz).forEach(function (b) {
      b.addEventListener('click', function () { parar(); ir(atual() + (+b.getAttribute('data-dir'))); });
    });
    pontos.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pos]');
      if (b) { parar(); ir(+b.getAttribute('data-pos')); }
    });
    pista.addEventListener('scroll', function () { clearTimeout(espera); espera = setTimeout(pintarPontos, 80); }, { passive: true });
    pista.addEventListener('touchstart', parar, { passive: true });
    pista.addEventListener('wheel', function (e) { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) parar(); }, { passive: true });
    raiz.addEventListener('mouseenter', pausar);
    raiz.addEventListener('mouseleave', arrancar);
    raiz.addEventListener('focusin', pausar);
    raiz.addEventListener('focusout', function (e) { if (!raiz.contains(e.relatedTarget)) arrancar(); });
    window.addEventListener('resize', pintarPontos);

    pintarPontos();
    arrancar();
    return { atualizar: function () { pista.scrollLeft = 0; pintarPontos(); } };
  })();

  /* ficha de cada obra */
  var caixa = $('#caixa'), lista = [], pos = 0, focoAntes = null;
  function pintarCaixa() {
    var o = OBRAS[lista[pos]], img = $('#caixa-img');
    img.src = '../img/' + o.img;
    img.alt = o.t + ', ' + o.l;
    $('#caixa-tit').textContent = o.t;
    $('#caixa-sub').textContent = o.l + ' · ' + TIPOS[o.tipo] + ' · ' + o.estado;
    $('#caixa-desc').textContent = o.d;
    $('#caixa-orc').setAttribute('href', '#orcamento/' + o.tipo);
    var varias = lista.length > 1;
    $('.caixa-nav', caixa).hidden = !varias;
    $('#caixa-pos').textContent = (pos + 1) + ' de ' + lista.length;
  }
  function abrirObra(i, deOnde) {
    lista = deOnde.indexOf(i) >= 0 ? deOnde.slice() : [i];
    pos = lista.indexOf(i);
    pintarCaixa();
    focoAntes = document.activeElement;
    if (typeof caixa.showModal === 'function') caixa.showModal(); else caixa.setAttribute('open', '');
  }
  function fecharCaixa() { if (typeof caixa.close === 'function') { if (caixa.open) caixa.close(); } else caixa.removeAttribute('open'); }
  function passar(d) { pos = (pos + d + lista.length) % lista.length; pintarCaixa(); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-obra]');
    if (b) abrirObra(+b.getAttribute('data-obra'), b.closest('#obras-destaque') ? DESTAQUE : visiveis);
  });
  caixa.addEventListener('click', function (e) { if (e.target === caixa || e.target.closest('[data-fechar]')) fecharCaixa(); });
  caixa.addEventListener('close', function () { if (focoAntes && document.body.contains(focoAntes)) focoAntes.focus({ preventScroll: true }); });
  caixa.addEventListener('keydown', function (e) {
    if (lista.length < 2) return;
    if (e.key === 'ArrowLeft') passar(-1);
    if (e.key === 'ArrowRight') passar(1);
  });
  $('#caixa-ant').addEventListener('click', function () { passar(-1); });
  $('#caixa-seg').addEventListener('click', function () { passar(1); });
  $('#caixa-orc').addEventListener('click', function () { focoAntes = null; fecharCaixa(); });

  /* opiniões */

  var CHAVE = 'tt-opinioes-demo';
  var pendentes = (function () {
    try { var v = JSON.parse(localStorage.getItem(CHAVE) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  })();
  function guardar() { try { localStorage.setItem(CHAVE, JSON.stringify(pendentes.slice(0, 20))); } catch (e) { /* sem armazenamento */ } }

  function dataTxt(d) { var p = String(d).split('-'); return MESES[(+p[1] || 1) - 1] + ' de ' + p[0]; }
  function estrelas(n) {
    var s = '';
    for (var k = 1; k <= 5; k++) s += '<svg class="' + (k <= Math.round(n) ? 'on' : '') + '" viewBox="0 0 20 20" aria-hidden="true"><use href="#i-estrela"/></svg>';
    return '<span class="estrelas" role="img" aria-label="' + String(Math.round(n * 10) / 10).replace('.', ',') + ' em 5">' + s + '</span>';
  }
  function cartaoOpiniao(o, pendente) {
    return '<li class="op-c' + (pendente ? ' pendente' : '') + '">' + estrelas(o.nota) +
      (pendente ? '<span class="op-estado">A aguardar confirmação</span>' : '') +
      '<p>' + esc(o.texto) + '</p>' +
      '<p class="op-autor"><b>' + esc(o.autor) + '</b>, ' + esc(o.tipo.toLowerCase()) + (o.local ? ' em ' + esc(o.local) : '') + ', ' + dataTxt(o.data) + '</p>' +
      (o.resposta ? '<div class="op-resposta"><b>Resposta da Traquejo e Talento</b>' + esc(o.resposta) + '</div>' : '') +
      '</li>';
  }
  function pintarOpinioes() {
    var soma = OPINIOES.reduce(function (t, o) { return t + o.nota; }, 0), media = soma / OPINIOES.length;
    var mediaTxt = (Math.round(media * 10) / 10).toFixed(1).replace('.', ',');
    $$('[data-media]').forEach(function (el) {
      el.innerHTML = estrelas(media) + ' <b>' + mediaTxt + '</b> de 5, com base em ' + OPINIOES.length + ' opiniões de exemplo';
    });
    $('#op-lista').innerHTML = pendentes.map(function (o) { return cartaoOpiniao(o, true); }).join('') +
      OPINIOES.map(function (o) { return cartaoOpiniao(o, false); }).join('');
    $('#opinioes-destaque').innerHTML = OPINIOES.slice(0, 2).map(function (o) { return cartaoOpiniao(o, false); }).join('');
  }
  pintarOpinioes();

  /* classificação por estrelas no formulário */
  var estrelasInput = $('#estrelas-input');
  function notaAtual() { var r = $('input[name=nota]:checked', estrelasInput); return r ? +r.value : 0; }
  function pintarEstrelas(n) { $$('label', estrelasInput).forEach(function (l, k) { l.classList.toggle('cheia', k < n); }); }
  estrelasInput.addEventListener('change', function () { pintarEstrelas(notaAtual()); $('#op-nota-campo').classList.remove('erro'); });
  $$('label', estrelasInput).forEach(function (l, k) { l.addEventListener('mouseenter', function () { pintarEstrelas(k + 1); }); });
  estrelasInput.addEventListener('mouseleave', function () { pintarEstrelas(notaAtual()); });

  var opForm = $('#opinar');
  opForm.addEventListener('input', function (e) {
    var c = e.target.closest('.campo');
    if (c && c.classList.contains('erro') && e.target.name !== 'nota') marcar(e.target, false);
  });
  opForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = opForm.elements, erros = [], nota = notaAtual(), rgpd = $('#op-rgpd');
    $('#op-nota-campo').classList.toggle('erro', !nota); if (!nota) erros.push($('#n1'));
    var okNome = f.nome.value.trim().length >= 2; marcar(f.nome, !okNome); if (!okNome) erros.push(f.nome);
    marcar(f.tipo, !f.tipo.value); if (!f.tipo.value) erros.push(f.tipo);
    var okTexto = f.texto.value.trim().length >= 20; marcar(f.texto, !okTexto); if (!okTexto) erros.push(f.texto);
    $('#op-rgpd-l').classList.toggle('erro', !rgpd.checked); if (!rgpd.checked) erros.push(rgpd);
    if (erros.length) { erros[0].focus(); return; }

    var hoje = new Date();
    pendentes.unshift({
      nota: nota, autor: f.nome.value.trim(), tipo: f.tipo.value, local: f.localidade.value.trim(), texto: f.texto.value.trim(),
      data: hoje.getFullYear() + '-' + String(hoje.getMonth() + 1).padStart(2, '0')
    });
    guardar();
    opForm.reset();
    pintarEstrelas(0);
    pintarOpinioes();
    var ok = $('#op-ok');
    ok.hidden = false;
    ok.setAttribute('tabindex', '-1');
    ok.focus();
  });

  /* pedido de orçamento */

  var orc = (function () {
    var form = $('#orc-form'), el = form.elements, passos = $$('.passo', form), marcos = $$('#orc-passos li');
    var sucesso = $('#orc-sucesso'), anexos = $('#o-anexos'), listaAnexos = $('#o-anexos-lista'), atual = 0;

    function ir(n, focar) {
      atual = Math.max(0, Math.min(passos.length - 1, n));
      passos.forEach(function (p, k) { p.hidden = k !== atual; });
      marcos.forEach(function (li, k) {
        li.classList.toggle('feito', k < atual);
        li.classList.toggle('atual', k === atual);
        if (k === atual) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
      if (atual === 3) pintarResumo();
      if (focar) {
        $('.passo-tit', passos[atual]).focus({ preventScroll: true });
        var topo = $('#orc-passos').getBoundingClientRect().top + window.scrollY - 90;
        if (window.scrollY > topo) window.scrollTo(0, topo);
      }
    }

    function validar(n) {
      var erros = [];
      if (n === 0) {
        var t = $('input[name=tipo]:checked', form);
        $('#erro-tipo').hidden = !!t;
        if (!t) erros.push($('input[name=tipo]', form));
      } else if (n === 1) {
        marcar(el.concelho, !el.concelho.value);
        if (!el.concelho.value) erros.push(el.concelho);
      } else if (n === 2) {
        var okNome = el.nome.value.trim().length >= 2; marcar(el.nome, !okNome); if (!okNome) erros.push(el.nome);
        var okTel = el.telefone.value.replace(/\D/g, '').length >= 9; marcar(el.telefone, !okTel); if (!okTel) erros.push(el.telefone);
        var okEmail = EMAIL.test(el.email.value.trim()); marcar(el.email, !okEmail); if (!okEmail) erros.push(el.email);
        var rgpd = $('#o-rgpd'); $('#o-rgpd-l').classList.toggle('erro', !rgpd.checked); if (!rgpd.checked) erros.push(rgpd);
      }
      if (erros.length) { erros[0].focus(); return false; }
      return true;
    }

    function ficheiros() { return Array.prototype.slice.call(anexos.files || [], 0, 5); }
    anexos.addEventListener('change', function () {
      listaAnexos.innerHTML = ficheiros().map(function (f) { return '<li>' + esc(f.name) + '</li>'; }).join('');
    });

    function pintarResumo() {
      var tipo = $('input[name=tipo]:checked', form);
      var blocos = [
        ['A obra', 0, [['Tipo de obra', tipo ? TIPOS[tipo.value] : '']]],
        ['Pormenores', 1, [
          ['Concelho', el.concelho.value],
          ['Área aproximada', el.area.value || 'Não sei'],
          ['Projeto', el.projeto.value || 'Não indicado'],
          ['Início', el.inicio.value || 'Ainda não sei'],
          ['Descrição', el.descricao.value.trim() || 'Sem descrição'],
          ['Ficheiros', ficheiros().map(function (f) { return f.name; }).join(', ') || 'Nenhum']
        ]],
        ['Contactos', 2, [
          ['Nome', el.nome.value.trim()],
          ['Telefone', el.telefone.value.trim()],
          ['Email', el.email.value.trim()],
          ['Contacto preferido', el.preferencia.value],
          ['Visita ao local', $('#o-visita').checked ? 'Sim' : 'Não']
        ]]
      ];
      $('#orc-resumo').innerHTML = blocos.map(function (b) {
        return '<h3>' + b[0] + ' <button type="button" data-acao="ir" data-alvo="' + b[1] + '">Alterar</button></h3><dl>' +
          b[2].map(function (l) { return '<div><dt>' + esc(l[0]) + '</dt><dd>' + esc(l[1]) + '</dd></div>'; }).join('') + '</dl>';
      }).join('');
    }

    form.addEventListener('click', function (e) {
      var b = e.target.closest('[data-acao]');
      if (!b) return;
      var acao = b.getAttribute('data-acao');
      if (acao === 'seguinte') { if (validar(atual)) ir(atual + 1, true); }
      else if (acao === 'anterior') ir(atual - 1, true);
      else if (acao === 'ir') ir(+b.getAttribute('data-alvo'), true);
    });
    form.addEventListener('change', function (e) {
      if (e.target.name === 'tipo') $('#erro-tipo').hidden = true;
      if (e.target.id === 'o-rgpd') $('#o-rgpd-l').classList.remove('erro');
      var c = e.target.closest('.campo');
      if (c && c.classList.contains('erro') && e.target.value) marcar(e.target, false);
    });
    form.addEventListener('input', function (e) {
      var c = e.target.closest('.campo');
      if (c && c.classList.contains('erro')) marcar(e.target, false);
    });
    form.addEventListener('keydown', function (e) {
      var t = e.target;
      if (e.key === 'Enter' && t.tagName === 'INPUT' && !/^(checkbox|radio|file)$/.test(t.type) && atual < 3) {
        e.preventDefault();
        if (validar(atual)) ir(atual + 1, true);
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (atual !== 3) { if (validar(atual)) ir(atual + 1, true); return; }
      for (var k = 0; k < 3; k++) { if (!validar(k)) { ir(k, false); validar(k); return; } }
      var hoje = new Date();
      $('#orc-ref').textContent = 'TT' + String(hoje.getFullYear()).slice(2) + String(hoje.getMonth() + 1).padStart(2, '0') +
        String(hoje.getDate()).padStart(2, '0') + String(Math.floor(100 + Math.random() * 900));
      $('#suc-nome').textContent = el.nome.value.trim().split(/\s+/)[0];
      form.hidden = true;
      $('#orc-passos').hidden = true;
      sucesso.hidden = false;
      sucesso.focus({ preventScroll: true });
      window.scrollTo(0, Math.max(0, sucesso.getBoundingClientRect().top + window.scrollY - 100));
    });

    function reiniciar() {
      form.reset();
      listaAnexos.innerHTML = '';
      $$('.campo.erro', form).forEach(function (c) { c.classList.remove('erro'); });
      $('#o-rgpd-l').classList.remove('erro');
      $('#erro-tipo').hidden = true;
      form.hidden = false;
      $('#orc-passos').hidden = false;
      sucesso.hidden = true;
      ir(0, false);
    }
    $('#orc-novo').addEventListener('click', function () { reiniciar(); ir(0, true); });

    return {
      escolherTipo: function (tipo) {
        if (!sucesso.hidden) reiniciar();
        var r = $('input[name=tipo][value="' + tipo + '"]', form);
        if (!r) return;
        r.checked = true;
        $('#erro-tipo').hidden = true;
        ir(1, false);
      }
    };
  })();

  /* contactos */

  var ctForm = $('#form-contacto');
  ctForm.addEventListener('input', function (e) {
    var c = e.target.closest('.campo');
    if (c && c.classList.contains('erro')) marcar(e.target, false);
  });
  ctForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = ctForm.elements, erros = [], rgpd = $('#ct-rgpd');
    var okNome = f.nome.value.trim().length >= 2; marcar(f.nome, !okNome); if (!okNome) erros.push(f.nome);
    var v = f.contacto.value.trim(), okC = EMAIL.test(v) || v.replace(/\D/g, '').length >= 9;
    marcar(f.contacto, !okC); if (!okC) erros.push(f.contacto);
    var okMsg = f.mensagem.value.trim().length >= 5; marcar(f.mensagem, !okMsg); if (!okMsg) erros.push(f.mensagem);
    $('#ct-rgpd-l').classList.toggle('erro', !rgpd.checked); if (!rgpd.checked) erros.push(rgpd);
    if (erros.length) { erros[0].focus(); return; }
    ctForm.reset();
    var ok = $('#ct-ok');
    ok.hidden = false;
    ok.setAttribute('tabindex', '-1');
    ok.focus();
  });

  /* o mapa do Google só carrega a pedido */
  $('#mapa-btn').addEventListener('click', function () {
    var q = encodeURIComponent('Rua da Corujeira 14, 2510-708 Gaeiras, Óbidos');
    $('#mapa').innerHTML = '<iframe title="Mapa com a morada da Traquejo e Talento" src="https://www.google.com/maps?q=' + q +
      '&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
  });

  /* páginas por separadores */

  var VISTAS = ['inicio', 'empresa', 'servicos', 'obras', 'opinioes', 'orcamento', 'contactos', 'privacidade'];
  var TITULOS = {
    inicio: 'Traquejo e Talento · Construção de edifícios em Óbidos',
    empresa: 'A empresa · Traquejo e Talento',
    servicos: 'Serviços · Traquejo e Talento',
    obras: 'Obras · Traquejo e Talento',
    opinioes: 'Opiniões de clientes · Traquejo e Talento',
    orcamento: 'Pedir orçamento · Traquejo e Talento',
    contactos: 'Contactos · Traquejo e Talento',
    privacidade: 'Política de privacidade · Traquejo e Talento'
  };
  var vistaAtiva = null;

  function lerHash() {
    var partes = decodeURIComponent(location.hash.replace(/^#\/?/, '')).split('/');
    return { vista: VISTAS.indexOf(partes[0]) >= 0 ? partes[0] : null, extra: partes[1] || '' };
  }

  function mostrar(vista, extra, inicial) {
    var mudou = vista !== vistaAtiva;
    if (mudou) {
      VISTAS.forEach(function (v) { var s = document.getElementById('v-' + v); if (s) s.hidden = v !== vista; });
      $$('[data-nav]').forEach(function (a) {
        var on = a.getAttribute('data-nav') === vista;
        a.classList.toggle('ativo', on);
        if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      });
      document.title = TITULOS[vista];
      vistaAtiva = vista;
      if (vista === 'inicio') carrossel.atualizar();
    }
    fecharMenu();
    fecharCaixa();

    var alvo = null;
    if (vista === 'orcamento' && TIPOS[extra]) orc.escolherTipo(extra);
    if (vista === 'obras' && extra) {
      var existe = $('#obras-filtros [data-filtro="' + extra + '"]');
      if (existe) { filtroObras = extra; pintarObras(); }
    }
    if (vista === 'servicos' && extra) alvo = document.getElementById('sv-' + extra);

    if (alvo) {
      setTimeout(function () { window.scrollTo(0, Math.max(0, alvo.getBoundingClientRect().top + window.scrollY - 90)); }, 30);
    } else if (mudou || !inicial) {
      window.scrollTo(0, 0);
    }
    if (mudou && !inicial && !alvo) {
      var h1 = $('#v-' + vista + ' h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    }
  }

  window.addEventListener('hashchange', function () {
    var r = lerHash();
    if (r.vista) mostrar(r.vista, r.extra, false);
  });

  /* clicar na página onde já está volta ao topo */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var h = a.getAttribute('href');
    if (h === location.hash || (h === '#inicio' && location.hash === '')) {
      e.preventDefault();
      var r = lerHash();
      mostrar(r.vista || 'inicio', r.extra, false);
    }
  });

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  var arranque = lerHash();
  mostrar(arranque.vista || 'inicio', arranque.extra, true);
})();
