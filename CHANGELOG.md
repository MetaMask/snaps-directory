# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.10.0]
### Added
- Add support for screenshots ([#352](https://github.com/MetaMask/snaps-directory/pull/352))

### Changed
- Tweak popularity calculation ([#354](https://github.com/MetaMask/snaps-directory/pull/354))

### Fixed
- Improve modal behavior ([#363](https://github.com/MetaMask/snaps-directory/pull/363))

## [1.9.0]
### Added
- Add support for multiple locales ([#328](https://github.com/MetaMask/snaps-directory/pull/328))

## [1.8.0]
### Added
- Add EIP-6963 support ([#316](https://github.com/MetaMask/snaps-directory/pull/316))

### Changed
- Update banner link and ordering ([#323](https://github.com/MetaMask/snaps-directory/pull/323))
- Simplify protocol name detection ([#317](https://github.com/MetaMask/snaps-directory/pull/317))
- Update popularity label to "Most Popular" ([#302](https://github.com/MetaMask/snaps-directory/pull/302))

### Fixed
- Fix banners for non-circular icons ([#305](https://github.com/MetaMask/snaps-directory/pull/305))

## [1.7.0]
### Added
- Add account management category ([#164](https://github.com/MetaMask/snaps-directory/pull/164), [#301](https://github.com/MetaMask/snaps-directory/pull/301))
- Add announcement banners to home page ([#262](https://github.com/MetaMask/snaps-directory/pull/262), [#299](https://github.com/MetaMask/snaps-directory/pull/299))
- Add privacy policy and terms of use fields ([#296](https://github.com/MetaMask/snaps-directory/pull/296))
- Show permissions on Snap details page ([#255](https://github.com/MetaMask/snaps-directory/pull/255))

### Fixed
- Fix fallback background for `SnapCardImage` ([#286](https://github.com/MetaMask/snaps-directory/pull/286))
- Fix known link detection ([#285](https://github.com/MetaMask/snaps-directory/pull/285))

## [1.6.0]
### Changed
- Redesign the directory experience ([#219](https://github.com/MetaMask/snaps-directory/pull/219), [#223](https://github.com/MetaMask/snaps-directory/pull/223), [#226](https://github.com/MetaMask/snaps-directory/pull/226), [#237](https://github.com/MetaMask/snaps-directory/pull/237), [#238](https://github.com/MetaMask/snaps-directory/pull/238), [#241](https://github.com/MetaMask/snaps-directory/pull/241), [#239](https://github.com/MetaMask/snaps-directory/pull/239), [#242](https://github.com/MetaMask/snaps-directory/pull/242), [#246](https://github.com/MetaMask/snaps-directory/pull/246), [#248](https://github.com/MetaMask/snaps-directory/pull/248), [#249](https://github.com/MetaMask/snaps-directory/pull/249), [#227](https://github.com/MetaMask/snaps-directory/pull/227), [#230](https://github.com/MetaMask/snaps-directory/pull/230), [#251](https://github.com/MetaMask/snaps-directory/pull/251). [#252](https://github.com/MetaMask/snaps-directory/pull/252))
  - Update landing page.
  - Improve look and feel of profile pages.
  - Move search bar to the header.
  - Add related Snaps to profile pages.
  - Add option to sort by latest Snaps.
  - Change colours to match MetaMask design system.

## [1.5.0]
### Changed
- Sort by popularity as default ([#206](https://github.com/MetaMask/snaps-directory/pull/206))

## [1.4.0]
### Added
- Add popularity sorting option ([#193](https://github.com/MetaMask/snaps-directory/pull/193))

### Changed
- Update footer text colour ([#183](https://github.com/MetaMask/snaps-directory/pull/183))
- Search using descriptions ([#192](https://github.com/MetaMask/snaps-directory/pull/192))

## [1.3.1]
### Changed
- Hide Snaps with hidden field ([#166](https://github.com/MetaMask/snaps-directory/pull/166))
- Hide Snaps without a category ([#160](https://github.com/MetaMask/snaps-directory/pull/160))

### Fixed
- Increase search distance ([#167](https://github.com/MetaMask/snaps-directory/pull/167))

## [1.3.0]
### Added
- Add notifications menu for Snaps with available updates ([#155](https://github.com/MetaMask/snaps-directory/pull/155), [#158](https://github.com/MetaMask/snaps-directory/pull/158))
- Add sort option to filter menu ([#146](https://github.com/MetaMask/snaps-directory/pull/146))
- Add custom Segment events ([#151](https://github.com/MetaMask/snaps-directory/pull/151))

### Fixed
- Fix minor design issues ([#158](https://github.com/MetaMask/snaps-directory/pull/158))

## [1.2.1]
### Fixed
- Fix margin around logo on Safari ([#140](https://github.com/MetaMask/snaps-directory/pull/140))

## [1.2.0]
### Added
- Add dark mode ([#126](https://github.com/MetaMask/snaps-directory/pull/126))
- Add sticky header ([#134](https://github.com/MetaMask/snaps-directory/pull/134))
- Add hover state to all buttons ([#127](https://github.com/MetaMask/snaps-directory/pull/127))

### Changed
- Show update button when a new version is available ([#125](https://github.com/MetaMask/snaps-directory/pull/125))
- Render all icons as SVGs ([#133](https://github.com/MetaMask/snaps-directory/pull/133))

## [1.1.1]
### Changed
- Update header tag colours ([#123](https://github.com/MetaMask/snaps-directory/pull/123))

### Fixed
- Fix `/{category}/installed` meta tags ([#122](https://github.com/MetaMask/snaps-directory/pull/122))

## [1.1.0]
### Added
- Add more filtering options ([#111](https://github.com/MetaMask/snaps-directory/pull/111))
- Add category tags and update filter behaviour ([#116](https://github.com/MetaMask/snaps-directory/pull/116))
- Add URLs to enable filters ([#117](https://github.com/MetaMask/snaps-directory/pull/117))
- Add empty state to main page ([#120](https://github.com/MetaMask/snaps-directory/pull/120))

### Changed
- Persist search query and selected categories ([#100](https://github.com/MetaMask/snaps-directory/pull/100))
- Update filter button and search style ([#106](https://github.com/MetaMask/snaps-directory/pull/106))
- Move description in the middle of metadata on mobile screens ([#105](https://github.com/MetaMask/snaps-directory/pull/105), [#119](https://github.com/MetaMask/snaps-directory/pull/119))

### Fixed
- Update MetaMask detection to support Flask ([#114](https://github.com/MetaMask/snaps-directory/pull/114))

## [1.0.2]
### Fixed
- Check if current MetaMask version supports Snaps ([#101](https://github.com/MetaMask/snaps-directory/pull/101))

## [1.0.1]
### Changed
- Update metadata ([#97](https://github.com/MetaMask/snaps-directory/pull/97))

### Fixed
- Fix page not scrolling to top after navigation ([#98](https://github.com/MetaMask/snaps-directory/pull/98))

## [1.0.0]
### Added
- Generate robots.txt file ([#87](https://github.com/MetaMask/snaps-directory/pull/87))

### Changed
- Hide install button if snap requires onboarding ([#88](https://github.com/MetaMask/snaps-directory/pull/88))
- Update copy on the homepage ([#91](https://github.com/MetaMask/snaps-directory/pull/91))
- Always show scrollbar ([#89](https://github.com/MetaMask/snaps-directory/pull/89))

## [0.2.1]
### Fixed
- Fix deployment missing required tokens ([#85](https://github.com/MetaMask/snaps-directory/pull/85))

## [0.2.0]
### Added
- Parse links in trusted descriptions ([#71](https://github.com/MetaMask/snaps-directory/pull/71))
- Add skeleton loader fallback ([#76](https://github.com/MetaMask/snaps-directory/pull/76))
- Add Segment ([#77](https://github.com/MetaMask/snaps-directory/pull/77))

### Changed
- Move installed snaps state to Ethereum provider ([#74](https://github.com/MetaMask/snaps-directory/pull/74), [#83](https://github.com/MetaMask/snaps-directory/pull/83))
- Keep newlines in snap descriptions ([#79](https://github.com/MetaMask/snaps-directory/pull/79))
- Minor design changes ([#75](https://github.com/MetaMask/snaps-directory/pull/75))
- Use known URLs for contact links ([#81](https://github.com/MetaMask/snaps-directory/pull/81))

## [0.1.2]
### Fixed
- Fix installation button responsiveness ([#68](https://github.com/MetaMask/snaps-directory/pull/68))
- Improve search ([#67](https://github.com/MetaMask/snaps-directory/pull/67))
- Add UI improvements for medium screens on a Snap info page ([#65](https://github.com/MetaMask/snaps-directory/pull/65))
- Fix missing website on post install modal ([#63](https://github.com/MetaMask/snaps-directory/pull/63))
- Fix invalid React keys ([#64](https://github.com/MetaMask/snaps-directory/pull/64))

## [0.1.1]
### Changed
- Use descriptions and summaries from the Snaps registry ([#60](https://github.com/MetaMask/snaps-directory/pull/60))

### Fixed
- Fix alignment of audits on Snap details page ([#61](https://github.com/MetaMask/snaps-directory/pull/61))
- Fix translations outside of React context ([#58](https://github.com/MetaMask/snaps-directory/pull/58))

## [0.1.0]
### Changed
- Initial test release.

[Unreleased]: https://github.com/MetaMask/snaps-directory/compare/v1.10.0...HEAD
[1.10.0]: https://github.com/MetaMask/snaps-directory/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/MetaMask/snaps-directory/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/MetaMask/snaps-directory/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/MetaMask/snaps-directory/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/MetaMask/snaps-directory/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/MetaMask/snaps-directory/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/MetaMask/snaps-directory/compare/v1.3.1...v1.4.0
[1.3.1]: https://github.com/MetaMask/snaps-directory/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/MetaMask/snaps-directory/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/MetaMask/snaps-directory/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/MetaMask/snaps-directory/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/MetaMask/snaps-directory/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/MetaMask/snaps-directory/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/MetaMask/snaps-directory/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/MetaMask/snaps-directory/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/MetaMask/snaps-directory/compare/v0.2.1...v1.0.0
[0.2.1]: https://github.com/MetaMask/snaps-directory/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/MetaMask/snaps-directory/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/MetaMask/snaps-directory/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/MetaMask/snaps-directory/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MetaMask/snaps-directory/releases/tag/v0.1.0
