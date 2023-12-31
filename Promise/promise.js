// Own Coding Promise Structure

/* Note:
 * Promise got 3 status:
 *
 *  1. Pending
 *  2. Fulfilled
 *  3. Rejected
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/* Note:
 *
 * Promise.then(()=>{})
 * function inside .then() will put in queneMircotask() (微队列),
 * but now we have to write our own coding to create queneMircotask
 */

/**
 * Determine the data is Promise or not
 * **to return boolean can use "!!"**,
 * otherwise will return base on "obj", if "obj" is null, then will return null
 * @param {any} obj
 */
function isPromise(obj) {
  return !!(obj && typeof obj === "object" && typeof obj.then === "function");
}

/**
 * Execute a queneMircotask (运行一个微队列任务)
 * Put the passed function into the microqueue（把传递的函数放到微队列中）
 * @param {Function} callback
 */

function runMircoTask(callback) {
  // Determine node environment
  if (process && process.nextTick) {
    /* Note:
     *
     * node environment got an object call "process", which broswer dont have
     * its such a microqueue inside node
     * Look for Sample 2
     */
    process.nextTick(callback);
  }
  // Determine whether browser support MutationObserver
  else if (MutationObserver) {
    /* Note:
     *
     * MutationObserver (观察器) => use to observe element,
     * if element got changes then will exceute the function
     * will put the function into microqueue to execute
     * ** Note: Some browser may not support **
     */
    const p = document.createElement("p");
    const observer = new MutationObserver(callback);
    observer.observe(p, {
      childList: true, // 观察该元素内部的变化
    });
    p.innerHTML = "1"; // manually change the element to trigger MutationObserver
  } else {
    /* Note:
     *
     * No more ways for environment or Browser can put task to microqueue,
     * then will just use setTimeout
     */
    setTimeout(() => callback, 0);
  }
}

