# Module - Object-Oriented Principles in Apex

This module introduces the pillars of object-oriented programming and how they are implemented in Apex.

## Table of Contents

* [OOP](#oop)
* [Constructors](#constructors)
* [Encapsulation](#encapsulation)
    * [Apex Encapsulation: Static and Instance](#apex-encapsulation-static-and-instance)
    * [Apex Encapsulation: Initialization Code](#apex-encapsulation-initialization-code)
    * [Apex Encapsulation: Variable Scope](#apex-encapsulation-variable-scope)
    * [Apex Encapsulation: Access Modifiers](#apex-encapsulation-access-modifiers)
    * [Apex Encapsulation: Getters and Setters](#apex-encapsulation-getters-and-setters)
    * [Apex Encapsulation: Properties](#apex-encapsulation-properties)
* [Abstraction](#abstraction)
    * [Apex Abstraction: Abstract Classes](#apex-abstraction-abstract-classes)
    * [Apex Abstraction: Virtual Classes](#apex-abstraction-virtual-classes)
    * [Apex Abstraction: Interfaces](#apex-abstraction-interfaces)
* [Inheritance](#inheritance)
    * [Apex Inheritance: Extending Classes](#apex-inheritance-extending-classes)
    * [Apex Inheritance: Implementing Interfaces](#apex-inheritance-implementing-interfaces)
    * [Apex Inheritance: super & this](#apex-inheritance-super-&-this)
* [Class Signatures](#class-signatures)
* [Polymorphism](#polymorphism)
    * [Apex Polymorphism: Method Overloading](#apex-polymorphism-method-overloading)
    * [Apex Polymorphism: Constructor Overloading](#apex-polymorphism-constructor-overloading)
    * [Apex Polymorphism: Method Overriding](#apex-polymorphism-method-overriding)
* [Inner Classes](#inner-classes)
* [Final Variables](#final-variables)
* [Final Thoughts](#final-thoughts)

### Helpful Links/References

* [Using Constructors (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_constructors.htm)
* [Static and Instance Methods, Variables, and Initialization Code (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_static.htm)
* [Apex Class Definition (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_defining.htm)
* [Access Modifiers (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_access_modifiers.htm)
* [Apex Properties (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_properties.htm)
* [Using the final Keyword (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_keywords_final.htm)

## OOP

When discussing what defines object-oriented programming (OOP), we often point to four features that it contains: encapsulation, abstraction, inheritance, and polymorphism. When we're first getting comfortable with these concepts, it may be difficult to draw clear lines between, e.g. abstraction and encapsulation. In fact, even once we've become confident with the terms, we may still find some trouble doing so! So in this module, we'll draw the clearest lines we can while exploring each of these four OOP principles and how they can be used in Apex code. But before we get to that, let's discuss constructors.

## Constructors

In the `Introduction to Apex` module, we saw how to invoke constructors for system-defined classes, but we didn't explicitly define what they are. Constructors are methods that play in an important role in the object-class relationship - when the class is instantiated, creating an object, the constructor is setup code that defines the initial state of the object by performing functions such as setting initial variable values.

We don't need to write constructors for our Apex classes in order to instantiate them because every class gets a default constructor that takes no arguments. However, this constructor is very shy - as soon as we define our own constructor (no matter the number of parameters it defines), the default goes away. So how do we define our own constructor? By creating a method with the same name as its enclosing class that has no return type - not a `void` return type, but rather no return type declaration at all. Let's demonstrate with the following code.

```apex
public class ExampleClass {
    public ExampleClass() {
        System.debug('I am a constructor!');
    }
}
```

## Encapsulation

Now that we've touched on constructors, let's move to our object-oriented principles. We'll begin with encapsulation, which we may often hear defined as "hiding data." However, this definition does not tell the full story. Encapsulation is about bundling data and methods that work with that data into one unit - a class or object - giving, yet still controlling, access to the unit's contents. So it's not just controlling and restricting access, it's making sure that everything is bundled together properly in the first place.

Let's consider a courthouse: members of the public can enter the courthouse and its various rooms, but only by following predefined rules. Often, citizens will have to pass through a metal detector as soon as they enter the building. Once inside, they may be restricted in the floors they can access from the elevator. Additionally, even on the floors that they have access to, some rooms (e.g. judge's chambers) are locked and inaccessible to the public.

It's all well and good that access to the contents of the courthouse are restricted, but they'd be useless without that second piece of encapsulation - properly enclosing everything in a single unit. For example, all of the building's protections would be for naught if a jury decided to deliberate a sensitive case in the middle of Time Square on live TV this Sunday night on NBC (8:30 EST/5:30 PST, check your local listings) instead of the courthouse.

### Apex Encapsulation: Static and Instance

Since we've established a broader understanding of the concept, let's put fingers to keyboard and discuss how we can implement encapsulation in the Apex language. We'll begin with the "bundling" part of our encapsulation definition. Of course, Apex can't ensure that we have all related methods enclosed together in a specific class or set of classes as needed. But once we've created our class, we can use Apex to determine whether the methods or variables it contains are encapsulated by the class or an object made from that class. Let's explain.

The `static` keyword is used to indicate that a member variable or method is associated with the class itself, rather than an instance of that class. This means that we do not have to instantiate the class to use such a method or reference such a variable, we can simply use dot notation right away like we do in the following example.

```apex
NoInstantiationNeeded.callMeRightAway();
```

And the method it calls:

```apex
public class NoInstantiationNeeded {
    public static void callMeRightAway() {
        System.debug('You do not need to instantiate my class to call me');
    }
}
```

We're able to do this because `static` code is initialized when the class is loaded, which only happens once per transaction. But we should take note of our class signature - unlike classes in other languages, Apex classes _cannot_ be declared `static` themselves, they can only contain `static` code.

But if we don't make our code `static`, what is it? Any non-`static` methods or variables are instance methods and variables, respectively, which require no special keyword. This means that they are associated with an object - an instance of the class - rather than the class itself. Therefore, instance code is recreated with every new object we create, regardless of how many objects our code has already made from the corresponding class. This implies that we can only use such code after we've created an object, and this is indeed the case.

There are of course some considerations that will help inform our decision to make a variable/method `static` or leave it as an instance entity. In many cases, it makes sense for our code to be instance code - it's what allows us to have objects with their own unique states. We can then create instance methods that act on and with our instance variables, giving our objects state-dependent and thus unique behavior as well.

We should also be aware that `static` methods and variables can only be in top-level classes - i.e. not in the inner classes that we'll discuss later in this module. If we're writing Apex code to work with a Visualforce page (a programmatic option for creating custom user interfaces that we'll explore later in training), anything marked as `static` will not be included in the view state for our page.

Perhaps most importantly for our design decisions, instance code knows of the existence of any `static` code, but the reverse is not true. Therefore, if an instance method is in the same class as a `static` variable or `static` method, it can utilize these pieces of code. But, if a `static` method is in the same class as an instance method or variable, it _cannot_ refer to them because that would require the class to be instantiated and defeat the purpose of a `static` method.

Therefore, we have a simple rule of thumb for our methods: if they need to access an instance variable or method, they must be an instance method themselves. We can only use a `static` method when this is not the case.

### Apex Encapsulation: Initialization Code

Initialization code is a set of instructions that runs as soon as a class or an object made from a class is initialized. This code comes in two flavors: `static` and instance. To create instance initialization code, we write a code block within our class that is enclosed only by curly braces. But honestly, we won't want to write instance initialization all that often - it pretty much performs the same function as a constructor, but without some of the constructor benefits that we'll dicuss later, and it's really not that much extra writing to just create the constructor in the first place.

`static` initialization code is declared in a similiar way to its instance cousin, except we prepend our curly brace-enclosed code block with the `static` keyword. Unlike instance initialization, `static` initialization does have some value - we can use it to do things such as populating the elements of a `static` map if we don't want to do so in the corresponding declaration statement. Let's demonstrate.

```apex
public class ExampleClass {
    {
        // this is instance initialization
    }

    public static Map<String, String> nflTeams;

    static {
        nflTeams = new Map<String, String>();
        nflTeams.put('Miami', 'Dolphins');
        nflTeams.put('Kansas City', 'Chiefs');
    }
}
```

### Apex Encapsulation: Variable Scope

Let's conclude our tour of the `static` keyword by discussing variable scope. We already discussed how our `static` and instance variables interact with each other and where they're defined, so what's left? Our local variables of course. As we've already seen, `static` and instance variables are class member variables - i.e. they're declared within the class, but outside of any methods (although they can be used in methods in some cases, as we discussed earlier). Local variables, on the other hand, are declared within our functions and are scoped to the code block that declares them - whether that's the entire function or just an `if` statement within the function.

As a consequence of this predetermined scope, we can't give a local variable one of the access modifiers that we'll discuss soon, nor can we reference said variable outside of the block that declares it - meaning that, even at its most permissive, a local variable can never be accessed outside of the corresponding method. Consider the following example:

```apex
public class ExampleClass {
    public static void ExampleMethod() {
        Integer multiplier = 3;
        for(Integer i = 0; i < 5; i++) {
            System.debug(i * multiplier);
        }
    }
}
```

Because the `for` loop is within the same code block as our `multiplier` variable, we can use `multiplier` within the loop. However, because we declare the `Integer` `i` in the setup for our loop, we _cannot_ reference this variable outside of the loop.


### Apex Encapsulation: Access Modifiers

Let's now move on to our second piece of encapsulation: controlling access to our code. Our first tool is the access modifier, which dictates how other classes and code can interact with the variables and methods within a specific class.

There are four access modifiers in Apex and they are (from most to least restrictive) `private`, `protected`, `public`, and `global`. However, we can't use these access modifiers on just any class or method. For example, `protected` cannot be used on classes (or any `static` entities) and `private` is only available for use on inner classes and top-level classes - if these latter entities are test classes. Additionally, the methods within a class cannot have a more permissive modifier than the class itself - so any `global` methods must be contained within a `global` class.

Okay, now that we've gotten our disclaimers out of the way, let's actually define these keywords. `private` is the default for any method or variable within a class that isn't explicitly given a different modifier and it dictates that the corresponding code can only be referenced/used from within the class where it's declared. A `protected` instance variable or instance method can be seen and used from within the class that declares it, as well as any inner classes and subclasses (we'll touch on those latter two concepts soon).

`public` classes, methods, and variables can be accessed from anywhere within the same namespace. As we've seen previously, different namespaces are only used with managed packages, so anything that's `public` in a managed package can be referenced from within the package, not outside it. Additionally, anything that's `public` and _not_ in a managed package can be referenced by anything that's within the same org and also not in a managed package. These restrictions lead us to correctly conclude that our most permissive modifier, `global`, allows classes, methods, or variables to be seen by any code, regardless of namespace.

### Apex Encapsulation: Getters and Setters

Our next tools for enforcing encapsulation - getters and setters - will likely be familiar if we've worked with any other programming languages before. Getters and setters offer public ways for code outside of our class to retrieve or set variable values, respectively. Let's see them in action in the following code, where we bring back our `Apartment` class from the `Introduction to Apex` module, but with some modifications.

```apex
public class Apartment {
    Boolean hasBalcony;
    Decimal monthlyRent;
    Decimal sqFootage;

    public Decimal calcCostPerSqFoot() {
        Decimal costPerSqFoot = this.monthlyRent / this.sqFootage;
        return costPerSqFoot;
    }

    public Boolean getHasBalcony() {
        return this.hasBalcony;
    }
    public void setHasBalcony(Boolean balcony) {
        this.hasBalcony = balcony;
    }

    public Decimal getMonthlyRent() {
        return this.monthlyRent;
    }
    public void setMonthlyRent(Decimal rent) {
        if(rent > 0) {
            this.monthlyRent = rent;
        }
    }

    public Decimal getSqFootage() {
        return this.sqFootage;
    }
    public void setSqFootage(Decimal footage) {
        if(footage > 0) {
            this.sqFootage = footage;
        }
    }
}
```

We've added three member variables to our class, `hasBalcony`, `monthlyRent`, and `sqFootage`, but haven't given an access modifier to any of them, so they've all defaulted to `private`. This is intentional because we've given each of these variables `public` getters and setters that provide access to them. Because we now have these member variables, our `calcCostPerSqFoot()` method refers to them instead of accepting arguments. This same method shows us an example of a local variable, our `costPerSqFoot` `Decimal`.

The signatures of our three getters are emblematic of getters generally - they should generally be named `get` followed by the name of the variable that they work with, their return type must be the data type of said variable, and they should declare no parameters. Our three setters are also trend-followers because they show a similar naming convention (`set` followed by the name of the variable they work with), have a `void` return type, and declare a single parameter which has the same data type as the corresponding variable.

`setMonthlyRent()` and `setSqFootage()`, which ensure that no negative values are assigned to either of the corresponding variables, represent our first real taste of the value of setters. One of the major benefits of encapsulation is that we're able to ensure that any values the running user attempts to assign to our variables are valid (whatever we decide valid means) before they are assigned. If the proposed value doesn't pass our validation, we won't use it. Additionally, we could have our setters invoke other code whenever a new value is given for our variable.

Finally, we can use getters and setters to restrict access by, e.g., checking the running user's permissions to ensure that they can retrieve or edit, respectively, our variable values before we let them perform the operation. Alternatively, we could exclude a getter or setter, removing the corresponding functionality from outside code altogether.

### Apex Encapsulation: Properties

While we've seen the value of getters and setters, writing one out for every single variable seems like a lot of work. Fortunately, Salesforce agrees with us, so they borrowed the concept of properties from C#. Properties are a special type of variable that include pre-built getters and setters. Let's put these into action and shorten our class from above.

```apex
public class Apartment {
    public Boolean hasBalcony {get;set;}
    public Decimal monthlyRent {get; set{
        if(value > 0) {
            this.monthlyRent = value;
        }
    }}
    public Decimal sqFootage {get; set{
        if(value > 0) {
            this.sqFootage = value;
        }
    }}

    public Decimal calcCostPerSqFoot() {
        Decimal costPerSqFoot = this.monthlyRent / this.sqFootage;
        return costPerSqFoot;
    }
}
```

Much better, but the way our new code works might not be immediately clear. We're making our properties `public`, but we're still able to control access - because of the close relationship between a property and its getter/setter, the system will route any reference to the property to the corresponding getter if we're trying to retrieve the value or to the setter if we're trying to assign a value. As we can see, after declaring the name of our property, we have a set of curly braces in place of our normal line-ending semicolon.

These curly braces contain one or both of the `get` and `set` methods. If we're using the prebuilt getter or setter, these method definitions are followed by a semicolon (`;`). While the prebuilt methods are basic, offering no further functionality beyond the `getHasBalcony()` and `setHasBalcony()` methods that we wrote earlier, they make it so that we don't have to write those methods.

If we want to customize our property methods, as we do with the setters for `monthlyRent` and `sqFootage` above, we replace the semicolon that follows the `get` or `set` method declaration with a pair of curly braces that hold our method's body. Within a property setter, we use `value` to refer to the argument passed to us. Additionally, all custom property getters and setters refer to the property they're associated with using the name of that property.

We have three types of properties: read-only, read-write, and write-only, which are differentiated in the following table.

<table style="margin-left: auto; margin-right:auto">
    <tr>
        <th>Property Type</th>
        <th>Has get Method</th>
        <th>Has set Method</th>
    </tr>
    <tr>
        <td>Read-Only</td>
        <td><img src="img/green_check.png" height="15px"/></td>
        <td></td>
    </tr>
    <tr>
        <td>Write-Only</td>
        <td></td>
        <td><img src="img/green_check.png" height="15px"/></td>
    </tr>
    <tr>
        <td>Read-Write</td>
        <td><img src="img/green_check.png" height="15px"/></td>
        <td><img src="img/green_check.png" height="15px"/></td>
    </tr>
</table>

A fourth type, the automatic property, is a subset of the read-write property where we've used the default `get` and `set` methods, such as with our `hasBalcony` property above. With all of this extra functionality, we can see why we've been very careful to call our regular class variables as just that and not "properties." We often here class member variables referred to as properties in other languages and may even hear the same for variables in Apex - perhaps even throughout the remainder of this module - but we should keep in mind that a property in Apex is not just a variable, it's something more.

## Abstraction

Abstraction is another concept that we often here a go-to definition for: removing or hiding unnecessary complexity from the user. We'll also often here this term explained through an analogy using a car: most of the people who can drive a car don't the precise way an internal combustion engine works, but they can still drive the car because that complexity is abstracted, or removed from them. While it's true that one of the primary benefits of abstraction is that the user doesn't necessarily have to understand the underlying intricacies of what's going on to invoke the behavior, this is again not the full story.

Abstraction is not only used to remove complexity, but also to bundle together repetitive logic in one entity so that it can be invoked repetitively, rather than written repetitively. We can extrapolate this second form of abstraction to the world around us as well - it's similar to how we only define the Apex language in the `Introduction to Apex` module and then later revisit that module as needed, rather than providing a description of Apex every time we talk about it. But this concept is even more valuable in programming - one of the differences between a good programmer and a great programmer is the amount of repetitive code they write, i.e. how much they implement abstraction. We want to be spending our time solving new requirements, not rewriting the same code over and over again.

We can now see the dangers of defining abstraction as "hiding/removing unnecessary complexity" and encapsulation as "hiding data" - we not only lose the full meaning of the terms, but we muddy the waters and make it easier to confuse the two concepts. Nevertheless, the appeal of short and sweet definitions is understandable, so let's offer a couple of our own: abstraction is about where we define our logic, encapsulation is about how our code is bundled together and whether our logic and data can be accessed to perform certain operations.

So where do we see abstraction? For starters, pretty much everywhere in Salesforce. Remember, one of the major benefits of developing declaratively on the platform is that we don't have to worry about a Salesforce update breaking our customizations because the underlying implementation is abstracted away from us. If Salesforce changes how flows retrieve the values of their resources, we won't care one way or the other - at the end of the day, the value of the resource will still be available for us to use, no matter how it's retrieved.

Both forms of abstraction appear constantly in Apex and other programming languages. We could pretty easily write the code behind the `Math.abs()` method - which returns the absolute value of the integer it receives - ourselves, but we don't have to because it's abstracted. No matter how many times we want to get the absolute value of an integer, we can just keep calling this method without needing to repetitively write the underlying logic. Creating our own version of the `Crypto.encrypt()` method would be a much taller task - so we can take advantage of its abstraction in that it both removes the complexity of the logic from us and provides a reusable interface that we can call repeatedly.

### Apex Abstraction: Abstract Classes

Now that we've thoroughly defined the concept and seen how it's used, let's discuss how we can implement abstraction ourselves through three main channels: `abstract` classes, `virtual` classes, and interfaces, starting with the former. An `abstract` class is one declared with the `abstract` keyword that generally contains at least one `abstract` method, although this is not a requirement. This obviously begs the question: what's an `abstract` method? So we should probably define that as well.

`abstract` methods are those that have only signatures, no definitions - i.e. they only have an (optional) access modifier, return type, name, and parameter declarations, but no body. In addition to having `abstract` methods, an `abstract` class can also have any number of `virtual` and regular methods, and we'll hit on the former here shortly. 

`abstract` classes allow us to implement abstraction because they declare the logic that their subclasses must define, but leave the specifics of the definitions to those subclasses. This also means that we can't instantiate an `abstract` class because it's not fully defined, so the system wouldn't have a full set of instructions to follow when creating the corresponding object.

Let's take a look at an example `abstract` class.

```apex
public abstract class GrandparentClass {
    public abstract void sleep();
}
```

As our code shows, the `abstract` keyword in a method or class signature directly follows the access modifier (if an access modifier is given). Everybody needs to sleep, so we have our `GrandparentClass` declare an `abstract` `sleep()` method. With this, we can implement the `sleep()` method in subclasses in different ways depending on our needs - the only requirements are that the method is named `sleep`, it declares no parameters, it has a `void` return type, and it has a `public` modifier. Note that the signature of this method doesn't have any curly braces because it's `abstract` and has no body - it simply ends with a semicolon after the closing parameter parenthesis. 

Even though we can make declare a `private abstract` method, it really doesn't make much sense - any class that attempts to extend our parent class won't be able to see such a method so we won't be able to define it.

### Apex Abstraction: Virtual Classes

`virtual` classes are similiar to their `abstract` cousins, but they're declared with the `virtual` keyword and are only able to contain `virtual` and regular methods - although they don't have to have a `virtual` method. Let's take a quick sidebar and correct our terminology. When we've been referring to "regular" classes and methods, we've actually been meaning "final" classes and methods, which is the default state when we don't use either of the `abstract` or `virtual` keywords. We'll see the consequences of a final item later on when we discuss inheritance, so let's continue with `virtual` methods for now.

`virtual` methods are those that are declared with the `virtual` keyword and - unlike `abstract` methods - have a full definition, as we see in the following example code.

```apex
public virtual class GrandparentClass {
    public virtual void sleep() {
        System.debug('*snore*');
    }
}
```

As we've demonstrated, the placement of the `virtual` keyword is the same as its `abstract` counterpart. But because we're using a `virtual` class, there's no way to include `abstract` methods. Additionally, because non-`abstract` methods must be fully defined, our `virtual` class can be instantiated because the system has a full set of instructions to follow when creating an object.

### Apex Abstraction: Interfaces

An interface is like a more hardcore.... er restrictive `abstract` class. Where an `abstract` class can have methods with full definitions, an interface cannot - an interface consists solely of method signatures, i.e. none of its methods have bodies. Take the following example.

```apex
public interface MyInterface {
    void sleep();
}
```

As our code shows, the `interface` keyword replaces the `class` keyword in our opening signature. Additionally, the method signature is more barebone than even an `abstract` method - it has only the return type, name of the method, and method parameters. We don't (and actually can't) add access modifiers to our interface methods, rather they inherit the modifier applied to the interface itself. Note that we'll create Apex interfaces in the same way that we create Apex classes, whether in the Developer Console (by clicking `File` > `New` > `Apex Class`) or in Visual Studio Code (with the `SFDX: Create Apex Class` command).

Overall, interfaces, `abstract` classes/methods, and `virtual` classes/methods are a form of top-down abstraction: they dictate what functionality the classes that use them must achieve, but do not decree how it must be done. These tools are not the only form of abstraction we'll encounter throughout training - after all, we already saw that abstraction is all around us. We'll see other examples of abstraction when we discuss triggers and Aura components, where best practices dictate the places that we define our logic.

## Inheritance

Inheritance is a principle that allows one entity to take on the state and/or behavior of an existing entity while still having its own separate characteristics. An animal class that is inherited by various species subclasses such as Deer, Whale, and Dog is a common inheritance example - the parent class defines that all animals have common characteristics and behaviors such as eating food and moving, but the subclasses can then implement these behaviors in more specific ways. For instance, a Deer subclass would detail a diet of grass and the way the deer runs, while the Whale subclass would show the whale's krill regimen and olympic-level swimming form.

But as we'll see, we can inherit from interfaces as well as from classes. In fact, let's turn to how we take advantage of inheritance in Apex now.

### Apex Inheritance: Extending Classes

When we inherit from a class, we say that we're extending it because we use the `extends` keyword to do so. We call the class that passes variables and methods the parent class, base class, or superclass, while the class that inherits those entities is known as the subclass, derived class, or child class.

As we can infer from our discussion of access modifiers, a subclass will inherit all non-`private` variables/methods from its parent. Recall that `private` items are not visible to anything except the class that defines them, so they're not able to be seen by any children. Additionally, in order to be eligible to be extended, an aspiring parent class must be either `abstract` or `virtual` because one of the consequences of the default final state that we discussed earlier is that any final class can not be extended.

We can only directly extend up to one other class, but we can form a class hierarchy (no, not that kind) by making a subclass that `extends` a parent class, which in turn `extends` a grandparent class. In fact, let's build such an example with the help of one of our `GrandparentClass` classes from earlier.

```apex
public abstract class GrandparentClass {
    public abstract void sleep();
}
public abstract class ParentClass extends GrandparentClass {}
public abstract class ChildClass extends ParentClass {}
```

As our code shows, we simply follow the name of our subclass with the `extends` keyword and the name of the class from which it directly inherits at the end of the subclass signature. Because `ParentClass` is itself being extended, we had to make it either `virtual` or `abstract`. We made `ChildClass` `abstract` as well because any non-`abstract` subclasses must provide full definitions for the `abstract` methods they inherit. Again, if a class is not `abstract`, it's fully defined, regardless of whether it's `virtual` or final. But we haven't discussed the mechanism for defining inherited methods yet - that's coming in our discussion on polymorphism.

### Apex Inheritance: Implementing Interfaces

Rather than saying that a class extends an interface, we say that it `implements` the interface because use of the `implements` keyword is required. While we still have to discuss some additional tools to be able to fully build classes that extend other classes, we have all we need to create a class that `implements` an interface. Let's do just that with our `MyInterface` from an earlier example and the following code:

```apex
public class ImplementingClass implements MyInterface{
    public void sleep(){
        System.debug('this is an example method definition');
    }
}
```

Our `implements` keyword follows the name of the class and is succeeded by the name or names of the interfaces from which we're inheriting. That's right - we can implement multiple interfaces, we just have to comma-separate their names in our class signature. We explicitly declare our `sleep()` method to be `public` because it would default to `private` otherwise, which would conflict with what our interface dictates.

Where a class inheriting from an `abstract` class has a way out - it can be `abstract` itself if it doesn't want to define all inherited `abstract` methods - there's no similar way to escape for a class that uses an interface. Performing this operation is like signing a contract: any implementing class _must_ fully define all methods from any interfaces that it inherits.

Finally, while we've already seen how classes can extend other classes and implement interfaces, interfaces are also able to extend other interfaces.

### Apex Inheritance: super & this

When we defined `abstract` classes, we said that they were not required to contain `abstract` methods and in fact could have non-`abstract` methods. Well, what if we have a subclass that wants to use such a method from its parent class? For this use case, we'll introduce the `super` keyword, which allows us to invoke a method from a parent through dot notation. For example, if our earlier `GrandparentClass` contained a final `add()` method, we could invoke it from `ParentClass` with `super.add()`.

`super`'s counterpart is `this.`, which we use to refer to instance variables or methods in the current class. We've seen this-dot previously in our `Apartment` class, we just didn't touch on it at the time. We should note that we're only required to use the keyword before variables when a method takes a parameter with the same name as one of the instance variables in the enclosing class.

For example, if our `setHasBalcony()` method from earlier declared a `Boolean` parameter named `hasBalcony`, we'd reference the parameter as `hasBalcony` and the instance variable of the same name with `this.hasBalcony`. But even when it's not required, using `this.` before referencing an instance variable or method can be helpful because it may make our code more readable.

## Class Signatures

Now that we've talked about inheritance, access modifiers, and abstraction, we can fully understand the class signature that we've been using throughout our code examples. When creating a class, we begin with an access modifier (`public` and `global` are the only available options if we're not creating a test class), followed by the `abstract` or `virtual` keywords (if we're creating an `abstract` or `virtual` class), the `class` keyword, the name of the class, the `extends` keyword and the name of the parent class (if we're inheriting from a parent), and finally the `implements` keyword and the name or names of any interfaces (if we're inheriting from interfaces).

Note that the `implements` keyword and corresponding interface(s) are declared after the `extends` keyword and corresponding class if we're both extending a parent class and implementing an interface.

## Polymorphism

It's now time for our final object-oriented principle, polymorphism. Like encapsulation and abstraction, this term also has a common definition - the act of taking many forms. But again, we'll want to provide a fuller description, so we'll define polymorphism as the act of defining constructs of different types that have the same name.

We implement this principle in two ways: method overloading and method overriding. Let's explore each.

### Apex Polymorphism: Method Overloading

Method overloading is the act of writing multiple methods in the same class that each have the same name, but different signatures. The system doesn't see recognize multiple methods that have identical names but different access modifiers or return types as "unique," so the only way we can overload in Apex is to have methods with different numbers and/or types of parameters. Then based off of the arguments we pass to the method when we call it, the system will determine the appropriate method to invoke.

Consider the following class:

```apex
public class Calculator {
    public static Integer add(Integer intOne, Integer intTwo) {
        return intOne + intTwo;
    }

    public static Decimal add(Decimal decOne, Decimal decTwo) {
        return decOne + decTwo;
    }
}
```

If we call `Calculator.add()` and pass two `Integer` values as arguments, our first method will be invoked. Similarly, the system will execute our second method if we call `Calculator.add()` and pass two `Decimal` values.

### Apex Polymorphism: Constructor Overloading

Constructor overloading is a subset of method overloading where we call a second constructor from another constructor. We also refer to this as constructor chaining because we "chain" the two constructors together. Because constructor chaining is part of method overloading, each constructor must differentiate itself by having a unique set of parameters.

To call a second constructor from a first, we use the second form of the `this` keyword - `this()` - that we didn't discuss earlier. Within the parentheses following our keyword, we pass whatever arguments are necessary to invoke the desired constructor. Let's put these concepts into action with a modified version of our `Apartment` class:

```apex
public class Apartment {
    public Boolean hasBalcony {get;set;}
    public Decimal monthlyRent {get; set{
        if(value > 0) {
            this.monthlyRent = value;
        }
    }}
    public Decimal sqFootage {get; set{
        if(value > 0) {
            this.sqFootage = value;
        }
    }}

    public Apartment(Decimal monthlyRent, Decimal sqFootage) {
        this(false, monthlyRent, sqFootage);
    }

    public Apartment(Boolean hasBalcony, Decimal monthlyRent, Decimal sqFootage) {
        this.hasBalcony = hasBalcony;
        this.monthlyRent = monthlyRent;
        this.sqFootage = sqFootage;
    }

    public Decimal calcCostPerSqFoot() {
        Decimal costPerSqFoot = this.monthlyRent / this.sqFootage;
        return costPerSqFoot;
    }
}
```

With our constructor chaining, we're now able to provide a default value for our `hasBalcony` variable. If the user provides a value for `hasBalcony`, we'll use what they give us. If we don't get a `hasBalcony` value, our two-argument constructor will chain to our three-argument constructor through the use of `this()`, passing a default `false` value for `hasBalcony`.

We could also implement constructor overloading by calling a constructor in the parent class through the use of `super()`, again passing along any parameter values needed to invoke the desired constuctor.

### Apex Polymorphism: Method Overriding

While method overloading deals with multiple methods that have the same name and exist within the same class, overriding pertains to methods in subclasses that have the same name as a method in their parent class. Let's summarize the kinds of parent class methods we can override with the following table.

<table style="margin-left:auto; margin-right:auto">
    <tr>
        <th>Method Type</th>
        <th>Can Override?</th>
        <th>Must Override?</th>
    </tr>
    <tr>
        <td>final</td>
        <td></td>
        <td>N/A</td>
    </tr>
    <tr>
        <td>abstract</td>
        <td><img src="img/green_check.png" height="15px"/></td>
        <td><img src="img/green_check.png" height="15px"/> (if subclass is not also abstract)</td>
    </tr>
    <tr>
        <td>virtual</td>
        <td><img src="img/green_check.png" height="15px"/></td>
        <td></td>
    </tr>
</table>

We create overridden methods by using the `override` keyword after the access modifier in our method signature in the subclass. In fact, let's do just that and complete our `GrandparentClass`, `ParentClass`, and `ChildClass` classes through the following code.

```apex
public virtual class GrandparentClass {
    public virtual void sleep() {
        System.debug('*snore*');
    }
}

public virtual class ParentClass {
    public virtual override void sleep() {
        System.debug('*slightly softer snore*');
    }
}

public class ChildClass {
    public override void sleep() {
        System.debug('zzzzzzzzz');
    }
}
```

When we `override` a `virtual` method, we're able to provide an implementation that's different from the parent definition. But we're also still able to call the same method from the parent class using the `super` keyword and dot notation because said parent method has is fully defined.

## Inner Classes

We'll conclude this module with a couple of quick-hitters, beginning with inner classes, which are those that are declared within another class. We can't continually nest inner classes, so a class can contain at most one layer of inner classes and an inner class cannot itself have an inner class. However, a top-level class can have multiple inner classes so long as they're not nested. Similar to what we saw with our methods and variables, the access modifier we provide to an inner class cannot be more permissive than the top-level class that holds it.

## Final Variables

While we've discussed final methods and classes, we haven't seen a `final` keyword yet, but one does exist. This keyword can only be used with variables and is used to declare constants. Any constants can only be given a value when the variable is declared, in an initialization block, or in a class constructor  (if the `final` variable is not also `static`). Once we assign a value to a `final` variable in one of these places, we cannot make any changes.

However, because each object could have its one value for the variable, we're only truly making a constant when our variable is both `static` and `final`. If we're making one of these true constants, the order of these keywords doesn't matter - i.e. both of the following variable declarations are valid.

```apex
final static Integer numberOne = 1;
static final Integer numberTwo = 2;
```

## Final Thoughts

As we've seen throughout this module, it can be difficult at times to differentiate between our four pillars of object-oriented programming. Part of the reason for this is that we often need two or more of the pillars to work in concert in order to achieve our goals. For instance, we had to discuss encapsulation, abstraction, and inheritance before we could understand each possible piece of our class signature. We had to discuss all four concepts before we could fully demonstrate how to implement a subclass-parent class relationship.

While it may take some time to get comfortable with the principles of object-oriented programming, we will - over time - get more comfortable with each of them. Even if we haven't yet, we'll eventually grow to appreciate the benefits and understand the popularity of this programming paradigm.
