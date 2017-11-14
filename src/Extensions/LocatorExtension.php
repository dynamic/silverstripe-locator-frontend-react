<?php

namespace Dynamic\Locator\React\Extensions;

use SilverStripe\Core\Extension;

/**
 * Class LocatorExtension
 * @package Dynamic\Locator\React\Extensions
 */
class LocatorExtension extends Extension
{

    /**
     * Gets the info window template contents
     *
     * @return mixed
     */
    public function getInfoWindowTemplateContent()
    {
        $contents = json_encode(
            file_get_contents(
                preg_replace(
                    '/\?.*$/',
                    '',
                    $this->owner->getInfoWindowTemplate()
                )
            )
        );

        return str_replace('\n', '', $contents);
    }

    /**
     * Gets the template for locations in the list contents
     * @return mixed
     */
    public function getListTemplateContent()
    {
        $contents = json_encode(
            file_get_contents(
                $this->owner->getListTemplate()
            )
        );

        return str_replace('\n', '', $contents);
    }
}
