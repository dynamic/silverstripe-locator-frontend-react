{
  "locations": [
    <% loop $Locations %>{
      "ID": $ID,
      "Title": "$Title.RAW",
      "Featured": $Featured,
      "Website": "$Website",
      "Phone": "$Phone",
      "Fax": "$Fax",
      "Email": "$Email",
      "Address": "$Address.RAW",
      "Address2": "$Address2.RAW",
      "City": "$City.RAW",
      "State": "$State",
      "PostalCode": "$PostalCode",
      "Country": "$Country",
      "Distance": <% if $Distance %>$Distance<% else %>-1<% end_if %>,
      "Lat": $Lat,
      "Lng": $Lng
    }<% if not $Last %>,<%end_if%><% end_loop %>
  ]<% if $AddressCoords %>,
  "center": {
    "Lat": $AddressCoords.Lat,
    "Lng": $AddressCoords.Lng
  }<% end_if %>
}
