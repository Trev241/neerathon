import React from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

function RegisterClosedModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Registrations are closed
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We are no longer accepting online registrations. You can still participate by 
          registering on the day of the event itself. On-spot registrations will be 
          open for all in University grounds.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Return to home page</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RegisterClosedModal