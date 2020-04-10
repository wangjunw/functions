class MyPromise {
    constructor(fn) {
        if (typeof fn !== 'function') {
            throw new Error('参数必须为一个函数');
        }
        this.state = 'pending';
        this.callbacks = [];
        fn(this.resolve.bind(this), this.reject.bind(this));
    }
    then(successd, failed) {
        // 将成功和失败的回调存起来
        const handle = [];
        // 当然也可以把成功和失败的回调分开存放
        if (typeof successd === 'function') {
            handle[0] = successd;
        }
        if (typeof failed === 'function') {
            handle[1] = failed;
        }
        // 用于链式调用
        handle[2] = new MyPromise(() => {});
        this.callbacks.push(handle);
        return handle[2];
    }
    resolve(res) {
        if (this.state !== 'pending') {
            return;
        }
        this.state = 'fulfiled';
        setTimeout(() => {
            this.callbacks.forEach((handle) => {
                let r;
                if (typeof handle[0] === 'function') {
                    try {
                        r = handle[0](res);
                    } catch (err) {
                        return handle[2].reject(err);
                    }
                }
                handle[2].resolve(r);
            });
        }, 0);
    }
    reject(res) {
        if (this.state !== 'pending') return;
        this.state = 'rejectd';
        setTimeout(() => {
            this.callbacks.forEach((handle) => {
                let r;
                if (typeof handle[1] === 'function') {
                    try {
                        r = handle[1](res);
                    } catch (err) {
                        handle[2].reject(err);
                    }
                }
                handle[2].resolve(r);
            });
        }, 0);
    }
}

// 测试代码
const p = new MyPromise((resolve, reject) => {
    console.log(111);
    setTimeout(() => {
        resolve();
    });
    console.log(222);
});
p.then(
    () => {
        console.log(33);
        return 999;
    },
    () => {
        console.log('错误');
    }
).then((res) => {
    console.log(res);
});
