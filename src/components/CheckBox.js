import { useState } from 'react';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Col from 'react-bootstrap/Col';
import '../assets/button.css';

function CheckBox(props) {
  const [checked, setChecked] = useState(false);

  return (
     <Col xs={12} md={props.buttonCols} lg={props.buttonCols}>
      <ToggleButton
        className="mb-2"
        id={props.buttonId}
        type="checkbox"
        variant={props.buttonColour}
        checked={checked}
        value={props.buttonValue}
        style={{ width: 100 + '%' }}
        onChange={(e) =>  {
          setChecked(e.currentTarget.checked)
          console.log("checked: ", checked)
          // props.callBack
        }}
      >
        {props.buttonName}
      </ToggleButton>
    </Col>
  );
}


export default CheckBox;