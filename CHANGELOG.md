# Change log

## [0.7.0] - 2015-07-24
### Changed
- ActionCreators to [FSA](https://github.com/acdlite/flux-standard-action).
- Examples to redux 1.0.0-rc.

## [0.6.0] - 2015-06-26
### Changed
- Moved to redux

## [0.5.4] - 2015-06-15
### Fixed
- Typo.

## [0.5.3] - 2015-06-15
### Changed
- Leverage flummox's implicit state update on return from reducers.

## [0.5.2] - 2015-06-14
### Changed
- Moved the store's state normalisation into `#getStateAsObject` so that we can do cleaner `stores`
  calls in our HOC.

## [0.5.1] - 2015-06-13
### Added
- `koa-catch-all` dev server to have page reloads work.

### Fixed
- Cleaned up dependencies

## [0.5.0] - 2015-06-13
### Changed
- Updated example in Playground to inject stores and actions into the dumb component.
- Renamed `keys` to `panels` and its objects from: `{currentUri, panelUri}` to `{context, uri}` to
  resemble better what they do.
- Removed actions class. Export raw functions.
- Extracted store functionality into raw functions too getting them ready to be stripped off their
  state soon.
- Replaced `immutable-js` for `seamless-immutable` as it is lighter and its output are cleaner and
  backwards compatible with vanilla JS types.
- Removed the immutable record.

## [0.4.0] - 2015-06-07
### Added
- Teleports support through a better use of `currentUri` on each key - it now remembers the current app and refers to it as it should.

# [0.3.0] - 2015-05-30
### Added
- `Store#nextUri(from)`. With `from` being a `currentUri` we can now tell whether an action is
  active or not based on the next panel's URI.

### Changed
- Made store keys hold an object rather than a single string. It has two keys now, `currentUri`
  which tells the 'live' URI up until this panel and `panelUri` which is, as before, the URI of the
  panel we should be loading on that position.

## [0.2.3] - 2015-05-24
### Added
- An `onChange` callback to history so that a registering app can tell when the history changed to
  do stuff like updating the app's title.
- `Store#lastPanelUri`.

### Changed
- Fixed history to actually pick up the store changes.

## [0.2.1] - 2015-05-20
### Changed
- Fixed text and got dependencies right.

## [0.2.0] - 2015-05-20
### Changed
- ES6 all the way
- Marty for Flummox

## [0.1.1] - 2015-04-01
### Changed
- Updated dependencies.

## 0.1.0 - 2015-03-18
### Added
- `ActionCreators`, `Constants`, `history`, `Parser` and `Router`.
  Flux constructs implemented through `Marty`.

[unreleased]: https://github.com/UXtemple/panels-router/compare/master..v0.2.1
[0.2.1]: https://github.com/UXtemple/panels-router/compare/v0.2.1..v0.2.0
[0.2.0]: https://github.com/UXtemple/panels-router/compare/v0.2.0..v0.1.1
[0.1.1]: https://github.com/UXtemple/panels-router/compare/v0.1.1..v0.1.0
