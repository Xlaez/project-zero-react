import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import styled from "styled-components";
import { api } from "../../Utils/Api";

export default function MessengerProfile({ user, setCurrentTab }) {
  return (
    <Container>
      <div className="grid-items">
        {user.isImage ? (
          <div className="img-p">
            <img src={`${api}${user.image}`} alt="An avater of you" />
            <span>{user.username}</span>
          </div>
        ) : (
          <div className="img-p">
            <BsPersonCircle />
            <span>{user.username}</span>
          </div>
        )}
        <div className="txt-display">
          <div className="email">
            <span>
              Email: <small>{user.email}</small>
            </span>
            <small>Your email is visible to only you</small>
          </div>
          <div className="edit">
            <button onClick={() => setCurrentTab("set-profile")}>
              Add profile image
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  background: #131324;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .grid-items {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    .img-p {
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      img {
        width: 9rem;
        height: 9rem;
        border-radius: 50%;
      }
      svg {
        font-size: 9rem;
      }
      span {
        text-align: center;
        font-weight: 600;
        font-family: fantasy;
      }
    }
    .txt-display {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: Center;
      .email {
        display: flex;
        gap: 0.3rem;
        text-align: center;
        flex-direction: column;
        span {
          color: #fff;
          display: block;
          small {
            color: yellow;
            font-size: 15px;
          }
        }
        small {
          color: red;
          font-size: 14px;
          font-weight: 700;
        }
      }
      .edit {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 2rem;
        button {
          background: #131313;
          color: #fff;
          border-radius: 3px;
          border: 1px solid #00000076;
          padding: 15px 20px;
          cursor: pointer;
          transition: all 1s ease-out;
          &:hover {
            opacity: 0.6;
          }
        }
      }
    }
  }
`;
