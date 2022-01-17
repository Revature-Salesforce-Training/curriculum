///////////////////////////////////////////////////////////////
//
// Name: Example Schedulable Apex
// Author: Harvey Hill, Salesforce Team
// Created: 05/02/19
// Updated: 04/29/21
// Description: Example for use of the schedulable interface
// 	and asynchonous apex.
//
///////////////////////////////////////////////////////////////
/*
New Schedulable Class Example
    Why do we schedule Apex?
        • When we want certain actions to happen at a specified time. 
        Pretty straightforward really.
    Notes:
        ::::::Cron Expressions::::::
        • The following are the values for the expression:
            • Name	
            • Values	
            • Special Characters
        • Seconds	
            • 0–59	
            • None
        • Minutes	
            • 0–59	
            • None
        • Hours	
            • 0–23	
            • None
        • Day_of_month	
            • 1–31	
            • , – * ? / L W
        • Month	
            • 1–12 or the following: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
            • , – * /
        • Day_of_week	
            • 1–7 or the following: Sun, Mon, Tue, Wed, Thu, Fri, Sat
            • , – * ? / L #
        • optional year	
            • null or 1970–2099	
            • , – * /
        • The following are some examples of how to use the expression.
            • Expression	
            • Description
        • 0 0 0 ? * * *	
            • at 12:00 AM every day
        • 0 0 10 ? * *	
            • at 10:00 AM every day
        0 0 10 * * ?	
            • at 10:00 AM every day
        • 0 0 10 * * ? *	
            • at 10:00 AM every day
        • 0 0 15 ? * * *	
            • at 3:00 PM every day
        • 0 0-5 15 * * ?	
            • Every minute starting at 3:00 PM and ending at 3:05 PM, every day
        • 0 15 17 ? * MON-FRI	
            • at 5:15 PM every Monday, Tuesday, Wednesday, Thursday and Friday
        • 0 15 10 15 * ?	
            • at 5:15 PM on the 15th day of every month
        • 0 15 17 ? * 6#3	
            • at 5:15 PM on the third Friday of every month
        • 0 0 18 ? * 6L	
            • runs the last Friday of every month at 6:00 PM.
        • ‘0 30 * * * *’;	
            • every 30 minutes
        • 0 0 12 * * ?	
            • at 12:00 PM every day
        • 0 0 23 * * ? 2016	
            • runs every day at 11:00 PM during the year 2016.
    ::::::Special Characters::::::
    • Special Character	
    • Description
    • ,	
    • Delimits values. For example, use JAN, MAR, APR to specify more than one month.
    • -	
    • Specifies a range. For example, use JAN-MAR to specify more than one month.
    • *	
    • Specifies all values. For example, if Month is specified as *, the job is 
      scheduled for every month.
    • ?	
    • Specifies no specific value. This is only available for Day_of_month and 
      Day_of_week, and is generally used when specifying a value for one and not the other.
    • /	
    • Specifies increments. The number before the slash specifies when the intervals 
      will begin, and the number after the slash is the interval amount. For example, 
      if you specify 1/5 for Day_of_month, the Apex class runs every fifth day of the month, 
      starting on the first of the month.
    • L	
    • Specifies the end of a range (last). This is only available for Day_of_month and 
      Day_of_week. When used with Day of month, L always means the last day of the month, 
      such as January 31, February 29 for leap years, and so on. When used with Day_of_week 
      by itself, it always means 7 or SAT. When used with a Day_of_week value, it means the 
      last of that type of day in the month. For example, if you specify 2L, you are specifying 
      the last Monday of the month. Do not use a range of values with L as the results might be 
      unexpected.
    • W	
    • Specifies the nearest weekday (Monday-Friday) of the given day. This is only available for 
      Day_of_month. For example, if you specify 20W, and the 20th is a Saturday, the class runs 
      on the 19th. If you specify 1W, and the first is a Saturday, the class does not run in the 
      previous month, but on the third, which is the following Monday.
        • Tip
        • Use the L and W together to specify the last weekday of the month.
    • #	
    • Specifies the nth day of the month, in the format weekday#day_of_month. This is only 
      available for Day_of_week. The number before the # specifies weekday (SUN-SAT). The 
      number after the # specifies the day of the month. For example, specifying 2#2 means 
      the class runs on the second Monday of every month.
    ::::::Manual Scheduling via UI::::::
        • It is also possible to schedule an Apex class from the user interface with 
        the following steps:
            1. Navigate to Setup, search for Apex in the Quick Find box, then select Apex Classes.
            2. Click Schedule Apex.
            3. Enter the job name, Example – Daily Account Update.
            4. Click the lookup button to search Apex class and select the class.
            5. Select Weekly or Monthly for the frequency and set options as needed.
            6. Select the start and end dates, and also the preferred start time.
            7. Click Save.
*/

// We need to implement the schedulable interface first
global with sharing class ExampleSchedulableApex implements Schedulable{
// Must be global or public   

    //We must have an execute, which contains the code to be executed upon the scheduled time.
    //You can ignore the schedulableContext, it is used by the system to track the job.
    global void execute(SchedulableContext sc) {
        Contact c = new Contact();
        c.LastName = 'New Contact';
        insert c;
        ExampleBatchableApex abcd = new ExampleBatchableApex();
        database.executeBatch(abcd);
    }
/*
ExampleSchedulableApex esa = new ExampleSchedulableApex();
//at 5:15 PM on the third Friday of every month
String time = '0 15 17 ? * 6#3';
String jobID = system.schedule('New Contact', time, esa);
*/
}