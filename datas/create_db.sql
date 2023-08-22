BEGIN;

DROP TABLE IF EXISTS "roles", "clients", "doctors", "appointments";

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
    "student" BOOLEAN NOT NULL,
    "address" TEXT,
    "photo" TEXT,
    "phone_number" phone NOT NULL,
    "newsletter" BOOLEAN,
    "notification" BOOLEAN,
    "role_id" INTEGER REFERENCES roles("id"),
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
    "role_id" INTEGER REFERENCES roles("id"),
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
    "client_id" INTEGER REFERENCES clients("id"),
    "doctor_id" INTEGER REFERENCES doctors("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

INSERT INTO "roles" ("name")
VALUES ('client'),
('admin');

INSERT INTO "clients" ("firstname", "lastname","phone_number" , "password", "email", "dateofbirth", "address", "student", "role_id")
VALUES ('Alexis', 'Marouf','0626904074' ,'coucou', 'alex@hotmail.fr', '15/07/1987', '19 avenue de la libération 77530 Voinsles',true, 1),
('Michel', 'Dumas','0632587458' ,'coucou', 'michel@hotmail.fr', '30/03/1990', '6 rue du temple 94880 Noiseau',false, 1);


INSERT INTO "doctors" ("firstname", "lastname", "email", "phone_number","password", "address", "role_id")
VALUES ('Katia', 'Lemaire', 'test@hotmail.fr','0656565656', 'coucou', '22 rue des tisserands 56190 Noyal-Muzillac',2);

COMMIT;
