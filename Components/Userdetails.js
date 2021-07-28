import { useState } from "react";
import Style from "../styles/Userdetails.module.css";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch } from "react-redux";
import { Config, Update } from "../action/index";

export default function Userdetails(props) {
  const userid = props.userid;
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const [userdata, setUserdata] = useState({
    name: "",
    age: "",
    email: "",
    occupation: "",
  });
  const DeleteUser = async () => {
    try {
      const data = await fetch("/api/deleteuser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userid }),
      });
      const res = await data.json();
      console.log(res);

      dispatch(Config(res));
    } catch (err) {
      console.log(err);
    }
  };
  const updateData = async () => {
    console.log(userdata);
    const { name, age, email, occupation } = userdata;
    if (!name || !age || !email || !occupation) {
      alert("All field are mandatory");
    } else {
      try {
        const data = await fetch("/api/edit", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userid,
            name,
            age,
            email,
            occupation,
          }),
        });
        const res = await data.json();
        console.log(res);
        dispatch(Update(res));
        setEdit(!edit);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className={Style.maindiv}>
        {!edit ? (
          <div className={Style.upperdiv}>
            <div className={Style.userdetails}>
              <div>
                <span>{props.name}</span>
              </div>
              <div>
                <span>{props.age}</span>
              </div>
              <div>
                <span>{props.email}</span>
              </div>
              <div>
                <span>{props.occupation}</span>
              </div>
            </div>
            <div className={Style.btn}>
              <Button
                onClick={() => {
                  setEdit(!edit);
                }}
                variant="contained"
                color="primary"
              >
                <EditIcon />
              </Button>{" "}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  DeleteUser();
                }}
              >
                <DeleteIcon />
              </Button>{" "}
            </div>
          </div>
        ) : (
          <div className={Style.upperdiv}>
            <div className={Style.userdetails}>
              <div>
                <input
                  onChange={(e) => {
                    setUserdata({
                      ...userdata,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  type="text"
                  name="name"
                  value={userdata.name}
                />
              </div>
              <div>
                <input
                  onChange={(e) => {
                    setUserdata({
                      ...userdata,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  type="text"
                  name="age"
                  value={userdata["age"]}
                />
              </div>
              <div>
                <input
                  onChange={(e) => {
                    setUserdata({
                      ...userdata,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  type="text"
                  name="email"
                  value={userdata["email"]}
                />
              </div>
              <div>
                <input
                  onChange={(e) => {
                    setUserdata({
                      ...userdata,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  type="text"
                  value={userdata["occupation"]}
                  name="occupation"
                />
              </div>
            </div>
            <div>
              <Button
                onClick={() => {
                  updateData();
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
    </>
  );
}
