var arr=[];
var xmlhttp = new XMLHttpRequest(),
json;
xmlhttp.onreadystatechange = function() {
  if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
    //console.log("Working");
    json = JSON.parse(xmlhttp.responseText);
    //console.log(json);
//  fetchchartinfo();
//  fetchjparsing();
var chart1= new jparsing(json.xdata,json.xaxisname,json.dataset[0].yaxisname,json.dataset[0].ydata);
console.log(chart1);
var chart2= new jparsing(json.xdata,json.xaxisname,json.dataset[1].yaxisname,json.dataset[1].ydata);
console.log(chart2);
var chart3= new jparsing(json.xdata,json.xaxisname,json.dataset[2].yaxisname,json.dataset[2].ydata);
console.log(chart3);
//xaxisshow();
range();
//range2();
//range3();
//plot();
create_div();

  }
}
xmlhttp.open('GET','master_data.json',true);
xmlhttp.send();

var chartinfo = function (caption,subcaption){
  this.caption = caption;
  this.subcaption=subcaption;
};

var jparsing=function (xdata,xaxisname,yaxisname,ydata){
  this.xdata = xdata;
  this.xaxisname = xaxisname;
  this.yaxisname = yaxisname;
  this.ydata= ydata;

};

function fetchchartinfo(){
  //console.log(json);
console.log(json.caption);
console.log(json["subcaption"]);
};


function fetchjparsing(){
  console.log(json["xaxisname"]);
  //console.log(json["yaxisname"]);
  console.log(json.dataset[0].yaxisname);
  console.log(json.dataset[0].ydata[0]);
  //console,log(json["ydata"]);
}

function range(DivId){
  
  for(var k=0;k<json.dataset.length;k++){
  var min= Math.min.apply(this,json.dataset[0].ydata);
  //console.log(min + " minimum value");//100
  var max= Math.max.apply(this,json.dataset[0].ydata);
  //console.log(max+ " maximum value");//800


  //console.log(distance);
  var jsonlength=json.dataset[0].ydata.length;
  console.log(jsonlength+ " array length");//7
  var divcalculate =Math.ceil((max/jsonlength)/10)*10;
  //console.log(divcalculate+ " per interval");
    var j=min;//100
  for(var i=0;i<json.dataset[0].ydata.length;i++){

    console.log(j+"j value");
    j = j+divcalculate;

    arr.push(j);
  }
    //console.log(arr+"kkkk");
    

console.log('&&&%&%&', arr);
return arr;  

}
}




  //console.log(distance);
  





