const NewItem = ({props}) => {
    
    const { state, setState } = props;

    // console.log(`state: ${state}, setState: ${setState}`);

    return (
        <>
          <li onClick={() => {
              setState(false);
          }}><h4 style={{
              color: 'grey',
          }}>Click to add a new list item</h4></li>  
        </>
    )
}

export default NewItem