//// TODO: Simplify Variable Names and create a variable name for easier use


function generateParkingMap()
{
  //document.write("Hello");
  var colorBuffer;
  var selectedTile;
  // Map Matrix Start
  function parkingSpot(type ,status , spotNumber)
  {
    this.type = type; //General, Handicap, Faculty, Blank
    this.status = status;
    this.spotNumber = spotNumber;
  }


  var mapMatrix = [];
  var spotNumber = 1;
  for(i = 0; i < 16; i++)
  {
    mapMatrix[i] = new Array(10);

    for(j = 0; j < 10; j++)
    {
      mapMatrix[i][j] = new parkingSpot("general", "open",0);

      if(j == 0 || j == 9 || i%3 == 0)
      {
        mapMatrix[i][j].type = "blank";
        mapMatrix[i][j].status = undefined;
        mapMatrix[i][j].spotNumber = "a";
        continue;
      }
      mapMatrix[i][j].spotNumber = spotNumber;
      spotNumber++;
      if(mapMatrix[i][j].spotNumber%2 == 0)
      mapMatrix[i][j].status = "reserved";

    }

  }

  // Map Matrix End
  for(rowNumber = 0; rowNumber < mapMatrix.length; rowNumber++){
    for(cellNo = 0; cellNo < mapMatrix[0].length; cellNo++)
    {
      var parkingSpot = mapMatrix[rowNumber][cellNo];
      var parkingCell = document.createElement("div");

      parkingCell.style = "border : 2px solid black;"

      parkingCell.className = "cell";
      parkingCell.style.boxSizing = "border-box";
      parkingCell.style.textAlign = "center";
      parkingCell.style.fontWeight = "bold";

      if(parkingSpot.type == "blank")
      {
        parkingCell.style.background = "#d5d3f7";
      }

      if(parkingSpot.type == "general" && parkingSpot.status == "open")
      {
        parkingCell.style.background = "#f00fff";
        parkingCell.addEventListener("click", function(){
          if(selectedTile != null)
          selectedTile.style.background = colorBuffer;

          colorBuffer = this.style.background;
          this.style.background = "#000000";
          selectedTile = this;
          checkValidity(this.spotNumber);}
        );
        parkingCell.addEventListener("mouseenter", function(){
          this.style.textAlign = "right";}
        );

        parkingCell.addEventListener("mouseleave", function(){
          this.style.textAlign = "center";}
        );
      }

      if(parkingSpot.status == "reserved"){
        parkingCell.style.background = "#ff0000";

        parkingCell.addEventListener("click", function(){
          if(selectedTile != null)
          selectedTile.style.background = colorBuffer;

          colorBuffer = this.style.background;
          this.style.background = "#000000";
          selectedTile = this;}
        );

        parkingCell.addEventListener("mouseenter", function(){
          this.style.textAlign = "right";}
        );

        parkingCell.addEventListener("mouseleave", function(){
          this.style.textAlign = "center";}
        );

      }





      parkingCell.innerHTML = parkingSpot.spotNumber;
      parkingCell.style.float = "left";

      parkingCell.style.width = 100/String(mapMatrix[0].length) + "%";
      //parkingCell.style.minHeight = "10%"; // TODO:
      var mapDiv = document.getElementById("mapDiv");
      mapDiv.style.width = "33%";
      mapDiv.style.background = "#ff0fff";
      mapDiv.style.overflow = "auto";
      mapDiv.appendChild(parkingCell);
    }
  }
}

function checkValidity(spotNumber)
{
  for(var i = 0; i < 16; i++)
  {
    for(var j = 0; j < 10;j++)
    {
      if(mapMatrix[i][j].spotNumber == spotNumber)
        var parkingSpot = mapMatrix[i][j];
    }
  }
  if(parkingSpot.status == "reserved"){
    reserveButton.disabled = true;
  }
  else{
    reserveButton.disabled = false;
  }

}
