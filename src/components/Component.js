export default class Component {
	tagName;
	attribute;
	children;

	constructor(tagName, attribute, children) {
		this.tagName = tagName;
		this.attribute = attribute;
		this.children = children;
	}

	render() {
		let html = `<${this.tagName} ${this.renderAttributes()}`;
		if (this.children) {
			html += `>${this.renderChildren()}</${this.tagName}>`;
		} else {
			html += ' />';
		}
		return html;
	}

	renderAttributes() {
		let result = '';
		if (this.attribute) {
			if(this.attribute instanceof Array) {
				for(let atr in this.attribute) {
					result += `${this.attribute[atr].name}="${this.attribute[atr].value}" `;
				}
			} else {
				result += `${this.attribute.name}="${this.attribute.value}"`;
			}
		}
		return result;
	}

	renderChildren() {
		if (this.children instanceof Array) {
			return this.children.reduce(
				(html, child) =>
					html + (child instanceof Component ? child.render() : child),
				''
			);
		}
		return this.children || '';
	}
}
