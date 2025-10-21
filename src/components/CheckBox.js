import { useState } from 'react';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function CheckBox(props) {
  const [checked, setChecked] = useState(false);

  return (
      <ToggleButton
        className="mb-2"
        id={props.buttonId}
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value={props.buttonValue}
        onChange={(e) => 
          setChecked(e.currentTarget.checked)
          // props.callBack
        }
      >
        {props.buttonName}
      </ToggleButton>
  );
}
export default CheckBox;


    //   <ToggleButton
    //     className="mb-2"
    //     id="toggle-check"
    //     type="checkbox"
    //     variant="outline-primary"
    //     checked={checked}
    //     value="1"
    //     onChange={(e) => setChecked(e.currentTarget.checked)}
    //   >
    //     Checked
    //   </ToggleButton>

// function CheckBox() {
//   return (
//     <>
//       <Form.Check aria-label="option 1" />
//     </>
//   );
// }