import React from "react";
import styled from "styled-components";

function MessageOptions({ currentUsername }) {
  return (
    <Wrapper>
      <div className="flex-box">
        <div className="profile">
          <strong>{currentUsername}</strong>
        </div>
        <div className="time">
          <span>{new Date().toDateString("en-GB")}</span>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #080412;
  color: #fff;
  box-shadow: 3px 2px 2px #333;
  padding-bottom: 3px;
  .flex-box {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    strong {
      color: yellow;
    }
    span {
      color: yellow;
      font-size: 15px;
    }
  }
`;

export default MessageOptions;
