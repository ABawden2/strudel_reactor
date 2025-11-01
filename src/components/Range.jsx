import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Range(props) {
    const [sliderValue, setSliderValue] = useState(100);


    useEffect(() => {
        props.callBack(new RegExp(/setcps\([0-9]{1,}\/60\/4\)/g), `setcps(${sliderValue}/60/4)`)
    }, [sliderValue]);
    
    const handleSliderChange = (e) => {
        let newSliderValue = e.target.value;
        setSliderValue(newSliderValue);
    };

  return (
    <>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <Form.Label className="m-0">Play Speed: {sliderValue}</Form.Label>
        </Col>
        <Col xs={12} md={12} lg={12}>
          <input id="sliderId"
          type="range" 
          value={sliderValue}
          min={50}
          max={170}
          step={10}
          onChange={handleSliderChange}
          className="speed-slider" />
        {/* <Form.Range 
          id="sliderId"
          value={sliderValue}
          min={50}
          max={170}
          step={10}
          onChange={handleSliderChange}
          className="custom-slider"/> */}
        </Col>
      </Row>
    </>
  );
}

export default Range;