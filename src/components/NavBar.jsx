import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavRowItems from './NavRowItems';
import Stack from 'react-bootstrap/Stack';

function NavBar (props) {
    return (
        <Navbar>
            <Container className='highlight-container'>
                <Stack gap={5}>
                    <NavRowItems navButtoncontrols={props.buttonList.mainControls} rowGap={props.rowGap} buttonList={props.buttonList} functions={props.functions}/>
                    {/* <NavRowItems navButtoncontrols={props.buttonList.previewControls} rowGap={props.rowGap} buttonList={props.buttonList} functions={props.functions}/> */}
                </Stack>
            </Container>
        </Navbar>
    )
}

export default NavBar;
