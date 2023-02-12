import React from "react"
import Spinner from "react-bootstrap/Spinner"

function LoadingPage(props) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <Spinner className="p-5 me-5" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="display-6">{props.message}</p> 
      </div>
    </>
  )
}

export default LoadingPage