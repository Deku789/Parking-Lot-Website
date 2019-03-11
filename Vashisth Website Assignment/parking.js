function generateParkingMap()  //Gemerates the layout for the parking map and the summary
{
  var colorBuffer;
  var selectedTile;
  //Initializing Elements from Index.html
  var reserveButton = document.getElementById("reserveButton");
  var statusDiv = document.getElementById("statusDiv");
  var summaryPane = document.getElementById("summaryPane");
  var mapDiv = document.getElementById("mapDiv");


  function parkingSpot(type ,status , spotNumber) // Used to store information about each parking tile.
  {
    this.type = type; //general, handicap, faculty, blank
    this.status = status; //open, reserved
    this.spotNumber = spotNumber; //Number
  }

  // Map Matrix Start. A matrix of all the map tiles in the layout.
  var mapMatrix = [];
  var spotNumber = 1;

  for(i = 0; i < 16; i++) //For loop that generates the map layout.
  {
    mapMatrix[i] = new Array(10);

    for(j = 0; j < 10; j++)
    {
      mapMatrix[i][j] = new parkingSpot("general", "open",0);

      if(j == 0 || j == 9 || i%3 == 0)
      {
        mapMatrix[i][j].type = "blank"; //Blank tiles represens pace not used for parking, like roads.
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

  for(rowNumber = 0; rowNumber < mapMatrix.length; rowNumber++){ //This for loop creates the visual HTMl div elments used to represent the parking spots.
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
        parkingCell.style.background = "#00ff00";
        parkingCell.addEventListener("click", function(){    //Creates the event listener for clicking an open tile.
          if(selectedTile != null)
          selectedTile.style.background = colorBuffer;

          colorBuffer = this.style.background;
          this.style.background = "yellow";
          selectedTile = this;
          checkValidity(this.innerHTML);}
        );

      }

      if(parkingSpot.status == "reserved"){
        parkingCell.style.background = "#ff0000";

        parkingCell.addEventListener("click", function(){  //Creates the event listener for clicking an reserved tile.
          if(selectedTile != null)
          selectedTile.style.background = colorBuffer;

          colorBuffer = this.style.background;
          this.style.background = "red";
          selectedTile = this;
          checkValidity(this.innerHTML);}
        );

      }

      parkingCell.addEventListener("mouseenter", function(){ // Create event listener to create a hover effect.
        this.style.textAlign = "right";});
      parkingCell.addEventListener("mouseleave", function(){
        this.style.textAlign = "center";} );

      parkingCell.innerHTML = parkingSpot.spotNumber;
      parkingCell.style.float = "left";
      parkingCell.style.width = 100/String(mapMatrix[0].length) + "%";

      mapDiv.appendChild(parkingCell);
    }
  }
  generateSummary(); //Call the function generate summary

  function checkValidity(spotNumber) //This function checks whether the selected tile is open or not and displays the number of tile on the status bar.
  {
    var parkingSpot;

    for(var i = 0; i < 16; i++)
    {
      for(var j = 0; j < 10;j++)
      {
        if(mapMatrix[i][j].spotNumber == spotNumber)
          parkingSpot = mapMatrix[i][j];
      }
    }
    if(parkingSpot.status == "reserved"){
      reserveButton.disabled = true;
      statusDiv.innerHTML = "You have selected spot #" + spotNumber + ". This spot is reserved. Please select a free spot.";
    }
    else{
      reserveButton.disabled = false;
      statusDiv.innerHTML = "You have selected spot #" + spotNumber + ".";
    }

  }

  function generateSummary() //Checks the number of each type of parking spot and displays it.
  {
    var reservedNum = 0;
    var openNum = 0;
    var handicapNum = 0;
    var facultyNum = 0;
    for(var i = 0; i < 16; i++)
    {
      for(var j = 0; j < 10;j++)
      {
        if(isNaN(mapMatrix[i][j].spotNumber) == false)
        {
          if(mapMatrix[i][j].status == "reserved")
          {
            reservedNum++;
          }
          else
          {
            if(mapMatrix[i][j].type == "general")
            {
              openNum++;
            }
            else
            {
              if(mapMatrix[i][j].type == "handicap")
              {
                handicapNum++;
              }
              else
              {
                if(mapMatrix[i][j].type == "faculty")
                {
                  facultyNum++;
                }
              }
            }
          }
        }
      }
    }
    summaryPane.insertAdjacentHTML('beforeend',"Number Of Reserved Spots : " + reservedNum + "<br>");
    summaryPane.insertAdjacentHTML('beforeend',"Number Of Available Spots : " + openNum+ "<br>");
    summaryPane.insertAdjacentHTML('beforeend',"Number Of Spots Reserved for Handicap parking: " + handicapNum + "<br>");
    summaryPane.insertAdjacentHTML('beforeend',"Number Of Spots Reserved for Faculty: " + facultyNum + "<br>");

  }

}
