//创建一个蛇

var snake = new Snake();
// snake head tail 蛇头蛇尾
snake.head = null;
snake.tail = null;

//创建蛇  蛇运动默认方向向右
var DIRECTIONENUM = {
    UP: {
        x: 0, y: -1
    },
    DOWN: {
        x: 0, y: 1
    },
    LEFT: {
        x: -1, y: 0
    },
    RIGHT: {
        x: 1, y: 0
    }
}
snake.init = function(){
    // 创建 snakeHead Square snakeBody Square 蛇头蛇身
    // SquareFactory中的工厂里渲染
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'pink');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'pink');
    
    // 链表
    this.head = snakeHead;
    snakeHead.next = snakeBody1;
    snakeHead.last = null;

    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;

    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;
    this.tail = snakeBody2;

    //记录默认方向 预判蛇头下一方向
    this.direction = DIRECTIONENUM.RIGHT;

    //插入蛇头蛇身
    oGround.remove(snakeHead.x, snakeHead.y);
    oGround.append(snakeHead);
    oGround.remove(snakeBody1.x, snakeBody1.y);
    oGround.append(snakeBody1)
    oGround.remove(snakeBody2.x, snakeBody2.y);
    oGround.append(snakeBody2)
}
snake.move = function(ground){
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if(typeof square.touch =='function'){
        //square.touch()执行出来是一个字符串。MOVE、EAT、DIE
        this.strategies[square.touch()](this, square, ground);
        
    }
}

//snake触碰的三种方式
snake.strategies = {
    MOVE: function(snake, square, ground, fromEat){
        //新建新的身体，并显示在场景中
        // var snake = this;
        var newBody = SquareFactory.create("SnakeBody", snake.head.x, snake.head.y, 'pink');
        //snake.head.next == snakeBody1
        newBody.next = snake.head.next;
        // newBody.last = null;
        //newBody.next.last = snakeBody1.last;
        newBody.next.last = newBody;
        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        // 根据预判square的坐标来相应生成蛇头
        var newHead = SquareFactory.create("SnakeHead", square.x, square.y, 'red' )
        newHead.x = square.x;
        newHead.y = square.y;
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        ground.remove(newHead.x, newHead.y);
        ground.append(newHead);
        //永远更新新的蛇头
        snake.head = newHead;

        if(!fromEat){
            //删除尾巴
            var newFloor = SquareFactory.create("Floor", snake.tail.x, snake.tail.y, 'orange')
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            snake.tail = snake.tail.last
        }
        
    },
    EAT: function(snake, square, ground, fromEat){
        this.MOVE(snake, square, ground, true)
        oGame.food();
        oGame.score ++;
    },
    DIE: function(){
        oGame.over()        
    }
}