class MyPromise {
  /**
   * create a Promise
   * @param {Function} executor // task executor， execute immediately (任务执行器，立即执行)
   */
  constructor(executor) {
    this._state = PENDING; // status（状态）
    this._value = undefined; // data（数据）
    this._handlers = []; // 处理函数形成的队列

    /* Note:
     *
     * try catch is to handle "promise4" example, otherwise will hit exception
     * so if hit exception, will just call _reject()
     */

    try {
      // .bind(this) is binding the current new created "MyPromise",
      // otherwise "this" in "_changeState" will point to global variables
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }

  /**
   * add on function to the process queue (向处理队列中添加一个函数）
   * @param {Function} executor // function (添加的函数)
   * @param {String} state // What state should execute the function
   * @param {Function} resolve // 让then函数返回的Promise成功
   * @param {Function} reject // 让then函数返回的Promise失败
   */
  _pushHandlers(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject,
    });
  }

  /**
   *
   * Execute task depends on current state
   */

  _runHandlers() {
    if (this._state === PENDING) {
      // task still in pending state just return, no need execute anything
      return;
    }
    while (this._handlers[0]) {
      const handler = this._handlers[0];
      this._runOneHandler(handler);
      this._handlers.shift();
    }
  }

  /**
   * Process 1 handler
   * @param {Object} handler
   */

  _runOneHandler({ executor, state, resolve, reject }) {
    runMircoTask(() => {
      if (this._state !== state) {
        return; // status not match will not process
      }
      if (typeof executor !== "function") {
        // executor is not a function, may be undefined, null or a String
        this._state === FULFILLED ? resolve(this._value) : reject(this._value);
        return;
      }
      try {
        const result = executor(this._value);
        if (isPromise(result)) {
          result.then(resolve, reject); //execute resolve and reject
        } else resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * then of Promise A+ specification (Promise 的A+规范的then)
   * @param {Function} onFulfilled
   * @param {Function} onRejected
   */

  // then always got 2 params, if only pass one then the second one will be undefined
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandlers(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandlers(onRejected, REJECTED, resolve, reject);
      this._runHandlers(); // execute task list
    });
  }

  /**
   * @param {String} newState // 新状态
   * @param {any} value // 相关数据
   */
  _changeState(newState, value) {
    // state can't be change twice in a Promise
    // so to resolve "promise3" example, if _state already be changed will return
    if (this._state !== PENDING) {
      return;
    }
    this._state = newState;
    this._value = value;
    this._runHandlers(); // state changed, execute task list
  }

  /**
   * Mark current task complete （标记当前任务完成）
   * @param {any} data related data when task completed (任务完成的相关数据)
   */
  _resolve(data) {
    // If completed, change status and data
    this._changeState(FULFILLED, data);
  }

  /**
   * Mark current task fail （标记当前任务失败）
   * @param {any} reason related reason when task failed (任务失败的相关原因)
   */
  _reject(reason) {
    // If failed, change status and data(reason)
    this._changeState(REJECTED, reason);
  }
}

const promise1 = new MyPromise((resolve, reject) => {
  resolve(123);
});

const promise2 = new MyPromise((resolve, reject) => {
  reject(321);
});

const promise3 = new MyPromise((resolve, reject) => {
  resolve(123);
  reject(321);
});

const promise4 = new MyPromise((resolve, reject) => {
  throw 444;
});

// Sample 1
console.log("\n\n---------- Sample 1 ---------\n\n");
console.log(promise1); // MyPromise { _state: 'fulfilled', _value: 123 }

console.log(promise2); // MyPromise { _state: 'rejected', _value: 321 }

console.log(promise3); // MyPromise { _state: 'fulfilled', _value: 123 }
// Due to checking state in _changeState,
// so reject() will just return due to _state had changed

console.log(promise4); // MyPromise { _state: 'rejected', _value: 444 }
// Due to handle by try catch, so if hit error exception will just _reject()

// Sample 2 - Comment Other Samples to execute
console.log("\n\n---------- Sample 2 ---------\n\n");
// setTimeout(() => {
//   console.log("setTimeout");
// }, 0);

// process.nextTick(() => {
//   console.log("process.nextTick"); // will process before setTimeout
// });

// console.log("None");

/*

Output: None => process.nextTick => setTimeout
None will be execute first,
then only process.nextTickbecause its in mircoquene, 
lastly only execute setTimeout which inside macroquene (宏队列）

*/

// Sample 3 - Comment Other Samples to execute
console.log("\n\n---------- Sample 3 ---------\n\n");

// setTimeout(() => {
//   console.log("setTimeout");
// }, 0);

// runMircoTask(() => {
//   console.log("runMircoTask");
// });

// console.log("None");

/*

Output: None => runMircoTask => setTimeout
None will be execute first,
then only runMircoTask its in mircoquene, 
lastly only execute setTimeout which inside macroquene (宏队列）

*/

// Sample 4 - Comment Other Samples to execute
console.log("\n\n---------- Sample 4 ---------\n\n");
// const promise5 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(123);
//   }, 1000);
// });

// promise5.then(
//   function A1() {},
//   function A2() {}
// );

// promise5.then(
//   function B1() {},
//   function B2() {}
// );

// console.log(promise5);

/*

Output: Cuurent _state and _value and a List of _handlers 
Push all tasks that is possible to execute into the _handlers object, 
which task is going to execute is depends on _state

*/

// Sample 5 - Comment Other Samples to execute
console.log("\n\n---------- Sample 5 ---------\n\n");
// const promise6A = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(123);
//   }, 1000);
// });

// const promise6B = promise6A.then(undefined, undefined); // wrong value for "onFulfilled" and "onRejected"

// setTimeout(() => {
//   console.log("promise6A - ",promise6A);
//   console.log("promise6B - ",promise6B);
// }, 1500);

/*

Output: 
promise6A -  MyPromise { _state: 'fulfilled', _value: 123, _handlers: [] }
promise6B -  MyPromise { _state: 'fulfilled', _value: 123, _handlers: [] } 

promise6B will depend on the state of promise6A, 
promise6A fulfilled then promise6B also fulfilled,
promise6A rejected then promise6B also rejected,
although there isn't "onFulfilled" or " onRejected" function pass into "then()"

*/

// Sample 6 - Comment Other Samples to execute
console.log("\n\n---------- Sample 6 ---------\n\n");
const promise7A = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  });
});

const promise7B = promise7A.then(() => { // pass in a Promise in ".then()"
  return new MyPromise((resolve, reject) => {
    reject(321);
  });
});

setTimeout(() => {
  console.log("promise7A - ", promise7A);
  console.log("promise7B - ", promise7B);
}, 50);

/*

Output: 
promise7A -  MyPromise { _state: 'fulfilled', _value: 123, _handlers: [] }
promise7B -  MyPromise { _state: 'rejected', _value: 321, _handlers: [] } 

promise7B will depend on the state of new Promise of promise7A inside .then(), 
new Promise of promise7A inside .then() fulfilled then promise6B also fulfilled,
new Promise of promise7A inside .then() rejected then promise6B also rejected,
although the first new Promise promise7A is fulfilled

*/
