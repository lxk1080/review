{
  class Parent {
    constructor(name = 'parent') {
      this.name = name
    }
  }
  let parent = new Parent()
  console.log(parent)
}

// 继承
{
  class Parent {
    constructor(name = 'parent') {
      this.name = name
    }
    getName() {
      console.log(this.name)
    }
  }

  class Child extends Parent {
    constructor(name = 'child') {
      super(name)
      this.type = 'child'
    }
  }

  let child = new Child('job')
  console.log(child)
  child.getName()
}

// getter、setter属性
{
  class Parent {
    constructor(name = 'parent') {
      this.name = name
    }

    get longName() {
      return this.name + ' -name'
    }

    set longName(name) {
      this.name = name
    }
  }

  let parent = new Parent()
  console.log(parent.longName)

  parent.longName = 'change'
  console.log(parent.longName)
}

// 静态方法
{
  class Parent {
    constructor(name = 'parent') {
      this.name = name
    }
    static getCode() {
      console.log('code')
    }
  }
  Parent.getCode()
}

// 静态属性
{
  class Parent {
    constructor(name = 'parent') {
      this.name = name
    }
  }
  Parent.code = '123456'
  console.log(Parent.code)
}