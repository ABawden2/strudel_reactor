import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CheckBox from './CheckBox';
import RadioGroup from './RadioGroup';
import Range from './Range';


function DjPad(props) {
    const [checkBoxList, setCheckBoxList] = useState([])
    // console.log(props.data)
    React.useEffect(() => {
        // Automatically creating the buttons based on the elements in the tune
        let matchedElements = document.getElementById('proc').value.match(new RegExp(/^\b\w+:\s/gm));
        let transformedElements = [];
        // Randomly selecting the colours.
        let colours = ['purple', 'orange', 'pink', 'green']
        // TODO: look into this as it shouldn't need this as it should only be entering this useEffect once.
        if (matchedElements) {
            matchedElements.forEach((element, index) => {
            element = element.trim().replace('\n', '');
            transformedElements.push({
                checked: "false",
                buttonValue: `_${element}`, 
                buttonId: `control-${element}`,
                buttonName: element,
                buttonCols: "6",
                buttonColour: `outline-${colours[index]}`,
                callBack: props.Proc
            });
            });
            setCheckBoxList(transformedElements);
        }
    }, [])
    // Empty array will stop it from continusly looping, and makes it almost just loop once.

  return (
    <>
    <div className="col-md-5">
        <Container className='highlight-container'>
            <Row className={'g-' + props.rowGap}>
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
    </div>
    <div className="col-md-7">
        <Container className='highlight-container'>
            <Row>
                <Col xs={12} md={12} lg={12} className='mb-0'>
                    <Range key={'range'} callBack={props.callBack}/>
                </Col>
                <Col xs={12} md={12} lg={12}>
                    <Row>
                        {Object.values(props.groupOptions).map((option, index) => {
                            let optionKey = Object.keys(props.groupOptions)[index];
                            return (
                                <Col xs={12} md={6} lg={6}>
                                    <p className="mt-2 mb-1">{option.name}</p>
                                    <RadioGroup key={option.id} patternOptions={option.values} ref={props.radioOption} optionKey={optionKey} callBack={props.callBack}/>
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
    </>
  );
}

export default DjPad;