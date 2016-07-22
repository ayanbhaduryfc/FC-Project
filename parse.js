/**
 *
 */
var xmlhttp = new XMLHttpRequest(),
json;
var size;
var length;
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

    json = JSON.parse(xmlhttp.responseText);
  length = json.dataset.length;
    for(var a = 0 ; a < length ; a++){
      var chart1 = new jparsing(json.id1,json.xdata, json.xaxisname, json.dataset[a].yaxisname, json.dataset[a].ydata);
      var chartRange1 = range(chart1);
      //create_div(chartRange1, chart1);
      if(json.id1 === "column"){
     
      createcolumn(chart1,chartRange1);
    }
    else{
      createLine(chart1,chartRange1);
    }

    }
  }
}

xmlhttp.open('GET', 'master_data.json', true);
xmlhttp.send();

var chartinfo = function(caption, subcaption) {
  this.caption = caption;
  this.subcaption = subcaption;
};

var jparsing = function(id1,xdata, xaxisname, yaxisname, ydata) {
  this.id1 = id1;
  this.xdata = xdata;
  this.xaxisname = xaxisname;
  this.yaxisname = yaxisname;
  this.ydata = ydata;
};

var yDivision = 6;
function range(chart) {
    var arr=[];
    var min = Math.min.apply(this, chart.ydata);
    var max = Math.max.apply(this, chart.ydata);
    var jsonlength = chart.ydata.length;
    var distance=max-min;
    var cc= Math.ceil((distance/3)/10)*10;
    var j = min-(cc+100);
    for (var i = 0; i < yDivision; i++) {

      j = j + cc;
      arr.push(j);
    }

    return arr;

}


var count = 0;

