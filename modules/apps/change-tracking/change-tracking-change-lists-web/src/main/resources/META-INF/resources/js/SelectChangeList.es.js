
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
		this.fetchFilterDropdownList = FilterDropDownList;
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

	_testHandler(event) {
		console.log(event);
	}
	// _handleActionItemClicked(event) {
	// 	console.log('_handleActionItemClicked');
	// 	console.log(event);
	// }
	// _handleCreationMenuMoreButtonClicked(event) {
	// 	console.log('_handleCreationMenuMoreButtonClicked');
	// 	console.log(event);
	// }
	_handleFilterListItemClicked(event) {
		console.log('_handleFilterItemClicked');
		let currentFilter = event.data.item.label;
		let filterItemInputField = AUI().one('input[name="'+ event.data.item.inputName +'"]')._node;

		this.fetchFilterDropdownList = this.fetchFilterDropdownList.map(
			filterList => {
				return Object.assign(
					{},
					filterList,
					{
						items: filterList.items.map(
							item => {
								if (item.label === currentFilter && item.checked != filterItemInputField.checked) {
									return Object.assign(
										{},
										item,
										{
											checked: !item.checked
										}
									);
								}
								else {
									return Object.assign(
										{},
										item
									);
								}
							}
						)
					}
				);
			}
		);
	}
	// _handleFilterLabelCloseClicked(event) {
	// 	console.log('_handleFilterLabelCloseClicke');
	// 	console.log(event);
	// }
	// _handleInfoButtonClicked(event) {
	// 	console.log('_handleInfoButtonClicked');
	// 	console.log(event);
	// }

	_handleOnFiltersSubmit(event) {
		let fetchUrl = [];
		let fetchUrlData = {};
		let url = "";

		const _returnChecked = (obj) => {
			return obj.checked === true
		}

		this.fetchFilterDropdownList.map(
			filterList => {
				let filterID = filterList.inputName;
				fetchUrlData[filterID] = filterList.items.filter(_returnChecked);
			}
		);

		for (let key in fetchUrlData) {
			if (fetchUrlData.hasOwnProperty(key)) {
				let x = key.toString() + "=";
				if (fetchUrlData[key].length > 0) {
					fetchUrl.push(x);
					
					fetchUrlData[key].forEach(
						(item, index) => {
							let y;
							if (fetchUrlData[key].length - 1 === index){
								y = item.inputValue.toString() + "&";
							}
							else {
								y = item.inputValue.toString() + ",";
							}
							fetchUrl.push(y);
						}
					)
				}
			}
		}
		url = this.urlCollections + '&' + fetchUrl.join('') + 'sort=' + this.currentOrder + ':' + this.sortingOrder;

		this._getDataRequest(url,
			response => {
				this.searchResults = response.data
			});
		this.filterDropdownList = this.fetchFilterDropdownList;
	}

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
				this.searchResults = response.data;
			});
	}
	_handleOrderItemClicked(event) {
		const currentOrder = event.data.item.label;

		this.currentOrder = currentOrder;

		this.orders = this.orders.map(
			item => {
				return Object.assign(
					{},
					item,
					{
						checked: item.label === currentOrder,
						active: item.label === currentOrder
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
	_handleSortingButtonClicked(event) {
		console.log('_handleSortingButtonClicked');
		this.sortingOrder = event.data.sortingOrder
	}
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

	urlCreateChangeList: Config.string(),

	urlCollections: Config.string(),

	cardStateColor: Config.string(),

	currentOrder: Config.string().value('all'),

	orders: orderItemsValidator,

	filterDropdownList: Config.any(),

	fetchFilterDropdownList: Config.any(),

	headerSubTitle: Config.any(),

	searchValue: Config.string(),

	showRestFiltersBar: Config.bool().value(false),

	sortingOrder: Config.string().value('asc'),

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