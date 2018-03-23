import $ from 'jquery';
import '../css/styles.css';
function apiCaller(selector, name, specialization){
  var api_key = process.env.API_KEY; //Change this API-KEY
  var url;
  var method = 'GET';
  console.log("Selector" + selector);
  if(selector == 0){
    url = 'https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=' + specialization + '&location=or-portland&skip=0&limit=100&user_key=' + api_key;
  } else if(selector == 2){
    //Return all specialities to dynamically create
    url = "https://api.betterdoctor.com/2016-03-01/specialties?limit=100&user_key=" + api_key;
  } else if(selector == 3){
    //Find 100 doctors in portland
    url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&skip=0&limit=100&user_key=' + api_key;
  } else if(selector == 4){
    url = 'https://api.betterdoctor.com/2016-03-01/doctors?last_name=' + name + '&specialty_uid=' + specialization + '&location=or-portland&skip=0&limit=100&user_key=' + api_key;
  }


  console.log(url);
  var xhr = new XMLHttpRequest();
  if(!('withCredentials' in xhr)) {
    console.log("Browser does not support CORS");
    alert('Browser does not support CORS.');
    return;
  }
  xhr.open(method, url);

  xhr.oneerror = function() {
    console.log("oneerror");
    alert('There was an error.');
  };
  xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);
    console.log(data);
    if(selector != 2){
      if(data.data.length == 0){
        generateResults(0, data.data);
      } else {
        generateResults(1,data.data);
      }
    } else if(selector == 2){
      generateSpecialityDropDown(data.data);
    }
    if(data.stat == 'ok') {
      console.log("data.stat = ok");
      console.log(data);
    } else {
      //Alerting to message
      console.log(data.message);
    }
  };
  xhr.send();
}
function generateResults(selector, inputResultList){
  $("#results").text("");
  if(selector == 1){
    $("#results").append("<div class='alert alert-success' role ='alert'>Results</div>");
    for(var i = 0; i < inputResultList.length; i ++){
      $("#results").append("<div class='col-md-2'><h4><strong>Name:</strong> " + inputResultList[i].profile.first_name + " " + inputResultList[i].profile.last_name + "</h4><h4><strong>Phone Number:</strong> " + inputResultList[i].practices[0].phones[0].number + "</h4><h4><strong>Address:</strong> " + inputResultList[i].practices[0].visit_address.city + " " + inputResultList[i].practices[0].visit_address.state + ", " + inputResultList[i].practices[0].visit_address.street + ", " + inputResultList[i].practices[0].visit_address.zip +"</h4><h4> <strong>Website:</strong> did not find in API</h4><h4><strong>Accepting Patients:</strong> " + inputResultList[i].practices[0].accepts_new_patients + "</h4>");
    }
  } else {
    alert("No doctors meet the criteria.");
    $("#results").append("<div class='alert alert-warning' role ='alert'>No results for your Query. Click the button below to generate top 100 doctors in portland</div><button type='button' class='btn medium' id='backupButton'>Find 100 more doctors</button>");
    backupButtonListener();
  }
}
function generateSpecialityDropDown(inputResults){
  console.log("Inside generateFunction" + inputResults +", " + inputResults.length);
  $("#specialityList").text("");
  $("#specialityList").append("<label for='specialityUnordered'>Select a speciality from the list</labe>");
  $("#specialityList").append("<select id='specialityUnordered' class='form-control'>");
  for(var i = 0; i < inputResults.length; i ++){
    $("#specialityUnordered").append("<option value = '" + inputResults[i].uid + "'>" + inputResults[i].name +"</option>");
  }
  $("#specialityList").append("</select>");
}
function backupButtonListener(){
  $("#backupButton").click(function(){
    console.log("I hit the backup button");
    apiCaller(3, "", "");
  });
}

$(document).ready(function() {
  apiCaller(2, "", "");
  $("form#specialized").submit(function(event) {
    event.preventDefault();
    let name = $("#name").val();
    let specialization = $("#specialityUnordered").val();
    console.log(name + ", " + specialization);
    if(name.length == 0){
      apiCaller(0, name, specialization);
    } else {
      apiCaller(4, name, specialization);
    }
  });
});
