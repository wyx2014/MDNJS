function sum() {
    var s = 0;
    //此处var和let，老版的var，声明后在函数中依然可以使用，
    //但是通过let声明后i变成块级作用域，函数中就用不了了，只能在for中使用
    for(var i=0;i<100;i++){
        s += (i+1);
    }
    i += 100;
    console.log(i);
    console.log(s);
    return s;
}
//之前老版var 通过大写的变量代表常量，但是还是可以修改的，
//const后就无法修改readonly;
const PI = 3.14;
// PI = 23;
sum();
var array = ['jack',['lilei','tom']];
// var x = array[0];
// var y = array[1];
// var z = array[2];
var [x, [y, z]] = array;
console.log(`x:${x}  y:${y}  z:${z}`);
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school',
    address: {
        city: 'Beijing',
        street: 'No.1 Road',
        zipcode: '100001'
    }
};
var {name:nameme,age,passport,level = 'A',address:{city}} = person;
console.log(`name:${nameme}  age:${age}  passport:${passport}  city:${city} level:${level}`);

var x=1, y=2;
[x, y] = [y, x]
console.log(`x: ${x} y:${y}`)

function buildDate({year, month, day, hour=0, minute=0, second=0}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}
console.log(buildDate({year: 2017, month: 1, day: 1}));

var xiaoming = {
    name: 'xiaoming',
    birth: 1991,
    age: function () {
        var y= new Date().getFullYear();
        return y - this.birth;
    },
    age1:function () {
        var that = this;
        function getAgeInside() {
            var y = new Date().getFullYear();
            return y - that.birth;
        }
        return getAgeInside();
    }
}
console.log(xiaoming.age);
console.log(xiaoming.age());
//要保证this指向正确，必须用obj.xxx()的形式调用！
var getage = xiaoming.age;
console.log(getage());
console.log(xiaoming.age1())

// apply
// 要指定函数的this指向哪个对象，可以用函数本身的apply方法，它接收两个参数，
// 第一个参数就是需要绑定的this变量，第二个参数是Array，表示函数本身的参数。
// 用apply修复getAge()调用：
function getAge() {
    return new Date().getFullYear()-this.birth;
}

var xiaohuang = {
    name: 'xiaohuang',
    birth: 1982,
    age: getAge
}

console.log(xiaohuang.age());
console.log(getAge.apply(xiaohuang,[]));

//另一个与apply()类似的方法是call()，唯一区别是：
//
// apply()把参数打包成Array再传入；
//
// call()把参数按顺序传入。
//
// 比如调用Math.max(3, 5, 4)，分别用apply()和call()实现如下：
// 对普通函数调用，我们通常把this绑定为null。
console.log(Math.max.apply(null,[3.,5,4]));
console.log(Math.max.call(null,3,5,4));

// 装饰器
// 利用apply()，我们还可以动态改变函数的行为。
//
// JavaScript的所有对象都是动态的，即使内置的函数，我们也可以重新指向新的函数。
//
// 现在假定我们想统计一下代码一共调用了多少次parseInt()，可以把所有的调用都找出来，
// 然后手动加上count += 1，不过这样做太傻了。最佳方案是用我们自己的函数替换掉默认的parseInt()：
var count = 0;
var oldParseInt = parseInt;

parseInt = function () {
    count ++;
    return oldParseInt.apply(null,arguments);
}

parseInt('222');
parseInt('23344');
parseInt('34');
console.log(count);

//高阶函数
function add(a,b,f) {
    return f(a) + f(b);
}
//map
var x = -5;
var y = 6;
console.log(add(x,y,Math.abs))

function pow(x) {
    return x*x;
}
var arr = [2,3,5,6,1];
var powarr = arr.map(pow);
var stringvar = arr.map(String)
console.log(powarr);
console.log(stringvar)

function product(arr) {
    return arr.reduce(function (x,y) {
        return x*y;
    });
}
// 测试:
if (product([1, 2, 3, 4]) === 24 && product([0, 1, 2]) === 0 && product([99, 88, 77, 66]) === 44274384) {
    console.log('测试通过!');
}
else {
    console.log('测试失败!');
}

