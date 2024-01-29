let container = []

// get data from local storage 
if(JSON.parse(localStorage.getItem("data"))){
    container.push(...JSON.parse(localStorage.getItem("data")))
    console.log(JSON.parse(localStorage.getItem("data")).length);
    for(let i =0 ; i<JSON.parse(localStorage.getItem("data")).length;i++){
        let formsNumber = document.querySelector(".container__form");
        console.log(JSON.parse(localStorage.getItem("data"))[i]);
        let formReturnedData = `
        <div class="container__form__item" data-id=${i}>
            <span class="form_id">${i + 1}</span>
            <input type="color" value=${JSON.parse(localStorage.getItem("data"))[i].color} class="colorBox" oninput = "changeColor(this,this.value)">
            <input type="text" placeholder="Key" value=${JSON.parse(localStorage.getItem("data"))[i].key} oninput = "changeKey(this,this.value)">
            <input type="text" placeholder="Enter text" value=${JSON.parse(localStorage.getItem("data"))[i].text} oninput = "changeText(this,this.value)">
            <input type="number" min="1" max="100" value=${JSON.parse(localStorage.getItem("data"))[i].fontSize} oninput = "changingFontSize(this,this.value)">
            <select id="input" class="fontFamilyBox" onchange="changingFontStyle(this,this.value);">
                <option value="Times New Roman" selected="selected">Times New Roman</option>
                <option value="Arial">Arial</option>
                <option value="fantasy">Fantasy</option>
                <option value="cursive">cursive</option>
            </select>
            <button class="delete_form" onclick = "deleteFormHandler(this)">Delete</button>
        </div>
        `
        let pargraph = `
        <p data-id=${i} class="par" onmousedown = "drag(this)" style="top:${JSON.parse(localStorage.getItem("data"))[i].x};left:${JSON.parse(localStorage.getItem("data"))[i].y};z-index:1000;font-size:${JSON.parse(localStorage.getItem("data"))[i].fontSize+"px"};font-family:${JSON.parse(localStorage.getItem("data"))[i].fontFamily}">${JSON.parse(localStorage.getItem("data"))[i].text}</p>
        `;
        formsNumber.innerHTML +=formReturnedData
        document.querySelector(".container__texts").innerHTML += pargraph;
    }
}


// add new form

document.querySelector(".add_form").addEventListener("click", () => {
    let formsNumber = document.querySelector(".container__form");
    let id = formsNumber.children.length;
    if(formsNumber.children.length < 4) {
        let formData = `
        <div class="container__form__item" data-id=${id}>
            <span class="form_id">${id + 1}</span>
            <input type="color" value="#8F0000" class="colorBox" oninput = "changeColor(this,this.value)">
            <input type="text" placeholder="Key" oninput = "changeKey(this,this.value)">
            <input type="text" placeholder="Enter text" oninput = "changeText(this,this.value)">
            <input type="number" min="1" max="100" value="1" oninput = "changingFontSize(this,this.value)">
            <select id="input" class="fontFamilyBox" onchange="changingFontStyle(this,this.value);">
                <option value="Times New Roman" selected="selected">Times New Roman</option>
                <option value="Arial">Arial</option>
                <option value="fantasy">Fantasy</option>
                <option value="cursive">cursive</option>
            </select>
            <button class="delete_form" onclick = "deleteFormHandler(this)">Delete</button>
        </div>
        `
let pargraph = `
<p data-id=${id} class="par" onmousedown = "drag(this)">Text</p>
`;
document.querySelector(".container__form").innerHTML += formData;
document.querySelector(".container__texts").innerHTML += pargraph;
container.push({
key:null,
text: "text",
color: "#8F0000",
fontFamily:"Arial",
fontSize:"30",
x: "475",
y: "180"
})
restore()
    }
});


function deleteFormHandler(element) {
    document.querySelectorAll(".par")[parseInt(element.parentElement.getAttribute("data-id"))].remove();
    container.splice(parseInt(element.parentElement.getAttribute("data-id")), 1);
    element.parentElement.remove();
    if (
        parseInt(element.parentElement.getAttribute("data-id")) !=
        document.querySelectorAll(".form_id").length
    ) {
        updateId(parseInt(element.parentElement.getAttribute("data-id")));
    }
}

