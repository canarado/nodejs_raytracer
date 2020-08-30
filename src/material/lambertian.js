const Material = require('../material');
const { Vec3 } = require('../vec3');
const Ray = require('../ray');

class Lambertian extends Material {
    constructor(albedo) {
        super();
        this.albedo = albedo;
    }

    scatter(r, rec, att, s) {
        let sd = rec.normal.add(Vec3.randomUnitVector());
        s = new Ray(rec.p, sd);
        att = this.albedo;

        return true;
    }
}

module.exports = Lambertian;