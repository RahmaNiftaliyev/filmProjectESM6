const form = document.getElementById("film-form") ; 
const titleELement = document.querySelector("#title") ; 
const directorElement = document.querySelector("#director") ; 
const urlElement = document.querySelector("#url") ; 
const cardbody = document.querySelectorAll(".card-body")[1] ; 
const clear = document.getElementById("clear-films")


//UI obyektini baslatmaq ve onnan yeni obyekt toretmek

const ui = new UI() ; 
//Storage obyektini baslatmaq ve onnan yeni obyekt toretmek

const storage = new Storage() ; 


//EventListenerler


eventListeners() ; 


function eventListeners(){
    form.addEventListener("submit",addFilm) ; 
    document.addEventListener("DOMContentLoaded",function(){
            let films = storage.getFilmsFromStorage() ; 
            ui.loadAllFilms(films) ; 
    }) ; 

    cardbody.addEventListener("click",deleteFilm) ; 
    clear.addEventListener("click",clearAllFilms)
}


function addFilm(e){
    const title = titleELement.value ; 
    const director = directorElement.value ; 
    const url = urlElement.value ; 

    if(title === "" || director === "" || url === ""){
        ui.displayMessages("inputlarin hamisini doldurun...","danger") ; 
    }
    else{

        //yeni film
        const newFilm = new Film(title,director,url)

        ui.addFilmToUI(newFilm) ; //interface film elave etme 
        storage.addFimlToStorage(newFilm) ; 
        ui.displayMessages("film ugurla elave edildi","success") ; 
    }


    ui.clearInputs(titleELement,directorElement,urlElement) ; 

    e.preventDefault() ; 
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFlimFromUI(e.target) ; 
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent) ; 
        ui.displayMessages("silme ugurla tamamlandi","success") ; 
    }

    e.preventDefault() ; 
}

function clearAllFilms(){

    if(confirm("butun filmleri silmek isdediyinize eminmisiniz")){
        ui.clearAllFilmsFromUI() ;
        storage.clearAllfilmsFromStorage() ;
    }

}