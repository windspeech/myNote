(function() {

    // 简单工厂模式

    function CreateObject(name, age) {
        var obj = new Object();
        obj.name = name;
        obj.age = age;
        obj.sayName = function() {
            return this.name + "...";
        }
        return obj;
    }

    /*
     * 解决了多个相似的创建问题
     * 但，对象识别问题无法解决（即对象的类型不知道）
     */


    // var p1 = new CreateObject("张三","12");
    // var p2 = new CreateObject("李四","15");
    // console.log(p1.sayName()); // 张三...
    // console.log(p2.sayName()); // 李四...
    // console.log(typeof p1); // Object
    // console.log(typeof p2); // Object
    // console.log(p1 instanceof Object); // true



    // 复杂工厂模式
    // 将其成员对象的实例化推迟到子类中，子类可以重写父类接口方法以便创建的时候指定自己的对象类型

    var BicycleShop = function(name) {
        this.name = name;
        this.method = function() {
            return this.name;
        }
    };

    BicycleShop.prototype = {
        constructor: BicycleShop,

        /*
         * 买自行车方法
         * @param {model} 自行车型号
         */
        sellBicycle: function(model) {
            var bicycle = this.createBicycle(model);

            // 执行A业务逻辑
            bicycle.A();

            // 执行B业务逻辑
            bicycle.B();

            return bicycle;
        },

        //创建
        createBicycle: function(model) {
            throw new Error("父类是抽象类不能直接调用，需要子类重写该方法");
        }
    };

    // 实现原型继承
    function extend(Sub, Sup) {

        // 定义空函数
        function F() {}

        // 设置空函数的原型为超类原型
        F.prototype = Sup.prototype;

        // 实例化空函数，并把超类原型引用传给子类
        Sub.prototype = new F();

        // 重置子类原型的构造器为子类自身
        Sub.prototype.constructor = Sub;

        // 在子类中保存超类的原型，避免子类与超类耦合
        Sub.sup = Sup.prototype;

        if (Sup.prototype.constructor === Object.prototype.constructor) {
            // 检测超类原型的构造器是否为原型自身
            Sup.prototype.constructor = Sup;
        }

    }

    var BicycleChild = function(name) {

        this.name = name;

        // 继承构造函数父类的属性和方法
        BicycleShop.call(this, name);
    };

    // 继承父类原型方法
    extend(BicycleChild, BicycleShop);

    BicycleChild.prototype.createBicycle = function(model) {
        var that = this;
        var A = function() {
            console.log("执行A业务" + model);
        };
        var B = function() {
            console.log("执行B业务" + that.name)
        };

        return {
            A: A,
            B: B
        }
    };

    // var childClass = new BicycleChild("凤凰");
    // console.log(childClass.sellBicycle("永久"));


    // 单体模式
    // 1.可以用来划分命名空间
    // 2.使用单体模式可以使代码组织的更为一致，使代码容易阅读和维护
    // 3.可以被实例化，且实例化一次

    function Singleton() {
        return "wind";
    };
    function Singletons() {
        return "windss";
    };
    // 获取实例对象
    var getInstance = function(fn) {
        var result;
        return function() {
            return result || (result = fn.call(this, arguments));
        }
    };

    var a = getInstance(Singleton);
    var b = getInstance(Singletons);
    console.log(a()===b())
    console.log(a())
    console.log(b())


    // 模块模式
    // 模块模式的思路是为单体模式添加私有变量和私有方法，减少全局变量的使用
    // 如下：模块模式基础结构
    // var singleModel = (function (){
    //     // 私有变量
    //     var privateNum = 11;
    //     // 私有函数
    //     function _privateFn() {
    //         // 实现自己业务逻辑代码
    //     };
    //     // 返回共有方法和属性
    //     return {
    //         publicMethod1: publicMethod1,
    //         publicMethod2: publicMethod2
    //     };
    // })();

    // 使用场景--创建对象并以某些数据初始化，同时公开一些能够访问这些私有数据的方法

    // 增强的模块模式
    // 使用场合：适合那些单例必须是某种类型的实例，同事要添加某些属性或方法对其加以增强的情况，如下代码结构
    function CunstomType() {
        this.name = 'winds';
    }
    CunstomType.prototype.getName = function() {
        return this.name;
    }
    var application = (function() {
        // 私有变量
        var privateA = "aa";
        // 私有函数
        function A() {};

        // 实例化对象，返回该实例，为该实例增加公有属性和方法
        var obj = new CunstomType();

        // 添加公有属性
        obj.A = "aa";
        // 添加公有方法
        obj.B = function() {
            return privateA;
        };
        // 返回对象
        return obj;
    })();
    // console.log(application)


    // 代理模式
    // 代理模式最基本的形式是对访问进行控制，而本体对象则负责执行所分派的那个对象的函数或者类，简单的讲本体对象注重的去执行页面上的代码，代理则控制本地对象何时被实例化，何时被使用；
    // 优点：
    // 1.代理对象可以代替本地对象被实例化，并使其可以被远程访问；
    // 2.它还可以把本地实例化推迟到真正需要的时候；对于实例化比较费时的本地对象，或者因为尺寸大小以至于不用时不适于保存在内存中的本地，可以推迟实例化对象；
    // 基础代码结构

    // 代理人替ceo送礼物给妹子

    // 声明妹子对象
    var TargetGirl = function(name) {
        this.name = name;
    };
    // 声明CEO先生
    // 本地对象
    var Ceo = function(girl) {
        this.girl = girl;
        this.sendMarriageRing = function(ring) {
            console.log("Hi " + this.girl.name + ", ceo送你一个礼物：" + ring);
        }
    };
    // 声明代理人
    var ProxyObj = function(girl) {
        this.girl = girl;
        // 代理人代替送礼物给妹子
        this.sendGift = function(gift) {
            // 代理模式负责本体对象实例化
            (new Ceo(this.girl)).sendMarriageRing(gift);
        }
    }

    // var proxy = new ProxyObj(new TargetGirl("美丽女孩"));
    // proxy.sendGift('玫瑰花');

    // 代理模式编写预加载图片
    // 
    // var myImage = (function() {
    //     var imgNode = document.createElement('img');
    //     document.body.appendChild(imgNode);
    //     return function(src) {
    //         imgNode.src = src;
    //     };
    // })();
    // // 代理
    // var ProxyImage = (function() {
    //     var img = new Image();
    //     console.log(img)
    //     img.onload = function() {
    //         myImage(this.src);
    //     }
    //     return function(src) {
    //         myImage('http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif');
    //         img.src = src;
    //     };
    // })();
    // // 调用方式
    // ProxyImage("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png");

    // 代理模式-缓存代理

    // 计算乘法
    // var mult = function(){
    //     var a = 1;
    //     for(var i = 0,ilen = arguments.length; i < ilen; i+=1) {
    //         a = a*arguments[i];
    //     }
    //     return a;
    // };
    // // 计算加法
    // var plus = function(){
    //     var a = 0;
    //     for(var i = 0,ilen = arguments.length; i < ilen; i+=1) {
    //         a += arguments[i];
    //     }
    //     return a;
    // }
    // // 代理函数
    // var proxyFunc = function(fn) {
    //     var cache = {};  // 缓存对象
    //     return function(){
    //         var args = Array.prototype.join.call(arguments,',');
    //         if(args in cache) {
    //             return cache[args];   // 使用缓存代理
    //         }
    //         return cache[args] = fn.apply(this,arguments);
    //     }
    // };
    // var proxyMult = proxyFunc(mult);
    // console.log(proxyMult(1,2,3,4)); // 24
    // console.log(proxyMult(1,2,3,4)); // 缓存取 24

    // var proxyPlus = proxyFunc(plus);
    // console.log(proxyPlus(1,2,3,4));  // 10
    // console.log(proxyPlus(1,2,3,4));  // 缓存取 10


    // 职责链模式
    // 多个不同对象组成，发送者是发送请求的对象，而接受者则是链中那些接收这种请求并且对其进行处理或传递的对象。请求本身有时候也可以是一个对象，它封装了和操作有关的所有数据
    // 优点是：消除请求的发送者与接收者之间的耦合。
    /* 1. orderType(充值类型)，如果值为1的话，说明是充值500元的用户，如果为2的话，说明是充值200元的用户，如果是3的话，说明是没有充值的用户。
    2. isPay(是否已经成功充值了): 如果该值为true的话，说明已经成功充值了，否则的话 说明没有充值成功；就当作普通用户来购买。

    3. count(表示数量)；普通用户抽奖，如果数量有的话，就可以拿到优惠卷，否则的话，不能拿到优惠卷。
    */
    function order500(orderType, isPay, count) {
        if (orderType === 1 && isPay === true) {
            console.log("亲爱的用户，您中奖了100元红包了");
        } else {
            //我不知道下一个节点是谁,反正把请求往后面传递
            return "nextSuccessor";
        }
    }

    function order200(orderType, isPay, count) {
        if (orderType === 2 && isPay === true) {
            console.log("亲爱的用户，您中奖了20元红包了");
        } else {
            //我不知道下一个节点是谁,反正把请求往后面传递
            return "nextSuccessor";
        }
    }

    function orderNormal(orderType, isPay, count) {
        if (orderType === 3 && isPay === true) {
            console.log("亲爱的用户，您已抽到10元优惠券");
        } else {
            console.log("亲爱的用户，请再接再厉哦！");
        }
    }

    // 职责链-封装构造函数方法
    var Chain = function(fn) {
        this.fn = fn;
        this.successor = null;
    }
    Chain.prototype.setNextSuccessor = function(successor) {
            return this.successor = successor;
        }
        // 把请求往下传递
    Chain.prototype.passRequest = function() {
        var ret = this.fn.apply(this, arguments);
        if (ret === 'nextSuccessor') {
            return this.successor && this.successor.passRequest.apply(this.successor, arguments);
        }
        return ret;
    }

    //现在我们把3个函数分别包装成职责链节点：
    // var chainOrder500 = new Chain(order500);
    // var chainOrder200 = new Chain(order200);
    // var chainOrderNormal = new Chain(orderNormal);

    // // 然后指定节点在职责链中的顺序
    // chainOrder500.setNextSuccessor(chainOrder200);
    // chainOrder200.setNextSuccessor(chainOrderNormal);

    // //最后把请求传递给第一个节点：
    // chainOrder500.passRequest(1, true, 500); // 亲爱的用户，您中奖了100元红包了
    // chainOrder500.passRequest(2, true, 500); // 亲爱的用户，您中奖了20元红包了
    // chainOrder500.passRequest(3, true, 500); // 亲爱的用户，您已抽到10元优惠卷 
    // chainOrder500.passRequest(1, false, 0); // 亲爱的用户，请再接再厉哦



    // 命令模式
    // 指的是一个执行某些特定事情的指令
    // 使用场景:有时候需要向某些对象发送请求,但是并不知道接收者是谁,也不知道请求的操作是什么,此时希望一种松耦合的方式来设计程序代码;使得请求发送者和请求接收者消除彼此代码中的耦合关系

    var b1 = document.getElementById('button1'),
        b2 = document.getElementById('button2'),
        b3 = document.getElementById('button3');

    // 定义setCommand函数，该函数负责往按钮上面安装命令，点击按钮后会执行command对象的execute()方法
    var setCommand = function(button, fn) {
        button.onclick = function() {
            fn();
        }
    };

    // 定义各个对象来完成自己的业务操作
    var MenuBar = {
        refresh: function() {
            alert("刷新菜单目录");
        }
    };

    var SubMenu = {
        add: function() {
            alert("增加子菜单");
        },
        del: function() {
            alert("删除子菜单");
        }
    };

    // // 命令类
    // // 刷新命令
    // var RefreshMenuBarCommand = function(receiver) {
    //     return function() {
    //         receiver.refresh();
    //     };
    // };
    // // 增加命令
    // var AddSubMenuCommand = function(receiver) {
    //     return function() {
    //         receiver.add();
    //     };
    // };
    // // 删除命令
    // var DelSubMenuCommand = function(receiver) {
    //     return function() {
    //         receiver.del();
    //     };
    // };

    // 把命令接收者传入到command中，并把command对象安装到button上面

    // var refreshBtn = RefreshMenuBarCommand(MenuBar);
    // var addBtn = AddSubMenuCommand(SubMenu);
    // var delBtn = DelSubMenuCommand(SubMenu);

    // setCommand(b1, MenuBar.refresh);
    // setCommand(b2, SubMenu.add);
    // setCommand(b3, SubMenu.del);




    // 模板方法模式   和复杂工厂模式类似
    // 模板方法模式由两部分组成，第一部分是抽象父类，第二部分是具体实现的子类，一般的情况下是抽象父类封装了子类的算法框架，包括实现一些公共方法及及封装子类中所有方法的执行顺序，子类可以继承这个父类，并且可以在子类中重写父类的方法，从而实现自己的业务逻辑。

    // 栗子:面试流程

    var Interview = function() {};
    // 笔试
    Interview.prototype.writtenTest = function() {
        console.log("笔试题！！！");
    };
    // 技术面试
    Interview.prototype.technicalInterview = function() {
        console.log("技术面试！！！");
    };
    // 领导面试
    Interview.prototype.leader = function() {
        console.log("leader面试！")
    };
    // 等通知
    Interview.prototype.waitNotice = function() {
        console.log("等通知！！")
    };
    // 模板方法，封装子类算法框架，指导子类的顺序
    Interview.prototype.init = function() {
        this.writtenTest();
        this.technicalInterview();
        this.leader();
        this.waitNotice();
    };
    // 原型链继承
    function iextend(Sub, Sup) {
        function F(){}
        F.prototype = Sup.prototype;
        Sub.prototype = new F();
        Sub.prototype.constructor = Sub;
        Sub.sup = Sup.prototype;
        if (Sup.prototype.constructor === Object.prototype.constructor) {
            Sup.prototype.constructor = Sup;
        }
    }

    var BaiduInterview = function() {};
    // BaiduInterview.prototype = new Interview();
    iextend(BaiduInterview, Interview);
    BaiduInterview.prototype.writtenTest = function() {
        console.log("百度的笔试题");
    };
    var baiduInterview = new BaiduInterview();
    baiduInterview.init();



    // 策略模式
    // 定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换
    // 优点：
    // 1.策略模式利用组合、委托等技术和思想，有效的避免很多if条件语句
    // 2.策略模式提供了开发-封闭原则，使代码更容易理解和扩展。
    // 3.代码复用

    // 栗子：奖金计算
    // 算法
    var bonusObj = {
        "A": function(salary) {
            return salary * 4;
        },
        "B": function(salary) {
            return salary * 3;
        },
        "C": function(salary) {
            return salary * 2;
        }
    };
    // 实现
    var calculateBonus = function(level, salary) {
        return bonusObj[level](salary);
    };
    // console.log(calculateBonus("A", 4000));


    // 发布-订阅模式
    // 又叫观察者模式，定义了对象间的一种一对多的关系，让多个观察者对象同时监听某个主体对象，当一个对象发生改变时，所有依赖于它的对象都将得到通知。
    // 优点：
    // 1.支持简单的广播通信，当对象状态发生改变时，会自动通知已经订阅过的对象。
    // 2.发布者与订阅者耦合性降低，发布者只管发布一条消息出去，他不关心这条消息如何被订阅者使用，同时，订阅者只监听发布者的事件名，只要发布者的事件名不变，他不管发布者如何改变；

    // 缺点：
    // 消耗时间和内存，过渡使用会使代码不好理解、不好维护等

    // 定义发布者
    var ObserEvent = (function() {

        var list = [],
            listen,
            remove,
            trigger;
        // 订阅
        listen = function(key, fn) {
            // 订阅消息添加到缓存列表
            if (!list[key]) {
                list[key] = [];
            }
            list[key].push(fn);
        };
        // 取消
        remove = function(key, fn) {
            var fns = list[key];
            if (!fns) return false;
            // 没有传入回调，表示取消所有key对应的订阅
            if (!fn) {
                fns && (fns.length = 0);
            } else {
                for (var i = fns.length - 1; i >= 0; i--) {
                    var _fn = fns[i];
                    if (_fn === fn) {
                        fns.splice(i, 1);
                    }
                }
            }
        };
        trigger = function() {
            var key = Array.prototype.shift.call(arguments);
            var fns = list[key];
            if (!fns || fns.length === 0) return;
            for (var i = 0, fn; fn = fns[i++];) {
                fn.apply(this, arguments);
            }
        };

        return {
            listen: listen,
            remove: remove,
            trigger: trigger
        }
    })();
    // 订阅消息
    // ObserEvent.listen('red', fn1 = function(color, size) {
    //     console.log("颜色是：" + color);
    //     console.log("尺码是：" + size);
    // });
    // ObserEvent.listen('black', function(color, size) {
    //     console.log("22颜色是：" + color);
    //     console.log("22尺码是：" + size);
    // });
    // ObserEvent.remove('red')
    // ObserEvent.trigger("red", "红色", 40);
    // ObserEvent.trigger("black", "黑色", 40);

    // 模块间通信
    var b = (function() {
        var div = document.getElementById("showcount");
        ObserEvent.listen('add', function(count) {
            div.innerHTML = count;
        });
    })();
    var a = (function() {
        var count = 0;
        var button = document.getElementById("count");
        button.onclick = function() {
            ObserEvent.trigger("add", count++);
        }
    })();

    // 中介者模式
    // 中介者模式作用是解除对象之间的耦合关系，增加一个中介后，所有的对象都是通过中介者来通信，而不是相互引用，所以当一个对象发生改变时，只需要通过中介者对象接口。中介者使各个对象之间耦合松散，而且可以独立的改变他们之间的交互。
    // 栗子
    var player = [];

    function Hero(name, teamColor) {
        this.state = 'live'; //玩家状态
        this.name = name;
        this.teamColor = teamColor;
    }
    Hero.prototype.win = function() {
        console.log(this.name + "Won");
    }
    Hero.prototype.lose = function() {
        console.log(this.name + "Lose");
    }
    Hero.prototype.die = function() {
        this.state = "dead";
        // 给中介者发送消息
        playerDirector.ReceiveMessage('playerDead', this);
    }
    Hero.prototype.remove = function() {
        // 给中介者发送消息
        playerDirector.ReceiveMessage('removePlayer', this);
    }
    Hero.prototype.changeTeam = function(color) {
        // 给中介者发送消息
        playerDirector.ReceiveMessage('changeTeam', this);
    }

    // 工厂类
    var heroFactory = function(name, teamColor) {
        var newHero = new Hero(name, teamColor);
        // 给中介者发送消息
        playerDirector.ReceiveMessage('addPlayer', newHero);
        return newHero;
    };

    var playerDirector = (function() {
        var players = [], // 保存所有玩家
            operations = {}; // 中介者可执行操作
        // 增加
        operations.addPlayer = function(player) {
                // 获取玩家队友的颜色
                var teamColor = player.teamColor;
                // 如果没有队伍，重新成立
                players[teamColor] = players[teamColor] || [];
                players[teamColor].push(player);
            }
            // 移除玩家
        operations.removePlayer = function(player) {
                var teamColor = player.teamColor;
                // 获取该队伍所有成员
                var teamPlayers = players[teamColor] || [];
                for (var i = 0; i < teamPlayers.length; i++) {
                    if (teamPlayers[i] === player) {
                        teamPlayers.splice(i, 1);
                    }
                }
            }
            // 换队
        operations.changeTeam = function(player, newTeamColor) {
                // 删除原队伍
                operations.removePlayer(player);
                // 改变队伍颜色
                player.teamColor = newTeamColor;
                // 增加
                operations.addPlayer(player);
            }
            // 死亡
        operations.playerDead = function(player) {
            var teamColor = player.teamColor;
            // 玩家所在队伍
            var teamPlayers = players[teamColor];

            var all_dead = true;

            for (var i = 0, player; player = teamPlayers[i++];) {
                if (player.state !== "dead") {
                    all_dead = false;
                    break;
                }
            }
            // all_dead为true，全部死亡
            if (all_dead) {
                for (var i = 0, player; player = teamPlayers[i++];) {
                    player.lose();
                }
                // 另一只队伍
                for (var color in players) {
                    if (color !== teamColor) {
                        var teamPlayers = players[color];
                        for (var i = 0, player; player = teamPlayers[i++];) {
                            player.win();
                        }
                    }
                }
            }
        }
        var ReceiveMessage = function() {
            var message = Array.prototype.shift.call(arguments);
            operations[message].apply(this, arguments);
        };
        return {
            ReceiveMessage: ReceiveMessage
        };
    })();

    // 红队
    var p1 = heroFactory("aa", 'red'),
        p2 = heroFactory("bb", 'red'),
        p3 = heroFactory("cc", 'red'),
        p4 = heroFactory("dd", 'red');

    // 蓝队
    var p5 = heroFactory("ee", 'blue'),
        p6 = heroFactory("ff", 'blue'),
        p7 = heroFactory("gg", 'blue'),
        p8 = heroFactory("hh", 'blue');
    // 让红队玩家全部死亡
    p1.die();
    p2.die();
    p3.die();
    p4.die();

})()
