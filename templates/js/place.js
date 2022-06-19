var socket = io("https://fierce-woodland-41082.herokuapp.com/");
// var socket = io();
var canvas = document.getElementById('placeCanvas');
var ctx = canvas.getContext('2d');
var width = 10;
var height = 10;
var currentColor = "#000000";
var size = 100;



var grid = [];
for (var i = 0; i < size; i++) {
    grid[i] = [];
    for (var j = 0; j < size; j++) {
        grid[i][j] = '#fff';
    }
}


// on window load alert the backend so it can serve the gird status
window.onload = function () {
    socket.emit('userJoined');
}


//draw the grid
function drawPixel(grid, x, y) {
    ctx.fillStyle = grid[x][y];
    ctx.fillRect(x * width, y * height, width, height);
}


function drawWholeGrid(grid) {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(i * width, j * height, width, height);
        }
    }
}

socket.on('serveGrid', function (newGrid) {
    grid = newGrid;
    drawWholeGrid(newGrid);
});


socket.on('newPixel', function (data) {
    grid[data.x][data.y] = data.color;
    drawPixel(grid, data.x, data.y);
});


canvas.addEventListener('click', function (e) {
    var x = Math.floor(e.offsetX / width);
    var y = Math.floor(e.offsetY / height);
    grid[x][y] = currentColor;
    ctx.fillStyle = currentColor;
    ctx.fillRect(x * width, y * height, width, height);
    //loop throught the grid
    socket.emit('gridStatus', {
        wholeGrid: grid,
        x: x,
        y: y,
        color: grid[x][y]
    });
});

var canvas = document.getElementById('placeCanvas');
var heightRatio = 1.5;
canvas.height = canvas.width * heightRatio;


$('#sidenav').find('a').each(function () {
    var innerDivId = $(this).attr('class');
    $(this).attr('style', 'background: #' + innerDivId + ';');
    $(this).bind('click', function () {
        currentColor = '#' + innerDivId;
        $(".notify").toggleClass("active");
        $("#notifyType").toggleClass("success");

        setTimeout(function () {
            $(".notify").removeClass("active");
            $("#notifyType").removeClass("success");
        }, 2000);
    });

});