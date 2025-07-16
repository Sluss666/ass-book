import mongoose from 'mongoose'

const db = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI!)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`🟢 MongoDB conectado en: ${url}`)
    } catch (err) {
        console.error('🔴 Error al conectar a DB Mongo:', err)
    }
}
export default db