import React from 'react';
import TweetComposer from './components/TweetComposer';
import TweetList from './components/TweetList';
import TweetStore from './stores/TweetStore';
import AppDispatcher from './dispatcher/AppDispatcher';

let getListState = () => {
  return {
    items: TweetStore.getItems()
  };
}

var Tweets = React.createClass({

    getStateFromStores: function() {
        return {
            data: TweetStore.getItems(),
        }
    },

    getInitialState: function() {
        return this.getStateFromStores();
    },

    _onChange: function() {
        this.setState(this.getStateFromStores());
    },

    componentWillUnmount: function() {
        TweetStore.removeChangeListener(this._onChange);
    },

    componentDidMount: function() {
        TweetStore.addChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div className="tweet-box">
                <p>You're logged in as Tom.</p>
                <TweetComposer/>
                <TweetList data={this.state.data}/>
            </div>
        );
    }
});

export default Tweets;
