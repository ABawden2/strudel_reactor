import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';

function RadioButton(props) {
  const [radioValue, setRadioValue] = useState('0');

  return (
      <ToggleButton
        key={props.buttonId}
        id={props.buttonName + props.buttonId}
        type="radio"
        name={props.buttonGroupName}
        variant={props.buttonColour}
        value={props.buttonValue}
        checked={radioValue === props.buttonValue}
        onChange={(e) => {
            setRadioValue(e.currentTarget.value)}}
      >
        {props.buttonName}
      </ToggleButton>
  );
}


export default RadioButton;