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
xaxisshow();
range();

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

function range(){
  for(var k=0;k<3;k++){
  var min= Math.min.apply(this,json.dataset[k].ydata);
  console.log(min + " minimum value");//100
  var max= Math.max.apply(this,json.dataset[k].ydata);
  console.log(max+ " maximum value");//800
//var distance=max-min;
//var distance= Math.sqrt((Math.pow(max,2))-(Math.pow(min,2)));//793.011
  //console.log(distance);
  var jsonlength=json.dataset[k].ydata.length;
  console.log(jsonlength+ " array length");//7
  var divcalculate =Math.ceil((max/jsonlength)/10)*10;
  console.log(divcalculate+ " per interval");
    var j=min;
  for(var i=0;i<json.dataset[k].ydata.length;i++){

    console.log(j);
    j = j+divcalculate;


  }
}
}
function xaxisshow(){
  document.getElementById('xshow').innerHTML=json.xdata;
}
