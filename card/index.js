const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
const artInfo = document.getElementById("artInfo");

const artworks = [
    {
        name: "Artwork 1",
        description: "Una animación hipnótica.",
        draw: function (time) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const radius = 50;
            const x = canvas.width / 2 + Math.cos(time * 0.002) * 100;
            const y = canvas.height / 2 + Math.sin(time * 0.002) * 100;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = "blue";
            ctx.fill();
        },
    },
    {
        name: "Artwork 2",
        description: "Un patrón geométrico en movimiento.",
        draw: function (time) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const sideLength = 60;
            const angle = time * 0.002;
            const x = canvas.width / 2 + Math.cos(angle) * 100;
            const y = canvas.height / 2 + Math.sin(angle) * 100;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + sideLength, y);
            ctx.lineTo(x + sideLength / 2, y + (Math.sqrt(3) / 2) * sideLength);
            ctx.closePath();
            ctx.fillStyle = "red";
            ctx.fill();
        },
    },
    {
        name: "Artwork 3",
        description: "Una obra de arte abstracta.",
        draw: function (time) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const size = 50;
            const x = canvas.width / 2 + Math.cos(time * 0.001) * 100;
            const y = canvas.height / 2 + Math.sin(time * 0.001) * 100;
            ctx.fillStyle = "green";
            ctx.fillRect(x, y, size, size);
        },

    },
    {
        name: "Artwork 4",
        description: "Otra obra única.",
        draw: function (time, uniqueParameter) {
            // Código de la nueva obra de arte
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const radius = 30;
            const x = canvas.width / 2 + Math.cos(time * 0.003 + uniqueParameter) * 100;
            const y = canvas.height / 2 + Math.sin(time * 0.003 + uniqueParameter) * 100;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = "orange";
            ctx.fill();
        },
    },

];

let currentArtworkIndex = 0;

function changeArtwork() {
    currentArtworkIndex = (currentArtworkIndex + 1) % artworks.length;
    updateArtworkInfo();
}

function updateArtworkInfo() {
    const currentArtwork = artworks[currentArtworkIndex];
    artInfo.innerHTML = `<h2>${currentArtwork.name}</h2><p>${currentArtwork.description}</p>`;
}

function animate() {
    const currentArtwork = artworks[currentArtworkIndex];
    const currentTime = new Date().getTime();
    const uniqueParameter = Math.random();
    currentArtwork.draw(currentTime, uniqueParameter);
    requestAnimationFrame(animate);
}

// Inicialización
updateArtworkInfo();
animate();
