#Installation Instructions

###Install angular-translate and embed in HTML
` bower install angular-translate`
`<script src="path/to/angular-translate.js"></script>`

###Inject angular-translate module as a dependency into your app:
`var app = angular.module('myApp', ['pascalprecht.translate']);`

###Config it in your app.js
`app.config(['$translateProvider', function ($translateProvider)`

### install staticFilesLoader extension via Bower and link it in HTML:
`bower install angular-translate-loader-static-files`
`<script src="path/to/angular-translate-loader-static-files.js</script>`
