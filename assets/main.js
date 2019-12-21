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
     if(searchArea=="Current Location"){
         getLocation();
         var interval1=setInterval(function(){
            if(lon!="undefined" && lat!="undefined"){
                clearInterval(interval1);
                console.log("lat: "+lat);
                console.log("lon: "+lon);
            }
         },1000);
     }else{
         //searchByZipCode
     }

    // var queryUrlByCurrentLocation=
    // var queryUrlByZip=

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
