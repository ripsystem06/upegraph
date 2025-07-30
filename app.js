// === LOADING SCREEN ===
window.addEventListener('load', function () {
  setTimeout(function () {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('fade-out');

    setTimeout(function () {
      loadingScreen.style.display = 'none';
      setTimeout(() => { startAnimation(); }, 300);
    }, 800);
  }, 2000); // 2s de splash
});

// === MOBILE MENU ===
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
});
mobileOverlay.addEventListener('click', function () {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  mobileOverlay.classList.remove('active');
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
  });
});

// === HEADER SCROLL HIDE/SHOW ===
let lastScrollTop = 0;
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollTop = scrollTop;
});

// === DATA PARA GRÁFICA DE LÍNEA ===
const monthlyLineData = [
  { month: 'Ene', amount: 42000, x: 133, y: 278, status: 'past' },
  { month: 'Feb', amount: 45000, x: 186, y: 270, status: 'past' },
  { month: 'Mar', amount: 57000, x: 239, y: 230, status: 'past' },
  { month: 'Abr', amount: 50000, x: 292, y: 250, status: 'past' },
  { month: 'May', amount: 48000, x: 345, y: 256, status: 'past' },
  { month: 'Jun', amount: 55000, x: 398, y: 235, status: 'past' },
  { month: 'Jul', amount: 43000, x: 451, y: 274, status: 'past' },
  { month: 'Ago', amount: 58000, x: 504, y: 226, status: 'current' },
  { month: 'Sep', amount: 46000, x: 557, y: 264, status: 'future' },
  { month: 'Oct', amount: 51000, x: 610, y: 246, status: 'future' },
  { month: 'Nov', amount: 54000, x: 663, y: 236, status: 'future' },
  { month: 'Dic', amount: 51000, x: 716, y: 246, status: 'future' }
];

// === ANIMACIONES GENERALES ===
function animateBars(selector, delay = 0) {
  const bars = document.querySelectorAll(selector);
  setTimeout(() => { bars.forEach(b => b.style.width = '100%'); }, 500 + delay);
  setTimeout(() => { bars.forEach(b => { b.style.width = '0%'; b.classList.remove('show-text'); }); }, 2000 + delay);
  setTimeout(() => {
    bars.forEach(b => {
      const p = b.getAttribute('data-percentage');
      b.style.width = p + '%';
      setTimeout(() => b.classList.add('show-text'), 600);
    });
  }, 3000 + delay);
}

function animateUniformityProgress(delay = 0) {
  const bars = document.querySelectorAll('.uniformity-progress');
  setTimeout(() => { bars.forEach(b => b.style.width = '100%'); }, 500 + delay);
  setTimeout(() => { bars.forEach(b => b.style.width = '0%'); }, 2000 + delay);
  setTimeout(() => { bars.forEach(b => b.style.width = b.getAttribute('data-percentage') + '%'); }, 3000 + delay);
}

function animateAnalysisProgress(delay = 0) {
  const bars = document.querySelectorAll('.analysis-progress');
  setTimeout(() => { bars.forEach(b => b.style.width = '100%'); }, 500 + delay);
  setTimeout(() => { bars.forEach(b => b.style.width = '0%'); }, 2000 + delay);
  setTimeout(() => { bars.forEach(b => b.style.width = b.getAttribute('data-percentage') + '%'); }, 3000 + delay);
}

function animateLineChart(delay = 0) {
  const linePath = document.getElementById('monthly-line-path');
  const points = document.querySelectorAll('.line-point');
  const pathData = monthlyLineData.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  linePath.setAttribute('d', pathData);

  const pathLength = linePath.getTotalLength();
  linePath.style.strokeDasharray = pathLength;
  linePath.style.strokeDashoffset = pathLength;

  points.forEach(pt => { pt.style.opacity = '0'; pt.setAttribute('r', '0'); });

  setTimeout(() => {
    linePath.style.strokeDashoffset = '0';
    points.forEach((pt, i) => {
      setTimeout(() => {
        pt.style.opacity = '1';
        const r = pt.classList.contains('current') ? '8' : '6';
        pt.setAttribute('r', r);
      }, i * 100);
    });
  }, 500 + delay);
}

function animateRepositionCircular(delay = 0) {
  const repositionSegment = document.querySelector('.reposition-segment');
  const newAllocationSegment = document.querySelector('.new-allocation-segment');

  setTimeout(() => {
    repositionSegment.style.strokeDasharray = '628 0';
    newAllocationSegment.style.strokeDasharray = '0 628';
  }, 500 + delay);

  setTimeout(() => {
    repositionSegment.style.strokeDasharray = '0 628';
    newAllocationSegment.style.strokeDasharray = '0 628';
  }, 2000 + delay);

  setTimeout(() => {
    const C = 628;
    const rep = (8 / 100) * C;
    repositionSegment.style.strokeDasharray = `${rep} ${C}`;
    const newAlloc = (92 / 100) * C;
    newAllocationSegment.style.strokeDasharray = `${newAlloc} ${C}`;
    newAllocationSegment.style.strokeDashoffset = `-${rep}`;
  }, 3000 + delay);
}

