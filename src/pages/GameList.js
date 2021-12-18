import Page from './Page';
import GameThumbnail from '../components/GameThumbnail';
import Router from '../Router';
import {addEventFavButton} from './GamesFav';
import {hideLoader, showLoader} from '../Loader.js'
let config = require('../../tokenconfig.json')

export default class GameList extends Page {
	#games;
	searchQuery;
	sortByGenreQuery;
	orderingQuery;

	constructor(games) {
		super('gameList');
		this.games = games;
	}

	set games(value) {
		this.#games = value;
		this.children = this.#games.map(game => new GameThumbnail(game));
	}

	mount(element) {
		document.querySelector('.searchBar').style.display='';

		super.mount(element);
		const api = 'https://api.rawg.io/api/games';
		const metacritic = 'metacritic=50,100';

		const today = new Date();
		let query = `dates=2020-01-01,${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
		
		if(this.searchQuery != null)
			query += this.searchQuery;
		
		if(this.sortByGenreQuery != null)
			query += this.sortByGenreQuery;
		
		if(this.orderingQuery != null)
			query += this.orderingQuery;
		
		let auth = ''
		if(config.token.length == 32){
			auth = `&key=${config.token}`
		}

		showLoader();
		fetch(`${api}?${query}&${metacritic}${auth}`)
			.then(response => response.json())
			.then(data => {
				hideLoader();
				this.games = data.results;
				element.innerHTML = this.render();
				const gameLinks = document.querySelectorAll('.gameLink');
				gameLinks.forEach(lien => {
					lien.addEventListener('click', event => {
						event.preventDefault();
						Router.navigate(lien.getAttribute('href'), true);
					})
				})
			})
			.then( e => {
				addEventFavButton();
			});
	}

	changeApiRequest(searchResult) {
		if(searchResult === null)
			this.searchQuery = null;
		else
			this.searchQuery = `&search=${searchResult}`;
	}

	changeGenre(genre) {
		if(genre === null)
			this.sortByGenreQuery = null;
		else
			this.sortByGenreQuery = `&genres=${genre}`;
	}

	changeOrderingQuery(ordering) {
		if(ordering === null)
			this.orderingQuery = null;
		else
			this.orderingQuery = `&ordering=${ordering}`;
	}

	
}
