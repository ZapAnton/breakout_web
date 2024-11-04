const FIELD_WIDTH = 900;
const FIELD_HEIGHT = 600;
const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;
const PADDLE_COLOR = "#0095DD";
const BALL_COLOR = "#0095DD";
const BALL_RADIUS = 10;
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
canvas.width = FIELD_WIDTH;
canvas.height = FIELD_HEIGHT;
const paddleX = (canvas.width - PADDLE_WIDTH) / 2;
const ballX = canvas.width / 2;
const ballY = canvas.height - 30;

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    context.fillStyle = PADDLE_COLOR;
    context.fill();
    context.closePath();
}

function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
    context.fillStyle = BALL_COLOR;
    context.fill();
    context.closePath();
}

function main() {
    drawBall();
    drawPaddle();
}

main();
