import Component from 'metal-component';
import Soy from 'metal-soy';
import { Config } from 'metal-state';

import templates from './GlanceCardHeader.soy';

class GlanceCardHeader extends Component { 

    _handleButtonClick(event) {
        event.preventDefault();
        console.log('sega');
    }
}

GlanceCardHeader.STATE = {};

Soy.register(GlanceCardHeader, templates);

export { GlanceCardHeader };
export default GlanceCardHeader;