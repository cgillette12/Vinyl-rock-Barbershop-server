CREATE TABLE barbers (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL
);
ALTER TABLE Appointments
  ADD COLUMN
    barber_id INTEGER REFERENCES barbers(id)
    ON DELETE SET NULL;