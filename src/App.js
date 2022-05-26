import 'bootswatch/dist/minty/bootstrap.css';
import {Container, Nav, Navbar} from "react-bootstrap";

function App() {
  return (
    <div className="App">
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </div>
  );
}

export default App;
