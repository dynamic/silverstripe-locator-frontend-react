<?php

namespace Dynamic\Locator\React\Extensions;

use Dynamic\Locator\LocationCategory;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;

/**
 * Class CategoryExtension
 * @package Dynamic\Locator\React\Extensions
 *
 * @property int MarkerIconImageID
 * @method Image MarkerIconImage()
 *
 * @property-read LocationCategory|CategoryExtension $owner
 */
class CategoryExtension extends DataExtension
{
    /**
     * @var array
     */
    private static $has_one = [
        'MarkerIconImage' => Image::class,
    ];
    
    /**
     * @var array
     */
    private static $owns = [
        'MarkerIconImage',
    ];


    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        $fields->insertAfter(
            'Title',
            UploadField::create('MarkerIconImage', 'Marker Icon')
        );
    }
}
