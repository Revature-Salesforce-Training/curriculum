It's good to keep a trigger skeleton handy. Here we can clearly take action based on what the context of the trigger was. And then of course follow our trigger best practices by calling a method from a helper class when needed.

```
trigger ObjectTrigger on sObject (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    // We check the context of the trigger, and then route it to the appropriate handler methods.
    Switch on Trigger.OperationType {
        when BEFORE_INSERT {
            
        } 
        when BEFORE_UPDATE {
            
        }
        when BEFORE_DELETE {
            
        }
        when AFTER_INSERT {
            
        }
        when AFTER_UPDATE {
            
        }
        when AFTER_DELETE {
            
        }
        when AFTER_UNDELETE {
            
        } when else {
            
        }
        
    }
}
```