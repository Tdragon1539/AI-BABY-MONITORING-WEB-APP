song ="";
status1 = "";
objectDetector1 = "";
objects = [];

function preload(){
   song = loadSound("alert.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector1 = ml5.objectDetector('cocossd', model_loaded);
document.getElementById("status").innerHTML = "Status: Detecting";

}

function model_loaded(){
console.log("Model Loaded!");
status1 = true;

}


function draw(){
    image(video, 0, 0, 380, 380);
    if(status1 != ""){
        objectDetector1.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
document.getElementById("status").innerHTML = "Status: Object Detected";
fill("#FF0000");
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 10);
noFill();
stroke("#FF0000");
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
if(objects[i].label == "person"){
    document.getElementById("objects").innerHTML = "Baby Found";
    song.stop();
   }else{
   document.getElementById("objects").innerHTML = "Baby not found";
   song.play();
   song.volume(0.5);
   }
   if(objects.length == 0){
    document.getElementById("objects").innerHTML = "Baby not found";
    song.play();
    song.volume(0.5);
    }
        }
    }
  
   
}

function gotResults(error, results){
if(error){
    console.error(error);
} else{
console.log(results);
objects = results;

}

}