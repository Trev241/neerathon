import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Register.css'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [validated, setValidated] = useState(false)
  const [idSizeExceeded, setIdSizeExceeded] = useState(false)
  const [paySizeExceeded, setPaySizeExceeded] = useState(false)
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    isJosephite: false,
    josephiteDetails: {
      id: "",
      idAttachment: null
    },
    gender: "",
    event: "",
    paymentAttachment: ""
  })

  const navigate = useNavigate()

  const updateForm = (value) => {
    setForm((prev) => {
      return { ...prev, ...value }
    })

    // console.log(form.josephiteDetails.idAttachment)
  }

  const handleSubmit = async (event) => {
    const f = event.currentTarget

    if (!f.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)

    const newRegistration = { ...form }

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRegistration),
    })
    .catch(error => {
      alert(error)
      return
    })
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
                <Form.Control 
                  required type="text" 
                  placeholder="Name" 
                  name="name" 
                  // value={form.name} 
                  onChange={(e) => updateForm({ name: e.target.value})} 
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <FloatingLabel controlId="floatingEmail" label="Email address">
                <Form.Control 
                  required type="email" 
                  placeholder="name@example.com" 
                  name="email" 
                  // value={form.email} 
                  onChange={(e) => updateForm({ email: e.target.value})}
                />
              </FloatingLabel>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col>
              <Form.Group className="mb-2" controlId="formJosephite">
                <Form.Check 
                  type="checkbox" 
                  label="I am currently a student of St. Joseph's University" 
                  onClick={(e) => updateForm({ isJosephite: e.target.checked })}
                />
              </Form.Group>
              {
                (form.isJosephite) ? (
                  <>
                    <FloatingLabel className="mb-2" controlId="floatingRegNo" label="Register Number">
                      <Form.Control 
                        required 
                        disabled={!form.isJosephite} 
                        type="text" 
                        placeholder="e.g. 20BCAA27"
                        onChange={(e) => updateForm({ josephiteDetails: { ...form.josephiteDetails, id: e.target.value} })}
                      />
                    </FloatingLabel>
                    <Form.Group controlId="formId">
                      <Form.Label>Upload student ID card (Limit: 512KB)</Form.Label>
                      <Form.Control 
                        required 
                        type="file" 
                        disabled={!form.isJosephite}
                        isInvalid={idSizeExceeded}
                        onChange={(e) => {
                          setIdSizeExceeded(e.target.files[0].size > 512)

                          const fr = new FileReader()
                          fr.readAsDataURL(e.target.files[0])
                          fr.onload = () => updateForm({ josephiteDetails: { ...form.josephiteDetails, idAttachment: fr.result } })
                        }}
                      />
                    </Form.Group>
                  </>
                ) : <></>
              }
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <FloatingLabel controlId="floatingGender" label="Select your gender" className="mb-2">
                <Form.Select 
                  required 
                  aria-label="Floating label select gender" 
                  onChange={(e) => updateForm({ gender: e.target.value })}
                >
                  <option />
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </FloatingLabel>

              {
                (form.gender !== "Male" && form.gender !== "Female" && form.gender !== "") ? (
                  <FloatingLabel as={Col} controlId="floatingGenderOther" label="Please specify">
                    <Form.Control 
                      required 
                      type="text" 
                      placeholder="Name"
                      onChange={(e) => updateForm({ gender: e.target.value })} 
                    />
                  </FloatingLabel>
                ) : <></>
              }
            </Col>

            <Col>
              <FloatingLabel controlId="floatingRace" label="Select your event">
                <Form.Select 
                  required aria-label="Floating label select event" 
                  onChange={(e) => updateForm({ event: e.target.value })}
                >
                  <option />
                  <option value="1">2 KM</option>
                  <option value="2">5 KM</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          {
            (form.event === "1" || form.event === "2") ? (
              <Row className="mb-4">
                <Col>
                  <FloatingLabel controlId="floatingFee" label="Registration Fee">
                      <Form.Control 
                        type="text" 
                        readOnly 
                        value={"₹" + (form.event === "1" ? 49 : 99)}
                      />
                  </FloatingLabel>
                </Col>
              </Row>
            ) : <></>
          }

          <Row className="mb-4">
            <Col>
              <Form.Group controlId="formPayment">
                <Form.Label>Upload transaction details (Limit: 512KB)</Form.Label>
                <Form.Control 
                  required 
                  type="file"
                  isInvalid={paySizeExceeded}
                  onChange={(e) => {
                    setPaySizeExceeded(e.target.files[0].size > 512)

                    const fr = new FileReader()
                    fr.readAsDataURL(e.target.files[0])
                    fr.onload = () => updateForm({ paymentAttachment: fr.result })}
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="text-muted">
                After submitting the form, you will receive an email confirming that we have received it. If you have any trouble filling up the form please reach out to contact@example.com.
                <b> Do not upload or fill any sensitive information that has not been asked for and that may compromise you. Neither the WACC, the University nor the developer of this site is responsible for any damages caused as a result.</b>
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