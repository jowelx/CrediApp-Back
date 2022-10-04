import MongoClient from 'mongodb'
//mongodb+srv://Ark-trac-app:v92xj5cbw5oyvSlm@cluster0.kizdz.mongodb.net/Ark-trac-app?retryWrites=true&w=majoritymongodb://localhost:27017/example
export async function connect() {
    try {
        const uri = 'mongodb+srv://db-ark-trac:db-ark-trac@cluster0.df8hk.mongodb.net/?retryWrites=true&w=majority'

        const client = await MongoClient.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        const db = client.db('CrediApp');
        console.log('DB IS CONNECTED')
        return db;
    } catch (e) {
        console.log(e)
    }

}
