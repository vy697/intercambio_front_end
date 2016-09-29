# InterCambio

![App ScreenShot](img/jumbotron_img3.png)

[Check out the app online here] https://intercambio.surge.sh ||

<!-- [Watch A Video About The App](https://www.youtube.com/watch?v=b_8yTG0VTQc&feature=youtu.be) -->

##### App description
------
Many times, language students lack the component of direct immersion and opportunity to meet and practice with native speakers. InterCambio connects native speakers to language learners who want to develop practical conversation skills in their target languages, in exchange for practice with their partners in their own language. Users are matched based on the language that they speak, the language that they want to learn and their location. Users can create profiles with their language specifications, personal details, email, and if they are willing to be pen pals (as an online exchange) with someone. Since this app is intended to connect speakers of different languages, a flexible design been implemented to eliminate possible future limitations to future markets who don't just speak English. The app has been localized to Spanish and internationalized to facilitate future localizations of other languages.

### Technologies
This app was developed in Angular, Express, Knex, Postgres, HTML, Bootstrap, and CSS.

### Licensing
Permission to use, copy, modify and distribute this software and its documentation for any purpose and without fee is hereby granted, provided that the above copyright notice appear in all copies, and that both that the copyright notice and this permission notice appear in supporting documentation, and that the name of rideShare will not be used in advertising or publicity pertaining to distribution of the software without specific, written prior permission. rideShare makes no representations about the suitability of this software for any purpose. It is provided "as is" without express or implied warranty.

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
