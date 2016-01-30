'use strict';

import _                from 'lodash';
import {Navigation}     from 'react-router';

import CurrentUserStore from '../stores/CurrentUserStore';

var AuthenticatedRouteMixin = {

  mixins: [Navigation],

  _checkIfRedirect() {
    if ( _.isEmpty(CurrentUserStore.user) && CurrentUserStore.hasBeenChecked && this.isMounted() ) {
      console.log("Can they reach this?");
      //this.replaceWith('Login');
    }
  },

  componentDidMount() {
    this._checkIfRedirect();
  },

  componentDidUpdate() {
    this._checkIfRedirect();
  }

};

export default AuthenticatedRouteMixin;