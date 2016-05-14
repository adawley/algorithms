//Copyright Kevin Lawler, released under ISC License

function random_double() //your random double function
{
    //[0,1) uniformly random double, mt19937-64.c source is fine
    //keep in mind most double-based implementations drop randomness to 52-bits
    return Math.random();
}

var exp = Math.exp;
var log = Math.log;
var floor = Math.floor;
var round = Math.round;
//POTENTIAL_OPTIMIZATION_POINT: Christian Neukirchen points out we can replace exp(log(x)*y) by pow(x,y)
//POTENTIAL_OPTIMIZATION_POINT: Vitter paper points out an exponentially distributed random var can provide speed ups
//Vitter, J.S. - An Efficient Algorithm for Sequential Random Sampling - ACM Trans. Math. Software 11 (1985), 37-57.
//'a' is space allocated for the hand
//'n' is the size of the hand
//'N' is the upper bound on the random card values
function vitter(a, n, N)
{


    var i = 0;
    var j = -1;
    var t;
    var qu1 = -n + 1 + N;
    var S;
    var negalphainv = -13;
    var threshold = -negalphainv * n;

    var nreal = n;
    var Nreal = N;
    var ninv = 1.0 / n;
    var nmin1inv = 1.0 / (n - 1);
    var Vprime = exp(log(random_double()) * ninv);

    var qu1real = -nreal + 1.0 + Nreal;
    var negSreal;
    var U;
    var X;
    var y1;
    var y2;
    var top;
    var bottom;
    var limit;

    while (n > 1 && threshold < N) {
        nmin1inv = 1.0 / (-1.0 + nreal);

        while (1) {
            while (1) {
                X = Nreal * (-Vprime + 1.0);
                S = floor(X);

                if (S < qu1) {
                    break;
                }

                Vprime = exp(log(random_double()) * ninv);
            }

            U = random_double();

            negSreal = -S;

            y1 = exp(log(U * Nreal / qu1real) * nmin1inv);

            Vprime = y1 * (-X / Nreal + 1.0) * (qu1real / (negSreal + qu1real));

            if (Vprime <= 1.0) {
                break;
            }

            y2 = 1.0;

            top = -1.0 + Nreal;

            if (-1 + n > S) {
                bottom = -nreal + Nreal;
                limit = -S + N;
            } else {
                bottom = -1.0 + negSreal + Nreal;
                limit = qu1;
            }

            for (t = N - 1; t >= limit; t--) {
                y2 = (y2 * top) / bottom;
                top--;
                bottom--;
            }

            if (Nreal / (-X + Nreal) >= y1 * exp(log(y2) * nmin1inv)) {
                Vprime = exp(log(random_double()) * nmin1inv);
                break;
            }

            Vprime = exp(log(random_double()) * ninv);
        }

        j += S + 1;

        a[i++] = j;

        N = -S + (-1 + N);

        Nreal = negSreal + (-1.0 + Nreal);

        n--;
        nreal--;
        ninv = nmin1inv;

        qu1 = -S + qu1;
        qu1real = negSreal + qu1real;

        threshold += negalphainv;
    }

    if (n > 1) {
        vitter_a(a + i, n, N, j); // if i>0 then n has been decremented
    } else {
        S = floor(N * Vprime);

        j += S + 1;

        a[i++] = j;
    }

}

function vitter_a(a, n, N, j) //Method A
{
    var S, i = 0;
    var top = N - n, Nreal = N, V, quot;

    while (n >= 2) {
        V = random_double();
        S = 0;
        quot = top / Nreal;

        while (quot > V) {
            S++;
            top--;
            Nreal--;
            quot = (quot * top) / Nreal;
        }

        j += S + 1;

        a[i++] = j;

        Nreal--;

        n--;
    }

    S = floor(round(Nreal) * random_double());

    j += S + 1;

    a[i++] = j;

}
