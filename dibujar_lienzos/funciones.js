const canvas = document.getElementById('canvas');  // obtiene el elemento del lienzo del DOM
const ctx = canvas.getContext('2d');   //se obtiene en 2d el contexto del lienzo que se utilizara para dibujar
let painting = false;  //variable para saber si el usuario esta dibujando o no

function startposition(e) {       //esta funcion es cuando el usuario presiona el boton del raton. establece un  "painting" en true y llama la funcion "draw" para empezar a dibujar
    painting = true;
    draw(e);
}

function endposition() {    //esta funcion es cuando el usuario suelta el boton del rato y se establece un "painting" en false y reinicia el camnio para que no se buje una linea continua
    painting = false;
    ctx.beginPath();
}

function draw(e) {           //esta funcion es cuando el usuario mueve el mouse mientras mantiene presionado el boton, dibuja lineas en el lienzo mientras "painting" sea true
    if (!painting) return;
    const brushColor = document.getElementById('brush-color').value;
    const formattedColor = `#${brushColor.substr(1)}`; // Agrega '#' al inicio del código hexadecimal del color

    const brushSize = parseInt(document.getElementById('brush-size').value);

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'brushColor';
    ctx.strokeStyle = formattedColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

}

function clearcanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startposition);
canvas.addEventListener('mouseup', endposition);
canvas. addEventListener('mousemove', draw);

const clearbutton = document.getElementById('clearbutton');
clearbutton.addEventListener('click', clearcanvas);