BEGIN;

INSERT INTO Vinyl_users(user_name,first_name,last_name, email, phone_number , password)
VALUES
  ('dunder1', 'Dunder', 'Mifflin', 'cgi1@gmail.com', 9162891213, '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne');
COMMIT;