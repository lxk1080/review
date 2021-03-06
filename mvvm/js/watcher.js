function Watcher(vm, exp, cb) {
    this.cb = cb; // 数据改变后的回调函数
    this.vm = vm; // vm实例
    this.exp = exp; // 被观察者，data对象的某一个key
    this.value = this.get();  // 将自己添加到watcher列表的操作
}

Watcher.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        var oldValue = this.value;
        var newValue = this.vm.data[this.exp];
        if (newValue !== oldValue) {
            // 数据更新
            this.value = newValue;
            // 这里一般为dom更新
            this.cb.call(this.vm, newValue, oldValue);
        }
    },
    get: function () {
        Dep.target = this;  // 缓存自己
        // 强制执行监听器里的get函数，可将观察者加入某一个key的观察者列表（this.exp就是代表data的key值）
        var value = this.vm.data[this.exp];
        Dep.target = null;  // 释放自己
        return value;
    }
};
