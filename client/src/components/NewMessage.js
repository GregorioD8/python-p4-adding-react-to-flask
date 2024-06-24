import React, { useState } from "react";

// Rather than useEffect, here we have a hook called onAddMessage passed to the NewMessage element 
// that updates the entire app when a message is confirmed to have been created. handleSubmit() is invoked 
// each time a user hits the "Send" button and generates a POST request with the body of the NewMessage element.
function NewMessage({ currentUser, onAddMessage }) {
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // fetch() takes an optional object as a second argument 
    // after the Flask API's URL with an HTTP request method, 
    // headers to specify the format of the message, and a 
    // message body. (PATCH requests need these elements as well!)
    fetch("http://127.0.0.1:5555/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: currentUser.username,
        body: body,
      }),
    })
      .then((r) => r.json())
      .then((newMessage) => {
        onAddMessage(newMessage);
        setBody("");
      });
  }

  return (
    <form className="new-message" onSubmit={handleSubmit}>
      <input
        type="text"
        name="body"
        autoComplete="off"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
// After generating a new record in the database, Flask returns a 
// response that is assigned to r and converted to JSON if necessary. 
// Finally, we invoke onAddMessage to update the app with this new message 
// and reset the form to be empty and ready for new input.

export default NewMessage;
