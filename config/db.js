import mongoose from 'mongoose';
import colors from 'colors'
const connectivity = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb database : ${conn.connection.host}`.bgGreen.white)

    }catch(err){
        console.log(`${err}`.bgRed.white)
    }

}
export default connectivity;