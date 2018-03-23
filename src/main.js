import $ from 'jquery';
import '../css/styles.css';
function apiCaller(specialityList, doctorName){
  var api_key = process.env.API_KEY;
  var url;
  var method = 'GET';

  if(specialityList.length == 0){
    url = 'https://api.betterdoctor.com/2016-03-01/doctors?name=Alex%20Neumann&location=45.5231%2C%20122.6765%2C%20100&sort=rating-asc&skip=0&limit=100&user_key=' + api_key;
  } else if(doctorName.length == 0){
    url = "https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=sport-physical-therapist&location=45.5231%2C%20122.6765%2C%20100&sort=rating-asc&skip=0&limit=100&user_key=" + api_key;
  } else {
    //Find doctors in portland
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
    if(data.stat == 'ok') {
      console.log("data.stat = ok");
      var photos = data.photos.photo;
      console.log(photos);
    } else {
      alert(data.message);
    }
  };
  xhr.send();
}
// function generateResults(inputResults){
//   $("#photos").append("<h2> User Id: "+inputResults[0].owner+"</h2>");
//   for(var i = 0 ; i < inputResults.length; i ++){
//     $("#photos").append("<div class='col-md-2'><h4><a href='" + inputResults[i].url_q + "'>" + inputResults[i].title + "</a><img src='"+inputResults[i].url_q + "'></div>");
//   }
// }
$(document).ready(function() {
  $("form#newUser").submit(function(event) {
    event.preventDefault();
    apiCaller("","Alex");

  });
});
