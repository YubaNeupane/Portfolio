import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import firebase from '../../Firebase/config/Fire';

export default function AddProject(props) {
  const [open, setOpen] = React.useState(false);

  const [projectDetails, setProjectDetails] = useState({
    name: props.name,
    description: props.description,
    liveDemoLink: props.liveDemoLink,
    gitHubLink: props.gitHubLink,
    techUsed: props.techUsed,
    thumbnail: props.thumbnail,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [mar, setMar] = useState(
    window.matchMedia('(min-width: 300px)') ? '45%' : '25%'
  );

  const handleNameChange = (value) => {
    const temp = { ...projectDetails };
    temp.name = value;
    setProjectDetails(temp);
  };
  const handleDescriptionChange = (value) => {
    const temp = { ...projectDetails };
    temp.description = value;
    setProjectDetails(temp);
  };
  const handleLiveDemoLinkChange = (value) => {
    const temp = { ...projectDetails };
    temp.liveDemoLink = value;
    setProjectDetails(temp);
  };
  const handleGitHubLinkChange = (value) => {
    const temp = { ...projectDetails };
    temp.gitHubLink = value;
    setProjectDetails(temp);
  };
  const handleTechUsedChange = (value) => {
    const temp = { ...projectDetails };
    temp.techUsed = value;
    setProjectDetails(temp);
  };
  const handleThumbnailChange = (value) => {
    const temp = { ...projectDetails };
    temp.thumbnail = value;
    setProjectDetails(temp);
  };

  const hitCancle = () => {
    setProjectDetails({
      name: props.name,
      description: props.description,
      liveDemoLink: props.liveDemoLink,
      gitHubLink: props.gitHubLink,
      techUsed: props.techUsed,
      thumbnail: props.thumbnail,
    });
    handleClose();
  };

  const hitSave = () => {
    var docRef = firebase.firestore().collection('projects').doc('projects');
    let temp;

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          temp = [...doc.data().projects];
          console.log(temp);
          temp[props.index] = projectDetails;
          firebase
            .firestore()
            .collection('projects')
            .doc('projects')
            .set({ projects: temp })
            .then(function () {
              console.log('Document successfully written!');
              props.getData();
            })
            .catch(function (error) {
              console.error('Error writing document: ', error);
            });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });

    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">EDIT PROJECT</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            value={projectDetails.name}
            onChange={(e) => handleNameChange(e.target.value)}
            fullWidth
          />
          <TextField
            multiline
            margin="dense"
            label="Description"
            onChange={(e) => handleDescriptionChange(e.target.value)}
            value={projectDetails.description}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Live Demo"
            type="text"
            fullWidth
            onChange={(e) => handleLiveDemoLinkChange(e.target.value)}
            value={projectDetails.liveDemoLink}
          />
          <TextField
            margin="dense"
            label="Github"
            type="text"
            fullWidth
            onChange={(e) => handleGitHubLinkChange(e.target.value)}
            value={projectDetails.gitHubLink}
          />
          <TextField
            margin="dense"
            label="Technology Used"
            type="text"
            onChange={(e) => handleTechUsedChange(e.target.value)}
            value={projectDetails.techUsed}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Thumbnail"
            type="text"
            fullWidth
            onChange={(e) => handleThumbnailChange(e.target.value)}
            value={projectDetails.thumbnail}
          />
          <br></br>
          <br></br>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ margin: 5 }}
            variant="contained"
            color="secondary"
            startIcon={<CloseIcon />}
            onClick={hitCancle}
          >
            Cancel
          </Button>

          <Button
            style={{ margin: 5 }}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={hitSave}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
