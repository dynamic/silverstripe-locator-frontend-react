<?php

namespace Dynamic\Locator\React\Tests\Extensions;

use Dynamic\Locator\Locator;
use SilverStripe\Dev\SapphireTest;
use SilverStripe\Forms\FieldList;

/**
 * Class LocatorExtensionTest
 * @package Dynamic\Locator\React\Tests\Extensions
 */
class LocatorExtensionTest extends SapphireTest
{
    protected static $fixture_file = '../fixtures.yml';

    /**
     * Tests updateCMSFields()
     */
    public function testGetCMSFields()
    {
        /** @var Locator $obj */
        $obj = $this->objFromFixture(Locator::class, 'locator1');
        $fields = $obj->getCMSFields();
        $this->assertInstanceOf(FieldList::class, $fields);
    }
}
