const { Vec3, unitVector } = require('./src/vec3');
const { HitRecord } = require('./src/hittable');
const HittableList = require('./src/hittableList');
const Sphere = require('./src/shape/sphere');
const Ray = require('./src/ray');
const writeColor = require('./src/writeColor');
const Camera = require('./src/camera');
const Lambertian = require('./src/material/lambertian');
const Metal = require('./src/material/metal');

const MAX_DEPTH = 50;

function rayColor(r, world, depth) {
    let record = new HitRecord();

    if(world.hit(r, 0.001, Infinity, record)) {
        let scattered = new Ray(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
        let attenuation = new Vec3(1, 1, 1);

        if(depth < MAX_DEPTH && record.material.scatter(r, record, attenuation, scattered)) {
            let c = rayColor(scattered, world, depth + 1);
            return new Vec3(attenuation.x * c.x, attenuation.y * c.y, attenuation.z * c.z);
        } else {
            return new Vec3(0, 0, 0);
        }
    } else {
        let t = (r.direction().y + 1) * 0.5;
        let cs = new Vec3(1, 1, 1);
        let ce = new Vec3(0.5, 0.7, 1);
        return cs.mul(1 - t).add(ce.mul(t));
    }
    // let hr = new HitRecord();

    // if(depth <= 0) return new Vec3(0, 0, 0);
    // if(world.hit(r, 0.001, Infinity, hr)) {
    //     let scattered = new Ray(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
    //     let attenuation = new Vec3(0, 0, 0);

    //     if(hr.material.scatter(r, hr, attenuation, scattered)) {
    //         let c = rayColor(scattered, world, depth - 1);
    //         return new Vec3(attenuation.x * c.x, attenuation.y * c.y, attenuation.z * c.z);
    //         // console.log(rayColor(scattered, world, depth-1))
    //         // return rayColor(scattered, world, depth - 1).mul(attenuation);
    //     }
    //     return new Vec3(0, 0, 0);
    //     // let ta = hr.p.add(hr.normal).add(Vec3.randomUnitVector());
    //     // // let ta = hr.p.add(Vec3.randomHemi(hr.normal)); // hemispherical scattering, i think js' number system isnt liking this maybe
    //     // return rayColor(new Ray(hr.p, ta.sub(hr.p)), world, depth - 1).mul(.5);
    // }
    // let ud = unitVector(r.direction());
    // let t = 0.5 * (ud.y + 1);
    // return (new Vec3(1, 1, 1).mul(1-t)).add((new Vec3(0.5, 0.7, 1.0)).mul(t));
}

const ASPECT_RATIO = 16 / 9;
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;
const SAMPLES = 100;

let world = new HittableList();

let materialGround = new Lambertian(new Vec3(0.8, 0.8, 0.0));
let materialCenter = new Lambertian(new Vec3(0.7, 0.3, 0.3));
let materialLeft = new Metal(new Vec3(0.8, 0.8, 0.8));
let materialRight = new Metal(new Vec3(0.8, 0.6, 0.2));

world.add(new Sphere(new Vec3(0, -100.5, -1), 100, materialGround));
world.add(new Sphere(new Vec3(0, 0, -1), 0.5, materialCenter));
world.add(new Sphere(new Vec3(-1, 0, -1), 0.5, materialLeft));
world.add(new Sphere(new Vec3(1, 0, -1), 0.5, materialRight));
// world.add(new Sphere(new Vec3(0, 0, -1), 0.5));
// world.add(new Sphere(new Vec3(0, -100.5, -1), 100));

let camera = new Camera();

console.error('started');
console.log(`P3\n${IMAGE_WIDTH} ${IMAGE_HEIGHT}\n255\n`)

for(let j = IMAGE_HEIGHT-1; j >= 0; --j) {
    for(let i = 0; i < IMAGE_WIDTH; ++i) {

        let pixelColor = new Vec3(0, 0, 0);
        
        for(let s = 0; s < SAMPLES; ++s) {
            let u = (i + Math.random()) / (IMAGE_WIDTH - 1);
            let v = (j + Math.random()) / (IMAGE_HEIGHT - 1);
            let r = camera.getRay(u, v);
            globalThis.rrr = r;

            pixelColor.vAdd(rayColor(r, world, 0));
        }
        // console.log(pixelColor.vAdd(rayColor(rrr, world, MAX_DEPTH)));

        writeColor(pixelColor, SAMPLES);

    }
}
console.error('finished');