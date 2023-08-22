import 'dotenv/config';
import bcrypt from "bcrypt";

const SALT = parseInt(process.env.SALT_ROUNDS);

export function hashMyPassword(myPasswordToHash){
    console.log('mot de passe : ', myPasswordToHash);
    console.log('SALT numero : ', SALT);
    return bcrypt.hashSync( myPasswordToHash, SALT)
}
