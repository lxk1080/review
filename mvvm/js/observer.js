function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function (data, key, val) {
        var dep = new Dep(); // 某一个属性的观察者列表
        var childObj = observe(val); // 递归，使data对象可以嵌套对象
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            // 在watcher对象被实例化时，会调用get方法，并在此时将watcher添加到dep中
            get: function getter() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function setter(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify(); // Observer通知dep对象发生改变，至于是谁发生改变Observer不关心
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        // 由于不知道是谁发生了改变，所以让所有的观察者检查数据更新
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
};
Dep.target = null;
