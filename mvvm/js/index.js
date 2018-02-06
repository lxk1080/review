function Vue (options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;
    // 将data对象绑定到vue实例上，并可以通过实例直接获取和设置，也就是用vue实例代理操作
    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    });
    // 设置监听器
    observe(this.data);
    // 模板编译
    new Compile(options.el, this);
    // 所有事情处理好后执行mounted函数
    options.mounted.call(this);
}

Vue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal;
            }
        });
    }
};