function createLine(chart,range) {
    var global_div = document.getElementById("chart_container");
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "x", "0");
    svg.setAttributeNS(null, "height", "340");
    svg.setAttributeNS(null, "width", "385");
    svg.setAttributeNS(null,"class","svg_design");

    var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttributeNS(null, "x", "60");
    svg1.setAttributeNS(null, "y", "38");
    svg1.setAttributeNS(null, "height", "288");
    svg1.setAttributeNS(null, "width", "301");
    svg1.setAttributeNS(null,"class","svg_design1");
    svg.appendChild(svg1);
    var durationX = 300 / (json.xdata.length - 1);

    var durationY = 300 / yDivision;

    var b = 0;
    var j = yDivision - 1;
    for (var n = 0; n < yDivision; n++) {

      var myyaxislineticks = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myyaxislineticks.setAttributeNS(null, "x1", 48);
      myyaxislineticks.setAttributeNS(null, "y1", 38 + durationY * n);
      myyaxislineticks.setAttributeNS(null, "x2", 60);
      myyaxislineticks.setAttributeNS(null, "y2", 38 + durationY * n);
      myyaxislineticks.setAttributeNS(null, "stroke", "rgb(123,123,123)");

      svg.appendChild(myyaxislineticks);

      if(n < yDivision - 1){
        var myyaxisdivline = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        myyaxisdivline.setAttributeNS(null, "width", 300);
        myyaxisdivline.setAttributeNS(null, "height", durationY);
        myyaxisdivline.setAttributeNS(null, "x", 0);
        myyaxisdivline.setAttributeNS(null, "y", durationY * n);
      myyaxisdivline.setAttributeNS(null, "stroke", "#D2D2D2");
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

        svg1.appendChild(myyaxisdivline);
      }


      var ytext = document.createElementNS("http://www.w3.org/2000/svg", "text");
      ytext.setAttributeNS(null, "x", 15);
      ytext.setAttributeNS(null, "y", 42 + durationY * n);
       ytext.setAttributeNS(null, "stroke", "#2D2D2D");

      ytext.textContent = range[j];
      svg.appendChild(ytext);
      j--;
    }

    for (var m = 0; m < json.xdata.length; m++) {

        var myxaxislineticks = document.createElementNS("http://www.w3.org/2000/svg", "line");
        myxaxislineticks.setAttributeNS(null, "x1", 60 + durationX * m);

        myxaxislineticks.setAttributeNS(null, "y1", 288);
        myxaxislineticks.setAttributeNS(null, "x2", 60 + durationX * m);
        myxaxislineticks.setAttributeNS(null, "y2", 299);
        myxaxislineticks.setAttributeNS(null, "stroke", "rgb(123,123,123)");
        svg.appendChild(myxaxislineticks);

        if(count == length - 1 || count == length-2 || count == length-3){
            var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttributeNS(null, "x", 60+durationX * m);
            text.setAttributeNS(null, "y", 305);

            text.setAttributeNS(null, "stroke", "#2D2D2D");
            text.setAttributeNS(null, "transform", "rotate(270 "+(68+durationX * m)+",312)");
            text.textContent = json.xdata[m];

            svg.appendChild(text);
            var xaxislable = document.createElementNS("http://www.w3.org/2000/svg","text");
            xaxislable.setAttributeNS(null, "x", 60 + 120 );
            xaxislable.setAttributeNS(null, "y", 335);
            xaxislable.setAttributeNS(null, "stroke", "#2D2D2D");
            xaxislable.textContent = "Time";

            svg.appendChild(xaxislable);
        }
    }


    var min = Math.min.apply(this, range);
    var max = Math.max.apply(this, range);

    var ydimension=288;
    var xdimension=288;

    var temp1;
    var temp2;
    var isNull = false;
    
    for (var f = 0; f < chart.ydata.length; f++) {
      var store=chart.ydata;
      if(f == 0){
        temp1 = 60 + durationX * f;
        temp2 = ydimension;
      }
      if( chart.ydata[f] !== undefined && chart.ydata[f] !== null && chart.ydata[f] !== "")
      {

           var cx_cordinates= 60 + durationX * f;

             var cy_cordinates= ydimension-((chart.ydata[f]-min)/(max-min)*(ydimension-38));

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
          plotpoints.setAttributeNS(null,"value",chart.ydata[f]);
          svg.appendChild(plotpoints);

          temp1=cx_cordinates;
          temp2=cy_cordinates;
        }
         else if(chart.ydata[f] == null || chart.ydata[f] == ""){
           isNull = true;
         }
  }
    global_div.appendChild(svg);
    count++;


    svg1.addEventListener("mousemove", function(event){
        valueOfX = event.clientX;

        var cust_event = new CustomEvent("animated", {detail:valueOfX});
             var search= document.getElementsByClassName("svg_design");
             document.dispatchEvent(cust_event);
     }, false);

       svg1.addEventListener("mouseout", function(event){
         var cust_event = new CustomEvent("animated", {detail:-10});
         var search= document.getElementsByClassName("svg_design");
         document.dispatchEvent(cust_event);
       }, false);

        var hairlinemulti = document.createElementNS("http://www.w3.org/2000/svg", "line");
        var tooltiptext = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tooltiptext.setAttributeNS(null,"class","tooltip_design");
        var tooltiptext2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        document.addEventListener("animated", function(event)  {
           hairlinemulti.setAttributeNS(null,"x1",event.detail - 68);
           hairlinemulti.setAttributeNS(null,"y1",0);
           hairlinemulti.setAttributeNS(null,"x2",event.detail - 68);
           hairlinemulti.setAttributeNS(null,"y2",250);
           hairlinemulti.setAttributeNS(null,"stroke","orange");
           hairlinemulti.setAttributeNS(null, "stroke-dasharray","5, 5");
           hairlinemulti.setAttributeNS(null,"class","hairmulti");

           svg1.appendChild(hairlinemulti);

           var searchcircle = document.getElementsByClassName("circle_design");

           for(var l = 0 ; l < searchcircle.length; l++){
              var compare1 = searchcircle[l].getBoundingClientRect() || -1;
              var compare2 = hairlinemulti.getBoundingClientRect();

              if(compare2.left > compare1.right || compare2.right < compare1.left || compare2.top > compare1.bottom || compare2.bottom <compare1.top){

              }
            else{
                  var tooltipY = searchcircle[l].getAttribute("cy")-15;
                  var tooltipX = searchcircle[l].getAttribute("cx");
                  var text = searchcircle[l].getAttribute("value");

                    tooltiptext.setAttributeNS(null, "x", tooltipX);
                    tooltiptext.setAttributeNS(null, "y", tooltipY);
                    tooltiptext.setAttributeNS(null, "stroke", "red");
                    tooltiptext.textContent = text;

                    svg.appendChild(tooltiptext);
                    }
               /*
              if(compare2.left < compare1.right && compare2.right > compare1.left && compare2.top < compare1.bottom && compare2.bottom > compare1.top){
                var tooltipY = searchcircle[l].getAttribute("cy")-15;
                  var tooltipX = searchcircle[l].getAttribute("cx");
                  var text = searchcircle[l].getAttribute("value");

                tooltiptext.setAttributeNS(null, "x", tooltipX);
                    tooltiptext.setAttributeNS(null, "y", tooltipY);
                    tooltiptext.setAttributeNS(null, "stroke", "red");
                    tooltiptext.textContent = text;
                    svg.appendChild(tooltiptext)

              }
              else{
                //tooltiptext.textContent = "a";
                svg.appendChild(tooltiptext);

              }
              */
           }



        });
}

