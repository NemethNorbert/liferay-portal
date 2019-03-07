import 'clay-dropdown';
import './RestListFilters.es';
import {Config} from 'metal-state';
import ClayComponent from 'clay-component';
import Soy from 'metal-soy';

import templates from './RestFiltersBar.soy';

class RestFiltersBar extends ClayComponent {
	_handleItemClick(event) {
		return !this.emit({
			data: event.data,
			name: 'itemClicked',
			originalEvent: event,
		});
	}
}

RestFiltersBar.STATE = {
    /**
	 * The path to the SVG spritemap file containing the icons.
	 * @default undefined
	 * @instance
	 * @memberof ClayLabel
	 * @type {?(string|undefined)}
	 */
	spritemap: Config.string().required(),
}

Soy.register(RestFiltersBar, templates);

export default RestFiltersBar;
export {RestFiltersBar};