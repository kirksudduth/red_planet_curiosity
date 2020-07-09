import React, { useState } from "react";
import { Menu, Header, Icon, Segment, Label, Image } from "semantic-ui-react";
import { withRouter, NavLink } from "react-router-dom";

const NavBar = (props) => {
  const clearUser = props.clearUser;
  const [activeItem, setActiveItem] = useState({ name: "search" });

  const handleClickEvent = (evt) => {
    evt.persist();
    const stateToChange = { ...activeItem };
    stateToChange.name = evt.target.classList[0];
    setActiveItem(stateToChange);
  };

  const user = JSON.parse(sessionStorage.credentials);

  return (
    <>
      <Segment style={{ background: "#DDBEA6" }} clearing>
        <Header floated="left" as="h1" style={{ color: "white" }}>
          <Image
            src={require("../images/curiositySelfie.png")}
            alt="Curiositan"
            style={{ width: 150, height: 80 }}
            rounded
            // circular
          />
          C U R I O S I T A N
        </Header>
        <Header as="h1" floated="right">
          <Label as="a" color="brown" size="large">
            <Icon name="user circle" />
            {user.username}
          </Label>
        </Header>
      </Segment>
      <Menu color="brown" secondary pointing icon="labeled">
        <NavLink to="/photos_search">
          <Menu.Item
            className="search"
            name="search"
            active={activeItem.name === "search"}
          >
            <Icon name="search" onClick={handleClickEvent} />
            Photo Search
          </Menu.Item>
        </NavLink>
        <NavLink to="/saved_photos">
          <Menu.Item
            name="image"
            className="image"
            active={activeItem.name === "image"}
          >
            <Icon name="image outline" onClick={handleClickEvent} />
            Saved Photos
          </Menu.Item>
        </NavLink>
        <NavLink to="/curiositans">
          <Menu.Item
            name="users"
            className="users"
            active={activeItem.name === "users"}
          >
            <Icon name="users" onClick={handleClickEvent} />
            Curiositans
          </Menu.Item>
        </NavLink>
        <NavLink to="/messages">
          <Menu.Item
            name="envelope"
            className="envelope"
            active={activeItem.name === "envelope"}
          >
            <Icon name="envelope outline" onClick={handleClickEvent} />
            Messages
          </Menu.Item>
        </NavLink>
        <Menu.Menu position="right">
          <Menu.Item onClick={clearUser}>
            <Icon name="sign-out" />
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default withRouter(NavBar);
