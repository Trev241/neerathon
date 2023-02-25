import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Placeholder from 'react-bootstrap/Placeholder'
import Nav from 'react-bootstrap/Nav'
import GitHubButton from 'react-github-btn'

import HomeCarousel from '../components/HomeCarousel'

import './Home.css'

function Home() {
  const [time, setTime] = useState({
    difference: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0
  })
  const [detailsTab, setDetailsTab] = useState(0)

  // const navigate = useNavigate()

  // Find time remaining and commence countdown when component is mounted
  useEffect(() => {
    const interval = setInterval(() => formatTime(new Date(2023, 1, 26, 5, 30) - Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (difference) => {
    difference = Math.max(0, difference)

    const seconds = Math.floor((difference / 1000) % 60)
    const minutes = Math.floor((difference / (1000 * 60)) % 60)
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))

    setTime({
      difference: difference,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days
    })
  }

  let details
  switch (detailsTab) {
    case 0:
      details = (
        <p className="lead mt-4">
          The event will take place on <b>26th February 2023</b> at <b>5:30 AM</b> in the morning. 
          We have breakfast ready for you so don't worry about going hungry.
        </p>
      )
      break
    case 1:
      details = (
        <div>
          <p className="lead mt-4">
            We don't want you to get lost during the run! Here's a map for you so that you don't end up in Majestic or MG Road.
          </p>
          <p className="text-muted">Psst! You can zoom in to have a better look.</p>
          <div className="ratio ratio-4x3">
            <iframe 
              src="https://www.google.com/maps/d/u/0/embed?mid=1PF05_9PTfu6AAQpWWz51os0SfMAUD4A&ehbc=2E312F" 
              title="Neerathon Routes" 
            />
          </div>
        </div>
      ) 
      break
    case 2:
      details = (
        <div className="lead mt-4">
          <p>Here is a list of all the participation categories.</p>
          <ul>
            <li>Children (below 12 years) 2 KM</li>
            <li>Children (below 12 years) 5 KM</li>
            <li>General (Male) 2 KM</li>
            <li>General (Male) 5 KM</li>
            <li>General (Female) 2 KM</li>
            <li>General (Female) 5 KM</li>
            <li>Senior Citizen (Male) 2 KM</li>
            <li>Senior Citizen (Male) 5 KM</li>
            <li>Senior Citizen (Female) 2 KM</li>
            <li>Senior Citizen (Female) 5 KM</li>
          </ul>
        </div>
      )
      break
    case 3:
      details = (
        <div className="lead mt-4">
          <p>
            If you perform well and place in the <b>top three positions</b> of your category, then we have exiciting 
            cash prizes and a medal waiting for you! And don't be disappointed if you don't, you still 
            get goodies including a Certificate of Participation and a beautiful breakfast.
          </p>
        </div>
      )
      break
    default:
      details = (
        <p className="lead mt-4">Nothing here to see!</p>
      )
      break
  }

  return (
    <>
      <HomeCarousel />

      <div className="py-5 banner bg-gradient text-white">
        <Container>
          <Row className="mb-4">
            <h1 className="display-1">
              <b>Neerathon 2023 is coming!</b>
            </h1>
            <p className="display-6">
              The Wildlife Awareness Conservation Club of St. Joseph's University is excited to bring forth to you this year's edition of Neerathon.
            </p>
          </Row>
          {/* <Row className="mb-4">
            <Col>
              <Button disabled className="py-3 px-5 btn-info" onClick={() => navigate('/register')}>
                <h5 className="my-0 register-text">Registrations closed</h5>
              </Button>
            </Col>
          </Row> */}
        </Container>
      </div>

      <Container className="mb-5">
        <Row className="my-5">
          <Col>
            <div className="bg-warning rounded p-4 text-center">
              <h4>Online registrations are now closed</h4>
              <div className="lead">It's still not too late! On-spot registrations will be open on the day of the event.</div>
            </div>
          </Col>
        </Row>

        {time.difference > 0 &&
          <Row className="my-5 text-center">
            <Col>
              <div className="bg-dark text-white rounded py-3">
                <p className="display-2 mb-1">
                  {(time.seconds === 0 && time.minutes === 0 && time.hours === 0 && time.days === 0) ? (
                      <Placeholder className="w-50" />
                    ) : (
                      <>
                        {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
                      </>
                  )}
                </p>
                <p className="display-6">before the event</p>
              </div>
            </Col>
          </Row>
        }

        <Row id="details">
          <p className="display-4">Event Details</p>
          <Nav justify variant="tabs">
            <Nav.Item>
              <Nav.Link onClick={() => setDetailsTab(0)} eventKey="link-0">Date</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setDetailsTab(1)} eventKey="link-1">Route</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setDetailsTab(2)} eventKey="link-2">Categories</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setDetailsTab(3)} eventKey="link-3">Prizes</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        
        <Row>
          {details}
        </Row>

        <hr className="my-5" />

        <Row id="faq">
          <p className="display-4 mb-3">Frequently Asked Questions</p>
          <Accordion defaultActiveKey={['0']} alwaysOpen className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is Neerathon?</Accordion.Header>
              <Accordion.Body>
                Neerathon is a run for water conservation and has been held by the Wildlife 
                Awareness Conservation Club for the past five years in an effort to raise 
                awareness regarding water conservation and to change peoples view regarding 
                the situation of conservation with the idea of sustainability.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Why do you do it?</Accordion.Header>
              <Accordion.Body>
                Water scarcity is a growing issue especially in today's time which is why we, 
                the Wildlife Awareness Conservation Club, swear to take the responsibility of 
                raising awareness on this matter. It is our desire to make a difference and 
                it was from this initiative that Neerathon was born.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How can I contribute?</Accordion.Header>
              <Accordion.Body>
                You can contribute by being a participant in the run! The event is one of a kind and is open for people from all walks of life.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <p className="text-muted">Don't see your question here? It's okay, you can always reach out to us through our socials!</p>
        </Row>
        
        <hr className="my-5" />
                
        <Row id="about">
          <p className="display-4 mb-3">About the site</p>
          <p className="lead">
            This website was developed using React.js and is hosted on Vercel. The code base for the website is open source and is available on GitHub. 
            If you like what you see, then you could <a href="https://github.com/Trev241/neerathon">star</a> the repository using the button below! You can
            also <a href="https://github.com/Trev241">follow</a> and check out my other stuff as well.
          </p>
          <div className="d-flex">
            <div className="me-2">
              <GitHubButton href="https://github.com/Trev241/neerathon" data-icon="octicon-star" data-size="large" aria-label="Star Trev241/neerathon on GitHub">Star</GitHubButton>
            </div>
            <div>
              <GitHubButton href="https://github.com/Trev241" data-size="large" aria-label="Follow @Trev241 on GitHub">Follow @Trev241</GitHubButton>
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Home