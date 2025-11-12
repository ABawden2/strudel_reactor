import React, { useState, useRef, useImperativeHandle } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CheckBox from './CheckBox';
import RadioGroup from './RadioGroup';
import Range from './Range';

// Creates the dj pad with the different button elements specified in the passed in data.
function DjPad(props) {
    const [checkBoxList, setCheckBoxList] = useState([])
    const rangeRef = useRef();
    // Source used to understand how to use multiple element/ components in the one ref:
    // https://www.dhiwise.com/blog/design-converter/react-multiple-refs-manage-refs-in-components-easily
    const checkbox = useRef([]);
    const radioRef = useRef([]);

    // Source used to implement this:
    // https://react.dev/reference/react/useImperativeHandle and https://stackoverflow.com/questions/37949981/call-child-method-from-parent
    useImperativeHandle(props.ref, () => ({
        handleDataChange(data) {
            // Calls methods to change the value of the buttons and slider.
            rangeRef.current?.handleDataChange(data);
            checkbox.current.forEach((checkboxRef) => checkboxRef?.handleDataChange(data));
            radioRef.current.forEach((radio) => radio?.handleDataChange(data));
        }
    }), []);

    React.useEffect(() => {
        // Automatically creating the buttons based on the elements in the tune
        let matchedElements = document.getElementById('proc').value.match(new RegExp(/^\b\w+:\s/gm));
        let transformedElements = [];
        // Randomly selecting the colours.
        let colours = ['red', 'orange', 'green', 'blue']
        // Dynamically creating the elements based on the button values found.
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
                {/* Creates the checkbox values. */}
                {Object.values(checkBoxList).map((button, index) => {
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
                        ref={(el) => (checkbox.current[index] = el)} 
                    />
                )})}
            </Row>
        </Container>
    </div>
    <div className="col-md-7">
        <Container className='highlight-container'>
            <Row>
                <Col xs={12} md={12} lg={12} className='mb-0'>
                    <Range key={'range'} callBack={props.callBack} ref={rangeRef}/>
                </Col>
                <Col xs={12} md={12} lg={12}>
                    <Row>
                        {/* Creates each different radio group values. */}
                        {Object.values(props.groupOptions).map((option, index) => {
                            let optionKey = Object.keys(props.groupOptions)[index];
                            return (
                                <Col xs={12} md={6} lg={6}>
                                    <p className="mt-2 mb-1">{option.name}</p>
                                    <RadioGroup key={option.id} patternOptions={option.values} ref={(el) => ( radioRef.current[index] = el) } optionKey={optionKey} callBack={props.callBack}/>
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