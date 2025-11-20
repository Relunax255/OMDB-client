window.addEventListener("load", event => {
    const SEARCHRESULTCONTAINER = document.getElementById("searchresult");
    const SELECT_SELECTTYPE = document.getElementById("selecttype");
    const TEXTINPUT_SEARCH = document.getElementById("searchstring");
    const BUTTON_SEARCH = document.getElementById("searchbutton");

    for (let i = 1; i <= 10; i++) {  // fewer than 10 items
      const item = document.createElement("div");
      item.textContent = "Item " + i;
      SEARCHRESULTCONTAINER.appendChild(item);
    } 
})
