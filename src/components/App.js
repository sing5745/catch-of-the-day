import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from "./base";
class App extends React.Component {

 state = {
   fishes: {},
   order: {}
 };


 componentDidMount(){
   console.log('Mounted!!');
   this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
     context: this,
     state: 'fishes'
   });
 }

 componentWillUnmount(){
  base.removeBinding(this.ref);
 }

 //when component is updated
 componentDidUpdate(){
   localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
 }

 addFish = fish => {
     //take the copy of existing state (object spread is used)

     const fishes = { ...this.state.fishes};

     console.log(fishes);
     fishes[`fish${fishes.length + 1}`] = fish;

     this.setState({ fishes });

 };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {

    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = null;
    // 3. Set that to state
    this.setState({ fishes });


  };

  deleteOrder = (key) => {
    const order = {...this.state.order};

    delete order[key];

    this.setState({order});
  };

 addToOrder = (key) => {
    const order = {...this.state.order};

    order[key] = order[key] + 1 || 1;

    this.setState({order});
 };



 loadSampleFishes = () => {
   //alert("Loading fishes");
   this.setState({fishes: sampleFishes});
 };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
           {Object.keys(this.state.fishes).map(key => 
            <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]}/>)}
          </ul>
        </div>
        <Order order={this.state.order}  deleteOrder={this.deleteOrder} fishes={this.state.fishes}/>
        <Inventory 
          addFish={this.addFish} 
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={ this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
          />
      </div>
    );
  }
}

export default App;
