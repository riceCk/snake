//提取的公共方法 -->继承函数

var jsUtil = {
    extends: function(origin){
        //通过apply方法借用父级的方法
        var result = function(){
            origin.apply (this, arguments);
        }
        this.inherit(result, origin);
        return result;
    },

    //圣杯模式的继承，但是子类只能继承原型
    inherit: function(target, origin){
        var temp = function(){};
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        temp.prototype.constructor = target;
    },
    //单例模式进行继承
    single: function(origin){
        var singleResult = (function(){
            var instance;
            return function(){
                if(typeof instance == 'object'){
                    return instance;
                }
                origin && origin.apply(this, arguments);
                instance = this;
            }
        })()
        origin && this.inherit(singleResult, origin); 
        return singleResult;
    },
    throttle: function(){
        //用于鼠标节流
    }
}



//extends放回一个构造函数，继承自Souare
// var Food = jsUtil.extends(Square);

//single 放回一个构造函数， 传参 继承参数，不传不继承   函数符合单利模式
// var Food = jsUtil.single(Square);
// var food = new Food()
