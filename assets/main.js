$("#zipcode_section").hide();
/* * * * * * * elements * * * * * * */



/* * * * * * * Variables * * * * * * */
var keywords,priceRange,distance,searchArea,zipCode;
var lon="undefined";
var lat="undefined";



/* * * * * * * Functions * * * * * * */
function keyWordsList(){
    keywords=$("#keyword").val();
    keywords=keywords.split(",");
    for(i in keywords){
        keywords[i]=keywords[i].trim();
    }
    return keywords;
}

function getLocation(){
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(function(location){
           lon=location.coords.longitude;
           lat=location.coords.latitude;
       });
   }else{
       alert("Geolocation is not supported by this browser.");
   }
}

function performSearch(){
    priceRange=$("#pricerange").val();
    distance=$("#distance").val();
    searchArea=$("#searcharea").val();
    zipCode=$("#zipcode").val();
    var keyWords=keyWordsList();

//Searching around the current location
     if(searchArea=="Current Location"){
         getLocation();
         var interval1=setInterval(function(){
            if(lon!="undefined" && lat!="undefined"){
                clearInterval(interval1);
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/search/geo?lon="+lon+"&&lat="+lat+"&distance="+distance,
                    "method": "GET",
                    "headers": {
                      "X-RapidAPI-Host": "us-restaurant-menus.p.rapidapi.com",
                      "X-RapidAPI-Key": "89f48f102dmsha286536059ab923p14d588jsn048cd5bbda16"
                    }
                  }
                  
                  $.ajax(settings).done(function (response) {
                    console.log(response);
                  });
            }
         },1000);
//Searching by the zipcode
     }else{
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/"+zipCode,
            "method": "GET",
            "headers": {
              "X-RapidAPI-Host": "us-restaurant-menus.p.rapidapi.com",
              "X-RapidAPI-Key": "89f48f102dmsha286536059ab923p14d588jsn048cd5bbda16"
            }
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
     }


}
















/* * * * * * * Listeners * * * * * * */

$("#search-btn").on("click",function(){
    event.preventDefault();
console.log("clicked");
performSearch();

});

$("#searcharea").on("change",function(){
    if($("#searcharea").val()=="Zip Code"){
    $("#zipcode_section").show();
    }
});


