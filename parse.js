/**
 *
 */

var xmlhttp = new XMLHttpRequest(),
json;
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    //console.log("Working");
    json = JSON.parse(xmlhttp.responseText);

    var chart1 = new jparsing(json.xdata, json.xaxisname, json.dataset[0].yaxisname, json.dataset[0].ydata);

    var chart2 = new jparsing(json.xdata, json.xaxisname, json.dataset[1].yaxisname, json.dataset[1].ydata);
    var chart3 = new jparsing(json.xdata, json.xaxisname, json.dataset[2].yaxisname, json.dataset[2].ydata);

    var chartRange1 = range(chart1);
    var chartRange2 = range(chart2);
    var chartRange3 = range(chart3);
    console.log(chartRange1+"show here");
    console.log(chartRange2+"chart2");
    console.log(chartRange3+"chart3");

    create_div(chartRange1, chart1);
    create_div(chartRange2, chart2);
    create_div(chartRange3, chart3);
  }
}

xmlhttp.open('GET', 'master_data.json', true);
xmlhttp.send();

var chartinfo = function(caption, subcaption) {
  this.caption = caption;
  this.subcaption = subcaption;
};

var jparsing = function(xdata, xaxisname, yaxisname, ydata) {
  this.xdata = xdata;
  this.xaxisname = xaxisname;
  this.yaxisname = yaxisname;
  this.ydata = ydata;
};



function range(chart) {
    var arr=[];
   var min = Math.min.apply(this, chart.ydata);
   console.log(min+"This is the minimum");

    var max = Math.max.apply(this, chart.ydata);
    var jsonlength = chart.ydata.length;

    var distance=max-min;
    var cc= Math.ceil((distance/3)/10)*10;
   // var divcalculate = Math.floor((max/jsonlength) / 10) * 10;
    console.log(cc+"this is the interval");
    var j = min-cc;
    for (var i = 0; i < chart.ydata.length; i++) {

      j = j + cc;
      arr.push(j);
    }

    return arr;

}
//console.log(distance);

