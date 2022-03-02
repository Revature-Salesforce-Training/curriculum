({
    fireCompEvent : function(component) {

        var eventComp = component.getEvent("compEvent");
        eventComp.setParams({"exampleMessage" : "This is a message from my component event!"});
        eventComp.fire();
    },

    fireAppEvent : function() {
        var eventApp = $A.get("e.c:ExampleAppEvent");
        eventApp.setParams({"appEventMessage" : "This is a message from my app event!"});
        eventApp.fire();
    }
})
