<?php

namespace Dynamic\Locator\React\Extensions;

use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\NumericField;
use SilverStripe\ORM\DataExtension;

/**
 * Class LocatorExtension
 * @package Dynamic\Locator\React\Extensions
 */
class LocatorExtension extends DataExtension
{

    private static $db = [
        'DefaultLat' => 'Decimal(10,7)',
        'DefaultLng' => 'Decimal(10,7)',
        'Clusters' => 'Boolean',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $fields->addFieldsToTab('Root.Settings', [
            NumericField::create('DefaultLat')
                ->setTitle('Default Latitude')
                ->setScale(7),
            NumericField::create('DefaultLng')
                ->setTitle('Default Longitude')
                ->setScale(7),
            CheckboxField::create('Clusters')
                ->setRightTitle('Cluster the markers when zoomed out.'),
        ]);
    }

}
