import React from "react";
import firebase from "../firebase";
import axios from "axios";

export default class Home extends React.Component {
  state = {
    currentUserId: "",
    currentUserEmail: "",
    token: ""
  };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log("Yo user", user);
      if (user) {
        console.log("this is the current user", user);
        // do your logged in logic
        // this.props.history.push("/");
        this.setState(
          {
            currentUserId: user.uid, //this UID should be saved in the db
            currentUserEmail: user.email
          },
          () => {
            this.getFirebaseIdToken();
          }
        );
      } else {
        // the user is logged out
        console.log("boooo");
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleUnprotectedAPI = () => {
    axios
      .post("/users/unprotected", {
        id: this.state.currentUserId,
        email: this.state.currentUserEmail,
        token: this.state.token
      })
      .then(res => {
        console.log(res);
      });
  };

  getFirebaseIdToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ false) //if true it makes the old token expired... With false it keeps the token in tact
      .then(idToken => {
        this.setState({
          token: idToken
        });
        // Send token to your backend via HTTPS
        // ...
      })
      .catch(error => {
        // Handle error
      });
  };

  handleProtectedAPI = () => {
    axios
      .post("/users/protected", {
        token: this.state.token
      })
      .then(res => {
        console.log(res.data);
      });
  };

  render() {
    console.log(this.state);
    return (
      <>
        <h1>Welcome home</h1>{" "}
        {this.state.currentUserEmail
          ? this.state.currentUserEmail + " " + this.state.currentUserId
          : "You are not logged in!"}
        <button onClick={this.handleUnprotectedAPI}>
          Unprotedted API Invocation
        </button>
        <button onClick={this.handleProtectedAPI}>Protedted API</button>
      </>
    );
  }
}
