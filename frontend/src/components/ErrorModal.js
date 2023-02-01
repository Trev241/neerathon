import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button'
import Alert from 'react-bootstrap/Alert'

function WarningModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-payment-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-payment-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert key="warning" variant="warning">
          {props.body}
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WarningModal