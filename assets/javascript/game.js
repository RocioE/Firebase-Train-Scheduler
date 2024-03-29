$(document).ready(function () {  //MUST have ready function first to start//
 // Create a variable to reference the database
  var trainName = "";
  var destination = "";
  var firstTrainTime= 0;
  var frequency = 0;

  var firebaseConfig = {//api key databas, all below retrieved from firebase//
    apiKey: "AIzaSyDEi_Kxrn1bvpxBCaRiDltzKJyL9mVg5mY",
    authDomain: "fir-train-scheduler-c6205.firebaseapp.com",
    databaseURL: "https://fir-train-scheduler-c6205.firebaseio.com",
    projectId: "fir-train-scheduler-c6205",
    storageBucket: "",
    messagingSenderId: "3759285447",
    appId: "1:3759285447:web:77f160a94d2a8464"
  };

  // Initialize Firebase//
  firebase.initializeApp(firebaseConfig);

  //Declaring the current REAL time//
  var currentTime = moment().format();
  var database = firebase.database();


  //Logging the current time in REAL time//
  console.log("Current Time: " + currentTime);

  //When the SUBMIT button is clicked, then snapshot function below will run//
  $("#submit").on("click", function () {
    event.preventDefault()

    //.val().trim(); returns a string into each text box//
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#firstTrainTime-input").val().trim();
    frequency = $("#nextArrival-input").val().trim();

    // Code for handling the push into firebase,//
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
     // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // Firebase watcher .on("child_added" specific location in your Database You can reference the root or child location in your Database by calling it//
    

  })

  // Grabbed values from text boxes//

  database.ref().on("child_added", function (snapshot) {
    //var child = snapshot.val().frequency;
    //console.log(child);

      ///format moment js NOW is in REAL time, need variables for NOW.
      //Used by Moment.js and date-fns/format. Similar to Java SimpleDateFormat. using time as hh:mm //
    var nowTimeAll = moment().format('HH:mm')
    var nowTimeH = moment().format('HH')
    var nowTimeM = moment().format('mm')
    //saves time// 
    var startTime = snapshot.val().firstTrainTime
    var frequencyTime = snapshot.val().frequency

   
    var momentStartTimeObj = moment(startTime, 'HH:mm')
    var startTimeHours = momentStartTimeObj.format('HH')
    var startTimeMinutes = momentStartTimeObj.format('mm')
    
    var hoursAway =moment(startTime,"hours").diff(moment(nowTimeAll,"hours"),"hours") //calculates min/time, doing 60mins for 1hr
    var minutesAway =moment(startTime,":minutes").diff(moment(nowTimeAll,":minutes"),"minutes")
     //console.log(hoursAway)
    if(hoursAway>0 )
     {
         var now= startTime
         nowHour = moment(now, 'hh:mm').format('hh')
         convertNowHourToMinutes = nowHour*60  //when user inputs mins it will convert hr to mins dif from now//
         nowMinute =  moment(now, 'hh:mm').format('mm')
         var minutesAway = convertNowHourToMinutes+nowMinute
     }
     else{
         var now= moment(nowTimeAll, "HH:mm").add(frequencyTime, "minutes").format('HH:mm')
         nowHour = moment(now, 'hh:mm').format('hh')
         convertNowHourToMinutes = nowHour*60
         nowMinute =  moment(now, 'hh:mm').format('mm')
         var minutesAway = convertNowHourToMinutes+nowMinute
     }
//must APPEND each <td>
    var tableResult =  $("<tr>").append(
      $("<td>").text(snapshot.val().trainName),
      $("<td>").text(snapshot.val().destination),
      $("<td>").text(snapshot.val().frequency),
      $("<td>").text(now),
      $("<td>").text(minutesAway)

    )
   
    $(".table tbody").append(tableResult);
   


    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });////

})