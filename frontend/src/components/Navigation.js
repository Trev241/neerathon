import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

function Navigation() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const navigate = useNavigate()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      }
    })
  }

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Neerathon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#about">About</Nav.Link>
            <Nav.Link href="/#details">Details</Nav.Link>
            <Nav.Link href="/#faq">FAQ</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown menuVariant="dark" title="Participant" id="public-nav-dropdown">
              <NavDropdown.Item>
                <Nav.Link as="div" onClick={() => navigate("/register/view")}>View my registration</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as="div" onClick={() => navigate("/register")}>Register</Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown menuVariant="dark" title="Organizer" id="org-nav-dropdown">
              {isAuthenticated && (
                <NavDropdown.Item>
                  <Nav.Link as="div" onClick={() => navigate("/participants")}>
                    View participants
                  </Nav.Link>
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item>
                {!isAuthenticated && (
                  <Nav.Link as="div" onClick={handleLogin}>Log in</Nav.Link>
                  )}
                {isAuthenticated && (
                  <Nav.Link as="div" onClick={handleLogout}>Log out</Nav.Link>
                )}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation