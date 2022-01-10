import Image from 'next/image'
import styles from './NotMemberModal.module.css';


const ChooseYourImageForm = ({ props }) => {

    const {setimgPicked, setshowForm} = props;

    const showFormWithImg = (e) => {

        const imgPicked = e.target.alt;
        
        setimgPicked(imgPicked);
        setshowForm(true);

    }

    return (
        <>
                <div className={styles.chooseImageWrapper}>
                    <div className={styles.imagesDiv}>
                        <div>
                            <Image onClick={(e) => { showFormWithImg(e) }} src="/1.png" layout='fill' objectFit="cover" alt="1" />
                        </div>
                        <div>
                            <Image onClick={(e) => { showFormWithImg(e) }} src="/2.png" layout='fill' objectFit="cover" alt="2" />
                        </div>
                        <div>
                            <Image onClick={(e) => { showFormWithImg(e) }} src="/3.png" layout='fill' objectFit="cover" alt="3" />
                        </div>
                        <div>
                            <Image onClick={(e) => { showFormWithImg(e) }} src="/4.png" layout='fill' objectFit="cover" alt="4" />
                        </div>
                    </div>
                    <div className={styles.lettersDiv}>
                        <h2>Choose your avatar</h2>
                    </div>
                </div>
        </>
    )
}

export default ChooseYourImageForm
