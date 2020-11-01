const socket = io();
let name;
let img;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

while (!name && !img) {
  name = prompt("Please enter your name: ");
  // img = prompt("Please enter your profile image url");
}

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    // image: img,
    message: message.trim(),
  };
  // Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("class", "py-0");
  let className = type;
  mainDiv.classList.add(className, "message");

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  // <img src=${msg.image} style="height:20px;width:20px;border-radius:50%;"/>
  let markup = `
        <h4>${msg.user}</h4>
        <div class="d-flex">
          <p class="mt-1">${msg.message}</p>
          <small class="mt-3 ml-4 mr-0 mb-0 text-muted">${formatAMPM(
            new Date()
          )}</small>
        </div>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve messages
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

// function randomColor() {
//   return (
//     "#" + ("00000" + ((Math.random() * 16777216) << 0).toString(16)).substr(-6)
//   );
// }
