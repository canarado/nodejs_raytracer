const { Vec3 } = require('./vec3');
const Ray = require('./ray');

class Camera {
    constructor() {
        this.aspectRatio = 16 / 9;
        this.viewportHeight = 2;
        this.viewportWidth = this.aspectRatio * this.viewportHeight;
        this.focalLength = 1;
        this.origin = new Vec3(0, 0, 0);
        this.horizontal = new Vec3(this.viewportWidth, 0, 0);
        this.vertical = new Vec3(0, this.viewportHeight, 0);
        this.lowerLeftCorner = (this.origin.sub(this.horizontal.div(2))).sub(this.vertical.div(2)).sub(new Vec3(0, 0, this.focalLength));
    }

    getRay(u, v) {
        let vh = this.horizontal.mul(u);
        let vv = this.vertical.mul(v);

        return new Ray(this.origin, this.lowerLeftCorner.add(vh.add(vv)).sub(this.origin));
        // return new Ray(this.origin, this.lowerLeftCorner.add((this.horizontal.mul(u))).add((this.vertical.mul(v))).sub(this.origin))
    }
}

module.exports = Camera;