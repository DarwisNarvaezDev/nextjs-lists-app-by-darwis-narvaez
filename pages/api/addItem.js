import { ObjectID } from "bson";
import { MongoClient } from "mongodb";

export default async function addItem(req, res){

    if( req.method === 'PUT' ){

        const { listName, itemName } = req.body;

        const client = await MongoClient.connect(process.env.DB_URI);

        const db = client.db();
    
        const collections = db.collection('members');
        
        const result = await collections.updateOne({'lists.listName': listName},
        { $push: {'lists.$[lists].listContent': itemName} },
        { arrayFilters: [{'lists.listName':listName}] });

        client.close();

        res.status(201).json({updated: true});

    }

}