

/* * * * * * * Variables * * * * * * */
var lon="undefined";
var lat="undefined";


/* * * * * * * Functions * * * * * * */

function performSearch(htmlDivId,searchArea,zipCode,distance,type){
    var queryUrl,result;
    

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
               console.log("test: "+result.length);
               displayResult(htmlDivId,result);
            });
        }
        },500);

    /*Searching by the zipcode*/
    }else{
        queryUrl="https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/"+zipCode;
        $.ajax(getAjaxSetting(queryUrl)).done(function (response) {
            result=filterResponse(response,type);
            console.log("test: "+result.length);
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
           console.log(arr[i].cuisines.toString());  
           newArr.push(arr[i]);
         }

      }
      return newArr;
    }
        console.log(response.result.data.length);
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
            var parent=$("<div>").attr("class","container_div");
            el.append(parent);
            var div1= $("<h4>").attr("class","result").text("Name: "+result[i].restaurant_name);
            var div2= $("<div>").attr("class","result").text("Address: "+result[i].address.formatted);
            var div3= $("<div>").attr("class","result").text("Cuisines: "+result[i].cuisines.toString());
            var div4= $("<div>").attr("class","result").text("Phone: "+result[i].restaurant_phone);
            var div5= $("<div>").attr("class","result").text("Price Range: "+result[i].price_range);
            var div6= $("<div>").attr("class","result").text("Hours: "+result[i].hours);
            parent.append(div1,div2,div3,div4,div5,div5,div6);
        }
       
   
        
    }
    
}



