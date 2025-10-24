import { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ToggleButton } from 'react-bootstrap';

function RadioGroup(props) {
    const [radioValue, setRadioValue] = useState('0');
    const [oldValue, setPreviousValue] = useState('0');

    function setRadioButton(value) {
        if (radioValue !== value) {
            console.log("getting in here now?")
            setPreviousValue(radioValue);
            setRadioValue(value);
        }
    }
    
    useEffect(() => {
        console.log(radioValue, oldValue)
        props.callBack(`pattern = ${oldValue}`, `pattern = ${radioValue}`);
    }, [radioValue]);
    // Will run once initallially and then every time the radioValue is run or props.callback is called.

  return (
    <ButtonGroup>
        {Object.values(props.patternOptions).map((pattern) => {
            return (
                <ToggleButton
                    key={pattern.buttonId}
                    id={pattern.buttonName + pattern.buttonId}
                    type="radio"
                    name={pattern.buttonGroupName}
                    variant={pattern.buttonColour}
                    value={pattern.buttonValue}
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