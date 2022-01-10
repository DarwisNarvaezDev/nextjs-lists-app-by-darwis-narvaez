import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import classes from './listInput.module.css';

const NewListInput = ({props}) => {
    
    const router = useRouter();

    const inputRef = useRef(null);

    const { state, setState, memberInfoObject } = props;

    const { memberId } = memberInfoObject;

    const [ inputValueState, setInputValueState ] = useState("Type the list's name");

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    const doUpdate = async(e) => {

        const data = await fetch('/api/addList', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({memberId: memberId, listName: inputRef.current.value})
          })
          const response = await data.json();
          if( response.updated ){
              router.reload();
          }

    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            doUpdate();
        }} className={classes.newListInputContainer}>
            <input ref={inputRef} 
            onClick={() => {
                setInputValueState("");
            }} 
            onChange={(e) => {
                setInputValueState(e.target.value);
            }}
            type="text" value={inputValueState} />
            <p onClick={() => {
                setState(!state)
            }}>Cancel</p>
        </form>
    )
}

export default NewListInput
