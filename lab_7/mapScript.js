fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        randomLocations(data);
    });

let pickedLocations = [];

function randomLocations(locationArray){
    let randomInt = Math.floor(Math.random()*(locationArray.length));

    console.log(pickedLocations);
    if(pickedLocations.includes(locationArray[randomInt])){
        randomLocations(locationArray);
        console.log("Duplicate result: ", locationArray[randomInt].name)
    }
    else{
        pickedLocations.push(locationArray[randomInt]);
        console.log("Picked: ", locationArray[randomInt].name);
    }

    if(pickedLocations.length < 3){
        randomLocations(locationArray);
    }
}

function createMarker(location){
    console.log("hello");
    //L.marker([locationArray[randomInt].geocoded_column_1.coordinates[1],locationArray[randomInt].geocoded_column_1.coordinates[0]]).bindPopup(locationArray[randomInt].name).addTo(mymap);
}

let mymap = L.map('mapid').setView([38.986021, -76.940148], 11);
let hornbakeMarker = L.marker([38.988144, -76.941561]).addTo(mymap);
hornbakeMarker.bindPopup("<b>Hornbake Library</b><br>Home of the iSchool");

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoiZGFuaWVsc3RydWJsZSIsImEiOiJjazhrb3U2eHUwNDY1M2xwaGE0azZlaXE4In0.3m4xy6Y2go6c-JJ3gIgfGw'
}).addTo(mymap);

console.log(pickedLocations);
pickedLocations.forEach(createMarker);