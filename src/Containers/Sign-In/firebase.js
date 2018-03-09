import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD33GZXrMjubd5i5tKMgdQjCIwmOvxe0u4',
  authDomain: 'rideshare-fe2b7.firebaseapp.com',
  databaseURL: 'https://rideshare-fe2b7.firebaseio.com',
  projectId: 'rideshare-fe2b7',
  storageBucket: 'rideshare-fe2b7.appspot.com',
  messagingSenderId: '845674272736'
};
firebase.initializeApp(config);
export default firebase;
