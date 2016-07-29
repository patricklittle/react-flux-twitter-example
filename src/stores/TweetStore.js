var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TweetConstants = require('../constants/TweetConstants');
var TweetActions = require('../actions/TweetActions');
var assign = require('object-assign');



var TweetStore = assign({}, EventEmitter.prototype, {

    data: [
        {
            message: 'hey this is an initial tweet by someone else',
            name: 'Patrick',
            likes: 12,
            liked: false,
            id: 1,
            retweet: false,
            oguser: ''
        }
    ],

    getItems: function(){
        return this.data;
    },

    // Add item
    addItem: function(newTweet){
        this.data.push(newTweet);
    },

    addLike: function(id, updates) {
        function findTweet(tweet) {
            return tweet.id === id;
        }

        var releventTweet = this.data.find(findTweet);
        var index = this.data.findIndex(findTweet);

        this.data[index] = assign({}, this.data[index], updates);
    },

    removeLike: function(id, updates) {

        function findTweet(tweet) {
            return tweet.id === id;
        }

        var releventTweet = this.data.find(findTweet);
        var index = this.data.findIndex(findTweet);

        this.data[index] = assign({}, this.data[index], updates);
    },

    retweet: function(id, updates) {
        console.log('id: ' + id);

        function findTweet(tweet) {
            return tweet.id === id;
        }

        var releventTweet = this.data.find(findTweet);
        var index = this.data.findIndex(findTweet);
        var freshRetweet = assign({}, this.data[index], updates);

        console.log(freshRetweet);
        this.data.push(freshRetweet);

    },

    // Emit Change event
    emitChange: function(){
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback){
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback){
        this.removeListener('change', callback);
    }

});


AppDispatcher.register( function( payload ) {

    switch (payload.actionType) {
        case TweetConstants.TWEET_CREATE:
            TweetStore.addItem(payload);
            TweetStore.emitChange();
            break;

        case TweetConstants.TWEET_LIKE:
            TweetStore.addLike(payload.id, {likes: payload.likes, liked: true});
            TweetStore.emitChange();
            break;

        case TweetConstants.TWEET_UNLIKE:
            TweetStore.removeLike(payload.id, {likes: payload.likes, liked: false});
            TweetStore.emitChange();
            break;

        case TweetConstants.TWEET_RETWEET:
            TweetStore.retweet(payload.tweet, {name: "Tom", retweet: true, oguser: payload.oguser, id: payload.newid, likes: 0});
            TweetStore.emitChange();
            break;
    }
    return true;
});

module.exports = TweetStore;
