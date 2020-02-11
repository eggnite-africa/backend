# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/kdaghari/eggnite-backend/compare/v1.0.0...v3.0.0) (2020-02-11)


### ⚠ BREAKING CHANGES

* s3 links are not valid fqdns, so instead simply check whether input is string or not.
* in removing subscriptions I had to refactor how notifications are managed, essentially each of comment and vote entity now call their respective serivce method directly
* DB access will change depending on current env
* **wip:** 1. the pubSub custom provider was missing
2. was pointing to wrong type/class (use graphql-subscriptions instead of type-graphql)
3. naming was wrong, subscription's name should be same as topic's
4. sub was returning wrong type
* let the website column be nullable as a product might have an app without a website or a repo but without a website
* product links are now an independant entity. Will be used for stats later on.
* validation is still being done both server-side and client-side except for some columns for  flexibility
* **auth:** All auth related operations use a rest api instead of a mix between gql and rest.

### Features

* add admin access ([563f491](https://github.com/kdaghari/eggnite-backend/commit/563f49168c84362a9b859ad7a17bb0f00eb7c4cd))
* add comment post date ([d5adf31](https://github.com/kdaghari/eggnite-backend/commit/d5adf31d7785ba880e513b9ad1b159be44668cbf))
* add createdAt and updatedAt columns ([85861de](https://github.com/kdaghari/eggnite-backend/commit/85861de744e9904122308cbdc603ceefd30e318c))
* add email uniquess check ([cfc6232](https://github.com/kdaghari/eggnite-backend/commit/cfc62323131a5926ab33f9887fdf40536e7baedc))
* add input validation ([b92680e](https://github.com/kdaghari/eggnite-backend/commit/b92680e8d7be5e7474ebe9b9efa3a6eb7768056d))
* add product search ([ce636ab](https://github.com/kdaghari/eggnite-backend/commit/ce636ab883dcce95642c0962d84f51b1fe3b2976))
* add profile picture ([924f350](https://github.com/kdaghari/eggnite-backend/commit/924f3500fe3b107ba383f8d91c56f59f78d7652d))
* add user deletion ([cd3f970](https://github.com/kdaghari/eggnite-backend/commit/cd3f970e54c474709411f96d4fc055760222029e))
* add user feedback ([a24a7e1](https://github.com/kdaghari/eggnite-backend/commit/a24a7e11b5cbbc436c0037b0c31d2bbe7f5c420f))
* add user type ([c1bc33e](https://github.com/kdaghari/eggnite-backend/commit/c1bc33ea60e006d278ee1a894ff5de1d2e508a49))
* check identifier existance ([ae2961a](https://github.com/kdaghari/eggnite-backend/commit/ae2961ac32b1ee91aa0f9ed14e73883ac8faad66))
* check product existance by name ([7c94d79](https://github.com/kdaghari/eggnite-backend/commit/7c94d79467e7c16c803052fd19cc59d3fb8f1512))
* check user password ([977d76f](https://github.com/kdaghari/eggnite-backend/commit/977d76f5217b163b4f02eab7d823cee305d3f6c2))
* fetch all users (for makers autosuggestion) ([01ab21a](https://github.com/kdaghari/eggnite-backend/commit/01ab21abd810d9d775bc34a64a6efd9b170b58a7))
* fetch unread user notifications ([d8c9cff](https://github.com/kdaghari/eggnite-backend/commit/d8c9cff4351b1568878f4e5ef038b78c00c63661))
* fetch user by id ([6032809](https://github.com/kdaghari/eggnite-backend/commit/6032809411251c96c66d24db1261fb9ead494446))
* fetch user upvotes ([2fd3d48](https://github.com/kdaghari/eggnite-backend/commit/2fd3d482769a770fe3e60f09b18fea20b4723d37))
* improved structure of product links ([d94f54c](https://github.com/kdaghari/eggnite-backend/commit/d94f54c61dbe8d9ff1ca1cef040de83591154e09))
* make db access dynamic ([be5abcb](https://github.com/kdaghari/eggnite-backend/commit/be5abcb803a50ff6791db807639c36c0d591e3c3))
* store poster id (in case he's not the maker) ([f4f5e9f](https://github.com/kdaghari/eggnite-backend/commit/f4f5e9fa97182d7a49106b1a4de45c6262bed443))
* update user type ([c8438bc](https://github.com/kdaghari/eggnite-backend/commit/c8438bc5cbcafed76685bbe8d6b962f62a121c31))
* update user type when adding poduct ([af9ffa8](https://github.com/kdaghari/eggnite-backend/commit/af9ffa8e75696c7383d16b1145dbe02cd83cfee7))
* user can change his password ([4c0e919](https://github.com/kdaghari/eggnite-backend/commit/4c0e919021f2c6fc7e4e895d3c1e6ec59cafbb5e))
* user can mark notification as seen ([030fd33](https://github.com/kdaghari/eggnite-backend/commit/030fd337d80308cf3be3f07cb3a729804b96d6ff))
* user dan change his email ([060348b](https://github.com/kdaghari/eggnite-backend/commit/060348b96525398fbab87d7166b5ed778a5e6de8))
* **profile:** add column for social media links ([386f66c](https://github.com/kdaghari/eggnite-backend/commit/386f66ce1420001acefef7519778fb0d6c88b808))
* **service:** fetch product by name ([df7a270](https://github.com/kdaghari/eggnite-backend/commit/df7a27060ea0976cb0e1fc698d092180ffbc2f83))


### Bug Fixes

* add missing social link prop ([1a0424c](https://github.com/kdaghari/eggnite-backend/commit/1a0424c343a8e4fef28e02c053afd66542324148))
* arg is sent as json therefore, a string ([aa19a59](https://github.com/kdaghari/eggnite-backend/commit/aa19a59414c38bc2979a3518dc6b80813e0956ed))
* avoid race condition by using parallelism ([f8cfa4b](https://github.com/kdaghari/eggnite-backend/commit/f8cfa4bf4f94ed94e807da932c667e5e3974e5bc))
* bug was due to auth depeding on internal prop instead of getting it from the header ([a5e459a](https://github.com/kdaghari/eggnite-backend/commit/a5e459a8acd1bd4ea326fafffff65855e0c38ebb))
* change conditional checking statement ([08b3f55](https://github.com/kdaghari/eggnite-backend/commit/08b3f551196637b8dfc57ee30fc71256bbc9d4d6))
* check if media link is string instead of is valid url ([a1469ed](https://github.com/kdaghari/eggnite-backend/commit/a1469edeb8055526a2b58cc4f74b5416aa9581ef))
* class validator had trouble validating a valid fqdn ([147c8c4](https://github.com/kdaghari/eggnite-backend/commit/147c8c4511befd19a14ce0c1b855700609443a78))
* cors needs to be enabled for auth to work properly on FE ([e362161](https://github.com/kdaghari/eggnite-backend/commit/e362161abbcf46fd164c10bb25b4f1c8b97f4a4a))
* deleting the product deleted its associated links ([685183d](https://github.com/kdaghari/eggnite-backend/commit/685183df57e8143ace1ec4357a8b4f7b1548622d))
* deleting the user deletes their products and/or remove them as makers ([41dcf5b](https://github.com/kdaghari/eggnite-backend/commit/41dcf5b5406413c0adbe19cc11203503c56a1446))
* destructure input and don't ping db if empty ([8c054c9](https://github.com/kdaghari/eggnite-backend/commit/8c054c97d9bee0c75f5e823482f2a9c319263c58))
* double check (maker existance) before deleting product ([51355c6](https://github.com/kdaghari/eggnite-backend/commit/51355c6eff2390bf28c12d3cca1ba89ccbfda6a9))
* eagerly fetch product links relation ([d24d3df](https://github.com/kdaghari/eggnite-backend/commit/d24d3df930edf61945dc8df5ef28124003add025))
* eslint ([ad2e849](https://github.com/kdaghari/eggnite-backend/commit/ad2e849c491ab634fb29e1f948d23daca3b4a990))
* extends jwt token expiration date to 2 years ([d40c897](https://github.com/kdaghari/eggnite-backend/commit/d40c8972f459ef860d67e27ce28d001509d1352a))
* fetch notification and its relations ([bee23e4](https://github.com/kdaghari/eggnite-backend/commit/bee23e450e7f879e8de6cc32b920512699f568e7))
* graphql and postgres should have the right type for social links ([9759266](https://github.com/kdaghari/eggnite-backend/commit/97592662f6fdee217351367f233cfc338fb6334f))
* jwt payload and req header casing ([8734bc0](https://github.com/kdaghari/eggnite-backend/commit/8734bc04343630c888d390dfc2995b5ad4167e07))
* makers ids are required ([6d3406d](https://github.com/kdaghari/eggnite-backend/commit/6d3406de549ce4acb015397bf7d2a11e8811f631))
* not finding user ([d3fe3c9](https://github.com/kdaghari/eggnite-backend/commit/d3fe3c99c158fa23cfee31f7d8d62cf33158d522))
* ping db only if needed ([94de04a](https://github.com/kdaghari/eggnite-backend/commit/94de04a9ae4a24562c870dad7f37728945aa9dad))
* poster id should be a many-to-one relation ([7e37f6f](https://github.com/kdaghari/eggnite-backend/commit/7e37f6fa4a0a797e3d592d78d881f8dbd36dd5ef))
* remove column restriction ([870a243](https://github.com/kdaghari/eggnite-backend/commit/870a243e8af9a11a0b824e4a821201e816a81620))
* remove nonfunctioning code ([735f1cc](https://github.com/kdaghari/eggnite-backend/commit/735f1ccc30f1f0e9759db605a048e022f14c86b4))
* remove subscriptions as they're not needed ([05b02e4](https://github.com/kdaghari/eggnite-backend/commit/05b02e42d616912875c0dd9c2ac051af3f526c70))
* rename vars ([c060fc8](https://github.com/kdaghari/eggnite-backend/commit/c060fc8cdd1e3832af757a64d7c3fbf556f9ca1c))
* return boolean instead of the error ([17fde70](https://github.com/kdaghari/eggnite-backend/commit/17fde700169fcaaba2e962fef0639021633b2b07))
* send notifications only to the receiver ([5fed192](https://github.com/kdaghari/eggnite-backend/commit/5fed192705754c07674551e4b760af483f7f0205))
* social links column should contain an array of strings ([4613998](https://github.com/kdaghari/eggnite-backend/commit/4613998b2131c2395489183b993ea8237867589e))
* sort comments by most recently made (CREATED) ([4bb1802](https://github.com/kdaghari/eggnite-backend/commit/4bb1802c4ef6eb3c8cc43a40fe805cdea7dac5c2))
* sort notifications by most recent ([16bbbd9](https://github.com/kdaghari/eggnite-backend/commit/16bbbd95df0e01f5c2eda389fff5b01241accc0a))
* sql query was wrongly constructed ([db04580](https://github.com/kdaghari/eggnite-backend/commit/db04580dfcb0af6a717b24051dbaa78cd3067ae4))
* there's no need to check for the existance of connection ([6877833](https://github.com/kdaghari/eggnite-backend/commit/687783354225eb0c4ee1874c26972cca69fd1511))
* update media only when needed ([2fd3109](https://github.com/kdaghari/eggnite-backend/commit/2fd3109da53eb22c8a184523383e65bc9cfc893f))
* updating media should be optional ([eec7fa5](https://github.com/kdaghari/eggnite-backend/commit/eec7fa5f5fd40e412008aeabbdd79586b9245a23))
* **wip:** deleting the user deletes all the related info ([883a8ae](https://github.com/kdaghari/eggnite-backend/commit/883a8aed1138ff54c1e7e40fdca396108deb97a3))
* username min length is 2 ([52caeaf](https://github.com/kdaghari/eggnite-backend/commit/52caeaffb9b724ddd096e3b30702c33a91142b39))
* website should be nullable ([580921e](https://github.com/kdaghari/eggnite-backend/commit/580921e9f4189058d35edea2dbdfe9146b3efcae))
* when deleting account remove them from product with multiple makers ([4a87731](https://github.com/kdaghari/eggnite-backend/commit/4a877316bd93aacfef73238542a791fce872066c))
* **auth:** rename route more appropriately ([74b0664](https://github.com/kdaghari/eggnite-backend/commit/74b066421d22949973b568f22dfcb8aea7879d30))
* **auth:** return logged in user ([9214308](https://github.com/kdaghari/eggnite-backend/commit/9214308a88ac473065b37084a32cecfc2d66e4ae))
* **wip:** subscription is now working ([ec5368a](https://github.com/kdaghari/eggnite-backend/commit/ec5368ad024ec31f4c57a8b95b168fe87dbe61e8))
* update product and its related columns ([78af84f](https://github.com/kdaghari/eggnite-backend/commit/78af84f7397fabc4716e395ce8d4d058e556f25b))


* **auth:** update auth module ([48faf2e](https://github.com/kdaghari/eggnite-backend/commit/48faf2edf43acd9caa5c343fda3e0279ea426f7e))

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
