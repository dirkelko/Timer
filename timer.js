document.addEventListener("DOMContentLoaded", function(event) { 

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const seconds = Number(urlParams.get('seconds'));
    const fontWeight = Number(urlParams.get('fontWeight'));

    const mX = 600;
    const mY = 10;
    const r = 500;
    const dt = 50; //timer intervall for clock path
    const milliSeconds = (seconds)? seconds * 1000 : 600000;

    let remTime = milliSeconds;
    let isRunnung = false;
    let interval = {};

    document.getElementById("clockCircle").setAttribute("cx",mX);
    document.getElementById("clockCircle").setAttribute("cy",mY + r);
    document.getElementById("clockCircle").setAttribute("r",r);
    document.getElementById("bgCircle").setAttribute("cx",mX);
    document.getElementById("bgCircle").setAttribute("cy",mY + r);
    document.getElementById("bgCircle").setAttribute("r",r);

    document.getElementById("timer").innerHTML = timerString(remTime);
    document.getElementById("inpTime").style.display = "None";
    document.getElementById("timer").style.fontWeight = fontWeight;

    document.getElementById('startButton').hidden = false;
    document.getElementById('stopButton').hidden = true;
    document.getElementById('resetButton').hidden = true;

    function start(){

        let endTime = Date.now() + remTime;

        isRunnung = true;
        document.getElementById("startButton").hidden = true;
        document.getElementById("stopButton").hidden = false;
        document.getElementById('resetButton').hidden = true;
        interval = setInterval(function(){
            remTime = endTime - Date.now();
            document.getElementById("timer").innerHTML = timerString(remTime);

            document.getElementById("clockCircle").setAttribute("stroke","transparent");
            document.getElementById("clockPath").setAttribute("stroke","orange");
            let alpha = (milliSeconds - remTime)/milliSeconds*2*Math.PI;
            let dx = r * Math.sin(alpha);
            let dy = r * Math.cos(alpha);
            let laf = (remTime > milliSeconds/2)? 1 : 0;
            let sArc = `M ${mX - dx} ${mY + r - dy} A ${r} ${r} 0 ${laf} 0 ${mX} ${mY}`
            document.getElementById("clockPath").setAttribute("d",sArc);
            if (remTime <= 0) {
                //document.body.style.backgroundColor = "red";
                document.getElementById("clockPath").setAttribute("stroke","transparent");
                document.getElementById('startButton').hidden = true;
                document.getElementById('stopButton').hidden = true;
                document.getElementById('resetButton').hidden = false;
                isRunnung = false;
                clearInterval(interval);
                document.getElementById("timer").innerHTML = timerString(0);
            }
        }, dt);           

     }

     function stop(){
        document.getElementById("startButton").hidden = false;
        document.getElementById('resetButton').hidden = false;
        document.getElementById('stopButton').hidden = true;
        clearInterval(interval);
        isRunnung = false;
     }

    function reset(){
        remTime = milliSeconds;        
        document.getElementById('startButton').hidden = false;
        document.getElementById('stopButton').hidden = true;
        document.getElementById('resetButton').hidden = true;
        document.getElementById("timer").innerHTML = timerString(remTime);
        document.getElementById("clockCircle").setAttribute("stroke","orange");
        document.body.style.backgroundColor = "black";
    } 
    
    function timerString(remTime){
        let iSeconds = Math.floor(remTime/1000 + .9);
        let sMin = ((iSeconds - (iSeconds % 60))/60).toString();
        let sSec = (iSeconds % 60).toString();
        sSec = (sSec.length ==1)? "0" + sSec: sSec;
        sMin = (sMin.length ==1)? "0" + sMin: sMin;
        return sMin + ":" + sSec;
    }


    document.getElementById('startButton').addEventListener("click", function(event){
        start();
    });
    document.getElementById('resetButton').addEventListener("click", function(event){
        reset();
    });
    document.getElementById('stopButton').addEventListener("click", function(event){
        stop();
    });
    /*document.getElementById("timer").addEventListener("click", function(event){
        document.getElementById("timer").style.display = "None";
        document.getElementById("inpTime").style.display = "";
    });*/

}) 