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

// 交集
function getIntersection(a, b) {
  return Array.from(new Set(a.filter(v => new Set(b).has(v))));
}

// 并集
function union(a, b) {
  return Array.from(new Set(a.concat(b)));
}

// 差集
function differenceNew(a, b) {
  const aSet = new Set(a);
  const bSet = new Set(b);
  return Array.from(new Set(a.concat(b).filter(v => aSet.has(v) && !bSet.has(v))));
}
