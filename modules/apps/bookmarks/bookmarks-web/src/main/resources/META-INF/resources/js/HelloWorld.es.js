import Component from 'metal-component';
import Soy from 'metal-soy';

import {ClayManagementToolbar} from 'clay';


import Footer from './Footer.soy';
import Header from './Header.soy';

import templates from './HelloWorld.soy';

class HelloWorld extends Component {}

HelloWorld.STATE = {
	releaseInfo: Config.string()
};	

Soy.register(HelloWorld, templates);

export {HelloWorld};
export default HelloWorld;