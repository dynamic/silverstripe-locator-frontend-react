<?php

namespace Dynamic\Locator\React\Tests\Extensions;

use Dynamic\Locator\Location;
use Dynamic\Locator\Locator;
use Dynamic\Locator\LocatorController;
use Dynamic\SilverStripeGeocoder\GoogleGeocoder;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\View\Requirements;

/**
 * Class LocatorControllerExtensionTest
 */
class LocatorControllerExtensionTest extends SapphireTest
{

    protected static $fixture_file = '../fixtures.yml';

    /**
     *
     */
    public function testInit()
    {
        Config::modify()->set(GoogleGeocoder::class, 'geocoder_api_key', 'YYYY');

        $locator = Locator::create();
        $locator->Autocomplete = true;
        $controller = LocatorController::create($locator);
        $controller->doInit();

        $requirements = Requirements::backend()->getJavascript();
        $blocked = Requirements::backend()->getBlocked();
        $this->assertArrayHasKey('https://maps.google.com/maps/api/js?key=YYYY', $blocked);
        $this->assertArrayHasKey('https://maps.google.com/maps/api/js?key=YYYY&libraries=places', $requirements);
    }

    /**
     *
     */
    public function testCustomScript()
    {
        $requirements = Requirements::get_custom_scripts();
        $this->assertArrayNotHasKey('react-locator', $requirements);

        $controller = LocatorController::create(Locator::create());
        $controller->customScript();
        $requirements = Requirements::get_custom_scripts();
        $this->assertArrayHasKey('react-locator', $requirements);
    }

    /**
     * Tests categoriesString()
     */
    public function testCategoriesString()
    {
        /** @var Locator $locator */
        $locator = Injector::inst()->create(Locator::class);
        /** @var LocatorController $controller */
        $controller = LocatorController::create($locator);

        $string = $controller->categoriesString($locator->Categories());
        $this->assertEquals('[]', $string);

        /** @var Locator $locator */
        $locator = $this->objFromFixture(Locator::class, 'locator1');
        // load locations
        $this->objFromFixture(Location::class, 'dynamic');
        $this->objFromFixture(Location::class, 'silverstripe');
        $this->objFromFixture(Location::class, '3sheeps');
        $this->objFromFixture(Location::class, 'Lambeau');
        // redo controller
        $controller = LocatorController::create($locator);

        $string = $controller->categoriesString($locator->Categories());
        $this->assertEquals("[{
                'ID': 1,
                'Name': 'Service'
            },{
                'ID': 4,
                'Name': 'Technology'
            }]", $string);
    }
}
