// 数组的大小是固定的,从数组的起点或中间插入或移除的成本很高,因为需要移动元素
// 但是数组是可以直接访问任何位置的任何元素的（因为索引）
// 链表存储有序的元素集合,但不同于数组,链表中的元素在内存中并不是连续放置的
// 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成
// 相对于传统的数组,链表的一个好处在于,添加或移除元素的时候不需要移动其他元素
// 而要想访问链表中的一个元素,需要从起点(表头)开始迭代列表直到找到所需的元素
// 数组：查询快 增删慢
// 链表：查询慢 增删快

// 模拟链表的数据结构
function LinkedList() {
  // 链表的元素节点构造函数
  function Node(name) {
    this.name = name;
    this.next = null;
  }
  this.head = null; // 表头
  this.length = 0; // 链表长度
  // 通过对一个方法append判断就可以知道是否设置了prototype（防止创建多个链表时重复创建原型方法）
  if (typeof LinkedList.prototype.append === 'undefined') {
    // 添加元素
    LinkedList.prototype.append = function(name) {
      var node = new Node(name);
      var current = this.head;
      if (this.head === null) {
        this.head = node
      } else {
        while(current.next !== null) {
          current = current.next
        }
        current.next = node
      }
      this.length++
    };
    // 插入元素，成功返回true / 失败返回false
    LinkedList.prototype.insert = function(name, position) {
      // 限定插入范围
      if (position > -1 && position < this.length) {
        var node = new Node(name);
        var current = this.head;
        var previous = null;
        var index = 0;
        if (position === 0) {
          this.head = node;
          node.next = current;
        } else {
          while(index++ < position) {
            previous = current;
            current = current.next;
          }
          previous.next = node;
          node.next = current;
        }
        this.length++;
        return true
      } else {
        return false
      }
    };
    // 返回给定元素的索引，如果没有则返回-1
    LinkedList.prototype.indexOf = function(name) {
      var current = this.head;
      var index = 0;
      while(current) {
        if (current.name === name) {
          return index
        }
        current = current.next;
        index++;
      }
      return -1
    };
    //根据位置删除指定元素，成功返回元素 / 失败返回null
    LinkedList.prototype.removeAt = function(position) {
      // 限定删除范围
      if (position > -1 && position < this.length) {
        var previous = null;
        var current = this.head;
        var index = 0;
        if (position === 0) {
          this.head = current.next
        } else {
          while(index++ < position) {
            previous = current;
            current = current.next;
          }
          previous.next = current.next
        }
        this.length--;
        return current.name
      } else {
        return null
      }
    };
    //根据元素删除指定元素，成功返回元素 / 失败返回null
    LinkedList.prototype.remove = function(name) {
      var index = this.indexOf(name);
      return this.removeAt(index);
    };

    // 返回表头（包含所有元素）
    LinkedList.prototype.getHead = function() {
      return JSON.stringify(this.head)
    };
    // 判断链表是否为空
    LinkedList.prototype.isEmpty = function() {
      return this.length === 0
    };
    // 返回链表的长度
    LinkedList.prototype.size = function() {
      return this.length
    };
    // 将链表转化为数组
    LinkedList.prototype.toArray = function() {
      var res = [];
      var current = this.head;
      while (current) {
        res.push(current.name);
        current = current.next;
      }
      return res;
    }
  }
}

var linkedList = new LinkedList();
linkedList.append('1');
linkedList.append('2');
linkedList.append('3');
linkedList.append('4');
linkedList.append('5');

linkedList.insert('bbbbb', 2);

linkedList.remove('5');

console.log(linkedList.size());
console.log(linkedList.toArray());
console.log(linkedList.getHead());


