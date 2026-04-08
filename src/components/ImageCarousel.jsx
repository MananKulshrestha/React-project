import React, { Component } from 'react';

export default class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    // Initialize State (React Class)
    this.state = {
      slide: 0
    };
    this.timer = null;
  }

  // Lifecycle method to start the timer when the component mounts
  componentDidMount() {
    const { images, interval = 3000 } = this.props;
    
    if (images && images.length > 0) {
      this.timer = setInterval(() => {
        this.setState((prevState) => ({
          slide: (prevState.slide + 1) % images.length
        }));
      }, interval);
    }
  }

  // Lifecycle method to clean up the timer to prevent memory leaks
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { images } = this.props;
    const { slide } = this.state;

    if (!images || images.length === 0) return null;

    return (
      <div className="carousel-container">
        <img 
          src={images[slide]} 
          alt={`Carousel Slide ${slide + 1}`} 
          className="carousel-image" 
          key={slide} 
        />
      </div>
    );
  }
}