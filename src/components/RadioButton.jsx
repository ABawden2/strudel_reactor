import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';

function RadioButton(props) {
    const [checked, setRadioValue] = useState('0');

    const setRadioButton = (e) => {
        if (e.currentTarget.value === props.buttonValue) {
            setRadioValue(props.buttonValue);
        }
    };

  return (
      <ToggleButton
        key={props.buttonId}
        id={props.buttonName + props.buttonId}
        type="radio"
        name={props.buttonGroupName}
        variant={props.buttonColour}
        value={props.buttonValue}
        checked={checked}
        onChange={setRadioButton}
      >
        {props.buttonName}
      </ToggleButton>
  );
}


export default RadioButton;