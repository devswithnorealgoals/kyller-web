const firebase = require('firebase')
// const firebaseConfig = require('../serviceAccountKey.json')
firebase.initializeApp({
    "apiKey": process.env.apiKey || process.env.VUE_APP_apiKey,
    "authDomain": process.env.authDomain || process.env.VUE_APP_authDomain,
    "databaseURL": process.env.databaseURL || process.env.VUE_APP_databaseURL,
    "projectId": process.env.projectId || process.env.VUE_APP_projectId,
    "storageBucket": process.env.storageBucket || process.env.VUE_APP_storageBucket,
    "messagingSenderId": process.env.messagingSenderId || process.env.VUE_APP_messagingSenderId,
    "appId": process.env.appId || process.env.VUE_APP_appId
})
const firestore = firebase.firestore();

const csvFilePath = __dirname + '/missions.csv'
const csv = require('csvtojson')

csv()
    .fromFile(csvFilePath)
    .then(function (jsonObj) {
        const settings = { timestampsInSnapshots: true };
        firestore.settings(settings);
        for (mission of jsonObj) {
            firestore.collection('missions').doc().set(mission).then((res) => {
                console.log("Document  successfully written!");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
    }, function (err) {
        console.log(err)
    })