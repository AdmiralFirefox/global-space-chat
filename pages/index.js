import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Channel from "../components/Channel";
import Navbar from "../components/Navbar/Navbar";
import ParticlesBackground from "../components/ParticlesBackground";
import SignIn from "../components/SignIn";
import Initializing from "../components/Initializing";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export default function Home() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    //Cleanup subscription
    return unsubscribe;
  }, []);

  //Allowing the user to sign in
  const signInWithgoogle = async () => {
    //Retrieve Google Provider Object
    const provider = new firebase.auth.GoogleAuthProvider();
    //Set language to the default browser preference
    auth.useDeviceLanguage();
    //Start sign in process
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  };

  //Allowing the user to sign out
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log(err.essage);
    }
  };

  if (initializing)
    return (
      <div>
        <Initializing />
      </div>
    );

  return (
    <div>
      {user ? (
        <div>
          <Navbar signOut={signOut} />
          <ParticlesBackground />
          <Channel user={user} db={db} />
        </div>
      ) : (
        <div>
          <SignIn signInWithgoogle={signInWithgoogle} />
        </div>
      )}
    </div>
  );
}
