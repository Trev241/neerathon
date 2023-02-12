import React, { useState } from "react"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

function Registration() {
  const [details, setDetails] = useState()
  const [uuid, setUuid] = useState("")
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleSubmit = (e) => {
    const form = e.currentTarget
    
    e.preventDefault()
    if (!form.checkValidity()) {
      e.stopPropagation()
      
      setValidated(true)
      return
    }
    
    setLoading(true)
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/record/uuid/${uuid}`)
        setDetails(await response.json())
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
    setLoading(false)
  }

  const prettyNames = {
    _id: "ID",
    uuid: "UUID",
    name: "Name",
    email: "Email",
    age: "Age",
    isJosephite: "Josephite",
    registerNumber: "Reg. Number",
    gender: "Gender",
    event: "Event",
    transactionId: "Transaction ID",
    date: "Date"
  }

  return (
    <Container className="my-5">
      <Form onSubmit={handleSubmit} noValidate validated={validated} className="mb-3 p-3 border rounded">
        <Form.Label>Enter your UUID</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            required
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            aria-label="UUID"
            aria-describedby="basic-addon2"
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
          />
          <Button variant="outline-dark" id="button-uuid" disabled={loading} type="submit">
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Go"
            )}
          </Button>
        </InputGroup>
      </Form>

      {details ? (
        <div className="my-5">
          <p className="display-1 mb-3">{details.name}</p>
          <hr className="mb-5" />
          <Container fluid className="lead">
            {Object.keys(details).map((key, i) => (
              <Row key={i} className="mb-3">
                <Col sm={3}><b>{prettyNames[key]}</b></Col>
                <Col>
                  {key === "event" ? (details[key] === "1" ? "2 KM" : "5 KM") : details[key]}
                </Col>
              </Row>
            ))}
          </Container>
        </div>
      ) : (
        <p className="display-6 text-muted my-5">Your details will appear here once you enter your UUID.</p>
      )}
    </Container>
  )
}

export default Registration