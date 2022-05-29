import 'bootswatch/dist/minty/bootstrap.css';
import {Col, Container, Row} from "react-bootstrap";
import Header from "./components/Header/Header";
import Filter from "./components/Filter";
import Books from "./components/Books/Books";
import Cart from "./components/Cart/Cart";

function App() {
    return (
        <>
            <Header/>
            <Container className="mt-4">
                <Row>
                    <Col sm={8} className="order-2 order-sm-1">
                        <Filter/>
                        <Books/>
                    </Col>
                    <Col sm={4} className="order-1 order-sm-2 cart">
                        <Cart/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;
