const Material = require('../material');
const { Vec3, unitVector } = require('../vec3');
const Ray = require('../ray');
const { clamp } = require('../util');

class Metal extends Material {
    constructor(albedo, roughness) {
        super();
        this.albedo = albedo;
        this.roughness = roughness ? clamp(roughness, 0, 1) : 0;
    }

    scatter(r, rec, att, s) {
        let reflected = Vec3.reflect(r.direction(), rec.normal);
        s._origin = rec.p;
        s.direction = reflected.add(Vec3.randomUnit().mul(this.roughness));
        [att.x, att.y, att.z] = [this.albedo.x, this.albedo.y, this.albedo.z];

        return s.dir.dot(rec.normal) > 0;
        // let reflected = Vec3.reflect(r.direction(), rec.normal);

        // s = new Ray(rec.p, reflected);
        // att = this.albedo;

        // return (s.direction().dot(rec.normal)) > 0;
    }
}

module.exports = Metal;