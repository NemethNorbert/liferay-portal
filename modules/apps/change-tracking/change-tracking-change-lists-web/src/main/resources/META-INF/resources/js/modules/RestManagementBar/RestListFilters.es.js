import 'clay-dropdown';
import {Config} from 'metal-state';
import ClayComponent from 'clay-component';
import Soy from 'metal-soy';

import templates from './RestListFilters.soy';

class RestListFilters extends ClayComponent {
    _handleFilterItemClick(event) {
        return !this.emit({
			data: event.data,
			name: 'filterItemClicked',
			originalEvent: event,
		});
    }
}

RestListFilters.STATE = {
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