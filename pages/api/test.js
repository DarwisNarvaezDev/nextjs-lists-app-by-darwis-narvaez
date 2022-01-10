import { MongoClient } from "mongodb";

export default async function test(req, res){

    if( req.method === 'POST' ){

        const body = req.body;

        const client = await MongoClient.connect(process.env.DB_URI);

        const db = client.db();
    
        const collections = db.collection('members');
        
        const result = await collections.insertOne({ 
            "userName":"Darwis",
            "lists":[]
        });

        client.close();

        res.status(201).json({created: true});

    }

}