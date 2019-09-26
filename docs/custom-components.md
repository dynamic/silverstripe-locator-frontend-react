### Custom Components
The extendable or replacable components are:
 - `ListLocationContent`
 - `MarkerContent`
 - `PaginationEnd`
Along with any form fields.

To replace or modify a component the injector must be used.

In your entry script the component must be added to the injector.
```javascript
import Injector from 'lib/Injector';
import EnhancedMarkerContent from '../components/EnhancedMarkerContent';

Injector.transform('my-transform', (updater) => {
  // Applies to all text fields in AssetAdmin
  updater.component('MarkerContent.*', EnhancedMarkerContent);
});
```
<small>from [react-locator-test client/src/js/boot/index.js](https://github.com/mak001/react-locator-test/blob/master/client/src/js/boot/index.js)</small>

The component can now be created like any other react injector component.
```javascript
import React, { Fragment } from 'react';

const EnhancedMarkerContent = (MarkerContent) => (props) => {
  console.log(props);
  return (
    <Fragment>
      Content Here
    </Fragment>
  );
};

export default EnhancedMarkerContent;
```
<small>from [react-locator-test client/src/js/components/EnhancedMarkerContent.js](https://github.com/mak001/react-locator-test/blob/master/client/src/js/components/EnhancedMarkerContent.js)</small>

The above code will log the porps of the component and only display `Content Here` for marker content.
