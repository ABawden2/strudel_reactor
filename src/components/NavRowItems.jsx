import ButtonCreator from './ButtonCreator';
import Row from 'react-bootstrap/Row';

function NavRowItems (props) {
    return (
        <Row className={'g-' + props.rowGap + " " + props.navButtoncontrols[0].margin}>
            {Object.values(props.navButtoncontrols).map((button) => {
                return (
                <ButtonCreator
                    key = {button.buttonId}
                    buttonId = {button.buttonId}
                    buttonName = {button.buttonName}
                    buttonType = {button.buttonType}
                    buttonCols = {button.buttonCols}
                    buttonColour = {button.colour}
                    addClass = {button.addClass}
                    callBack = {props.functions[button.callBack]}
                />
            )})}
        </Row>
    )
}

export default NavRowItems;
