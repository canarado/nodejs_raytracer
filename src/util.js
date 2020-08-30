exports.d_to_r = function(deg) {
    return deg * Math.PI / 180;
}

exports.clamp = function(x, min, max) {
    if(x < min) return min;
    if(x > max) return max;

    return x;
}