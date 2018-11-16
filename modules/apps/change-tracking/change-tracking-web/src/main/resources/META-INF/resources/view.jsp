<%--/**
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
    String redirect = ParamUtil.getString(request, "redirect");
%>
<div class="container-fluid-1280 entry-body" >

    <div class="change-lists-header">
        <liferay-ui:message key="change-lists-configuration-title" />
    </div>

    <div class="disclaimer" >
        <liferay-ui:message key="change-lists-disclaimer" />
    </div>

    <div class="form-group">
        <label class="toggle-switch">
            <input id="<portlet:namespace />changelistToggleSwitch" class="toggle-switch-check" type="checkbox"/>
            <span aria-hidden="true" class="toggle-switch-bar">
			<span class="toggle-switch-handle"></span>
		</span>
        </label>
    </div>

    <liferay-ui:panel-container
        extended="<%= true %>"
        id='<%= renderResponse.getNamespace() + "changeListsPanelContainer" %>'
        markupView="lexicon"
        persistState="<%= true %>"
    >
        <liferay-ui:panel
            collapsible="<%= true %>"
            cssClass="change-lists-supported-entites"
            id='<%= renderResponse.getNamespace() + "changeListsSupportedEntitesPanel" %>'
            markupView="lexicon"
            persistState="<%= true %>"
            title="supported-content-types"
        >
            <ul>
                <li>Valami</li>
                <li>fsdf</li>
                <li>sf</li>
                <li>asdf</li>
                <li>ads</li>
                <li>fd</li>
            </ul>
        </liferay-ui:panel>
    </liferay-ui:panel-container>

    <aui:button-row>
        <aui:button type="submit" />

        <aui:button href="<%= redirect %>" type="cancel" />
    </aui:button-row>
</div>