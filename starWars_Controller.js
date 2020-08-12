({
    handleClick : function(component, event, helper) {
        var searchId = component.get('v.searchText');
        var action = component.get('c.getCharacter');
        action.setParams({searchId: searchId});
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var characterInfo = response.getReturnValue();
                if(characterInfo.found) {
                    component.set("v.characterInfo", characterInfo);
                	component.set("v.searchIsReady", true);
                } else {
                    component.set("v.searchIsReady", false);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "The character was not found!",
                        "type": "info",
                        "message": "The id you entered may not be the right one."
                    });
                    toastEvent.fire();
                }   
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
                
                if(response.getReturnValue()) {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "mode": 'sticky',
                        "type": "success",
                        "message": "The record has been created successfully."
                    });
                    toastEvent.fire();
                } else {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Character already exist as a contact!",
                        "mode": 'sticky',
                        "type": "info",
                        "message": "The record has not been created."
                    });
                    toastEvent.fire();
                }
            } else {
                console.log(state);
            }
        });
        
        $A.enqueueAction(action);
    }
})
