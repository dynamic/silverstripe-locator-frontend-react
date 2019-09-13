<?php

namespace Dynamic\Locator\React\Extensions;

use Dynamic\Locator\LocatorForm;
use SilverStripe\Core\Extension;
use SilverStripe\Forms\FieldList;

/**
 * Class LocatorFormExtension
 * @package Dynamic\Locator\React\Extensions
 *
 * @property-read LocatorForm|LocatorFormExtension $owner
 */
class LocatorFormExtension extends Extension
{
    /**
     * @param FieldList $fields
     */
    public function updateLocatorFormFields($fields)
    {
        if (!$fields->fieldByName('Address')) {
            return;
        }

        $address = $fields->fieldByName('Address');
        if ($this->owner->getController()->Autocomplete) {
            $address->setSchemaComponent('AutoComplete');
        }
    }
}
