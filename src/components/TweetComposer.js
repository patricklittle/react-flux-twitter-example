import React from 'react';
var TweetActions = require('../actions/TweetActions');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Update = require('react-addons-update');

var TweetComposer = React.createClass({
    getInitialState: function() {
        return {
            remainingCharacters: '140'
        }
    },

    onChange: function(e){
        var characterCount = e.target.value.length;
        var chatacterMath = (140 - characterCount);

        this.setState({
            remainingCharacters: chatacterMath.toString()
        })

    },

    handleSubmit: function(e) {
        e.preventDefault();

        var message = this.refs.tweetMessage.value;

        // Clear form
        this.refs.tweetMessage.value = '';

        this.setState({
            remainingCharacters: '140'
        })

        // Flux Action
        TweetActions.newTweet(message);

    },

    render: function() {
        return (
            <div className="tweet-composer">
                <form className="clearfix" onSubmit={this.handleSubmit}>
                    <textarea ref="tweetMessage" onChange={this.onChange} placeholder="Whats up?" maxLength="140" draggable="false"/>
                    <div className="tweet-composer-controls">
                        <div className="character-count">
                            {this.state.remainingCharacters} Characters Remaining
                        </div>
                        <input type="submit" value="Tweet" className="button" />
                    </div>
                </form>
            </div>
        );
    }
});

export default TweetComposer;
