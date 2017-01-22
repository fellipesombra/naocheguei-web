function initMap(data) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: data.center,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var flightPlanCoordinates = data.coordinates;
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  
  //alterar para mostrar a hora em cada ponto
  for (i = 0; i < data.coordinates.length; i++) { 
	  var marker = new google.maps.Marker({
		    position: data.coordinates[i],
		    map: map,
		    title: data.dateTime[i]
		  });
  }
  
  map.setOptions({ minZoom: 4, maxZoom: 18, scrollwheel: false });
  flightPath.setMap(map);

}




function getMapInfo () {

	document.getElementById("mapNotFound").className = "hidden";
	document.getElementById("itemMap").style.backgroundImage = "";
    jQuery.ajax({
        type: "GET",
        url: "http://localhost:8080/onmyway-service/rest/map/trip/"+$.QueryString["trip"], //depois mudar hostname para ser dinâmico
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status, jqXHR) {
        	if(jqXHR.status == 200){
        		initMap(data);
        	}else{
        		document.getElementById("map").className = "hidden";
        		document.getElementById("mapNotFound").className = "captionError";
        		document.getElementById("itemMap").style.backgroundImage = "url(resources/img/looking-for-job2.jpg)";
        	}	
        },
        error: function (jqXHR, status) {
        	document.getElementById("map").className = "hidden";
        	document.getElementById("mapNotFound").className = "captionError";
        	document.getElementById("itemMap").style.backgroundImage = "url(resources/img/looking-for-job2.jpg)";
        }
});
}