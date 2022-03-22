canvas = "";
leftW = "";
peter = "";
function preload() {
    peter_pan = loadSound("music2.mp3");
    default_song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.center();
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", GotPoses);
}

function modelLoaded() {
    console.log("Posenet has been initialized");
   }

function draw() {
    image(video, 0, 0, 500 ,500);
    if (scoreRightWrist > 0.2) {
    stroke("red");
    fill("red");
    circle(rightWrist_x, rightWrist_y, 20);
    InNumberRightWristY = Number(rightWrist_y);
    rounded_decimal = floor(InNumberRightWristY);
    volume = rounded_decimal/500;
    music.setVolume(volume);
    console.log(volume);
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    }
    if (scoreLeftWrist > 0.2) {
        stroke("blue");
    fill("blue");
    circle(leftWrist_x, leftWrist_y, 20);
    }
}

function replay() {
    if (peter == "false") {
        document.getElementById("playagain").style = "visibility: visible";
        document.getElementById("stop").style = "visibility: visible";
        default_song.stop();
        peter_pan.stop();
        default_song.play();//play music
    
        default_song.setVolume(1);//set volume
    
        default_song.rate(1);//set speed
        peter = "false";
    }
    if (peter == "true") {
        document.getElementById("playagain").style = "visibility: visible";
        document.getElementById("stop").style = "visibility: visible";
        default_song.stop();
        peter_pan.stop();
        peter_pan.play();//play music
    
        peter_pan.setVolume(1);//set volume
    
        peter_pan.rate(1);//set speed
        peter = "true";
    }
}

function play() {
    if (leftW == "true") {
    document.getElementById("playagain").style = "visibility: visible";
    document.getElementById("stop").style = "visibility: visible";
    default_song.stop();
    peter_pan.stop();
    default_song.play();//play music

    default_song.setVolume(1);//set volume

    default_song.rate(1);//set speed
    peter = "false"
    }
    if (leftW == "false") {
        document.getElementById("playagain").style = "visibility: visible";
        document.getElementById("stop").style = "visibility: visible";
        default_song.stop();
        peter_pan.stop();
        peter_pan.play();//play music
    
        peter_pan.setVolume(1);//set volume
    
        peter_pan.rate(1);//set speed
        peter = "true";
        }
}

function stop() {
    document.getElementById("stop").style = "visibility: hidden";
    default_song.stop();
    peter_pan.stop();
}

function GotPoses(results, error) {
    if (results.length > 0) {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(" Score right Wrist - " + scoreRightWrist);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score left Wrist - " + scoreLeftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;

        console.log("Left Wrist X = " + leftWrist_x + " left Wrist Y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWrist_x + " Right Wrist Y = " + rightWrist_y);

        if (leftWrist_x & leftWrist_y > 0) {
            leftW = "true";
        }
        else {
            leftW = "false";
        }
    }
}