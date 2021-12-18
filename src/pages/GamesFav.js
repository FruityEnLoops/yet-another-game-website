import Page from './Page';
import GameThumbnail from '../components/GameThumbnail';
import Router from '../Router';
import {hideLoader, showLoader} from '../Loader.js'
let config = require('../../tokenconfig.json')

export default class GamesFav extends Page {
    #gamesFav = [];
    
    constructor() {
        super('gameList');
    }

    set gamesFav(value) {
        this.#gamesFav = value;
		this.children = this.#gamesFav.map(game => new GameThumbnail(game));
    }

    mount(element) {
        this.gamesFav = [];
        super.mount(element);
                
        let favs = JSON.parse(localStorage.getItem('favoris'));
        
        let auth = ''
		if(config.token.length == 32){
			auth = `?key=${config.token}`
		}

        if(favs == null || favs.length == 0){
            element.innerHTML = `<h2 class="empty">Vous n'avez pas de favoris... Allez en ajouter!</h2>`;
            return;
        }
        
        favs.forEach(slug => {
            showLoader();
            return fetch(`https://api.rawg.io/api/games/${slug}${auth}`)
                .then(response => response.json())
                .then(data => {
                    this.gamesFav = [...this.#gamesFav, data];
                    element.innerHTML = this.render();
                    
                    const gameLinks = document.querySelectorAll('.gameLink');
                    gameLinks.forEach(lien => {
                        lien.addEventListener('click', event => {
                            event.preventDefault();
                            Router.navigate(lien.getAttribute('href'), true);
                        })
                    })
                    hideLoader();

                })
                .then(e => {
                    addEventFavButton()
                });
        });
    }
}



function addEventFavButton() {
    document.querySelectorAll('.favButton').forEach(
        button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
                
                let favoris = JSON.parse(localStorage.getItem('favoris'));
                let slug = button.getAttribute('alt');
                
                
                if (favoris != null) {
                    if (favoris.includes(slug)) {
                        favoris.splice(favoris.indexOf(slug), 1);
                        alert(`${slug} a été retiré de vos favoris`);
                    }
                    else {
                        favoris.push(slug);
                        alert(`Vous avez ajouté ${slug} à vos favoris`);
                    }
                }
                else{
                    favoris = [slug];
                    alert(`Vous avez ajouté ${slug} à vos favoris`);
                }
                
                localStorage.setItem("favoris", JSON.stringify(favoris));
                
            	Router.navigate(document.location.pathname, false);

            });
        }
    )
}

export {addEventFavButton};