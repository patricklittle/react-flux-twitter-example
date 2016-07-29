import React from 'react';
import Tweet from './Tweet';

var TweetList = React.createClass({

    render: function() {

        var tweets = this.props.data.map(function(tweet) {
            return (
                <Tweet key={tweet.id} {...tweet}/>
            );
        });

        return (
            <div className="tweet-list">
                {tweets}
            </div>
        );
    }
});

export default TweetList;
