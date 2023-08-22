import 'dotenv/config';
import bcrypt from "bcrypt";

const SALT = parseInt(process.env.SALT_ROUNDS);

export function hashMyPassword(myPasswordToHash){
    return bcrypt.hashSync( myPasswordToHash, SALT)
}

export function checkMyPasssword(passwordToCompare, truePassword){
    return bcrypt.compareSync(passwordToCompare, truePassword)
}