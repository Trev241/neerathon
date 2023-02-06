import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

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
            <Nav.Link href="#details">Details</Nav.Link>
            <Nav.Link href="#faq">FAQ</Nav.Link>
            {isAuthenticated && (
              <Nav.Link href="/participants">Participants</Nav.Link>
            )}
          </Nav>
          <Nav>
            <Button className="m-2" variant="primary" onClick={() => navigate('/register')}>Participate</Button>
            {!isAuthenticated && (
              <Button className="m-2" variant="secondary" onClick={handleLogin}>Organizer Login</Button>
            )}
            {isAuthenticated && (
              <Button className="m-2" variant="secondary" onClick={handleLogout}>Logout</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation