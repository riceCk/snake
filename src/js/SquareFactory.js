//工厂子类的渲染

function SquareFactory(){
    
}

SquareFactory.create = function(type, x, y, color){
    if(SquareFactory.prototype[type] == undefined){
        throw 'no this constructor';
    }
    if(SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype){
        jsUtil.inherit(SquareFactory.prototype[type], SquareFactory);
    }
    //创建所传type的子类。
    var newSquare = new SquareFactory.prototype[type](x, y, color); 
    return newSquare;
}
//为每个子对象渲染 square.viewConten == document.createElement('div')
SquareFactory.prototype.init = function(square, color, strategy){
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * SQUAEWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAEWIDTH + 'px';
    square.viewContent.style.width = SQUAEWIDTH + 'px';
    square.viewContent.style.height = SQUAEWIDTH + 'px';
    square.viewContent.style.backgroundColor = color;
    square.touch = function(){
        return strategy;
    }
}
//生产流水线
//地板
SquareFactory.prototype.Floor = function(x, y, color){
    var floor = new Floor(x, y, SQUAEWIDTH, SQUAEWIDTH, document.createElement('div'));
    this.init(floor, color, TOUCHENUM.MOVE)
    return floor;
}
//墙
SquareFactory.prototype.Stone = function(x, y, color){
    var stone = new Stone(x, y, SQUAEWIDTH, SQUAEWIDTH, document.createElement('div'));
    this.init(stone, color, TOUCHENUM.DIE)    
    return stone;
}

//食物
SquareFactory.prototype.Food = function(x, y, color){
    var food = new Food(x, y, SQUAEWIDTH, SQUAEWIDTH, document.createElement('div'));
    this.init(food, color,TOUCHENUM.EAT)
    food.upDate(x, y)
    return food;
}
SquareFactory.prototype.SnakeBody = function(x, y, color){
    var snakeBody = new SnakeBody(x, y, SQUAEWIDTH, SQUAEWIDTH, document.createElement('div'));
    this.init(snakeBody, color,TOUCHENUM.DIE)
    return snakeBody;
}
//蛇头每次更新的时候因为是单例。所以创建起来之后走init渲染的依旧是原始的坐标没有更新
SquareFactory.prototype.SnakeHead = function(x, y, color){
    var snakeHead = new SnakeHead(x, y, SQUAEWIDTH, SQUAEWIDTH, document.createElement('div'));
    this.init(snakeHead, color ,TOUCHENUM.DIE)
    snakeHead.upDate(x, y)
    return snakeHead;
}