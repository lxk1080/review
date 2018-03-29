let util = (function () {
    let tObj = {};
    ['Null', 'Undefined', 'Number', 'String', 'Boolean', 'Object', 'Function', 'Array', 'RegExp', 'Date'].forEach((item) => {
        tObj['[object ' + item + ']'] = item.toLowerCase()
    });
    return {
        getType: function (obj) {
            return tObj[Object.prototype.toString.call(obj)] || 'object'
        },
        isType: function (obj, type) {
            return this.getType(obj) === type
        }
    }
})();

function copy(obj, deep) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    let target = util.isType(obj, 'array') ? [] : {};
    for (let key in obj) {
        let value = obj[key];
        if (deep && util.getType(value) === 'array' || util.getType(value) === 'object') {
            target[key] = copy(value)
        } else {
            target[key] = value
        }
    }
    return target
}

let obj = {
    name: 'lxk',
    age: '123',
    child: {
        name: 'child',
        age: '456'
    },
    arr: [1, 2, 3],
    run: function() {
        return this.name
    }
};

let obj2 = copy(obj, true);

obj2.name = 'qwer';
obj2.child.name = 'children';
obj2.arr = [1, 2, 3, 4];
obj2.run = function() {
    return this.name + 'haha'
};

console.log(obj);
console.log(obj2);
console.log(obj.run());
console.log(obj2.run());
