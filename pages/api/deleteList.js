import { ObjectID } from "bson";
import { MongoClient } from "mongodb";

export default async function deleteList(req, res){

    if( req.method === 'DELETE' ){

        const { listName, userName } = req.body;

        const client = await MongoClient.connect(process.env.DB_URI);

        const db = client.db();
    
        const collections = db.collection('members');
        
        const result = await collections.updateOne({ userName: userName }, {$pull: {lists: { listName: listName }}})

        client.close();

        res.status(201).json({deleted: true});

    }

}