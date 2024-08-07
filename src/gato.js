document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll(".cuadrado");
    let turno = true; // true para X, false para O
    let in_game = true;
    const reiniciar = document.querySelector("#reiniciar");
    let contador = 0;

    // Estadísticas
    let ganadasX = 0;
    let ganadasO = 0;
    let empates = 0;

    function update() {
        // Actualiza las estadísticas en el DOM
        document.querySelector("#ganadasX").textContent = `Juegos ganados de X: ${ganadasX}`;
        document.querySelector("#ganadasO").textContent = `Juegos ganados de O: ${ganadasO}`;
        document.querySelector("#empates").textContent = `Juegos con Empates: ${empates}`;
    }

    function handleClick(e) {
        if (in_game && e.target.innerHTML === "") {
            e.target.innerHTML = turno ? "X" : "O";
            turno = !turno;
            contador++;

            const result = ganador();
            if (result !== -1) {
                // Mostrar el ganador y actualizar estadísticas
                document.querySelector("#winner").textContent = result === 0 ? "El Ganador fue O" : "El Ganador fue X";
                if (result === 0) {
                    ganadasO++;
                } else if (result === 1) {
                    ganadasX++;
                }
                in_game = false;
                update(); // Actualizar las estadísticas
            } else if (contador === 9) {
                // Si todas las casillas están llenas y no hay ganador, es un empate
                document.querySelector("#winner").textContent = "Empate";
                empates++;
                in_game = false;
                update(); // Actualizar las estadísticas
            }
        }
    }

    function resetGame() {
        // Reiniciar el juego
        in_game = true;
        contador = 0;
        buttons.forEach(button => button.textContent = "");
        document.querySelector("#winner").textContent = "";
    }

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

    function ganador() {
        for (let combination of list) {
            const [a, b, c] = combination;
            if (buttons[a].textContent && buttons[a].textContent === buttons[b].textContent && buttons[a].textContent === buttons[c].textContent) {
                return buttons[a].textContent === "X" ? 1 : 0; // Ganador X o O
            }
        }
        return -1; // No hay ganador
    }

    // Añadir los eventos a los botones
    buttons.forEach(button => button.addEventListener("click", handleClick));
    reiniciar.addEventListener("click", resetGame);

    // Actualiza las estadísticas al cargar
    update();
});
