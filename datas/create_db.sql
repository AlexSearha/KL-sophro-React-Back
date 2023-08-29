BEGIN;

DROP TABLE IF EXISTS "roles", "clients", "doctors", "protocols", "appointments";

CREATE DOMAIN "rfc_email" AS TEXT
CHECK (value ~ '^(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$');

CREATE DOMAIN "date_of_birth" AS TEXT
CHECK (value ~'^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$');

CREATE DOMAIN "phone" AS TEXT
CHECK (value ~ '^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$');

CREATE TABLE "roles" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "clients" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT,
    "lastname" TEXT,
    "password" TEXT NOT NULL,
    "email" rfc_email NOT NULL UNIQUE,
    "dateofbirth" date_of_birth,
    "student" BOOLEAN,
    "address" TEXT,
    "photo" TEXT,
    "phone_number" phone NOT NULL,
    "newsletter" BOOLEAN,
    "notification" BOOLEAN,
    "confirmed" BOOLEAN NOT NULL,
    "role_id" INTEGER REFERENCES "roles"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "doctors" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT,
    "lastname" TEXT,
    "password" TEXT NOT NULL,
    "email" rfc_email NOT NULL UNIQUE,
    "dateofbirth" date_of_birth,
    "address" TEXT,
    "photo" TEXT,
    "phone_number" phone NOT NULL,
    "notification" BOOLEAN,
    "confirmed" BOOLEAN,
    "role_id" INTEGER REFERENCES "roles"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "protocols" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "doctor_id" INTEGER REFERENCES "doctors"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "appointments" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" TIMESTAMPTZ NOT NULL,
    "status" TEXT NOT NULL,
    "online" BOOLEAN NOT NULL,
    "reporting" TEXT,
    "exercices" TEXT,
    "paid" BOOLEAN NOT NULL,
    "paiment_due" DECIMAL NOT NULL,
    "paiment_value" DECIMAL,
    "client_id" INTEGER REFERENCES "clients"("id"),
    "doctor_id" INTEGER REFERENCES "doctors"("id"),
    "protocol_id" INTEGER REFERENCES "protocols"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

INSERT INTO "roles" ("name")
VALUES ('client'),
('admin');

INSERT INTO "clients" ("firstname", "lastname","phone_number" , "password", "email", "dateofbirth", "address", "student", "confirmed", "role_id")
VALUES ('Michel', 'Dumas','0632587458' ,'coucou', 'michel@hotmail.fr', '30/03/1990', '6 rue du temple 94880 Noiseau',false, true, 1);


INSERT INTO "doctors" ("firstname", "lastname", "email", "phone_number","password", "address","confirmed", "role_id")
VALUES ('Alex', 'Mirouf', 'mirouf@hotmail.fr','0656565656', 'coucou', '22 rue des tisserands 56190 Noyal-Muzillac',true ,2);

INSERT INTO "protocols" ("name", "description", "doctor_id")
VALUES ('cigarette', 'le client est venu me voir pour travailler pour arreter de fumer',1),
('sommeil', 'le client à des problemes de sommeil',1);

INSERT INTO "appointments" ("date","status", "online", "paid", "paiment_due", "paiment_value", "client_id", "doctor_id", "protocol_id")
VALUES ('2023-08-30 08:00:00.828+02', 'reservé', false, false, 50, 50, 1, 1, 1), 
('2023-09-20 16:00:00.828+02', 'reservé', false, false, 50, 50, 1, 1 ,1), 
('2023-09-21 16:00:00.828+02', 'reservé', false, false, 40, 40, 1, 1, 2), 
('2023-09-22 16:00:00.828+02', 'reservé', false, false, 50, 50, 1, 1, 2), 
('2023-09-25 18:00:00.828+02', 'reservé', false, false, 40, 40, 1, 1, 2); 


COMMIT;
