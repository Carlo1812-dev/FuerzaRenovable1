//Funcion para cargar el archivo CSV
async function cargarCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}
//Funcion para convertir el CSV a un array de objetos
function procesarCSV(csv) {
    const lineas = csv.split("\n");
    const headers = lineas[0].split(",");
    const filas = lineas.slice(1).filter(linea => linea.trim() !== "");//Filtrar lineas vacias

    return {
        headers,
        filas: filas.map(fila => fila.split(","))
    };
}

//Funcion para generar la tabla dinamica
function generarTabla(datos) {
    const tabla = document.getElementById("tabla");
    const thead = tabla.querySelector("thead");
    const tbody = tabla.querySelector("tbody");
    //Crear encabezados
    const trEncabezados = document.createElement("tr");
    datos.headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        trEncabezados.appendChild(th);
    });
    thead.appendChild(trEncabezados);

    //Crear filas de datos
    datos.filas.forEach(fila => {
        const tr = document.createElement("tr");
        fila.forEach(celda => {
            const td = document.createElement("td");
            td.textContent = celda;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

//Integracion
(async function() {
    const cvsData = await cargarCSV("Tabla.csv");
    const datos = procesarCSV(cvsData);
    generarTabla(datos);
})();
cargarCSV();
