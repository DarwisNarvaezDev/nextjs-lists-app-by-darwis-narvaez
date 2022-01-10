import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import { useClickAway } from "use-click-away";
import NotMemberModal from '../components/modals/NotMemberModal';
import styles from '../styles/index.module.css'
import classes from '../components/modals/NotMemberModal.module.css'
import { MongoClient } from "mongodb";
import Member from '../components/members/Member';
import Spinner from '../components/spinner/Spinner';

export default function Home(props) {

    const [members, setmembers] = useState([]);

    const [showModal, setshowModal] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const clickRef = useRef(null);
    
    useClickAway(clickRef, () => {
        setshowModal(false);
    })

    const awaitProps = async() => {
        const { members } = props;
        setmembers(members);
    }

    useEffect(() => {
        awaitProps();
    }, [])

    return (
        <>
            <Head>
                <title>Family Lists App</title>
                <meta name="description" content="Shopping list app using next" />
                <link rel="icon" href="/icon.png" />
            </Head>

            {/* { showSpinner && <Spinner /> } */}

            <div className={styles.shoppingListsContainer}>
                { showModal && (<div className={classes.modalContainer} ref={clickRef}>
                    <NotMemberModal props={setshowModal} />
                </div>) }
                <div className={styles.shoppingDashboard}>
                    <div className={styles.myLists}>
                        <h1>Welcome to the family's lists</h1>
                        <h3>Are you a member?</h3>
                        <div className={styles.membersListWrapper}>
                            <ul>
                                {
                                    members.map((element) => {
                                        return (<Member key={element.id} props={element} />)
                                    })
                                }
                            </ul>
                        </div>
                        <div className={styles.newMemberWrapper}>
                            <button type='button' onClick={() => {
                                setshowModal(true);
                            }}>Not a member</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticProps = async() => {

    const client = await MongoClient.connect(process.env.DB_URI);

    const db = client.db();

    const collections = db.collection('members');
    
    const result = await collections.find().toArray();

    client.close();

    return {
        props: {
            members: result.map((element) => ({
                id: element._id.toString(),
                imgUrl: element.imgUrl,
                userName: element.userName,
                lists: element.lists
            }))
        },
        revalidate: 1,
    };

}
