import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import styled from "styled-components";
import { api } from "../../Utils/Api";

function MessengerSetProfile({ user, setCurrentTab }) {
  const auth = localStorage.getItem("x-access-token");
  const userId = localStorage.getItem("x-access-user");
  //   const regId = localStorage.getItem("x-access-reg-id");
  const headers = {
    Authorization: auth,
    userAccess: userId,
  };
  //   if (regId) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = document.getElementById("image").files[0];
    const body = new FormData();
    if (!image) {
      alert("upload an image");
    } else {
      body.append("image", image);
      var req = await fetch(`${api}api/chat/${userId}`, {
        method: "PUT",
        headers,
        body,
      });
      var res = await req.json();
      console.log(res);
      if (req.ok) {
        setCurrentTab(null);
      } else {
        alert("An error occured");
      }
    }
    // };
  };
  return (
    <Container>
      {user.isImage ? (
        <img src={`${api}${user.image}`} alt="" />
      ) : (
        <BsPersonCircle />
      )}
      <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
        <input type="file" name="image" id="image" />
        <button type="submit">Upload</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  img {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
  }
  svg {
    font-size: 9rem;
  }

  form {
    padding: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.4rem;
    input {
      width: 100%;
      border: 1px solid yellow;
      background: transparent;
      color: #fff;
      height: 30px;
      &::-webkit-file-upload-button {
        background: yellow;
        height: 30px;
        border: none;
        color: #131324;
      }
    }
    button {
      padding: 10px 20px;
      color: #fff;
      background: #131313;
      border: 1px solid #00000076;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

export default MessengerSetProfile;
