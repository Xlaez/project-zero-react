/*eslint-disable*/

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsPersonCircle, BsPersonFill } from "react-icons/bs";
import { api } from "../../Utils/Api";

export default function MessengerSidebar({
  users,
  user,
  changeChat,
  setCurrentTab,
}) {
  const [currentSelected, setCurrentSelected] = useState(null);
  const changeCurrentChat = (index, user) => {
    setCurrentSelected(index);
    changeChat(user);
    setCurrentTab("send");
  };
  const handleShowImage = () => {
    setCurrentTab("chat-image");
  };
  return (
    <div>
      {/* {user.length !== 0 ? ( */}
      <Container>
        <div className="profile">
          {user.isImage ? (
            <img src={`${api}${user.image}`} alt="user profile" />
          ) : (
            <BsPersonCircle />
          )}
        </div>
        <div className="flex-items">
          {users.map((user, index) => {
            return (
              <div key={index}>
                {user._id !== localStorage.getItem("c-access-chat-id") && (
                  <div
                    className={`person ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, user)}
                    onDoubleClick={() => setCurrentTab(null)}
                    key={user._id}
                  >
                    {!user.isImage ? (
                      <BsPersonFill />
                    ) : (
                      <img
                        src={`${api}${user.image}`}
                        onClick={() => handleShowImage()}
                      ></img>
                    )}
                    <span>{user.username}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  background: #080412;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  border-right:1px solid #080402;
  flex-direction: column;
  }
  .profile {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    img{
      width:4rem;
      height:4rem;
      border-radius: 50%;
    }
    svg{
      font-size: 4rem;
      color: #fff;
    }
  }
  .flex-items {
    display: flex;
    flex-direction: column;
    overflow-y:auto;
    .selected{
      border-radius:1px;
    background:#ffffff37 !important;
  }
    .person {
      padding: 30px 10px;
      background: #080420;
      border-bottom:1px solid #ffffff37;
      
      cursor:pointer;
      transition:all 1s ease-out;
      color: #fff;
      overflow-wrap: break-word;
      display: flex;
      align-items: center;
      justify-content: left;
      gap: 0.4rem;
      img{
        width:2rem;
        height:2rem;
        border-radius:50%;
      }
      svg {
        font-size: 2rem;
        border-radius:50%;
      }
      span{
        font-size:.8rem;
      }
    }
    &::-webkit-scrollbar {
      width: 0.6rem;
    border-radius: 0.5rem;
    background: #fff;
    &-thumb {
      background: #333;
      width: 0.6rem;
      border-radius: 0.5rem;
    }
  }
  }
 
`;
