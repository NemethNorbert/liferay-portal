import Component from 'metal-component';
import Soy from 'metal-soy';
import {Config} from 'metal-state';

import templates from './GlanceCardHeader.soy';


/**
 * Component that creates an instance of Ace editor
 * to allow code editing.
 * @review
 */
class GlanceCardHeader extends Component {}


GlanceCardHeader.STATE = {};

Soy.register(GlanceCardHeader, templates);

export {GlanceCardHeader};
export default GlanceCardHeader;