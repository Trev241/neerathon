import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PaymentModal from '../components/PaymentModel'

import './Register.css'

function Register() {
  const [validated, setValidated] = useState(false)
  const [idSizeExceeded, setIdSizeExceeded] = useState(false)
  const [paySizeExceeded, setPaySizeExceeded] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  const FILE_SIZE_LIMIT = 1048576
  
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
          <Row className="my-4">
            <p className="display-6">Let us know more about you</p>
          </Row>

          <Row className="mb-3">
            <Col>
              <FloatingLabel as={Col} controlId="floatingName" label="Full name">
                <Form.Control 
                  required 
                  type="text" 
                  placeholder="Name" 
                  name="name" 
                  className="bg-white"
                  // value={form.name} 
                  onChange={(e) => updateForm({ name: e.target.value})} 
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <FloatingLabel controlId="floatingEmail" label="Email address">
                <Form.Control 
                  required type="email" 
                  placeholder="name@example.com" 
                  name="email" 
                  className="bg-white"
                  // value={form.email} 
                  onChange={(e) => updateForm({ email: e.target.value})}
                />
              </FloatingLabel>
            </Col>
          </Row>
          
          <Row className="mb-3">
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
                        className="bg-white"
                        onChange={(e) => updateForm({ josephiteDetails: { ...form.josephiteDetails, id: e.target.value} })}
                      />
                    </FloatingLabel>
                    <Form.Group controlId="formId">
                      <Form.Label>Upload student ID card (Limit: 1 MB)</Form.Label>
                      <Form.Control 
                        required 
                        type="file" 
                        disabled={!form.isJosephite}
                        isInvalid={idSizeExceeded}
                        className="bg-white"
                        onChange={(e) => {
                          setIdSizeExceeded(e.target.files[0].size > FILE_SIZE_LIMIT)

                          const fr = new FileReader()
                          fr.readAsDataURL(e.target.files[0])
                          fr.onload = () => updateForm({ josephiteDetails: { ...form.josephiteDetails, idAttachment: fr.result } })
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {
                          (idSizeExceeded) ? "File upload limit exceeded!" : "Error"
                        }
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                ) : <></>
              }
            </Col>
          </Row>

          <Row className="mb-5">
            <Col>
              <FloatingLabel controlId="floatingGender" label="Select your gender">
                <Form.Select 
                  required 
                  aria-label="Floating label select gender" 
                  className="bg-white"
                  onChange={(e) => updateForm({ gender: e.target.value })}
                >
                  <option/>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </FloatingLabel>

              {/* {
                (form.gender === "Other") ? (
                  <FloatingLabel as={Col} controlId="floatingGenderOther" label="Please specify">
                    <Form.Control 
                      required 
                      type="text" 
                      placeholder="Name"
                      onChange={(e) => updateForm({ gender: e.target.value })} 
                    />
                  </FloatingLabel>
                ) : <></>
              } */}
            </Col>
          </Row>

          <Row className="mb-4">
            <p className="display-6">Pay a small fee to an incredible cause</p>
          </Row>

          <Row className="mb-3">
            <Col>
              <FloatingLabel controlId="floatingRace" label="Select your event">
                <Form.Select 
                  required aria-label="Floating label select event" 
                  className="bg-white"
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
              <>
                <Row className="mb-3">
                  <Col>
                    <FloatingLabel controlId="floatingFee" label="Registration Fee">
                        <Form.Control 
                          type="text" 
                          readOnly 
                          className="bg-white"
                          value={"₹ " + (form.event === "1" ? 49 : 99)}
                        />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Button className="w-100 py-3" onClick={() => setModalShow(true)}>
                      Click here to pay
                    </Button>
                  </Col>
                </Row>
              </>
            ) : <></>
          }

          <Row className="mb-5">
            <Col>
              <Form.Group controlId="formPayment">
                <Form.Label>Upload transaction details (Limit: 1 MB)</Form.Label>
                <Form.Control 
                  className="bg-white"
                  required 
                  type="file"
                  isInvalid={paySizeExceeded}
                  onChange={(e) => {
                    setPaySizeExceeded(e.target.files[0].size > FILE_SIZE_LIMIT)

                    const fr = new FileReader()
                    fr.readAsDataURL(e.target.files[0])
                    fr.onload = () => updateForm({ paymentAttachment: fr.result })}
                  }
                />
                <Form.Control.Feedback type="invalid">
                  File upload limit exceeded!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <p>
                Please note that
              </p>
              <ul>
                <li>
                  payments once made are <b>PERMANENT</b> and <b>CANNOT BE REVERSED OR REFUNDED</b>. Refreshing the page, restarting your 
                  browser or any such similar action will <b>only reset the form BUT will not reset/reverse any payment(s) that you may 
                  have already made</b>. Do not be under the assumption that refreshing the page will reverse any transactions made. 
                  If you have already paid the registration fee by scanning the QR code, you should continue filling the form and include 
                  the details of your payment. By details, we are referring to the UPI ID of the transaction you made in the QR code provided
                  on this page.
                </li>
                <li>
                  you are wholly responsible for the information you provide on the form. For a smooth registration process, ensure that you
                  enter all details <b>accurately</b> especially the <b>UPI ID of your transaction</b>.
                </li>
                <li>
                  you <b>SHOULD NOT UPLOAD OR ENTER ANY INFORMATION THAT MAY COMPROMISE YOU</b>. This includes confidential information such
                  as your UPI account details.
                </li>
              </ul>
            </Col>
          </Row>

          <Row className="my-4 justify-content-center">
            <Col lg className="d-flex justify-content-center my-1">
              <Button className="w-100" variant="success" type="submit">Submit</Button>
            </Col>
            {/* <Col lg className="d-flex justify-content-center my-1">
              <Button className="w-100" variant="outline-danger" type="reset">Reset</Button>
            </Col> */}
            <Col lg className="d-flex justify-content-center my-1">
              <Button className="w-100" variant="outline-danger" onClick={() => navigate('/')}>Back</Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <PaymentModal 
        show={modalShow}
        fee={form.event === "1" ? 49 : 99}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default Register