// update id of (form and text)
function updateId(id) {
    let forms = document.querySelectorAll(".container__form__item");
    let formsId = document.querySelectorAll(".form_id");
    if (id == 0) {
        for (let i = 0; i < forms.length; i++) {
            forms[i].setAttribute("data-id", forms[i].getAttribute("data-id") - 1);
            formsId[i].innerHTML = formsId[i].innerHTML - 1;
            document
                .querySelectorAll(".par")
            [i].setAttribute(
                "data-id",
                document.querySelectorAll(".par")[i].getAttribute("data-id") - 1
            );
        }
    } else {
        for (let i = id; i < forms.length; i++) {
            forms[i].setAttribute("data-id", forms[i].getAttribute("data-id") - 1);
            document
                .querySelectorAll(".par")
            [i].setAttribute(
                "data-id",
                document.querySelectorAll(".par")[i].getAttribute("data-id") - 1
            );
            formsId[i].innerHTML = formsId[i].innerHTML - 1;
        }
    }
}

// on change color change text color

function changeColor(element, val) {
    document.querySelectorAll(".par")[element.parentElement.getAttribute("data-id")].style.color = val
    container[parseInt(element.parentElement.getAttribute("data-id"))].color = val
}

function changingFontStyle(element, val) {
    document.querySelectorAll(".par")[element.parentElement.getAttribute("data-id")].style.fontFamily = val
    container[parseInt(element.parentElement.getAttribute("data-id"))].fontFamily = val
}

function changingFontSize(element, val) {
    document.querySelectorAll(".par")[element.parentElement.getAttribute("data-id")].style.fontSize = val + "px"
    container[parseInt(element.parentElement.getAttribute("data-id"))].fontSize = val
}

function changeKey(el, val) {
    container[parseInt(el.parentElement.getAttribute("data-id"))].key = val
}

function changeText(el, val) {
    document.querySelectorAll(".par")[
        el.parentElement.getAttribute("data-id")
    ].innerText = val;
    container[parseInt(el.parentElement.getAttribute("data-id"))].text = val
}

function restore(){
    if(container.length != 0) {
        let forms = document.querySelectorAll(".container__form__item")
        for(let i =0 ; i < forms.length ; i++){
            forms[i].children[1].value = container[i].color
            forms[i].children[2].value = container[i].key
            forms[i].children[3].value = container[i].text
            forms[i].children[4].value = container[i].fontSize

            // set form font family from cotainer object
            for(let j =0 ; j < forms[i].children[5].children.length ; j++)
            {
                if(forms[i].children[5].children[j].hasAttribute("selected"))
                    forms[i].children[5].children[j].removeAttribute("selected")
                if(forms[i].children[5].children[j].value==container[i].fontFamily)
                    forms[i].children[5].children[j].setAttribute("selected",selected)
            }
        }
    }
}


// draggable text

var selected = null, // Object of the element to be moved
    x_pos = 0,
    y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0,
    y_elem = 0; // Stores top, left values (edge) of the element
// Will be called when user starts dragging an element
let target_element = ``
// Will be called when user dragging an element
function _move_elem(e) {
    x_pos = window.all ? window.event.clientX : e.pageX;
    y_pos = window.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = x_pos - x_elem + "px";
        selected.style.top = y_pos - y_elem + "px";
        console.log(selected.style.left,selected.style.top);
        container[parseInt(target_element.getAttribute("data-id"))].y = selected.style.left
        container[parseInt(target_element.getAttribute("data-id"))].x = selected.style.top
    }
}


function _drag_init(elem) {
    // Store the object of the element which needs to be moved
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
    target_element = elem
}

// Destroy the object when we are done
function _destroy() {
    selected = null;
}

// Bind the functions...
function drag(el){
    _drag_init(el);
    return false;
}

document.querySelector(".container__image").onmousemove = _move_elem;
document.querySelector(".container__image").onmouseup = _destroy;

document.querySelector(".getData__btn").addEventListener('click',()=>{
    for(let i =0 ; i < container.length;i++)
    {
        console.log(container[i].key);
        if(container[i].key != null)
        {
            let myJsonString = JSON.stringify(container);
            // store in localStorage
            localStorage.setItem("data",myJsonString);
            console.log(myJsonString);
        }
        else {
            console.log("Key is required");
            console.log(container);
        }
    }
    
})