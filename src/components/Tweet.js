import React from 'react';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TweetConstants = require('../constants/TweetConstants');
var TweetActions = require('../actions/TweetActions');
var TweetStore = require('../stores/TweetStore');
var assign = require('object-assign');
var classNames = require('classnames');

var Tweet = React.createClass({

    checkLikes: function(e){
        e.preventDefault();

        var id = this.props.id

        if(this.props.liked === false){
            var likes = this.props.likes + 1;
            TweetActions.likeTweet(id, likes);
        } else {
            var likes = this.props.likes - 1;
            TweetActions.unlikeTweet(id, likes);
        }
    },

    retweet: function(e) {
        e.preventDefault;
        var id = this.props.id;
        var oguser = '';

        if(this.props.name != this.props.oguser) {
            var oguser = this.props.name;
        } else {
            var oguser = this.props.oguser;
        }

        TweetActions.retweet(id, oguser);

        console.log('retweeted ' + oguser);
    },

    render: function() {
        var tweetClass = 'tweet'

        var retweetInfo = '';

        if(this.props.retweet) {
            tweetClass += 'tweet retweeted'
            retweetInfo = (
                <p>- {this.props.oguser}</p>
            )
        }

        var likeIconClass = 'fa fa-heart-o';
        if(this.props.liked) likeIconClass += 'fa fa-heart';
        return (
            <div className={tweetClass}>
                <div className="tweet-message">
                    {this.props.message}
                    {retweetInfo}
                </div>
                <div className="tweet-meta">
                    <p>Posted by: {this.props.name}.</p>

                    <p><a href="#" onClick={this.checkLikes}>{this.props.likes} <i className={likeIconClass} aria-hidden="true"></i></a> | <a href="#" onClick={this.retweet}><i className="fa fa-retweet" aria-hidden="true"></i></a></p>
                </div>
            </div>
        );
    }
});


export default Tweet;
