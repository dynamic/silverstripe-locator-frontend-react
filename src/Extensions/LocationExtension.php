<?php

namespace Dynamic\Locator\React\Extensions;

use Dynamic\Locator\Location;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;

/**
 * Class LocationExtension
 * @package Dynamic\Locator\React\Extensions
 *
 * @property int MarkerIconImageID
 * @method Image MarkerIconImage()
 *
 * @property-read Location|LocationExtension $owner
 */
class LocationExtension extends DataExtension
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
            'Fax',
            UploadField::create('MarkerIconImage', 'MarkerIcon')
        );
    }

    /**
     * @return Image|string
     */
    public function MarkerIcon()
    {
        if ($this->owner->MarkerIconImageID) {
            return $this->owner->MarkerIconImage()->getURL();
        }

        $imageURL = '';
        $this->owner->extend('updateMarkerIconURL', $imageURL);
        return $imageURL;
    }
}