function createLine(DivId, chart,range) {
  console.log(chart);
  // for (var z = 0; z < json.dataset.length; z++) {

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "height", "320");
    svg.setAttributeNS(null, "width", "500");
    svg.setAttributeNS(null,"class","svg_design");

    var myvline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    myvline.setAttributeNS(null, "x1", 56);
    myvline.setAttributeNS(null, "y1", 30);
    myvline.setAttributeNS(null, "x2", 56);
    myvline.setAttributeNS(null, "y2", 288);
    myvline.setAttributeNS(null, "fill", "black");
    myvline.setAttributeNS(null, "stroke", "yellow");
    myvline.setAttributeNS(null, "height", "500");
    svg.appendChild(myvline);

    var duration = 300 / json.xdata.length;
    var duration1= 300 / chart.ydata.length;
    console.log(duration1+"ok");
    //console.log(duration);
   // var yaxisduration = 200 / json.xdata.length;

    var myhline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    myhline.setAttributeNS(null, "x1", 55);
    myhline.setAttributeNS(null, "y1", 288);
    myhline.setAttributeNS(null, "x2", 350);
    myhline.setAttributeNS(null, "y2", 288);
    myhline.setAttributeNS(null, "stroke", "green");
    myhline.setAttributeNS(null, "height", "500");
    svg.appendChild(myhline);

    //var z = range(DivId);
    for (var n = 0; n < json.xdata.length; n++) {

      var myyaxislineticks = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myyaxislineticks.setAttributeNS(null, "x1", 45);
      myyaxislineticks.setAttributeNS(null, "y1", 38 + duration1 * n);
      myyaxislineticks.setAttributeNS(null, "x2", 60);
      myyaxislineticks.setAttributeNS(null, "y2", 38 + duration1 * n);
      myyaxislineticks.setAttributeNS(null, "stroke", "red");
      svg.appendChild(myyaxislineticks);

      var myyaxisdivline = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myyaxisdivline.setAttributeNS(null, "x1", 350);
      myyaxisdivline.setAttributeNS(null, "y1", 38 + duration1 * n);
      myyaxisdivline.setAttributeNS(null, "x2", 60);
      myyaxisdivline.setAttributeNS(null, "y2", 38 + duration1 * n);
      myyaxisdivline.setAttributeNS(null, "stroke", "grey");
      svg.appendChild(myyaxisdivline);



      var ytext = document.createElementNS("http://www.w3.org/2000/svg", "text");
      ytext.setAttributeNS(null, "x", 15);
      ytext.setAttributeNS(null, "y", 340 - 45 -  duration * n);
       ytext.setAttributeNS(null, "stroke", "blue");
      // var z=range();

      ytext.textContent = range[n];
      svg.appendChild(ytext);
    }

      var yaxislable = document.createElementNS("http://www.w3.org/2000/svg", "text");
      yaxislable.setAttributeNS(null, "x", 365);
      yaxislable.setAttributeNS(null, "y", 190);
       yaxislable.setAttributeNS(null, "stroke", "black");
       //yaxislable.setAttributeNS(null,"transform","rotate(30 20,40)");
      yaxislable.textContent = chart.yaxisname;
      //console.log(yaxislable.textContent+"I am here");
      svg.appendChild(yaxislable);


    for (var m = 0; m < json.xdata.length; m++) {

      var myxaxislineticks = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myxaxislineticks.setAttributeNS(null, "x1", 56 + duration * m);
      myxaxislineticks.setAttributeNS(null, "y1", 285);
      myxaxislineticks.setAttributeNS(null, "x2", 56 + duration * m);
      myxaxislineticks.setAttributeNS(null, "y2", 296);
      //myvline.setAttributeNS(null,"fill","black");
      myxaxislineticks.setAttributeNS(null, "stroke", "black");
      svg.appendChild(myxaxislineticks);

      var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttributeNS(null, "x", 56 + duration * m);
      text.setAttributeNS(null, "y", 305);

      text.setAttributeNS(null, "stroke", "blue");
      text.textContent = json.xdata[m];

      svg.appendChild(text);

      var hairline= document.createElementNS("http://www.w3.org/2000/svg", "line");
      hairline.setAttributeNS(null,"x1",176);
      hairline.setAttributeNS(null,"y1",30);
      hairline.setAttributeNS(null,"x2",176);
      hairline.setAttributeNS(null,"y2",288);
      hairline.setAttributeNS(null,"stroke","orange");
      hairline.setAttributeNS(null, "stroke-dasharray","5, 5");
      hairline.setAttributeNS(null,"class","hair");
      svg.appendChild(hairline);
    }



        var xaxislable = document.createElementNS("http://www.w3.org/2000/svg","text");
        xaxislable.setAttributeNS(null, "x", 120 );
         xaxislable.setAttributeNS(null, "y", 319);
         xaxislable.setAttributeNS(null, "stroke", "brown");
          xaxislable.textContent = "Time";

          svg.appendChild(xaxislable);




    var temp1;
    var temp2;
    var isNull = false;
    for (var f = 0; f < chart.ydata.length; f++) {
      

        var store=chart.ydata;
        console.log(store+"checking");

        var min = Math.min.apply(this, range);
        console.log(min+"minimum of the chart");
        var max = Math.max.apply(this, range);
        console.log(max+"maximum of the chart");

        var ydimension=288;
        var xdimension=288;






       if( chart.ydata[f] !== undefined && chart.ydata[f] !== null && chart.ydata[f] !== "")
        {

               var cx_cordinates= 56+duration*f;
               console.log(cx_cordinates+ "Checking cx_cordinates");
               var cy_cordinates= ydimension-((chart.ydata[f]-min)/(max-min)*(ydimension-38));
               console.log(cy_cordinates+"Checking cy_cordinates");
             if(f>0){
                if(isNull == false){
                  var myline1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
                  myline1.setAttributeNS(null, "x1", temp1);
                  myline1.setAttributeNS(null, "y1", temp2);
                  myline1.setAttributeNS(null, "x2", cx_cordinates);
                  myline1.setAttributeNS(null, "y2", cy_cordinates);
                  myline1.setAttributeNS(null, "stroke", "blue");
                  myline1.setAttributeNS(null,"stroke-width",3);
                  svg.appendChild(myline1);
                }
                if(isNull){
                  var myline2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    myline2.setAttributeNS(null, "x1", temp1);
                    myline2.setAttributeNS(null, "y1",  temp2);
                    myline2.setAttributeNS(null, "x2", cx_cordinates);
                    myline2.setAttributeNS(null, "y2", cy_cordinates);
                    myline2.setAttributeNS(null, "stroke", "black");
                    myline2.setAttributeNS(null,"stroke-width",3);
                    myline2.setAttributeNS(null, "stroke-dasharray","5, 5");
                    myline2.setAttributeNS(null,"class","dashed");

                    svg.appendChild(myline2);
                    isNull = false;
                }
             }

            var plotpoints = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            plotpoints.setAttributeNS(null,"class","circle_design");
            plotpoints.setAttributeNS(null, "cx", cx_cordinates);
            plotpoints.setAttributeNS(null, "cy", cy_cordinates);
            plotpoints.setAttributeNS(null, "r", 4);
            plotpoints.setAttributeNS(null, "fill", "white");
            plotpoints.setAttributeNS(null,"stroke","blue");
            svg.appendChild(plotpoints);

            var tooltip= document.createElementNS("http://www.w3.org/2000/svg", "title");
            //tooltip.setAttributeNS(null,"stroke","pink");

            tooltip.innerHTML=chart.ydata[f];
            plotpoints.appendChild(tooltip);


            temp1=cx_cordinates;
            temp2=cy_cordinates;
            }
           else if(chart.ydata[f] == null || chart.ydata[f] == ""){
             isNull = true;
           }

    }
    // console.log(DivId);
    DivId.appendChild(svg);
  // }

}

function create_div(range, chart) {
  var DivId = document.createElement('div');
  
  var x = document.getElementById("chart_container");
  createLine(DivId, chart,range);
  
  x.appendChild(DivId);
 
}
