import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function Range(props) {
    const [sliderValue, setSliderValue] = useState(100);

    const handleSliderChange = (e) => {
        let newSliderValue = e.target.value;
        props.callback(new RegExp(/setcps\([0-9]{1,}\/60\/4\)/g), `setcps(${newSliderValue}/60/4)`)
        setSliderValue(newSliderValue);
    };

  return (
    <>
      <Form.Label>Play Speed: {sliderValue}</Form.Label>
      <Form.Range 
        id="sliderId"
        value={sliderValue}
        min={50}
        max={170}
        step={10}
        onChange={handleSliderChange}
        className="custom-slider"/>
    </>
  );
}

export default Range;