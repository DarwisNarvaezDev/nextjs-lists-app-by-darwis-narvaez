import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/index.module.css'


const Member = ({props}) => {
    
    const router = useRouter();

    const { id, imgUrl, userName } = props;

    const url = `/${imgUrl}.png`

    const memberUrl = `/member/${id}/`
    
    const doDelete = async(userName) => {

        const data = await fetch('/api/deleteMember',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: userName})
        });
        const response = await data.json();
        if( response.deleted ){
            router.reload();
        }

    }

    return (
        <>
           <li><div className={styles.userImage}><Image src={url} layout='fill' objectFit='cover'></Image></div><Link href={memberUrl} ><h4>{userName}</h4></Link><p className={styles.delete} onClick={(e) => {
               
               if( confirm(`Are you sure that you want to delete ${userName} as a member?`) ){

                doDelete(userName);

               }else{
                   return
               }
           }}>Delete</p></li> 
        </>
    )
}

export default Member
