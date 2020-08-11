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
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

export default function AddProject(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [mar, setMar] = useState(
    window.matchMedia('(min-width: 300px)') ? '45%' : '25%'
  );

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
            fullWidth
          />
          <TextField
            multiline
            margin="dense"
            label="Description"
            type="text"
            fullWidth
          />
          <TextField margin="dense" label="Live Demo" type="text" fullWidth />
          <TextField margin="dense" label="Github" type="text" fullWidth />
          <TextField
            margin="dense"
            label="Technology Used"
            type="text"
            fullWidth
          />
          <TextField margin="dense" label="Thumbnail" type="text" fullWidth />
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
            startIcon={<SaveIcon />}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
