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
        Requirements::block('jquery-locator');
    }

}
