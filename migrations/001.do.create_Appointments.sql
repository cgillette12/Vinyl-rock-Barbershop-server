CREATE TABLE Appointments(
    id SERIAL PRIMARY KEY,
    time TEXT NOT NULL,
    tomorrow TEXT,
    date_created TIMESTAMP DEFAULT now() NOT NULL
    
);