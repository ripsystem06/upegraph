// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Panel Informativo initialized');
    
    // Initialize animations for elements as they come into view
    initAnimations();
    
    // Initialize all charts
    initCharts();
    
    // Initialize the progress bar animation
    animateProgressBar();
});

// Function to handle animations when elements come into view
function initAnimations() {
    // Check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        document.querySelectorAll('.card').forEach(card => {
            if (isInViewport(card) && !card.classList.contains('appeared')) {
                card.classList.add('appeared');
                card.style.opacity = '1';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
}

// Function to animate progress bar
function animateProgressBar() {
    const progressBar = document.querySelector('.presupuesto-progreso');
    
    // Set initial width to 0
    progressBar.style.width = '0%';
    
    // Animate to final width after a small delay
    setTimeout(() => {
        progressBar.style.width = '62.5%';
    }, 500);
}

// Function to initialize all charts
function initCharts() {
    // Sample data for charts
    const departments = ['Ventas', 'Marketing', 'Operaciones', 'Administrativo', 'Servicio'];
    const colorPalette = [
        'rgba(52, 152, 219, 0.7)', 
        'rgba(46, 204, 113, 0.7)', 
        'rgba(231, 76, 60, 0.7)', 
        'rgba(155, 89, 182, 0.7)', 
        'rgba(241, 196, 15, 0.7)'
    ];
    
    // Chart 1: Inversión por Departamento
    createBarChart(
        'chart-inversion',
        'Inversión por Departamento',
        departments,
        [350000, 280000, 420000, 150000, 50000],
        colorPalette,
        'Inversión (MXN)'
    );
    
    // Chart 2: Costo por Colaborador
    createBarChart(
        'chart-costo',
        'Costo por Colaborador',
        departments,
        [3500, 4200, 2800, 3100, 2500],
        colorPalette,
        'Costo (MXN)'
    );
    
    // Chart 3: Dotación de Personal Uniformado
    createBarChart(
        'chart-personal',
        'Personal Uniformado',
        departments,
        [120, 75, 150, 45, 30],
        colorPalette,
        'Número de Colaboradores'
    );
    
    // Chart 4: % de Uniformidad
    createDoughnutChart(
        'chart-uniformidad',
        'Uniformidad por Departamento',
        departments,
        [95, 82, 78, 88, 75],
        colorPalette
    );
    
    // Chart 5: Comportamiento Mensual
    createLineChart(
        'chart-mensual',
        'Comportamiento Mensual de Compra',
        ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        [80000, 65000, 90000, 120000, 85000, 75000, 110000, 95000, 140000, 115000, 130000, 155000],
        'rgba(52, 152, 219, 0.7)'
    );
    
    // Chart 6: Prendas con Mayor Rotación
    createPolarChart(
        'chart-prendas',
        'Prendas con Mayor Rotación',
        ['Camisas', 'Pantalones', 'Chaquetas', 'Calzado', 'Accesorios'],
        [320, 210, 150, 180, 90],
        colorPalette
    );
    
    // Chart 7: Índice de Reposición
    createPieChart(
        'chart-reposicion',
        'Índice de Reposición',
        ['Desgaste', 'Dotación Nueva'],
        [65, 35],
        ['rgba(231, 76, 60, 0.7)', 'rgba(52, 152, 219, 0.7)']
    );
    
    // Chart 8: Variación de Personal
    createLineChart(
        'chart-variacion',
        'Variación de Personal Uniformado',
        ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        [400, 410, 405, 420, 425, 415, 430, 440, 450, 455, 470, 480],
        'rgba(46, 204, 113, 0.7)'
    );
    
    // Chart 9: Fecha Estimada de Renovación
    createHorizontalBarChart(
        'chart-renovacion',
        'Fecha Estimada de Renovación (meses)',
        ['Camisas', 'Pantalones', 'Chaquetas', 'Calzado', 'Accesorios'],
        [6, 12, 18, 9, 24],
        colorPalette
    );
}

// Helper function to create bar charts
function createBarChart(canvasId, title, labels, data, backgroundColor, yAxisLabel = '') {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: yAxisLabel !== '',
                        text: yAxisLabel
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            if (value >= 1000) {
                                return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
                            }
                            return value;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Helper function to create horizontal bar charts
function createHorizontalBarChart(canvasId, title, labels, data, backgroundColor) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Helper function to create doughnut charts
function createDoughnutChart(canvasId, title, labels, data, backgroundColor) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Helper function to create pie charts
function createPieChart(canvasId, title, labels, data, backgroundColor) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Helper function to create line charts
function createLineChart(canvasId, title, labels, data, borderColor) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                fill: true,
                backgroundColor: borderColor.replace('0.7', '0.2'),
                borderColor: borderColor.replace('0.7', '1'),
                tension: 0.4,
                pointBackgroundColor: borderColor.replace('0.7', '1'),
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            if (value >= 1000) {
                                return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
                            }
                            return value;
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Helper function to create polar area charts
function createPolarChart(canvasId, title, labels, data, backgroundColor) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Add event listeners for card hover effects
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const chartContainer = this.querySelector('.chart-container');
        if (chartContainer) {
            chartContainer.style.transform = 'scale(1.05)';
            chartContainer.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const chartContainer = this.querySelector('.chart-container');
        if (chartContainer) {
            chartContainer.style.transform = 'scale(1)';
        }
    });
});