(function() {
    'use strict';

    // Fredkin reversible logic gate
    function fredkin(c, i1, i2) {
        return (c === 0) ? [c, i1, i2] : [c, i2, i1];
    }

    function main() {
        var a=1, b=0, c=0, t=0, f=0,
            acb = [a, c, b],
            bba = [b, b, a],
            ctf = [c, t, f],
            cca = [c, c, a],
            bcf = [b, c, f];

        var l2a = fredkin.apply(this, [acb[2], bba[1], acb[1]]),
            l2b = fredkin.apply(this, [acb[2], ctf[1], cca[2]]),
            l2c = fredkin.apply(this, [acb[2], bba[1], bcf[1]]);

        var xor = fredkin.apply(this, [l2a[1], l2b[1], l2c[1]]);

        var carry = l2a[1];

        console.log(carry, xor); //XXX
    }

    main();

}());
