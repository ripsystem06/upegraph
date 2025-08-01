// Loading screen functionality
window.addEventListener('load', function() {
  setTimeout(function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
      setTimeout(function() {
        loadingScreen.style.display = 'none';
        setTimeout(() => {
          renderRenovations();
          initScrollAnimations();
        }, 300);
      }, 800);
    } else {
      renderRenovations();
      initScrollAnimations();
    }
  }, 500);
});

/* ============================================================
   Proximidad de Renovación — datos + render dinámico
   ============================================================ */
// Datos dinámicos de departamentos y mes de renovación
const renovationsData = [
  { dept: 'Administración',   month: 'Sep' },
  { dept: 'Recepción',        month: 'Sep' },
  { dept: 'Med. Veterinaria', month: 'Oct' },
  { dept: 'Mantenimiento',    month: 'Nov' },
  { dept: 'Estética',         month: 'Nov' }
];

// Convierte mes a estado para el estilo del pill
function monthToStatus(m) {
  switch ((m || '').toLowerCase()) {
    case 'sep': return 'urgent';
    case 'oct': return 'warning';
    case 'nov': return 'safe';
    default:    return 'safe';
  }
}

// Inserta los elementos en el contenedor
function renderRenovations() {
  const list = document.getElementById('renovationList');
  if (!list) return;
  list.innerHTML = '';

  renovationsData.forEach((item) => {
    const wrap = document.createElement('div');
    wrap.className = 'renovation-item';

    const label = document.createElement('div');
    label.className = 'department-label';
    label.textContent = item.dept;

    const sw = document.createElement('div');
    sw.className = 'semicircle-wrapper';

    const badge = document.createElement('div');
    badge.className = `renovation-month ${monthToStatus(item.month)}`;
    badge.textContent = item.month;

    sw.appendChild(badge);
    wrap.appendChild(label);
    wrap.appendChild(sw);
    list.appendChild(wrap);
  });
}

// Aplica animación con stagger a los elementos renderizados

// Mobile menu functionality
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

if (hamburger) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    mobileMenu?.classList.toggle('active');
    mobileOverlay?.classList.toggle('active');
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', function() {
    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', function() {
    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
  });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.getElementById('mainHeader');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    if (header) header.style.transform = 'translateY(-100%)';
  } else {
    if (header) header.style.transform = 'translateY(0)';
  }
  lastScrollTop = scrollTop;
});

// Datos mensuales para la gráfica de línea
const monthlyLineData = [
  { month: 'Ene', amount: 42000, x: 133, y: 278, status: 'past' },
  { month: 'Feb', amount: 45000, x: 186, y: 270, status: 'past' },
  { month: 'Mar', amount: 57000, x: 239, y: 230, status: 'past' },
  { month: 'Abr', amount: 50000, x: 292, y: 250, status: 'past' },
  { month: 'May', amount: 48000, x: 345, y: 256, status: 'past' },
  { month: 'Jun', amount: 55000, x: 398, y: 235, status: 'past' },
  { month: 'Jul', amount: 43000, x: 451, y: 274, status: 'past' },
  { month: 'Ago', amount: 58000, x: 504, y: 226, status: 'current' },
  { month: 'Sep', amount: 0, x: 557, y: 320, status: 'future' },
  { month: 'Oct', amount: 0, x: 610, y: 320, status: 'future' },
  { month: 'Nov', amount: 0, x: 663, y: 320, status: 'future' },
  { month: 'Dic', amount: 0, x: 716, y: 320, status: 'future' }
];

/* ============================================================
   Barras con % fijo en el riel gris (Costos, Prendas, Empleados)
   ============================================================ */
function setupCostBars() {
  document.querySelectorAll('.costs-bar').forEach(bar => {
    const p = parseFloat(bar.dataset.percentage) || 0;
    bar.style.width = p + '%';
    const wrapper = bar.parentElement; if (!wrapper) return;
    let pct = wrapper.querySelector('.bar-percentage');
    if (!pct) { pct = document.createElement('span'); pct.className = 'bar-percentage'; wrapper.appendChild(pct); }
    pct.textContent = p + '%';
  });
}

function setupGarmentBars() {
  document.querySelectorAll('.garments-bar').forEach(bar => {
    const p = parseFloat(bar.dataset.percentage) || 0;
    const units = bar.dataset.units;
    bar.style.width = p + '%';
    const wrapper = bar.parentElement; if (!wrapper) return;
    let pct = wrapper.querySelector('.bar-percentage');
    if (!pct) { pct = document.createElement('span'); pct.className = 'bar-percentage'; wrapper.appendChild(pct); }
    // % por defecto. Cambia a: pct.textContent = `${units} u`; si lo prefieres.
    pct.textContent = p + '%';
  });
}

