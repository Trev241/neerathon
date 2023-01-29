import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

function Footer() {
  return (
    <footer className="bg-dark py-2 mt-5 text-white-50">
      <Container>
        <Row className="pt-4">
          <Col md>
            <ListGroup horizontal>
              <ListGroup.Item className="bg-dark text-white-50 border-0">Contact us:</ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white-50 border-0">+91 95602 18478</ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white-50 border-0">+91 80161 68216</ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white-50 border-0">+91 73490 67404</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md>
            <p className="text-end"><a href="https://www.instagram.com">Follow</a> us on Instagram.</p>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col className="d-flex justify-content-center">
            <p><a href="https://github.com/Trev241/neerathon">Contribute</a> | <a href="https://github.com/Trev241/neerathon/issues">Report an issue</a></p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer