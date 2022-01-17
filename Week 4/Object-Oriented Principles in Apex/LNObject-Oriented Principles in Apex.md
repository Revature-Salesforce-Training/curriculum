# Object-Oriented Principles in Apex

## Constructors

* <mark>constructors are methods that are called when the class instantiated, they're used to define the initial state of the object by performing operations such as setting values for class variables</mark>
* <mark>every Apex class has a default constructor that doesn't take any arguments</mark>
    * <mark>if we write our own constructor, this default no-argument constructor will go away</mark>
* to define a constructor, we define a method that has the same name as the enclosing class
    * this method will not have any return type specification

```java
public class Pizza {
public Pizza() {
    }
}
``` 

## Encapsulation

[Static and Instance Methods, Variables, and Initialization Code (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_static.htm)

* ~~hiding data~~
* <mark>encapsulation is about bundling data and methods that work with that data into one unit (i.e. a class or object), giving, yet still controlling, access to the unit's contents</mark>
* <mark>the static keyword is used to indicate that a member variable or method is associated with the class itself, rather than an instance of that class</mark>
    * this means that we don't have to instantiate the class to invoke a static method or read from/assign to a static variable, we can just use dot notation on the class itself
    * static code is initialized when the class is loaded, which occurs the first time that the static method/variable is referenced in a transaction
    * Apex classes can't be static, only methods and variables within them can be
* <mark>anything that's not declared with the static keyword will be an instance method or variable, meaning that we'll need to instantiate the enclosing class before we'll be able to work with it</mark>

### Initialization Code

* initialization code is a set of instructions that runs as soon as a class is referenced or instantiated
* static initialization code
    * we create static initialization code by writing a code block (i.e. a set of curly braces) that's prefixed with the static keyword
    * this allows us to work with, e.g. static collection variables and initialize their values if we don't want to do so when declaring the variables themselves
* instance initialization code
    * rather than writing instance initialization code, we'll just put the same logic in our constructor
    * we write instance initialization code between a set of curly braces within our class

```java
public class Pizza {
{
    // this instance initialization
    }
    
    public static Map<String, String> nflTeams;
    
    static {
    nflTeams = new Map<String, String>();
        nflTeams.put('Miami', 'Dolphins');
        nflTeams.put('Kansas', 'City');
    }
}
```

### Access Modifiers

[Access Modifiers (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_access_modifiers.htm)

* an access modifier dictates the scope of our classes and the variables and methods they contain - i.e. it determines if outside entities can access them
* we have four access modifiers in Apex and they are (from most to least restrictive)
    * <mark>private</mark>
        * <mark>the class/variable/method can't be referenced outside of the class that declares it</mark>
        * private is the default access modifier for any method or variable within a class that isn't given its own access modifier explicitly
            * Apex classes are required to have access modifiers, but the variables and methods they contain aren't required to (although we'll still provide access modifiers for them most of the time)
        * private can only be used on a top-level class if that class is a test class
    * <mark>protected</mark>
        * <mark>the method/variable can be referenced by anything within the class that declares it, as well as by anything within any inner classes or subclasses</mark>
        * classes can't use the protected access modifier
    * <mark>public</mark>
        * <mark>the class/variable/method can be referenced from anywhere within the same namespace</mark>
            * i.e. something that's public and not in a managed package can be referenced by anything else that's within our org and outside of a managed package AND something that's public, but within a managed package, can be referenced by anything within that same managed package
    * <mark>global</mark>
        * <mark>the class/variable/method can be referenced by any code, regardless of namespace</mark>

## Getters and Setters

* getters and setters offer public ways for code outside of the class to retrieve or set a variable's value, respectively
* when creating a getter, we'll want to name the method "get" followed by the corresponding variable name
    * our method should declare no parameters and return a value of the corresponding variable's data type
* when creating a setter, we'll want to name the method "set" followed by the corresponding variable name
    * our method should declare a single parameter of the same data type as the corresponding variable and have a `void` return type
* with getters and setters, we can not only give access, but also control the way that access can be used (e.g. ensuring that a negative value can't be assigned to a number variable whose value should only ever be positive)

### <mark>Properties</mark>

[Apex Properties (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_properties.htm)

* <mark>properties are variables that include a getter and setter</mark>
* when writing a property, rather than ending the declaration with a semicolon, we'll have a set of curly braces instead
* these curly braces can contain the `get` and `set` keywords
* types of properties
    * <mark>read-only properties</mark>
        * those with only a getter that's accessible to outside entities

    ```java
    public hasBalcony {get;}
    ```

    * <mark>write-only properties</mark>
        * those with only a setter that's accessible to outside entities
    * <mark>read-write properties</mark>
        * those with accessible getters and setters
    * <mark>automatic property</mark>
        * a read-write property that uses the default getter and setter
* the default getter (which is used when we don't explicitly define a getter in a property ourselves) just returns the value of the property
* the default setter (which is used when we don't explicitly define a setter in a property ourselves) just assigns the value passed to it to the property
* we can write custom getters and setters for our properties by following the `get` and/or `set` keywords with a set of curly braces containing the logic we want inside our getter or setter
    * if we're writing a custom setter, we'll be able to refer to the value that was passed in with the `value` keyword
* when working with a property, outside entities will refer to it as if were a regular variable
    * if they're retrieving the value of the property, the getter will be called implicitly
    * if they're assigning a value to the property, the setter will be called implicitly
* we apply an access modifier to the property as a whole, but we can override this by applying an access modifier to the get and/or set methods individually
    * e.g.

```java
public Boolean hasBalcony {
    get;
    private set;
}
``` 

## Abstraction

* ~~removing or hiding unnecessary complexity from a user~~
* <mark>abstraction is not only used to remove complexity, but also to bundle together repetitive logic so that it can be invoked repetitively, rather than being written repetitively</mark>
    * abstracting away repetitive code will allow us to keep our codebase clean and easier to maintain - if we need to update some piece of logic that we use frequently, we'll only need to update once (i.e. in the only method that contains that logic)
 

### <mark>Abstract Classes</mark>

* <mark>an abstract class is a class that's declared with the `abstract` keyword and generally contains at least one abstract method</mark>
* <mark>an abstract method only has a signature, it doesn't have a body</mark>
* in addition to containing abstract methods, an abstract class can contain any number of virtual or final methods
* abstract classes allow us to implement abstraction because they declare the logic that their subclasses must define, but leave the specifics of the definitions to those subclasses
* <mark>we can't instantiate an abstract class</mark>

```java
public abstract class GreenDinosaur {
    public abstract void eat();
}
```

* subclasses can implement the abstract method(s) from an abstract class, the method will need to have the same name, return type, and parameters

### <mark>Virtual Classes</mark>

* <mark>virtual classes are declared with the `virtual` keyword and can contain virtual and final methods (i.e. no abstract methods)</mark>
    * virtual classes are not required to contain virtual methods
* final classes and methods are those that are declared without either the virtual or abstract keywords - i.e. all Apex classes/methods are final by default
* <mark>virtual methods are declared with the `virtual` keyword and have a full definition</mark>

```java
public virtual class GreenDinosaur {
    public virtual void eat() {
        System.debug('eat leafy things');
    }
}
``` 

* <mark>virtual classes (unlike abstract classes) can be instantiated</mark>

### Interfaces

* <mark>an interface is an Apex file that consists solely of method signatures</mark> (i.e. none of its methods have bodies)
* the method signatures within an interface can't include an access modifier (they inherit the access modifier applied to the interface as a whole)

```java
public interface DinosaurInterface {
void eat();
}
``` 

** Abstraction using interfaces, abstract classes/methods, and virtual classes/methods is a form of top-down abstraction - they dictate what functionality the classes that use them need to implement, but they don't dictate how that needs achieved. **

## Inheritance

* <mark>inheritance allows one entity (i.e. class or object) to take on the state and/or behavior of an existing entity while still having its own separate characteristics</mark>

### Extending Classes

* <mark>when we inherit from a class, we use the `extends` keyword</mark>
* the class that we're extending is the parent class/superclass
* the class that's inheriting is the child class/subclass
* <mark>to be able to extend a class, that class needs to be either `abstract` or `virtual` (final classes cannot be extended)</mark>
* we can only directly extend one class at most

```java
public class TyrannosaurusRex extends GreenDinosuar {
}
``` 

### Implementing Interfaces

* <mark>we can implement interfaces by using the `implements` keyword</mark>
* we can implement multiple interfaces, we'll just comma-separate their names

```java
public class ImplementingClass implements InterfaceOne, InterfaceTwo {
}
``` 

* <mark>any class that implements an interface must fully define all methods that it inherits from that interface</mark>

### `super` & `this`

* <mark>the `super` keyword allows us to call a method/variable from a parent class</mark>
    * we do so by following the keyword with dot notation and the name of the method/variable (e.g.` super.scarePeople()`)
* <mark>the `this` keyword refers to instance variables or methods in the current class</mark>

## Polymorphism

* ~~the act of taking many forms~~
* <mark>polymorphism is the act of defining constructs (e.g. methods) of different types that have the same name</mark>

### Method Overloading

* <mark>method overloading is the act writing multiple methods in the same class that each have the same name, but different signatures</mark>
* to overload an Apex method, <mark>the overloaded method will need to have a different number of parameters or different types of parameters</mark>

```java
public class Calculator {
public static Integer add(Integer intOne, Integer intTwo) {
    return intOne + intTwo;
    }
    
    public static Decimal add(Decimal decOne, Decimal decTwo) {
    return decOne + decTwo;
    }
}
```

* based off of the number and types of arguments, the system will determine the appropriate method to invoke

### Constructor Overloading

* <mark>constructor chaining</mark>
* <mark>constructor overloading is a subset of method overloading where we call a second constructor from another constructor</mark>
* each constructor must have a unique set of parameters
* <mark>to invoke a second constructor from another, we'll use `this()`</mark>
    * within the parentheses, we'll pass our arguments
* we'll frequently use constructor chaining when we want to provide default values for class variables
* <mark>we can also invoke a parent constructor with the use `super()`</mark>
    * within the parentheses, we'll pass our arguments

### Method Overriding

* <mark>method overriding pertains to methods in subclasses that have the same signature as a method in a parent class</mark>

| Method Type | Can Override? | Must Override? |
| ---------------- | ----------------- | ------------------- | 
| `final` | No | N/A |
| `abstract` | Yes | Yes (if subclass is not also `abstract`) |
| `virtual` | Yes | No |
 
* <mark>we create overridden methods by using the override keyword after the access modifier in our method signature</mark>

```java
public class TyrannosaurusRex {
public override void eat() {
    System.debug('munch on not-leafy things');
    }
}
```
 
## Inner Classes

* <mark>inner classes are classes that are declared within another</mark>
* <mark>we can't continually nest inner classes - i.e. an inner class can't contain another inner class</mark>
* inner classes are commonly used for, e.g. creating custom data types

## Final Variables

[Using the final Keyword (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_keywords_final.htm)

* the final keyword can only be used with variables and is used to declare constants
