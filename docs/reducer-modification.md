### Modifying Reducers

In your entry script the reducer transformer must be added to the injector.

```javascript
import Injector from 'lib/Injector';
import ReducerTransformer from '../reducers/ReducerTransformer';

Injector.transform('my-transform', (updater) => {
  updater.reducer('locator', ReducerTransformer);
});
```
<small>from [react-locator-test client/src/js/boot/index.js](https://github.com/mak001/react-locator-test/blob/master/client/src/js/boot/index.js)</small>

The reducer transformer can now be created like any other react injector reducer transformer.
```javascript
const MyReducerTransformer = (originalReducer) => (globalState) => (state, { type, payload }) => {
    switch (type) {
        case 'MARKER_CLICK': {
            return {
                ...originalReducer(state, { type, payload }),
                markerOpen: true,
            };
        }

        case 'MARKER_CLOSE': {
            return {
                ...originalReducer(state, { type, payload }),
                markerOpen: false,
            };
        }

        default: {
            if (state === undefined) {
                return originalReducer(state, {type, payload});
            }
            // keeps markerOpen in the state. Disappears if another action is run
            return {
                ...originalReducer(state, {type, payload}),
                markerOpen: state.markerOpen,
            };
        }
    }
};

export default MyReducerTransformer;
```
<small>from [react-locator-test client/src/js/reducers/ReducerTransformer.js](https://github.com/mak001/react-locator-test/blob/master/client/src/js/reducers/ReducerTransformer.js)</small>

All reducer transformers require all modifications to return `originalReducer(state, { type, payload })` with or without modified data.
If it does not return with the `originalReducer` the locator may not work properly.
