# ng-giphy
An angular module that leverages the [giphy API](https://github.com/Giphy/GiphyAPI) to use it on angular applications

## Usage:

1. Install ng-cooltip from _bower_, _npm_ or import script manually

    ```
    $ bower install ng-giphy --save
    $ npm install ng-giphy --save
    ```

2. Include the supplied JS file. Skip if you use Commonjs modules

    ``` html
    <!-- Bower -->
    <script type='text/javascript' src='bower_components/ng-giphy/dist/ng-giphy.min.js'></script>
    <!-- npm -->
    <script type='text/javascript' src='node_modules/ng-giphy/dist/ng-giphy.min.js'></script>
    ```

3. Add ng-giphy dependency to your app

    ``` js
    angular.module('myApp', ['ng-giphy'])
    ```
    If you use Commonjs modules:

    ```js
    var ngGiphy = require('ng-giphy');
    angular.module('myApp', [ngGiphy])
    ```

#### Configuration
The Giphy API is open to the public. They have instituted a public beta key system to let anyone try it out. The API key is required for all endpoints.
In this module, for test purposes we use the public beta key: "dc6zaTOxFJmzC”. Please use this key while you develop your application and experiment with your integrations. To request a production key or get more information please visit [this link](https://github.com/Giphy/GiphyAPI#request-a-production-key).

If you are using a production key use the ng-giphy config provider to set it up:

```js
angular.module('myApp', ['ng-giphy'])
  .config(runConfig);

runConfig.$inject = ['giphyConfigProvider'];
function runConfig(giphyConfigProvider) {
  // set your private key here
  giphyConfigProvider.setKey('dc6zaTOxFJmzC');
}
```

#### Service

1. Add `giphy` dependency injection into your controller, service etc.

    ```js
    MyController.$inject = ['giphy'];
    function MyController(giphy){
      // use giphy service
    }
    ```
2. Use one of the methods described below

    | Method              | Arguments            | Returns                 |
    | ------------------  |:---------------------:| ---------------------:|
    | find                    | tags, limit, offset  | Gif Collection        |
    | findUrl               | tags, limit, offset  | Gif url's Collection |
    | findById             | id                         | Gif                          |
    | findUrlById        | id                         | Gif url                     |
    | findRandom       | tags                     | Gif                          |
    | findRandomUrl  | tags                     | Gif url                     |
    | findTrending      | limit, offset         |  Gif Collection         |
    | findTrendingUrl | limit, offset         | Gif url's Collection   |

	- `Gif`: [sample](https://github.com/Giphy/GiphyAPI#sample-response-get-gif-by-id)
	- `Gif url`:  [sample](http://media2.giphy.com/media/xT0BKK6YMM8ItytlkY/giphy.gif)
	- `Gif Collection`:  [sample](https://github.com/Giphy/GiphyAPI#sample-response-search)

##### Usage example:

```js
// tags: cat, funny
// limit: 3
// offset: 1
giphy.find(['cat', 'funny'], 3, 1).then(function(gifs) {
  // do something with gif collection
});

// tags: cat
// limit: 25 (Default)
// offset: 0 (Default)
giphy.findUrl('cat').then(function(gifsUrl) {
  // do something with gifs url collection
});

```



#### Directives

| Name          | Description         | Attributes |
| ------------- |:-------------------:| ----------:|
| giphy-find    | Gif by tag/s        | giphy-tag  |
| giphy-find-id | Gif by id           | giphy-id   |
| giphy-rand    | Random Gif by tag/s | giphy-tag  |

##### Usage example
```html
<giphy-find g-tag='["person", "funny"]'></giphy-find>
<giphy-id g-id='"qTpK7CsOq6T84"'></giphy-id>
<giphy-rand g-tag='["meme"]'></giphy-rand>
```
