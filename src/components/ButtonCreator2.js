import React, { useState, Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


function ButtonCreator (props) {
    return (
        <Col xs={12} md={props.buttonCols} lg={props.buttonCols}>
            <Button 
                variant="outline-success" 
                id={props.buttonId}
                type={props.buttonType} 
                value={props.buttonName} 
                onClick={(e) =>  {
                    // props.callBack();
                    // if (props.callBack === 'globalEditor.evaluate()') {
                    //     console.log(props.callBack)
                    //     props.callBack
                    // }
                    }}
                style={{ width: 100 + '%' }}
            >
                {props.buttonName}
            </Button>
        </Col>
    )
}

export default ButtonCreator;