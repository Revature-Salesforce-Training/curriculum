({
    handleClick : function(component, event, helper) {
        helper.fireCompEvent(component);
    },

    handleAppClick : function(component, event, helper) {
        helper.fireAppEvent(component);
    }
})
