import ToggleButton from 'react-bootstrap/ToggleButton';

function RadioButton(props) {
  return (
      <ToggleButton
        key={props.buttonId}
        id={props.buttonName + props.buttonId}
        type="radio"
        name={props.buttonGroupName}
        variant={props.buttonColour}
        value={props.buttonValue}
        checked={props.checked}
        onClick={() => props.callBack(props.buttonValue)}
      >
        {props.buttonName}
      </ToggleButton>
  );
}


export default RadioButton;