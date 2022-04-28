import React from "react";
import styled from "styled-components";

export default function About() {
  return (
    <Container>
      <div className="lists">
        <ul>
          <li>
            App Name: <span>Future Labs Messenger</span>{" "}
          </li>
          <li>
            App Version: <span>0.0.1 Beta</span>
          </li>
          <li>
            Release Date: <span>{new Date().toDateString()}</span>
          </li>
          <li>
            Developed By: <span>Xcel Team</span>
          </li>
          <li>
            Next Release: <span>{new Date().toDateString()}</span>
          </li>
          <li>
            Developed For: <span>Future Labs Nigeria</span>
          </li>
          <li>
            {" "}
            &copy; Copyright License:{" "}
            <span>Only for use and refactor by Futurelabs Nigeria</span>
          </li>
          <li>******************</li>
        </ul>
      </div>
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
  .lists {
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* justify-content:center; */
      gap: 0.6rem;
      li {
        list-style: none;
        color: #ccc;
        span {
          color: yellow;
          font-size: 0.9rem;
        }
      }
    }
  }
`;
