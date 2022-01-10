import { ObjectID } from "bson";
import { MongoClient } from "mongodb";

export default async function addList(req, res){

    if( req.method === 'PUT' ){

        const { memberId, listName } = req.body;

        const client = await MongoClient.connect(process.env.DB_URI);

        const db = client.db();
    
        const collections = db.collection('members');
        
        const result = await collections.updateOne({ _id: ObjectID(memberId) }, {$push: {lists: { listName: listName, listContent: [] }}});

        client.close();

        res.status(201).json({updated: true});

    }

}