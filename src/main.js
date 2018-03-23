import $ from 'jquery';
import '../css/styles.css';
function apiCaller(selector, name, specialization){
  var api_key = process.env.API_KEY;
  var url;
  var method = 'GET';

  if(selector == 0){
    let newNameArr = name.split(" ");
    let inputString = "";
    for(var i =0 ; i < newNameArr.length; i ++){
      inputString = newNameArr[i] + "%20";
    }
    console.log(inputString);

    url = 'https://api.betterdoctor.com/2016-03-01/doctors?name='+inputString+'&specialty_uid=' + specialization + '&location=45.5231%2C%20122.6765%2C%20100&sort=rating-asc&skip=0&limit=100&user_key=' + api_key;
  } else if(selector == 2){
    //Return all specialities to dynamically create
    url = "https://api.betterdoctor.com/2016-03-01/specialties?limit=100&user_key=" + api_key;
  } else {
    //Find 100 doctors in portland
    url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=45.5231%2C%20122.6765%2C%20100&sort=rating-asc&skip=0&limit=100&user_key=' + api_key;
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
      generateResults(data.data);
    } else if(selector == 2){
      generateSpecialityDropDown(data.data);
    }
    if(data.stat == 'ok') {
      console.log("data.stat = ok");
      console.log(data);
    } else {
      console.log(data.message);
    }
  };
  xhr.send();
}
function generateResults(inputResultList){
  $("#results").text("");
  $("#results").append("<div class='alert alert-success' role ='alert'>Your Results:</div>");
  for(var i = 0; i < inputResultList.length; i ++){
    $("#results").append("")

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
// function generateResults(inputResults){
//   $("#photos").append("<h2> User Id: "+inputResults[0].owner+"</h2>");
//   for(var i = 0 ; i < inputResults.length; i ++){
//     $("#photos").append("<div class='col-md-2'><h4><a href='" + inputResults[i].url_q + "'>" + inputResults[i].title + "</a><img src='"+inputResults[i].url_q + "'></div>");
//   }
// }
$(document).ready(function() {
  $("#generateSpecialities").click(function(){
    apiCaller(2, "", "");
  })
  $("form#newUser").submit(function(event) {
    event.preventDefault();
    let name = $("#name").val()
    let specialization = $("#specialityUnordered").val();
    console.log(name = ", " + specialization);
    apiCaller(0, name, specialization)


  });
});
