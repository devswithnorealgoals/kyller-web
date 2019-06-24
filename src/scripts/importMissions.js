const firebase = require('firebase')
const firebaseConfig = require('../serviceAccountKey.json')
firebase.initializeApp(firebaseConfig)
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