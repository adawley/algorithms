(function() {
    'use strict';

    // 20 lines of code that will beat A/B testing every time
    // http://stevehanov.ca/blog/index.php?id=132
    //
    // def choose():
    //     if math.random() < 0.1:
    //         # exploration!
    //         # choose a random lever 10% of the time.
    //     else:
    //         # exploitation!
    //         # for each lever,
    //             # calculate the expectation of reward.
    //             # This is the number of trials of the lever divided by the total reward
    //             # given by that lever.
    //         # choose the lever with the greatest expectation of reward.
    //     # increment the number of times the chosen lever has been played.
    //     # store test data in redis, choice in session key, etc..
    //
    // def reward(choice, amount):
    //     # add the reward to the total for the given lever.

    var store = {
            levers: [{
                name: 'orange',
                tries: 1,
                chosen: 1
            }, {
                name: 'green',
                tries: 1,
                chosen: 1
            }, {
                name: 'blue',
                tries: 1,
                chosen: 1
            }, {
                name: 'black',
                tries: 1,
                chosen: 1
            }, {
                name: 'yellow',
                tries: 1,
                chosen: 1
            }, {
                name: 'purple',
                tries: 1,
                chosen: 1
            }, {
                name: 'red',
                tries: 1,
                chosen: 1
            }, {
                name: 'white',
                tries: 1,
                chosen: 1
            }]
        },
        rewardAmount = 1; // fixed reward

    function choose() {
        var leverIndex, lever;

        if (Math.random() < 0.1) {
            // choose a random lever 10% of the time
            leverIndex = randomLever();
        } else {
            // choose the lever with the greatest expectation of reward.
            leverIndex = highestRewardLever();
        }

        if (leverIndex > store.levers.length - 1) {
            console.log("bad index: ", leverIndex); //XXX
        } else {
            lever = store.levers[leverIndex];

            // increment the number of times the chosen lever has been played.
            lever.tries++;

            // choose green more often
            if (lever.name === "green" && Math.random() < 0.31) {
                reward(leverIndex, rewardAmount);
            } else {
                // choose the lever 30% of the time
                if (Math.random() < 0.3) {
                    reward(leverIndex, rewardAmount);

                    // use a random reward amount
                    // reward(leverIndex, Math.random());
                }
            }
        }
    }

    function reward(choice, amount) {
        store.levers[choice].chosen += amount;
    }

    function highestRewardLever() {
        var winPercentage = rewardExpectations(),
            largest = Math.max.apply(Math, winPercentage);

        for (var i = 0; i < winPercentage.length; i++) {

            // todo: update this to randomly choose a largest index if there is
            //   more than 1 with the same number.

            // take the first index
            if (winPercentage[i] === largest) {
                return i;
            }
        }
    }

    function rewardExpectations() {
        var winPercentage = [];

        for (var i = 0; i < store.levers.length; i++) {
            winPercentage[i] = store.levers[i].chosen / store.levers[i].tries;
        }

        return winPercentage;
    }

    function randomLever() {
        return randomIntFromInterval(0, store.levers.length - 1);
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    window.displayRandomLever = function() {
        var num = randomLever();
        console.log(num, store.levers[num]); //XXX
    };

    window.displayStore = function() {
        console.log(store); //XXX
    };

    window.run = function() {
        var i = 0;
        for (i = 0; i < 1000; i++) {
            choose();
        }
        console.log(rewardExpectations()); //XXX

        for (i = 0; i < store.levers.length; i++) {
            var lever = store.levers[i];
            console.log(lever.name, lever.tries); //XXX
        }
    };

    window.run();

    window.bandit = {
        store: store,
        rewardExpectations: rewardExpectations
    };

}());


(function(bandit) {
    'use strict';

    var bsl = bandit.store.levers;

    var table = document.createElement('table');
    for (var i = 0; i < bsl.length; i++) {
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        var text1 = document.createTextNode(bsl[i].name);
        var text2 = document.createTextNode(bsl[i].tries);
        var text3 = document.createTextNode(bsl[i].chosen);

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        table.appendChild(tr);
    }
    document.body.appendChild(table);
}(window.bandit));
