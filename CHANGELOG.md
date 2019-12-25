# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](https://github.com/kdaghari/eggnite-backend/compare/v2.0.0...v2.0.1) (2019-12-25)


### Bug Fixes

* **auth:** return logged in user ([9214308](https://github.com/kdaghari/eggnite-backend/commit/9214308a88ac473065b37084a32cecfc2d66e4ae))

## [2.0.0](https://github.com/kdaghari/eggnite-backend/compare/v1.0.0...v2.0.0) (2019-12-21)


### ⚠ BREAKING CHANGES

* **auth:** All auth related operations use a rest api instead of a mix between gql and rest.

### Bug Fixes

* cors needs to be enabled for auth to work properly on FE ([e362161](https://github.com/kdaghari/eggnite-backend/commit/e362161abbcf46fd164c10bb25b4f1c8b97f4a4a))


* **auth:** update auth module ([48faf2e](https://github.com/kdaghari/eggnite-backend/commit/48faf2edf43acd9caa5c343fda3e0279ea426f7e))

## 1.0.0 (2019-12-09)


### ⚠ BREAKING CHANGES

* **reply:** add comment replying capability

### Features

* sort products by most recent ([bd6c110](https://github.com/kdaghari/project/commit/bd6c11056053ed88ddd802df87ffc6918b6d8a73))
* **notification:** mark as read and fetch unread ([52076d7](https://github.com/kdaghari/project/commit/52076d774038d8ce569d1ceec01ca25b9dfcf17a))
* add commenting ([847d894](https://github.com/kdaghari/project/commit/847d89480171e9845d7a60910948198bb29b8f78))
* add missing user and auth features, ([595ebaa](https://github.com/kdaghari/project/commit/595ebaa62fce64593d1683d27e605abbc140a3dd))
* add notifications ([5af79f9](https://github.com/kdaghari/project/commit/5af79f97dfe57f2fd66707627cdc320a7684fa95))
* add user authentication ([3f08b1d](https://github.com/kdaghari/project/commit/3f08b1de8fcd962de64f2762f044da0ffd04b385))
* add user profile ([581b56c](https://github.com/kdaghari/project/commit/581b56c848c4308ccde1dbd8ee4e3f42dbbc84a6))
* use validation globally ([c6f14ce](https://github.com/kdaghari/project/commit/c6f14cefee9223f422bc2618c4cf0c35ac24d1b4))
* **module:** add product ([2c5d431](https://github.com/kdaghari/project/commit/2c5d4317b9ee2362217f937c0c20191cdae37063))
* **module:** add voting functionality ([53e44fd](https://github.com/kdaghari/project/commit/53e44fdd6536b919ca09a3dca196672231494a2e))
* **reply:** add comment replying capability ([0ff2e8f](https://github.com/kdaghari/project/commit/0ff2e8fdc1a9ec0b3c09cf2cdccaac3efe73f3b0))
* **reply:** add replying to a comment capability ([19fd7f1](https://github.com/kdaghari/project/commit/19fd7f1d348f3ef481a562802b6dbc565cacb200))
* **wip:** add validation ([eadeb26](https://github.com/kdaghari/project/commit/eadeb26e62806a8cb0cf83d593a2fb29e8dfc0c0))


### Bug Fixes

* forgot to use defined constant in main module ([beaf09b](https://github.com/kdaghari/project/commit/beaf09bd440955290c81bd4cfcc03e03cbca98b2))
* **product:** delete operation removes product and all its related entities ([bda76d5](https://github.com/kdaghari/project/commit/bda76d5da4d042e2e1334f4cf906e98f12e34215))
