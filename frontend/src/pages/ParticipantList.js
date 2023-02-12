import { useAuth0 } from "@auth0/auth0-react"
import React, { useEffect, useState } from "react"

import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Pagination from "react-bootstrap/Pagination"
import Form from "react-bootstrap/Form"
import Spinner from "react-bootstrap/Spinner"

function ParticipantList() {
  const { getAccessTokenSilently } = useAuth0()

  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [matches, setMatches] = useState(0)
  
  // Sort state
  const [sortBy, setSortBy] = useState("date")
  const [order, setOrder] = useState(-1)
  
  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState()

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

    setLoading(true)
    fetchData()
  }, [getAccessTokenSilently])

  useEffect(() => {
    const rows = []
    const regex = new RegExp(searchQuery, "i")
    const rawData = registrations

    // Sort
    rawData.sort((entry1, entry2) => (entry1[sortBy].localeCompare(entry2[sortBy])) * order)

    // Apply search query filter
    let matchCount = 0
    rawData.forEach((registration, i) => {
      let match = false, row = []
      Object.keys(registration).forEach((key) => {
        match = regex.test(registration[key]) || match
        row.push(
          <td key={key + i}>{registration[key]}</td>
        )    
      })

      if (match) {
        rows.push(
          <tr key={i}>
            <td key={`index${i}`}>{i + 1}</td>
            {row}
          </tr>
        )
        matchCount++;
      }
    })
    setMatches(matchCount)

    // Pagination variables
    const maxPages = Math.ceil(rows.length / rowsPerPage)
    setPages(maxPages) 
    setPage(Math.max(0, Math.min(page, maxPages - 1)))

    setRows(rows.slice(page * rowsPerPage, Math.min(rows.length, (page + 1) * rowsPerPage)))
    setLoading(false)
  }, [registrations, rowsPerPage, page, pages, searchQuery, sortBy, order])

  return (
    <>
      <Container fluid className="p-5">
        <Form className="mb-3 p-3 border rounded">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Entries per page</Form.Label>
            <Col sm={1}>
              <Form.Select
                as={Col}
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </Form.Select>
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Sort by</Form.Label>
            <Col>
              <Form.Select
                className="mb-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="date">Registration time</option>
              </Form.Select>
              <div>
                <Form.Check inline name="order" checked={order === 1} onChange={() => setOrder(1)} type="radio" label="Ascending" />
                <Form.Check inline name="order" checked={order === -1} onChange={() => setOrder(-1)} type="radio" label="Descending" />
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Search</Form.Label>
            <Col>
              <div className="d-flex">
                <Form.Control
                  className="me-2 mb-2"
                  type="text"
                  placeholder="Enter a name, UUID, email, transaction ID, event or gender..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </Col>
          </Form.Group>
          <Form.Text>Showing <b>{matches}</b> out of {registrations.length} results</Form.Text>
        </Form>

        <Row>
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First 
                disabled={page === 0} 
                onClick={() => setPage(0)} 
              />
              <Pagination.Prev 
                disabled={page === 0} 
                onClick={() => setPage(Math.max(0, page - 1))}
              />
              <Pagination.Item active>{page + 1}</Pagination.Item>
              <Pagination.Next 
                disabled={page === pages - 1} 
                onClick={() => setPage(Math.min(pages - 1, page + 1))}
              />
              <Pagination.Last 
                disabled={page === pages - 1} 
                onClick={() => setPage(pages - 1)} 
              />
            </Pagination>
          </Col>
        </Row>

        <Row>
          <Col>
            {loading ? (
              <div className="d-flex justify-content-center mb-3">
                <Spinner className="m-5 p-5" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <Table responsive striped hover>
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
                    {rows}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First 
                disabled={page === 0} 
                onClick={() => setPage(0)} 
              />
              <Pagination.Prev 
                disabled={page === 0} 
                onClick={() => setPage(Math.max(0, page - 1))}
              />
              <Pagination.Item active>{page + 1}</Pagination.Item>
              <Pagination.Next 
                disabled={page === pages - 1} 
                onClick={() => setPage(Math.min(pages - 1, page + 1))}
              />
              <Pagination.Last 
                disabled={page === pages - 1} 
                onClick={() => setPage(pages - 1)} 
              />
            </Pagination>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default ParticipantList