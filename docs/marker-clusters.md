### Marker Clusters

Marker clusters allows the map to show a single image for multiple markers that are close together when zoomed out.
This can be enabled and disabled in the cms on each locator page under the `Content > Settings` tab.

#### Custom Cluster Images
To add custom cluster images some configuration is needed.

To use images in a theme an array with the path to the files and the file names must be added to the Locator config.
The image sizes will be looked up when creating the marker clusterer, so no sizes need to be provided to work properly.
If the images are not found the locator will use the default cluster images.

Image paths default to be relative to the active theme folder, but can also be full urls or in the resources folder.
Any image specified in the resources folder will conform to custom resource folder locations.
```yaml
Dynamic\Locator\Locator:
  ClusterImages:
    # relative to active theme
    - 'dist/images/m1.png'
    # in the resources folder
    - '/_resources/vendor/dynamic/module/dist/images/m2.png'
    - '_resources/themes/dynamic/dist/images/m3.png'
    # full url
    - 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclusterer/images/heart30.png'
```
