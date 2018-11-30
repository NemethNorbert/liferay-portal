import Component from 'metal-component';
import Soy from 'metal-soy';
import {Config} from 'metal-state';


import templates from './HelloWorld.soy';

class HelloWorld extends Component {
	
	
	render() {
		
		
		//if collapsible
		var storeTask = AUI().debounce(Liferay.Store, 100);

		$('#supportedContentTypes').on(
			'hide.bs.collapse show.bs.collapse',
			function(event) {
				if (event.target.id === 'supportedContentTypes') {
					storeTask(
						{
							'supportedContentTypes': (event.type === 'hide')
						}
					);
				}
			}
		);
		///

	}
	
}

HelloWorld.STATE = {
	releaseInfo: Config.string()
};	

Soy.register(HelloWorld, templates);

export {HelloWorld};
export default HelloWorld;