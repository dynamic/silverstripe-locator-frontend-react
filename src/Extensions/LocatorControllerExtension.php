<?php

namespace Dynamic\Locator\React\Extensions;

use Dynamic\SilverStripeGeocoder\GoogleGeocoder;
use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Control\Director;
use SilverStripe\Control\HTTPResponse;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Convert;
use SilverStripe\Core\Extension;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Core\Manifest\ModuleResourceLoader;
use SilverStripe\Forms\Schema\FormSchema;
use SilverStripe\Security\SecurityToken;
use SilverStripe\View\Requirements;

/**
 * Class LocatorControllerExtension
 * @package Dynamic\Locator\React\Extensions
 *
 * @property \Dynamic\Locator\LocatorController|\Dynamic\Locator\React\Extensions\LocatorControllerExtension $owner
 */
class LocatorControllerExtension extends Extension
{

    /**
     * @var array
     */
    private static $allowed_actions = [
        'schema',
    ];

    /**
     * @var array
     */
    private static $dependencies = [
        'FormSchema' => '%$' . FormSchema::class,
    ];

    /**
     * Current form schema helper
     *
     * @var FormSchema
     */
    protected $schema = null;

    /**
     * Get form schema helper
     *
     * @return FormSchema
     */
    public function getFormSchema()
    {
        return $this->schema;
    }

    /**
     * Set form schema helper for this controller
     *
     * @param FormSchema $schema
     * @return $this
     */
    public function setFormSchema(FormSchema $schema)
    {
        $this->schema = $schema;
        return $this;
    }

    /**
     *
     */
    public function onBeforeInit()
    {
        // stops script from loading
        Requirements::block('jquery-locator');

        // require i18n translation stuff
        Requirements::javascript('silverstripe/admin: client/dist/js/i18n.js');
        Requirements::add_i18n_javascript('dynamic/silverstripe-locator-react: client/lang');

        // because we need another library when using autocomplete
        if ($this->owner->Autocomplete) {
            // google maps api key
            $key = Config::inst()->get(GoogleGeocoder::class, 'map_api_key');
            Requirements::block("https://maps.google.com/maps/api/js?key={$key}");
            Requirements::javascript("https://maps.google.com/maps/api/js?key={$key}&libraries=places");
        }

        Requirements::customScript("
            window.ss = window.ss || {};
            window.ss.config = " . $this->owner->getClientConfig() . ";
        ");

        $this->owner->customScript();
    }

    /**
     * Generates the custom script for settings
     */
    public function customScript()
    {
        $radii = $this->owner->getShowRadius() ? $this->owner->getRadii() : [];
        $radiiString = json_encode($radii);

        $categories = $this->owner->getUsedCategories();
        $categoriesString = $this->owner->categoriesString($categories);

        $unit = $this->owner->Unit ? $this->owner->Unit : 'm';
        // otherwise this is 0 or 1
        $clusters = $this->owner->Clusters ? 'true' : 'false';
        $autocomplete = $this->owner->Autocomplete ? 'true' : 'false';

        $stylePath = ModuleResourceLoader::singleton()->resolveURL($this->owner->getMapStyle());
        $markerIconPath = ModuleResourceLoader::singleton()->resolveURL($this->owner->getMarkerIcon());

        // force to float
        $defaultLat = (float)$this->owner->DefaultLat;
        $defaultLng = (float)$this->owner->DefaultLng;

        Requirements::customScript("
            window.dynamic_locator = {
                'radii': {$radiiString},
                'categories': {$categoriesString},
                'unit': '{$unit}',
                'limit': {$this->owner->getLimit()},
                'clusters': {$clusters},
                'mapStylePath': '{$stylePath}',
                'markerImagePath': '{$markerIconPath}',
                'defaultCenter': {
                    'lat': {$defaultLat},
                    'lng': {$defaultLng}
                },
                'autocomplete': {$autocomplete}
            };
        ", 'react-locator');
    }

    /**
     * @param $categories
     *
     * @return string
     */
    public function categoriesString($categories)
    {
        $string = '[';
        for ($i = 0; $i < $categories->count(); $i++) {
            $cat = $categories[$i];
            $ID = $cat->ID;
            $Name = $cat->Name;
            $string .= "{
                'ID': {$ID},
                'Name': '{$Name}'
            }";

            if ($i !== $categories->count() - 1) {
                $string .= ',';
            }
        }
        $string .= ']';

        return $string;
    }

    /**
     * @return string
     */
    public function getClientConfig()
    {
        $token = SecurityToken::inst();

        $clientConfig = [
            'name' => get_class($this->owner),
            'url' => trim($this->owner->Link(), '/'),
            'baseUrl' => Director::baseURL(),
            'absoluteBaseUrl' => Director::absoluteBaseURL(),
            $token->getName() => $token->getValue(),
            'sections' => [],
            'debugging' => $this->owner->config()->get('debugging'),
        ];

        $clientConfig['sections'][] = Injector::inst()->get(LeftAndMain::class)->getClientConfig();

        $this->owner->extend('updateClientConfig', $clientConfig);

        return Convert::raw2json($clientConfig);
    }

    /**
     * Gets a JSON schema representing the search form.
     *
     * @param HTTPRequest $request
     * @return HTTPResponse
     */
    public function schema($request)
    {
        return $this->getSchemaResponse("Locator.SearchForm", $this->owner->LocationSearch());
    }

    /**
     * Check if the current request has a X-Formschema-Request header set.
     * Used by conditional logic that responds to validation results
     *
     * @return bool
     */
    protected function getSchemaRequested()
    {
        $parts = $this->owner->getRequest()->getHeader(LeftAndMain::SCHEMA_HEADER);
        return !empty($parts);
    }

    /**
     * Generate schema for the given form based on the X-Formschema-Request header value
     *
     * @param string $schemaID ID for this schema. Required.
     * @param Form $form Required for 'state' or 'schema' response
     * @param ValidationResult $errors Required for 'error' response
     * @param array $extraData Any extra data to be merged with the schema response
     * @return HTTPResponse
     */
    protected function getSchemaResponse($schemaID, $form = null, ValidationResult $errors = null, $extraData = [])
    {
        $parts = $this->owner->getRequest()->getHeader(LeftAndMain::SCHEMA_HEADER);
        $data = $this
            ->getFormSchema()
            ->getMultipartSchema($parts, $schemaID, $form, $errors);

        if ($extraData) {
            $data = array_merge($data, $extraData);
        }

        $response = new HTTPResponse(Convert::raw2json($data));
        $response->addHeader('Content-Type', 'application/json');
        return $response;
    }
}
