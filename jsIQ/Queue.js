// 模拟队列数据结构（先进先出）
function Queue(){
  this.items = [];
}
Queue.prototype = {
  constructor:Queue,
  // 添加
  enqueue:function(item){
    this.items.push(item);
  },
  // 移除
  dequeue:function(){
    return this.items.shift();
  },
  // 队列最前
  front:function(){
    return this.items[0];
  },
  isEmpty:function(){
    return this.items.length == 0;
  },
  size:function(){
    return this.items.length;
  },
  clear:function(){
    this.items = [];
  },
  print:function(){
    console.log(this.items.toString());
  }
};

// 模拟最小优先队列的添加（把优先级的值较小的元素放置在队列最前面）
function PriorityQueue() {
  Queue.call(this)
}
PriorityQueue.prototype = Object.create(Queue.prototype);
PriorityQueue.prototype.constructor = PriorityQueue;
// 添加
// 参数：el: 添加的元素 priority: 优先级
PriorityQueue.prototype.enqueue = function(el, priority) {
  function QueueEl(el, priority) {
    this.el = el;
    this.priority = priority;
  }
  var queueEl = new QueueEl(el, priority);
  if (this.isEmpty()) {
    this.items.push(queueEl)
  } else {
    var added = false;
    var len = this.items.length;
    for (var i = 0; i < len; i++) {
      if (queueEl.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueEl);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(queueEl);
    }
  }
};
// 打印
PriorityQueue.prototype.print = function(){
  var result ='';
  for(var i = 0; i < this.items.length; i++){
    result += JSON.stringify(this.items[i]);
  }
  return result;
};

var priorityQueue = new PriorityQueue();
priorityQueue.enqueue('q', 2);
priorityQueue.enqueue('q', 4);
priorityQueue.enqueue('q', 1);
priorityQueue.enqueue('q', 3);
console.log(priorityQueue.print());