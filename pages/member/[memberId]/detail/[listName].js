import Head from "next/head";
import Link from "next/link";
import styles from '../../../../styles/index.module.css'
import classes from '../../../../styles/listDetail.module.css'
import { MongoClient } from "mongodb";
import { ObjectID } from "bson";
import { useState } from "react";
import NewItem from "../../../../components/list/NewItem";
import NewItemInput from "../../../../components/list/NewItemInput";
import { Router, useRouter } from "next/router";

export default function listDetail(props) {

    const router = useRouter();

    const [ showItemState, setShowItemState ] = useState(true);

    const { listName, listContent } = props.list;
    
    const memberId = props.memberId;
    
    const documentInfoObject = {
        
        memberId: memberId,
        listName: listName,
        listContent: listContent,
        
    }

    const showItemStateObject = {
        state: showItemState,
        setState: setShowItemState,
        documentInfoObject: documentInfoObject,
    }
    
    const urlForRedirect = `/member/${memberId}`;

    const doDelete = async(element) => {

        const itemName = element;

        const data = await fetch('/api/deleteItem', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: memberId, listName: listName, itemName: itemName})
          })
          const response = await data.json();
          if( response.deleted ){
              router.reload();
          }

        

    }

    return (
        <>
            <Head>
                <title>{listName}</title>
                <link rel="icon" href="/icon.png" />
            </Head>

            <div className={styles.shoppingListsContainer}>
                <div className={classes.shoppingDashboard}>
                    <div className={styles.myLists}>
                        <h1>{listName}</h1>
                        <div className={classes.listDetailWrapper}>
                            <ul>
                                {
                                    listContent.map((element) => {
                                        return <li style={{
                                            color: "grey",
                                        }} key={element}><h4>{element}</h4><p onClick={() => {
                                            doDelete(element);
                                        }}>Delete</p></li>
                                    })
                                }
                                { showItemState ? <NewItem props={showItemStateObject} /> : <NewItemInput props={showItemStateObject} /> }
                            </ul>
                        </div>
                    </div>
                    <div className={classes.rightButton}>
                        <Link href={urlForRedirect}><button type='button'>Back</button></Link>
                    </div>
                </div>
            </div>
        </>)

}

export const getStaticProps = async (context) => {

    const memberId = context.params.memberId;

    const memberIdFormatted = ObjectID(memberId);

    const listName = context.params.listName;

    const client = await MongoClient.connect(process.env.DB_URI);

    const db = client.db();

    const collections = db.collection('members');

    const result = await collections.findOne({ _id: memberIdFormatted });

    const listaFiltrada = result.lists.filter(element => element.listName === listName);

    client.close();

    return {
        props: {
            list: listaFiltrada[0],
            memberId: memberId
        }
    }

}

export const getStaticPaths = async () => {

    const client = await MongoClient.connect(process.env.DB_URI);

    const db = client.db();

    const collections = db.collection('members');

    const result = await collections.find({}).toArray();

    const pathsArray = [];
    const listsNames = [];
    const membersId = [];

    const pathParamsArray = [];

    const listsMap = result.map( element => {
        element.lists.map( list => {
            listsNames.push(list.listName);
        })
    })

    result.map( element => {
        membersId.push(element._id.toString());
    })

    listsNames.map( element => {
        const obj = { listName: element }
        pathsArray.push(obj);
    })

    membersId.map( element => {
        const obj = { memberId: element }
        pathsArray.push(obj);
    } )

    for( let name of listsNames ){

        for( let memberId of membersId ){

            pathParamsArray.push({ memberId: memberId, listName: name });

        }

    }

    client.close();

    return {
        fallback: false,
        paths: pathParamsArray.map( element => {
            return { params: element }
        }),
    }

}