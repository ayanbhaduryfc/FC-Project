/**
 *
 */
var xmlhttp = new XMLHttpRequest(),
json;
var size;
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    //console.log("Working");
    json = JSON.parse(xmlhttp.responseText);
  length = json.dataset.length;
    for(var a = 0 ; a < length ; a++){
      var chart1 = new jparsing(json.xdata, json.xaxisname, json.dataset[a].yaxisname, json.dataset[a].ydata);
      var chartRange1 = range(chart1);
      create_div(chartRange1, chart1);
    //  collide();

    }
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
   //console.log(min+"This is the minimum");

    var max = Math.max.apply(this, chart.ydata);
    var jsonlength = chart.ydata.length;

    var distance=max-min;
    var cc= Math.ceil((distance/3)/10)*10;
    var j = min-cc;
    for (var i = 0; i < chart.ydata.length; i++) {

      j = j + cc;
      arr.push(j);
    }

    return arr;

}

 function collide (searchcircle, hairlinemulti ){
        for(var t=0;t<searchcircle.length;searchcircle++){
        var compare1 = searchcircle[t].getBoundingClientRect() || -1;
        var comapre2 = hairlinemulti.getBoundingClientRect();
        //console.log(comapre2);
        if(compare1.left > comapre2.left || compare1.right > comapre2.right || comapre1.bottom > compare2.bottom || comapre1.top> compare2.top){
              return true;
        }
        else{
          return false;
        }
      }
      }

