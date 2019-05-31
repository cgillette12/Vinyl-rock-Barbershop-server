CREATE TABLE Appointments(
    time TEXT NOT NULL,
    today TEXT NOT NUll,
    tommorrow TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL
    
);