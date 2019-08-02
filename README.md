# Vinyle Rock
Brought to you by Cody Gillette

[SquadUp Live](https://squadup.now.sh "Live Site")

[SquadUp Repo](https://github.com/cgillette12/Squad-up-Client "Front End Repo")

Where hair cutting comes easy Vinyl Rock is all about taking the hassle out of getting your hair cut!
Once logged in you'll be able to select from one of our barbers! Just select the name of the barber, pick your Service and Time, then check your profile. Your apointment will be updated! So Login or Sign up and never have to worry about your hair again!!!


## V1 Feature List
- [x] Select Barber from List
- [x] Service page for unloged in users .
- [x] Schedule appointments. 

## V2 Feature List (Coming Soon)
- [ ] Being able to cancel appointments
- [ ] Having button that favorites and unfavorites barber.  
- [ ] Admin user manage barber shedules.



## Tech Stack
Created with Node.js, Express, PostgreSQL, Knex.js, JWT. 

## API 
```
/api

├── /auth
│   └── POST
│   |   └── /token
│   └── PUT
│       └── /token
|
├── /user
│   └── GET /
│   |   └── /:id
│   └── POST
│       └── /:id
|
├── /appointment
│   └── GET
│       ├── /
│   └── POST
│       ├── /
|
├── /appointment/:Appointment_id
│   └── GET
│   |   ├── /
│
├── /barber
│   └── GET
│       └── /:barber_id
│ 
├── /services
│   └── GET
│       ├── /
```

## Created By
* [Cody Gillette](https://github.com/cgillette12 "Cody's Github")

