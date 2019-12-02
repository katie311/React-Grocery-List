import React from 'react';
import List from './List';
import ShoppingForm from "./ShoppingForm";
import Footer from './Footer';
import './App.css';

// I'm not sure how to properly connect the css file

/* QUESTION FOR TA'S: I don't understand the bind requirements. 
They aren't present in the online lecture, but when we did the 
example in class we had to add them. My app appears to be working 
without them, is there a problem that I'm missing? */

class App extends React.Component {
  state = {
    items:[], 
    filter: 'All' 
  };

  setFilter = (filter) => {
    this.setState({ filter })
  }


  getUniqId = () => {
    return Math.floor((1 + Math.random()) *0x10000)
      .toString(16)
      .substring(1);
  }

  addItem = (name) => {
    const { items } = this.state;
    const item = { name, id: this.getUniqId() , complete: false, }
    this.setState({ items: [item, ...items] })
  }

  handleClick = (id) => {
    const { items } = this.state;
    this.setState({
      items: items.map( item => {
        if (item.id === id) {
          return {
            ...item,
            complete: !item.complete
          }
        }
        return item
      })
    })
  }

  visibleItems = () => {
    const { items, filter } = this.state;
    switch(filter) {
      case 'Incomplete':
        return items.filter( i => !i.complete )
      case 'Complete':
        return items.filter( i => i.complete )
      default:
        return items;
    }
  }

  render() {
    const { items, filter } = this.state;
    
    return (
      <div className = "App">
        <List name="Shopping List" items={this.visibleItems()} itemClick={this.handleClick} />
        <ShoppingForm addItem={this.addItem} />
        <br />
        <Footer filter={filter} key={this.state.items.id} setFilter={this.setFilter} />
      </div>
    );
  };
}

export default App;
