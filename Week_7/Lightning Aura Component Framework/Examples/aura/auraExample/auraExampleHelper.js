({
    changeDivContent : function(component) {

        var method = component.get("c.returnStringMessage");
        //no params required in this example
        method.setParams({message : 'hello class!!!'});
        method.setCallback(this, function(response){
            
            if(response.getState() == "SUCCESS"){
                component.set("v.myAtt", response.getReturnValue());
                
            }

        });
        $A.enqueueAction(method);
    },

    handleCmpEvent : function(component, event) {
        component.set("v.compMessage", event.getParam("exampleMessage"));
    },

    handleApplicationEvent : function(component, event) {
        component.set("v.appMessage", event.getParam("appEventMessage"));
    }
})