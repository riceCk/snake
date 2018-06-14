//游戏的加载启动
var oGame = new Game();
oGame.timer = null;
oGame.score = 0;
oGame.init = function(){
    oGround.init();
    snake.init();
    this.food();
    

    //需要修改按上节流
    document.onkeydown = function(e){
        //e.which 37 左  38上 39右 40下
        if(e.which == 37 && snake.direction !== DIRECTIONENUM.RIGHT){
            snake.direction = DIRECTIONENUM.LEFT;
        }else if(e.which == 38 && snake.direction !== DIRECTIONENUM.Down){
            snake.direction = DIRECTIONENUM.UP;
        }else if(e.which == 39 && snake.direction !== DIRECTIONENUM.LEFT){
            snake.direction = DIRECTIONENUM.RIGHT;
        }else if(e.which = 40 && snake.direction !== DIRECTIONENUM.UP){
            snake.direction = DIRECTIONENUM.DOWN;
        }
    }
}

oGame.start = function(){
    this.timer = setInterval(function(){
        snake.move(oGround);
    }, INTERVAL)
}
oGame.over = function(){
    alert('game over, 你的分数为' + this.score);
    clearInterval(this.timer);
}
oGame.food = function(){
    //生成食物；
    var x = null;
    var y = null;
    var flag = true;
    while(flag){
        x = 1 + parseInt(Math.random() * 27);
        y = 1 + parseInt(Math.random() * 27);
        var ok = true;
        for(var node = snake.head; node; node = node.next){
            console.log(node);
            
            if(x == node.x && y == node.y){
                ok = false;
                break;
            }
        }
        if(ok){
            flag = false;
        }
    }
    var food = SquareFactory.create('Food', x, y, 'green');
    oGround.remove(food.x, food.y);
    oGround.append(food);
}

// oGame.food = function(){
//     var sn = [];
//     var arr = [];
//     var x = null;
//     var y = null;
//     var flag = true;
//     for(var node = snake.head; node; node = node.next){
//         sn.push([node.x,node.y])
//     }

//     sn.forEach(function(ele){
//         arr = oGround.SquareTable.filter(function(tr,index){
//             if(tr[index].x != 0 && tr[index].y != 0 && tr[index].x != 27 && tr[index].y != 27 || tr[index].x != ele[0] || tr[index].y != ele[1]){
//                 return true
//             }
//         })
//     })
//     console.log(arr)
   
// }

oGame.init();
oGame.start();