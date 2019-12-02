import React from 'react';
import List from './List';
import ShoppingForm from "./ShoppingForm";
import Footer from './Footer';
import './App.css';

// import logo from './logo.svg';

class App extends React.Component {
  state = {
    items: [
      { id: 1, name: "salad", complete: true, },
      { id: 2, name: "tonic water", complete: false, },
      { id: 3, name: "chicken", complete: false, },
    ], 
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
      <div>
        <List name="Shopping List" items={this.visibleItems()} itemClick={this.handleClick} />
        <ShoppingForm addItem={this.addItem} />
        <br />
        <Footer filter={filter} setFilter={this.setFilter} />
      </div>
    );
  };
}

export default App;
