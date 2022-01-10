import { MongoClient } from "mongodb";

export default async function newMember(req, res){
    
    if( req.method === 'POST' ){

        const body = req.body;

        const objectTemplate = {
            userName:body.userName,
            imgUrl: body.imgUrl,
            lists:[]
        }

        const client = await MongoClient.connect(process.env.DB_URI);

        const db = client.db();
    
        const collections = db.collection('members');
        
        const result = await collections.insertOne(objectTemplate);

        client.close();

        res.status(201).json({created: true});

    }

}