import React from "react";
import styled from "styled-components";
import { apiHost } from "../../../Utils/Api";

function MakeGroup({ setCurrentTab }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    if (description.length > 205) {
      alert("group description too long.");
    } else {
      const body = new FormData();
      const headers = {
        Authorization: localStorage.getItem("x-access-token"),
        userId: localStorage.getItem("x-access-user"),
      };
      body.append("name", name);
      body.append("description", description);
      var req = await fetch(`${apiHost}/chat/groups/${headers.userId}`, {
        method: "POST",
        headers,
        body,
      });
      if (req.ok) {
        setCurrentTab(null);
      }
    }
  };
  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="el">
          <label htmlFor="name">Group name:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="el">
          <label htmlFor="description">Description:</label>
          <input type="text" name="description" id="description" />
        </div>
        <div className="btn">
          <button type="submit">Create group</button>
        </div>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 3rem;

    .el,
    .btn {
      width: 100%;
      padding: 10px;
      label {
        padding-bottom: 5px;
      }
      input {
        width: 100%;
        background: transparent;
        display: block;
        height: 40px;
        color: #fff;
        border: 1px solid #00000076;
        overflow-wrap: break-word;
        border-radius: 3px;
      }
      button {
        width: 100%;
        padding: 20px;
        background: #00000076;
        border-radius: 5px;
        border: 1px solid #131313;
        color: #fff;
      }
    }
  }
`;

export default MakeGroup;
