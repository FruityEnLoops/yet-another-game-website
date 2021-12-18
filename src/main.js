import Router from './Router';
import GameList from './pages/GameList';
import GameDetail from './pages/GameDetail';
import GamesFav from './pages/GamesFav';


const gameList = new GameList([]),
	detailJeu = new GameDetail(),
	gamesFav = new GamesFav();

Router.titleElement = document.querySelector('.pageTitle');
Router.contentElement = document.querySelector('.pageContent');
Router.menuElement = document.querySelector('.mainMenu');
Router.routes = [
	{ path: '/', page: gameList, title: 'Les jeux' },
	{ path: '/detail', page: detailJeu, title: 'Detail du jeu' },
	{ path: '/mes-favoris', page: gamesFav, title: 'Mes Favoris' },
];

document.querySelector(
	'.logo'
).innerHTML += `<small>le gaming plus qu'une passion</small>`;

let input = "";
fetch('https://api.rawg.io/api/genres')
	.then(response => response.json())
	.then(data => {
		data.results.forEach(genre => {
			input += `<option value=\"${genre.slug}\">${genre.name}</option>`;
		})
		document.querySelector('.genres').innerHTML += input;
	});

document.querySelector('.genres').addEventListener('change', event => {
	event.preventDefault();
	const select = document.querySelector('.genres');
	if(select.value == '') 
		gameList.changeGenre(null);
	else 
		gameList.changeGenre(select.value);
	Router.navigate(document.location.pathname, false);
})
		
document.querySelector('.sort').addEventListener('change', event => {
	event.preventDefault();
	const select = document.querySelector('.sort');
	if(select.value == '')
		gameList.changeOrderingQuery(null);
	else
		gameList.changeOrderingQuery(select.value);
	Router.navigate(document.location.pathname, false);
})

window.onpopstate = () => Router.navigate(document.location.pathname, false);
window.onpopstate();

let btn = document.getElementById('searchBtn');

btn.addEventListener('click', event => {
	event.preventDefault();
	let input = document.getElementById("searchValue").value;
	console.log(input)
	if(input == '') input = null;
	gameList.changeApiRequest(input);
	Router.navigate(document.location.pathname, false);
});