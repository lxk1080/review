﻿// JavaScript Document

//鸭式辩型法 实现接口（最完美的js实现接口的方式）

//实现核心：一个类实现接口的主要目的：把接口里的方法都实现（可以检测接口的方法是否实现）
//优点：完全面向对象   代码实现统一   解耦性好

// 01 创建接口类  class interface  可以实例化多个接口
// 参数1：接口名  参数2：接收方法名称的数组(array)

var Global = {};  //命名空间

Global.Interface = function (name, methods) {

  //判断接口的参数个数
  if (arguments.length !== 2) {
    throw new Error('接口实例对象参数长度必须为2');
  }

  this.name = name;

  this.methods = [];  //定义空数组接收方法名

  //遍历方法名数组，防止方法名错误
  for (var i = 0; i < methods.length; i++) {
    if (typeof methods[i] !== 'string') {
      throw new Error("接口方法名'" + methods[i] + "'类型错误");
    }

    this.methods.push(methods[i]);
  }
}

//实例化两个接口
//var CompositeInterface = new Global.Interface(CompositeInterface,['add','remove']);
//var FormItemInterface = new Global.Interface(FormItemInterface,['update','select']);


//________________________________________________________________________
/*
//接口实现类
function CompositeImpl(){

}

//实现接口中的方法
CompositeImpl.prototype.add = function(obj){
      //do something
      alert('add...');
  }
CompositeImpl.prototype.remove = function(obj){
      //do something
  }
CompositeImpl.prototype.update = function(obj){
      //do something
  };
CompositeImpl.prototype.select = function(obj){
      //do something
  }

*/

//_____________________________________________________________________

//检测接口里的方法是否在实现类中实现（核心方法）
//检验通过，不做操作，检验失败，抛出异常

Global.Interface.ensureImplements = function (object) {

  //接口检测方法接收的参数小于两个，参数传递失败
  if (arguments.length < 2) {
    throw new Error('接口检测的方法的参数必须 >=2 ！');
  }

  //传入的参数中，第一个是检验的对象，后面的才是要检验的接口
  for (var i = 1; i < arguments.length; i++) {

    //接收要检验的接口对象
    var instanceInterface = arguments[i];

    //判断参数是否是接口类型
    if (instanceInterface.constructor !== Global.Interface) {
      throw new Error("参数'" + instanceInterface + "'不是一个接口");
    }

    //遍历接口实例对象中的每一个方法
    for (var j = 0; j < instanceInterface.methods.length; j++) {

      //用一个临时变量接收每一个方法的名字
      var methodName = instanceInterface.methods[j];

      //检验实例对象中是否有该方法
      if (!object[methodName] || typeof object[methodName] !== 'function') {
        throw new Error("方法名'" + methodName + "'不存在，未完全实现接口");
      }
    }
  }
}


//var c = new CompositeImpl();

//检测实例对象 c 中是否有后面的两个接口
//Global.Interface.ensureImplements(c,CompositeInterface,FormItemInterface);

//c.add();
