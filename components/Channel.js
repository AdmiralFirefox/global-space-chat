import React, { useState, useEffect, useRef, useContext } from "react";
import { DarkModeContext } from "../pages/_app";
import firebase from "firebase/app";
import Message from "./Message";
import channelStyles from "../styles/Home.module.scss";
import SendMessageForm from "./SendMessageForm";

const Channel = ({ user = null, db = null }) => {
  const dummy = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { uid, displayName, photoURL } = user;

  const darkMode = useContext(DarkModeContext);

  useEffect(() => {
    document.getElementsByTagName("body")[0].className = darkMode
      ? channelStyles["bg-light"]
      : channelStyles["bg-dark"];
  }, [darkMode]);

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          //Get all documents form collection with ID
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          //Update state
          setMessages(data);
        });

      //Detach Listener
      return unsubscribe;
    }
  }, [db]);

  //   Use this code in your Firebase Rules to render the messages from your data base
  {
    /*     
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if request.auth != null;
        }
      }
    }
*/
  }

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
    }
    setNewMessage("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={channelStyles["channel-wrapper"]}>
      <div className={channelStyles["channel-content"]}>
        <div
          className={
            darkMode
              ? channelStyles["channel-messages-light"]
              : channelStyles["channel-messages-dark"]
          }
        >
          {messages.map((message) => {
            return (
              <div key={message.id}>
                <Message {...message} />
              </div>
            );
          })}
          <span ref={dummy}></span>
        </div>
        <div className={channelStyles["channel-form-wrapper"]}>
          <SendMessageForm
            handleOnSubmit={handleOnSubmit}
            newMessage={newMessage}
            handleOnChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Channel;
