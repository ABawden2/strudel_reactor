import { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ToggleButton } from 'react-bootstrap';
import "../assets/controls.css";

function RadioGroup(props) {
    const [radioValue, setRadioValue] = useState('0');
    const [oldValue, setPreviousValue] = useState('0');
    const groupKey = props.optionKey;

    function setRadioButton(value) {
        // Check is the value has changed.
        if (radioValue !== value) {
            setPreviousValue(radioValue);
            setRadioValue(value);
        }
    }
    
    useEffect(() => {
        // Depending on the group pass in different information into the callback method.
        if (groupKey === 'arpeggiatorPattern') {
            let arpeggiatorOption = 'arpeggiator' + oldValue;
            props.callBack(new RegExp(`(${arpeggiatorOption},)`, 'g'), 'arpeggiator' + radioValue + ',');
        } else {
            props.callBack(`${groupKey} = ${oldValue}`, `${groupKey} = ${radioValue}`);
        }
    }, [radioValue]);
    // Will run once initallially and then every time the radioValue is run or props.callback is called.

  return (
    <ButtonGroup style={{"width": 100 + "%"}} className="option-radio">
        {Object.values(props.patternOptions).map((pattern) => {
            return (
                <ToggleButton
                    key={pattern.buttonId}
                    id={pattern.buttonName + pattern.buttonId}
                    type="radio"
                    name={pattern.buttonGroupName}
                    variant={pattern.buttonColour}
                    value={pattern.buttonValue}
                    size="sm"
                    checked={radioValue === pattern.buttonValue}
                    onClick={() => setRadioButton(pattern.buttonValue)}
                    >
                    {pattern.buttonName}
                </ToggleButton>
        )})}
    </ButtonGroup>
  );
}


export default RadioGroup;