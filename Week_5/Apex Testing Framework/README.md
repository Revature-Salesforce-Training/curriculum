# Apex Testing Framework

Purpose of this module is to introduce testing in Apex and testing best practices.

* [Lecture Notes]()
* [Exercises]()

## List of Topics

* Apex Testing Framework
  * Apex Test Class
  * Test Annotations - @isTest
    * @isTest/(SeeAllData=true)
    * @testSetup/@testVisible
  * Test Utility Class
  * Using Data in Test Classes
  * Static Resources
  * Test Class - startTest & stopTest
    * Governor Limits, Asynchronous
  * Apex Test Execution UI
    * Run Tests from Dev Console
    * Run Tests Using API
    * Run Tests using VSC
  * SOQL in Test Classes
  * Testing Visualforce
  * Testing Best Practices
    * Test Single Action
    * Test Bulk Action
    * Test Positive/Negative Behavior
    * Test Restricted User
      * runAs()

## Learning Objectives

After completing this module, associates should be able to

* Identify the test class/method annotation
* List the requirements for a test method signature
* Explain the annotation for, purpose of, and effects of a test setup factory
* Describe the use of the test.StartTest() and test.StopTest() methods
* Correctly identify the method to run a block of code as a specific user
* List the five testing best practices
* Recall the minimum code coverage required for deployment
