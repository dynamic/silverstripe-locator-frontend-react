<?php

namespace Dynamic\Locator\React\Extensions;

use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\TextField;
use SilverStripe\ORM\DataExtension;

/**
 * Class LocatorExtension
 * @package Dynamic\Locator\React\Extensions
 *
 * @property float DefaultLat
 * @property float DefaultLng
 * @property boolean Clusters
 * @property boolean Autocomplete
 *
 * @property int SearchMarkerImageID
 * @method Image SearchMarkerImage()
 *
 * @property int DefaultMarkerImageID
 * @method Image DefaultMarkerImage()
 */
class LocatorExtension extends DataExtension
{

    /**
     * @var array
     */
    private static $db = [
        'DefaultLat' => 'Decimal(10,7)',
        'DefaultLng' => 'Decimal(10,7)',
        'Clusters' => 'Boolean',
        'Autocomplete' => 'Boolean',
    ];

    /**
     * @var array
     */
    private static $has_one = [
        'DefaultMarkerImage' => Image::class,
        'SearchMarkerImage' => Image::class,
    ];

    /**
     * @var array
     */
    private static $owns = [
        'DefaultMarkerImage',
        'SearchMarkerImage',
    ];

    /**
     * @param FieldList $fields
     */
    public function updateCMSFields(FieldList $fields)
    {
        $fields->addFieldsToTab('Root.Settings', [
            NumericField::create('DefaultLat')
                ->setTitle('Default Latitude')
                ->setScale(7),
            NumericField::create('DefaultLng')
                ->setTitle('Default Longitude')
                ->setScale(7),
            UploadField::create('DefaultMarkerImage')
                ->setRightTitle('The default image to use for markers.'),
            UploadField::create('SearchMarkerImage')
                ->setRightTitle('The image the search marker will have. If one is not provided a search marker will not be used.'),
            CheckboxField::create('Clusters')
                ->setRightTitle('Cluster the markers when zoomed out.'),
            CheckboxField::create('Autocomplete')
                ->setRightTitle('Address field will suggest locations')
        ]);

        // temporary
        $fields->removeByName('Autocomplete');
    }
}
