import { useAuth0 } from "@auth0/auth0-react"
import React, { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"

function ParticipantList() {
  const { getAccessTokenSilently } = useAuth0()
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_ENDPOINT,
          scope: "read:registrations",
        })

        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/record`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
  
        setRegistrations(await response.json())
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [getAccessTokenSilently])

  return (
    <>
      <Container fluid className="p-5">
        <Row>
          <p className="display-1">Registrations</p>
          <p className="lead">This is a <b>readonly</b> list of all registrations recorded so far.</p>
          <p className="text-muted">
            Under the "Event" column, a value of <b>1</b> indicates the <i>2 KM race</i> while a value of <b>2</b> indicates <i>5 KM race</i>.
            Since this data is presented in a HTML table, you should be able to copy and paste this data into most spreadsheet softwares such
            as MS Excel.
          </p>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Object ID</th>
                  <th>UUID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Studies at SJU?</th>
                  <th>SJU Reg. Number</th>
                  <th>Gender</th>
                  <th>Event</th>
                  <th>UPI Transaction ID</th>
                  <th>Time of Registration</th>
                </tr>
              </thead>
              <tbody>
                  {registrations.map((registration, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {Object.keys(registration).map((key) => {
                          return <td>{registration[key]}</td>    
                        })}
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ParticipantList