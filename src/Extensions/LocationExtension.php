<?php

namespace Dynamic\Locator\React\Extensions;

use Dynamic\Locator\Location;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldSortableHeader;
use SilverStripe\ORM\DataExtension;
use Symbiote\GridFieldExtensions\GridFieldOrderableRows;
use Symbiote\GridFieldExtensions\GridFieldTitleHeader;

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

    /**
     * @var array
     */
    private static $many_many_extraFields = [
        'Categories' => [
            'Sort' => 'Int',
        ],
    ];

    /**
     * @param FieldList $fields
     */
    public function updateCMSFields(FieldList $fields)
    {
        parent::updateCMSFields($fields);

        if ($this->owner->ID) {

            /** @var GridField $categoryField */
            $categoryField = $fields->dataFieldByName('Categories');
            $categoryField->getConfig()->removeComponentsByType([
                GridFieldSortableHeader::class,
            ])->addComponents([
                new GridFieldOrderableRows(),
                new GridFieldTitleHeader(),
            ]);
        }
    }

    /**
     * @return Image|string
     */
    public function getMarkerIcon()
    {
        if ($this->owner->MarkerIconImageID) {
            return $this->owner->MarkerIconImage()->getURL();
        }

        if ($this->owner->Categories()->count()) {
            $icon = $this->owner->Categories()->sort('Sort')->first()->MarkerIconImage();
            return $icon->getURL();
        }

        $imageURL = '';
        $this->owner->extend('updateMarkerIconURL', $imageURL);
        return $imageURL;
    }
}
