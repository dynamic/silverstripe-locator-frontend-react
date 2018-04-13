<div class="content-container unit size3of4 lastUnit">
	<h1>$Title</h1>
	<% if $Content %><div class="typography">$Content</div><% end_if %>

    <%-- This is where react hooks into the page --%>
    <div class="locator">
      <div class="locator-search"></div>
      <div class="locator-list"></div>
      <div class="locator-map"></div>
      <div class="locator-loading"></div>
    </div>

</div>

<% require javascript('silverstripe/admin: client/dist/js/vendor.js') %>
<% require javascript('dynamic/silverstripe-locator-react: client/dist/js/main.js') %>
<% require themedCSS('locator') %>