function setupEmployeeBars() {
  document.querySelectorAll('.employees-bar').forEach(bar => {
    const p = parseFloat(bar.dataset.percentage) || 0;
    const employees = bar.dataset.employees;
    bar.style.width = p + '%';
    const wrapper = bar.parentElement; if (!wrapper) return;
    let pct = wrapper.querySelector('.bar-percentage');
    if (!pct) { pct = document.createElement('span'); pct.className = 'bar-percentage'; wrapper.appendChild(pct); }
    // % por defecto. Cambia a: pct.textContent = `${employees}`; si lo prefieres.
    pct.textContent = p + '%';
  });
}

/* ============================================================
   Animaciones de barras y componentes
   ============================================================ */
function animateBars(sel, delay = 0) {
  const bars = document.querySelectorAll(sel);
  setTimeout(() => { bars.forEach(b => b.style.width = '100%'); }, 500 + delay);
  setTimeout(() => { bars.forEach(b => { b.style.width = '0%'; b.classList.remove('show-text'); }); }, 2000 + delay);
  setTimeout(() => {
    bars.forEach(b => {
      const p = b.getAttribute('data-percentage') || '0';
      b.style.width = p + '%';
      setTimeout(() => b.classList.add('show-text'), 600);
    });
  }, 3000 + delay);
}

function animateUniformityProgress(delay = 0) {
  const bars = document.querySelectorAll('.uniformity-progress');
  setTimeout(() => { bars.forEach(b => b.style.width = '100%'); }, 500 + delay);
  setTimeout(() => { bars.forEach(b => b.style.width = '0%'); }, 2000 + delay);
  setTimeout(() => { bars.forEach(b => b.style.width = (b.getAttribute('data-percentage') || 0) + '%'); }, 3000 + delay);
}

function animateAnalysisProgress(delay = 0) {
  const bars = document.querySelectorAll('.analysis-progress');
  setTimeout(() => { bars.forEach(b => b.style.width = '100%'); }, 500 + delay);
  setTimeout(() => { bars.forEach(b => b.style.width = '0%'); }, 2000 + delay);
  setTimeout(() => { bars.forEach(b => b.style.width = (b.getAttribute('data-percentage') || 0) + '%'); }, 3000 + delay);
}

/* ============================================================
   Gráfica de línea mensual
   ============================================================ */
function animateLineChart(delay = 0) {
  const linePath = document.getElementById('monthly-line-path');
  const points = document.querySelectorAll('.line-point');
  if (!linePath) return;

  const d = monthlyLineData.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  linePath.setAttribute('d', d);

  const len = linePath.getTotalLength();
  linePath.style.strokeDasharray = len;
  linePath.style.strokeDashoffset = len;

  points.forEach(pt => { pt.style.opacity = '0'; pt.setAttribute('r', '0'); });

  setTimeout(() => {
    linePath.style.strokeDashoffset = '0';
    points.forEach((pt, i) => {
      setTimeout(() => {
        pt.style.opacity = '1';
        pt.setAttribute('r', pt.classList.contains('current') ? '8' : '6');
      }, i * 100);
    });
  }, 500 + delay);
}

/* ============================================================
   Circular de reposición
   ============================================================ */
function animateRepositionCircular(delay = 0) {
  const r = document.querySelector('.reposition-segment');
  const n = document.querySelector('.new-allocation-segment');
  if (!r || !n) return;

  setTimeout(() => { r.style.strokeDasharray = '628 0'; n.style.strokeDasharray = '0 628'; }, 500 + delay);
  setTimeout(() => { r.style.strokeDasharray = '0 628'; n.style.strokeDasharray = '0 628'; }, 2000 + delay);
  setTimeout(() => {
    const C = 628, rep = (8/100)*C, neu = (92/100)*C;
    r.style.strokeDasharray = `${rep} ${C}`;
    n.style.strokeDasharray = `${neu} ${C}`;
    n.style.strokeDashoffset = `-${rep}`;
  }, 3000 + delay);
}

/* ============================================================
   Variación de Personal — SOPORTE INC/DEC (ambos lados)
   ============================================================ */