function animateVariationBars(delay = 0) {
  const bars = document.querySelectorAll('.variation-bar-item');
  setTimeout(() => { bars.forEach(b => b.style.width = '50%'); }, 500 + delay);
  setTimeout(() => { bars.forEach(b => { b.style.width = '0%'; b.classList.remove('show-text'); }); }, 2000 + delay);
  setTimeout(() => {
    bars.forEach(b => {
      const v = parseInt(b.getAttribute('data-variation'));
      const width = Math.abs(v) * 25; // 25% por unidad
      b.style.width = width + '%';
      setTimeout(() => b.classList.add('show-text'), 600);
    });
  }, 3000 + delay);
}

function animateStackedBars(selector, delay = 0) {
  const segments = document.querySelectorAll(selector);
  setTimeout(() => { if (segments.length >= 2){ segments[0].style.width = '100%'; segments[1].style.width = '0%'; }}, 500 + delay);
  setTimeout(() => { segments.forEach(s => { s.style.width = '0%'; s.classList.remove('show-text'); }); }, 2000 + delay);
  setTimeout(() => {
    segments.forEach(s => {
      s.style.width = s.getAttribute('data-percentage') + '%';
      setTimeout(() => s.classList.add('show-text'), 600);
    });
  }, 3000 + delay);
}

function startAnimation() {
  const allBars = document.querySelectorAll('.bar, .uniformity-progress, .analysis-progress, .variation-bar');
  const allStacked = document.querySelectorAll('.stacked-segment');
  const allCircles = document.querySelectorAll('.circle-segment');
  const linePath = document.getElementById('monthly-line-path');
  const linePoints = document.querySelectorAll('.line-point');

  allBars.forEach(b => { b.style.width = '0%'; b.classList.remove('show-text'); });
  allStacked.forEach(s => { s.style.width = '0%'; s.classList.remove('show-text'); });
  allCircles.forEach(c => { c.style.strokeDasharray = '0 628'; c.style.strokeDashoffset = '0'; });
  linePath.style.strokeDasharray = '0'; linePath.style.strokeDashoffset = '0';
  linePoints.forEach(p => { p.style.opacity = '0'; p.setAttribute('r','0'); });

  animateBars('.employees-bar', 0);
  animateBars('.costs-bar', 200);
  animateBars('.garments-bar', 400);
  animateRepositionCircular(600);
  animateVariationBars(800);
  animateBars('.bimester-bar', 1000);
  animateUniformityProgress(1200);
  animateAnalysisProgress(1400);
  animateLineChart(1600);
  animateStackedBars('#budget-usage-chart .stacked-segment', 1800);
}

// === FORMATTERS ===
function formatCurrencyMXN(amount) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}
function formatCurrencyUSD(amount) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

// === TOOLTIPS ===
document.querySelectorAll('.line-point').forEach(point => {
  const month = point.getAttribute('data-month');
  const amount = point.getAttribute('data-amount');
  point.addEventListener('mouseenter', e => {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${month}: ${formatCurrencyMXN(amount)}`;
    document.body.appendChild(tip);
    const rect = e.target.getBoundingClientRect();
    tip.style.left = rect.left + 'px';
    tip.style.top = (rect.top - 35) + 'px';
    point.tooltip = tip;
  });
  point.addEventListener('mouseleave', () => { if (point.tooltip){ document.body.removeChild(point.tooltip); point.tooltip = null; }});
});

document.querySelectorAll('.costs-bar').forEach(bar => {
  const amount = bar.getAttribute('data-amount');
  const percentage = bar.getAttribute('data-percentage');
  bar.addEventListener('mouseenter', e => {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${percentage}% - ${formatCurrencyUSD(amount)}`;
    document.body.appendChild(tip);
    const rect = e.target.getBoundingClientRect();
    tip.style.left = rect.left + 'px';
    tip.style.top = (rect.top - 35) + 'px';
    bar.tooltip = tip;
  });
  bar.addEventListener('mouseleave', () => { if (bar.tooltip){ document.body.removeChild(bar.tooltip); bar.tooltip = null; }});
});

