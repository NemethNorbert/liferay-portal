import Component from 'metal-component';
import Soy from 'metal-soy';
import {Config} from 'metal-state';

import templates from './GlanceCardBody.soy';


/**
 * Component that creates an instance of Ace editor
 * to allow code editing.
 * @review
 */
class GlanceCardBody extends Component {}


GlanceCardBody.STATE = {};

Soy.register(GlanceCardBody, templates);

export {GlanceCardBody};
export default GlanceCardBody;