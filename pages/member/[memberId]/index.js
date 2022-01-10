import Head from 'next/head'
import Link from 'next/link'
import classes from '../../../styles/members.module.css'
import 'animate.css';
import { MongoClient } from "mongodb";
import { ObjectID } from 'bson';
import { useState } from 'react';
import List from '../../../components/list/List';
import NewList from '../../../components/list/NewList';
import NewListInput from '../../../components/list/NewListInput';

export default function listsDashboard(props) {

    const { id, userName, imgUrl, lists } = props.member;

    const memberInfoObject = {
        memberId: id,
        userName: userName
    }

    const [ showNewListInput, setShowNewListInput ] = useState(true);

    const newListStateObject = {
        state: showNewListInput,
        setState: setShowNewListInput,
        memberInfoObject: memberInfoObject
    }

    const showInput = () => {
        setShowNewListInput(!showNewListInput);
    }

    return (
        <>
            <Head>
                <title>{userName} Lists</title>
                <link rel="icon" href="/icon.png" />
            </Head>

            <div className={classes.shoppingListsContainer}>
                <div className={classes.shoppingDashboard}>
                    <div className={classes.myLists}>
                        <h1>¡Hello {userName}!</h1>
                        <h3 className={classes.create}>Do you want to check your list?</h3>
                        <div className={classes.membersListWrapper}>
                            <ul>
                                {
                                    lists.map( (list) => {
                                        return (<List key={list.listName} props={{id: id, listName: list.listName, userName: userName}} />)
                                    })
                                }
                                { showNewListInput ? <NewList props={newListStateObject} /> : <NewListInput props={newListStateObject} /> }
                            </ul>
                        </div>
                    </div>
                    <div className={classes.rightButton}>
                        <Link href={"/"}><button type='button'>Back</button></Link>
                    </div>
                </div>
            </div>
        </>
    )

}

export const getStaticProps = async(context) => {

    const idMember = context.params.memberId;

    const idSearch = ObjectID(idMember);

    const client = await MongoClient.connect(process.env.DB_URI);

    const db = client.db();

    const collections = db.collection('members');
    
    const result = await collections.findOne({'_id': idSearch});

    const member = { 
        id: result._id.toString(),
        userName: result.userName,
        imgUrl: result.imgUrl,
        lists: result.lists,
    };

    client.close();

    return {
            props: {
                member: member
            }
    }

}

export const getStaticPaths = async() => {

    const client = await MongoClient.connect(process.env.DB_URI);

    const db = client.db();

    const collections = db.collection('members');
    
    const result = await collections.find({}).toArray();

    client.close();

    return {
        fallback: false,
        paths: result.map( (element) => ({
            params: { memberId: element._id.toString() },
        })),
    };

}