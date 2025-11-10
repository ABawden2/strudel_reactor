import  React, { useState, useEffect, useImperativeHandle } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Col from 'react-bootstrap/Col';
import '../assets/button.css';

// Creating checkbox buttons using data passed in.
function CheckBox(props) {
  const [checked, setChecked] = useState(false);
    
  useEffect(() => {
    // Sets the key and value variable based on if the button is selected/ checked.
    let value = checked ? props.buttonValue : props.buttonName;
    let key = checked ? props.buttonName : props.buttonValue;
    props.callBack(key, value);
  }, [checked]);

  useImperativeHandle(props.ref, () => ({
    handleDataChange(data) {
      data[props.buttonName].startsWith("_") ? setChecked(true) : setChecked(false);
      console.log(data[props.buttonName],  "here now");
    }
  }), []);

  return (
     <Col xs={12} md={props.buttonCols} lg={props.buttonCols} className="pad-button-alignment">
      <ToggleButton
        id={props.buttonId}
        type="checkbox"
        className="instrument-checkbox"
        variant={props.buttonColour}
        checked={checked}
        value={props.buttonValue}
        style={{ width: 100 + '%', padding: 10 + '%' }}
        onChange={(e) =>  {
          setChecked(e.currentTarget.checked);
        }}
      >
        {props.buttonName}
      </ToggleButton>
    </Col>
  );
}


export default CheckBox;