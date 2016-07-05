var xmlhttp = new XMLHttpRequest(),
json;
xmlhttp.onreadystatechange = function() {
  if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
    //console.log("Working");
    json = JSON.parse(xmlhttp.responseText);
    console.log(json);
  }
}
xmlhttp.open('GET','master_data.json',true);
xmlhttp.send();
