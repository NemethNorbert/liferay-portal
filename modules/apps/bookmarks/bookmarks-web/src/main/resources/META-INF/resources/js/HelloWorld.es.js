import Component from 'metal-component';
import Soy from 'metal-soy';
import {Config} from 'metal-state';

import {ClayPagination} from 'clay-pagination';
import {ClayPaginationBar} from 'clay-pagination-bar';
import {ClayManagementToolbar} from 'clay-management-toolbar'

import templates from './HelloWorld.soy';

class HelloWorld extends Component {
	
	
		rendered() {
					
			/*this.paginationBarEntries = [
				{
					href: 'container',
					itemsPerPage: 5,
					label: 5
				},
				{
					active: true,
					href: 'container',
					itemsPerPage: 10,
					label: 10
				},
				{
					href: 'container',
					itemsPerPage: 15,
					label: 15
				},
				{
					href: 'container',
					itemsPerPage: 20,
					label: 20
				},
			];*/
					
			
		}
	
	

}

HelloWorld.STATE = {
	releaseInfo: Config.string(),
	
	
	pathThemeImages: Config.string().required(),
	
	paginationBarEntries: [
				{
					href: 'container',
					itemsPerPage: 5,
					label: 5
				},
				{
					active: true,
					href: 'container',
					itemsPerPage: 10,
					label: 10
				},
				{
					href: 'container',
					itemsPerPage: 15,
					label: 15
				},
				{
					href: 'container',
					itemsPerPage: 20,
					label: 20
				},
			]
		


};	

Soy.register(HelloWorld, templates);

export {HelloWorld};
export default HelloWorld;