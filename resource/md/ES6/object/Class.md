## 类: 构造函数的语法糖

### 传统构造函数的问题

1:属性和原型方法定义分离 降低了可读性
2:原型成员可被枚举
3:默认情况下 构造函数可以被当成普通函数使用

### 类的特点

1:类声明不会被提前 与 let const 一样 存在暂时性死区
2:类的所有代码均在严格模式下执行
3:类的所有方法都是不可枚举的
4:类的所有方法都无法当成构造函数使用
5:类的构造器必须使用 new 调用 不能被当成普通函数调用

### 类的书写方式

- 可计算属性名
- getter 和 setter //使用 getter 和 setter 控制的属性不在原型上 在实例上

```js
class User {
  constructor(name, age) {
    this.name = name
    this.age = age //调用set age()
  }
  //创建一个age存取器属性
  get age() {
    return this._age;
  }
  set age(val) {
    this._age = val;
  }
}
```

- 静态成员 static 关键字
  构造函数本身的成员

```js
class User{
    static type = 'person'

    static methods(){
        console.log('这是User的静态方法')
    }
    constructor(name){
        this.name = name,
    }
}
console.log(User.type) //person
console.log(User.methods()) //这是User的静态方法
```

- 字段初始化器 ES7

```js
class User {
  a = 1;
  //属于实例成员
  // 如果一些属性不需要通过参数获得 可以直接写在constructor外边
  //相当于constructor(){ this.a = 1 }

  print = () => {
    console.log("print");
  };
  //好处 绑定this
  //坏处 会占用额外的内存空间 相当于每次new一个都会产生一个print
  //箭头函数在字段初始化位置上 指向当前对象 相当于
  //constructor(){
  //   this.print = ()=>{console.log('print')
  //}

  hello() {
    console.log("哈哈");
  }
  //这是原型上的方法
}
var obj1 = new User();
var obj2 = new User();
console.log(obj1.print === obj2.print); // false
console.log(obj1.hello === obj2.hello); // true
```

- 类表达式

```js
const A = class {
  //匿名类 类表达式
};
const obj = new A();
```

- 类的继承
  如果 A 是 B 的父类 则 B 或自动拥有 A 中的所有实例成员

```js
class Animal {
  constructor(type, name, age, sex) {
    (this.type = type), (this.name = name), (this.age = age), (this.sex = sex);
  }
  print() {
    console.log(this.name);
    console.log(this.age);
    console.log(this.sex);
    console.log(this.type);
  }
  jiao() {
    console.log("哈哈哈");
  }
}
// super两种用法
class Dog extends Animal {
  constructor(name, age, sex) {
    // 1):直接当作函数调用   父类构造函数
    super("犬类", name, age, sex);
    (this.hobby = "睡觉"), (this.love = "吃骨头");
  }
  jiao() {
    console.log("旺旺");
  }
  print() {
    //  2):当作对象调用 调用父类的原型方法
    super.print();
    console.log(this.hobby);
    console.log(this.love);
  }
}
var dog = new Dog();
dog.jiao(); //旺旺  自己的方法
```

注意点:
1:如果定义了 constructor 并且该类是子类，则必须在 constructor 的第一行手动调用父类的构造函数
2:如果子类不写 constructor 则会有默认的构造器 该构造器需要的参数和父类一致 并且自动调用父类的 super()
3:通过继承的子类会自动继承父类的方法
4:父类和子类有相同的方法 会调用子类的

- 哲学思想
  1:抽象类 一般是父类 不能通过该类创建对象
  2:正常情况下 this 的指向 this 始终指向具体类的对象
