window.addEventListener("load", event => {
  const SEARCHRESULTCONTAINER = document.getElementById("searchresult");
  const SELECT_SELECTTYPE = document.getElementById("selecttype");
  const TEXTINPUT_SEARCH = document.getElementById("searchstring");
  const BUTTON_SEARCH = document.getElementById("searchbutton");


    const items = [
      { img: "https://via.placeholder.com/100", text: "Item One" },
      { img: "https://via.placeholder.com/100", text: "Item Two" },
      { img: "https://via.placeholder.com/100", text: "Item Three" },
      { img: "https://via.placeholder.com/100", text: "Item Three" },
      { img: "https://via.placeholder.com/100", text: "Item Three" },
      { img: "https://via.placeholder.com/100", text: "Item Three" },
      { img: "https://via.placeholder.com/100", text: "Item Three" },
      { img: "https://via.placeholder.com/100", text: "Item Three" },
      { img: "https://via.placeholder.com/100", text: "Item Three" },
      { img: "aaa.webp", text: "Item Three" }
      
    ];
    

    items.forEach(data => {
      const item = document.createElement("div");
      item.className = "item";
    
      item.innerHTML = `
        <img src="${data.img}" alt="item image">
        <div>${data.text}</div>
      `;
    
      SEARCHRESULTCONTAINER.appendChild(item);
    });
})
