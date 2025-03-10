const toolbox = document.getElementById("toolbox");
const toolbox_gui = document.getElementById("toolbox_gui");
const toolbox_button = document.getElementById("toolbox_button")

function toggleMenu(state) {
  menu = state;
  
  if (menu) {
      toolbox.classList.add("active");
      toolbox_gui.classList.add("active");
      toolbox.style.display = "flex";
  } else {
      toolbox.classList.remove("active");
      toolbox_gui.classList.remove("active");
      toolbox.style.display = "none";
  }
}

toolbox_button.onclick = () => toggleMenu(true)


const scrollElement = document.getElementById("container")
function setContainer(index){
  scrollElement.style.transform = `translateY(${125 - 125*index}vh)`
}


const pallete = document.getElementById("pallete")

for (let i = 0; i < 6; i++) {
    const colorElement = document.createElement("div");
    colorElement.classList.add("color");
    colorElement.onmousedown = (event) => {
        if (event.button === 0) { // Left click
            colorElement.style.backgroundColor = Color;
            colorElement.hexstring = Color;
        } else if (event.button === 2) { // Right click
            colorPicker.color.hexString = colorElement.hexstring;
        }
    };
    colorElement.oncontextmenu = (event) => event.preventDefault(); // Prevent context menu on right click
    pallete.appendChild(colorElement);
}



const uploadButton = document.getElementById("upload_button");

uploadButton.onclick = async () => {
    const canvas = document.getElementsByTagName("canvas")[0];

    const button = document.getElementById("upload_button");
    button.innerText = "Loading...";

    canvas.toBlob(async (blob) => {
        if (!blob) {
            console.error('Failed to convert canvas to blob.');
            return;
        }

        const formData = new FormData();
        formData.append('image', blob, 'canvas.png');

        try {
            const response = await fetch('/analyze-image', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            button.innerText = "Guess";

            gemini_response_print(result.description);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }, 'image/png'); 
};

const gemini_response_print = (response) => {
    const outputElement = document.getElementById("geminiOutput");
    const text = response;
    let index = 0;

    outputElement.innerText = ""

    function typeCharacter() {
        if (index < text.length) {
            outputElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 10); // Adjust typing speed here
        }
    }

    typeCharacter();
}