/*function create_div(range, chart) {
    var DivId = document.createElement('div');

    var x = document.getElementById("chart_container");
    createLine(DivId, chart,range);

    x.appendChild(DivId);

  }*/

/*function collide (searchcircle, hairlinemulti ){
    var compare1 = searchcircle.getBoundingClientRect();
    var compare2 = hairlinemulti.getBoundingClientRect();

    if(compare2.left > compare1.right || compare2.right < compare1.left || compare2.top > compare1.bottom || compare2.bottom <compare1.top){
          return false;
    }
    else{
      return true;
    }

  }*/



var ydivision = 6;
function createcolumn( chart,range) {
var global_div2 = document.getElementById("chart_container");
   var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "height",340 );
    svg.setAttributeNS(null, "width", 385);
    svg.setAttributeNS(null,"class","svg_design");


    var durationx = 300 / (json.xdata.length);
    
    var durationy = 300 / ydivision;
    var b=0;
    var j= ydivision-1;




 for (var n = 0; n < ydivision; n++) {

      var myyaxislineticks = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myyaxislineticks.setAttributeNS(null, "x1", 45);
      myyaxislineticks.setAttributeNS(null, "y1", 38 + durationy * n);
      myyaxislineticks.setAttributeNS(null, "x2", 60);
      myyaxislineticks.setAttributeNS(null, "y2", 38 + durationy * n);
      myyaxislineticks.setAttributeNS(null, "stroke", "#DFDFDF");
      svg.appendChild(myyaxislineticks);

      if(n <ydivision-1){
      var myyaxisdivline = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        myyaxisdivline.setAttributeNS(null, "width", 300);
        myyaxisdivline.setAttributeNS(null, "height", durationy);
        myyaxisdivline.setAttributeNS(null, "x", 60);
        myyaxisdivline.setAttributeNS(null, "y", 38 + durationy * n);
        myyaxisdivline.setAttributeNS(null, "stroke", "rgb(223,223,223)");
        myyaxisdivline.setAttributeNS(null,"stroke-width",2);
        if(b == 0){
      myyaxisdivline.setAttributeNS(null, "fill", "white");
      b = 1;
      }
      else
      if(b == 1){
      myyaxisdivline.setAttributeNS(null, "fill", "#F7F7F7");
      b = 0;
      }

        svg.appendChild(myyaxisdivline);
      }


      var ytext = document.createElementNS("http://www.w3.org/2000/svg", "text");
      ytext.setAttributeNS(null, "x", 15);
      ytext.setAttributeNS(null, "y", 45 + durationy * n);
      ytext.setAttributeNS(null, "stroke", "#2C2C2C");
      ytext.textContent = range[j];
      svg.appendChild(ytext);
      j--;
    }


    for (var m = 0; m < json.xdata.length; m++) {

      var myxaxislineticks = document.createElementNS("http://www.w3.org/2000/svg", "line");
      myxaxislineticks.setAttributeNS(null, "x1", 90 + durationx * m);

      myxaxislineticks.setAttributeNS(null, "y1", 285);
      myxaxislineticks.setAttributeNS(null, "x2", 90 + durationx * m);
      myxaxislineticks.setAttributeNS(null, "y2", 296);
      myxaxislineticks.setAttributeNS(null, "stroke", "rgb(123,123,123)");
      svg.appendChild(myxaxislineticks);

      if(count == length - 1 || count == length-2 || count == length-3){
      var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttributeNS(null, "x", 56 + durationx * m);
      text.setAttributeNS(null, "y", 345);

      text.setAttributeNS(null, "stroke", "#434343");
       text.setAttributeNS(null, "transform", "rotate(270 "+(68+durationx*m)+",312)");
      text.textContent = json.xdata[m];

      svg.appendChild(text);
      
        var xaxislable = document.createElementNS("http://www.w3.org/2000/svg","text");
        xaxislable.setAttributeNS(null, "x",60+ 120 );
         xaxislable.setAttributeNS(null, "y", 335);
         xaxislable.setAttributeNS(null, "stroke", "#434343");
          xaxislable.textContent = "Time";

          svg.appendChild(xaxislable);
   }
 }
              var min_new = Math.min.apply(this, range);
              var max_new = Math.max.apply(this, range);

          var ydimension = 288;
         
            var barWidth = 30;
     
      for (var f = 0; f < chart.ydata.length; f++) {

         if( chart.ydata[f] !== undefined && chart.ydata[f] !== null && chart.ydata[f] !== ""){

               var cx_cordinates= 70+durationx*f;

               var cy_cordinates= ydimension-((chart.ydata[f]-min_new)/(max_new-min_new)*(ydimension));
               
         var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
         rect.setAttributeNS(null,'class','bar');
         
         rect.setAttributeNS(null, 'x', cx_cordinates);
         rect.setAttributeNS(null, 'y', cy_cordinates);
         rect.setAttributeNS(null, 'height',288-cy_cordinates);
         rect.setAttributeNS(null, 'width', barWidth);
         rect.setAttributeNS(null, 'fill', '#1E7ACD');
         svg.appendChild(rect);



         
         var tooltip = document.createElementNS("http://www.w3.org/2000/svg", 'title');
         tooltip.innerHTML = chart.ydata[f];
         tooltip.setAttributeNS(null,'fill','#FFDBCE');
         tooltip.setAttributeNS(null,'visibility','visible');
         tooltip.setAttributeNS(null,"class","toolshow");
         rect.appendChild(tooltip);



}
}
  
    global_div2.appendChild(svg);
    count++;
    var left_cal= svg.getBoundingClientRect().left;
  

     svg.addEventListener("mouseover", function(event){
        valueOfX = event.pageX - left_cal;
        valueOfY = event.pageY;

        var cust_event = new CustomEvent("animated_new", {"detail": { "mousex": valueOfX, "mousey" : valueOfY }});
            
             document.dispatchEvent(cust_event);
     }, false);

     svg.addEventListener("mouseleave", function(event){
         var cust_event = new CustomEvent("animated_new", {"detail": { "mousex": -10, "mousey": -10 }});
       
         document.dispatchEvent(cust_event);
       }, false);

       document.addEventListener("animated_new", function(event)  {
       
       var columnhover= document.getElementsByClassName("bar");
        
        for(var extract=0; extract<columnhover.length; extract++){
       
     var a = Number(columnhover[extract].getAttributeNS(null,"x"));

     var b = columnhover[extract].getAttributeNS(null,"y");
     var c=  Number(columnhover[extract].getAttributeNS(null,"width")) + a;
     var d=  columnhover[extract].getAttributeNS(null,"height");
      
     if( event.detail.mousex >= a && event.detail.mousex <= c && event.detail.mousey >= b){
        columnhover[extract].style.fill = "#BC4445";
     } 
     else{
        columnhover[extract].style.fill = "#1E7ACD";
     }

}
    
       svg.appendChild(rect);
});
     }

