// 面向对象编程

var name = "The Window";

var object = {
    name : "My Object",
    getNameFunc : function(){
        var that = this;
        return function(){
            return that.name;
        };

    }

};
console.log(object.getNameFunc()());

function f1(){
    n=999;
}
f1();
console.log(n); // error


function f2() {
    var n =200;
    function f3() {
        return n;
    }
    return f3;
}

var x = f2();
console.log(x());