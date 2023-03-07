const mainElement = document.getElementsByClassName("main");
const mainHeader = document.createElement("p");
const textNode = document.createTextNode("Hello World From Order Status");
mainHeader.appendChild(textNode);
mainElement[0].insertBefore(mainHeader, mainElement[0].children[0]);
