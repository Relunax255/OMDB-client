window.addEventListener("load", event => {
  const DIV_SEARCHRESULTCONTAINER = document.getElementById("searchresult");
  const SELECT_SELECTTYPE = document.getElementById("selecttype");
  const TEXTINPUT_SEARCH = document.getElementById("searchstring");
  const BUTTON_SEARCH = document.getElementById("searchbutton");
  const TEXTINPUT_APIKEY = document.getElementById("apikey");
  const SPAN_APIKEYMESSAGE = document.getElementById("apikeymessage");
  const SPAN_SEARCHMESSAGE = document.getElementById("searchmessage");
  BUTTON_SEARCH.addEventListener("click", event => {
    let searchType = SELECT_SELECTTYPE.value;
    let searchString = TEXTINPUT_SEARCH.value;
    let apiKey = TEXTINPUT_APIKEY.value;
    if (apiKey === "") {
      SPAN_APIKEYMESSAGE.innerText = "inserire una chiave (api key) valida."; return;
    } else SPAN_APIKEYMESSAGE.innerText = "";
    if (searchString==="") {
      SPAN_SEARCHMESSAGE.innerText = "inserire una stringa di ricerca."; return;
    } else SPAN_SEARCHMESSAGE.innerText = "";
    if (searchType=="")  {searchType="s"; }
    let url = "http://www.omdbapi.com/?";
    url+= "apikey=" + apiKey + "&";
    url+= searchType + "=" + encodeURIComponent(searchString);
    fetch(url)

      .then(response => response.json())
      .then(data => {
        //data is an object
        if (data.Response==="False") {
          DIV_SEARCHRESULTCONTAINER.innerText=data.Error + "\r\nProva a modificare i criteri di ricerca"; return;
        }
        switch (searchType) {
          case "s":
            DIV_SEARCHRESULTCONTAINER.innerHTML="";
            data.Search.forEach(itemData => {
              const item = document.createElement("div");
              item.className = "item";
              let img = document.createElement("img");
              img.onerror = function() {
                this.src = "img/image_alt.png";
              }
              img.src = itemData.Poster;
              
              item.appendChild(img);
              let title = document.createElement("div");
              title.innerText = itemData.Title + " (" + itemData.Year + ")";
              item.appendChild(title);
              
              DIV_SEARCHRESULTCONTAINER.appendChild(item);
            });

            break;
          case "t":

            break;
          case "i":
            //single result

            const item = document.createElement("div");
            item.className = "item";
            let img = document.createElement("img");
            img.src = data.Poster;
            item.appendChild(img);
            let title = document.createElement("div");
            title.innerText = data.Title + " (" + data.Year + ")";
            item.appendChild(title);    
            DIV_SEARCHRESULTCONTAINER.appendChild(item);
            
            break;
        }
      })
      .catch(error => {
        alert("Errore durante la richiesta:" + error); return;
      });
  });
/*
    const items = [
      { img: "https://via.placeholder.com/100", text: "Item One" }
    ];
    

    items.forEach(data => {
      const item = document.createElement("div");
      item.className = "item";
    
      item.innerHTML = `
        <img src="${data.img}" alt="item image">
        <div>${data.text}</div>
      `;
    
      DIV_SEARCHRESULTCONTAINER.appendChild(item);
    }); */
})
