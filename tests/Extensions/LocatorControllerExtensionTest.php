<?php

namespace Dynamic\Locator\React\Tests\Extensions;

use Dynamic\Locator\Location;
use Dynamic\Locator\Locator;
use Dynamic\Locator\LocatorController;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Dev\SapphireTest;

/**
 * Class LocatorControllerExtensionTest
 */
class LocatorControllerExtensionTest extends SapphireTest
{

    protected static $fixture_file = '../fixtures.yml';

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
