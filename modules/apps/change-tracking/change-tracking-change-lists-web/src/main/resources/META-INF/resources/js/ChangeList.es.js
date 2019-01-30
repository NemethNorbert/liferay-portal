import Soy from 'metal-soy';
import PortletBase from 'frontend-js-web/liferay/PortletBase.es';
import {Config} from 'metal-state';
import {openToast} from 'frontend-js-web/liferay/toast/commands/OpenToast.es';

import templates from './ChangeList.soy';

class ChangeList extends PortletBase {

	created() {
		this._getDataRequest(
			this.urlProductionCollection,
			response => {
				if (response) {
					this.changes = {
						added: 42,
						deleted: 2,
						modified: 6
					};
					this.description = response.description;
					this.initFetch = true;
					this.headerDropDownMenu = [
						{label: 'Change List 01', link: 'link01'},
						{label: 'Change List 02', link: 'link02'},
						{label: 'Change List 03', link: 'link03'}
					];
					this.headerTitle = response.name;
					this.publishedBy = {
						dateTime: response.statusDate,
						userIconUrl: '',
						userMonogram: 'TT',
						userName: response.statusByUserName

					};
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
			.then(response => response.json())
			.then(response => callback(response))
			.catch(
				(error) => {
					const message = typeof error === 'string' ?
						error :
						Liferay.Language.get('error');

					openToast(
						{
							message,
							title: Liferay.Language.get('error'),
							type: 'danger'
						}
					);
				}
			);
	}

}

/**
 * State definition.
 * @review
 * @static
 * @type {!Object}
 */
ChangeList.STATE = {

	/**
	 * Changes
	 * @default
	 * @instance
	 * @memberOf ChangeList
	 * @review
	 * @type {Object}
	 */
	changes: Config.shapeOf(
		{
			added: Config.number(),
			deleted: Config.number(),
			modified: Config.number()
		}
	),

	/**
	 * Card description
	 * @default
	 * @instance
	 * @memberOf ChangeList
	 * @review
	 * @type {String}
	 */
	description: Config.string(),

	/**
	 * List of drop down menu items
	 * @default []
 	 * @instance
	 * @memberOf ChangeList
	 * @review
	 * @type {Array}
	 */
	headerDropDownMenu: Config.arrayOf(
		Config.shapeOf(
			{
				label: Config.string(),
				link: Config.string()
			}
		)
	),

	/**
	 * Card header title
	 * @default
	 * @instance
	 * @memberOf ChangeList
	 * @review
	 * @type {String}
	 */
	headerTitle: Config.string(),

	/**
	 * Initial fetch happened?
	 * @default
	 * @instance
	 * @memberOf ChangeList
	 * @review
	 * @type {Boolean}
	 */
	initFetch: Config.bool().value(false),

	/**
	 * Portlet namespace
	 * @default
	 * @instance
	 * @memberOf ChangeList
	 * @review
	 * @type {!String}
	 */
	portletNamespace: Config.string().required(),

	/**
	 * Publised by
	 * @default
	 * @instance
	 * @memberOf ChangeList
	 * @review
	 * @type {Object}
	 */
	publisedBy: Config.shapeOf(
		{
			dateTime: Config.string(),
			userIconUrl: Config.string(),
			userMonogram: Config.string(),
			userName: Config.string()
		}
	),

	/**
	 * Api url
	 * @default
	 * @instance
	 * @memberOf ChangeList
	 * @review
	 * @type {!String}
	 */
	urlProductionCollection: Config.string().required(),

	/**
	 * Portal url
	 * @default
	 * @instance
	 * @memberOf ChangeList
	 * @review
	 * @type {!String}
	 */
	urlProductionView: Config.string().required(),

	/**
	 * Path to images.
	 * @default
	 * @instance
	 * @memberOf ChangeList
	 * @review
	 * @type {!String}
	 */
	spritemap: Config.string().required()

};

Soy.register(ChangeList, templates);

export {ChangeList};
export default ChangeList;