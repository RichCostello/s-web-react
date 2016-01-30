var _state = {}; 

var SidebarListeningStore = Flux.createStore({
 
  fetchUserListening: function() { 
    return _state["userListening"];
  },
  setSidebarListening: function(str,listeningObj) {
    _state[str] = {};
    _state[str][str] = listeningObj;

    SidebarListeningStore.emitChange();
  },
}, function(payload){

 if(payload.actionType == "FETCH_USERLISTENING") {
      SidebarListeningStore.emitChange();
  }
  if(payload.actionType == "SET_LISTENING"){
    SidebarListeningStore.setSidebarListening('userListening', payload.stations);
  }

});

export default SidebarListeningStore;