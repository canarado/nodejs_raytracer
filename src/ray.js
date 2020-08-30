const vec3 = require('./vec3');

class Ray {
    constructor(origin, dir) {
        this._origin = origin;
        this.dir = dir;
    }

    at(t) {
        return this._origin.add(this.dir.mul(t));
    }
    
    origin() {
        return this._origin;
    }

    direction() {
        return this.dir;
    }
}

module.exports = Ray;