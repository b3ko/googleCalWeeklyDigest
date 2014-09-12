googleCalWeeklyDigest
=====================

A google script to get all the events for the next 7 days from your google calendar and then send you a email reminder

To use this script go to http://www.google.com/script/start/ and click start scripting.

from here click blank project and add the code from my file.
Make sure to replace the placeholder email addresses with your actual email address(es).
save, and click run. you may be asked to authorize that the app can send mail and have access to your calendars.

Now to create a trigger simply go to Resources > Current project's triggers and add a name and click ok.
In the next pop-up click the blue text to add a trigger.
It should default to the function that is in the script. choose Time-driven, Day timer, choose a time you would like your email to hit your inbox and click save.

The next time your selected time passes you should get an email.

have fun.
