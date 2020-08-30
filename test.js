const [ writeColor, Ray, { Vec3, unitVector }  ] = [ require('./src/writeColor'), require('./src/ray'), require('./src/vec3') ];

function hitSphere(center, radius, r) {
    let oc = r.origin().sub(center);
    let a = r.direction().dot(r.direction());
    let b = 2 * oc.dot(r.direction());
    let c = oc.dot(oc) - radius*radius;
    let d = b * b - 4 * a * c;
    if(d < 0) {
        return -1;
    } else {
        return (-b - Math.sqrt(d)) / (2 * a);
    }
}

function rayColor(r) {

    let t = hitSphere(new Vec3(0, 0 , -1), 0.5, r);
    if(t > 0) {
        let N = unitVector(r.at(t).sub(new Vec3(0, 0, -1)));
        return (new Vec3(N.x + 1, N.y + 1, N.z + 1)).mul(0.5);
    }

    let ud = unitVector(r.direction());
    t = 0.5 * (ud.y + 1);
    return (new Vec3(1, 1, 1)).mul(1-t).add((new Vec3(0.5, 0.7, 1)).mul(t));

}

// let pixelColor = new Ray(new Vec3(0, 0, 0), new Vec3(-1.7, -1, -1));

// console.log(unitVector(pixelColor.direction()));


const ASPECT_RATIO = 16 / 9;
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = IMAGE_WIDTH / ASPECT_RATIO;

let viewportHeight = 2;
let viewportWidth = ASPECT_RATIO * viewportHeight;
let focalLength = 1;

let origin = new Vec3(0, 0, 0);
let horizontal = new Vec3(viewportWidth, 0, 0);
let vertical = new Vec3(0, viewportHeight, 0);
let lowerLeftCorner = (origin.sub(horizontal.div(2))).sub(vertical.div(2)).sub(new Vec3(0, 0, focalLength));

console.log(`P3\n${IMAGE_WIDTH} ${IMAGE_HEIGHT}\n255\n`)

for(let j = IMAGE_HEIGHT-1; j >= 0; --j) {
    for(let i = 0; i < IMAGE_WIDTH; ++i) {

        let u = i / (IMAGE_WIDTH-1);
        let v = j / (IMAGE_HEIGHT-1);
        let r = new Ray(origin, lowerLeftCorner.add((horizontal.mul(u))).add((vertical.mul(v))).sub(origin));

        let pixelColor = rayColor(r);

        writeColor(pixelColor);

    }
}