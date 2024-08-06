const buttons = document.querySelectorAll(".cuadrado");
let turno = true;
let in_game = true;
const btnReiniciar = document.getElementById("reiniciar")
let ganadasx = 0;
let ganadas0 = 0;
let empates = 0;
function update() {
    document.querySelector("#ganadasX").textContent = "Juegos ganados de X: " + ganadasx;
    document.querySelector("#ganadasY").textContent = "Juegos ganados de O: " + ganadas0;
}
function jugarTurnoDeMaquina() {
    const celdasVacias = [];
    buttons.forEach((celda, index) => {
        if (celda.textContent === "") {
            celdasVacias.push(index);
        }
    });
    const indiceAleatorio = Math.floor(Math.random() * celdasVacias.length);
    const celdaAleatoria = celdasVacias[indiceAleatorio];
    buttons[celdaAleatoria].textContent = "O";
    turno = !turno;
    if (ganador() !== -1) {
        mostrarResultado();
    }
}
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        if (turno && e.target.textContent === "" && in_game) {
            e.target.textContent = "X";
            turno = !turno;
            if (ganador() === 1) {
                document.querySelector("#winner").textContent = alert("El Ganador fue X");
                ganadasx++;
                update();
            } else if (ganador() === -1) {
                document.querySelector("#winner").textContent = alert("Empate");
                empates++;
                update();
            } else {
                jugarTurnoDeMaquina(); 
            }
        }
    });
}
btnReiniciar.addEventListener("click", () => {
    
    in_game = true;
    let boton2 = Array.from(buttons)
    boton2.forEach(borrar=>borrar.innerHTML="")
    document.querySelector("#winner").textContent = "";
    contador = 0;
});
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
let contador = 0;
function ganador() {
    for (let i = 0; i < list.length; i++) {
        if (buttons[list[i][0]].textContent === "X" && buttons[list[i][1]].textContent === "X" &&
            buttons[list[i][2]].textContent === "X") {
            in_game = false;
            return 1;
        } else if (buttons[list[i][0]].textContent === "O" && buttons[list[i][1]].textContent === "O" &&
            buttons[list[i][2]].textContent === "O") {
            in_game = false;
            return 0;
        }
    }
    if (contador === 9) {
        in_game = false;
        return -1;
    }
}
function mostrarResultado() {
    if (ganador() === 1) {
        document.querySelector("#winner").textContent = "El Ganador fue X";
        ganadasx++;
        update();
    } else if (ganador() === 0) {
        document.querySelector("#winner").textContent = "El Ganador fue O";
        ganadas0++;
        update();
    } else {
        empates++;
        update();
    }
}