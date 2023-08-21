BEGIN;

INSERT INTO "clients" ("firstname", "lastname","phone_number" , "password", "email", "dateofbirth", "address", "student", "role_id")
VALUES ('Michel', 'Dumas','0632587458' ,'coucou', 'michel@hotmail.fr', '30/03/1990', '6 rue du temple 94880 Noiseau',false, 1);

COMMIT;