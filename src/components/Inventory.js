import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import firebase from 'firebase';
import Login from "./Login";
import base, { firebaseApp } from "./base";


class Inventory extends React.Component {

  state = 
    {
      uid: null,
      owner: null

    };
  

  authHandler = async (authData) => {
    var storeId = this.props.storeId;
    
    const store = await base.fetch(storeId, { context: this});

    console.log(storeId);

    if(!store.owner){
      await base.post(`${storeId}/owner`,{
        data: authData.user.uid
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid

    });

  };

 logout = async () => {
  
  alert('Logging out');
  await firebase.auth().signOut();
  this.setState({uid:null});
 };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  render() {

    const logout = <button onClick={this.logout}>Logout</button>

    if (!this.state.uid){
      return (<Login authenticate={this.authenticate} />);
    }
    
    if(this.state.uid !== this.state.owner){
      return (
      <div>
        <p>Sorry you are not authorize</p>
        {logout}
      </div>
    );
    }


    return (
      <div className="inventory">
       <h2>Inventory</h2>
       {logout}
        {Object.keys(this.props.fishes).map(key => 
        <EditFishForm 
          index={key} 
          key={key} 
          deleteFish={this.props.deleteFish}
          updateFish={this.props.updateFish} 
          fish={this.props.fishes[key]
          }
          />)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>Load sample fishes</button>
      </div>
    );
  }
}

export default Inventory;
