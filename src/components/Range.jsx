import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function Range() {
    const [sliderValue, setSliderValue] = useState(38);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

  return (
    <>
      <Form.Label>Volume</Form.Label>
      <Form.Range 
        value={sliderValue}
        min={0}
        max={20}
        step={1}
        onChange={handleSliderChange}
        className="custom-slider"/>
        <p>Selected Value: {sliderValue}</p>
    </>
  );
}

export default Range;


// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import './App.css';

// function RangeExample() {
//     const [sliderValue, setSliderValue] = useState(38);

//     const handleSliderChange = (e) => {
//         setSliderValue(e.target.value);
//     };

//     return (
//         <div className="outer">
//             <div>
//                 <Form.Label>
//                     Range Slider
//                 </Form.Label>
//                 <Form.Range
//                     value={sliderValue}
//                     disabled
//                     onChange={handleSliderChange}
//                     className="custom-slider"/>
//                 <p>Selected Value: {sliderValue}</p>
//             </div>
//         </div>
//     );
// }

// export default RangeExample;