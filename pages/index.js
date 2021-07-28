import { Button, Container, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Style from "../styles/Home.module.css";
import { useSelector } from "react-redux";

import Userdetails from "../Components/Userdetails";

export default function Home() {
  const State = useSelector((state) => state.Reducer);

  const [adduser, setAdduser] = useState(false);

  const [alluser, setAlluser] = useState([]);
  const [userinfo, setUserinfo] = useState({
    name: "",
    age: "",
    email: "",
    occupation: "",
  });
  const update = (e) => {
    setUserinfo({ ...userinfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (State.name) {
      const arr = [];
      for (var i = 0; i < alluser.length; i++) {
        if (alluser[i]._id === State._id) {
          arr.push(State);
        } else arr.push(alluser[i]);
      }
      setAlluser(arr);
    } else {
      setAlluser(alluser.filter((item) => item._id !== State.id));
    }
  }, [State]);
  const sendData = async () => {
    try {
      const { name, age, email, occupation } = userinfo;
      if (!name || !age || !email || !occupation) {
        alert("All field are mandatory");
        return;
      } else {
        const data = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, age, email, occupation }),
        });
        const res = await data.json();
        console.log(res);
        setAlluser([...alluser, res]);
        setAdduser(!adduser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={Style.maindiv}>
      <div className={Style.container}>
        <div className={Style.wrapper}>
          <div>
            {!adduser ? (
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setAdduser(!adduser);
                  }}
                >
                  Add User
                </Button>
              </div>
            ) : (
              <div className={Style.adduser}>
                <div className={Style.userform}>
                  <div>
                    <input
                      onChange={(e) => {
                        update(e);
                      }}
                      name="name"
                      type="text"
                      placeholder="Enter your Name"
                    />
                  </div>
                  <div>
                    <input
                      onChange={(e) => {
                        update(e);
                      }}
                      name="age"
                      type="text"
                      placeholder="Enter your Age"
                    />
                  </div>
                  <div>
                    <input
                      onChange={(e) => {
                        update(e);
                      }}
                      name="email"
                      type="text"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <input
                      onChange={(e) => {
                        update(e);
                      }}
                      name="occupation"
                      type="text"
                      placeholder="Your occupation"
                    />
                  </div>
                </div>
                <div className={Style.btn}>
                  <Button
                    onClick={() => {
                      sendData();
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className={Style.userdetails}>
            <div style={{ textAlign: "center" }}>
              <h2>UserDetails</h2>
            </div>
            <div className={Style.flx}>
              <div>
                <h4>Name</h4>
              </div>
              <div>
                <h4>Age</h4>
              </div>
              <div>
                <h4>Email</h4>
              </div>
              <div>
                <h4>Occupation</h4>
              </div>
              <div></div>
            </div>
            {alluser.map((user, i) => {
              return (
                <Userdetails
                  name={user.name}
                  age={user.age}
                  email={user.email}
                  occupation={user.occupation}
                  key={i}
                  userid={user._id}
                  id={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
