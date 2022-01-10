
import Image from 'next/image';
import { useState } from 'react';
import NewMemberForm from './NewMemberForm';
import styles from './NotMemberModal.module.css';
import ChooseYourImageForm from './ChooseYourImageForm';

const NotMemberModal = ({ props }) => {

    const [showForm, setshowForm] = useState(true);

    const [imgPicked, setimgPicked] = useState("edit");

    const propsObject = { setshowForm: setshowForm, imgPicked: imgPicked ,setimgPicked: setimgPicked }

    return (
        <div className={styles.modalWrapper}>
            { showForm ? (<NewMemberForm props={propsObject} />) : (<ChooseYourImageForm props={propsObject} />) }
        </div>
    )
}

export default NotMemberModal
