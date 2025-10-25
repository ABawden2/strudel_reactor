import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CheckBox from './CheckBox';
// import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';

function DjPad(props) {
    const [checkBoxList, setState] = useState([])

    React.useEffect(() => {
        let matchedElements = document.getElementById('proc').value.match(new RegExp(/^\b\w+:\s/gm));
        let transformedElements = [];
        // TODO: look into this as it shouldn't need this as it should only be entering this useEffect once.
        if (matchedElements) {
            matchedElements.forEach((element) => {
            element = element.trim().replace('\n', '');
            transformedElements.push({
                checked: "false",
                buttonValue: `_${element}`, 
                buttonId: `control-${element}`,
                buttonName: element,
                buttonCols: "4",
                buttonColour: "outline-primary",
                callBack: props.Proc
            });
            });
            // console.log(transformedElements)
            setState(transformedElements);
        }
    }, [])
    // Empty array will stop it from continusly looping, and makes it almost just loop once.
    console.log(props)
  return (
    <Container>
        {Object.keys(props.groupOptions).map((option) => {
            return(
                <Row>
                    {option.slice(0,1).toUpperCase() + option.slice(1,)} Options
                    <RadioGroup patternOptions={props.groupOptions[option]} optionKey={option} callBack={props.callBack}/>
                </Row>
            )
        })}
        <Row className={'mt-4 g-' + props.rowGap}>
        {Object.values(checkBoxList).map((button) => {
            return (
            <CheckBox
                key = {button.buttonId}
                buttonId = {button.buttonId}
                buttonName = {button.buttonName}
                buttonValue = {button.buttonValue}
                checked = {button.checked}
                buttonCols = {button.buttonCols}
                buttonColour = {button.buttonColour}
                callBack = {props.callBack}
            />
        )})}
        </Row>
    </Container>
  );
}

export default DjPad;

// import React, { useState } from 'react';
// import Card from "./Card";

// const CardList = () => {
    
//     const [cardData, setState] = useState([])

//     React.useEffect(() => {
//         fetch("http://localhost:5248/api/ItemsWebAPI")///GetItems")
//             .then(response => response.json())
//             // adding the data into cardData
//             .then(data => setState(data))
//             .catch(err => console.log(err));
//     }, [])
//     // Empty array will stop it from continusly looping, and makes it almost just loop once.

//     return (
//         <div className="row">
//             {cardData.map((obj) => (
//                 <Card
//                     key={obj.itemId}
//                     itemId={obj.itemId}
//                     itemName={obj.itemName}
//                     itemDescription={obj.itemDescription}
//                     itemCost={obj.itemCost}
//                     itemImage={obj.itemImage}
//                 />
//             ))}
//         </div>
//     )
// }

// export default CardList;