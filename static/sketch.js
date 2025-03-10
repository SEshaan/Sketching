menu = false;
currentbrush = null;

window.addEventListener("load", () => {
  const sketch = (p) => {
      brush.instance(p);

      p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

          p.background(255);
          brush.load();

          brush.stroke(p.color(0, 0, 0, 255));
          brush.strokeWeight(10);
          console.log(brush);
          
      };      
  
      let isDrawing = false;

      p.draw = () => {
          if (!menu && isDrawing) {
            // brush.plot(
            //   p.pmouseX - p.windowWidth / 2, 
            //   p.pmouseY - p.windowHeight / 2, 
            // )
          brush.line(
          p.pmouseX - p.windowWidth / 2, 
          p.pmouseY - p.windowHeight / 2, 
          p.mouseX - p.windowWidth / 2, 
          p.mouseY - p.windowHeight / 2
          );
          }
      };

      p.mousePressed = () => {
          isDrawing = true;
      };

      
      p.mouseReleased = () => {
        isDrawing = false;
    };

    function reset(){
      p.background(255);
    }

    window.reset = reset;

      function updateBrushFromForm() {
        let brushSize = parseInt(document.getElementById("sizeSlider").value);
        let vibration = parseInt(document.getElementById("vibrationSlider").value);
        let opacity = parseInt(document.getElementById("opacitySlider").value);
        let spacing = parseInt(document.getElementById("spacingSlider").value);
        let definition = parseFloat(document.getElementById("definitionSlider").value);
        let quality = parseInt(document.getElementById("qualitySlider").value);
        
        let brushType = document.querySelector('input[name="brushType"]:checked').value;
        
        let newBrushName = "customBrush_" + Date.now();
        
        currentbrush = {
          type: brushType,
          weight: brushSize,
          vibration: vibration,
          definition: definition,
          quality: quality,
          opacity: opacity,
          spacing: spacing,
          blend: false,
          pressure: { type: "standard", curve: [0.15, 0.2], min_max: [0.75, 0.75] },
          rotate: "none"
        }

        brush.add(newBrushName, {
          type: brushType,
          weight: brushSize,
          vibration: vibration,
          definition: definition,
          quality: quality,
          opacity: opacity,
          spacing: spacing,
          blend: false,
          pressure: { type: "standard", curve: [0.15, 0.2], min_max: [0.75, 0.75] },
          rotate: "none"
        });
        
        brush.set(newBrushName, "#000000", 1);
        brush.stroke(Color)
      }
      // createBrushPreview()
      // Attach event listeners to all controls.
      document.querySelectorAll('#brushes_settings input').forEach(input => {
        input.addEventListener("input", updateBrushFromForm);
        // input.addEventListener("input", updateBrushPreview);
      });
  };

  new p5(sketch);
  console.log("Brush settings applied");
  

//   function createBrushPreview() {
//     const previewSketch = (p) => {
//         p.setup = () => {
//             const previewBox = document.getElementById("brushes_preview");
//             let w = previewBox.clientWidth;
//             let h = previewBox.clientHeight;
//             console.log(w,h);
            
            
//             // Create a small preview canvas
//             p.createCanvas(w, h, p.WEBGL);
//             p.background(255);
            
//             // Assign brush instance
//             brush.instance(p);
//         };

//         p.draw = () => {
//             p.background(0);
//             let y = p.height / 2;
//             brush.line(-p.width / 2 + 10, y, p.width / 2 - 10, y);
//         };
//     };

//     new p5(previewSketch, "brushes_preview");
// }
// // Function to update the preview brush
// function updateBrushPreview() {
//     console.log(currentbrush);
    
//     brush.add("previewBrush", currentbrush);
//     brush.set("previewBrush", "#000000", 1);
// }


});

var colorPicker = new iro.ColorPicker('#picker', {
  layout: [
    {
      component: iro.ui.Wheel,
    },
    { 
      component: iro.ui.Slider,
      options: {
        sliderType: 'hue'
      }
    },
    { 
      component: iro.ui.Slider,
      options: {
        sliderType: 'saturation'
      }
    },
    { 
      component: iro.ui.Slider,
      options: {
        sliderType: 'value'
      }
    },
    { 
      component: iro.ui.Slider,
      options: {
        sliderType: 'red'
      }
    },
    { 
      component: iro.ui.Slider,
      options: {
        sliderType: 'green'
      }
    },
    { 
      component: iro.ui.Slider,
      options: {
        sliderType: 'blue'
      }
    }
  ]
});
var Color = "#000000";
colorPicker.on('color:change', function(color) {
  brush.stroke(color.hexString);
  Color = color.hexString;
});