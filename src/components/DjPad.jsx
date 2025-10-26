import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CheckBox from './CheckBox';
// import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';
import Select from './Select';
import Range from './Range';

function DjPad(props) {
    const [checkBoxList, setCheckBoxList] = useState([])

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
                buttonCols: "6",
                buttonColour: "outline-primary",
                callBack: props.Proc
            });
            });
            // console.log(transformedElements)
            setCheckBoxList(transformedElements);
        }
    }, [])
    // Empty array will stop it from continusly looping, and makes it almost just loop once.
    console.log(props)
  return (
    <Container>
        <Row>
            <Range callBack={props.callBack}/>
            <Col xs={12} md={6} lg={6}>
                <Select callBack={props.callBack}/>

                {Object.keys(props.groupOptions).map((option) => {
                    return(
                        <Row>
                            {option.slice(0,1).toUpperCase() + option.slice(1,)} Options
                            <RadioGroup patternOptions={props.groupOptions[option]} optionKey={option} callBack={props.callBack}/>
                        </Row>
                    )
                })}
            </Col>
            <Col xs={12} md={6} lg={6}>
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
            </Col>
        </Row>
    </Container>
  );
}

export default DjPad;