import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'

import payment_qr from './../assets/payment_qr.jpg'

function PaymentModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-payment-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-payment-modal-title-vcenter">
          Registration Fee Payment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <h4>Please scan the QR code to pay the registration fee of <b>₹ {props.fee}/-</b> ONLY.</h4>
            <p>
              Be advised that payments should be made to <b>BJES PRINCIPAL 5</b> and not anyone else. Beware, exercise caution and be vigilant.
            </p>
            <p>
              Once successful, note down the UPI Transaction ID and take a screenshot of your payment as additional proof of payment.
              You will be required to enter the transaction ID in the form for us to verify later.
            </p>
          </Row>
          <Row>
            <Image
              src={payment_qr} 
            />
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PaymentModal