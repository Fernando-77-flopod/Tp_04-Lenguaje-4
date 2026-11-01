// Referencias a los botones y al contenedor de resultados
const btnCrear = document.getElementById("btnCrear");
const btnDescargar = document.getElementById("btnDescargar");
const btnSlice = document.getElementById("btnSlice");
const resultado = document.getElementById("resultado");

// Variable global para guardar el Blob creado
let miBlob = null;

// -----------------------------------------------------------
// 1) CREAR UN BLOB DE TEXTO
// -----------------------------------------------------------
btnCrear.addEventListener("click", () => {
    const texto = "Hola, este es un contenido de prueba creado con Blob.\n" +
                  "Lenguaje IV - Trabajo Práctico N°4 - 2026.";

    // Creamos el Blob con tipo de dato texto plano
    miBlob = new Blob([texto], { type: "text/plain" });

    // Mostramos en pantalla los datos del Blob
    resultado.textContent =
        "✅ Blob creado correctamente.\n" +
        "Tamaño: " + miBlob.size + " bytes\n" +
        "Tipo MIME: " + miBlob.type + "\n\n" +
        "Contenido:\n" + texto;
});

// -----------------------------------------------------------
// 2) DESCARGAR EL BLOB
// -----------------------------------------------------------
btnDescargar.addEventListener("click", () => {
    if (!miBlob) {
        alert("Primero debes crear el Blob.");
        return;
    }

    // Creamos una URL temporal para el Blob
    const url = URL.createObjectURL(miBlob);

    // Creamos un enlace <a> invisible para forzar la descarga
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "archivo_blob.txt";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

    // Liberamos la URL temporal
    URL.revokeObjectURL(url);

    resultado.textContent = "⬇️ Descarga iniciada: archivo_blob.txt";
});

// -----------------------------------------------------------
// 3) USAR SLICE() SOBRE EL BLOB
// -----------------------------------------------------------
btnSlice.addEventListener("click", () => {
    if (!miBlob) {
        alert("Primero debes crear el Blob.");
        return;
    }

    // slice(inicio, fin) — extrae una porción del Blob
    // En este caso, los primeros 20 bytes
    const porcion = miBlob.slice(0, 20);

    // Leemos la porción usando FileReader para mostrar el contenido
    const lector = new FileReader();

    lector.onload = (e) => {
        resultado.textContent =
            "✂️ Porción extraída con slice(0, 20):\n\n" +
            "Tamaño de la porción: " + porcion.size + " bytes\n" +
            "Tipo MIME: " + porcion.type + "\n\n" +
            "Contenido de la porción:\n" + e.target.result;
    };

    lector.readAsText(porcion);
});