// const { d_to_r } = require('./src/util');
const { Vec3, unitVector } = require('./src/vec3');
const { HitRecord } = require('./src/hittable');
const HittableList = require('./src/hittableList');
const Sphere = require('./src/shape/sphere');
const Ray = require('./src/ray');
const writeColor = require('./src/writeColor');
const Camera = require('./src/camera');

function rayColor(r, world) {
    let hr = new HitRecord();
    if(world.hit(r, 0, Infinity, hr)) {
        return (hr.normal.add(new Vec3(1, 1, 1))).mul(0.5);
    }
    let ud = unitVector(r.direction());
    let t = 0.5 * (ud.y + 1);
    return (new Vec3(1, 1, 1).mul(1-t)).add((new Vec3(0.5, 0.7, 1.0)).mul(t));
}

// function rayColor(r) {

//     let t = hitSphere(new Vec3(0, 0 , -1), 0.5, r);
//     if(t > 0) {
//         let N = unitVector(r.at(t).sub(new Vec3(0, 0, -1)));
//         return (new Vec3(N.x + 1, N.y + 1, N.z + 1)).mul(0.5);
//     }

//     let ud = unitVector(r.direction());
//     t = 0.5 * (ud.y + 1);
//     return (new Vec3(1, 1, 1)).mul(1-t).add((new Vec3(0.5, 0.7, 1)).mul(t));

// }

const ASPECT_RATIO = 16 / 9;
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;
const SAMPLES = 100;

let world = new HittableList();
world.add(new Sphere(new Vec3(0, 0, -1), 0.5));
world.add(new Sphere(new Vec3(0, -100.5, -1), 100));

// let viewportHeight = 2;
// let viewportWidth = ASPECT_RATIO * viewportHeight;
// let focalLength = 1;

let camera = new Camera();

// let origin = new Vec3(0, 0, 0);
// let horizontal = new Vec3(viewportWidth, 0, 0);
// let vertical = new Vec3(0, viewportHeight, 0);
// let lowerLeftCorner = (origin.sub(horizontal.div(2))).sub(vertical.div(2)).sub(new Vec3(0, 0, focalLength));

console.error('started');
console.log(`P3\n${IMAGE_WIDTH} ${IMAGE_HEIGHT}\n255\n`)

for(let j = IMAGE_HEIGHT-1; j >= 0; --j) {
    for(let i = 0; i < IMAGE_WIDTH; ++i) {

        let pixelColor = new Vec3(0, 0, 0);
        
        for(let s = 0; s < SAMPLES; ++s) {
            let u = (i + Math.random()) / (IMAGE_WIDTH - 1);
            let v = (j + Math.random()) / (IMAGE_HEIGHT - 1);
            let r = camera.getRay(u, v);

            // console.error(rayColor(r, world))

            pixelColor.vAdd(rayColor(r, world));
        }

        writeColor(pixelColor, SAMPLES);

        // let u = i / (IMAGE_WIDTH-1);
        // let v = j / (IMAGE_HEIGHT-1);
        // let r = new Ray(origin, lowerLeftCorner.add((horizontal.mul(u))).add((vertical.mul(v))).sub(origin));

        // let pixelColor = rayColor(r, world);

        // writeColor(pixelColor);

    }
}
console.error('finished');