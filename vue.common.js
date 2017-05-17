nextTick方法
if promise
else if MutationObserver 监听DOM树变化
else setTimeout

function def (obj, key, val, enumerable) {//定义对象属性Object.defineProperty
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

Observer (__ob__) dep value
数组=>observeArray()  每个array属性添加__ob__
非数组=>walk() 遍历属性，调用defineReactive$$1

Dep 是 Observer 与 Watcher 之间的纽带，也可以认为 Dep 是服务于 Observer 的订阅系统。 
Watcher 订阅某个 Observer 的 Dep,当 Observer 观察的数据发生变化时，通过 Dep 通知各个已经订阅的 Watcher.
dep的方法：
addSub : 接收的参数为 Watcher 实例，并把 Watcher 实例存入记录依赖的数组中

removeSub : 与 addSub 对应，作用是将 Watcher 实例从记录依赖的数组中移除

depend : Dep.target 上存放这当前需要操作的 Watcher 实例，调用 depend 会调用该 Watcher 实例的 addDep 方法，

notify : 通知依赖数组中所有的 watcher 进行更新操作

observer每个对象的属性，添加到订阅器dep中

defineReactive$$1
设置对象的get和set方法，如果有Dep.target，dep.depend

defineReactive : 通过 Object.defineProperty 设置对象的key属性，使得能够捕获到该属性值的 set/get 动作。
一般是由 Watcher 的实例对象进行 get 操作，此时 Watcher 的实例对象将被自动添加到 Dep 实例的依赖数组中，
在外部操作触发了 set 时，将通过 Dep 实例的 notify 来通知所有依赖的 watcher 进行更新。

把观察对象的属性键值转换成getter/setters

971

object方法：
Object.getOwnPropertyNames
返回一个数组，该数组对元素是 obj 自身拥有的枚举或不可枚举属性名称字符串。
Object.keys 或用 for...in循环 获取可枚举属性
Object.isExtensible(obj)是否是可扩展的
// 密封对象是不可扩展的 Object.seal()
// 冻结对象也是不可扩展 Object.freeze()
Object.getOwnPropertyDescriptor() 返回指定对象上一个自有属性对应的属性描述符。
