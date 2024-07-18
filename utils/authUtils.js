import bcrypt from 'bcryptjs'

export const hashPassword= async(password)=>{
    try{
        const saltRounds=10;
        const hPassword = await bcrypt.hash(password,saltRounds);
        return hPassword;

    }catch(err){
        console.log("error password: ",err);

    }
}

export const comparePassword= async(password,hashPassword)=>{
    try{
        return bcrypt.compare(password,hashPassword)
    }catch(err){
        console.log(err);
    }
}