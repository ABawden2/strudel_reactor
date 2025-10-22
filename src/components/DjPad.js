import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CheckBox from './CheckBox';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import RadioButton from './RadioButton';

function DjPad(props) {
  return (
    <Container>
        <Row>
            Pattern Options
            <ButtonGroup>
                {Object.values(props.patternOptions).map((pattern) => {
                    return (
                    <RadioButton
                        key = {pattern.buttonId}
                        buttonId = {pattern.buttonId}
                        buttonName = {pattern.buttonName}
                        buttonValue = {pattern.buttonValue}
                        buttonGroupName = {pattern.buttonGroupName}
                        buttonColour = {pattern.buttonColour}
                        callBack = {pattern.callBack}
                    />
                )})}
            </ButtonGroup>
        </Row>
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


{/* <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup> */}