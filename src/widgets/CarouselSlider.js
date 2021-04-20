import './Carousel.css';

import {useMemo, useRef, useState} from 'react';

import Card from './Card';
import LeftArrow from '../icons/leftArrow.js';
import RightArrow from '../icons/RightArrow.js';

const CarouselSlider = (props) => {
    const {allItems, noOfElementsPerSlide, indexToZoom}  = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateValue, setTranslateValue] = useState(0);
    const slideWrapperEl = useRef(null);

    const sliderWrapperWidth = () => {
      if (slideWrapperEl && slideWrapperEl.current) {
        return slideWrapperEl.current.clientWidth;
      }
  
      return 0;
    };
    const calcSlidesCount = Math.ceil(allItems.length / noOfElementsPerSlide);
  
    const handlePrevious = ()=>{
        if(currentIndex >= 1)
            setCurrentSlideIndex(currentIndex - 1, 'prev');
    }
    const handleNextSlide = () => {  
        if(currentIndex < calcSlidesCount-1)
            setCurrentSlideIndex(currentIndex + 1, 'next');
  };
    const setCurrentSlideIndex = (index, slideDirection) => {
         if (index > currentIndex) {
            const indexDifference = index - currentIndex;
            setCurrentIndex(index);
            setTranslateValue(translateValue + -(sliderWrapperWidth() * indexDifference));
          } else if (index < currentIndex) {
            const indexDifference = currentIndex - index;
            setCurrentIndex(index);
            setTranslateValue(translateValue + sliderWrapperWidth() * indexDifference);
          }
    
      };
    
    const slideElements = useMemo(() => {
        let i=0;
        let mod = Math.ceil(allItems.length/noOfElementsPerSlide);
        const allSlides = allItems.map((item, index) => {
            if((index%noOfElementsPerSlide)===(indexToZoom-1)){
                return <Card classname="Card__Zoom" {...item} ></Card>
            }else{
                return <Card {...item}></Card>
            }
        });
        return allSlides;

    }, [allItems]);
    return (
        <div className="CarouselSlider">
            <button type="button" aria-label="CarouselBack" class="CarouselSlider__BackButton" onClick={handlePrevious}>  
            <LeftArrow></LeftArrow>
            </button>
            <div className="CarouselSlider__Wrapper" style={{width: `${300*noOfElementsPerSlide}px`}}>
                <span className="CarouselSlider__CardContainer"  style={{transform: `translateX(${translateValue}px)`}} ref={slideWrapperEl}> 
                        {slideElements}
                </span>         
            </div>
            <button type="button" aria-label="CarouselForward" class="CarouselSlider__ForwardButton" onClick={handleNextSlide}>
                <RightArrow></RightArrow>
            </button>
        </div>
    );

};

export default CarouselSlider;