var line = 1;
var box = 1;
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
                        line++;
                        box = 1;
                    }
                    break;
                case "Backspace" :
                    if(box > 1) box--;
                    const s1 = "line" + line.toString() + "box" + box.toString();
                    document.getElementById(s1).innerHTML = `<div></div><br />`;
                    document.getElementById(s1).style.border = "0.1px solid black";
                    document.getElementById(s1).style.margin = "4px";
                    break;
                default:
                    const s2 = "line" + line.toString() + "box" + box.toString();
                    const k = event.code.toUpperCase();
                    document.getElementById(s2).innerHTML +=`<div>${k.charAt(k.length-1)}</div><br />`;
                    document.getElementById(s2).style.border = "2px solid black";
                    document.getElementById(s2).style.margin = "2.44px";
                    if(box < 6) box++;
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
                            line++;
                            box = 1;
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

