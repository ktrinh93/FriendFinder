var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var userFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: req.body.scores
        }

        friends.push(userFriend);

        var userScores = req.body.scores;
        for(var i = 0; i < userScores.length; i++) {
            userScores[i] = parseInt(userScores[i]);
        }

        var friendDifferences = [];

        for(var i = 0; i < friends.length; i++) {
            var friend = friends[i];
            var friendScores = friend.scores;
            for(var j = 0; j < friendScores.length; j++) {
                friendScores[j] = parseInt(friendScores[j]);
            }

            var difference = 0;
            for(var j = 0; j < userScores.length; j++) {
                difference += Math.abs(userScores[j] - friendScores[j]);
            }

            friendDifferences.push(difference);
        }

        var bestFriendDifference = Math.min(friendDifferences);
        var bestFriendIndex = 0;
        for(var i = 0; i < friendDifferences.length; i++) {
            if(friendDifferences[i] == bestFriendDifference) {
                bestFriendIndex = i;
                break;
            }
        }

        res.json(friends[bestFriendIndex]);
    });
}