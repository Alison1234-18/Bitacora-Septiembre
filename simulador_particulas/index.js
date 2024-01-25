const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Definir una clase de partícula
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        };
        this.mass = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    update(particles) {
        this.draw();

        // Verificar colisiones con las paredes
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocity.y = -this.velocity.y;
        }

        // Verificar colisiones con otras partículas
        particles.forEach(particle => {
            if (this === particle) return;

            const distance = Math.hypot(this.x - particle.x, this.y - particle.y);
            if (distance - this.radius - particle.radius < 0) {
                // Colisión elástica
                const angle = Math.atan2(particle.y - this.y, particle.x - this.x);
                const sine = Math.sin(angle);
                const cosine = Math.cos(angle);

                const thisVelocity = {
                    x: this.velocity.x * cosine + this.velocity.y * sine,
                    y: this.velocity.y * cosine - this.velocity.x * sine
                };

                const particleVelocity = {
                    x: particle.velocity.x * cosine + particle.velocity.y * sine,
                    y: particle.velocity.y * cosine - particle.velocity.x * sine
                };

                const totalMass = this.mass + particle.mass;
                const thisFinalVelocity = {
                    x: ((this.mass - particle.mass) * thisVelocity.x + 2 * particle.mass * particleVelocity.x) / totalMass,
                    y: thisVelocity.y
                };

                const particleFinalVelocity = {
                    x: ((particle.mass - this.mass) * particleVelocity.x + 2 * this.mass * thisVelocity.x) / totalMass,
                    y: particleVelocity.y
                };

                this.velocity.x = thisFinalVelocity.x;
                this.velocity.y = thisFinalVelocity.y;

                particle.velocity.x = particleFinalVelocity.x;
                particle.velocity.y = particleFinalVelocity.y;
            }
        });

        // Actualizar posición basada en la velocidad
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

// Crear partículas
const particles = [];
for (let i = 0; i < 50; i++) {
    const radius = 10;
    const x = Math.random() * (canvas.width - 2 * radius) + radius;
    const y = Math.random() * (canvas.height - 2 * radius) + radius;
    const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
    particles.push(new Particle(x, y, radius, color));
}

// Animación
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update(particles);
    });
}

animate();
