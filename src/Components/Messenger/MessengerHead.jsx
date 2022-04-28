import React from "react";
import { BsApp, BsMenuApp, BsMenuUp, BsPower } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function MessengerHead({ setCurrentTab }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Container>
      <div className="title">
        <h3>Future Labs Messenger**</h3>
      </div>
      <div className="menu">
        <div>
          <BsMenuUp onClick={() => setCurrentTab("groups-list")} />
        </div>
        <div>
          <BsMenuApp onClick={() => setCurrentTab("menu-items")} />
        </div>
        <div>
          <BsPower onClick={() => handleLogout()} />
        </div>
        <div>
          <BsApp onClick={() => setCurrentTab("profile")} />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #080412;
  padding-right: 3rem;
  border-bottom: 1px solid #333;
  transition: all 1s ease-out;
  &:hover {
    /* visibility:hidden; */
  }
  .title {
    padding-left: 2rem;
    h3 {
      font-size: 0.9rem;
      color: yellow;
    }
  }
  .menu {
    display: flex;
    flex-direction: right;
    align-items: center;
    gap: 1rem;
    div {
      padding: 0.5rem;
      background: #131324;
      border-radius: 0.4rem;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      svg {
        color: yellow;
        font-size: 1.3rem;
      }
    }
  }
`;
