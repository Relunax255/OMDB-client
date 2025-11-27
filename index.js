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
  let results_list = [];
  let searching = false;
  
  function search(searchparams) { //obj
    if (searching) {return;}
    searching=true;
    DIV_SEARCHRESULTCONTAINER.innerHTML="";
    DIV_SEARCHRESULTCONTAINER.innerText="Caricamento";
    let url = fixed_url;
    url+= "apikey=" + searchparams.apiKey + "&";
    url+= searchparams.searchType + "=" + encodeURIComponent(searchparams.searchString);
    if (Number(searchparams.page)!=null&& Number(searchparams.page)>0)
      {url+="&page="+Number(searchparams.page);}
    fetch(url)

      .then(response => response.json())
      .then(data => {
        if (data.Response==="False") {
          DIV_SEARCHRESULTCONTAINER.innerText=data.Error + "\r\nProva a modificare i criteri di ricerca"; return;
        }
        switch (searchparams.searchType) {
          case "s":
           
            if (Number(data.totalResults)>10) {paged=true; pages=Math.ceil(data.totalResults/10);}
            else {paged=false; pages=1;}
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
              item.addEventListener("click", () => openModal(itemData.imdbID))
              item.appendChild(title);
              DIV_SEARCHRESULTCONTAINER.appendChild(item);
              results_list.push(itemData);
            });

            break;
          case "t":

            break;
          case "i":
            //single result
            pages=1;
            paged=false;
            const item = document.createElement("div");
            item.className = "item";
            let img = document.createElement("img");
            img.onerror = function() {
                this.src = "img/image_alt.png";
              }
            img.src = data.Poster;
            item.appendChild(img);
            let title = document.createElement("div");
            title.innerText = data.Title + " (" + data.Year + ")";
            item.appendChild(title);    
            DIV_SEARCHRESULTCONTAINER.appendChild(item);
            break;
        }
        SPAN_CURRENTPAGENUMBER.innerText = paged ? searchparams.page : "1";
        SPAN_TOTALPAGESNUMBER.innerText = paged ? pages : "1";
      })
      .catch(error => {
        alert("Errore durante la richiesta: " + error); return;
      });
      DIV_SEARCHRESULTCONTAINER.innerText="";
      searching=false;
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
    if (!paged) {return;}
    let params = globally_visible_searchparams
    if (params.page<=1) {return;}
    params.page=1;
    globally_visible_searchparams=params;
    search(params);
  });
  BUTTON_PAGELEFT.addEventListener("click", () => {
    if (!paged) {return;}
    let params=globally_visible_searchparams;
    if (params.page<=1) {return;}
    params.page=params.page-1;
    globally_visible_searchparams = params;
    search(params);
  });

  BUTTON_PAGERIGHT.addEventListener("click", () => {
    if (!paged) {return;}
    let params=globally_visible_searchparams;
    if (params.page>=pages) {return;}
    params.page=params.page+1;
    globally_visible_searchparams = params;
    search(params);z
  });

  BUTTON_PAGEXRIGHT.addEventListener("click", () => {
    if (!paged) {return;}
    let params=globally_visible_searchparams;
    if (params.page>=pages) {return;}
    params.page=pages;
    globally_visible_searchparams = params;
    search(params);
  });
  const filmModal = document.getElementById("filmModal");
  const modalPoster = document.getElementById("modalPoster");
  const modalTitle = document.getElementById("modalTitle");
  const modalYear = document.getElementById("modalYear");
  const modalContent = document.getElementById("modalContent");
  const modalImdb = document.getElementById("modalImdb");
  const modalClose = document.getElementById("modalClose");
  const modalRating = document.getElementById("modalRating");

  function openModal(id) {
      
      let url = fixed_url + "apikey=" + TEXTINPUT_APIKEY.value + "&i=" + id;
      fetch(url)
      .then(response => response.json())
      .then(data => {
          modalTitle.innerText = data.Title;
          modalYear.innerText = data.Year;
          if (data.Plot==="N/A") {
              modalContent.innerText = "Trama non disponibile.";
          }
          else {modalContent.innerText = data.Plot;}
          modalImdb.innerText = data.imdbID; 
          if (data.imdbRating==="N/A")
              modalRating.innerText = "Non disponibile";
          else
              modalRating.innerText = data.imdbRating + "/10";
          modalPoster.onerror = function() {
              this.src = "img/image_alt.png";
            }
          modalPoster.src = data.Poster;
      })
      .catch(error => {
          alert("Errore durante la richiesta: " + error); return;
      });
      filmModal.style.display = "flex";
  }

  modalClose.addEventListener("click", () => {
      filmModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
      if (e.target === filmModal) filmModal.style.display = "none";
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        BUTTON_SEARCH.click();
    }
  });
})
