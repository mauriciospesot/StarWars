({
    doInit : function(component, event, helper) {
        console.log('update2');
    },
    
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
        var info = component.get("v.characterInfo");
        action.setParams({character: info});  
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                console.log('se creo un contacto');
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "mode": 'sticky',
                    "type": "success",
                    "message": "The record has been created successfully."
                });
                toastEvent.fire();
            } else {
                console.log(state);
            }
        });
        
        $A.enqueueAction(action);
    }
})
