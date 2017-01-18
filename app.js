//callback method

function AdditionalData_Loaded(data)
{
  //create a table
  var placeholder=document.getElementById("myTablePlaceholder");
  var tel=document.getElementById("telephone");
  var city=document.getElementById("city");
  var name=document.getElementById("name");
  var gardens=document.getElementById("gardensList");
  var sstype=document.getElementById("soustype");
  var coord=document.getElementById("coord");
  var Cities = [];
  var selectCities= [];

  //for each row in the table add the cell contents
  for (var i=1; i < data.d.length; i++)
  {
      var li=document.createElement('LI');
      var citiesClass = AddDataContents(data.d, i,'ville');
      gardens.appendChild(li);
      li.appendChild(AddCellContents(data.d, i,'raisonsociale'));
      li.setAttribute("class", citiesClass);
      var inputBox = document.getElementById('citySearch').getAttribute("value");

      let listclass = li.getAttribute("class");
      console.log(inputBox);
      if (citySearch === null) {
        li.style.display = "block";
      } else if (citySearch != listclass) {
        li.style.display = "block";
      } else {
        li.style.display = "block";
      }
    };


// Tableau de toutes les villes
/*
      Cities.push(AddDataContents(data.d, i,'ville'));
      Cities.sort();

  $.each(Cities, function(i, el){
if($.inArray(el, selectCities) === -1) selectCities.push(el);
});
for (let j=0; j < selectCities.length; j++){
let singleCities = selectCities[j];
}*/

  $( "#gardensList" ).on( "click", "li", function() {
    let index = $(this).index();
    $(coord).html("Coordonnées");
    $(name).html(AddCellContents(data.d, index,'raisonsociale'));
    $(sstype).html(AddCellContents(data.d, index,'soustype'));
    $(tel).html(AddCellContents(data.d, index,'tlphone'));
    $(city).html(AddCellContents(data.d, index,'codepostal'));
    $(city).append(AddCellContents(data.d, index,'ville'));

var latit = AddDataContents(data.d, index,'latitude');
var longi = AddDataContents(data.d, index,'longitude');
var myLatLng = {lat: parseFloat(latit), lng: parseFloat(longi)};
// Create a map object and specify the DOM element for display.
var map = new google.maps.Map(document.getElementById('map'), {
  center: myLatLng,
  scrollwheel: true,
  zoom: 15
});

var infowindow = new google.maps.InfoWindow({
  content: AddDataContents(data.d, index,'raisonsociale')
});
// Create a marker and set its position.
var marker = new google.maps.Marker({
  map: map,
  position: myLatLng,
  title: AddDataContents(data.d, index,'raisonsociale')
});
marker.addListener('click', function() {
infowindow.open(map, marker);
});



  });

}

//add cell contents to the table
function AddCellContents(data, cell, id)
{
    var para=document.createElement('SPAN');
    var dataCell = data[cell][id];
    para.appendChild(document.createTextNode(dataCell));
    return para;

}
function AddDataContents(data, cell, id)
{
    var dataCell = data[cell][id];
    return dataCell;

}

function mySubmitFunction(evt) {
  evt.preventDefault();
  someBug();
  return false;
}

$(document).ready(function() {
    LoadAdditionalData();
});




function LoadAdditionalData()
{
    //create the queryUrl to be used in the service call
    var query = "https://dataprovence.cloudapp.net:8080/v1/dataprovencetourisme/ParcsEtJardins?&format=json&callback=?";
    var filter = "";
    var queryUrl = query + filter;
    //make jquery call to service
    $.getJSON(queryUrl, null, AdditionalData_Loaded);
}
