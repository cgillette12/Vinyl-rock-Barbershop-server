CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    price TEXT NOT NULL
);

ALTER TABLE Appointments
  ADD COLUMN
    services_id INTEGER REFERENCES services(id)
    ON DELETE SET NULL;