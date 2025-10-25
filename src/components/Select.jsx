import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';


function Select(props) {
    // use the first option/ value.
  const [selected, setSelected] = useState('arpeggiator1');
  const [previousSelected, setPreviousValue] = useState('arpeggiator1');

  function setSelectedValue(event) {
    // console.log(event.target.value)
    setPreviousValue(selected);
    setSelected(event.target.value);
  }


  useEffect(() => {
    // console.log("test", selected, 'thing', previousSelected)
    props.callBack(new RegExp(`(${previousSelected},)`, 'g'), selected + ',');
  }, [selected]);

    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>Select an Arpeggiator:</InputGroup.Text>
                <Form.Select aria-label="Default select example" value={selected} onChange={(event) => setSelectedValue(event)}>
                    <option value="arpeggiator1">arpeggiator1</option>
                    <option value="arpeggiator2">arpeggiator2</option>
                </Form.Select>
        </InputGroup>
    );
}
export default Select;