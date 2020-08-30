const { clampedRandom } = require('./util');

class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this._raw = [this.x, this.y, this.z];
    }

    neg() {
        return new Vec3(-this.x, -this.y, -this.z);
    }

    static random() {
        return new Vec3(Math.random(), Math.random(), Math.random());
    }

    static randomClamped(min, max) {
        return new Vec3(clampedRandom(min, max), clampedRandom(min, max), clampedRandom(min, max));
    }

    static randomUnit() {
        while(true) {
            let p = Vec3.randomClamped(-1, 1);
            if (p.sqrLength() >= 1) continue;
            return p;
        }
    }

    static randomUnitVector() {
        let a = clampedRandom(0, 2 * Math.PI);
        let z = clampedRandom(-1, 1);
        let r = Math.sqrt(1 - z * z);

        return new Vec3(r * Math.cos(a), r * Math.sin(a), z);
    }

    static randomHemi(normal) {
        let us = Vec3.randomUnit();
        if(us.dot(normal) > 0) {
            return us;
        } else {
            return -us;
        }
    }

    static reflect(v, n) {
        return v.sub(n.mul(2 * (v.dot(n))));
    }

    getColor(c_str) {
        let v;
        switch(c_str) {
            case "red":
                v = pToColor(this.x);
                break;
            case "green":
                v = pToColor(this.y);
                break;
            case "blue":
                v = pToColor(this.z);
                break;
            default:
                throw new Error("can not extract undefined value");
        }

        return v;
    }

    add(v) {
        return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    sub(v) {
        return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    mul(c) {
        return new Vec3(
            ...this._raw.map(j => j * c)
        );
    }

    div(c) {
        return new Vec3(
            ...this._raw.map(j => j / c)
        );
    }

    vAdd(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;

        this._setRaw();
    }

    vSub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;

        this._setRaw();
    }

    scalarMul(c) {
        this.x *= c;
        this.y *= c;
        this.z *= c;

        this._setRaw();
    }

    scalarDiv(c) {
        this.x /= c;
        this.y /= c;
        this.z /= c;

        this._setRaw();
    }

    unit() {
        return this.div(this.length())
    }

    dot(vec) {
        return (this.x * vec.x) + (this.y * vec.y) + (this.z * vec.z);
    }

    length() {
        return Math.sqrt(this.sqrLength());
    }

    sqrLength() {
        return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
    }


    /** @private */
    _setRaw() {
        this._raw = [this.x, this.y, this.z];
    }
}

/** @private */
function pToColor(n) {
    return Math.abs(Math.round(n * 255));
}

function unitVector(vec) {
    return vec.div(vec.length());
}

module.exports = { Vec3, unitVector };