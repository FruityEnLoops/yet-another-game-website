import Component from './Component.js';
import Img from './Img.js';

export default class GameThumbnail extends Component {
	constructor(game) {
		let favs = JSON.parse(localStorage.getItem('favoris'));
		if(favs == null){
			favs = [];
		}
		let favButton = "Ajouter aux favoris";
		if(favs.includes(game.slug)){
			favButton = "Enlever des favoris";
		}
		super('article', { name: 'class', value: 'gameThumbnail' }, [
			new Component('a', [{ name: 'href', value: `/detail-${game.slug}` }, { name: "class", value: "gameLink"}], [ 
				new Img(game.background_image),
				new Component('section', null, [
					new Component('h4', null, game.name),
					new Component('p', null, `Note metacritic : ${game.metacritic}`),
					new Component('button', [{name:'class', value:'favButton'}, {name:'alt', value:`${game.slug}`}], `${favButton}`),
				]),
			]),
		]);
	}
}

