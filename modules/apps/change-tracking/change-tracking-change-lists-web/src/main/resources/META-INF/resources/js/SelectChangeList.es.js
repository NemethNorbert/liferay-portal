import './RestManagementToolbar.es';
import {Config} from 'metal-state';
import Component from 'metal-component';
import {openToast} from 'frontend-js-web/liferay/toast/commands/OpenToast.es';
import {openSimpleInputModal} from 'frontend-js-web/liferay/modal/commands/OpenSimpleInputModal.es';
import Soy from 'metal-soy';
import templates from './SelectChangeList.soy';

/**
 * Component for the Overview configuration screen
 * @review
 */
class SelectChangeList extends Component {

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

	_handleActionItemClicked(event) {
		console.log(event);
	}
	_handleCreationMenuMoreButtonClicked(event) {
		console.log(event);
	}
	_handleFilterDoneButtonClick(event) {
		console.log(event);
	}
	_handleFilterItemClicked(event) {
		console.log(event);
	}
	_handleFilterLabelCloseClicke(event) {
		console.log(event);
	}
	_handleInfoButtonClicked(event) {
		console.log(event);
	}
	_handleQuickActionClicked(event) {
		console.log(event);
	}
	_handleSearchSearchClick(event) {
		console.log(event);
	}
	_handleSelectPageCheckboxChanged(event) {
		console.log(event);
	}
	_handleSortingButtonClicked(event) {
		console.log(event);
	}
	_handleViewTypeClicked(event) {
		console.log(event);
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