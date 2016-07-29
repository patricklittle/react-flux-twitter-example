var AppDispatcher = require('../dispatcher/AppDispatcher');
var TweetConstants = require('../constants/TweetConstants');

module.exports = {

    newTweet(message) {

        if(message){

            var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

    		AppDispatcher.dispatch({
    			actionType: TweetConstants.TWEET_CREATE,
    			message: message,
                name: 'Tom',
                likes: 0,
                liked: false,
                id: id
    		});
        }
	},

    likeTweet(id, likes, liked) {

        AppDispatcher.dispatch({
			actionType: TweetConstants.TWEET_LIKE,
            id: id,
            likes: likes,
            liked: liked

		});
	},

    unlikeTweet(id, likes, liked) {

        AppDispatcher.dispatch({
			actionType: TweetConstants.TWEET_UNLIKE,
            id: id,
            likes: likes,
            liked: liked

		});
	},

    retweet(tweet, oguser) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        var retweetedUser = oguser;
        console.log(oguser);

		AppDispatcher.dispatch({
			actionType: TweetConstants.TWEET_RETWEET,
            tweet: tweet,
            newid: id,
            oguser: retweetedUser,
            retweeted: true,
		});
	},
};
