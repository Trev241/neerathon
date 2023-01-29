import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'

import carouselImage1 from './../assets/_DSC8157.jpg'
import carouselImage2 from './../assets/_DSC7984.jpg'
import carouselImage3 from './../assets/_DSC8065.jpg'
import carouselImage4 from './../assets/_DSC8153.jpg'
import carouselImage5 from './../assets/_DSC8010.jpg'

function HomeCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          // roundedCircle
          fluid
          src={carouselImage1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          // roundedCircle
          fluid
          src={carouselImage2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          // roundedCircle
          fluid
          src={carouselImage3}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          // roundedCircle
          fluid
          src={carouselImage4}
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          // roundedCircle
          fluid
          src={carouselImage5}
          alt="Fifth slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default HomeCarousel