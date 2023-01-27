import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import HomeCarousel from '../components/HomeCarousel'
import Navigation from '../components/Navigation'

function Home() {
  return (
    <>
      <Navigation />
      
      <Container bsPrefix="container my-5">
        <Row>
          <Col>
              <h1 className="display-1">
                Run to Raise Awareness
              </h1>
              <p className="lead">
                St. Joseph's University is excited to bring to you this year's edition of Neerathon! Don't miss out and register now!
              </p>
          </Col>
          <Col md>
            <HomeCarousel />
          </Col>
        </Row>
      </Container>

      <Container>
        <h1 className="display-2">About</h1>
        <p className="lead">
          Every year, WACC - a student association of St. Joseph's University, Bengaluru organises a run to raise awareness about water conservation called "Neerathon". They raise funds to provide better drinking water facilities in rural as well as urban
          areas of the state. Wildlife Awareness and Conservation Club through Neerathon 5.0 aims to promote and advocate water conservation which is a prevalent issue in Bangalore, and in different parts of Karnataka. It brings a change by breaking
          the loop of ignorance towards saving the planet. After 4 years of successful Neerathons, Neerathon 5.0 and their enthusiasts this year aim to focus on conservation as well as other issues such as climate change, global warming, and pollution
          which are major concerns throughout the world. We aim to create awareness,and aim to create change.  
        </p>    
      </Container>
    </>
  )
}

export default Home