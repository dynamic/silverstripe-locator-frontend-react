<?php

namespace Dynamic\Locator\React\Extensions;

use SilverStripe\Core\Extension;
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

        $radii = $this->owner->getShowRadius() ? $this->owner->getRadii() : [];
        $categories = $this->owner->getCategories() ?
            $this->owner->getCategories()->map('ID','Name') : [];

        $settings = array(
            'radii' => $radii,
            'categories' => $categories,
            'unit' => $this->owner->Unit,
            'limit' => $this->owner->getLimit(),
            // 'clusters' => $this->owner->getClusters(),
            'clusters' => false,
            'infoWindowTemplate' => $this->owner->getInfoWindowTemplateContent(),
            'listTemplate' => $this->owner->getListTemplateContent(),
        );

        $this->owner->extend('updateSettings', $settings);

        Requirements::javascriptTemplate(
            "dynamic/silverstrpe-locator-react: templates/settings.template.js",
            $settings,
            'react-locator');
    }

}