function createLine(DivId)
{
  for(var z=0;z<json.dataset.length;z++){
  
var svg =document.createElementNS("http://www.w3.org/2000/svg","svg");  
      svg.setAttributeNS(null,"height","320");
      svg.setAttributeNS(null,"width","500");

    var myvline = document.createElementNS("http://www.w3.org/2000/svg","line"); 
    //myline.setAttributeNS(null,"id","myline");
    myvline.setAttributeNS(null,"x1",50);
    myvline.setAttributeNS(null,"y1",0);
    myvline.setAttributeNS(null,"x2",55);
    myvline.setAttributeNS(null,"y2",288);
    myvline.setAttributeNS(null,"fill","black");
    myvline.setAttributeNS(null,"stroke","yellow");
    myvline.setAttributeNS(null,"height","300");
    svg.appendChild(myvline);


    var duration=300/json.xdata.length;
    //console.log(duration);
    var yaxisduration=200/json.xdata.length;

    var myhline = document.createElementNS("http://www.w3.org/2000/svg","line"); 
    myhline.setAttributeNS(null,"x1",55);
    myhline.setAttributeNS(null,"y1",288);
    myhline.setAttributeNS(null,"x2",350);
    myhline.setAttributeNS(null,"y2",288);
    //myvline.setAttributeNS(null,"fill","black");
    myhline.setAttributeNS(null,"stroke","green");
    svg.appendChild(myhline);
    
    //var z = range(DivId);
   for(var n=0;n<json.xdata.length;n++)
   {
    
    var myyaxislineticks=document.createElementNS("http://www.w3.org/2000/svg","line");
    myyaxislineticks.setAttributeNS(null,"x1",45);
    myyaxislineticks.setAttributeNS(null,"y1",20+duration*n);
    myyaxislineticks.setAttributeNS(null,"x2",60);
    myyaxislineticks.setAttributeNS(null,"y2",20+duration*n);
    //myvline.setAttributeNS(null,"fill","black");
    myyaxislineticks.setAttributeNS(null,"stroke","red");
    svg.appendChild(myyaxislineticks);


    var myyaxisdivline=document.createElementNS("http://www.w3.org/2000/svg","line");
    myyaxisdivline.setAttributeNS(null,"x1",350);
    myyaxisdivline.setAttributeNS(null,"y1",20+duration*n);
    myyaxisdivline.setAttributeNS(null,"x2",60);
    myyaxisdivline.setAttributeNS(null,"y2",20+duration*n);
    //myvline.setAttributeNS(null,"fill","black");
    myyaxisdivline.setAttributeNS(null,"stroke","grey");
    svg.appendChild(myyaxisdivline);


   

     
     //debugger;
    
      var ytext = document.createElementNS("http://www.w3.org/2000/svg","text");
      ytext.setAttributeNS(null,"x",15);
      ytext.setAttributeNS(null,"y",285-duration*n);
     // ytext.setAttributeNS(null,"fill","black");
      ytext.setAttributeNS(null,"stroke","blue");
     //var z=range2();
     
     ytext.textContent=arr[n];
     svg.appendChild(ytext);

   
          
    
     
}

   
     for(var m=0;m<json.xdata.length;m++){
    
    var myxaxislineticks=document.createElementNS("http://www.w3.org/2000/svg","line");
    myxaxislineticks.setAttributeNS(null,"x1",90+duration*m);
    myxaxislineticks.setAttributeNS(null,"y1",276);
    myxaxislineticks.setAttributeNS(null,"x2",90+duration*m);
    myxaxislineticks.setAttributeNS(null,"y2",296);
    //myvline.setAttributeNS(null,"fill","black");
      myxaxislineticks.setAttributeNS(null,"stroke","black");
    svg.appendChild(myxaxislineticks);

     var text = document.createElementNS("http://www.w3.org/2000/svg","text");
      text.setAttributeNS(null,"x",70+duration*m);
      text.setAttributeNS(null,"y",318);
      //text.setAttributeNS(null,"fill","black");
      text.setAttributeNS(null,"stroke","blue");
      text.textContent=json.xdata[m];
      console.log(json.xdata[m]);
      svg.appendChild(text);
   // console.log(m);
 }

     for(var f=0;f<json.dataset[0].ydata.length;f++){
    //var point=json.dataset[0].ydata[f];
    var plotpoints=document.createElementNS("http://www.w3.org/2000/svg","circle");
    plotpoints.setAttributeNS(null, "cx", 90);
    plotpoints.setAttributeNS(null, "cy", 280);
    plotpoints.setAttributeNS(null, "r",  4);
    plotpoints.setAttributeNS(null, "fill", "green"); 
    svg.appendChild(plotpoints);

    var myline1=document.createElementNS("http://www.w3.org/2000/svg","line");
    myline1.setAttributeNS(null,"x1",90);
    myline1.setAttributeNS(null,"y1",280);
    myline1.setAttributeNS(null,"x2",140);
    myline1.setAttributeNS(null,"y2",190);
    //myvline.setAttributeNS(null,"fill","black");
      myline1.setAttributeNS(null,"stroke","black");
    svg.appendChild(myline1);


    var plotpoints2=document.createElementNS("http://www.w3.org/2000/svg","circle");
    plotpoints2.setAttributeNS(null, "cx", 140);
    plotpoints2.setAttributeNS(null, "cy", 190);
    plotpoints2.setAttributeNS(null, "r",  4);
    plotpoints2.setAttributeNS(null, "fill", "green"); 
    svg.appendChild(plotpoints2);

     var myline2=document.createElementNS("http://www.w3.org/2000/svg","line");
    myline2.setAttributeNS(null,"x1",140);
    myline2.setAttributeNS(null,"y1",190);
    myline2.setAttributeNS(null,"x2",190);
    myline2.setAttributeNS(null,"y2",100);
    //myvline.setAttributeNS(null,"fill","black");
      myline2.setAttributeNS(null,"stroke","black");
    svg.appendChild(myline2);




    var plotpoints3=document.createElementNS("http://www.w3.org/2000/svg","circle");
    plotpoints3.setAttributeNS(null, "cx", 190);
    plotpoints3.setAttributeNS(null, "cy", 100);
    plotpoints3.setAttributeNS(null, "r",  4);
    plotpoints3.setAttributeNS(null, "fill", "green"); 
    svg.appendChild(plotpoints3);


     var myline3=document.createElementNS("http://www.w3.org/2000/svg","line");
    myline3.setAttributeNS(null,"x1",190);
    myline3.setAttributeNS(null,"y1",100);
    myline3.setAttributeNS(null,"x2",240);
    myline3.setAttributeNS(null,"y2",275);
    //myvline.setAttributeNS(null,"fill","black");
      myline3.setAttributeNS(null,"stroke","black");
    svg.appendChild(myline3);


    var plotpoints3=document.createElementNS("http://www.w3.org/2000/svg","circle");
    plotpoints3.setAttributeNS(null, "cx", 240);
    plotpoints3.setAttributeNS(null, "cy", 275);
    plotpoints3.setAttributeNS(null, "r",  4);
    plotpoints3.setAttributeNS(null, "fill", "green"); 
    svg.appendChild(plotpoints3);

     var myline4=document.createElementNS("http://www.w3.org/2000/svg","line");
    myline4.setAttributeNS(null,"x1",240);
    myline4.setAttributeNS(null,"y1",275);
    myline4.setAttributeNS(null,"x2",290);
    myline4.setAttributeNS(null,"y2",110);
    //myvline.setAttributeNS(null,"fill","black");
      myline4.setAttributeNS(null,"stroke","black");
    svg.appendChild(myline4);


    var plotpoints4=document.createElementNS("http://www.w3.org/2000/svg","circle");
    plotpoints4.setAttributeNS(null, "cx", 290);
    plotpoints4.setAttributeNS(null, "cy", 110);
    plotpoints4.setAttributeNS(null, "r",  4);
    plotpoints4.setAttributeNS(null, "fill", "green"); 
    svg.appendChild(plotpoints4);

     var myline5=document.createElementNS("http://www.w3.org/2000/svg","line");
    myline5.setAttributeNS(null,"x1",290);
    myline5.setAttributeNS(null,"y1",110);
    myline5.setAttributeNS(null,"x2",340);
    myline5.setAttributeNS(null,"y2",150);
    //myvline.setAttributeNS(null,"fill","black");
      myline5.setAttributeNS(null,"stroke","black");
    svg.appendChild(myline5);


    var plotpoints5=document.createElementNS("http://www.w3.org/2000/svg","circle");
    plotpoints5.setAttributeNS(null, "cx", 340);
    plotpoints5.setAttributeNS(null, "cy", 150);
    plotpoints5.setAttributeNS(null, "r",  4);
    plotpoints5.setAttributeNS(null, "fill", "green"); 
    svg.appendChild(plotpoints5);


  }
  


    
    console.log(DivId);
    DivId.appendChild(svg);


   
    
    }

}

function create_div(){
   var DivId =  document.createElement('div');
    //DivId.innerHTML ="Hey please work";
    //DivId.innerHTML = ;
   var x= document.getElementById("chart_container");
   createLine(DivId);
   range(DivId);
   //range2(DivId);
   //range3(DivId);
   x.appendChild(DivId);
  // var y= document.getElementById("xshow");
 //y.appendChild(DivId);

  
}


