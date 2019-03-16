import app from "firebase/app";
import "firebase/auth"; // gets exported with app as well
// import "firebase/storage"; // if I wanted to use storage as well

const config = {
  apiKey: "AIzaSyBCYDCt-fbPWjipeVbxeSfv5oHL0LY7HqY",
  authDomain: "notetorious-beb4d.firebaseapp.com",
  databaseURL: "https://notetorious-beb4d.firebaseio.com",
  projectId: "notetorious-beb4d",
  storageBucket: "notetorious-beb4d.appspot.com",
  messagingSenderId: "652320142575"
};

app.initializeApp(config);

export default app;
