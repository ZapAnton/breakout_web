const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
canvas.width = FIELD_WIDTH;
canvas.height = FIELD_HEIGHT;
let paddleX = (canvas.width - PADDLE_WIDTH) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = 5;
let ballDY = -5;
let score = 0;
const bricks = [];
for (let col = 0; col < COLUMN_COUNT; ++col) {
    bricks[col] = [];
    for (let row = 0; row < ROW_COUNT; ++row) {
        bricks[col][row] = {x: 0, y: 0, isBroken: false}
    }
}
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    const rightKeyDown = e.key === "Right" || e.key === "ArrowRight";
    const leftKeyDown = e.key === "Left" || e.key === "ArrowLeft";
    if (rightKeyDown) {
        rightPressed = true;
    } else if (leftKeyDown) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    const rightKeyUp = e.key === "Right" || e.key === "ArrowRight";
    const leftKeyUp = e.key === "Left" || e.key === "ArrowLeft";
    if (rightKeyUp) {
        rightPressed = false;
    } else if (leftKeyUp) {
        leftPressed = false;
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

function detectBrickCollision() {
    for (let col = 0; col < COLUMN_COUNT; ++col) {
        for (let row = 0; row < ROW_COUNT; ++row) {
            const brick = bricks[col][row];
            if (brick.isBroken) {
                continue;
            }
            const ballHitsTheBrick = (ballX > brick.x) && 
                (ballX < brick.x + BRICK_WIDTH) &&
                (ballY > brick.y) &&
                (ballY < brick.y + BRICK_HEIGHT);
            if (ballHitsTheBrick) {
                ballDY = -ballDY;
                brick.isBroken = true;
                score += 1;
                if (score === ROW_COUNT * COLUMN_COUNT) {
                    alert("You Won!");
                    document.location.reload();
                }
            }
        }
    }
}

function moveBall() {
    const ballHitsTheWall = (ballX + ballDX > canvas.width - BALL_RADIUS) || (ballX + ballDX < BALL_RADIUS);
    const ballHitsTheCeiling = ballY + ballDY < BALL_RADIUS;
    if (ballHitsTheWall) {
        ballDX = -ballDX;
    }
    if (ballHitsTheCeiling) {
        ballDY = - ballDY;
    } else if (ballY + ballDY > canvas.height - BALL_RADIUS) {
        const ballHitsThePaddle = (ballX > paddleX) && (ballX < paddleX + PADDLE_WIDTH)
        if (ballHitsThePaddle) {
            ballDY = -ballDY;
        } else {
            if (confirm("Game Over. Restart?")) {
                document.location.reload();
            } else {
                document.location.reload();
            }
        }
    }
    ballX += ballDX;
    ballY += ballDY;
}

function movePaddle() {
    if (rightPressed && (paddleX < canvas.width - PADDLE_WIDTH)) {
        paddleX += PADDLE_MOVE_LENGTH;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= PADDLE_MOVE_LENGTH;
    }
}

function handleMovement() {
    moveBall();
    movePaddle();
}

function main() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    detectBrickCollision();
    handleMovement();
    requestAnimationFrame(main);
}

main();
