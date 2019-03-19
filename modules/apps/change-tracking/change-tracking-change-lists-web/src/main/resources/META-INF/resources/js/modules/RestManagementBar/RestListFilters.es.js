import 'clay-dropdown';
import 'clay-sticker';
import {Config} from 'metal-state';
import ClayComponent from 'clay-component';
import Soy from 'metal-soy';

import templates from './RestListFilters.soy';

class RestListFilters extends ClayComponent {
	created() {
		let numOfChecked = 0;
		this.items.map(
			item => {
				if (item.checked === true) {
					numOfChecked++;
				}
			}
		)
		if (numOfChecked != 0){
			this.numOfChecked = numOfChecked.toString();
		}
		else {
			this.numOfChecked = '';
		}
	}
	willReceiveState(changes) {
		let numOfChecked = 0;
		this.items.map(
			item => {
				if (item.checked === true) {
					numOfChecked++;
				}
			}
		)
		if (numOfChecked != 0){
			this.numOfChecked = numOfChecked.toString();
		}
		else {
			this.numOfChecked = '';
		}
	}
    _handleFilterItemClick(event) {
        return !this.emit({
			data: event.data,
			name: 'filterItemClicked',
			originalEvent: event,
		});
	}
}

RestListFilters.STATE = {
	numOfChecked: Config.string().value(''),
	items: Config.any(),
    /**
	 * The path to the SVG spritemap file containing the icons.
	 * @default undefined
	 * @instance
	 * @memberof ClayLabel
	 * @type {?(string|undefined)}
	 */
	spritemap: Config.string().required(),
}

Soy.register(RestListFilters, templates);

export default RestListFilters;
export {RestListFilters};