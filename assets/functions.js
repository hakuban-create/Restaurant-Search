

/* * * * * * * Variables * * * * * * */
var lon="undefined";
var lat="undefined";
var result="undefined";


/* * * * * * * Functions * * * * * * */

function performSearch(htmlDivId,searchArea,zipCode,distance,type){
    var queryUrl;
    

    /*Searching around the user location*/
    if(searchArea=="Current Location"){
        if(lon=="undefined" && lat=="undefined"){
        getUserLocation();
        }
        var interval1=setInterval(function(){
        if(lon!="undefined" && lat!="undefined"){
            clearInterval(interval1);
            queryUrl="https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?lon="+lon+"&&lat="+lat+"&distance="+distance;
            $.ajax(getAjaxSetting(queryUrl)).done(function (response) {
               result=filterResponse(response,type);
               displayResult(htmlDivId,result);
            });
        }
        },500);

    /*Searching by the zipcode*/
    }else{
        queryUrl="https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/"+zipCode;
        $.ajax(getAjaxSetting(queryUrl)).done(function (response) {
            result=filterResponse(response,type);
            displayResult(htmlDivId,result);
        });
    }



}


function getAjaxSetting(queryUrl){
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": queryUrl,
        "method": "GET",
        "headers": {
          "X-RapidAPI-Host": "us-restaurant-menus.p.rapidapi.com",
          "X-RapidAPI-Key": "89f48f102dmsha286536059ab923p14d588jsn048cd5bbda16"
        }
      }
      
    return settings;
}


function getUserLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(location){
            lon=location.coords.longitude;
            lat=location.coords.latitude;
        });
    }else{
        alert("Geolocation is not supported by this browser.");
    }
 }


 function filterResponse(response,type){
    console.log(response);
    var arr=response.result.data;
    var newArr=[];
    if(type!="All"){
     for(i in arr){
         if(arr[i].cuisines.includes(type)){ 
           newArr.push(arr[i]);
         }

      }
      return newArr;
    }
        return arr;
  
}
function displayResult(htmlDivId,result){
    var domEl=document.getElementById(htmlDivId);
    var el=$(domEl);
    el.empty();
    if(result.length==0){
        el.css("color","red");
        el.text("No matching result");
    }else{
        for(i in result){
            var row=$("<div>").attr("class","row container_div");
            var col1=$("<div>").attr("class","col-md-7");
            var col2=$("<div>").attr("class","col-md-3");

            var div1= $("<h4>").attr("class","result").text(result[i].restaurant_name);
            var div2= $("<div>").attr("class","result").text("Address: "+result[i].address.formatted);
            var div3= $("<div>").attr("class","result").text("Cuisines: "+result[i].cuisines.toString());
            var div4= $("<div>").attr("class","result").text("Phone: "+result[i].restaurant_phone);
            var div5= $("<div>").attr("class","result").text("Price Range: "+result[i].price_range);
            var div6= $("<div>").attr("class","result").text("Hours: "+result[i].hours);
            var img=$("<img>").attr("src","assets/images/GoogleMap.jpeg").attr("class","googleImg shadow p-3 mb-5 bg-white rounded");
            var btn1=$("<button>")
                .attr("type","button")
                .attr("id",i)
                .attr("class","direction_btn btn btn-primary")
                .attr("data-toggle","modal")
                .attr("data-target",".bd-example-modal-lg")
                .text("Get Direction");

            col1.append(div1,div2,div3,div4,div5,div5,div6);
            col2.append(img,btn1);
            row.append(col1,col2);
            el.append(row);
        }  
    }  
}
var map;
/* following function displays distance of the restaurant in the model window*/
function displayDistance(indexOfRestaurant){
    var selected=result[indexOfRestaurant];

    if(lon=="undefined" && lat=="undefined"){
        getUserLocation();
        }

      
            var pointA = new google.maps.LatLng(lat, lon),
              pointB = new google.maps.LatLng(selected.geo.lat, selected.geo.lon),
              myOptions = {
                zoom: 10,
                center: pointA
              },
              map = new google.maps.Map(document.getElementById('map'), myOptions),
              // Instantiate a directions service.
              directionsService = new google.maps.DirectionsService();
              directionsDisplay = new google.maps.DirectionsRenderer({
                map: map
              });

            // get route from A to B
            calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

          
        }
          
          function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
            directionsService.route({
              origin: pointA,
              destination: pointB,
              travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                $("#duration_status").html(response.routes[0].legs[0].duration.text);
                $("#distance_status").html(response.routes[0].legs[0].distance.text);
              if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
          }
          


        // var queryUrl="https://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&destination="+destination+"&key=AIzaSyBmJyViZSJ3cStp8CIvoAIdZ_nTsJl5DBQ";
        // console.log("queryUrl: "+queryUrl);

        // $.ajax({
        //     url:queryUrl,
        //     method: "GET"
        // }).then(function(response){
        //     console.log("google response: "+response);
        // })








