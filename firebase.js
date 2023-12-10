const firebaseConfig = {
    apiKey: "AIzaSyCF9L8zKyuaiKKw8NJjO5OtjYDHRFzoS8w",
    authDomain: "yt15-years.firebaseapp.com",
    projectId: "yt15-years",
    storageBucket: "yt15-years.appspot.com",
    messagingSenderId: "871546231790",
    appId: "1:871546231790:web:9f1bda686199cac2e28cff",
    measurementId: "G-EWN7017JHN"
  }
  const firebaseLib = window.firebase.initializeApp(firebaseConfig)
  // const app = firebase.initializeApp(firebaseConfig);
  const analytics = firebaseLib.analytics();
  

 const gaEvent = (eventName, category) => {
    analytics.logEvent(eventName, {name: category})
 }


 window.analyticsLog = gaEvent;