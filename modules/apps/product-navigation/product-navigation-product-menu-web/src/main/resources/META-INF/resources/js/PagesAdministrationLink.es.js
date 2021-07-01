/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import {fetch, openToast} from 'frontend-js-web';
import React from 'react';

const PagesAdministrationLink = (props) => {
	const handleOnClick = () => {
		Liferay.Portlet.destroy(`#p_p_id${props.namespace}`, true);

		Liferay.Util.Session.set(
			'com.liferay.product.navigation.product.menu.web_pagesTreeState',
			'closed'
		).then(() => {
			fetch(props.productMenuPortletURL)
				.then((response) => {
					if (!response.ok) {
						throw new Error();
					}

					return response.text();
				})
				.then((productMenuContent) => {
					const sidebar = document.querySelector(
						'.lfr-product-menu-sidebar .sidebar-body'
					);

					sidebar.innerHTML = '';

					const range = document.createRange();
					range.selectNode(sidebar);

					sidebar.appendChild(
						range.createContextualFragment(productMenuContent)
					);
				})
				.catch(() => {
					openToast({
						message: Liferay.Language.get(
							'an-unexpected-error-occurred'
						),
						title: Liferay.Language.get('error'),
						type: 'danger',
					});
				});
		});
	};

	return (
		<div className="pages-administration-link">
			<a className="ml-2" href={props.href} onClick={handleOnClick}>
				{Liferay.Language.get('go-to-pages-administration')}
			</a>
		</div>
	);
};

export default PagesAdministrationLink;
