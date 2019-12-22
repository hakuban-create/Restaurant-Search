$("#zipcode_section").hide();
/* * * * * * * elements * * * * * * */



/* * * * * * * Variables * * * * * * */
var type,distance,searchArea,zipCode;




/* * * * * * * Functions * * * * * * */

function initSearchVars(){
    distance=$("#distance").val();
    searchArea=$("#searcharea").val();
    zipCode=$("#zipcode").val();
    type=$("#type").val();
}





/* * * * * * * Listeners * * * * * * */

$("#search-btn").on("click",function(){
    event.preventDefault();
    console.log("clicked");
    initSearchVars();
    performSearch("result_container",searchArea,zipCode,distance,type);

});

$("#searcharea").on("change",function(){
    if($("#searcharea").val()=="Zip Code"){
    $("#zipcode_section").show();
    }else{
        $("#zipcode_section").hide();
    }
});


