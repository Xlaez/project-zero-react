import React from "react";
import { BsEmojiSmileUpsideDownFill } from "react-icons/bs";
import styled from "styled-components";
import MessageField from "./MessageField/MessageField";
import GroupsBody from "./MessengerGroup/GroupsBody";
import MessengerHead from "./MessengerHead";
import About from "./MessengerMenu/About";
import Changes from "./MessengerMenu/Changes";
import MakeGroup from "./MessengerMenu/MakeGroup";
import Menu from "./MessengerMenu/Menu";
import MessengerProfile from "./MessengerProfile";
import MessengerSetProfile from "./MessengerSetProfile";
// import MessengerMenu from "./Utils/MessengerMenu";

export default function MessengerBody({
  setCurrentTab,
  currentTab,
  user,
  currentChat,
  socket,
  users,
  messengerMode,
}) {
  return (
    <Container>
      <MessengerHead setCurrentTab={setCurrentTab} />
      {currentTab === "profile" && (
        <MessengerProfile user={user} setCurrentTab={setCurrentTab} />
      )}
      {currentTab === "set-profile" && (
        <MessengerSetProfile user={user} setCurrentTab={setCurrentTab} />
      )}
      {currentTab === "send" && (
        <MessageField
          currentChat={currentChat}
          user={user}
          socket={socket}
          messengerMode={messengerMode}
          currentTab={currentTab}
        />
      )}
      {/* {currentTab === "menu-items" && (
        <MessengerMenu user={user} users={users} />
      )} */}
      {currentTab === null && (
        <div className={`default ${messengerMode ? "light-default" : ""}`}>
          <h2>Welcome {user.username}</h2>
          <p>Click On a friend to begin a chat</p>
          <div className={`svg ${messengerMode ? "light-svg" : ""}`}>
            <BsEmojiSmileUpsideDownFill />
          </div>
        </div>
      )}
      {currentTab === "chat-image" && (
        <div className="chat-profile">
          <h2 className={` ${messengerMode ? "light-mode" : "dark-mode"}`}>
            Its still a working progress
          </h2>
        </div>
      )}
      {currentTab === "menu-items" && (
        <Menu users={users} user={user} setCurrentTab={setCurrentTab} />
      )}
      {currentTab === "profile-change" && (
        <Changes setCurrentTab={setCurrentTab} user={user} />
      )}
      {currentTab === "about" && <About />}
      {currentTab === "make-group" && (
        <MakeGroup user={user} users={users} setCurrentTab={setCurrentTab} />
      )}
      {currentTab === "groups-list" && (
        <GroupsBody user={user} socket={socket} />
      )}
    </Container>
  );
}

const Container = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  .light-default {
    h2 {
      color: #131324 !important;
    }
    .svg {
      color: #131324 !important;
    }
  }
  .default {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 1.3rem;

    h2 {
      text-transform: capitalize;
      padding: 1rem;
      font-size: 2rem;
      color: #00000076;
    }
    p {
      color: #ccc;
      font-size: 1.2rem;
      text-transform: capitalize;
      padding-bottom: 1rem;
    }
    .svg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      svg {
        font-size: 12rem;
      }
    }
  }
`;
