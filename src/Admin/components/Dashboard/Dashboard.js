import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import fire from '../../Firebase/config/Fire';
import AddProject from './AddProject/AddProjectModal';

import { makeStyles } from '@material-ui/core/styles';
import Card from '../Card/Card';
import Grid from '@material-ui/core/Grid';
import firebase from '../../Firebase/config/Fire';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard() {
  const [addProjectDetails, setAddProjectDetails] = useState({
    name: '',
    description: '',
    liveDemoLink: '',
    gitHubLink: '',
    techUsed: '',
    thumbnail: null,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const docRef = firebase.firestore().collection('projects').doc('projects');
    docRef.get().then(function (doc) {
      if (doc.exists) {
        const tempData = [...doc.data().projects];

        setData(tempData);
      } else {
        console.log('No such document!');
      }
    });
  };

  const handleChangeName = (value) => {
    const temp = { ...addProjectDetails };
    temp.name = value;
    setAddProjectDetails(temp);
  };

  const handleChangeDescription = (value) => {
    const temp = { ...addProjectDetails };
    temp.description = value;
    setAddProjectDetails(temp);
  };

  const handleChangeLiveDemo = (value) => {
    const temp = { ...addProjectDetails };
    temp.liveDemoLink = value;
    setAddProjectDetails(temp);
  };

  const handleChangeGitHub = (value) => {
    const temp = { ...addProjectDetails };
    temp.gitHubLink = value;
    setAddProjectDetails(temp);
  };

  const handleChangeTechnology = (value) => {
    const temp = { ...addProjectDetails };
    temp.techUsed = value;
    setAddProjectDetails(temp);
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const handleClear = () => {
    const data = {
      name: '',
      description: '',
      liveDemoLink: '',
      gitHubLink: '',
      techUsed: '',
      thumbnail: null,
    };
    setAddProjectDetails(data);
  };

  const handleThubnailChange = (value) => {
    const temp = { ...addProjectDetails };
    temp.thumbnail = value;
    setAddProjectDetails(temp);
  };

  const handleRemove = (index) => {
    var docRef = firebase.firestore().collection('projects').doc('projects');
    if (data.length === 1) {
      document.location.reload(true);
    }

    const temp = [...data];
    temp.splice(index, 1);
    console.log(temp);

    const sorted = temp.sort(function (a, b) {
      return new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1;
    });
    var setWithMerge = docRef
      .set({
        projects: sorted,
      })
      .then(() => {
        getData();
      });
  };

  const classes = useStyles();

  console.log(data);
  return (
    <div style={{ justifyItems: 'center', alignSelf: 'center' }}>
      <Navbar logout={handleLogout} />
      <AddProject
        projectDetails={addProjectDetails}
        handleNameChange={handleChangeName}
        handleChangeDescription={handleChangeDescription}
        handleChangeLiveDemo={handleChangeLiveDemo}
        handleChangeGitHub={handleChangeGitHub}
        handleChangeTechnology={handleChangeTechnology}
        handleThubnailChange={handleThubnailChange}
        refresh={getData}
        clear={handleClear}
      />
      <div
        className={classes.root}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          justifyItems: 'center',
          padding: 20,
          marginTop: 25,
        }}
      >
        <Grid container spacing={5}>
          {data.length > 0
            ? data.map((p, index) => (
                <Grid
                  item
                  xs={window.matchMedia('(min-width: 768px)').matches ? 4 : 12}
                  key={p.id}
                >
                  <Card
                    name={p.name}
                    time={p.timestamp}
                    description={p.description}
                    index={index}
                    handleRemove={handleRemove}
                    thubnail={p.thumbnail}
                  ></Card>
                </Grid>
              ))
            : null}
        </Grid>
      </div>
    </div>
  );
}
