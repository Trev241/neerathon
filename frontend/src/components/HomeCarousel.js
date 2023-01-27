import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'

import carouselImage1 from './../assets/caro1.jpg'
import carouselImage2 from './../assets/caro2.jpeg'
import carouselImage3 from './../assets/caro3.jpeg'

function HomeCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          roundedCircle
          fluid
          src={carouselImage1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          roundedCircle
          fluid
          src={carouselImage2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          roundedCircle
          fluid
          src={carouselImage3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default HomeCarousel