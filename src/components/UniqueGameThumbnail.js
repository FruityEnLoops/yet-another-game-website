import Component from './Component.js';
import Img from './Img.js';

export default class UniqueGameThumbnail extends Component {
	constructor(game) {
		let favs = JSON.parse(localStorage.getItem('favoris'));
		if(favs == null){
			favs = [];
		}
		let favButton = "Ajouter aux favoris";
		if(favs.includes(game.slug)){
			favButton = "Enlever des favoris";
		}
		super('article', { name: 'class', value: 'UniqueGameThumbnail' }, [
			new Component('div',  {name: 'class', value: 'bgwrapper'}, [
				new Component('figure', {name: 'class', value: 'headimagewrapper'}, [
					new Img(game.background_image),
				]),
				new Component('section', {name:'class', value:'gameInfo'}, [
					new Component('h4', null, game.name),
					new Component('button', [{name:'class', value:'favButton'}, {name:'alt', value:`${game.slug}`}], `${favButton}`),
					new Component('p', null, game.description),
					new Component('p', null, `Note metacritic : ${game.metacritic}`),
					new Component('p', null, `Genres :${game.genres.map(genre =>  ' ' + genre.name)}`),
					new Component('p', null, `Plateformes :${game.platforms.map(platform => ' ' + platform.platform.name)}`),
					new Component('h2', null, 'Screenshots')
				]),
			]), 
		]);
	}
}