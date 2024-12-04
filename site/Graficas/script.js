// Agregar un bloque try-catch para manejar errores al cargar datos
async function cargarDatos() {
    try {
        return new Promise((resolve, reject) => {
            Papa.parse('01 renewable-share-energy.csv', {
                header: true,
                download: true,
                complete: (result) => {
                    resolve(result.data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

// Agregar un bloque try-catch para manejar errores al crear gráficos
async function crearGraficos() {
    try {
        const datos = await cargarDatos();

        // Filtrar datos para el gráfico de torta (solo para el año 1977)
        const datos1977 = datos.find(d => d.Year === '1977');
        const porcentajeRenovables = parseFloat(datos1977['Renewables (% equivalent primary energy)']);

        // Procesar los datos para los gráficos
        const etiquetas = datos.map(d => d.Year);
        const valores = datos.map(d => parseFloat(d['Renewables (% equivalent primary energy)']));

        // Gráfico de Torta (Pastel)
        const ctxTorta = document.getElementById('graficoTorta').getContext('2d');
        new Chart(ctxTorta, {
            type: 'pie',
            data: {
                labels: ['Energía Renovable', 'Energía No Renovable'],
                datasets: [{
                    label: 'Distribución de Energías en 1977',
                    data: [porcentajeRenovables, 100 - porcentajeRenovables],
                    backgroundColor: ['#4CAF50', '#FF5722'],
                    borderColor: '#fff',
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });

        // Gráfico de Barras
        const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
        new Chart(ctxBarras, {
            type: 'bar',
            data: {
                labels: etiquetas,
                datasets: [{
                    label: 'Energía Renovable (%)',
                    data: valores,
                    backgroundColor: '#2196F3',
                    borderColor: '#0D47A1',
                    borderWidth: 2,
                    hoverBackgroundColor: '#64B5F6',
                    hoverBorderColor: '#0D47A1'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#333',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: '#E0E0E0'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#333',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: '#E0E0E0'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });

        // Gráfico de Líneas
        const ctxLineas = document.getElementById('graficoLineas').getContext('2d');
        const gradientStroke = ctxLineas.createLinearGradient(0, 0, 0, 400);
        gradientStroke.addColorStop(0, 'rgba(75, 192, 192, 1)');
        gradientStroke.addColorStop(1, 'rgba(153, 102, 255, 1)');

        new Chart(ctxLineas, {
            type: 'line',
            data: {
                labels: etiquetas,
                datasets: [{
                    label: 'Energía Renovable (%)',
                    data: valores,
                    borderColor: gradientStroke,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 3,
                    fill: true ,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#333',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: '#E0E0E0'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#333',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: '#E0E0E0'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.dataset.label + ': ' + tooltipItem.raw + '%';
                            }
                        }
                    }
                }
            }
        });

        // Gráfico de Dispersión
        const ctxDispersion = document.getElementById('graficoDispersion').getContext('2d');
        const datosDispersion = datos.map(d => ({
            x: parseInt(d.Year), // Año
            y: parseFloat(d['Renewables (% equivalent primary energy)']) // Porcentaje de Energía Renovable
        })).filter(d => !isNaN(d.x) && !isNaN(d.y)); // Filtrar datos inválidos

        new Chart(ctxDispersion, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Energía Renovable (%) por Año',
                    data: datosDispersion,
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Año',
                            font: {
                                size: 16
                            }
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: '#E0E0E0'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Porcentaje de Energía Renovable (%)',
                            font: {
                                size: 16
                            }
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: '#E0E0E0'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `Año: ${tooltipItem.raw.x}, Energía Renovable: ${tooltipItem.raw.y}%`;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al crear los gráficos:', error);
    }
}

// Verificar si los elementos del DOM están cargados antes de intentar crear los gráficos
document.addEventListener('DOMContentLoaded', function() {
    crearGraficos();
});
