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
        'Clusters' => 'Boolean',
        'Autocomplete' => 'Boolean',
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $fields->addFieldsToTab('Root.Settings', [
            CheckboxField::create('Clusters')
                ->setRightTitle('Cluster the markers when zoomed out.'),
            CheckboxField::create('Autocomplete')
                ->setRightTitle('Address field will suggest locations')
        ]);
    }
}
