import React from "react";
import firebase from "../firebase";

export default class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    errMessage: ""
  };

  componentDidMount() {
    //adds an observer for changes to the user's sign-in state
    //onAuthStateChange() is technically an event handler checking for current state of logged in or not  ---- it also returns a terminate function that is saved to this.unsubscribe...

    //adding this.unsubscribe variable makes it global to the class ()

    // upon componentWillUnmount we fire the terminate function that onAuthStateChange gave us.
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("this is the current user", user);
        // do your logged in logic
        this.props.history.push("/");
      } else {
        // the user is logged out
        console.log("boooo");
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        this.setState({
          errMessage: err.message
        });
      });
  };

  render() {
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        {this.state.errMessage ? this.state.errMessage : null}
      </>
    );
  }
}
