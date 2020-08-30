const { Hittable } = require('../hittable');
const { Vec3 } = require('../vec3');

class Sphere extends Hittable {
    constructor(origin, radius, material) {
        super();
        this.origin = origin;
        this.radius = radius;
        this.material = material;
    }

    hit(r, tMin, tMax, rec) {
        let oc = r.origin().sub(this.origin);
        let a = r.direction().dot(r.direction());
        let b = oc.dot(r.direction());
        let c = oc.dot(oc) - (this.radius * this.radius);
        let d = ( b * b ) - ( a * c );

        if(d > 0) {
            let t = ((-1 * b) - Math.sqrt(d)) / a;
            if(t < tMax && t > tMin) {
                return assignHit(t, this.origin, this.radius, this.material);
            }
            t = ((-1 * b) + Math.sqrt(d)) / a;
            if(t < tMax && t > tMin) {
                return assignHit(t, this.origin, this.radius, this.material);
            }
        }

        return false;

        function assignHit(iv, ic, ir, ms) {

            rec.t = iv;
            rec.p = r.at(rec.t);
            rec.normal = rec.p.sub(ic).div(ir);
            rec.material = ms;

            return true;
        }
    }

    // hit(r, t_min, t_max, rec) {
    //     let oc = new Vec3(r.origin().sub(this.origin));
    //     let a = r.direction().sqrLength();
    //     let hb = oc.dot(r.direction());
    //     let c = oc.sqrLength() - this.radius*this.radius;
    //     let d = hb*hb-a*c;

    //     if(d > 0) {
    //         let root = Math.sqrt(d);
            
    //         let t = (-hb - root) / a;
    //         if(t < t_max && t > t_min) {
    //             rec.t = t;
    //             rec.p = r.at(rec.t);
    //             rec.normal = (rec.p.sub(this.origin)).div(radius);
    //             let outwardNormal = (rec.p.sub(center)).div(radius);
    //             rec.setFaceNormal(r, outwardNormal);

    //             return true
    //         }

    //         t = (-hb + root) / a;
    //         if(t < t_max && t > t_min) {
    //             rec.t = t;
    //             rec.p = r.at(rec.t);
    //             rec.normal = (rec.p.sub(this.origin)).div(radius);
    //             let outwardNormal = (rec.p.sub(center)).div(radius);
    //             rec.setFaceNormal(r, outwardNormal);
                
    //             return true;
    //         }
    //     }

    //     return false;
    // }
}

module.exports = Sphere;