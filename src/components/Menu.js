import { Navbar, Nav } from 'react-bootstrap'; 
import Container from 'react-bootstrap/Container';

const Menu = () => {
    return ( 
        <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark" className="navbarstyle">
        <Container>
            <Navbar.Brand href="#home"><h4 className="">Doc</h4></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
                <Nav.Link href="/" className="fw-bold">Home</Nav.Link>
                <Nav.Link href="/Patients" className="fw-bold">Patients</Nav.Link>
                <Nav.Link href="/Add" className="fw-bold">Registration</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    ); 
} 

export default Menu;