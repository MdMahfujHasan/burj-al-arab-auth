import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCQlkhOIbJw8kk21lJ0a_0beekG04Gp6uk",
    authDomain: "burj-al-arab-c.firebaseapp.com",
    projectId: "burj-al-arab-c",
    storageBucket: "burj-al-arab-c.appspot.com",
    messagingSenderId: "475999041439",
    appId: "1:475999041439:web:c603d43b7470dbf02a2faa"
};

const app = initializeApp(firebaseConfig);

export default app;