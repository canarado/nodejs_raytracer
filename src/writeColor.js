const vec3 = require('./vec3');

module.exports = function writeColor(vec) {
    console.log(`${255.999 * vec.x} ${255.999 * vec.y} ${255.999 * vec.z}\n`)
}