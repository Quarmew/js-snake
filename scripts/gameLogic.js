const canvas = document.querySelector("#game"),
      context = canvas.getContext("2d"),
      score = document.querySelector("#score")

let grid = 16,
    count = 0;

let snake = {
    X: 160,
    Y: 160,
    dX: grid,
    dY: 0,
    cells: [],
    bodyLength: 3
};

function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}

let apple = {
    X: getRandomInt(0,25) * grid,
    Y: getRandomInt(0,25) * grid
}


score.textContent = 0;
function loop(){
    requestAnimationFrame(loop);
    if(++count < 16){
        return
    }
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);
    snake.X += snake.dX;
    snake.Y += snake.dY;
    if(snake.X < 0){
        snake.X = canvas.width - grid;
    }
    else if(snake.X >= canvas.width){
        snake.X = 0;
    }
    if(snake.Y < 0){
        snake.Y = canvas.height - grid;
    }
    else if(snake.Y >= canvas.height){
        snake.Y = 0;
    }
    snake.cells.unshift({
        X: snake.X,
        Y: snake.Y
    });
    if(snake.cells.length > snake.bodyLength){
        snake.cells.pop();
    }
    for (var i = 0; i < 25; i++) {
        for (var j = 0; j < 25; j++) {
            context.beginPath();
            context.fillStyle = ["#98FB98", "#00FA9A"][(i + j) % 2];
            context.fillRect(j * 16, i * 16, 16, 16);
            context.closePath();
        }
    }
    context.fillStyle = 'red';
    context.fillRect(apple.X, apple.Y, grid, grid);
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell,index){
        context.fillRect(cell.X,cell.Y, grid,grid);
        if(cell.X === apple.X && cell.Y === apple.Y){
            snake.bodyLength++;
            apple.X = getRandomInt(0,25) * grid;
            apple.Y = getRandomInt(0,25) * grid;
            score.textContent = Number(score.textContent) +1;
        }
        for(let i = index+1;i<snake.cells.length; i++){
            if(cell.X === snake.cells[i].X && cell.Y === snake.cells[i].Y){
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.bodyLength = 3;
                snake.dx = grid;
                snake.dy = 0;
                apple.X = getRandomInt(0,25) * grid;
                apple.Y = getRandomInt(0,25) * grid;
                score.textContent = 0;
            }
        }
    })
}

document.onkeydown = keydown;
function keydown(e){
    e = e || window.event;
    if(e.keyCode === 37 && snake.dX === 0){
        snake.dX = -grid;
        snake.dY = 0;
    }
    if(e.keyCode === 38 && snake.dY === 0){
        snake.dY = -grid;
        snake.dX = 0;
    }
    if(e.keyCode === 39 && snake.dX === 0){
        snake.dX = grid;
        snake.dY = 0;
    }
    if(e.keyCode === 40 && snake.dY === 0){
        snake.dY = grid;
        snake.dX = 0;
    }
    
}

requestAnimationFrame(loop);