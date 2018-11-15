import 'metal';
import 'metal-component';
import PortletBase from 'frontend-js-web/liferay/PortletBase.es';
import Soy from 'metal-soy';
import {Config} from 'metal-state';

import templates from './HelloWorld.soy';

/**
 * HelloWorld
 *
 * This component shows a list of available folders to move content in and
 * allows to filter them by searching.
 */

class HelloWorld extends PortletBase {


}

HelloWorld.STATE = {


};

Soy.register(HelloWorld, templates);

export default HelloWorld;