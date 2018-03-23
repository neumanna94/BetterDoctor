import $ from 'jquery';
import '../css/styles.css';
function loadPhotos(inputUserId){
  // var api_key = process.env.API_KEY;
  var api_key = tester1;
  var method = 'GET';

  var url =
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
function generatePhotos(inputListOfPhotos){
  $("#photos").append("<h2> User Id: "+inputListOfPhotos[0].owner+"</h2>");
  for(var i = 0 ; i < inputListOfPhotos.length; i ++){
    $("#photos").append("<div class='col-md-2'><h4><a href='" + inputListOfPhotos[i].url_q + "'>" + inputListOfPhotos[i].title + "</a><img src='"+inputListOfPhotos[i].url_q + "'></div>");
  }
}
$(document).ready(function() {
  $("form#newUser").submit(function(event) {
    event.preventDefault();

    let newUser = $("#id").val();
    loadPhotos(newUser);
  });
});
