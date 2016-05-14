(function () {
    'use strict';

    window.testbench = {
        testArr: function () { return window.testbench.testArr4(); },
        testArr1: function () { return [5, 9, 2, 6, 4, 1, 3, 0, 7]; },
        testArr2: function () { return [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]; },
        testArr3: function () { return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; },
        testArr4: function () { return [55, 19, 42, 66, 4, 18, 83, 30, 75]; },

        validate: function (array) {
            for (var index = 0; index < array.length; index++) {

                if (array[index] > array[index + 1]) {
                    return false;
                }
            }
            return true;
        }
    };
    console.log('Initial array:', window.testbench.testArr());
} ());

(function lomuto() {
    'use strict';

    var totalSwaps = 0;

    function quicksort(arr, lo, hi) {
        if (lo < hi) {
            var p = parition(arr, lo, hi);
            quicksort(arr, lo, p - 1);
            quicksort(arr, p + 1, hi);
        }
    }

    function parition(arr, lo, hi) {
        var pivot = arr[hi];
        var i = lo;

        for (var j = lo; j <= hi - 1; j++) {
            if (arr[j] <= pivot) {
                swap(arr, i, j);
                i = i + 1;
            }
        }
        swap(arr, i, hi);
        return i;
    }

    function swap(arr, p1, p2) {
        var buf = arr[p1];
        arr[p1] = arr[p2];
        arr[p2] = buf;
        totalSwaps++;
    }

    var testArr = window.testbench.testArr();
    quicksort(testArr, 0, testArr.length - 1);
    console.log('Lomuto final array:', testArr, ' swaps:' + totalSwaps, 'valid: ' + window.testbench.validate(testArr));
} ());

(function hoare() {
    'use strict';

    var totalSwaps = 0;

    function quicksort(arr, lo, hi) {
        if (lo < hi) {
            var p = parition(arr, lo, hi);
            quicksort(arr, lo, p);
            quicksort(arr, p + 1, hi);
        }
    }

    function parition(arr, lo, hi) {
        var pivot = arr[lo];
        var i = lo - 1;
        var j = hi + 1;
        while (true) {
            do {
                i = i + 1;
            } while (arr[i] < pivot);
            do {
                j = j - 1;
            } while (arr[j] > pivot);
            if (i >= j) {
                return j;
            }
            swap(arr, i, j);
        }
    }

    function swap(arr, p1, p2) {
        var buf = arr[p1];
        arr[p1] = arr[p2];
        arr[p2] = buf;
        totalSwaps++;
    }

    var testArr = window.testbench.testArr();
    quicksort(testArr, 0, testArr.length - 1);
    console.log('Hoare final array:', testArr, ' swaps:' + totalSwaps, 'valid: ' + window.testbench.validate(testArr));
} ());

(function dnf() {
    'use strict';

    var totalSwaps = 0;
    var totalcalls = 0;

    function quicksort(arr, lo, hi) {
        three_way_parition(arr, 41);
        // if (lo < hi) {
        //     var p = parition(arr, lo, hi);
        //     quicksort(arr, lo, p);
        //     quicksort(arr, p + 1, hi);
        // }
    }

    function three_way_parition(arr, mid) {
        var i = 0;
        var j = 0;
        var n = arr.length - 1;

        while (j <= n) {
            if (arr[j] < mid) {
                swap(arr, i, j);
                i++;
                j++;
            } else if (arr[j] > mid) {
                swap(arr, j, n);
                n--;
            } else {
                j++;
            }
        }
        
        if(!window.testbench.validate(arr) && totalcalls < 3){
            totalcalls++;
            three_way_parition(arr, mid);
        }
    }

    function swap(arr, p1, p2) {
        var buf = arr[p1];
        arr[p1] = arr[p2];
        arr[p2] = buf;
        totalSwaps++;
    }

    var testArr = window.testbench.testArr();
    quicksort(testArr, 0, testArr.length - 1);
    console.log('dnf final array:', testArr, ' swaps:' + totalSwaps, 'valid: ' + window.testbench.validate(testArr));
} ());
