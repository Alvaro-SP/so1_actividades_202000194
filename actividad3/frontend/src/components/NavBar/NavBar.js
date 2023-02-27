import { useContext, useState } from 'react';
import AuthContext from '../../context/auth-context';
import { Navbar, Container, Nav, NavDropdown, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = (props) => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const HandleLogout = async () => {
    setError('');
    try {
      await authCtx.logout();
      navigate('/login', { replace: true });
    } catch {
      setError('Failed to log out');
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Example App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/help">
                Help
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                title={`${authCtx.currentUser.first_name} ${authCtx.currentUser.last_name}`}
              >
                <NavDropdown.Item onClick={HandleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {error && <Alert variant="danger">{error}</Alert>}
    </header>
  );
};
export default NavBar;
