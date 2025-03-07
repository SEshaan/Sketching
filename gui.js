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