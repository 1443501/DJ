song=0;
leftWristY=0;
leftWristX=0;
rightWristY=0;
rightWristX=0;
scoreleftWrist=0;
scorerightWrist=0;

function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function draw(){
    image(video, 0, 0, 600,500);
    fill("blue");
    stroke("blue");
    if(scorerightWrist>0.2){
        circle(rightWristX,rightWristY,20);

        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="speed: 0.5";
            song.rate(0.5);

        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="speed: 1";
            song.rate(1);
        
        }
        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="speed: 1.5";
            song.rate(1.5);
        }

        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="speed: 2";
            song.rate(2);
        }
        else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed").innerHTML="speed: 2.5";
            song.rate(2.5);
        }



    }
    if(scoreleftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY=Number(leftWristY);
        remove_decimals=floor(InNumberLeftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume is:" + volume;
        song.setVolume(volume);
      }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
console.log("scoreleftWrist: " + scoreleftWrist + "scorerightWrist: " +scorerightWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftWristX="+ leftWristX + "leftWristY="+ leftWristY);
        console.log("rightWristX="+ rightWristX + "rightWristY="+ rightWristY);
    }

}
