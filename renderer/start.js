//launch Adobe Express app  when called
function launch() {
  location.href = "https://express.adobe.com/sp";
  localStorage.setItem("shouldPrompt", "no");
}

//this should run automaticaly if the user first launched the app or the time before this launch he selected to show next time
if (localStorage.getItem("shouldPrompt") === "no") {
  launch();
}

function showNextTime() {
  localStorage.setItem("shouldPrompt", "yes");
  location.href = "https://express.adobe.com/sp";
}
