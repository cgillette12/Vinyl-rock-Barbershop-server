BEGIN;

INSERT INTO barbers(first_name)
VALUES
  ('Shawn'),
  ('Ben'),
  ('Sara'),
  ('Kelly'),
  ('Travor'),
  ('Cameron');

INSERT INTO services (type , price)
VALUES
  ('HAIRCUT','$20'),
  ('BUZZCUT','$15'),
  ('KID 12 AND UNDER','$10'),
  ('SENIOR CUT 60+','$10'),
  ('DESIGNS','$5'),
  ('BEARD TRIM','$10'),
  ('BEARD TRIM (RAZOR FINISH)','$15'),
  ('HAIRCUT AND BEARD TRIM','$30'),
  ('LUXURY SHAVE','$30');
COMMIT;