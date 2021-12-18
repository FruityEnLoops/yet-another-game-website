export default class Router {
	static titleElement;
	static contentElement;
	static #menuElement;

	static routes = [];

	/**
	 * Indique au Router la balise HTML contenant le menu de navigation
	 * Écoute le clic sur chaque lien et déclenche la méthode navigate
	 * @param element Élément HTML de la page qui contient le menu principal
	 */
	static set menuElement(element) {
		this.#menuElement = element;
		const links = element.querySelectorAll('a');
		links.forEach(link =>
			link.addEventListener('click', event => {
				event.preventDefault();
				this.navigate(event.target.getAttribute('href'));
			})
		);
	}
	/**
	 * Navigue dans l'application
	 * Affiche la page correspondant à `path` dans le tableau `routes`
	 * @param {String} path URL de la page courante
	 * @param {Boolean} pushState active/désactive le pushState (ajout d'une entrée dans l'historique de navigation)
	 */
	static navigate(path, pushState = true) {
		// on reset le display de la searchBar sur chaque nouvelle page
		document.querySelector('.searchBar').style.display='none';

		let route = this.routes.find(route => route.path === path);
		if(route == undefined) {
			if(path.startsWith('/detail-')) {
				route = this.routes.find(route => route.title == 'Detail du jeu');
				route.path = path;
			}
		}
		if (route) {
			if (pushState) {
				window.history.pushState(null, null, path);
			}
			this.titleElement.innerHTML = `<h1>${route.title}</h1>`;
			this.contentElement.innerHTML = route.page.render();
			route.page.mount?.(this.contentElement);
			// gestion menu (classe "active")
			const menuLink = this.#menuElement.querySelector(
					`a[href="${route.path}"]`
				),
				prevActiveLink = this.#menuElement.querySelector('a.active');
			prevActiveLink?.classList.remove('active');
			menuLink?.classList.add('active');
		}
	}
}
