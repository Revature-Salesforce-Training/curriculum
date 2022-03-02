({
    handleClick : function(component, event, helper) {
        helper.changeDivContent(component);
    },

    handleCompEvent : function(component, event, helper) {
        helper.handleCmpEvent(component, event);
    },

    handleAppEvent : function(component, event, helper) {
        helper.handleApplicationEvent(component, event);
    }
})