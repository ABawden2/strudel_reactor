import ButtonCreator from './ButtonCreator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';

function NavBar (props) {
    return (
        <Navbar>
            <Container>
              <Row className={'g-' + props.rowGap}>
                {Object.values(props.buttonList).map((button) => {
                    return (
                    <ButtonCreator
                        key = {button.buttonId}
                        buttonId = {button.buttonId}
                        buttonName = {button.buttonName}
                        buttonType = {button.buttonType}
                        buttonCols = {button.buttonCols}
                        callBack = {props.functions[button.callBack]}
                    />
                )})}
              </Row>
            </Container>
        </Navbar>
    )
}

export default NavBar;
