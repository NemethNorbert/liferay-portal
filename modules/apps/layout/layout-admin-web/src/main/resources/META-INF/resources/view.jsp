<%--
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
--%>

<%@ include file="/init.jsp" %>

<%
portletDisplay.setShowStagingIcon(false);
%>

<liferay-ui:success key='<%= portletDisplay.getPortletName() + "layoutUpdated" %>' message='<%= LanguageUtil.get(resourceBundle, "the-page-was-updated-succesfully") %>' />

<liferay-ui:success key="layoutPublished" message="the-page-was-published-succesfully" />

<liferay-ui:error embed="<%= false %>" exception="<%= GroupInheritContentException.class %>" message="this-page-cannot-be-deleted-and-cannot-have-child-pages-because-it-is-associated-with-a-site-template" />

<clay:management-toolbar
	managementToolbarDisplayContext="<%= new LayoutsAdminManagementToolbarDisplayContext(request, liferayPortletRequest, liferayPortletResponse, layoutsAdminDisplayContext) %>"
	propsTransformer="js/LayoutsManagementToolbarPropsTransformer"
/>

<liferay-ui:error exception="<%= LayoutTypeException.class %>">

	<%
	LayoutTypeException lte = (LayoutTypeException)errorException;
	%>

	<c:if test="<%= lte.getType() == LayoutTypeException.FIRST_LAYOUT %>">
		<liferay-ui:message arguments='<%= "layout.types." + lte.getLayoutType() %>' key="the-first-page-cannot-be-of-type-x" />
	</c:if>
</liferay-ui:error>

<liferay-ui:error exception="<%= RequiredSegmentsExperienceException.MustNotDeleteSegmentsExperienceReferencedBySegmentsExperiments.class %>" message="this-page-cannot-be-deleted-because-it-has-ab-tests-in-progress" />

<aui:form cssClass="container-fluid container-fluid-max-xl" name="fm">
	<c:choose>
		<c:when test="<%= layoutsAdminDisplayContext.hasLayouts() %>">
			<c:choose>
				<c:when test="<%= layoutsAdminDisplayContext.isSearch() %>">
					<liferay-util:include page="/flattened_view.jsp" servletContext="<%= application %>" />
				</c:when>
				<c:otherwise>

					<%
					MillerColumnsDisplayContext millerColumnsDisplayContext = (MillerColumnsDisplayContext)request.getAttribute(LayoutAdminWebKeys.MILLER_COLUMNS_DISPLAY_CONTEXT);
					%>

					<div>
						<react:component
							module="js/layout/Layout"
							props="<%= millerColumnsDisplayContext.getLayoutData() %>"
						/>
					</div>

					<div>
						<react:component
							module="js/layout/LayoutExportTranslation"
							props="<%= millerColumnsDisplayContext.getExportTranslationData() %>"
						/>
					</div>
				</c:otherwise>
			</c:choose>
		</c:when>
		<c:otherwise>
			<liferay-frontend:empty-result-message
				actionDropdownItems="<%= layoutsAdminDisplayContext.isShowAddRootLayoutButton() ? layoutsAdminDisplayContext.getAddLayoutDropdownItems() : null %>"
				description='<%= LanguageUtil.get(request, "fortunately-it-is-very-easy-to-add-new-ones") %>'
				elementType='<%= LanguageUtil.get(request, "pages") %>'
			/>
		</c:otherwise>
	</c:choose>
</aui:form>

<%
PortletURL portletURL = PortletURLBuilder.create(
	PortletURLFactoryUtil.create(request, ProductNavigationProductMenuPortletKeys.PRODUCT_NAVIGATION_PRODUCT_MENU, RenderRequest.RENDER_PHASE)
).setMVCPath(
	"/portlet/product_menu.jsp"
).setWindowState(
	LiferayWindowState.EXCLUSIVE
).build();
%>

<aui:script sandbox="<%= true %>">
	Liferay.Util.Session.get(
		'com.liferay.product.navigation.product.menu.web_pagesTreeState'
	).then((result) => {
		if (result === 'open') {
			Liferay.Util.Session.set(
				'com.liferay.product.navigation.product.menu.web_pagesTreeState',
				'closed'
			).then(() => {
				Liferay.Util.fetch('<%= portletURL.toString() %>')
					.then((response) => {
						if (!response.ok) {
							throw new Error(
								'<liferay-ui:message key="an-unexpected-error-occurred" />'
							);
						}

						return response.text();
					})
					.then((response) => {
						var sidebar = document.querySelector(
							'.lfr-product-menu-sidebar .sidebar-body'
						);

						sidebar.innerHTML = '';

						var range = document.createRange();
						range.selectNode(sidebar);

						var fragment = range.createContextualFragment(response);

						sidebar.appendChild(fragment);
					});
			});
		}
	});
</aui:script>