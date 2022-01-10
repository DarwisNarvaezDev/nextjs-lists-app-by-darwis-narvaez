import { ObjectID } from "bson";
import { MongoClient } from "mongodb";

export default async function deleteItem(req, res){

    if( req.method === 'DELETE' ){

        const { listName, id, itemName } = req.body;

        const client = await MongoClient.connect(process.env.DB_URI);

        const db = client.db();
    
        const collections = db.collection('members');
        
        const result = await collections.updateOne({'lists.listName': listName},
        { $pull: {'lists.$[lists].listContent': itemName} },
        { arrayFilters: [{'lists.listName':listName}] });

        client.close();

        res.status(201).json({deleted: true});

    }

}