import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'

function Register() {
  const [validated, setValidated] = useState(false)
  const [event, setEvent] = useState(0)
  const [isJosephite, setIsJosephite] = useState()

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  return (
    <Container>
      <h1 className="display-1">Neerathon 2023</h1>
      <p className="lead">Almost there! Just fill in your details into the form and you're all set to run on the big day. Don't forget to practice!</p>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingName" label="Full name" className="my-3">
          <Form.Control required type="text" placeholder="Name" />
        </FloatingLabel>
        
        <FloatingLabel controlId="floatingRegNo" label="Register Number" className="mb-3">
          <Form.Control required disabled={!isJosephite} type="text" placeholder="e.g. 20BCAA27" />
        </FloatingLabel>
        <Form.Group className="mb-3" controlId="formJosephite">
          <Form.Check type="checkbox" label="I am currently a student of St. Joseph's University" onClick={() => setIsJosephite(!isJosephite)}/>
        </Form.Group>

        <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
          <Form.Control required type="email" placeholder="name@example.com" />
        </FloatingLabel>

        <FloatingLabel controlId="floatingRace" label="Select your event" className="mb-3">
          <Form.Select required aria-label="Floating label select example" onChange={(e) => setEvent(e.target.value)}>
            <option></option>
            <option value="1">2 KM</option>
            <option value="2">5 KM</option>
          </Form.Select>
        </FloatingLabel>
        
        {
          (event === "1" || event === "2") ? (
            <p><span className="text-muted">Registration Fee: </span><b>₹ {event === "1" ? 49 : 99}</b></p>
          ) : <></>
        }

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Register