/**
 * Obtiene (inc, dec, net) para cada fila. Prioriza inc/dec si existen;
 * si no, usa net (`data-variation` o texto de la badge).
 */
function getRowIncDecNet(row) {
  const badge = row.querySelector('.variation-badge');

  const incAttr = row.dataset.inc || badge?.dataset.inc;
  const decAttr = row.dataset.dec || badge?.dataset.dec;

  // neto desde data-variation o contenido (fallback)
  const rawNet = (badge?.dataset.variation ?? badge?.textContent ?? '0').toString().trim();
  const net = parseFloat(rawNet.replace(',', '.')) || 0;

  // inc/dec explícitos
  const inc = incAttr != null ? Math.max(0, parseFloat(incAttr)) : (net > 0 ? net : 0);
  const dec = decAttr != null ? Math.max(0, parseFloat(decAttr)) : (net < 0 ? Math.abs(net) : 0);

  return { inc, dec, net };
}

/** Construye y anima los tramos izquierdo/derecho con línea de cero */
function buildVariationChart() {
  const rows = Array.from(document.querySelectorAll('#variation-chart .variation-row'));
  if (!rows.length) return;

  // 1) Calcular maxAbs considerando inc y dec explícitos y netos
  const maxAbs = Math.max(
    1,
    ...rows.map(r => {
      const badge = r.querySelector('.variation-badge');
      const incAttr = r.dataset.inc || badge?.dataset.inc || 0;
      const decAttr = r.dataset.dec || badge?.dataset.dec || 0;
      const varAttr = badge?.dataset.variation || badge?.textContent || 0;
      const incVal = Math.abs(parseFloat(incAttr) || 0);
      const decVal = Math.abs(parseFloat(decAttr) || 0);
      const netVal = Math.abs(parseFloat((varAttr + '').replace(',', '.')) || 0);
      return Math.max(incVal, decVal, netVal);
    })
  );

  // 2) Construir cada fila
  rows.forEach(row => {
    const display = row.querySelector('.variation-display');
    if (!display) return;

    // Datos
    const { inc, dec, net } = getRowIncDecNet(row);

    // Ocultar elementos legacy
    const badge = row.querySelector('.variation-badge');
    if (badge) badge.style.display = 'none';
    const counter = row.querySelector('.current-count');
    if (counter) counter.style.display = 'none';

    // Evitar duplicado
    if (display.querySelector('.variation-track')) return;

    // Crear DOM
    const track = document.createElement('div'); track.className = 'variation-track';
    const neg = document.createElement('div'); neg.className = 'var-neg';
    const pos = document.createElement('div'); pos.className = 'var-pos';

    const labelRight = document.createElement('span'); labelRight.className = 'var-label right';
    const labelLeft  = document.createElement('span'); labelLeft.className  = 'var-label left';
    const labelCenter= document.createElement('span'); labelCenter.className= 'var-label center';

    track.appendChild(neg); track.appendChild(pos);
    track.appendChild(labelLeft); track.appendChild(labelRight); track.appendChild(labelCenter);
    display.appendChild(track);

    // % relativos
    const pctPos = (inc / maxAbs) * 100;
    const pctNeg = (dec / maxAbs) * 100;

    // Estado inicial (animación)
    pos.style.width = '0%';
    neg.style.width = '0%';

    // Etiquetas
    labelRight.textContent = inc ? `+${inc}` : '';
    labelLeft.textContent  = dec ? `-${dec}` : '';
    labelCenter.textContent = (!inc && !dec) ? '0' : '';

    // Animar ambos lados si existen
    requestAnimationFrame(() => {
      if (pctPos > 0) pos.style.width = pctPos + '%';
      if (pctNeg > 0) neg.style.width = pctNeg + '%';
    });
  });
}

function setupVariationOnView() {
  const container = document.querySelector('#variation-chart');
  if (!container) return;
  if (container.dataset.built === 'true') return;
  buildVariationChart();
  container.dataset.built = 'true';
}

/* ============================================================
   Barras apiladas
   ============================================================ */
function animateStackedBars(sel, delay = 0) {
  const segs = document.querySelectorAll(sel);
  setTimeout(() => { if (segs.length >= 2) { segs[0].style.width = '100%'; segs[1].style.width = '0%'; } }, 500 + delay);
  setTimeout(() => { segs.forEach(s => { s.style.width='0%'; s.classList.remove('show-text'); }); }, 2000 + delay);
  setTimeout(() => {
    segs.forEach(s => {
      s.style.width = (s.getAttribute('data-percentage') || 0) + '%';
      setTimeout(() => s.classList.add('show-text'), 600);
    });
  }, 3000 + delay);
}

