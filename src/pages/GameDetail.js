import Component from '../components/Component';
import Img from '../components/Img';
import Screenshots from '../components/Screenshots';
import UniqueGameThumbnail from '../components/UniqueGameThumbnail';
import Page from './Page';
import {addEventFavButton} from './GamesFav';
import {hideLoader, showLoader} from '../Loader.js'

export default class GameDetail extends Page {

    constructor(jeu) {
        super('gameDetails');
        if(jeu != undefined) {
            this.jeu = jeu;
        }
    }
    
    set jeu(value) {
        this.children = [new UniqueGameThumbnail(value)];
    }
    
    mount(element) {
        super.mount(element);
        const pathname = window.location.pathname;
        const slug = pathname.substring(8, pathname.length);
        showLoader();
        fetch(`https://api.rawg.io/api/games/${slug}`)
            .then(response => response.json())
            .then(data => {
                this.jeu = data;
                element.innerHTML = this.render();
                hideLoader();
            }).then(() => {
                fetch(`https://api.rawg.io/api/games/${slug}/screenshots`)
                    .then(response => response.json())
                    .then(data => {
                        element.innerHTML += new Screenshots(data.results.map(result => 
                            new Component('a', { name: 'href', value: result.image }, [
                                new Img(result.image)
                            ]))).render();
                    addEventFavButton()

                    })
            }).catch(function() {
                hideLoader();
                element.innerHTML = `<h2 class="unknown">Ce jeu n'existe pas...</h2>`
                return;
            })
    }

}
