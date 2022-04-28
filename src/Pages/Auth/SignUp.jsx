import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiHost } from "../../Utils/Api";

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username.length < 2) {
      alert("Your username can't be less than 2 characters");
    } else if (password.length < 7) {
      alert("password cant be less than 7 characters");
    } else {
      const body = new FormData();
      body.append("username", username);
      body.append("email", email);
      body.append("password", password);
      var req = await fetch(`${apiHost}/auth/`, {
        method: "POST",
        body,
      });
      if (req.ok) {
        var res = await req.json();
        console.log(res);
        localStorage.setItem("x-access-token", res.token);
        localStorage.setItem("x-access-user", res.userAccess);
        navigate("/");
      } else {
        alert("Something went wrong while signing you up");
      }
    }
  };
  return (
    <Wrapper>
      <div className="form-spread">
        <h2>Futurelabs messenger</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="el">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="el">
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="el">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="btn">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <div className="form-nav">
        <small>
          Already have an acccount? <Link to="/login">Login here</Link>{" "}
        </small>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: #131324;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .form-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ccc;
    padding-top: 1.3rem;
    a {
      color: yellow;
    }
  }
  .form-spread {
    width: 500px;
    border-radius: 3rem;
    padding: 3rem 4rem;
    display: flex;
    flex-direction: column;
    background: #080412;
    h2 {
      text-align: center;
      text-transform: capitalize;
      padding: 0.5rem;
      color: yellow;
    }

    .el {
      padding: 0.7rem 0;
      width: 100%;

      input {
        width: 100%;
        height: 40px;
        background: transparent;
        border: 2px solid yellow;
        border-radius: 5px;
        /* padding-left: 5px; */
        color: #ccc;

        &:focus {
          outline: none;
        }
        &::placeholder {
          padding-left: 5px;
          color: #ccc;
        }
      }
    }
    .btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0.7rem 0;

      button {
        /* width: 100%; */
        padding: 15px 30px;
        border: 1px solid #ffffff37;
        border-radius: 5px;
        text-align: center;
        background: #131324;
        border-radius: 5px;
        color: #fff;
        transition: all 1s ease-out;
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
    }
  }
  @media (max-width: 700px) {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100vw !important;
    overflow: hidden !important;

    .form-spread {
      height: 100vh !important;
      width: 90vw !important;
      border-radius: 0 !important;
      border: none;
      padding: 2rem 1rem !important;
      h2 {
        font-size: 17px;
        padding: 1rem 0;
        text-align: center;
      }
      .el {
        width: fit-content;
      }
    }
  }
`;
