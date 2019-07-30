$(document).ready(function () {

  var trainName = "";
  var destination = "";
  var frequency = 0;
  var nextArrival = 0;
  var minsAway = 0;

  // Create a variable to reference the database

  var firebaseConfig = {
    apiKey: "AIzaSyDEi_Kxrn1bvpxBCaRiDltzKJyL9mVg5mY",
    authDomain: "fir-train-scheduler-c6205.firebaseapp.com",
    databaseURL: "https://fir-train-scheduler-c6205.firebaseio.com",
    projectId: "fir-train-scheduler-c6205",
    storageBucket: "",
    messagingSenderId: "3759285447",
    appId: "1:3759285447:web:77f160a94d2a8464"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Declaring the current REAL time//
  var currentTime = moment().format();
  var database = firebase.database();


  //Logging the current time
  console.log("Current Time: " + currentTime);

  //When the button is clicked, the snapshot function below will run. 
  $("#submit").on("click", function () {
    event.preventDefault()

    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    nextArrival = $("#nextArrival-input").val().trim();
    minsAway = $("#minsaway-input").val().trim();

    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      nextArrival: nextArrival,
      minsAway: minsAway,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // Firebase watcher .on("child_added" specific location in your Database You can reference the root or child location in your Database by calling it//
    database.ref().on("child_added", function (snapshot) {
      var child = snapshot.val();
      console.log(child);

      // Log everything that's coming out of snapshot
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destinatiion);
      console.log(snapshot.val().frequency);
      console.log(snapshot.val().nextArrival);
      console.log(snapshot.val().minsAway);

      // Change the HTML to reflect
      $("#trainName-display").text(snapshot.val().trainName);
      $("#destination-display").text(snapshot.val().destinatiion);
      $("#frequency-display").text(snapshot.val().frequency);
      $("#nextArrival-display").text(snapshot.val().nextArrival);
      $("#minsAway-display").text(snapshot.val().minsAway);


      // var table = $("<tr class = 'table'>");
      $("#table").append(table);
      table.append("<td>" + child.dataTrainName + "</td>");
      table.append("<td>" + child.dataDestination + "</td>");
      table.append("<td>" + child.dataFrequency + "</td>");
      table.append("<td>" + child.dataNextArrival + "</td>");
      table.append("<td>" + child.dataMinsAway + "</td>");


      // Handle the errors
    }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });////

  })

  // Grabbed values from text boxes//



})