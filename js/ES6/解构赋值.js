{
  let a = 1;
  let b = 2;
  [a,b] = [b,a];
  console.log(a, b);
}

{
  let a, b;
  ({a, b} = {a: 1, b: 2});
  console.log(a, b)
}

{
  function fn() {
    return [1, 2, 3, 4, 5]
  }
  let [a,,,,b] = fn()
  console.log(a, b)
}

{
  function fn() {
    return [1, 2, 3, 4, 5]
  }
  let [a, ...b] = fn()
  console.log(a, b)
}

{
  let data = {
    title: 'abc',
    test: [{
      title: 'test',
      desc: 'desc'
    }]
  }
  let {title:title1, test:[{title:title2, desc}]} = data
  console.log(title1, title2, desc)
}