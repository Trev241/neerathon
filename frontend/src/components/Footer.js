import React from 'react'
import Container from 'react-bootstrap/esm/Container'

import "./Footer.css"

function Footer() {
  return (
    <footer className="bg-dark py-2 text-white-50 footer">
      <Container>
        <div className="text-center py-4">
          <div className="text-center">
            Contact us:
            <span className="mx-2">
              (+91) 9560218478, 
            </span>
            <span className="me-2">
              (+91) 8016168216, 
            </span>
            <span className='me-2'>
              (+91) 7349067404
            </span>
          </div>
          <hr className="mt-4 mb-3" />
          <div>
            <a href="https://github.com/Trev241/neerathon/issues">Report an issue</a>
            <p className="p-0 m-0">Follow us on <a href="https://www.instagram.com">Instagram</a></p>
          </div>
        </div>

      </Container>
    </footer>
  )
}

export default Footer