document.querySelectorAll('.garments-bar').forEach(bar => {
  const units = bar.getAttribute('data-units');
  bar.addEventListener('mouseenter', e => {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${units} unidades`;
    document.body.appendChild(tip);
    const rect = e.target.getBoundingClientRect();
    tip.style.left = rect.left + 'px';
    tip.style.top = (rect.top - 35) + 'px';
    bar.tooltip = tip;
  });
  bar.addEventListener('mouseleave', () => { if (bar.tooltip){ document.body.removeChild(bar.tooltip); bar.tooltip = null; }});
});

document.querySelectorAll('.uniformity-item').forEach(item => {
  const department = item.querySelector('.uniformity-department').textContent;
  const percentage = item.querySelector('.uniformity-percentage').textContent;
  const stats = item.querySelector('.uniformity-stats').textContent;
  item.addEventListener('mouseenter', e => {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${department}: ${percentage} - ${stats}`;
    document.body.appendChild(tip);
    const rect = e.target.getBoundingClientRect();
    tip.style.left = rect.left + 'px';
    tip.style.top = (rect.top - 35) + 'px';
    item.tooltip = tip;
  });
  item.addEventListener('mouseleave', () => { if (item.tooltip){ document.body.removeChild(item.tooltip); item.tooltip = null; }});
});

document.querySelectorAll('.analysis-item').forEach(item => {
  const department = item.querySelector('.analysis-department').textContent;
  const percentage = item.querySelector('.analysis-percentage').textContent;
  const details = item.querySelector('.analysis-details').textContent;
  item.addEventListener('mouseenter', e => {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:normal;max-width:300px;`;
    tip.textContent = `${department}: ${percentage} - ${details}`;
    document.body.appendChild(tip);
    const rect = e.target.getBoundingClientRect();
    tip.style.left = rect.left + 'px';
    tip.style.top = (rect.top - 35) + 'px';
    item.tooltip = tip;
  });
  item.addEventListener('mouseleave', () => { if (item.tooltip){ document.body.removeChild(item.tooltip); item.tooltip = null; }});
});

document.querySelectorAll('.legend-item').forEach(item => {
  const text = item.querySelector('.legend-text').textContent;
  item.addEventListener('mouseenter', e => {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = text;
    document.body.appendChild(tip);
    const rect = e.target.getBoundingClientRect();
    tip.style.left = rect.left + 'px';
    tip.style.top = (rect.top - 35) + 'px';
    item.tooltip = tip;
  });
  item.addEventListener('mouseleave', () => { if (item.tooltip){ document.body.removeChild(item.tooltip); item.tooltip = null; }});
});

document.querySelectorAll('.variation-bar-item').forEach(bar => {
  const variation = parseInt(bar.getAttribute('data-variation'));
  bar.addEventListener('mouseenter', e => {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    let msg = 'Sin cambios en el personal';
    if (variation > 0) msg = `Incremento de ${variation} empleado(s)`;
    if (variation < 0) msg = `Decremento de ${Math.abs(variation)} empleado(s)`;
    tip.textContent = msg;
    document.body.appendChild(tip);
    const rect = e.target.getBoundingClientRect();
    tip.style.left = rect.left + 'px';
    tip.style.top = (rect.top - 35) + 'px';
    bar.tooltip = tip;
  });
  bar.addEventListener('mouseleave', () => { if (bar.tooltip){ document.body.removeChild(bar.tooltip); bar.tooltip = null; }});
});

document.querySelectorAll('.bimester-bar').forEach(bar => {
  const employees = bar.getAttribute('data-employees');
  const total = bar.getAttribute('data-total');
  bar.addEventListener('mouseenter', e => {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${employees} de ${total} empleados a renovar`;
    document.body.appendChild(tip);
    const rect = e.target.getBoundingClientRect();
    tip.style.left = rect.left + 'px';
    tip.style.top = (rect.top - 35) + 'px';
    bar.tooltip = tip;
  });
  bar.addEventListener('mouseleave', () => { if (bar.tooltip){ document.body.removeChild(bar.tooltip); bar.tooltip = null; }});
});

document.querySelectorAll('.stacked-segment').forEach(seg => {
  const amount = seg.getAttribute('data-amount');
  const percentage = seg.getAttribute('data-percentage');
  let type = seg.classList.contains('used') ? 'Utilizado' : (seg.classList.contains('available') ? 'Disponible' : '');
  seg.addEventListener('mouseenter', e => {
    const tip = document.createElement('div');
    tip.style.cssText = `position:absolute;background:rgba(0,0,0,.8);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:1000;white-space:nowrap;`;
    tip.textContent = `${type}: ${percentage}% - ${formatCurrencyMXN(amount)}`;
    document.body.appendChild(tip);
    const rect = e.target.getBoundingClientRect();
    tip.style.left = rect.left + 'px';
    tip.style.top = (rect.top - 35) + 'px';
    seg.tooltip = tip;
  });
  seg.addEventListener('mouseleave', () => { if (seg.tooltip){ document.body.removeChild(seg.tooltip); seg.tooltip = null; }});
});
