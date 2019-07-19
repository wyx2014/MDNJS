typeof 123; // 'number'
typeof NaN; // 'number'
typeof 'str'; // 'string'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof Math.abs; // 'function'
typeof null; // 'object'
typeof []; // 'object'
typeof {}; // 'object'

typeof new Number(123); // 'object'
console.log(new Number(123) === 123); // false
console.log(Number(123) === 123); // true
typeof new Boolean(true); // 'object'
console.log(new Boolean(true) === true); // false
console.log(Boolean(true) === true); // true
typeof new String('str'); // 'object'
console.log(new String('str') === 'str'); // false
console.log(String('str') === 'str'); // true
//所以闲的蛋疼也不要使用包装对象！尤其是针对string类型！！！
//是不是感觉头大了？这就是JavaScript特有的催眠魅力！
//
// 总结一下，有这么几条规则需要遵守：
//
// 不要使用new Number()、new Boolean()、new String()创建包装对象；
//
// 用parseInt()或parseFloat()来转换任意类型到number；
//
// 用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；
//
// 通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；
//
// typeof操作符可以判断出number、boolean、string、function和undefined；
//
// 判断Array要使用Array.isArray(arr)；
//
// 判断null请使用myVar === null；
//
// 判断某个全局变量是否存在用typeof window.myVar === 'undefined'；
//
// 函数内部判断某个变量是否存在用typeof myVar === 'undefined'。
//
// 最后有细心的同学指出，任何对象都有toString()方法吗？null和undefined就没有！确实如此，这两个特殊值要除外，虽然null还伪装成了object类型。
console.log(12.3.toString());
console.log(123..toString()); // '123', 注意是两个点！
console.log((123).toString()); // '123'

//Date
if(Date.now){
   console.log(Date.now());
   var date = new Date(Date.now()).toLocaleString();
   console.log(date);
}else {
    console.log(new Date().getTime());
}

//RegExp
var re = /^\d{3}\-\d{3,8}$/
console.log(re.test('010-12345'));
console.log(re.test('010-123452222'));
console.log(re.test('0102345'));
//切割字符串
console.log('aa b  c'.split(' '));
console.log('aa b  c'.split(/\s+/));
console.log('a,b , c,,'.split(/[\s\,]+/));
console.log('aa,b;; c  d'.split(/[\s\,\;]+/));
var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
console.log(re.exec('19:05:30')); // ['19:05:30', '19', '05', '30']

var re = /^(\d+?)(0*)$/;
console.log(re.exec('102300'));
var re = /^(\d+)(0*)$/;
console.log(re.exec('102300')); // ['102300', '102300', '']

var re = /^\w+\.?\w+\@\w+\.{1}\w+$/

// 测试:
var
    i,
    success = true,
    should_pass = ['someone@gmail.com', 'bill.gates@microsoft.com', 'tom@voyager.org', 'bob2015@163.com'],
    should_fail = ['test#gmail.com', 'bill@microsoft', 'bill%gates@ms.com', '@voyager.org'];
for (i = 0; i < should_pass.length; i++) {
    if (!re.test(should_pass[i])) {
        console.log('测试失败: ' + should_pass[i]);
        success = false;
        break;
    }
}
for (i = 0; i < should_fail.length; i++) {
    if (re.test(should_fail[i])) {
        console.log('测试失败: ' + should_fail[i]);
        success = false;
        break;
    }
}
if (success) {
    console.log('测试通过!');
}

var re1 = /^\<(\w+\s?\w+)\>\s?(\w+\.?\w+\@\w+\.\w+)$/;
// 测试:
var r = re1.exec('<Tom Paris> tom@voyager.org');
if (r === null || r.toString() !== ['<Tom Paris> tom@voyager.org', 'Tom Paris', 'tom@voyager.org'].toString()) {
    console.log('测试失败!');
}
else {
    console.log('测试成功!');
}

//JSON JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。

var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};
var s = JSON.stringify(xiaoming, null, ' ');
console.log(s);

var obj = JSON.parse('{"name":"小明","age":14}', function (key, value) {
    if (key === 'name') {
        return value + '同学';
    }
    return value;
});
console.log(JSON.stringify(obj)); // {name: '小明同学', age: 14}
