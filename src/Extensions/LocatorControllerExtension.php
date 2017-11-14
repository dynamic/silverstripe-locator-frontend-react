<?php

namespace Dynamic\Locator\React\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\ManyManyList;
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
        // 'clusters' => $this->owner->getClusters();
        $clusters = 'false';
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
                'listTemplatePath': '{$listTemplate}'
            };
        ", 'react-locator');
    }

    /**
     * @param $categories
     *
     * @return string
     */
    public function categoriesString(ManyManyList $categories)
    {
        $string = '[';
        $categories->each(function($cat) use (&$string) {
            $ID = $cat->ID;
            $Name = $cat->Name;
            $string .= "{
                'ID': '{$ID}',
                'Name': '{$Name}'
            }";
        });
        $string .= ']';
        return $string;
    }
}
