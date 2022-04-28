import React, { useState, useEffect, useRef } from "react";
import { apiHost } from "../../../Utils/Api";
import styled from "styled-components";
import { BsMenuDown } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import GroupsInput from "./GroupsInput";
import { api } from "../../../Utils/Api";

export default function GroupsBody({ socket, user }) {
  //   const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivedMsg, setArrivedMsg] = useState(null);
  const [group, setGroup] = useState([]);
  const [currentState, changeState] = useState(null);
  const [admin, setAdmin] = useState({
    id: "",
    name: "",
  });

  var headers = {
    Authorization: localStorage.getItem("x-access-token"),
    userAccess: localStorage.getItem("x-access-user"),
  };

  if (currentState === null) {
    console.log("error");
  }

  useEffect(() => {
    const newBody = new FormData();
    newBody.append("from", user._id);
    newBody.append("to", admin._id);
    async function getMsg() {
      var req = await fetch(`${api}api/chat/groups/msgs/get`, {
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
  }, [admin]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-msg", (msg) => {
        setArrivedMsg({
          fromUser: false,
          message: msg,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivedMsg && setMessages((prev) => [...prev, arrivedMsg]);
  }, [arrivedMsg]);

  useEffect(() => {
    (async function () {
      var req = await fetch(`${apiHost}/chat/groups/${headers.userAccess}`, {
        method: "GET",
        headers,
      });
      var res = await req.json();
      if (req.ok) {
        setGroup(res.data.groups);
        setAdmin({ id: res.data.admin._id, name: res.data.admin.username });
      } else {
        alert("An error occured try again.");
      }
    })();
  }, []);
  const handleSendMsg = async (msg) => {
    var body = new FormData();
    body.append("from", headers.userAccess);
    body.append("to", admin._id);
    body.append("message", msg);

    var req = await fetch(`${api}api/chat/groups/msg`, {
      method: "POST",
      headers,
      body,
    });
    socket.current.emit("send-msg", {
      to: admin._id,
      from: user._id,
      messages: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromUser: true, message: msg });
    setMessages(msgs);
    if (!req.ok) {
      alert("couldn't send message");
    }
  };

  return (
    <Wrapper>
      {group.length === 0 && <p>There are no groups yet, create one </p>}
      {group.length !== 0 && (
        <div className="body">
          <div className="header">
            <div className="name">
              <h2>{group.name}</h2>
              <p>Description: {group.description}</p>
            </div>
            <div className="menu">
              <BsMenuDown onClick={() => changeState("admin-place")} />
            </div>
          </div>
          <div className="msgss">
            {messages.length === 0 && (
              <div className="no-msg">
                <span>You have no messages with {group.name}</span>
                <small>Begin a chat by typing into the text box</small>
              </div>
            )}
            <div className="msgs">
              {messages.map((msg, i) => {
                return (
                  <div key={uuidv4()}>
                    <div
                      className={`message ${
                        msg.fromUser ? "sent" : "received"
                      }`}
                    >
                      <div className="content">
                        <p>{msg.message}</p>
                        <small>{new Date(msg.time).toTimeString()}</small>
                      </div>
                    </div>
                    ) : ( ""
                  </div>
                );
              })}
            </div>
          </div>
          <GroupsInput handleSendMsg={handleSendMsg} className="input" />
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  .input {
    height: 20%;
  }
  .msgss {
    height: 70%;
    max-height: 70%;
    overflow-y: auto;
    &::-webkit-scroll-bar {
      width: 0.5rem;
      border-radius: 0.5rem;
      background: #fff;
      &-thumb {
        border-radius: 0.5rem;
        background: #080142;
        width: 0.5rem;
      }
    }
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
          background: #9900ff20;
        }
      }
    }
  }
  .body {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
  }
  .header {
    height: 10%;
    background: #080412;
    border-bottom: 1px solid #131324;
    padding: 0.3px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .name {
      display: flex;
      justify-content: center;
      padding-left: 1rem;
      gap: 1.5rem;
      align-items: center;
      color: yellow;
      h2 {
        font-size: 1rem;
      }
    }
    .menu {
      padding: 0.5rem;
      margin-right: 2rem;
      border-radius: 3px;
      background: #131324;
      svg {
        color: yellow;
        font-size: 1.2rem;
      }
    }
  }
`;