var count = 0;
function createLine(DivId, chart,range) {

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "height", "355");
    svg.setAttributeNS(null, "width", "312");
    svg.setAttributeNS(null,"class","svg_design");


    svg.addEventListener("mousemove", function(event){
     var current= event.currentTarget;
   var valueOfX;
   var valueOfY;
   if(event.clientX <= 56 || event.clientY <= 56){
    valueOfX = -10;
    valueOfY = -10;
    }
    else{
      valueOfX = event.clientX;
      valueOfY = event.clientY;
    }


      var cust_event = new CustomEvent("animated", { "detail" : { "mousex" : valueOfX, "mousey" : valueOfY } } );
      var search= document.getElementsByClassName("svg_design");
      document.dispatchEvent(cust_event);

       }, false);

     svg.addEventListener("mouseout", function(event){
     var current= event.currentTarget;

    var cust_event1 = new CustomEvent("animated", { "detail":{ "mousex" :-10,"mousey" :-10}});
      //var search= document.getElementsByClassName("svg_design");
      document.dispatchEvent(cust_event1);


       }, false);



        document.addEventListener("animated", function(event)  {
        hairlinemulti.setAttributeNS(null,"x1",event.detail.mousex || -1);
        hairlinemulti.setAttributeNS(null,"y1",30);
        hairlinemulti.setAttributeNS(null,"x2",event.detail.mousex || -1);
        hairlinemulti.setAttributeNS(null,"y2",288);
        hairlinemulti.setAttributeNS(null,"stroke","orange");
        hairlinemulti.setAttributeNS(null, "stroke-dasharray","5, 5");
        hairlinemulti.setAttributeNS(null,"class","hairmulti");
        svg.appendChild(hairlinemulti);


            dynamictooltip.setAttributeNS(null,"width",10);
            dynamictooltip.setAttributeNS(null,"height",10);
            dynamictooltip.setAttributeNS(null,"x", event.detail.mousex || -1);
            dynamictooltip.setAttributeNS(null,"y", event.detail.mousey || -1);

            var searchcircle= document.getElementsByClassName("circle_design");
            collide(searchcircle,hairlinemulti);

            for(var extract=0; extract<chart.ydata.length; extract++){

            tooltiptext.setAttributeNS(null, "x", event.detail.mousex || -1);
            tooltiptext.setAttributeNS(null, "y", event.detail.mousey || -1);
            tooltiptext.setAttributeNS(null, "stroke", "red");
            tooltiptext.textContent = chart.ydata[extract];

            //console.log( tooltiptext.textContent = chart.ydata[extract]);
            svg.appendChild(tooltiptext);
            svg.appendChild(dynamictooltip);

            for(var cp=0; cp<searchcircle.length; cp++){

            //console.log(chart.ydata[cp]);
          
        }
}

         });






         var tooltiptext = document.createElementNS("http://www.w3.org/2000/svg", "text");
         var dynamictooltip= document.createElementNS("http://www.w3.org/2000/svg", "rect");


    var hairline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    var hairlinemulti = document.createElementNS("http://www.w3.org/2000/svg", "line");

  var duration = 300 / json.xdata.length;
    var duration1 = 300 / chart.ydata.length;


    var b = 0;
    for (var n = 0; n < chart.ydata.length; n++) {

      var myyaxislineticks = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myyaxislineticks.setAttributeNS(null, "x1", 45);
      myyaxislineticks.setAttributeNS(null, "y1", 38 + duration1 * n);
      myyaxislineticks.setAttributeNS(null, "x2", 60);
      myyaxislineticks.setAttributeNS(null, "y2", 38 + duration1 * n);
      myyaxislineticks.setAttributeNS(null, "stroke", "rgb(123,123,123)");
      svg.appendChild(myyaxislineticks);
    if(n <chart.ydata.length - 1){
      var myyaxisdivline = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      myyaxisdivline.setAttributeNS(null, "width", duration * (json.xdata.length-1) + 2);
      myyaxisdivline.setAttributeNS(null, "height", duration1 * (n + 1) - duration1 * n);
      myyaxisdivline.setAttributeNS(null, "x", 56);
      myyaxisdivline.setAttributeNS(null, "y", 38 + duration1 * n);
      myyaxisdivline.setAttributeNS(null, "stroke", "rgb(223,223,223)");
      myyaxisdivline.setAttributeNS(null,"stroke-width",2);
      if(b == 0){
    myyaxisdivline.setAttributeNS(null, "fill", "white");
    b = 1;
    }
    else
    if(b == 1){
    myyaxisdivline.setAttributeNS(null, "fill", "rgb(247,247,247)");
    b = 0;
    }
      svg.appendChild(myyaxisdivline);
  }


      var ytext = document.createElementNS("http://www.w3.org/2000/svg", "text");
      ytext.setAttributeNS(null, "x", 15);
      ytext.setAttributeNS(null, "y", 340 - 45 -  duration1 * n);
       ytext.setAttributeNS(null, "stroke", "blue");

      ytext.textContent = range[n];
      svg.appendChild(ytext);
    }

      var yaxislable = document.createElementNS("http://www.w3.org/2000/svg", "text");
      yaxislable.setAttributeNS(null, "x", 343);
      yaxislable.setAttributeNS(null, "y", 0);
      yaxislable.setAttributeNS(null, "stroke", "black");

      yaxislable.textContent = chart.yaxisname;
        yaxislable.setAttributeNS(null,"transform","rotate(270 270,255)");
        yaxislable.setAttributeNS(null,"class","ylable");
      svg.appendChild(yaxislable);


    for (var m = 0; m < json.xdata.length; m++) {

      var myxaxislineticks = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myxaxislineticks.setAttributeNS(null, "x1", 56 + duration * m);

      myxaxislineticks.setAttributeNS(null, "y1", 285);
      myxaxislineticks.setAttributeNS(null, "x2", 56 + duration * m);
      myxaxislineticks.setAttributeNS(null, "y2", 296);
      myxaxislineticks.setAttributeNS(null, "stroke", "rgb(123,123,123)");
      svg.appendChild(myxaxislineticks);

      if(count == length - 1){
      var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttributeNS(null, "x", 56+duration*m);
      text.setAttributeNS(null, "y", 305);

      text.setAttributeNS(null, "stroke", "blue");
       text.setAttributeNS(null, "transform", "rotate(270 "+(68+duration*m)+",312)");
      text.textContent = json.xdata[m];

      svg.appendChild(text);
      // console.log(m);
      }

    }


    if(count == length - 1){
        var xaxislable = document.createElementNS("http://www.w3.org/2000/svg","text");
        xaxislable.setAttributeNS(null, "x", 120 );
         xaxislable.setAttributeNS(null, "y", 350);
         xaxislable.setAttributeNS(null, "stroke", "brown");
          xaxislable.textContent = "Time";

          svg.appendChild(xaxislable);
    }

          var min = Math.min.apply(this, range);
          //console.log(min+"minimum of the chart");
          var max = Math.max.apply(this, range);
          //console.log(max+"maximum of the chart");

          var ydimension=288;
          var xdimension=288;

      var temp1;
      var temp2;
      var isNull = false;
      for (var f = 0; f < chart.ydata.length; f++) {
        //var point=json.dataset[0].ydata[f];

        var store=chart.ydata;
        //console.log(store+"checking");




        if(f == 0){
          temp1 = 56+duration*f;
          temp2 = ydimension;
        }



        if( chart.ydata[f] !== undefined && chart.ydata[f] !== null && chart.ydata[f] !== "")
        {

               var cx_cordinates= 56+duration*f;
               //console.log(cx_cordinates+ "Checking cx_cordinates");
               var cy_cordinates= ydimension-((chart.ydata[f]-min)/(max-min)*(ydimension-38));
               //console.log(cy_cordinates+"Checking cy_cordinates");
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
            //tooltip.setAttributeNS(null,"width",100);
            //tooltip.setAttributeNS(null,"height",400);
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

count++;
}


function create_div(range, chart) {
  var DivId = document.createElement('div');

  var x = document.getElementById("chart_container");
  createLine(DivId, chart,range);

  x.appendChild(DivId);

}

