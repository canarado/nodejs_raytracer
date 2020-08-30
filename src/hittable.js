const { Vec3 } = require('./vec3');
const Material = require('./material');

class HitRecord {
    constructor() {
        this.p = new Vec3(0, 0, 0);
        this.normal = new Vec3(0, 0, 0);
        this.material = new Material();
        this.t = 0;
        this.frontFace;
    }

    setFaceNormal(r, normal) {
        this.frontFace =  (r.direction().dot(normal)) < 0;
        this.normal = this.frontFace ? normal : -normal;
    }
}

class Hittable {
    hit(r, t_min, t_max, rec) { };
}

module.exports = { Hittable, HitRecord };