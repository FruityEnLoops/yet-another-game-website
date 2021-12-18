import Component from './Component.js';

export default class Screenshots extends Component {
	constructor(screens) {
		super('div', { name: 'class', value: 'screenshots bgwrapper' }, screens);
	}
}