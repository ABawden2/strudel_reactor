import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function Range() {
    const [sliderValue, setSliderValue] = useState(100);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
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