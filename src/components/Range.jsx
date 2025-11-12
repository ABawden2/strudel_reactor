import React, { useState, useEffect, useImperativeHandle } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Range(props) {
    const [sliderValue, setSliderValue] = useState(100);


    // Calls the callback method to change the value on the Strudel editor.
    useEffect(() => {
        props.callBack(new RegExp(/setcps\([0-9]{1,}\/60\/4\)/g), `setcps(${sliderValue}/60/4)`)
    }, [sliderValue]);
    
    // When the slider changes, set the new value.
    const handleSliderChange = (e) => {
        let newSliderValue = e.target.value;
        setSliderValue(newSliderValue);
    };

    // Method that is accessable from the app and Djpad method to set the slider value.
    useImperativeHandle(props.ref, () => ({
      handleDataChange(data) {
        setSliderValue(data.sliderValue);
      }
    }), []);

  return (
    <>
      <Row>
        <Col xs={12} md={12} lg={12}>
          <Form.Label className="m-0 slider-text">Play Speed: {sliderValue}</Form.Label>
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
        </Col>
      </Row>
    </>
  );
}

export default Range;