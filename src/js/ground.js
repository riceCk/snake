//用于创建广场

//configVar.js中广场的定义  (起始x, 起始y， 宽度， 高度， dom) 大的div
var oGround = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAEWIDTH, YLEN * SQUAEWIDTH, document.createElement('div'));

//广场有一个数组的属性。
// oGround.SquareTable = [
//     [{}, {}, {}, {}, ....],
//     [{}, {}, {}, {}, ....],
//     [{}, {}, {}, {}, ....],
//     [{}, {}, {}, {}, ....],
// ]
//广场渲染 this.viewContent = document.createElement('div')
oGround.init = function(){
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = '#0ff';
    document.body.appendChild(this.viewContent);

    //创建一个二维数组，普遍div
    oGround.SquareTable = []; 
    for(var i = 0; i < XLEN; i++){
        this.SquareTable[i] = new Array(XLEN)
        for(j = 0; j < XLEN; j++){
            var newSquare = null;
            if(j == 0 || j == XLEN - 1 || i == 0 || i == XLEN - 1){
                //墙  SquareFactory中渲染
                newSquare = SquareFactory.create('Stone', j, i, 'black')
            }else{
                //地板
                newSquare = SquareFactory.create('Floor', j, i, 'orange')
            }
            this.SquareTable[i][j] = newSquare;
            //oGround.appendChild(newSquare);
            this.viewContent.appendChild(newSquare.viewContent);
        }
    }
}

//拆地板
oGround.remove = function(x, y){
    this.viewContent.removeChild(this.SquareTable[y][x].viewContent);
    this.SquareTable[y][x] = null;
}


//安装新对象的功能
oGround.append = function(square){
    this.SquareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent);
}