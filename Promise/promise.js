// Own Coding Promise Structure

/**
 * Promise got 3 status:
 *
 *  1. Pending
 *  2. Fulfilled
 *  3. Rejected
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * Promise.then(()=>{})
 * function inside .then() will put in queneMircotask(),
 * but now we have to write our own coding to create queneMircotask
 */

/**
 * Execute a queneMircotask (运行一个微队列任务)
 * Put the passed function into the microqueue（把传递的函数放到微队列中）
 * @param {Function} callback
 */

function runMircoTask(callback) {
  // Determine node environment
  if (process && process.nextTick) {
    /**
     * node environment got an object call "process", which broswer dont have
     * its such a microqueue inside node
     * Look for Sample 2
     */
    process.nextTick(callback);
  }
  // Determine whether browser support MutationObserver
  else if (MutationObserver) {
    /**
     * MutationObserver (观察器) => use to observe element,
     * if element got changes then will exceute the function
     * will put the function into microqueue to execute
     * ** Note: Some browser may not support
     */
    const p = document.createElement("p");
    const observer = new MutationObserver(callback);
    observer.observe(p, {
      childList: true, // 观察该元素内部的变化
    });
    p.innerHTML = "1"; // manually change the element to trigger MutationObserver
  }
  // No more ways for environment or Browser can put task to microqueue,
  // then will just use setTimeout
  else {
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

    // try catch is to handle "promise4" example, otherwise will hit exception
    // so if hit exception, will just call _reject()
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }

    // .bind(this) is binding the current new created "MyPromise",
    // otherwise "this" in "_changeState" will point to global variables
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
// Due to checking login in _changeState,
// so reject() will just return due to _state had changed

console.log(promise4); // MyPromise { _state: 'rejected', _value: 444 }
// Due to handle by try catch, so if hit error exception will just _reject()

// Sample 2 - Comment Sample 3 to execute
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

// Sample 3 - Comment Sample 2 to execute
console.log("\n\n---------- Sample 3 ---------\n\n");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

runMircoTask(() => {
  console.log("runMircoTask");
});

console.log("None");

/*

Output: None => runMircoTask => setTimeout
None will be execute first,
then only runMircoTask its in mircoquene, 
lastly only execute setTimeout which inside macroquene (宏队列）

*/
