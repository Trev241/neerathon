import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

import './Register.css'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [validated, setValidated] = useState(false)
  const [event, setEvent] = useState(0)
  const [isJosephite, setIsJosephite] = useState()

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  return (
    <div className="wrapper">
      <Container>
        <Form className="my-5" noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <p className="display-6">We need just a few details...</p>
          </Row>

          <Row className="my-4">
            <Col>
              <FloatingLabel as={Col} controlId="floatingName" label="Full name">
                <Form.Control required type="text" placeholder="Name" />
              </FloatingLabel>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col>
              <Form.Group className="mb-2" controlId="formJosephite">
                <Form.Check type="checkbox" label="I am currently a student of St. Joseph's University" onClick={() => setIsJosephite(!isJosephite)}/>
              </Form.Group>
              {
                (isJosephite) ? (
                  <>
                    <FloatingLabel className="mb-2" controlId="floatingRegNo" label="Register Number">
                      <Form.Control required disabled={!isJosephite} type="text" placeholder="e.g. 20BCAA27" />
                    </FloatingLabel>
                    <Form.Group controlId="formId">
                      <Form.Label>Upload student ID card</Form.Label>
                      <Form.Control type="file" disabled={!isJosephite} required />
                    </Form.Group>
                  </>
                ) : <></>
              }
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <FloatingLabel controlId="floatingEmail" label="Email address">
                <Form.Control required type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <FloatingLabel controlId="floatingGender" label="Select your gender">
                <Form.Select required aria-label="Floating label select example">
                  <option />
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel controlId="floatingRace" label="Select your event">
                <Form.Select required aria-label="Floating label select example" onChange={(e) => setEvent(e.target.value)}>
                  <option />
                  <option value="1">2 KM</option>
                  <option value="2">5 KM</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          {
            (event === "1" || event === "2") ? (
              <Row className="mb-4">
                <Col>
                  <FloatingLabel controlId="floatingFee" label="Registration Fee">
                      <Form.Control type="text" readOnly value={"₹" + (event === "1" ? 49 : 99)}></Form.Control>
                  </FloatingLabel>
                </Col>
              </Row>
            ) : <></>
          }

          <Row className="mb-4">
            <Col>
              <Form.Group controlId="formPayment">
                <Form.Label>Upload transaction details</Form.Label>
                <Form.Control type="file" required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="text-muted">
                After submitting the form, you will receive an email confirming that we have received your form. If you have any trouble filling up the form please reach out to contact@example.com.
              </p>
            </Col>
          </Row>

          <Row className="my-4 justify-content-center">
            <Col lg className="d-flex justify-content-center my-1">
              <Button className="w-100" variant="success" type="submit">Submit</Button>
            </Col>
            <Col lg className="d-flex justify-content-center my-1">
              <Button className="w-100" variant="outline-danger" type="reset">Reset</Button>
            </Col>
            <Col lg className="d-flex justify-content-center my-1">
              <Button className="w-100" variant="outline-secondary" onClick={() => navigate('/')}>Back</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

export default Register