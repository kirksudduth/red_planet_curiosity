import React, { useState } from "react";
import {
  Message,
  Header,
  Form,
  Grid,
  Button,
  Card,
  Image,
  Icon,
  Modal,
  Input,
} from "semantic-ui-react";
import DataManager from "../../modules/DataManager";

const PhotoSearchForm = (props) => {
  const postSavedPhoto = DataManager.postSavedPhoto;
  const roverPhotos = props.roverPhotos.photos;
  const getRoverPhotos = props.getRoverPhotos;
  const handleRadioChange = props.handleRadioChange;
  const handleDateFieldChange = props.handleDateFieldChange;
  const date = props.date;
  const camValue = props.camera;
  const [cameras, setCameras] = useState([]);
  const [savedPhoto, setSavedPhoto] = useState({
    userId: "",
    comment: "",
    date: "",
    camera: "",
    url: "",
  });
  const userId = JSON.parse(sessionStorage.credentials);

  const makePhotoWithComment = (obj) => {
    const stateToChange = { ...savedPhoto };
    stateToChange.date = obj.earth_date;
    stateToChange.camera = obj.camera.name;
    stateToChange.userId = userId;
    stateToChange.url = obj.img_src;
    setSavedPhoto(stateToChange);
    debugger;
    DataManager.postSavedPhoto(stateToChange);
    // .then(handleClose);
  };

  const handleFieldChange = (evt) => {
    const stateToChange = { ...savedPhoto };
    evt.persist();
    stateToChange.comment = evt.target.value;
    setSavedPhoto(stateToChange);
  };

  // const [modalWindow, setModalWindow] = useState({ open: false });
  // const handleOpen = () => {
  //   const stateToChange = { ...modalWindow };
  //   stateToChange.open = true;
  //   setModalWindow(stateToChange);
  // };

  // const handleClose = () => {
  //   const stateToChange = { ...modalWindow };
  //   stateToChange.open = false;
  //   setModalWindow(stateToChange);
  // };

  const modalsRule = (obj) => (
    <Modal
      trigger={
        <Icon
          // onClick={handleOpen}
          name="eye"
        />
      }
      closeIcon
    >
      <Header content="BIG  PHOTO" />
      <Modal.Content>
        <Image size="large" src={obj.img_src} />
      </Modal.Content>
      <Modal.Actions>
        <Form type="submit">
          <Input
            label="Comment: "
            id="comment"
            fluid
            onChange={handleFieldChange}
            type="text area"
            style={{ marginBottom: 10 }}
          />
          <Button
            icon="save outline"
            onClick={() => makePhotoWithComment(obj)}
            content="Save Photo"
          />
        </Form>
      </Modal.Actions>
    </Modal>
  );

  const getCameras = (date) => {
    DataManager.getManifest(date).then((obj) => {
      const camerasArray = obj.cameras;
      setCameras(camerasArray);
    });
  };

  return (
    <>
      <Grid verticalAlign="middle">
        <Grid.Column width={4}>
          <Header
            textAlign="center"
            content="Search Curiosity's Photos by Date and Camera Type"
            as="h5"
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Form size="tiny">
            <Form.Group grouped widths="equal">
              <Form.Field
                label="Date:"
                control="input"
                id="date"
                type="date"
                min="2012-08-06"
                onChange={handleDateFieldChange}
              />
              <Form.Field>
                <Button
                  fluid
                  size="tiny"
                  onClick={() => {
                    if (date.date === "") {
                      window.alert("Please enter date.");
                    } else {
                      getCameras(date);
                    }
                  }}
                  value="date"
                >
                  Get Cameras
                </Button>
              </Form.Field>
            </Form.Group>
            <Form.Group grouped>
              <label>Camera Type:</label>
              {cameras.map((camera) => (
                <Form.Radio
                  key={camera}
                  label={camera}
                  value={camera}
                  checked={camValue.value === `${camera}`}
                  onChange={handleRadioChange}
                />
              ))}
            </Form.Group>
            <Button
              size="tiny"
              onClick={() => {
                if (date.date === "" || camValue.value === "") {
                  window.alert("Please enter date and camera");
                } else {
                  getRoverPhotos(date.date, camValue.value);
                }
              }}
              fluid
            >
              Get Photos
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={4}>
          <Message style={{ align: "center" }}>
            Want to see the latest photos Curiosity has taken?{" "}
            <a href="/latest_photos">Click Here!</a>
          </Message>
        </Grid.Column>
        <Grid.Row>
          {!roverPhotos
            ? []
            : roverPhotos.map((photo) => (
                <Grid.Column key={photo.id} width={4}>
                  <Card style={{ marginBottom: 5 }} raised key={photo.id}>
                    <Card.Content>
                      <Image size="tiny" floated="right" src={photo.img_src} />
                      <Card.Meta>Camera: {photo.camera.full_name}</Card.Meta>
                      <Card.Meta>Date: {photo.earth_date}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>{modalsRule(photo)}</Card.Content>
                  </Card>
                </Grid.Column>
              ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default PhotoSearchForm;
