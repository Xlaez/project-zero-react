import React, { useRef } from "react";
import { BsCircleFill } from "react-icons/bs";
import styled from "styled-components";
import { api } from "../../../Utils/Api";

function MessageDisplay({ messages, uuidv4, currentChat, setMessages, user }) {
  const scrollRef = useRef();

  var headers = {
    Authorization: localStorage.getItem("x-access-token"),
    userAccess: localStorage.getItem("x-access-user"),
  };
  const refreshMsgs = () => {
    const newBody = new FormData();
    newBody.append("from", user._id);
    newBody.append("to", currentChat._id);
    async function getMsg() {
      var req = await fetch(`${api}api/chat/`, {
        method: "POST",
        headers,
        body: newBody,
      });
      var res = await req.json();
      if (req.ok) {
        setMessages(res);
      } else {
        console.log("could not fetch your messages");
      }
    }
    getMsg();
  };

  return (
    <Wrapper>
      {messages.length === 0 && (
        <div className="no-msg">
          <span>You have no messages with {currentChat.username}</span>
          <small>Begin a chat by typing into the text box</small>
        </div>
      )}
      <div className="msgs">
        {messages.map((msg, i) => {
          return (
            <div key={uuidv4()} ref={scrollRef}>
              {msg.user1 || msg.user2 === currentChat._id ? (
                <div
                  className={`message ${msg.fromUser ? "sent" : "received"}`}
                >
                  <div className="content">
                    <p>{msg.message}</p>
                    <small>{new Date(msg.time).toLocaleTimeString()}</small>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
        <div className="refresh">
          <p>refresh msgs</p>
          <BsCircleFill onClick={() => refreshMsgs()} />
        </div>
      </div>
      {/* <div className="msgs"></div> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2rem;
  height: 75%;
  /* &::-webkit-scroll-bar { */
  /* } */
  .no-msg {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      color: #ccc;
      font-size: 14px;
      padding-bottom: 0.3rem;
    }
    small {
      color: yellow;
      font-size: 13px;
    }
  }
  .msgs {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    overflow: auto;
    &::-webkit-scroll-bar {
      width: 0.7rem;
      border-radius: 0.5rem;
      background: #fff;
      &-thumb {
        background: #ddd;
        border-radius: 0.5rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.6rem 1rem;
        font-size: 1rem;
        border-radius: 5px;
        color: #d1d1d1;
        small {
          color: yellow;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background: #080420;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background: #ff43cb11;
      }
    }
    .refresh {
      color: #ccc;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      p {
        font-size: 13px;
        color: lightgreen;
      }
      svg {
        animation: rotation infinite 3s linear;
      }
      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    }
  }
`;

export default MessageDisplay;
