// @ts-nocheck
import '../call和apply方法实现'

describe('自定义 call', () => {
  it('绑定 this - 对象', () => {
    function fn() { return this }
    const res = fn.customCall({ x: 1 })
    expect(res).toEqual({ x: 1 })
  })
  it('绑定 this - 值类型', () => {
    function fn() { return this }
    const res = fn.customCall('abc')
    expect(res.toString()).toEqual('abc')
    const res1 = fn.customCall(null)
    expect(res1).not.toBeNull()
  })
  it('绑定参数', () => {
    function fn(a: number, b: number) { return a + b }
    const res = fn.customCall(null, 10, 20)
    expect(res).toBe(30)
  })
})

describe('自定义 apply', () => {
  it('绑定 this - 对象', () => {
    function fn() { return this }
    const res = fn.customApply({ x: 1 })
    expect(res).toEqual({ x: 1 })
  })
  it('绑定 this - 值类型', () => {
    function fn() { return this }
    const res = fn.customApply('abc')
    expect(res.toString()).toEqual('abc')
    const res1 = fn.customApply(null)
    expect(res1).not.toBeNull()
  })
  it('绑定参数', () => {
    function fn(a: number, b: number) { return a + b }
    const res = fn.customApply(null, [10, 20])
    expect(res).toBe(30)
  })
})
