import Component from 'metal-component';
import Soy from 'metal-soy';
import {Config} from 'metal-state';

import templates from './ChangeListConfiguration.soy';

/**
 * Turns Change Lists on/off
 * ...
 */
class ChangeListConfiguration extends Component {

	created() {
		this._getDataRequest(
			this.urlChangeListConfigApi,
			response => {
				if (response) {
					this.setState({
						changeTrackingEnabled: response.changeTrackingEnabled,
						tooltipBody: response.supportedContentTypes
					});
				}
			}
		);
	}

	handleCheck(event) {
		this.setState(
			{changeTrackingEnabled: event.target.checked}
		);
	}

	save(event) {
		event.preventDefault();

		let data = {
			changeTrackingEnabled: this.changeTrackingEnabled
		};

		this._putDataRequest(
			this.urlChangeListConfigApi,
			data,
			response => {
				//TODO open toast success
				console.log(response);
			}
		);
	}

	saveAndGoToOverview(event) {
		let data = {
			changeTrackingEnabled: this.changeTrackingEnabled
		};

		this._putDataRequest(
			this.urlChangeListConfigApi,
			data,
			response => {
				if (response) {
					//TODO redirect to overview
					console.log('Ready to navigate!');
				}
			}
		);
	}

	_getDataRequest(url, callback) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const request = {
			credentials: 'include',
			headers,
			method: 'GET'
		};

		fetch(url, request)
			.then(
				response => response.json()
			)
			.then(
				response => {
					callback(response)
				}
			)
			.catch(
				(err) => {
					//TODO open toast error
					console.log(err);
					throw err;
				}
			);
	}
	_putDataRequest(url, bodyData, callback) {
		let body = JSON.stringify(bodyData);

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const request = {
			body,
			credentials: 'include',
			headers,
			method: 'PUT'
		};

		fetch(url, request)
			.then(
				response => response.json()
			)
			.then(
				response => {
					callback(response)
				}
			)
			.catch(
				(err) => {
					//TODO open toast error
					console.log(err);
					throw err;
				}
			);
	}
}
/**
 * State definition.
 * @ignore
 * @static
 * @type {!Object}
 */
ChangeListConfiguration.STATE = {
	/**
	 * api url
	 *
	 * @type {String}
	 */
	urlChangeListConfigApi: Config.string().required(),

	/**
	 * change tracking on/off
	 *
	 * @type {Boolean}
	 */
	changeTrackingEnabled: Config.bool(),

	/**
	 * PortalURL
	 *
	 * @type {String}
	 */
	portalURL: Config.string().required(),

	/**
	 * Path to images.
	 * 
	 * @type {String}
	 */
	spritemap: Config.string().required(),

	/**
	 * Lists of supported content types that are used up in tooltip
	 * 
	 * @type {List<String>}
	 */
	tooltipBody: Config.array()
};

Soy.register(ChangeListConfiguration, templates);

export default ChangeListConfiguration;