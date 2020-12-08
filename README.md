# Jobsity - Challenge

## Introduction

This challenge's goal is to develop a calendar web app that supports reminders. All the mandatory and optional requirements were met.

## Preset

For this project, the following preset was used:
- Vue
- Babel
- Vue Router
- Vuex
- LESS
- Linter + Formatter
- Unit test (Jest)

## Architecture

The following diagrams show the proposed architecture for the components and the Vuex store:

![Components](https://user-images.githubusercontent.com/7889190/101422016-6abe2300-38d4-11eb-9f9e-ad23ceb97df2.png)

### Components

**1. Calendar:** main component that contains every sub-component to make the calendar

**2. CalendarHeader:** shows the current month and has the actions to open the reminder form modal and navigate between months

**3. CalendarGrid:** component that contains the days of the month

**4. Weekdays:** component that solely reponsibility is to show the days of the week

**5. ReminderForm:** form component with the fields to add/update a reminder (Date/Time, Description, City and Color)

**6. WeatherForect:** component responsible to fetch the weather forecast for the selected date/time and city

**7. EventChip:** component responsible to show the reminder info inside a date

### Weather Forecast API

To fetch the forecast for the selected date/time and city, it was used the free tier of [Open Weather Map 5-day/3-hour Forecast](https://openweathermap.org/forecast5)

**Remarkable Points:**

* This free tier does not support historical data. That means if the user select a past date, a friendly message will be shown to inform the user about this limitation.
* The forecast for today date has limited availability until 00:00 GMT. That means if the user select a date/time past this time (converted to the user timezone), a friendly message will be shown to inform the user about this limitation.
* This free tier supports only 5-day forecast. That means if the user selects a date past this threshold, a friendly message will be shown to inform the user about this limitation.
* A client-cache system was implemented to limit the calls to the external API. The configured keep-alive time is 60 minutes.
* The API key is already configured in the file src/weather.forecast.api.js


### Store

![Store](https://user-images.githubusercontent.com/7889190/101422454-7d852780-38d5-11eb-93c5-a499a2f06b5c.png)

**1. Actions**
- NAV_NEXT_MONTH: responsible for next month navigation
- NAV_PREV_MONTH: responsible for previous month navigation
- ADD_EVENT: responsible for adding a new reminder to the calendar
- UPDATE_EVENT: responsible for editing an existing reminder
- DELETE_EVENT: responsible for removing a reminder
- DELETE_ALL_EVENT: responsible for removing all reminders of a certain date
- OPEN_FORM_MODAL: responsible for opening the reminder form modal
- CLOSE_FORM_MODAL: responsible for closing the reminder form modal

**2. Mutations**
- NAV_MONTH: mutate the app's month state
- CREATE_EVENT: mutate the app's state to add a new reminder
- EDIT_EVENT: mutate the app's state to edit an existing reminder
- REMOVE_EVENT: mutate the app's state to remove a reminder
- REMOVE_ALL_EVENT: mutate the app's state to remove all reminders
- OPEN_MODAL: mutate the app's form modal state (opening)
- CLOSE_MODAL: mutate the app's form modal state (closing)

The following diagram shows how the app's components relate to the store's actions:

![ActionFlow](https://user-images.githubusercontent.com/7889190/101422012-68f45f80-38d4-11eb-9704-830e4b7087ce.png)


## Homologated Environments

This project was tested and homologated in the following environments:

1. macOS Catalina + Google Chrome 87.0.4280.88
2. macOS Catalina + Safari 13.0.3
3. Windows 10 + Google Chrome 73.0.3683.75


## Requirements

**1. Mandatory**

* :white_check_mark: Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.
* :white_check_mark: Display reminders on the calendar view in the correct time order.
* :white_check_mark: Allow the user to select color when creating a reminder and display it appropriately.
* :white_check_mark: Ability to edit reminders – including changing text, city, day, time and color.
* :white_check_mark: Add a weather service call from a free API such as Open Weather Map, and get the weather forecast (ex. Rain) for the date of the calendar reminder based on the city.
* :white_check_mark: Unit test the functionality: Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city.

**2. Bonus (optional)**

* :white_check_mark: Expand the calendar to support more than the current month.
* :white_check_mark: Properly handle overflow when multiple reminders appear on the same date.
* :white_check_mark: Functionality to delete one or ALL the reminders for a specific day


## Installing
To install the project, just download this repo locally and run the following command inside the project folder:
```
npm install
```

### Executing in dev mode
To execute this project in dev mode, just run the following command inside the project folder:
```
npm run serve
```

After the dev build is complete, you can access the app on your browser using the following link:
```
http://localhost:8080
```

### Compile for production
To compile this project in production mode, just run the following command inside the project folder:
```
npm run build
```

### Unit Tests (Jest)
To execute the unit tests, just run the following command inside the project folder:
```
npm run test:unit
```

### Lint
To lint the project's files, just run the following command inside the project folder:
```
npm run lint
```
