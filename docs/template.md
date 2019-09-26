### Custom SilverStripe Template
There are some caveats when creating a custom template. These do not need to be grouped in a parent container, but custom css is recomended if they are not.

#### Loading Container
The loading container must always be included as this is where the initial react render is done. It must always have a class of `locator-loading`.
```html
<div class="locator-loading"></div>
```

#### Search Container
The search container is optional. It must always have a class of `locator-search`.
```html
<div class="locator-search"></div>
```

#### List Container
The search container is optional. It must always have a class of `locator-list`.
```html
<div class="locator-list"></div>
```

#### Map Container
The map container is optional. It must always have a class of `locator-map`.
```html
<div class="locator-map"></div>
```

#### Required Javascript
To make the react locator work some javascript is required.
 - `silverstripe/admin: client/dist/js/vendor.js`
 - `silverstripe/admin: client/dist/js/bundle.js`
 - `dynamic/silverstripe-locator-react: client/dist/js/main.js`

These can be included in the template, or in a controller extension. 
If custom components or reducers are required it is recommended to do requirements in a controller extension.
