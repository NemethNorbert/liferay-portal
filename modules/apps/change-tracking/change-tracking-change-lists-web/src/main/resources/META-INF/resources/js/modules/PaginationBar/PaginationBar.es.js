import {Config} from 'metal-state';
import ClayComponent from 'clay-component';
import Soy from 'metal-soy';

import templates from './PaginationBar.soy';

/**
 * Metal RestFilterLabel component.
 * @extends ClayComponent
 */
class PaginationBar extends ClayComponent {

}

/**
 * State definition.
 * @static
 * @type {!Object}
 */
PaginationBar.STATE = {

}

Soy.register(PaginationBar, templates);

export {PaginationBar};
export default PaginationBar;