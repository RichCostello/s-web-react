var _state = {};

_state["content"] = content;

var ModalStore = Flux.createStore({
 
  fetchContent: function() {
    return _state["content"];
  },

  setContent: function(obj) {
    _state["content"] = {'content': obj};
    ModalStore.emitChange();
  },
 
}, function(payload){
  if(payload.actionType == "FETCH_CONTENT") {
    if(ModalStore.fetchContent() != undefined) {
      ModalStore.emitChange();
    } else {
      ModalActions.setContent(payload.content);
    }
  }

  if(payload.actionType == "SET_CONTENT") {
    ModalStore.setContent(payload.content);
    ModalStore.emitChange();
  }
});

/* This is just for now until the API works */
var content = {'content' : <empty />};

export default ModalStore;