/* ============================================================
   Intersection Observer
   ============================================================ */
const observerOptions = { root: null, rootMargin: '-10% 0px -10% 0px', threshold: 0.3 };

const chartAnimations = {
  'budget-usage-chart': () => animateStackedBars('#budget-usage-chart .stacked-segment', 0),
  'monthly-line-chart': () => animateLineChart(0),
  'employees-chart': () => animateBars('.employees-bar', 0),
  'costs-chart': () => animateBars('.costs-bar', 0),
  'garments-chart': () => animateBars('.garments-bar', 0),
  'reposition-circular-chart': () => animateRepositionCircular(0),
  // Variación con soporte inc/dec
  'variation-chart': () => setupVariationOnView(),
  'renovation-proximity-chart': () => animateRenovationSemicircles(0),
  'uniformity-container': () => animateUniformityProgress(0),
  'detailed-analysis': () => animateAnalysisProgress(0)
};

const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const chartId = entry.target.id || entry.target.querySelector('[id]')?.id;
      let animationKey = chartId;
      if (!animationKey) {
        if (entry.target.classList.contains('uniformity-container')) animationKey = 'uniformity-container';
        else if (entry.target.querySelector('.detailed-analysis')) animationKey = 'detailed-analysis';
      }
      if (chartAnimations[animationKey]) {
        entry.target.dataset.animated = 'true';
        chartAnimations[animationKey]();
        chartObserver.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

/* ============================================================
   Renovación (semicírculos) — anim label meses
   ============================================================ */function animateRenovationSemicircles(delay = 0) {
  // Si el usuario prefiere menos movimiento, mostramos todo sin animar
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const items  = document.querySelectorAll('#renovationList .renovation-item');
  const months = document.querySelectorAll('#renovationList .renovation-month');

  if (reduce) {
    items.forEach(it => it.classList.add('show'));
    months.forEach(m => m.classList.add('show'));
    return;
  }

  // Stagger consistente con el resto del dashboard
  setTimeout(() => {
    items.forEach((it, i) => {
      setTimeout(() => it.classList.add('show'), i * 120);
    });
    months.forEach((m, i) => {
      setTimeout(() => m.classList.add('show'), i * 140);
    });
  }, 300 + delay);
}
/* ============================================================
   Inicialización basada en scroll
   ============================================================ */
function initScrollAnimations() {
  resetAllAnimations();
  setupCostBars(); setupGarmentBars(); setupEmployeeBars();
  document.querySelectorAll('.chart-container, .uniformity-container, .detailed-analysis')
    .forEach(c => { delete c.dataset.animated; chartObserver.observe(c); });
}

function resetAllAnimations() {
  // Barras/segmentos
  document.querySelectorAll('.bar, .uniformity-progress, .analysis-progress')
    .forEach(b => { b.style.width = '0%'; b.classList.remove('show-text'); });

  document.querySelectorAll('.stacked-segment')
    .forEach(s => { s.style.width = '0%'; s.classList.remove('show-text'); });

  document.querySelectorAll('.circle-segment')
    .forEach(c => { c.style.strokeDasharray = '0 628'; c.style.strokeDashoffset = '0'; });

  // Variación
  document.querySelectorAll('.variation-badge').forEach(b => b.classList.remove('show'));
  document.querySelectorAll('.current-count').forEach(c => c.classList.remove('show'));

  // Línea
  const linePath = document.getElementById('monthly-line-path');
  const points = document.querySelectorAll('.line-point');
  if (linePath) { linePath.style.strokeDasharray = '0'; linePath.style.strokeDashoffset = '0'; }
  points.forEach(p => { p.style.opacity = '0'; p.setAttribute('r', '0'); });

  // Renovación: **no uses estilos inline**; solo quita clases
  document.querySelectorAll('#renovationList .renovation-item')
    .forEach(it => it.classList.remove('show'));

  document.querySelectorAll('.renovation-month')
    .forEach(m => {
      m.classList.remove('show');
      // Remueve cualquier inline viejo que pueda existir
      m.style.removeProperty('transform');
      m.style.removeProperty('opacity');
    });
}


/* ============================================================
   Auxiliares y Tooltips (opcionales)
   ============================================================ */
function startAnimation() { initScrollAnimations(); }
function formatCurrencyMXN(amount) {
  return new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',minimumFractionDigits:0,maximumFractionDigits:0}).format(amount);
}
function formatCurrencyUSD(amount) {
  return new Intl.NumberFormat('es-MX',{style:'currency',currency:'USD',minimumFractionDigits:0,maximumFractionDigits:0}).format(amount);
}

// Tooltips (línea)
document.querySelectorAll('.line-point').forEach(point => {
  const month = point.getAttribute('data-month');
  const amount = point.getAttribute('data-amount');
  point.addEventListener('mouseenter', function(e) {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${month}: ${formatCurrencyMXN(amount)}`;
    document.body.appendChild(tip);
    const r = e.target.getBoundingClientRect(); tip.style.left = r.left + 'px'; tip.style.top = (r.top - 35) + 'px';
    point.tooltip = tip;
  });
  point.addEventListener('mouseleave', function() { if (point.tooltip) { document.body.removeChild(point.tooltip); point.tooltip = null; } });
});

// Tooltips (costos)
document.querySelectorAll('.costs-bar').forEach(bar => {
  const amount = bar.getAttribute('data-amount'); const percentage = bar.getAttribute('data-percentage');
  bar.addEventListener('mouseenter', function(e) {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${percentage}% - ${formatCurrencyUSD(amount)}`;
    document.body.appendChild(tip);
    const r = e.target.getBoundingClientRect(); tip.style.left = r.left + 'px'; tip.style.top = (r.top - 35) + 'px';
    bar.tooltip = tip;
  });
  bar.addEventListener('mouseleave', function() { if (bar.tooltip) { document.body.removeChild(bar.tooltip); bar.tooltip = null; } });
});

// Tooltips (prendas)
document.querySelectorAll('.garments-bar').forEach(bar => {
  const units = bar.getAttribute('data-units');
  bar.addEventListener('mouseenter', function(e) {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${units} unidades`;
    document.body.appendChild(tip);
    const r = e.target.getBoundingClientRect(); tip.style.left = r.left + 'px'; tip.style.top = (r.top - 35) + 'px';
    bar.tooltip = tip;
  });
  bar.addEventListener('mouseleave', function() { if (bar.tooltip) { document.body.removeChild(bar.tooltip); bar.tooltip = null; } });
});

// Tooltips (empleados)
document.querySelectorAll('.employees-bar').forEach(bar => {
  const employees = bar.getAttribute('data-employees'); const percentage = bar.getAttribute('data-percentage');
  bar.addEventListener('mouseenter', function(e) {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${percentage}% - ${employees} empleados`;
    document.body.appendChild(tip);
    const r = e.target.getBoundingClientRect(); tip.style.left = r.left + 'px'; tip.style.top = (r.top - 35) + 'px';
    bar.tooltip = tip;
  });
  bar.addEventListener('mouseleave', function() { if (bar.tooltip) { document.body.removeChild(bar.tooltip); bar.tooltip = null; } });
});

// Tooltips (bimestrales)
document.querySelectorAll('.bimester-bar').forEach(bar => {
  const employees = bar.getAttribute('data-employees'); const total = bar.getAttribute('data-total');
  bar.addEventListener('mouseenter', function(e) {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0, 0, 0, 0.8);color:#05ff59ff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${employees} de ${total} empleados a renovar`;
    document.body.appendChild(tip);
    const r = e.target.getBoundingClientRect(); tip.style.left = r.left + 'px'; tip.style.top = (r.top - 35) + 'px';
    bar.tooltip = tip;
  });
  bar.addEventListener('mouseleave', function() { if (bar.tooltip) { document.body.removeChild(bar.tooltip); bar.tooltip = null; } });
});

/* ============================================================
   Fallback inicial (si no hay pantalla de carga)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  setupCostBars();
  setupGarmentBars();
  setupEmployeeBars();
  // Si prefieres montar “Variación” sin observer, descomenta:
  // setupVariationOnView();
});

// =================== CARGA DE LA PÁGINA ===================

window.addEventListener('load', function () {
  setTimeout(function () {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
      setTimeout(function () {
        loadingScreen.style.display = 'none';
        setTimeout(() => {
          renderRenovations();          // ← renderiza lista dinámica
          initScrollAnimations();       // ← animaciones del dashboard original
          initRenovationOnScroll();     // ← activa Observer para esta sección
        }, 300);
      }, 800);
    } else {
      renderRenovations();
      initScrollAnimations();
      initRenovationOnScroll();
    }
  }, 500);
});
