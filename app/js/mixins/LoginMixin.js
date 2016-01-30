'use strict';

import _                from 'lodash';
import {Navigation}     from 'react-router';

import CurrentUserStore from '../stores/CurrentUserStore';

// this will work for now until we can figure out how this mixin is really suppose to work

    
if ( CurrentUserStore.checkLoginStatus() ) {
    //you are logged in
    //and trying to access one of these urls                replace with these urls
    if(window.location.href.indexOf('/login') != -1){window.location.href = '/feed';}
    if(window.location.href.indexOf('/splash') != -1){window.location.href = '/feed';}
    if(window.location.href.indexOf('/signup') != -1){window.location.href = '/feed';}

}else{

    //you are not logged in
    //and trying to access one of these urls
// if(window.location.href.indexOf('/login') != -1){window.location.href = '/feed';} 

}

//I don't know about this right now

var loginMixin = {

  mixins: [Navigation],

  _checkIfRedirect() {
    if ( CurrentUserStore.checkLoginStatus()) {
        // console.log('this');
      this.replaceWith('Feed');
    }
  },

  componentDidMount() {
      // console.log('this did mount');
    this._checkIfRedirect();
  },

  componentDidUpdate() {
     // console.log('this did update');
    this._checkIfRedirect();
  }

};

export default loginMixin;