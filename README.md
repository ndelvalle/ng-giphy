# ng-giphy
An angular module that leverages the awesome [giphy API](https://github.com/Giphy/GiphyAPI) to use it on angular applications

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

#### Service

1. Add `giphy` dependency injection into your controller, service etc.

    ```js
    Controller.$inject = ['giphy'];
    ```
2. Use one of the methods described below

    | Method        | Params              | Returns                    |
    | ------------- |:-------------------:| --------------------------:|
    | find          | Tag or array of Tags| A promise with the Gif url |
    | findById      | Id                  | A promise with the Gif url |
    | random        | Tag or array of Tags| A promise with the Gif url |

##### Usage example:

```js
giphy.find(['cat', 'funny']).then(function(gifUrl) {
    // do something with gifUrl
});
        
giphy.findById('qTpK7CsOq6T84').then(function(gifUrl) {
    // do something with gifUrl
});

giphy.random('cat').then(function(gifUrl) {
    // do something with gifUrl
});
```

    

#### Directives

| Name          | Description         | Aattributes                     |
| ------------- |:-------------------:| -------------------------------:|
| giphy-find    | Gif by tag/s        |  giphy-tag: Tag or array of Tags|
| giphy-find-id | Gif by id           | giphy-id: Gif id                |
| giphy-rand    | Random Gif by tag/s | giphy-tag: Tag or array of Tags |

#### Usage example
```html
<giphy-find giphy-tag='["person", "funny"]'></giphy-find>
<giphy-find-id giphy-id='"qTpK7CsOq6T84"'></giphy-find-id>
<giphy-rand giphy-tag='["meme"]'></giphy-rand>
```
