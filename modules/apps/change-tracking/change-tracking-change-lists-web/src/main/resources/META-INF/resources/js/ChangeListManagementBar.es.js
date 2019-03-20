
import './modules/RestManagementBar/RestManagementToolbar.es';
import './modules/PaginationBar/PaginationBar.es';
import templates from './ChangeListManagementBar.soy';
import {Config} from 'metal-state';
import {orderItemsValidator} from './modules/RestManagementBar/validators.es';
import Component from 'metal-component';
import {openToast} from 'frontend-js-web/liferay/toast/commands/OpenToast.es';
import Soy from 'metal-soy';

//TODO update url, finish pagination, add pagination data to url

/**
 * Component for the Overview configuration screen
 * @review
 */
class ChangeListManagementBar extends Component {

	_handleClearResultsClick(event) {
		this.searchValue='';
	}
	_handleFilterListItemClicked(event) {
		let currentFilter = event.data.item.label;
		//workaround for the double event issue -> Clay#1618
		let filterItemInputField = AUI().one('input[name="'+ event.data.item.inputName +'"]')._node;

		if (!this.fetchFilterDropdownList) {
			this.fetchFilterDropdownList = this.filterDropdownList;
		}

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
				let dataKey = key.toString() + "=";
				if (fetchUrlData[key].length > 0) {
					fetchUrl.push(dataKey);
					
					fetchUrlData[key].forEach(
						(item, index) => {
							let dataValue;
							if (fetchUrlData[key].length - 1 === index){
								dataValue = item.inputValue.toString() + "&";
							}
							else {
								dataValue = item.inputValue.toString() + ",";
							}
							fetchUrl.push(dataValue);
						}
					)
				}
			}
		}

		this.checkedFilters = fetchUrl;

		url = this.urlCollections + '&' + fetchUrl.join('') + 'sort=' + this.currentOrder + ':' + this.sortingOrder;

		this._getDataRequest(url,
			response => {
				// Todo pass down pagination data as well
				this.searchResults = response.data
			});

		this.filterDropdownList = this.fetchFilterDropdownList;
	}

	_handleOnFormSubmit(event) {
		// TODO put searchValue to url instead of request body
		let url = event.data.searchActionURL
		let method = event.data.searchFormMethod.toUpperCase();
		this.searchValue = event.data.searchValue

		this.totalItems = 5;

		this._fetchDataRequest(url,
			method,
			this.searchValue,
			response => {
				// Todo pass down pagination data as well
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
		let url = this.urlCollections + '&' + this.checkedFilters.join('') + 'sort=' + this.currentOrder + ':' + this.sortingOrder;

		this._getDataRequest(url,
			response => {
				this.searchResults = response.data
			});
	}

	_handleShowFiltersBar() {
		this.showRestFiltersBar = !this.showRestFiltersBar;
	}

	_handleSortingButtonClicked(event) {
		if (event.data.sortingOrder === 'asc') {
			this.sortingOrder = 'desc';
		}
		else {
			this.sortingOrder = 'asc';
		}

		let url = this.urlCollections + '&' + this.checkedFilters.join('') + 'sort=' + this.currentOrder + ':' + this.sortingOrder;

		this._getDataRequest(url,
			response => {
				this.searchResults = response.data
			});
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
ChangeListManagementBar.STATE = {

	urlCreateChangeList: Config.string(),

	urlCollections: Config.string(),

	cardStateColor: Config.string(),

	checkedFilters: Config.array().value([]),

	currentOrder: Config.string().value('all'),

	orders: orderItemsValidator,

	filterDropdownList: Config.any().required(),

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

Soy.register(ChangeListManagementBar, templates);

export {ChangeListManagementBar};
export default ChangeListManagementBar;