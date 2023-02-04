import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import PaymentModal from '../components/PaymentModel'

import './Register.css'
import ErrorModal from '../components/ErrorModal'

function Register() {
  const [validated, setValidated] = useState(false)
  // const [idSizeExceeded, setIdSizeExceeded] = useState(false)
  const [paySizeExceeded, setPaySizeExceeded] = useState(false)
  const [warnModalShow, setWarnModalShow] = useState(false)
  const [warnContent, setWarnContent] = useState()
  const [paymentModalShow, setPaymentModalShow] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const FILE_SIZE_LIMIT = 1048576
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    isJosephite: false,
    registerNumber: "",
    event: "",
    transactionId: "",
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
    
    event.preventDefault()
    if (!f.checkValidity()) {
      event.stopPropagation()

      // Form has been validated. This does not mean that the form is ready for submission.
      // Instead, it is a flag used to set visual cues...
      setWarnModalShow(true)
      setWarnContent("Please fill out the form completely and do not leave any required fields empty.")
      setValidated(true)
      
      return
    }

    // const newRegistration = { ...form }
    // console.log(newRegistration)

    const formData = new FormData()
    Object.keys(form).forEach(key => formData.append(key, form[key]))

    // Setting state to display loading status
    setSubmitting(true)

    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/record/add`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,
    })
    .then((response) => {
      if (!response.ok) throw new Error(response.status)
      else return response.json()
    })
    .then((response) => {
      alert(`Success! Your UUID number is ${response.uuid}. Please save this number if you wish to view your application later. You will now be returned to the home page`)
      navigate('/')
    })
    .catch(error => {
      setWarnContent(`An error occurred when submitting the form. Please try again later. If the issue persists, then contact +91 95602 18478. ${error}`)
      setWarnModalShow(true)
    })

    setSubmitting(false)
  }

  return (
    <div className="wrapper">
      <Container className="">
        <Form className="my-5" noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-1 mt-5">
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

          <Row>
            <Col md>
                <FloatingLabel className="mb-3" controlId="floatingEmail" label="Email address">
                  <Form.Control 
                    required 
                    type="email" 
                    placeholder="name@example.com" 
                    name="email" 
                    className="bg-white"
                    onChange={(e) => updateForm({ email: e.target.value})}
                  />
                </FloatingLabel>
              </Col>
          </Row>

          <Row className="mb-3">
            <Col md>
              <FloatingLabel className="mb-3" controlId="floatingAge" label="Age">
                <Form.Control 
                  required 
                  type="number" 
                  placeholder="name@example.com" 
                  name="email" 
                  className="bg-white"
                  onChange={(e) => updateForm({ age: e.target.value})}
                />
              </FloatingLabel>
            </Col>
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
                        onChange={(e) => updateForm({ registerNumber: e.target.value })}
                      />
                    </FloatingLabel>

                    {/* <Form.Group controlId="formId">
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
                    </Form.Group> */}
                  </>
                ) : <></>
              }
            </Col>
          </Row>

          <Row className="mb-1 mt-5">
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
            (form.event !== "") ? (
              <>
                <Row className="mb-3">
                  <Col>
                    <FloatingLabel controlId="floatingFee" label="Registration Fee">
                        <Form.Control 
                          type="text" 
                          readOnly 
                          className="bg-white"
                          value={"₹ " + (form.event === "1" ? 49 : form.event === "2" ? 99 : "")}
                        />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col>
                    <Button 
                      className="w-100 py-3" 
                      onClick={() => setPaymentModalShow(true)}
                    >
                      Click here to pay
                    </Button>
                  </Col>
                </Row>

                <Row className="mb-1 mt-5">
                  <p className="display-6">Enter your transaction details</p>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <FloatingLabel as={Col} controlId="floatingTransactionId" label="UPI Transaction ID">
                      <Form.Control 
                        required 
                        type="text" 
                        placeholder="ID" 
                        name="transactionId" 
                        className="bg-white"
                        // value={form.name} 
                        onChange={(e) => updateForm({ transactionId: e.target.value})} 
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formPayment">
                      <Form.Label>Upload transaction screenshot (Limit: 1 MB)</Form.Label>
                      <Form.Control 
                        className="bg-white"
                        required 
                        type="file"
                        accept="image/*"
                        isInvalid={paySizeExceeded}
                        onChange={(e) => {
                          setPaySizeExceeded(e.target.files[0].size > FILE_SIZE_LIMIT)

                          // const fr = new FileReader()
                          // fr.readAsDataURL(e.target.files[0])
                          // fr.onload = () => updateForm({ paymentAttachment: fr.result })

                          if (!paySizeExceeded)
                            updateForm({ paymentAttachment: e.target.files[0] })
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {paySizeExceeded ? "File upload limit exceeded!" : "This field is necessary!"}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            ) : <></>
          }

          <Row className="mt-4">
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
              <Button className="w-100" variant="success" type="submit">
                {
                  (submitting) ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </>
                  ) : "Submit"
                }
              </Button>
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
        show={paymentModalShow}
        fee={form.event === "1" ? 49 : 99}
        onHide={() => setPaymentModalShow(false)}
      />

      <ErrorModal
        show={warnModalShow}
        title="Form Submission Error"
        body={warnContent}
        onHide={() => setWarnModalShow(false)}
      />
    </div>
  )
}

export default Register