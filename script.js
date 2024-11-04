const FIELD_WIDTH = 900;
const FIELD_HEIGHT = 600;
const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;
const PADDLE_COLOR = "#0095DD";
const BALL_COLOR = "#0095DD";
const BRICK_COLOR = "#0095DD";
const BALL_RADIUS = 10;
const COLUMN_COUNT = 10;
const ROW_COUNT = 5;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 30;
const BRICK_OFFSET_LEFT = 30;

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
canvas.width = FIELD_WIDTH;
canvas.height = FIELD_HEIGHT;
const paddleX = (canvas.width - PADDLE_WIDTH) / 2;
const ballX = canvas.width / 2;
const ballY = canvas.height - 30;
const bricks = [];
for (let col = 0; col < COLUMN_COUNT; ++col) {
    bricks[col] = [];
    for (let row = 0; row < ROW_COUNT; ++row) {
        bricks[col][row] = {x: 0, y: 0, isBroken: false}
    }
}

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

function drawBricks() {
    for (let col = 0; col < COLUMN_COUNT; ++col) {
        for (let row = 0; row < ROW_COUNT; ++row) {
            if (bricks[col][row].isBroken) {
                continue;
            }
            const brickX = col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
            const brickY = row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
            bricks[col][row].x = brickX;
            bricks[col][row].y = brickY;
            context.beginPath();
            context.rect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
            context.fillStyle = BRICK_COLOR;
            context.fill();
            context.closePath();
        }
    }
}

function main() {
    drawBall();
    drawPaddle();
    drawBricks();
}

main();
