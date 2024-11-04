const FIELD_WIDTH = 900;
const FIELD_HEIGHT = 600;
const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;
const PADDLE_COLOR = "#0095DD";
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
canvas.width = FIELD_WIDTH;
canvas.height = FIELD_HEIGHT;
const paddleX = (canvas.width - PADDLE_WIDTH) / 2;

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    context.fillStyle = PADDLE_COLOR;
    context.fill();
    context.closePath();
}

function main() {
    drawPaddle();
}

main();
