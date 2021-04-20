import  './App.css';

import {ALL, DEFAULT_CATEGORY, Products} from './input';
import {useMemo, useState} from 'react';

import CarouselSlider from './widgets/CarouselSlider';

function App() {
  const [allItems, setAllItems] = useState(Products);
  const [itemsToDisplay, setItemsToDisplay] = useState(Products);
  const [categorySelected, setCategorySelected] = useState(DEFAULT_CATEGORY);
  const categoryOptions = useMemo(() => {
    let uniqueCategories = new Set(allItems.map((item) => {
        return item.category;
    }));
    uniqueCategories.add(DEFAULT_CATEGORY);
    const catOptionsEle = [];
    uniqueCategories.forEach((cat) => {
      if(cat===DEFAULT_CATEGORY)
        catOptionsEle.push(<option value={cat} selected>{cat}</option>);
      else
        catOptionsEle.push(<option value={cat}>{cat}</option>);
    });
    return catOptionsEle
  }, [allItems])

  const changeCategory = (event) => {
    let {value} = event.target;
    let items=allItems;
    if(value!==categorySelected){
      if(value!==ALL){
        items = allItems.filter((item) => {
          return item.category===value; 
        });
      }
    
      setCategorySelected(value);
      setItemsToDisplay(items);
    }
  }
  return (
    <div className="App">
      <div>
        <select className="App__CategorySelect" onChange={changeCategory}>
            {categoryOptions}
        </select>
      </div>
      <div>
          <CarouselSlider allItems={itemsToDisplay} noOfElementsPerSlide={3} indexToZoom={2}></CarouselSlider>
      </div>
      
    </div>
  );
}

export default App;
