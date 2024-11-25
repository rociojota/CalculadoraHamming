// Lógica de codificación Hamming (adaptada de tu código Java)
function encode(input) {
    const inputLength = input.length;

    // Calcular bits de paridad
    let p = 0;
    while (Math.pow(2, p) < inputLength + p + 1) {
        p++;
    }

    // Crear arreglo con bits de paridad y datos
    const encoded = Array(inputLength + p).fill('0');
    let j = 0; // Índice para los datos

    for (let i = 0; i < encoded.length; i++) {
        if (isPowerOfTwo(i + 1)) {
            encoded[i] = '0'; // Bit de paridad
        } else {
            encoded[i] = input[j++]; // Dato
        }
    }

    // Calcular los bits de paridad
    for (let i = 0; i < p; i++) {
        const posicionParidad = Math.pow(2, i);
        encoded[posicionParidad - 1] = calculoParidad(encoded, posicionParidad);
    }

    return encoded.join('');
}

function calculoParidad(encoded, posicionParidad) {
    let contador = 0;

    for (let j = 1; j <= encoded.length; j++) {
        if ((j & posicionParidad) !== 0 && encoded[j - 1] === '1') {
            contador++;
        }
    }

    return contador % 2 === 0 ? '0' : '1';
}

function isPowerOfTwo(n) {
    return (n & (n - 1)) === 0;
}

// Lógica de detección y corrección
function detectorYCorrector(input) {
    const n = input.length;
    let errorPos = 0;

    for (let i = 0; Math.pow(2, i) <= n; i++) {
        const posicionParidad = Math.pow(2, i);
        const paridadCalculada = calculoParidad(input.split(''), posicionParidad);

        if (paridadCalculada === '1') {
            errorPos += posicionParidad;
        }
    }

    if (errorPos === 0) {
        return "No se detectó ningún error en el código.";
    }

    // Corregir el error
    const corregido = input.split('');
    corregido[errorPos - 1] = corregido[errorPos - 1] === '1' ? '0' : '1';

    return `Error detectado y corregido en la posición ${errorPos}. Código corregido: ${corregido.join('')}`;
}

// Integración con la página
document.getElementById("encodeButton").addEventListener("click", () => {
    const inputData = document.getElementById("inputData").value.trim();
    if (!inputData) {
        document.getElementById("output").textContent = "Por favor, ingrese una secuencia válida.";
        return;
    }

    const result = encode(inputData);
    document.getElementById("output").textContent = `Código Hamming generado: ${result}`;
});

document.getElementById("detectButton").addEventListener("click", () => {
    const detectInput = document.getElementById("detectInput").value.trim();
    if (!detectInput) {
        document.getElementById("detectOutput").textContent = "Por favor, ingrese un código Hamming válido.";
        return;
    }

    const result = detectorYCorrector(detectInput);
    document.getElementById("detectOutput").textContent = `Resultado: ${result}`;
});
