function flat(arr) {
    let res = []
    function each(arr) {
        arr.forEach((item) => {
            if (item instanceof Array) {
                each(item)
            } else {
                res.push(item)
            }
        })
    }
    each(arr)
    return res
}

let arr = [1, 2, [3, 4, [5, 6, 7], [4, 5]], [8, 9]]

console.log(flat(arr))