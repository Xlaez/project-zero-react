import React, { useState, useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";
import styled from "styled-components";
import { api } from "../../../Utils/Api";

function Menu({ users, setCurrentTab, user }) {
  const [contacts, setContacts] = useState(null);
  useEffect(() => {
    (function calc(users) {
      for (let i = 0; i < users.length; i++) {
        setContacts(i + 1);
      }
    })(users);
  });
  return (
    <MenuI>
      <div className="list-items">
        <div className="user">
          {user.isImage && <img src={`${api}${user.image}`} alt="No pics" />}
          {user.isImage === false && <BsPersonCircle />}
          <strong>{user.username}</strong>
        </div>
        <div className="options">
          <li>Total contacts: {contacts}</li>
          <li>Registerd On: {new Date(user.createdAt).toDateString()}</li>
          <li className="changeAcc" onClick={() => setCurrentTab("make-group")}>
            Create group
          </li>
          <li
            className="changeAcc"
            onClick={() => setCurrentTab("profile-change")}
          >
            Acc settings
          </li>
          <li className="changeAcc" onClick={() => setCurrentTab("about")}>
            About app
          </li>
        </div>
      </div>
    </MenuI>
  );
}

const MenuI = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .list-items {
    display: flex;
    flex-direction: column;
    .user {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      img {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
      }
      svg {
        font-size: 8rem;
      }
      strong {
        color: yellow;
        font-size: 1rem;
      }
    }
    .options {
      text-align: center;
      padding-top: 1rem;
      li {
        list-style: none;
        color: #ccc;
        font-weight: 600;
        padding: 0.2rem 0;
      }
      .changeAcc {
        padding: 10px 30px;
        background: #080412;
        color: #ccc;
        border-radius: 3px;
        margin-top: 0.6rem;
        transition: all 1s ease-out;

        &:hover {
          background: #00000076;
          cursor: pointer;
        }
      }
    }
  }
`;

export default Menu;
