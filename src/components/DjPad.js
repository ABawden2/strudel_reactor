import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CheckBox from './CheckBox';

function DjPad(props) {
  return (
    <Container>
        <Row className={'g-' + props.rowGap}>
        {Object.values(props.checkBoxList).map((button) => {
            return (
            <CheckBox
                key = {button.buttonId}
                buttonId = {button.buttonId}
                buttonName = {button.buttonName}
                buttonValue = {button.buttonValue}
                checked = {button.checked}
                buttonCols = {button.buttonCols}
                buttonColour = {button.buttonColour}
                callBack = {button.callBack}
            />
        )})}
        </Row>
    </Container>
  );
}

export default DjPad;