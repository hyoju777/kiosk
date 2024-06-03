// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";

let model, webcam, webcamContainer, webcamChildContainer, labelChildContainer, childContainer, maxPredictions;
let restart = false;
let url;

function changeBtnState() {
    init();
    const btnElement = document.getElementById("btn");
    if (btnElement.innerText == "Start") {
        btnElement.innerText = "Stop";
    } else if (btnElement.innerText == "Stop") {
        btnElement.innerText = "Start";
        restart = true;
    }
}

// Load the image model and setup the webcam
async function init() {
    const btnElement = document.getElementById("btn");

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
    

    if (btnElement.innerText == "Stop") { // Start 버튼을 누른 상태
        if (restart) {
            webcamContainer.removeChild(webcamContainer.childNodes[0]);
        }
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        webcamContainer = document.getElementById("webcam-container");
        webcamChildContainer = webcam.canvas;
       
        webcamContainer.appendChild(webcamChildContainer);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
        }
    } else if (btnElement.innerText == "Start") { // Stop 버튼을 누른 상태
        webcam.stop();
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

function popup() {
    window.name = "parentForm";
    var option = "width = 500, height = 500, top = 100, left = 200, location = no";
    window.open("../popup/popup_order.html", "childForm", option);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    if(prediction[0].className == "adagio" && prediction[0].probability.toFixed(2) >= 0.95){
        labelContainer.childNodes[0].innerHTML = "아다지오 커피번";
        labelContainer.childNodes[1].innerHTML = "2000";
        webcam.stop();
        changeBtnState();
        popup();
    } else if(prediction[1].className == "creamCheese" && prediction[1].probability.toFixed(2) >= 0.95){
        labelContainer.childNodes[0].innerHTML = "크림치즈 찹쌀도넛";
        labelContainer.childNodes[1].innerHTML = "2400";
        webcam.stop();
        changeBtnState();
        popup();
    } else if(prediction[2].className == "cheesePotato" && prediction[2].probability.toFixed(2) >= 0.95){
        labelContainer.childNodes[0].innerHTML = "치즈감자봉";
        labelContainer.childNodes[1].innerHTML = "2600";
        webcam.stop();
        changeBtnState();
        popup();
    } else if(prediction[3].className == "bigTwisted" && prediction[3].probability.toFixed(2) >= 0.95){
        labelContainer.childNodes[0].innerHTML = "쫄깃한 왕꽈배기";
        labelContainer.childNodes[1].innerHTML = "1900";
        webcam.stop();
        changeBtnState();
        popup();
    } else if(prediction[4].className == "eggTart" && prediction[4].probability.toFixed(2) >= 0.95){
        labelContainer.childNodes[0].innerHTML = "에그타르트";
        labelContainer.childNodes[1].innerHTML = "1700";
        webcam.stop();
        changeBtnState();
        popup();
    } else{
        labelContainer.childNodes[0].innerHTML = "알 수 없음"
        labelContainer.childNodes[1].innerHTML = "";
    }
}
