import Rebase from 're-base';
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "https://your-firebase.firebaseio.com",
   
  });

  const base = Rebase.createClass(firebaseApp.database());

  export { firebaseApp };

  export default base;