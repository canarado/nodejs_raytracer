const vec3 = require('./vec3');
const { clamp } = require('./util');

module.exports = function writeColor(vec, samples) {

    let r = vec.x;
    let g = vec.y;
    let b = vec.z;

    let scale = 1 / samples;

    r = Math.sqrt(scale * r);
    g = Math.sqrt(scale * g);
    b = Math.sqrt(scale * b);

    console.log(
        `${256 * clamp(r, 0, 0.999)} ${256 * clamp(g, 0, 0.999)} ${256 * clamp(b, 0, 0.999)}\n`
    )
}