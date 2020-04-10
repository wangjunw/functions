function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        // 通过判断传入参数是否具有Symbol.iterator属性来判断是否具有iterator接口，没有则为undefined
        if (typeof promises[Symbol.iterator] !== 'function') {
            reject('类型错误');
        }
        if (promises.length === 0) {
            resolve([]);
        } else {
            let result = [];
            let index = 0;
            for (let i = 0, len = promises.length; i < len; i++) {
                Promise.resolve(promises[i]).then(data => {
                    result[i] = data;
                    if (++index === len) {
                        resolve(result);
                    }
                }, err => {
                    reject(err);
                });
            }
        }
    });
}

// 测试
let p1 = Promise.resolve(1);
let p2 = Promise.reject(2);
// let p2 = Promise.resolve(2);
let p3 = Promise.resolve(3);

promiseAll([1, 2, 3]).then(res => {
    // 如果三个实例都是resolve则打印[1,2,3]
    console.log('fulfilled==', res);
}).catch(err => {
    // 如果有一个p2为reject,则打印2
    console.log('rejected==', err);
});