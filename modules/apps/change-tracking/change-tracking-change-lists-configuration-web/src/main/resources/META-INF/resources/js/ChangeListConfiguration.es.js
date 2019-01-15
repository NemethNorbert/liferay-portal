import Component, { ComponentRegistry } from 'metal-component';
import Soy from 'metal-soy';

import templates from './ChangeListConfiguration.soy';

//const axios = require('axios');
/**
 * ChangeListConfiguration
 *
 */

class ChangeListConfiguration extends Component {

	attached() {
		 fetch(
			"http://localhost:8080/o/change-tracking/configurations/20101",
			{
				method: "GET", //method: "PUT"
				headers: {
					"Authorization": "Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0",
					"Content-Type": "application/json"
				},
				//body: {
				//     "changeTrackingEnabled": true,
				//     "userId": 20141
				// }
			})
			.then(response => {
				console.log(response);
				this.setState({changeTrackingEnabled: response.changeTrackingEnabled});
			})
		// axios({
		// 	method:'get',
		// 	url:'http://localhost:8080/o/change-tracking/configurations/20101',
		// 	responseType:'json'
		//   })
		// 	.then(function (response) {
		// 		console.log(response);
		// 		this.setState({changeTrackingEnabled: response.data.changeTrackingEnabled});
		// 	});
		const mockUpData = {
			"changeTrackingEnabled": false,
			"userId": 20141,
			"tooltip": ["Web Content", "Documents and Media", "Forms", "Blogs", "Pages"]
		}
		this.setState({
			tooltip: mockUpData.tooltip
		})
	}

	handleCheck(event) {
		this.setState({changeTrackingEnabled : event.target.checked})
	}
	
	save(event) {
		// fetch(
		// 	"http://localhost:8080/o/change-tracking/configurations/20101",
		// 	{
		// 		method: "PUT", //method: "PUT"
		// 		headers: {
		// 			"Authorization": "Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0",
		// 			"Content-Type": "application/json"
		// 		},
		// 		body: {
		// 		     "changeTrackingEnabled": this.STATE.changeTrackingEnabled,
		// 		     "userId": 20141
		// 		}
		// 	})
		// 	.then(response => {
		// 		response.json();
		// 		console.log("saved!..." + response);
		// 	})
		console.log(this.changeTrackingEnabled)
	}

}

ChangeListConfiguration.STATE = {
	changeTrackingEnabled: {
        // Called whenever a new value is set. Useful when normalizing your
        // state data.
        //setter: 'setIt',

        // Accepts either number or string types. If the validator check fails,
        // the new value is discarded, and the current value kept.
        //validator: val => core.isBool(),

        // Initial value
        value: true,

        // You can, instead of the `value` option above, use a function to 
        // return the initial value for the state.
        //valueFn: val => 0,

        // It's also possible to define that a property can only receive a 
        // value once, and later behave as read-only.
        writeOnce: false
	},
	tooltip: {
		//value: [],
		writeOnce: false
	},
	spritemap: {
		writeOnce: true
	}
};

Soy.register(ChangeListConfiguration, templates);

export default ChangeListConfiguration;
