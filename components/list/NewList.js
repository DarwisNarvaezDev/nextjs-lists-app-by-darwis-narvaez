import Link from 'next/link';
import { useRouter } from 'next/router';

const NewList = ({props}) => {
    
    const { state, setState } = props;

    // console.log(`state: ${state}, setState: ${setState}`);

    return (
        <>
          <li onClick={() => {
              setState(false);
          }}><h4 style={{
              color: 'grey',
          }}>Click to add a new list</h4></li>  
        </>
    )
}

export default NewList
