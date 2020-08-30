const { Hittable } = require('./hittable');

class HittableList extends Hittable {
    constructor(list) {
        super();
        this.list = list || [];
    }

    size() {
        return this.list.length;
    }

    hit(r, t_min, t_max, rec) {
        let hitA = false;
        let csf = t_max;

        for(let obj of this.list) {

            if(obj.hit(r, t_min, csf, rec)) {

                hitA = true;
                csf = rec.t;
            }
        }

        return hitA;
    }

    add(obj) {
        this.list.push(obj);
    }

    clear() {
        this.list.length = 0;
    }
}

module.exports = HittableList;