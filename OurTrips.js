var imgArray = new Array("Jupiter.jpg","Mars.jpg","Earth.gif","Venus.jpg","ISS.jpg");
var imgCount = 0;
function startTime() {

    if(imgCount == imgArray.length) {
        imgCount = 0;
    }

    document.getElementById("Jupiter").src = imgArray[imgCount];
    imgCount++;

    setTimeout("startTime()", 4000);
}