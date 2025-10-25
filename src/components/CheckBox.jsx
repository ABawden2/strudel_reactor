import { useState, useEffect } from 'react';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Col from 'react-bootstrap/Col';
import '../assets/button.css';

function CheckBox(props) {
  const [checked, setChecked] = useState(false);

     
  useEffect(() => {
      let value = checked ? props.buttonValue : props.buttonName;
      props.callBack(props.buttonName, value);
  }, [checked]);

  return (
     <Col xs={12} md={props.buttonCols} lg={props.buttonCols} className="pad-button-alignment">
      <ToggleButton
        // className="mb-2"
        id={props.buttonId}
        type="checkbox"
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