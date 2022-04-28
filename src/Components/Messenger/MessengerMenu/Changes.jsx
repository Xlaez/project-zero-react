import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiHost } from "../../../Utils/Api";
function Changes({ user }) {
  const navigate = useNavigate();
  let [currentState, setCurrentState] = useState(null);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleEmailChange = (e) => {
    e.preventDefault();
    const emailI = document.getElementById("email").value;
    if (emailI.length < 3) {
      alert("invalid email");
    } else {
      // const {...input,[e.target.name]:e.target.value}
      setInput({ email: emailI });
      setCurrentState("email");
    }
  };
  const handlePassChange = (e) => {
    e.preventDefault();
    const passwordI = document.getElementById("password").value;
    if (passwordI.length < 7) {
      alert("Password must be more than 6 characters");
    } else {
      setInput({ password: passwordI });
      setCurrentState("password");
    }
  };

  const userId = localStorage.getItem("x-access-user");
  const token = localStorage.getItem("x-access-token");

  const headers = {
    userAccess: userId,
    Authorization: token,
  };

  const changeEmail = async (e) => {
    e.preventDefault();
    var password = document.getElementById("verify-pass").value;
    const body = new FormData();
    const { email } = input;
    body.append("password", password);
    body.append("email", email);

    var req = await fetch(`${apiHost}/auth/change_email/${userId}`, {
      method: "POST",
      headers,
      body,
    });
    if (req.ok) {
      navigate("/login");
    }
  };
  const changePass = async (e) => {
    e.preventDefault();
    var pass = document.getElementById("password-verify").value;
    const body = new FormData();
    const { password } = input;
    body.append("oldPassword", pass);
    body.append("newPassword", password);

    var req = await fetch(`${apiHost}/auth/change_pass/${userId}`, {
      method: "POST",
      headers,
      body,
    });

    if (req.ok) {
      navigate("/login");
    }
  };
  return (
    <Wrapper>
      {currentState === null && (
        <div>
          <form onSubmit={(e) => handleEmailChange(e)}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="New email"
            />
            <button type="submit">Change</button>
          </form>
          <form onSubmit={(e) => handlePassChange(e)}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="New password"
            />
            <button type="submit">Change</button>
          </form>
        </div>
      )}
      {currentState === "email" && (
        <div className="email-verify">
          <span>We need to verfiy your account</span>
          <span>for security reasons</span>
          <form onSubmit={(e) => changeEmail(e)}>
            <input
              type="password"
              name="password-verify"
              id="verify-pass"
              placeholder="Current password"
            />
            <button type="submit">Verify</button>
          </form>
        </div>
      )}
      {currentState === "password" && (
        <div className="password-verify">
          <span>We need to verfiy your account</span>
          <span>for security reasons</span>
          <form onSubmit={(e) => changePass(e)}>
            <input
              type="password"
              name="password-verify"
              id="password-verify"
              placeholder="Current password"
            />
            <button type="submit">Verfiy</button>
          </form>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;

  div {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  form {
    padding: 1rem;
    input {
      width: 240px;
      height: 30px;
      border: 1px solid #ccc;
      background: transparent;
      display: block;
      color: #ccc;
      &:focus {
        outline: none;
      }
      &::placeholder {
        padding-left: 4px;
      }
    }
    button {
      width: 247px;
      color: yellow;
      display: block;
      padding: 7px;
      margin-top: 3px;
      background: #00000076;
      border: 1px solid transparent;
    }
  }
  .password-verify,
  .email-verify {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      padding-bottom: 0.1rem;
    }
  }
`;

export default Changes;
