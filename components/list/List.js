import Link from 'next/link';
import { useRouter } from 'next/router';

const List = ({props}) => {
    
  const router = useRouter();

    const {id, listName, userName} = props;
    
    const urlToList = `/member/${id}/detail/${listName}`

    const messageConfirm = `Are you sure of deleting "${listName}" list?`

    const doDelete = async() => {

      const data = await fetch('/api/deleteList', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, listName: listName, userName})
      })
      const response = await data.json();
      if( response.deleted ){
          router.reload();
      }

    }

    return (
        <>
          <li><Link href={urlToList}><h4>{listName}</h4></Link><p onClick={() => {
            if( confirm(messageConfirm) ){
              doDelete();
            }else{
              return
            }
          }}>Delete</p></li>  
        </>
    )
}

export default List
