
var xmlhttp = new XMLHttpRequest(),
json;
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    //console.log("Working");
    json = JSON.parse(xmlhttp.responseText);
    
    var chart1 = new jparsing(json.xdata, json.xaxisname, json.dataset[0].yaxisname, json.dataset[0].ydata);
    // console.log(chart1);
    var chart2 = new jparsing(json.xdata, json.xaxisname, json.dataset[1].yaxisname, json.dataset[1].ydata);
    // console.log(chart2);
    var chart3 = new jparsing(json.xdata, json.xaxisname, json.dataset[2].yaxisname, json.dataset[2].ydata);
    // console.log(chart3);
    //xaxisshow();
    var chartRange1 = range(chart1);
    var chartRange2 = range(chart2);
    var chartRange3 = range(chart3);
    console.log(chartRange1+"show here");
    console.log(chartRange2+"chart2");
    console.log(chartRange3+"chart3");
    // range2(chart2);
    // range3(chart3);
    //plot();
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
    
    var max = Math.max.apply(this, chart.ydata);
    var jsonlength = chart.ydata.length;
    var divcalculate = Math.ceil((max / jsonlength) / 10) * 10;
    var j = 0; 
    for (var i = 0; i < chart.ydata.length; i++) {
     
      j = j + divcalculate;
      arr.push(j);
    }
    // console.log(arr);
    // console.log('&&&%&%&', arr);
    return arr;
  
}
//console.log(distance);

function createLine(DivId, chart,range) {
  console.log(chart);
  // for (var z = 0; z < json.dataset.length; z++) {

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "height", "320");
    svg.setAttributeNS(null, "width", "500");

    var myvline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    myvline.setAttributeNS(null, "x1", 50);
    myvline.setAttributeNS(null, "y1", 0);
    myvline.setAttributeNS(null, "x2", 55);
    myvline.setAttributeNS(null, "y2", 288);
    myvline.setAttributeNS(null, "fill", "black");
    myvline.setAttributeNS(null, "stroke", "yellow");
    myvline.setAttributeNS(null, "height", "300");
    svg.appendChild(myvline);

    var duration = 300 / json.xdata.length;
    //console.log(duration);
    var yaxisduration = 200 / json.xdata.length;

    var myhline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    myhline.setAttributeNS(null, "x1", 55);
    myhline.setAttributeNS(null, "y1", 288);
    myhline.setAttributeNS(null, "x2", 350);
    myhline.setAttributeNS(null, "y2", 288);
    myhline.setAttributeNS(null, "stroke", "green");
    svg.appendChild(myhline);

    //var z = range(DivId);
    for (var n = 0; n < chart.xdata.length; n++) {

      var myyaxislineticks = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myyaxislineticks.setAttributeNS(null, "x1", 45);
      myyaxislineticks.setAttributeNS(null, "y1", 20 + duration * n);
      myyaxislineticks.setAttributeNS(null, "x2", 60);
      myyaxislineticks.setAttributeNS(null, "y2", 20 + duration * n);
      myyaxislineticks.setAttributeNS(null, "stroke", "red");
      svg.appendChild(myyaxislineticks);

      var myyaxisdivline = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myyaxisdivline.setAttributeNS(null, "x1", 350);
      myyaxisdivline.setAttributeNS(null, "y1", 20 + duration * n);
      myyaxisdivline.setAttributeNS(null, "x2", 60);
      myyaxisdivline.setAttributeNS(null, "y2", 20 + duration * n);
      myyaxisdivline.setAttributeNS(null, "stroke", "grey");
      svg.appendChild(myyaxisdivline);

     

      var ytext = document.createElementNS("http://www.w3.org/2000/svg", "text");
      ytext.setAttributeNS(null, "x", 15);
      ytext.setAttributeNS(null, "y", 320 - 45 -  duration * n);
       ytext.setAttributeNS(null, "stroke", "blue");
      // var z=range();

      ytext.textContent = range[n];
      svg.appendChild(ytext);
    }

    for (var m = 0; m < json.xdata.length; m++) {

      var myxaxislineticks = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myxaxislineticks.setAttributeNS(null, "x1", 90 + duration * m);
      myxaxislineticks.setAttributeNS(null, "y1", 276);
      myxaxislineticks.setAttributeNS(null, "x2", 90 + duration * m);
      myxaxislineticks.setAttributeNS(null, "y2", 296);
      //myvline.setAttributeNS(null,"fill","black");
      myxaxislineticks.setAttributeNS(null, "stroke", "black");
      svg.appendChild(myxaxislineticks);

      var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttributeNS(null, "x", 70 + duration * m);
      text.setAttributeNS(null, "y", 318);
      //text.setAttributeNS(null,"fill","black");
      text.setAttributeNS(null, "stroke", "blue");
      text.textContent = json.xdata[m];
      // console.log(json.xdata[m]);
      svg.appendChild(text);
      // console.log(m);
    }

    var temp1;
    var temp2;
    for (var f = 0; f < chart.ydata.length; f++) {
      //var point=json.dataset[0].ydata[f];

      var store=chart.ydata;
      console.log(store+"check");

      var min = Math.min.apply(this, range);
      console.log(min+"minimum");
      var max = Math.max.apply(this, range);
      console.log(max+"maxi");

      var ydimension=288;
      var xdimension=288;

      temp1=cx_cordinates;
       cx_cordinates=temp1;
        temp2=cy_cordinates;
        cy_cordinates=temp2;

      var cx_cordinates= 90+duration*f;
      //var yratio= 
        console.log(cx_cordinates+"fff");
        var cy_cordinates= ydimension-((chart.ydata[f]-min)/(max-min)*(ydimension));
        console.log(cy_cordinates+"yyy");
       
       
        if(f>0){


     
       var myline1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myline1.setAttributeNS(null, "x1", temp1);
      myline1.setAttributeNS(null, "y1", temp2);
      myline1.setAttributeNS(null, "x2", cx_cordinates);
      myline1.setAttributeNS(null, "y2", cy_cordinates);
      myline1.setAttributeNS(null, "stroke", "black");
      svg.appendChild(myline1);
    }
    var plotpoints = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      plotpoints.setAttributeNS(null, "cx", cx_cordinates);
      plotpoints.setAttributeNS(null, "cy", cy_cordinates);
      plotpoints.setAttributeNS(null, "r", 4);
      plotpoints.setAttributeNS(null, "fill", "green");
      svg.appendChild(plotpoints);
      
  
    }
    // console.log(DivId);
    DivId.appendChild(svg);
  // }

}

function create_div(range, chart) {
  var DivId = document.createElement('div');
  //DivId.innerHTML ="Hey please work";
  //DivId.innerHTML = ;
  var x = document.getElementById("chart_container");
  createLine(DivId, chart,range);
  // range(DivId);
  //range2(DivId);
  //range3(DivId);
  x.appendChild(DivId);
  // var y= document.getElementById("xshow");
  //y.appendChild(DivId);
}