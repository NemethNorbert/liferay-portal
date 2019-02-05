import Soy from 'metal-soy';
import PortletBase from 'frontend-js-web/liferay/PortletBase.es';
import {Config} from 'metal-state';
import {openToast} from 'frontend-js-web/liferay/toast/commands/OpenToast.es';
import {openSimpleInputModal} from 'frontend-js-web/liferay/modal/commands/OpenSimpleInputModal.es';
import 'clay-management-toolbar';
import {ClayModal} from 'clay-modal';

import templates from './SelectChangeList.soy';

/**
 * Component for the Overview configuration screen
 * @review
 */
class SelectChangeList extends PortletBase {

	created() {
	}

	_handleCreationButtonClicked(event) {
		openSimpleInputModal(
			{
				dialogTitle: 'Create Change List',
				formSubmitURL: this.urlCreateChangeList,
				mainFieldLabel: 'Change List Name',
				mainFieldName: 'name',
				mainFieldPlaceholder: '',
				namespace: 'namespace',
				spritemap: this.spritemap
			}
		);
	}

	_handleSave(event) {
		console.log('Saved....');
	}

	_handleCancel(event) {
		console.log('Cancelled....');
	}
}

/**
 * State definition.
 * @review
 * @static
 * @type {!Object}
 */
SelectChangeList.STATE = {

	urlCreateChangeList: Config.string().required(),

	urlCollections: Config.string().required(),

	/**
	 * Path of the available icons.
	 * @default undefined
	 * @instance
	 * @memberOf Overview
	 * @review
	 * @type {!string}
	 */

	spritemap: Config.string().required()

};

Soy.register(SelectChangeList, templates);

export {SelectChangeList};
export default SelectChangeList;