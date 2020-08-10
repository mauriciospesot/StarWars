({
	handleClick : function(component, event, helper) {
      var searchId = component.get('v.searchText');
      var action = component.get('c.getCharacter');
      action.setParams({searchId: searchId});
        
      action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === 'SUCCESS') {
          var characterInfo = response.getReturnValue();
          component.set("v.characterInfo", characterInfo);
          component.set("v.searchIsReady", true);
        }
      });

      $A.enqueueAction(action);
    },
    
    handleClickAddContact : function(component, event, helper) {
   	 
      var action = component.get('c.addContact');
        
      action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === 'SUCCESS') {
          // handle response
        }
      });

      $A.enqueueAction(action);
    }
})