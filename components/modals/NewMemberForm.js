import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from './NotMemberModal.module.css';

const NewMemberForm = ({props}) => {
    
    const router = useRouter();

    const {setshowForm, imgPicked } = props;

    const imgUrl = `/${imgPicked}.png`

    const inputRef = useRef(null);
    const [Input, setInput] = useState('Type your name');

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const doPost = async(businessObject) => {

        try {
            const data = await fetch('/api/newMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(businessObject)
            });
            const json = await data.json();
            if( json.created ){

                router.reload();

            }
        } catch (error) {
            throw new Error('There was an error: ' + error);
        }

    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <div className={styles.formWrapper}>
        <div className={styles.imageWrapper} onClick={() => {setshowForm(false)}}><Image src={imgUrl} objectFit='cover' layout='fill' /></div>
        <div className={styles.inputWrapper}>
            <input type="text" ref={inputRef} value={Input} onChange={handleChange} onClick={() => {
                setInput('');
            }}></input>
        </div>
        <div className={styles.buttonWrapper}>
            <button type='button' onClick={() => {
                
                const businessObject = { userName: inputRef.current.value, imgUrl: imgPicked }
                doPost(businessObject);

            }}>Done</button>
        </div>
    </div>
    )
}

export default NewMemberForm
