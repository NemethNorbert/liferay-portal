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

<%@ include file="/bookmarks/init.jsp" %>

<%
Map<String, Object> context = new HashMap<>();
context.put("releaseInfo", ReleaseInfo.getReleaseInfo());
context.put("pathThemeImages", themeDisplay.getPathThemeImages());

%>
<soy:component-renderer
	componentId='<%= renderResponse.getNamespace() + "helloWorld" %>'
	module="bookmarks-web/js/HelloWorld.es"
	templateNamespace="com.liferay.bookmarks.web.HelloWorld.render"
	context="<%= context %>"
/>


<aui:script use="liferay-bookmarks">

</aui:script>