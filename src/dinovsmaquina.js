const buttons = document.querySelectorAll(".cuadrado");
let turno = true; // true para X (jugador), false para O (IA)
let in_game = true;
const btnReiniciar = document.getElementById("reiniciar");
let ganadasx = 0;
let ganadas0 = 0;
let empates = 0;
let contador = 0;

const list = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Actualiza el marcador en la pantalla
function update() {
    document.querySelector("#ganadasX").textContent = "Juegos ganados de X: " + ganadasx;
    document.querySelector("#ganadasY").textContent = "Juegos ganados de O: " + ganadas0;
    document.querySelector("#empates").textContent = "Empates: " + empates;
}

// Realiza un movimiento para la IA
function jugarTurnoDeMaquina() {
    if (!in_game) return; // Asegúrate de que el juego esté en curso

    const celdasVacias = Array.from(buttons)
        .map((celda, index) => celda.textContent === "" ? index : null)
        .filter(index => index !== null);

    if (celdasVacias.length === 0) return; // No hay movimientos disponibles

    const indiceAleatorio = Math.floor(Math.random() * celdasVacias.length);
    const celdaAleatoria = celdasVacias[indiceAleatorio];
    buttons[celdaAleatoria].textContent = "O";
    turno = !turno;
    contador++;

    const resultado = ganador();
    if (resultado !== null) {
        mostrarResultado(resultado);
    }
}

// Verifica si hay un ganador o un empate
function ganador() {
    for (let i = 0; i < list.length; i++) {
        const [a, b, c] = list[i];
        if (buttons[a].textContent === "X" && buttons[b].textContent === "X" && buttons[c].textContent === "X") {
            in_game = false;
            return 1;
        } else if (buttons[a].textContent === "O" && buttons[b].textContent === "O" && buttons[c].textContent === "O") {
            in_game = false;
            return 0;
        }
    }
    if (contador === 9) { // Verifica el empate
        in_game = false;
        return -1;
    }
    return null; // El juego sigue en curso
}

// Muestra el resultado del juego
function mostrarResultado(resultado) {
    if (resultado === 1) {
        alert("El Ganador fue X");
        ganadasx++;
    } else if (resultado === 0) {
        alert("El Ganador fue O");
        ganadas0++;
    } else if (resultado === -1) {
        alert("Empate");
        empates++;
    }
    update();
}

// Inicializa el tablero y añade los manejadores de eventos
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (turno && e.target.textContent === "" && in_game) {
            e.target.textContent = "X";
            turno = !turno;
            contador++;
            const resultado = ganador();
            if (resultado === null) {
                jugarTurnoDeMaquina();
            } else {
                mostrarResultado(resultado);
            }
        }
    });
});

// Reinicia el juego
btnReiniciar.addEventListener("click", () => {
    in_game = true;
    contador = 0;
    buttons.forEach(boton => boton.textContent = "");
    document.querySelector("#winner").textContent = "";
    // Restablece el turno a X al reiniciar el juego
    turno = true;
});
