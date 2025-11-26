window.addEventListener("load", event => {
  const DIV_SEARCHRESULTCONTAINER = document.getElementById("searchresult");
  const SELECT_SELECTTYPE = document.getElementById("selecttype");
  const TEXTINPUT_SEARCH = document.getElementById("searchstring");
  const BUTTON_SEARCH = document.getElementById("searchbutton");
  const TEXTINPUT_APIKEY = document.getElementById("apikey");
  const SPAN_APIKEYMESSAGE = document.getElementById("apikeymessage");
  const SPAN_SEARCHMESSAGE = document.getElementById("searchmessage");

  const BUTTON_PAGEXLEFT = document.getElementById("pagexleft");
  const BUTTON_PAGELEFT = document.getElementById("pageleft");
  const BUTTON_PAGERIGHT = document.getElementById("pageright");
  const BUTTON_PAGEXRIGHT = document.getElementById("pagexright");
  const SPAN_CURRENTPAGENUMBER = document.getElementById("currentpagenumber");
  const SPAN_TOTALPAGESNUMBER = document.getElementById("totalpagesnumber");
  let paged = false;
  let globally_visible_searchparams = null;
  let pages = 0;
  const fixed_url  = "http://www.omdbapi.com/?"
  
  function search(searchparams) { //obj
    DIV_SEARCHRESULTCONTAINER.innerHTML="";
    let url = fixed_url;
    url+= "apikey=" + searchparams.apiKey + "&";
    url+= searchparams.searchType + "=" + encodeURIComponent(searchparams.searchString);
    if (Number(searchparams.page)!=null&& Number(searchparams.page)>0)
      {url+="&page="+Number(searchparams.page);}
    fetch(url)

      .then(response => response.json())
      .then(data => {
        //data is an object
        if (data.Response==="False") {
          DIV_SEARCHRESULTCONTAINER.innerText=data.Error + "\r\nProva a modificare i criteri di ricerca"; return;
        }
        switch (searchparams.searchType) {
          case "s":
           
            if (Number(data.totalResults)>10) {paged=true; pages=Math.ceil(data.totalResults/10);}
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
              title.style.margin="7px";
              title.innerText = itemData.Title + " (" + itemData.Year + ")";
              item.appendChild(title);
              
              DIV_SEARCHRESULTCONTAINER.appendChild(item);
            });

            break;
          case "t":

            break;
          case "i":
            //single result
            paged=false;
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
        alert("Errore durante la richiesta: " + error); return;
      });
  }

  BUTTON_SEARCH.addEventListener("click", () => {
    let apiKey = TEXTINPUT_APIKEY.value;
    if (apiKey === "") {
      SPAN_APIKEYMESSAGE.innerText = "inserire una chiave (api key) valida."; return;
    } else SPAN_APIKEYMESSAGE.innerText = "";

    let searchString = TEXTINPUT_SEARCH.value;
    if (searchString==="") {
      SPAN_SEARCHMESSAGE.innerText = "inserire una stringa di ricerca."; return;
    } else SPAN_SEARCHMESSAGE.innerText = "";

    let searchType = SELECT_SELECTTYPE.value;
    if (searchType=="")  {searchType="s"; }
    let searchparams = { searchType: searchType,
      searchString: searchString,
      apiKey: apiKey,
      page: 1
    };
    globally_visible_searchparams = searchparams;
    search(searchparams);
    
  });

  BUTTON_PAGEXLEFT.addEventListener("click", () => {
    if (!paged) return;
    let params = globally_visible_searchparams
    params.page=1;
    globally_visible_searchparams=params;
    search(params);
  });
  BUTTON_PAGELEFT.addEventListener("click", () => {

  });

  BUTTON_PAGERIGHT.addEventListener("click", () => {
    if (!paged) {return;}
    let params=globally_visible_searchparams;
    params.page=params.page+1;
    globally_visible_searchparams = params;
    search(params);
  });

  BUTTON_PAGEXRIGHT.addEventListener("click", () => {

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