function arr2number(arr){
    return arr.reduce(function (x,y) {
        return x*10+y;
    });
}

// 测试:
if (arr2number([1, 2, 3, 4]) === 1234 && arr2number([0, 1, 2]) === 12 ) {
    console.log('测试通过!');
}
else {
    console.log('测试失败!');
}

function string2Int(str) {
    return str.split('').map(function (x) {
        return +x;
    }).reduce(function (x,y) {
        return x*10+y;
    })
}
console.log(string2Int('23344'))

function normalize(arr) {
    return arr.map(function (x) {
        return x.toLowerCase().substring(0,1).toUpperCase()+x.toLowerCase().substring(1);
    });
}

console.log(normalize(['adam', 'LISA', 'barT']))

console.log(['1','10','12'].map(parseInt))
console.log(['1','10','12'].map(str => parseInt(str)))
console.log(['1','10','12'].map(function returnInt(x) {
    return parseInt(x,10);
}))
console.log(['1','12','10'].map(Number));


// filter
var arr = [1,2,3,4,6,7]
var filteredArr = arr.filter(function (a) {
    return a%2 === 0;
})
console.log(filteredArr);

var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var arred = arr.filter(function (item) {
    return item && item.trim();
})
console.log(arred);

//回调函数
var arr = ['Jack', 'Alex', 'Tom', 'Alex', 'Wyb', 'King', 'King'];
arr.filter(function (item,index,self) {
    console.log(item);
    console.log(index);
    console.log(self);
})
//清除重复元素
console.log(arr.filter(function (item,index,self) {
    return self.indexOf(item) === index;
}));

function isPrime(item) {
    if(item === 1){
        return false;
    }
    for (let i = 2; i < item; i++) {
        if (item % i === 0) {
            return false;
        }
    }
    return true;
}

function get_primes(arr) {
    return arr.filter(function isPrimeNum(item) {
        return  isPrime(item);
    });
}


// 测试:
var
    x,
    r,
    arr = [];
for (x = 1; x < 100; x++) {
    arr.push(x);
}
r = get_primes(arr);
if (r.toString() === [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].toString()) {
    console.log('测试通过!');
} else {
    console.log('测试失败: ' + r.toString());
}

//sort
//排序算法
//好坑爹啊
// 看上去正常的结果:
console.log(['Google', 'Apple', 'Microsoft'].sort()); // ['Apple', 'Google', 'Microsoft'];

// apple排在了最后:
console.log(['Google', 'apple', 'Microsoft'].sort()); // ['Google', 'Microsoft", 'apple']
//第二个排序把apple排在了最后，是因为字符串根据ASCII码进行排序，而小写字母a的ASCII码在大写字母之后。

// 无法理解的结果:
console.log([10, 20, 1, 2].sort()); // [1, 10, 2, 20]
//v这是因为Array的sort()方法默认把所有元素先转换为String再排序，
// 结果'10'排在了'2'的前面，因为字符'1'比字符'2'的ASCII码小

var arr = [10, 20,10, 1, 2];
var arred = arr.sort(function (x1,x2) {
    if(x1<x2){
        return -1;
    }else{
        return 1;
    }
})
console.log(arred);
var arr = ['Google', 'apple', 'Microsoft'];
console.log(arr.sort(function (x1,x2) {
    var upx1 = x1.toUpperCase();
    var upx2 = x2.toUpperCase();
    if(upx1<upx2){
        return -1;
    }else {
        return 1;
    }
}))

// array的其他用法
//every
var arr = ['Apple', 'aaa', 'orange'];
console.log(arr.every(function (s) {
    return s.length > 0;
}));

console.log(arr.every(function (s) {
    return s.toLowerCase() === s;
}));

//find
console.log(arr.find(function (s) {
    return s.toLowerCase() === s;
}));
console.log(arr.find(function (s) {
    return s.toUpperCase() === s;
}));

//findIndex
console.log(arr.findIndex(function (s) {
    return s.toLowerCase() === s;
}))
//找不到返回-1
console.log(arr.findIndex(function (s) {
    return s.toUpperCase() === s;
})); // -1

var arr = ['alex','jack','tom'];
arr.forEach(function (item) {
    console.log(item);
})






