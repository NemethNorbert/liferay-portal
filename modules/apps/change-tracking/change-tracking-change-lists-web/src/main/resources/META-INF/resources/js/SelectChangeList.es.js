import './modules/RestManagementBar/RestManagementToolbar.es';
import {Config} from 'metal-state';
import {orderItemsValidator} from './modules/RestManagementBar/validators.es';
import Component from 'metal-component';
import {openToast} from 'frontend-js-web/liferay/toast/commands/OpenToast.es';
import {openSimpleInputModal} from 'frontend-js-web/liferay/modal/commands/OpenSimpleInputModal.es';
import {orders, FilterDropDownList} from './MockupData';
import Soy from 'metal-soy';
import templates from './SelectChangeList.soy';

/**
 * Component for the Overview configuration screen
 * @review
 */
class SelectChangeList extends Component {

	created() {
		this.orders = orders;
		this.filterDropdownList = FilterDropDownList;
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

	// _handleActionItemClicked(event) {
	// 	console.log('_handleActionItemClicked');
	// 	console.log(event);
	// }
	// _handleCreationMenuMoreButtonClicked(event) {
	// 	console.log('_handleCreationMenuMoreButtonClicked');
	// 	console.log(event);
	// }
	// _handleFilterDoneButtonClick(event) {
	// 	console.log('_handleFilterDoneButtonClick');
	// 	console.log(event);
	// }
	_handleFilterListItemClicked(event) {
		console.log('_handleFilterItemClicked');
		const currentFilter = event.data.item.label;

		this.currentFilter = currentFilter;
		this.filterDropdownList = this.filterDropdownList.map(
			filterList => {
				return Object.assign(
					{},
					filterList,
					{
						items: filterList.items.map(
							filter => {
								if (filter.label === currentFilter) {
									return Object.assign(
										{},
										filter,
										{
											checked: !filter.checked
										}
									);
								}
								else {
									return Object.assign(
										{},
										filter
									);
								}
							}
						)
					}
				);
			}
		);
		return false;
	}
	// _handleFilterLabelCloseClicked(event) {
	// 	console.log('_handleFilterLabelCloseClicke');
	// 	console.log(event);
	// }
	// _handleInfoButtonClicked(event) {
	// 	console.log('_handleInfoButtonClicked');
	// 	console.log(event);
	// }
	// _handleOnFiltersSubmit(event) {
	// 	console.log('_handleOnFiltersSubmit ');
	// 	console.log(event);
	// }
	_handleOnFormSubmit(event) {
		console.log('_handleOnFormSubmit');
		console.log(event);
		let url = event.data.searchActionURL
		let method = event.data.searchFormMethod.toUpperCase();
		this.searchValue = event.data.searchValue

		this.totalItems = 5;

		this._fetchDataRequest(url,
			method,
			this.searchValue,
			response => {
				this.state.searchResults = response.data;
			})
	}
	_handleOrderItemClicked(event) {
		console.log('_handleOrderItemClicked');
		const currentOrder = event.data.item.label;

		this.currentOrder = currentOrder;
		this.orders = this.orders.map(
			item => {
				return Object.assign(
					{},
					item,
					{
						checked: item.label === currentOrder
					}
				);
			}
		);
	}
	_handleShowFiltersBar() {
		this.showRestFiltersBar = !this.showRestFiltersBar;
	}
	// _handleQuickActionClicked(event) {
	// 	console.log('_handleQuickActionClicked');
	// 	console.log(event);
	// }
	// _handleSelectPageCheckboxChanged(event) {
	// 	console.log('_handleSelectPageCheckboxChanged');
	// 	console.log(event);
	// }
	// _handleSearchSearchClick(event) {
	// 	console.log('_handleSearchSearchClick')
	// 	console.log(event);
	// }
	// _handleSortingButtonClicked(event) {
	// 	console.log('_handleSortingButtonClicked');
	// 	console.log(event);
	// }
	// _handleViewTypeClicked(event) {
	// 	this.viewType = event.data.item.label
	// 	console.log('_handleViewTypeClicked ' + this.viewType);
	// }
	_handleSave(event) {
		console.log('Saved....');
	}

	_handleCancel(event) {
		console.log('Cancelled....');
	}

	_fetchDataRequest(url, method, bodyData, callback) {
		let body = JSON.stringify(bodyData);

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const request = {
			body,
			credentials: 'include',
			headers,
			method: method
		};

		fetch(url, request)
			.then(response => response.json())
			.then(response => callback(response))
			.catch(
				(error) => {
					const message = typeof error === 'string' ?
						error :
						Liferay.Language.get('an-error-occured-while-saving-configuration');

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
SelectChangeList.STATE = {

	urlCreateChangeList: Config.string().required(),

	urlCollections: Config.string().required(),

	currentOrder: Config.string(),

	orders: orderItemsValidator,

	filterDropdownList: Config.any(),

	searchValue: Config.string(),

	showRestFiltersBar: Config.bool().value(false),

	totalItems: Config.number(),
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