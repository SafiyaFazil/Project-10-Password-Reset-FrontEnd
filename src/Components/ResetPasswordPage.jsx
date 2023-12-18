import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPasswordPage(props) {
  const [token, setToken] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [responce, setResponce] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handletoken = (e) => {
    setToken(e.target.value);
  };

  const handleNewPassword = (e) => {
    setnewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setconfirmPassword(e.target.value);
  };

  const handleChangePasswordBtn = async () => {
    if (confirmPassword !== newPassword) {
      setError("Password not match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (confirmPassword == "" || newPassword == "" || token == "") {
      setError("enter the required fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (newPassword.length < 8) {
      setError("Enter minimum 8 characters for password");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    const fetchpassword = await fetch(
      "http://localhost:5000/api/user/resetpasswordpage",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: confirmPassword,
        }),
      }
    );
    const fetchResponce = await fetchpassword.json();
    console.log(fetchResponce);
    setResponce(fetchResponce.message);
    setTimeout(() => {
      setResponce("");
    }, 3000);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="resetmain">
      <div className="resetpage container-fluid text-center d-flex flex-column align-items-center justify-content-center  ">
        <h3>CHANGE PASSWORD</h3>
        <div className="resetform form-group mt-4">
          <div className="form-CONTROL ">
            <input
              className="form-control inputbox "
              type="text"
              value={newPassword}
              onChange={handleNewPassword}
              placeholder="Enter new password"
            />
          </div>
          <br />

          <div className="form-CONTROL mt-3">
            <input
              className="form-control inputbox"
              type="text"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              placeholder="Enter confirm password"
            />
          </div>
          <br />

          <div className="form-CONTROL mt-3">
            <input
              className="form-control inputbox"
              type="text"
              value={token}
              onChange={handletoken}
              placeholder="Enter token"
            />
          </div>
          <br />

          <button
            onClick={handleChangePasswordBtn}
            className="btn btn-primary mt-3 button"
          >
            Change Password
          </button>
          <br />
          <div className="text-danger">
            {responce && <p>{responce} </p>}
            {error && <p> {error} </p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
