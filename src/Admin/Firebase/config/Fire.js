import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCOpnCWL32rpC-neh-CpCEyebFzp4FTS2w',
  authDomain: 'socialape-78799.firebaseapp.com',
  databaseURL: 'https://socialape-78799.firebaseio.com',
  projectId: 'socialape-78799',
  storageBucket: 'socialape-78799.appspot.com',
  messagingSenderId: '921191402366',
  appId: '1:921191402366:web:54da4d5c11046e21e5812f',
  measurementId: 'G-VH5CVDJGHT',
};

const fire = firebase.initializeApp(config);
export default fire;
