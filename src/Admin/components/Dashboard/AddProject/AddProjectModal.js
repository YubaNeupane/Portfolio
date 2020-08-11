import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import firebase from '../../../Firebase/config/Fire';

export default function AddProject(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProject = () => {
    const data = props.projectDetails;
    data.id = (Math.random() * 500000).toString();
    data.timestamp = new Date().toISOString();
    var docRef = firebase.firestore().collection('projects').doc('projects');

    props.clear();

    let tempData = [];

    if (
      data.name !== '' &&
      data.description !== '' &&
      data.gitHubLink !== '' &&
      data.techUsed !== ''
    ) {
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            tempData = [...doc.data().projects];
            tempData.push(data);
            console.log(tempData);
          } else {
            console.log('No such document!');
          }
        })
        .then(() => {
          const sorted = tempData.sort(function (a, b) {
            return new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1;
          });
          var setWithMerge = docRef.set({
            projects: sorted,
          });
        })
        .then(() => {
          handleClose();
          props.refresh();
        });
    }
  };

  const [mar, setMar] = useState(
    window.matchMedia('(min-width: 300px)') ? '45%' : '25%'
  );

  return (
    <div>
      <Button
        style={{
          marginTop: 15,
          marginLeft: mar,
        }}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ADD NEW PROJECT</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            onChange={(e) => props.handleNameChange(e.target.value)}
            value={props.projectDetails.name}
            fullWidth
          />
          <TextField
            multiline
            margin="dense"
            label="Description"
            type="text"
            onChange={(e) => props.handleChangeDescription(e.target.value)}
            value={props.projectDetails.description}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Live Demo"
            type="text"
            onChange={(e) => props.handleChangeLiveDemo(e.target.value)}
            value={props.projectDetails.liveDemoLink}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Github"
            type="text"
            onChange={(e) => props.handleChangeGitHub(e.target.value)}
            value={props.projectDetails.gitHubLink}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Technology Used"
            type="text"
            onChange={(e) => props.handleChangeTechnology(e.target.value)}
            value={props.projectDetails.techUsed}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Thumbnail"
            type="text"
            onChange={(e) => props.handleThubnailChange(e.target.value)}
            value={props.projectDetails.thubnail}
            fullWidth
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
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            style={{ margin: 5 }}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddProject}
          >
            Add Project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
