var line = 1;
var box = 1;
var word = "";
const c_word = "ALERT"


const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "R", "I", "Y", "A", "T", "H", "E", "G", "O", "D",
            "B", "C", "F", "J", "K", "L", "M", "N", "P","backspace", 
            "Q", "U", "V", "W", "X", "Y", "Z", "enter",
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        document.addEventListener("keyup", function(event) {
            switch (event.code) {
                case "Enter":
                    if(box == 6) {
                        compare_words(word, c_word, line);
                        line++;
                        box = 1;
                        word = "";
                    }
                    break;
                case "Backspace" :
                    if(box > 1) box--;
                    const s1 = "line" + line.toString() + "box" + box.toString();
                    document.getElementById(s1).innerHTML = `<div></div><br />`;
                    document.getElementById(s1).style.border = "0.1px solid black";
                    document.getElementById(s1).style.margin = "4px";
                    if(word.length != 0) word = word.slice(0,-1);
                    break;
                default:
                    const s2 = "line" + line.toString() + "box" + box.toString();
                    const k = event.code.toUpperCase();
                    document.getElementById(s2).innerHTML +=`<div>${k.charAt(k.length-1)}</div><br />`;
                    document.getElementById(s2).style.border = "2px solid black";
                    document.getElementById(s2).style.margin = "2.44px";
                    if(box < 6) { 
                        box++;
                        word += k.charAt(k.length-1);
                    }
                    break;

            }
        });
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "D", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        if(box > 1) box--;
                        const s = "line" + line.toString() + "box" + box.toString();
                        document.getElementById(s).innerHTML = `<div></div><br />`;
                        document.getElementById(s).style.border = "0.1px solid black";
                        document.getElementById(s).style.margin = "4px";


                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        if(box == 6) {
                            compare_words(word, c_word, line);
                            line++;
                            box = 1;
                            word = "";
                        }
                    });

                    break;

                default:
                    keyElement.textContent = key.toUpperCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += key.toUpperCase();
                        const s = "line" + line.toString() + "box" + box.toString();
                        document.getElementById(s).innerHTML +=`<div>${key.toUpperCase()}</div><br />`;
                        document.getElementById(s).style.border = "2px solid black";
                        document.getElementById(s).style.margin = "2.44px";
                        if(box < 6) box++;
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

function compare_words(word, ans, line) {
    var count = 0;
    for(var i = 0; i < 5; i++) {
        if(word[i] == ans[i]) {
            change_color_green(i+1, line);
            count++;
        }
        else {
            var flag = 0;
            for(var j = 0; j < 5 ; j++) {
                if(i!=j && word[i] == ans[j]) {
                    change_color_yellow(i+1, line);
                    flag = 1;
                }
            }
            if(flag == 0) change_color_grey(i+1,line);
        }
    }
    if(count == 5) {
        victory_screen();
    }
}

function change_color_green(box, line) {
    const s3 = "line" + line.toString() + "box" + box.toString();
    document.getElementById(s3).style.backgroundColor = "#46a842";
}
function change_color_grey(box, line) {
    const s3 = "line" + line.toString() + "box" + box.toString();
    document.getElementById(s3).style.backgroundColor = "#5f6870";
}
function change_color_yellow(box, line) {
    const s3 = "line" + line.toString() + "box" + box.toString();
    document.getElementById(s3).style.backgroundColor = "#c1cc5c";
}

function victory_screen() {
    var vc_screen = document.getElementById("vc_screen");
    vc_screen.style.display = "block";
    window.onclick = function(event) {
        if (event.target == vc_screen) {
          vc_screen.style.display = "none";
        }
    }
}

function flip_animate(line) {
    for(var box = 0; box < 5; box++) {
        const s = "line" + line.toString() + "box" + box.toString();
        document.getElementById(s).style.transform = "rotateY(360deg)";
        document.getElementById(s).style.transition = "1s";
    }
}

var modal = document.getElementById("myModal");

var btn = document.getElementById("setting");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
