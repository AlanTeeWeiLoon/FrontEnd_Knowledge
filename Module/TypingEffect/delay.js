/**
 * @param {number} ms
 * @returns {Promise}
 */

const delay = ms => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(); // Resolve the Promise after the specified delay
        }, ms);
    });
}

module.exports = delay