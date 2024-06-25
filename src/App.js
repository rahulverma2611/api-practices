import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    remove();
  }, []);

  function remove() {
    fetch("http://localhost:3000/users").then((response) => {
      response.json().then((result) => {
        setUser(result);
      });
    });
  }

  function deleteUser(id) {
    // fetch(`http://localhost:3000/users/${id}`, {
    //   method: "delete",
    // }).then((deleted) => {
    //   deleted.json().then((resp) => {
    //     console.log(resp);
    //     remove();
    //   });
    // });
    axios
      .delete(`http://localhost:3000/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((deleteUser) => {
        console.log("deleteUser", deleteUser);
        remove();
      });
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function addUser() {
    // console.log("form", name, email, phone);
    const userDetail = { name, email, phone };
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userDetail),
    }).then((response) => {
      response.json().then((finalDetail) => {
        console.log(finalDetail);
      });
    });
  }

  return (
    <div className="App">
      <div>
        <h2>delete api practice</h2>
      </div>

      {/* -----------------get api method starts------------- */}
      <table border="1">
        <tr>
          <th>name</th>
          <th>email</th>
          <th>phone</th>
        </tr>
        {user.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <button onClick={() => deleteUser(item.id)}>delete</button>
              </td>
            </tr>
          );
        })}
      </table>{" "}
      <br />
      <br />
      <br />
      <br />
      {/* --------------------------------- post api method starts-----------------------------*/}
      <div>
        <input
        placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
        />{" "}
        <br />
        <br />
        <input
        placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <br />
        <br />
        <input
        placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="phone"
        />
        <br />
        <br />
        <button type="submit" onClick={addUser}>
          submit
        </button>
      </div>
    </div>
  );
}

export default App;
