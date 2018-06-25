<?php

namespace Dynamic\Locator\React\Extensions;

use Dynamic\SilverStripeGeocoder\GoogleGeocoder;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Extension;
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\View\Requirements;

/**
 * Class LocatorControllerExtension
 * @package Dynamic\Locator\React\Extensions
 */
class LocatorControllerExtension extends Extension
{

    /**
     *
     */
    public function onBeforeInit()
    {
        // stops script from loading
        Requirements::block('jquery-locator');

        // require i18n translation stuff
        Requirements::javascript('silverstripe/admin: client/dist/js/i18n.js');
        Requirements::add_i18n_javascript('dynamic/silverstripe-locator-react: client/lang');

        // because we need another library when using autocomplete
        if ($this->owner->Autocomplete) {
            // google maps api key
            $key = Config::inst()->get(GoogleGeocoder::class, 'geocoder_api_key');
            Requirements::block("https://maps.google.com/maps/api/js?key={$key}");
            Requirements::javascript("https://maps.google.com/maps/api/js?key={$key}&libraries=places");
        }

        $this->owner->customScript();
    }

    /**
     * Generates the custom script for settings
     */
    public function customScript()
    {
        $radii = $this->owner->getShowRadius() ? $this->owner->getRadii() : [];
        $radiiString = json_encode($radii);

        $categories = $this->owner->getUsedCategories();
        $categoriesString = $this->owner->categoriesString($categories);

        $unit = $this->owner->Unit ? $this->owner->Unit : 'm';
        // otherwise this is 0 or 1
        $clusters = $this->owner->Clusters ? 'true' : 'false';
        $autocomplete = $this->owner->Autocomplete ? 'true' : 'false';

        $stylePath = ModuleResourceLoader::singleton()->resolveURL($this->owner->getMapStyle());
        $markerIconPath = ModuleResourceLoader::singleton()->resolveURL($this->owner->getMarkerIcon());

        // force to float
        $defaultLat = (float) $this->owner->DefaultLat;
        $defaultLng = (float) $this->owner->DefaultLng;

        Requirements::customScript("
            window.dynamic_locator = {
                'radii': {$radiiString},
                'categories': {$categoriesString},
                'unit': '{$unit}',
                'limit': {$this->owner->getLimit()},
                'clusters': {$clusters},
                'infoWindowTemplatePath': '{$this->owner->getInfoWindowTemplate()}',
                'listTemplatePath': '{$this->owner->getListTemplate()}',
                'mapStylePath': '{$stylePath}',
                'markerImagePath': '{$markerIconPath}',
                'defaultCenter': {
                    'lat': {$defaultLat},
                    'lng': {$defaultLng}
                },
                'autocomplete': {$autocomplete}
            };
        ", 'react-locator');
    }

    /**
     * @param $categories
     *
     * @return string
     */
    public function categoriesString($categories)
    {
        $string = '[';
        for ($i = 0; $i < $categories->count(); $i++) {
            $cat = $categories[$i];
            $ID = $cat->ID;
            $Name = $cat->Name;
            $string .= "{
                'ID': {$ID},
                'Name': '{$Name}'
            }";

            if ($i !== $categories->count() - 1) {
                $string .= ',';
            }
        }
        $string .= ']';

        return $string;
    }
}
