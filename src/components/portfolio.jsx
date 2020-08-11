import React, { useState, useEffect } from 'react';

import CardViewer from './Card';

// import issTrackingGif from '../img/issTracking.gif';
// import issTrackingThumbnail from '../img/issTrackingThumbnail.jpg';

// import covid19TrackerGif from '../img/covid19Tracker.gif';
// import covid19TrackerThumbnail from '../img/covid19Tracker.png';

// import movieSearchGif from '../img/movieSearchGif.gif';
// import movieSearchThumbnail from '../img/movieSearch.png';

// import heyHeyGif from '../img/HeyHey.gif';
// import heyHeyThumbnail from '../img/HeyHey.png';

// import lunarLanderThumbnail from '../img/LunarLander.png';
// import lunarLanderGif from '../img/LunarLander.gif';

// import gobalTempChangeThumbnail from '../img/GobalAvgTempChange.png';

// import stormBreaker from '../img/StormBreaker.png';
// import Paper from '@material-ui/core/Paper';

// import botIqLending from '../img/BotsIQLending.png';
// import botIqLendingGif from '../img/botIqLending.gif';

import firebase from './../Admin/Firebase/config/Fire';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

// const projects = [
//   {
//     name: 'HeyHey',
//     thumbnail: heyHeyThumbnail,
//     gif: heyHeyGif,
//     details:
//       'This web application tracks the International Space Station(ISS) location in real time.',
//     gitHub: 'https://github.com/YubaNeupane/SocailApp',
//     liveDemo: '',
//     techUsed: ['React Native', 'Firebase', 'Expo', 'React', 'JavaScript '],
//   },
//   {
//     name: 'BotsIQ Lending Library',
//     thumbnail: botIqLending,
//     gif: botIqLendingGif,
//     details:
//       'This application lets students from participating high schools to request to lend manufacturing products',
//     gitHub: 'https://github.com/YubaNeupane/BotsIQInventory',
//     liveDemo: '',
//     techUsed: ['React', 'JavaScript', 'SCSS', 'HTML'],
//   },
//   {
//     name: 'COVID-19 Tracking',
//     thumbnail: covid19TrackerThumbnail,
//     gif: covid19TrackerGif,
//     details:
//       'This web application visually shows the  the Infected,Recovered,and Deaths from COVID-19 from the world or a picked country',
//     gitHub: 'https://github.com/YubaNeupane/Covid-19-Tracker',
//     liveDemo: 'https://yubaneupane.github.io/Covid-19-Tracker/',
//     techUsed: ['React', 'COVID-19 API', 'HTML', 'Chart.js', 'JavaScript'],
//   },
//   {
//     name: 'Movie Search',
//     thumbnail: movieSearchThumbnail,
//     gif: movieSearchGif,
//     details:
//       'This applications shows the current or past movies with the ratings and the reviews that reviewers have written',
//     gitHub: 'https://github.com/YubaNeupane/Movie-Search',
//     liveDemo: 'https://yubaneupane.github.io/Movie-Search/',
//     techUsed: ['React', 'Movie DB', 'JavaScript'],
//   },
//   {
//     name: 'ISS Tracking',
//     thumbnail: issTrackingThumbnail,
//     gif: issTrackingGif,
//     details:
//       'This web application tracks the International Space Station(ISS) location in real time.',
//     gitHub: 'https://github.com/YubaNeupane/ISS-Tracking',
//     liveDemo: 'https://yubaneupane.github.io/ISS-Tracking/',
//     techUsed: ['P5.js', 'JavaScript', 'CSS', 'HTML'],
//   },
//   {
//     name: 'Lunar Lander',
//     thumbnail: lunarLanderThumbnail,
//     gif: lunarLanderGif,
//     details:
//       'This mini games allows the users to make their own game board and try to navigate through the lunar surface',
//     gitHub: 'https://github.com/YubaNeupane/Lunar-Lander',
//     liveDemo: '',
//     techUsed: ['C++'],
//   },
//   ,
// ];

export default function Portfolio() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const getData = () => {
    const docRef = firebase.firestore().collection('projects').doc('projects');
    docRef.get().then(function (doc) {
      if (doc.exists) {
        const tempData = [...doc.data().projects];

        setData(tempData);
        console.log(tempData);
      } else {
        console.log('No such document!');
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  return (
    <section
      id="work"
      className="portfolio-mf sect-pt4 route"
      style={{ marginTop: '-80px' }}
    >
      <div className="title-box text-center">
        <h3 className="title-a">Portfolio</h3>
        <div className="line-mf"></div>
      </div>
      <div
        className="cardContainer"
        style={{
          marginTop: '-50px',
          flexWrap: 'wrap',
          flex: 1,
          display: 'flex',
          justifyContent: 'space-around',
          alignContent: 'space-evenly',
          flexFlow: 'row wrap',
        }}
      >
        <div className={classes.root}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
            style={{ overflow: 'hidden' }}
          >
            {data.length > 0
              ? data.map((project) => (
                  <Grid item>
                    <CardViewer
                      thumbnail={project.thumbnail}
                      name={project.name}
                      details={project.description}
                      techUsed={project.techUsed}
                      liveDemo={project.liveDemoLink}
                      gitHub={project.gitHubLink}
                    />
                  </Grid>
                ))
              : null}
          </Grid>
        </div>

        {/* {data.length > 0
          ? projects.map((project) => (
              <Card
                key={project.id}
                techUsed={projects[0].techUsed}
                thumbnail={project.thumbnail}
                name={project.name}
                details={project.details}
                gitHub={project.gitHubLink}
                liveDemo={project.liveDemoLink}
              ></Card>
            ))
          : null} */}
      </div>
    </section>
  );
}
