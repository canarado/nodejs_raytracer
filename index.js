const vec3 = require('./src/vec3');
const writeColor = require('./src/writeColor');

const IMAGE_WIDTH = 256;
const IMAGE_HEIGHT = 256;

console.log(`P3\n${IMAGE_WIDTH} ${IMAGE_HEIGHT}\n255\n`)

for(let j = IMAGE_HEIGHT-1; j >= 0; --j) {
    for(let i = 0; i < IMAGE_WIDTH; ++i) {

        // let r = i / (IMAGE_WIDTH - 1);
        // let g = j / (IMAGE_WIDTH - 1);
        // let b = 0.25;

        // let ir = 255.999 * r;
        // let ig = 255.999 * g;
        // let ib = 255.999 * b;

        // console.log(ir, ig, ib);
        let p = new vec3(i/(IMAGE_WIDTH-1), j/(IMAGE_HEIGHT-1), 0.25);
        writeColor(p); 
    }
}