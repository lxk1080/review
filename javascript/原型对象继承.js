// JavaScript Document

		//实现只继承父类的原型对象
		//参数： 子类  父类
		//var LXK = {};  //在上面的一个引入中已经有这一句了
		
		LXK.extend = function(sub , sup){
			
				var F = new Function();  //创建一个空函数进行中转
				
				F.prototype = sup.prototype;
				
				sub.prototype = new F();  //原型继承
				
				sub.prototype.constructor = sub;  //还原子类的构造器
				
				//保存父类的原型对象，一方面方便解耦，另一方面方便获得父类的原型对象
				sub.superClass = sup.prototype;  //自定义子类静态属性，接收父类的原型对象
				
				//判断父类原型对象的构造器并还原
				if( sup.prototype.constructor == Object.prototype.constructor){
						sup.prototype.constructor = sup;
					}
			}