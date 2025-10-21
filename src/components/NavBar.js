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
                        callBack = {button.callBack}
                    />
                )})}
              </Row>
            </Container>
        </Navbar>
    )
}

export default NavBar;

//Row xs={2} md={4} lg={6}


{/* <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Option 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav> */}

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// function RowColLayoutExample() {
//   return (
//     <Container>
//       <Row xs={2} md={4} lg={6}>
//         <Col>1 of 2</Col>
//         <Col>2 of 2</Col>
//       </Row>
//       <Row xs={1} md={2}>
//         <Col>1 of 3</Col>
//         <Col>2 of 3</Col>
//         <Col>3 of 3</Col>
//       </Row>
//       <Row xs="auto">
//         <Col>1 of 3</Col>
//         <Col>2 of 3</Col>
//         <Col>3 of 3</Col>
//       </Row>
//     </Container>
//   );
// }

// export default RowColLayoutExample;