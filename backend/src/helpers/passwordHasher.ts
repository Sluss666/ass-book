import bcrypt from 'bcrypt'

async function hashPassword(pass:string):Promise<string>{
    const salt = 10
    return await bcrypt.hash(pass, salt)
}

async function comparePassword(plain:string, hashed:string):Promise<boolean> {
    return await bcrypt.compare(plain, hashed)
}

export {
    hashPassword,
    comparePassword
}