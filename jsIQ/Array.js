// 按照年龄大小排序数组
var friends = [{name: 'L', age: '15'}, {name: 'K', age: '19'}, {name: 'G', age: '12'}];
friends.sort(function(a, b){
  if (a.age > b.age) {
    return 1
  } else if (a.age < b.age) {
    return -1
  } else {
    return 0
  }
});
console.log(friends);