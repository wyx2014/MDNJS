//闭包
function sum(arr) {
    return arr.reduce(function (x1,x2) {
        return x1+x2;
    })
}
console.log(sum([1,2,3,4,5]));

function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x1,x2) {
            return x1+x2;
        })
    }
    return sum;
}
var f1 = lazy_sum([1,2,3]);
var f2 =lazy_sum([1,2,3]);
//f1()和f2()的调用结果互不影响。
console.log(f1 === f2);
console.log(lazy_sum([1,2,34])());

// 闭包



var res  =  [{'name':'IC1923','number':35},{'name':'IF1923','number':88},{'name':'IC1912','number':88},{'name':'IC1924','number':12}]
console.log(res.filter(function (item) {
    return !item.name.search('IC')
}));

console.log(res.filter(function (item) {
    return item.name.search('IC') !== 1
    }).sort(function (x1,x2) {
    if(x1.number > x2.number){
        return -1;
    }else{
        return 1;
    }
})[0].number);


// function count() {
//     var arr = [];
//     for (var i=1;i<=3;i++){
//         arr.push(function () {
//             return i*i;
//         })
//     }
//     return arr;
// }
function count() {
    var arr = [];
    for(var i=1;i<=3;i++){
        arr.push((function (n) {
            return function () {
                return n*n;
            }
        })(i))
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
console.log(results[1]())

//全部都是16！原因就在于返回的函数引用了变量i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量i已经变成了4，因此最终结果为16。
//
// 返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。

//注意这里用了一个“创建一个匿名函数并立刻执行”的语法,
// 但是由于JavaScript语法解析的问题，会报SyntaxError错误，因此需要用括号把整个函数定义括起来：
console.log((function (x) {
    return x*x;
})(10));

//当然不是！闭包有非常强大的功能。举个栗子：
//
// 在面向对象的程序设计语言里，比如Java和C++，要在对象内部封装一个私有变量，可以用private修饰一个成员变量。
//
// 在没有class机制，只有函数的语言里，借助闭包，同样可以封装一个私有变量。我们用JavaScript创建一个计数器：

function create_counter(initial) {
    var x = initial || 0;
    return {
        inc:function () {
            x += 1;
            return x;
        }
    }
}

var y = create_counter(10);
console.log(y.inc());
console.log(y.inc());
console.log(y.inc());
var y1 = create_counter(20);
console.log(y1.inc());
console.log(y1.inc());
console.log(y1.inc());
//在返回的对象中，实现了一个闭包，该闭包携带了局部变量x，并且，
// 从外部代码根本无法访问到变量x。换句话说，闭包就是携带状态的函数，并且它的状态可以完全对外隐藏起来。

function make_pow(n){
    return function (x) {
        return Math.pow(x,n)
    }
}
var pow2 = make_pow(2);

var pow3 = make_pow(3);
console.log(pow2(10));
console.log(pow3(10));

//箭头函数
var fn = x => x*x;
console.log(fn(8));
var fn1 = (x,y) => x*x + 2*y*y;
console.log(fn1(1,3));
var fn2 = () => 3.14;
console.log(fn2())
var fn3 = (x,y,...rest) =>{
    console.log(rest);
    if(rest === null ||rest === undefined ||rest.length === 0){
        return x+y;
    }
    var sum = rest.reduce(function (x1,x2) {
        return x1+x2;
    })
    return sum+x+y;
}

console.log(fn3(1,2));

//如果要返回一个对象，就要注意，如果是单表达式，这么写的话会报错：
// SyntaxError:
x => { foo: x }

//因为和函数体的{ ... }有语法冲突，所以要改为：
var fn4 = x => ({ foo: x });
console.log(fn4(222));

// this
var obj = {
    birth: 1990,
    getAge: function () {
        var that = this;
        var fn = function () {
            console.log(that.birth);
            return new Date().getFullYear() - that.birth;
        }
        return fn();
    }
}


//由于this在箭头函数中已经按照词法作用域绑定了，所以，
// 用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略：
var obj1 = {
    birth:1990,
    getAge:function (year) {
        console.log(this.birth);
        var fn = (y) => y -this.birth;
        return fn.call({birth:2000},year)
    }

}

console.log(obj.getAge());
console.log(obj1.getAge(new Date().getFullYear()));
var arr = [10, 20, 1, 2];
var arred = arr.sort((x1,x2)=>{
    if(x1<x2){
        return -1;
    }else {
        return 1;
    }
});
console.log(arred);
//generator（生成器)

// 0,1,1,2
function fibs(n) {
    var arr = [0,1];
    var a = 0;
    var b = 1;
    while(arr.length<n){
        [a, b] = [b, a+b];
        arr.push(b);
    }
    return arr;
}
console.log(fibs(10));
//函数只能返回一次，所以必须返回一个Array。但是，如果换成generator，就可以一次返回一个数，
// 不断返回多次。用generator改写如下：

function* fibsg(max) {
    var a = 0;
    var b = 1;
    var n = 0;
    while(n<max){
        yield a;
        [a, b] = [b, (a+b)];
        n++;
    }
    return;
}

for (var x of fibs(10)){
    console.log(x);
}

var current_id = 0;

function* next_id() {
    var index = 0;
    while(true){
        index = index +1;
        yield index;
    }
    return;
}
var f = next_id();
f.next();
f.next();
current_id= f.next();

console.log(current_id);