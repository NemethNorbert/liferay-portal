import 'clay-dropdown';
import {Config} from 'metal-state';
import ClayComponent from 'clay-component';
import Soy from 'metal-soy';

import templates from './RestFiltersBar.soy';

class RestFiltersBar extends ClayComponent {
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

export default RestFiltersBar;
export {RestFiltersBar};