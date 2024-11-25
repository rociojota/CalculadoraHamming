function encode(input) {

    //verificacion solo binarios
    if (!/^[01]+$/.test(input)) {
        return "Entrada no válida. Por favor, ingrese solo valores binarios (0 y 1).";
    }

    const inputLength = input.length;

    let p = 0;
    while (Math.pow(2, p) < inputLength + p + 1) {
        p++;
    }

    const encoded = Array(inputLength + p).fill('0');
    let j = 0;

    for (let i = 0; i < encoded.length; i++) {
        if (isPowerOfTwo(i + 1)) {
            encoded[i] = '0';
        } else {
            encoded[i] = input[j++];
        }
    }

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

function detectorYCorrector(input) {
    if (!/^[01]+$/.test(input)) {
        return "Entrada no válida. Por favor, ingrese solo valores binarios (0 y 1).";
    }

    const n = input.length;
    let errorPos = 0;

    for (let i = 0; Math.pow(2, i) <= n; i++) {
        const posicionParidad = Math.pow(2, i);
        const paridadCalculada = calculoParidad(input.split(''), posicionParidad);

        if (paridadCalculada === '1') {
            errorPos += posicionParidad;
        }
    }

    const corregido = input.split('');
    if (errorPos !== 0) {
        corregido[errorPos - 1] = corregido[errorPos - 1] === '1' ? '0' : '1';
        return `Error detectado en la posición ${errorPos}.\n\n Código corregido: ${corregido.join('')}`;
    } else {
        return "No se detectaron errores.";
    }
}

document.getElementById("encodeButton").addEventListener("click", () => {
    const inputData = document.getElementById("inputData").value.trim();
    if (!inputData) {
        document.getElementById("output").textContent = "Por favor, ingrese una secuencia válida.";
        return;
    }

    const result = encode(inputData);
    document.getElementById("output").textContent = `Código Hamming: ${result}`;
    document.getElementById("outputContainer").style.display = "block";  

});

document.getElementById("detectButton").addEventListener("click", () => {
    const detectInput = document.getElementById("detectInput").value.trim();
    if (!detectInput) {
        document.getElementById("detectOutput").textContent = "Por favor, ingrese un código Hamming válido.";
        return;
    }

    const result = detectorYCorrector(detectInput);
    document.getElementById("detectOutput").textContent = `${result}`;
    document.getElementById("detectOutputContainer").style.display = "block";  

});
