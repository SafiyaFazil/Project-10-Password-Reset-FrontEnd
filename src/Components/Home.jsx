import { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [RegUserName, setRegUserName] = useState("");
  const [RegEmailId, setRegEmailId] = useState("");
  const [RegPassword, setRegPassword] = useState("");
  const [LoginEmailid, setLoginEmailid] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [token, setToken] = useState("");
  const [userdetails, setUserdetails] = useState("");
  const [regStatus, setRgStatus] = useState("");
  const [loginStatus, setloginStatus] = useState("");
  const [loginserverStatus, setloginserverStatus] = useState("");
  const [resetMessage, setresetMessage] = useState("");

  const navigate = useNavigate();

  const handleRegUserInp = (e) => {
    setRegUserName(e.target.value);
  };

  const handleRegEmailInp = (e) => {
    setRegEmailId(e.target.value);
  };

  const handleRegPasswordInp = (e) => {
    setRegPassword(e.target.value);
  };

  const handleLoginEmailInp = (e) => {
    setLoginEmailid(e.target.value);
  };

  const handleLoginPasswordInp = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleRegBtn = async () => {
    if (RegUserName == "" || RegEmailId == "" || RegPassword == "") {
      setRgStatus("Please enter the required details");
      setTimeout(() => {
        setRgStatus("");
      }, 3000);

      return;
    }

    const requestBody = JSON.stringify({
      username: RegUserName,
      emailid: RegEmailId,
      password: RegPassword,
    });

    https: try {
      const regResponce = await fetch(
        "http://localhost:5000/api/user/register",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: requestBody,
        }
      );

      const regResDetails = await regResponce.json();

      const message = regResDetails.message;

      if (regResDetails) {
        setRgStatus(message);
      }
      console.log("REGISTER STATUS", regStatus);
      setTimeout(() => {
        setRgStatus("");
      }, 3000);
    } catch (error) {
      console.log("Error in Register", error);
    }
  };

  const handleLoginBtn = async () => {
    if (LoginEmailid == "" || LoginPassword == "") {
      setloginStatus("Please enter the required details");
      setTimeout(() => {
        setloginStatus("");
      }, 3000);

      return;
    }

    const loginRes = await fetch("http://localhost:5000/api/user/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        emailid: LoginEmailid,
        password: LoginPassword,
      }),
    });
    console.log(loginRes);
    const data = await loginRes.json();
    setToken(data.token);
    setloginserverStatus(data.message);
    setTimeout(() => {
      setloginserverStatus("");
    }, 3000);
    console.log(data.token);
  };

  const handleForget = async () => {
    try {
      if (LoginEmailid == "") {
        setloginStatus("Please enter the Login id");

        setTimeout(() => {
          setloginStatus("");
        }, 3000);

        return;
      }

      const forgetFetch = await fetch(
        "https://password-reset-backend-tzx0.onrender.com/api/resetpassword",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            emailid: LoginEmailid,
          }),
        }
      );

      const responce = await forgetFetch.json();

      if (responce) {
        setresetMessage(responce.message);

        console.log(responce.message);
      }

      if (responce.message == "Mail sent successfully to emailid") {
        setTimeout(() => {
          navigate("/Preset");
        }, 2000);

        console.log(resetMessage);
      }

      setTimeout(() => {
        setresetMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [token]);

  const fetchdata = async () => {
    try {
      const responce = await fetch(
        "https://password-reset-backend-tzx0.onrender.com/api/getuser",
        {
          method: "get",
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        }
      );
      const data = await responce.json();

      if (data) {
        setUserdetails(data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="main container-fluid text-center py-3">
        <div className="register container-fluid d-flex flex-column align-items-center justify-content-center ">
          <h1>REGISTER</h1>
          <br />
          <div className="form-group mt-3 mx-5 ">
            <input
              className="form-control inputbox"
              type="text"
              value={RegUserName}
              onChange={handleRegUserInp}
              placeholder="Enter Username"
            />
            <br />
            <br />

            <input
              className="form-control mt-3 inputbox"
              type="text"
              value={RegEmailId}
              onChange={handleRegEmailInp}
              placeholder="Enter EmailId"
            />
            <br />
            <br />

            <input
              className="form-control mt-3 inputbox"
              type="password"
              value={RegPassword}
              onChange={handleRegPasswordInp}
              placeholder="Enter Password"
            />
            <br />
            <br />

            <button
              className="btn btn-primary mt-3 button"
              onClick={handleRegBtn}
            >
              Register
            </button>
          </div>

          {<p>{regStatus}</p>}
        </div>
        <br />
        <br />

        <div className="login container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
          <h1>LOGIN</h1>
          <br />
          <div className="form-group mt-3 ">
            <input
              type="text"
              className="form-control inputbox"
              value={LoginEmailid}
              onChange={handleLoginEmailInp}
              placeholder="Enter EmailId"
            />
            <br />
            <br />
            <input
              type="password"
              className="form-control mt-2 inputbox "
              value={LoginPassword}
              onChange={handleLoginPasswordInp}
              placeholder="Enter Password"
              required
            />
            <br />
            <br />
            <div className="login-forget-btn container-fluid f-flex mx-3">
              <button
                className="btn btn-success mt-2 button"
                onClick={handleLoginBtn}
              >
                Login
              </button>
              <a className="mx-2 forget" onClick={handleForget}>
                Forget password?
              </a>
            </div>

            {<p>{loginStatus}</p>}
            {<p>{loginserverStatus}</p>}
          </div>
          {resetMessage ? <div>{resetMessage}</div> : null}
        </div>
      </div>
    </>
  );
}

export default Home;
