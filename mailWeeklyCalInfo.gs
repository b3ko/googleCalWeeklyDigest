function mailWeeklyCalInfo() {
  //get all the calendars associated with my account and store the IDs in an array
  var calendars = CalendarApp.getAllCalendars();
  var id = [];
  for(i = 0; i < calendars.length; i++)
  {
    id.push(calendars[i].getId());
  }
  
  //grab the date as well as create a date one week in the future
  var now = new Date();
  var oneWeekFromNow = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)); //(week / day / hour / min / second)
  var oneYearFromNow = new Date(now.getTime() + (52 * 7 * 24 * 60 * 60 * 1000));
  var yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  
  //grab all the events for each calendar
  var events = [];
  for(i = 0; i < id.length; i++)
  {
    events.push(CalendarApp.getCalendarById(id[i]).getEvents(now, oneWeekFromNow));
  }
 
  //grab all events for the next year
  var allEvents = [];
  for(i = 0; i < id.length; i++)
  {
    allEvents.push(CalendarApp.getCalendarById(id[i]).getEvents(now, oneYearFromNow));
  }
  
  var newEvents = [];
  for(i = 0; i < id.length; i++)
  {
    for(j = 0; j < allEvents[i].length; j++)
    {
      var createDate = allEvents[i][j].getDateCreated();
      if (createDate > yesterday)
      {
        newEvents.push(allEvents[i][j]);
      }
    }
  }
  
  //get the deatils (title, datetime, and color for the calendar) for each event
  var eventDetails = []
  for(i = 0; i < id.length; i++)
  {
    for(j = 0; j < events.length; j++)
    {
      if(events[i][j]) 
      {
        if(CalendarApp.getCalendarById(events[i][j].getOriginalCalendarId()))
        {
        eventDetails.push({title: events[i][j].getTitle(), date: events[i][j].getStartTime(), color: CalendarApp.getCalendarById(events[i][j].getOriginalCalendarId()).getColor()});
        }
        else
        {
          eventDetails.push({title: events[i][j].getTitle(), date: events[i][j].getStartTime(),color: "black"});
        }
      }
    }
  }
  
  //sort all the events by date (overall, not by calendar)
  eventDetails.sort(function (a, b) {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  
  //create an email with the info and email it!
  var body = "";
  for (i = 0; i < eventDetails.length; i++)
  {
    var color = eventDetails[i].color;
    body += "<p style='color:" + color + ";'>EVENT TITLE: " + eventDetails[i].title + "<br>EVENT DATE: " + eventDetails[i].date.toDateString() + "<br>EVENT START TIME: "
    + eventDetails[i].date.toLocaleTimeString() + "<br></p>"; 
   }
  
  if (newEvents.length > 0)
  {
  
    //add a header for the new events section
    body = body + "<hr><br><p>Newly Added Events:<br>";
    //loop through the new events and add to email
    for (i = 0; i < newEvents.length; i++)
    {
      body = body + "Event Title: " + newEvents[i].getTitle() + "<br>Event Date: " + newEvents[i].getStartTime().toDateString() + "<br>Event Start Time: " 
      + newEvents[i].getStartTime().toLocaleTimeString() + "<br>";
    }
    body = body + "</p>";
  } else
  {
    body = body + "NO NEW EVENTS</p><br><hr>";
  }
  GmailApp.sendEmail("example@mail.com", "schedule for the next 7 days", "", { htmlBody: body, cc: "example@mail.com", name: "me" });
}


