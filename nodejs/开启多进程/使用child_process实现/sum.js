
function sum (...args) {
  return args.reduce((prev, cur) => prev + cur, 0)
}

process.on('message', data => {
  if (data === 'start') {
    const total = sum(1, 2, 3, 4, 5)
    process.send(total)
  }
})
