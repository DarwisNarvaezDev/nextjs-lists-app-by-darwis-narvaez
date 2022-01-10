import { MongoClient } from "mongodb";

export default async function deleteMember(req, res){
    
    if( req.method === 'DELETE' ){

        const body = req.body;

        const client = await MongoClient.connect(process.env.DB_URI);

        const db = client.db();
    
        const collections = db.collection('members');
        
        const result = await collections.deleteOne(body);

        client.close();

        res.status(200).json({deleted: true});

    }

}