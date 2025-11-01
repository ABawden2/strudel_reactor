import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';


function Select(props) {
    // use the first option/ value.
  const [selected, setSelected] = useState('arpeggiator1');
  const [previousSelected, setPreviousValue] = useState('arpeggiator1');

  function setSelectedValue(event) {
    setPreviousValue(selected);
    setSelected(event.target.value);
  }


  useEffect(() => {
    props.callBack(new RegExp(`(${previousSelected},)`, 'g'), selected + ',');
  }, [selected]);



    return (
      <>
        <p className="mt-2 mb-1" style={{"visibility": "hidden"}}>temp</p>
        <InputGroup className="mb-3">
            <InputGroup.Text className='select-title'>Select an Arpeggiator:</InputGroup.Text>
                <Form.Select data-style="btn-dark" className="btn btn-dark dj-select-form" style={{"--bs-btn-bg": "#111", "--bs-btn-hover-bg": "#252529", "--bs-btn-active-bg": "#111"}} aria-label="Default select example" value={selected} onChange={(event) => setSelectedValue(event)} size="sm">
                    <option value="arpeggiator1">arpeggiator1</option>
                    <option value="arpeggiator2">arpeggiator2</option>
                    <option value="arpeggiator2">arpeggiator3</option>
                </Form.Select>
        </InputGroup>
      </>
    );
}
export default Select;