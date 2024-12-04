// Cargar los datos
async function cargarDatos() {
    try {
        return new Promise((resolve, reject) => {
            Papa.parse('02 modern-renewable-energy-consumption.csv', {
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

        // Filtrar datos para Colombia
        const datosColombia = datos.filter(d => d.Entity === 'Colombia');

        // Filtrar datos para el año 2021
        const datos2021 = datosColombia.find(d => d.Year === '2021');

        // Verificar si se encontraron datos para 2022
        if (!datos2021) {
            console.error('No se encontraron datos para el año 2021 en Colombia');
            return; // Salir de la función si no hay datos
        }

        // Extraer los valores de las energías
        const energiaSolar = parseFloat(datos2021['Solar Generation - TWh']) || 0;
        const energiaEolica = parseFloat(datos2021['Wind Generation - TWh']) || 0;
        const energiaHidraulica = parseFloat(datos2021['Hydro Generation - TWh']) || 0;
        const energiaBiomasa = parseFloat(datos2021['Geo Biomass Other - TWh']) || 0;

        // Procesar los datos para el gráfico de torta
        const datosTorta = [energiaSolar, energiaEolica, energiaHidraulica, energiaBiomasa];

        // Gráfico de Torta (Pastel)
        const ctxTorta = document.getElementById('graficoTorta').getContext('2d');
        new Chart(ctxTorta, {
            type: 'pie',
            data: {
                labels: ['Energía Solar', 'Energía Eólica', 'Energía Hidráulica', 'Energía de Biomasa'],
                datasets: [{
                    label: 'Distribución de Energías en 2022',
                    data: datosTorta,
                    backgroundColor: ['#FFEB3B', '#2196F3', '#4CAF50', '#FF9800'],
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
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });

        // Procesar los datos para el gráfico de barras
        const etiquetas = ['Energía Solar', 'Energía Eólica', 'Energía Hidráulica', 'Energía de Biomasa'];
        const valores = [energiaSolar, energiaEolica, energiaHidraulica, energiaBiomasa];

        // Gráfico de Barras
        const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
        new Chart(ctxBarras, {
            type: 'bar',
            data: {
                labels: etiquetas,
                datasets: [{
                    label: 'Energía Renovable (TWh)',
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

        // Procesar los datos para el gráfico de área
        const etiquetas1 = ['Energía Solar', 'Energía Eólica', 'Energía Hidráulica', 'Energía de Biomasa'];
        const valores1 = [energiaSolar, energiaEolica, energiaHidraulica, energiaBiomasa];

        // Gráfico de Área
        const ctxArea = document.getElementById('graficoArea').getContext('2d');
        new Chart(ctxArea, {
            type: 'line', // Usamos 'line' para crear un gráfico de área
            data: {
                labels: etiquetas1,
                datasets: [{
                    label: 'Energía Renovable (TWh)',
                    data: valores1,
                    backgroundColor: 'rgba(33, 150, 243, 0.2)', // Color de fondo con transparencia
                    borderColor: '#2196F3', // Color de la línea
                    borderWidth: 2,
                    fill: true, // Rellena el área bajo la línea
                    tension: 0.4 // Suaviza la línea
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
    } catch (error) {
        console.error('Error al crear los gráficos:', error);
    }
}

// Verificar si los elementos del DOM están cargados antes de intentar crear los gráficos
document.addEventListener('DOMContentLoaded', function() {
    crearGraficos();
});

let graficoCurvasGeotermia; // Variable para almacenar el gráfico de curvas

// Cargar los datos del archivo CSV para el gráfico de curvas
async function cargarDatosCurvas() {
    try {
        return new Promise((resolve, reject) => {
            Papa.parse('17 installed-geothermal-capacity.csv', { // Cambia 'tu_archivo_geotermia.csv' por el nombre de tu archivo
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

// Crear gráfico de curvas
async function crearGraficoCurvas() {
    try {
        const datos = await cargarDatosCurvas();

        // Filtrar datos para Colombia entre 2000 y 2022
        const datosFiltrados = datos.filter(d => 
            d.Entity === 'Chile' && 
            parseInt(d.Year) >= 2000 && 
            parseInt(d.Year) <= 2022
        );

        // Verificar si se encontraron datos
        if (datosFiltrados.length === 0) {
            console.error('No se encontraron datos para Colombia entre 2000 y 2022');
            return; // Salir de la función si no hay datos
        }

        // Extraer etiquetas y valores
        const etiquetas = datosFiltrados.map(d => d.Year);
        const valores = datosFiltrados.map(d => parseFloat(d['Geothermal Capacity']) || 0);

        // Destruir el gráfico anterior si existe
        if (graficoCurvasGeotermia) {
            graficoCurvasGeotermia.destroy();
        }

        // Gráfico de Curvas
        const ctxCurvas = document.getElementById('graficoCurvasGeotermia').getContext('2d');
        graficoCurvasGeotermia = new Chart(ctxCurvas, {
            type: 'line', // Usamos 'line' para crear un gráfico de curvas
            data: {
                labels: etiquetas,
                datasets: [{
                    label: 'Capacidad Geotérmica (MW)',
                    data: valores,
                    backgroundColor: 'rgba(33, 150, 243, 0.2)', // Color de fondo con transparencia
                    borderColor: '#2196F3', // Color de la línea
                    borderWidth: 2,
                    fill: true, // Rellena el área bajo la línea
                    tension: 0.4 // Suaviza la línea
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

    } catch (error) {
        console.error('Error al crear el gráfico de curvas:', error);
    }
}

// Llamar a la función para crear gráficos
document.addEventListener('DOMContentLoaded', function() {
    crearGraficoCurvas(); // Asegúrate de llamar a esta función
});