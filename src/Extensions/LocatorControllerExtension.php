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
        $radiiString = json_encode($radii);

        $categories = $this->owner->getCategories();
        $categoriesString = $this->owner->categoriesString($categories);

        $unit = $this->owner->Unit ?: 'm';
        $limit = $this->owner->getLimit();
        $defaultLat = $this->owner->DefaultLat;
        $defaultLng = $this->owner->DefaultLng;
        // otherwise this is 0 or 1
        $clusters = $this->owner->Clusters ? 'true' : 'false';
        $infoWindowTemplate = $this->owner->getInfoWindowTemplate();
        $listTemplate = $this->owner->getListTemplate();

        Requirements::customScript("
            window.dynamic_locator = {
                'radii': {$radiiString},
                'categories': {$categoriesString},
                'unit': '{$unit}',
                'limit': {$limit},
                'clusters': {$clusters},
                'infoWindowTemplatePath': '{$infoWindowTemplate}',
                'listTemplatePath': '{$listTemplate}',
                'defaultCenter': {
                    'lat': {$defaultLat},
                    'lng': {$defaultLng}
                }
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
