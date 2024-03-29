# Changelog

## [1.0.4](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.4) (2022-07-14)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.3...1.0.4)

**Merged pull requests:**

- Fixed translations not always working [\#77](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/77) ([mak001](https://github.com/mak001))

## [1.0.3](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.3) (2020-08-06)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.2...1.0.3)

**Closed issues:**

- Add classes to marker content and list content based on categories [\#58](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/58)
- Add json parse error detection for fetching location data [\#49](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/49)

**Merged pull requests:**

- updated node modules [\#65](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/65) ([mak001](https://github.com/mak001))
- fixed bad json fetches not throwing errors [\#64](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/64) ([mak001](https://github.com/mak001))

## [1.0.2](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.2) (2020-02-20)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.1...1.0.2)

**Merged pull requests:**

- List info and marker info now have category classes [\#59](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/59) ([mak001](https://github.com/mak001))

## [1.0.1](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.1) (2020-02-19)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.0...1.0.1)

**Merged pull requests:**

- Added ability to specify single marker images [\#57](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/57) ([mak001](https://github.com/mak001))

## [1.0.0](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.0) (2020-02-05)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.0-beta7...1.0.0)

**Implemented enhancements:**

- Add polyfill for ie 11 [\#26](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/26)

**Fixed bugs:**

- No cluster images when clustering is on cause errors in the console [\#54](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/54)
- Clusters don't show on initial load [\#53](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/53)

**Closed issues:**

- Feature - Custom marker cluster image [\#50](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/50)

**Merged pull requests:**

- Fixed function visibility causing errors [\#56](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/56) ([mak001](https://github.com/mak001))
- Fixed error when no cluster images are set [\#55](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/55) ([mak001](https://github.com/mak001))
- Enhancement/cluster image path [\#51](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/51) ([mak001](https://github.com/mak001))
- Added ability to hide the map and list on initial page load [\#48](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/48) ([mak001](https://github.com/mak001))
- Now uses new `getWebsiteURL` method on location [\#47](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/47) ([mak001](https://github.com/mak001))

## [1.0.0-beta7](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.0-beta7) (2019-10-09)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.0-beta6...1.0.0-beta7)

**Implemented enhancements:**

- RFC Add injector support [\#17](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/17)
- Got auto complete for addresses to work properly [\#44](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/44) ([mak001](https://github.com/mak001))
- Started to add stuff to allow for injector [\#18](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/18) ([mak001](https://github.com/mak001))

**Fixed bugs:**

- BUG Google changed API key restriction causing errors [\#36](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/36)

**Closed issues:**

- re-enable places autocomplete [\#43](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/43)
- having ?stage=Stage messes with the schema url [\#40](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/40)
- BUG json action throws 404 error if in draft mode [\#39](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/39)
- UPDATE FE build tool versions for security [\#34](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/34)
- Use user's location to fill in initial search [\#29](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/29)
- Search address pin [\#28](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/28)

**Merged pull requests:**

- Added a component to show that no results were found [\#46](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/46) ([mak001](https://github.com/mak001))
- Added more docs and link to example for injector stuff [\#45](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/45) ([mak001](https://github.com/mak001))
- Added user location detection [\#42](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/42) ([mak001](https://github.com/mak001))
- Fixed ?stage=Stage causing issues with schema url [\#41](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/41) ([mak001](https://github.com/mak001))
- A search marker can now be provided in the theme [\#38](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/38) ([mak001](https://github.com/mak001))

## [1.0.0-beta6](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.0-beta6) (2019-08-27)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.0-beta5...1.0.0-beta6)

**Merged pull requests:**

- Changed front end maps to use a different api key [\#35](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/35) ([mak001](https://github.com/mak001))

## [1.0.0-beta5](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.0-beta5) (2018-08-13)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.0-beta4...1.0.0-beta5)

**Merged pull requests:**

- Updated recipe-cms version constraints [\#32](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/32) ([mak001](https://github.com/mak001))

## [1.0.0-beta4](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.0-beta4) (2018-06-25)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.0-beta3...1.0.0-beta4)

**Merged pull requests:**

- Now uses info box instead of info window [\#25](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/25) ([mak001](https://github.com/mak001))
- removed filter hiding in form [\#24](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/24) ([mak001](https://github.com/mak001))
- Changed category getter [\#23](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/23) ([mak001](https://github.com/mak001))

## [1.0.0-beta3](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.0-beta3) (2018-06-06)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.0-beta2...1.0.0-beta3)

**Implemented enhancements:**

- Added ability to use custom map styles [\#19](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/19) ([mak001](https://github.com/mak001))

**Closed issues:**

- Add ability to style map easily [\#16](https://github.com/dynamic/silverstripe-locator-frontend-react/issues/16)

**Merged pull requests:**

- Fixed missed class change [\#22](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/22) ([mak001](https://github.com/mak001))
- Fixed bug that arose from an html class change [\#21](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/21) ([mak001](https://github.com/mak001))
- Started to allow components to render into their own containers [\#20](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/20) ([mak001](https://github.com/mak001))
- Updated npm dependencies [\#15](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/15) ([mak001](https://github.com/mak001))
- Added better tests for php side [\#14](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/14) ([mak001](https://github.com/mak001))
- Fixed centering issue [\#13](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/13) ([mak001](https://github.com/mak001))

## [1.0.0-beta2](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.0-beta2) (2018-03-02)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/1.0.0-beta1...1.0.0-beta2)

**Merged pull requests:**

- Translation support [\#12](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/12) ([mak001](https://github.com/mak001))
- Pagination [\#11](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/11) ([mak001](https://github.com/mak001))

## [1.0.0-beta1](https://github.com/dynamic/silverstripe-locator-frontend-react/tree/1.0.0-beta1) (2018-01-25)

[Full Changelog](https://github.com/dynamic/silverstripe-locator-frontend-react/compare/0c3518a6564b953289043267f9d6ef2b7df56ea3...1.0.0-beta1)

**Merged pull requests:**

- Fixed filter button not opening filter area [\#10](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/10) ([mak001](https://github.com/mak001))
- changed the layout [\#9](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/9) ([mak001](https://github.com/mak001))
- updated and pruned docs [\#8](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/8) ([mak001](https://github.com/mak001))
- Fixing issues on codeclimate [\#7](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/7) ([mak001](https://github.com/mak001))
- Coverage is no longer collected from js test directory [\#6](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/6) ([mak001](https://github.com/mak001))
- Updated codeclimate config [\#5](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/5) ([mak001](https://github.com/mak001))
- Overrides GET variable names from geocoder and locator [\#4](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/4) ([mak001](https://github.com/mak001))
- Fixed selected category not persisting after load [\#3](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/3) ([mak001](https://github.com/mak001))
- Scrutinizer now runs for javascript and php [\#1](https://github.com/dynamic/silverstripe-locator-frontend-react/pull/1) ([mak001](https://github.com/mak001))



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator)*
