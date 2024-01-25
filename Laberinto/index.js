document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("laberintoCanvas");
    const ctx = canvas.getContext("2d");

    const jugador = {
        x: 10,
        y: 10,
        tamaño: 20
    };

    const meta = {
        x: 380,
        y: 380,
        tamaño: 20
    };

    const laberinto = [
        { x: 0, y: 0, ancho: 400, alto: 10 },
        { x: 0, y: 390, ancho: 400, alto: 10 },
        { x: 0, y: 0, ancho: 10, alto: 400 },
        { x: 390, y: 0, ancho: 10, alto: 400 },
        { x: 50, y: 50, ancho: 10, alto: 300 },
        { x: 100, y: 100, ancho: 10, alto: 200 },
        { x: 150, y: 50, ancho: 10, alto: 200 },
        { x: 200, y: 250, ancho: 10, alto: 200 },
        { x: 250, y: 50, ancho: 10, alto: 200 },
        { x: 300, y: 150, ancho: 10, alto: 300 },
        { x: 150, y: 200, ancho: 10, alto: 50 },
        { x: 200, y: 250, ancho: 10, alto: 50 },
        { x: 250, y: 200, ancho: 10, alto: 50 },
        { x: 100, y: 300, ancho: 10, alto: 50 },
        { x: 150, y: 250, ancho: 10, alto: 50 },
        { x: 200, y: 300, ancho: 10, alto: 50 },
        { x: 400, y: 350, ancho: 10, alto: 50 },
        { x: 300, y: 400, ancho: 10, alto: 50 },
        { x: 350, y: 450, ancho: 10, alto: 50 },
    ];

    function dibujarJugador() {
        ctx.fillStyle = "#3498db";
        ctx.fillRect(jugador.x, jugador.y, jugador.tamaño, jugador.tamaño);
    }

    function dibujarMeta() {
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(meta.x, meta.y, meta.tamaño, meta.tamaño);
    }

    function dibujarLaberinto() {
        ctx.fillStyle = "#333";
        laberinto.forEach(pared => {
            ctx.fillRect(pared.x, pared.y, pared.ancho, pared.alto);
        });
    }

    function verificarVictoria() {
        if (
            jugador.x < meta.x + meta.tamaño &&
            jugador.x + jugador.tamaño > meta.x &&
            jugador.y < meta.y + meta.tamaño &&
            jugador.y + jugador.tamaño > meta.y
        ) {
            alert("¡Felicidades! Has alcanzado la meta.");
            reiniciarJuego();
        }
    }

    function reiniciarJuego() {
        jugador.x = 10;
        jugador.y = 10;
        dibujar();
    }

    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarLaberinto();
        dibujarJugador();
        dibujarMeta();
        verificarVictoria();
    }

    window.addEventListener("keydown", function (e) {
        const velocidad = 10;
        if (e.key === "ArrowRight" && !colisionConPared(jugador.x + velocidad, jugador.y)) {
            jugador.x += velocidad;
        } else if (e.key === "ArrowLeft" && !colisionConPared(jugador.x - velocidad, jugador.y)) {
            jugador.x -= velocidad;
        } else if (e.key === "ArrowDown" && !colisionConPared(jugador.x, jugador.y + velocidad)) {
            jugador.y += velocidad;
        } else if (e.key === "ArrowUp" && !colisionConPared(jugador.x, jugador.y - velocidad)) {
            jugador.y -= velocidad;
        }

        // Asegurar de que el jugador no se salga del área del laberinto
        jugador.x = Math.max(0, Math.min(jugador.x, canvas.width - jugador.tamaño));
        jugador.y = Math.max(0, Math.min(jugador.y, canvas.height - jugador.tamaño));

        dibujar();
    });

    function colisionConPared(x, y) {
        for (let i = 0; i < laberinto.length; i++) {
            if (
                x < laberinto[i].x + laberinto[i].ancho &&
                x + jugador.tamaño > laberinto[i].x &&
                y < laberinto[i].y + laberinto[i].alto &&
                y + jugador.tamaño > laberinto[i].y
            ) {
                return true;
            }
        }
        return false;
    }

    dibujar();
});
