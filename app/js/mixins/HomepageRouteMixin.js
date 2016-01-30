'use strict';

import _                from 'lodash';
import {Navigation}     from 'react-router';

var AuthenticatedRouteMixin = {

  mixins: [Navigation],

  _checkIfRedirect() {

    if(TenantStore.isPrivateLabelTenant() == true){
         this.replaceWith('Feed');
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