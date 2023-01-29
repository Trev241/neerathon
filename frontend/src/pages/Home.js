import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'

import HomeCarousel from '../components/HomeCarousel'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

import './Home.css'

function Home() {
  const [time, setTime] = useState({
    seconds: "-",
    minutes: "-",
    hours: "-",
    days: "-"
  })

  const navigate = useNavigate()

  // Find time remaining and commence countdown when component is mounted
  useEffect(() => {
    const interval = setInterval(() => formatTime(new Date(2023, 1, 26) - Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (difference) => {
    difference = Math.max(0, difference)

    const seconds = Math.floor((difference / 1000) % 60)
    const minutes = Math.floor((difference / (1000 * 60)) % 60)
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))

    setTime({
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days
    })
  }

  return (
    <>
      <Navigation />
      <HomeCarousel />
      <Container className="px-5">
        <Row>
          <Col>
            <h1 className="display-1 mt-5">
              Neerathon 2023 is coming!
            </h1>
            <p className="lead">
              The Wildlife Awareness Conservation Club of St. Joseph's University is excited to bring forth to you this year's edition of Neerathon.
            </p>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Button className="my-5 p-4 w-100" onClick={() => navigate('/register')}>REGISTER NOW</Button>
          </Col>
        </Row>

        <Row>
          <p className="lead text-center">Remaining time before the event</p>
          <p className="display-6 text-center">{time.days}d {time.hours}h {time.minutes}m {time.seconds}s</p>
        </Row>

        <hr className="my-5" />

        <Row id="details">
          <Col>
            <p className="display-4 mb-3">Event Details</p>
            <p className="lead">
              The event will be conducted on 26th February 2023 and will feature two races of 2KM and 5KM each.
              Worried about getting lost? Take a look at the map to learn more about the route.
            </p>
            <p className="text-muted">
              Psst! Don't forget to zoom in to get a better look.
            </p>
          </Col>
          <Col md>
            <div className="ratio ratio-4x3">
              <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1PF05_9PTfu6AAQpWWz51os0SfMAUD4A&ehbc=2E312F" title="Neerathon Routes"></iframe>
            </div>
          </Col>
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
          <p className="text-muted">Don't see your question here? It's okay, you can always contact us directly at contact@example.com!</p>
        </Row>
      </Container>

      <Footer />
    </>
  )
}

export default Home