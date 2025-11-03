import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import '../assets/button.css';
import '../assets/controls.css';
import icons from '../assets/buttonSvg';

function ButtonCreator (props) {
    return (
        <Col xs={12} md={props.buttonCols} lg={props.buttonCols}>
            <Button 
                variant={'outline-' + props.buttonColour}
                id={props.buttonId}
                type={props.buttonType} 
                value={props.buttonName} 
                onClick={props.callBack}
                style={{ width: 100 + '%' }}
            >
                {icons[props.buttonName]}
            </Button>
        </Col>
    )
}

export default ButtonCreator;