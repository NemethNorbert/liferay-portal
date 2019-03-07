import './RestFilterLabel.es';
import 'clay-button';
import 'clay-label';
import 'clay-link';
import {Config} from 'metal-state';
import ClayComponent from 'clay-component';
import Soy from 'metal-soy';

import {filterLabelsValidator} from './validators.es';

import templates from './RestResultsBar.soy';

/**
 * Metal RestResultsBar component.
 * @extends ClayComponent
 */
class RestResultsBar extends ClayComponent {
	/**
	 * Continues the propagation of the clear button clicked event
	 * @param {!Event} event
	 * @private
	 * @return {Boolean} If the event has been prevented or not.
	 */
	_handleClearResultsClick(event) {
		return !this.emit({
			name: 'clearButtonClicked',
			originalEvent: event,
		});
	}

	/**
	 * Continues the propagation of the filter label close clicked event
	 * @param {!Event} event
	 * @private
	 * @return {Boolean} If the event has been prevented or not.
	 */
	_handleFilterLabelCloseClicked(event) {
		return !this.emit({
			data: {
				label: this.filterLabels[event.target.data.labelId],
			},
			name: 'filterLabelCloseClicked',
			originalEvent: event,
		});
	}
}

/**
 * State definition.
 * @static
 * @type {!Object}
 */
RestResultsBar.STATE = {
	/**
	 * Url for clear results link.
	 * @default undefined
	 * @instance
	 * @memberof RestResultsBar
	 * @type {?(string|undefined)}
	 */
	clearResultsURL: Config.string(),

	/**
	 * Data to add to the element.
	 * @default undefined
	 * @instance
	 * @memberof RestResultsBar
	 * @type {?object}
	 */
	data: Config.object(),

	/**
	 * List of filter label items.
	 * @default undefined
	 * @instance
	 * @memberof RestResultsBar
	 * @type {?(array|undefined)}
	 */
	filterLabels: filterLabelsValidator.required(),

	/**
	 * Value of the search input.
	 * @default undefined
	 * @instance
	 * @memberof RestResultsBar
	 * @type {?(string|undefined)}
	 */
	searchValue: Config.string(),

	/**
	 * The path to the SVG spritemap file containing the icons.
	 * @default undefined
	 * @instance
	 * @memberof RestResultsBar
	 * @type {?(string|undefined)}
	 */
	spritemap: Config.string().required(),

	/**
	 * Total number of items. If totalItems is 0 most of the elements in the bar
	 * will appear disabled.
	 * @default undefined
	 * @instance
	 * @memberof RestResultsBar
	 * @type {!number}
	 */
	totalItems: Config.number().required(),
};

Soy.register(RestResultsBar, templates);

export {RestResultsBar};
export default RestResultsBar;