'use strict';

app.service('localizeService', ['$location', '$translate', '$window', function($location, $translate, $window) {

    var sv = this;

    //store lang keys here
    sv.keys = {
        en: 'en',
        es: 'es',
        err: {
            en: 'please fill out all the fields!',
            es: '¡favor de rellenar todos los campos!'
        },
        yes_results: {
            en: 'your search results: ',
            es: 'los resultados de tu búsqueda: ' //+Spanish exchanges in city
        },
        no_results: {
            en: 'Ahh shucks. No results were returned for your search',
            es: '¡Maldita sea! No hay resultados para tu búsqueda.'
        },
        form_validate: {
            en: {
                form_invalid: 'Please fill out the required fields *',
                form_valid: 'Sweet. All good to go.',
                name_required: 'Your name is required!',
                name_length: 'You must have more than two letters...',
                email_required: 'Email is required.',
                email_valid: 'Please include a valid email',
                pw_required: 'A password is required',
                pw_length: 'Password needs to contain: 6 alphanumeric characters minimum, at least one number, no special characters',
                pw_retype: 'Please retype your pw',
                pw_no_match: 'Passwords don\'t match!',
                pw_maxlength: 'Password can\'t be longer than 20 characters',
                city: 'Tell us where you want to find your exchange.',
                photo_url: 'Not a valid photo_url',
                photo_url_length: 'Your url is too loooooong',
                lang_preference: 'What language do you want your account to be in?',
                i_speak: 'Tell us what language you speak.',
                lang_level: 'Don\'t forget about the level!',
                i_learn: 'What language do you want to learn?'

            },
            es: {
                form_invalid: 'Por favor, rellena los campos requeridos *',
                form_valid: 'Perfecto. List@s para empezar.',
                name_required: 'Hay que poner el nombre!',
                name_length: 'El nombre tiene que contener como mínimo dos letras...',
                email_required: 'El email es necesario',
                email_valid: 'Por favor, introduce un email válido',
                pw_required: 'Vas a necesitar una contraseña...',
                pw_length: 'La contraseña tiene que contener: como mínimo 6 caracteres alfanuméricos, al menos un dígito, y ningún caracter especial',
                pw_retype: 'Por favor, vuelve a introducir la contraseña',
                pw_no_match: '¡Las contraseñas no son iguales!',
                pw_maxlength: 'La contraseña no puede contener más de 20 caracteres',
                city: 'Dinos dónde quieres buscar tu intercambio.',
                photo_url: 'El enlace no es válido',
                photo_url_length: 'El enlace tiene que ser más corto',
                lang_preference: '¿En qué idioma quieres que sea la cuenta?',
                i_speak: 'Dinos el idioma que hablas.',
                lang_level: '¡No te olvides del nivel!',
                i_learn: '¿Qué idioma quieres aprender?'
            }
        }

    };

    sv.localizeForUser = function(key) {
        console.log('localStorage', localStorage.lang_preference);
        //user's language settings determine the language of the session
        if ($window.sessionStorage.token) {
            key = $window.sessionStorage.lang_preference;
            $translate.use(key);
            //if a user's not logged in, save whatever they chose to localStorage, if they happened to change the language from default English
        } else if (localStorage.lang_preference) {
            key = localStorage.lang_preference;
            $translate.use(key);
        } else if (!$window.sessionStorage.token && !localStorage.lang_preference) {
            localStorage.setItem('lang_preference', 'en');
        }
    };

    //THIS WORKS, IT GRABS THE KEY
    sv.changeLanguage = function(key) {
        $translate.use(key);
        //when default lang settings change, store it in local storage so that the setting persists
        localStorage.setItem('lang_preference', key);
        $window.location.href = '/';
    };

}]);


app.service('searchService', ['localizeService', '$http', '$window', function(localizeService, $http, $window) {

    var sv = this;

    sv.cityList = {};

    sv.getCities = function() {
        var lang_preference;

        if ($window.sessionStorage.lang_preference) {
            lang_preference = $window.sessionStorage.lang_preference;
            //request here with whatever lang_preference is in localStorage
        } else if (localStorage.lang_preference) {
            lang_preference = localStorage.lang_preference;
        } else {
            lang_preference = 'en';
        }
        $http.get('http://localhost:3000/search/cities', {
                params: {
                    "lang_preference": lang_preference
                }
            })
            .then(function(data) {
                console.log('cities data: ', data);
                sv.cityList.data = data.data;
            })
            .catch(function(err) {
                console.log('cities err:', err);
            });
    };

    //data of all users stored here
    sv.exchanges = {};

    //TODO: what to do with get all exchanges???
    sv.getExchanges = function() {
        var lang_preference;

        if ($window.sessionStorage.lang_preference) {
            lang_preference = $window.sessionStorage.lang_preference;
            //request here with whatever lang_preference is in localStorage
        } else if (localStorage.lang_preference) {
            lang_preference = localStorage.lang_preference;
        } else {
            lang_preference = 'en';
        }
        $http.get("http://localhost:3000/search", {
                params: {
                    "lang_preference": lang_preference
                }
            })
            .then(function(data) {
                sv.exchanges.data = data.data;
                console.log('THIS IS THE EXCHANGE DATA: ', sv.exchanges);
            })
            .catch(function(err) {
                console.log('where is my data: ', err);
            });
    };

    sv.keys = localizeService.keys;

    // data (list of matches) from findMatches stored here.
    sv.searchResults = {};

    //for home page sugggestions list upon going to home page
    sv.findMatchesForUser = function(i_speak, i_learn, city, lang_preference) {

        lang_preference = $window.sessionStorage.lang_preference;
        i_speak = $window.sessionStorage.i_speak;
        i_learn = $window.sessionStorage.i_learn;
        city = $window.sessionStorage.city;

        console.log('findMatchesForUser invoked', i_speak, i_learn, city, lang_preference);

        return $http.get('http://localhost:3000/search/results', {
                params: {
                    "i_speak": i_speak,
                    "i_learn": i_learn,
                    "city": city,
                    "lang_preference": lang_preference
                }
            })
            .then(function(data) {
                sv.searchResults.data = data.data;
                console.log('initial searchResults data from findMatchesForUser:', data);
            })
            .catch(function(err) {
                console.log('search results err: ', err);
            });
    };

}]);

app.service('userService', ['$location', 'searchService', '$http', '$window', function($location, searchService, $http, $window) {

    var sv = this;

    //for logged in user
    sv.userData = {};

    sv.getUserInfo = function() {
        //if a user is logged in (if a jwt exists), retrieve their info
        //if($window.sessionStorage.token) {
        return $http.get('http://localhost:3000/users')
            .then(function(data) {
                sv.userData.data = data.data.data[0];

                //TODO when you edit convert data type to be used in edit form, look at knex select and test that
                //language levels are getting through
                // sv.userData.data.speaks_language_id += "";
                // sv.userData.data.learns_language_id += "";
                // sv.userData.data.

                //set user settings to grab in findMatches later
                $window.sessionStorage.i_speak = sv.userData.data.speaks_language_id;
                $window.sessionStorage.i_learn = sv.userData.data.learns_language_id;
                $window.sessionStorage.city = sv.userData.data.translated_location;
                console.log('sv.userData.data: ', sv.userData.data);
                searchService.findMatchesForUser();
            })
            .then(function(data) {
                console.log('findMatchesForUser in getUserInfoFunc data: ', data);
            })
            .catch(function(err) {
                console.log('getUserInfo err: ', err);
            });
        //}
    };

    //a non-logged in user's info stored here
    sv.userProfile = {};

    sv.goToProfile = function(user_id) {
        console.log('goToProfile invoked');
        return $http.get('http://localhost:3000/users/profile', {
                params: {
                    "id": user_id
                }
            })
            .then(function(data) {
                sv.userProfile.data = data.data.getUserProfile;
                console.log('goToProfile data:', sv.userProfile.data);
            })
            .then(function() {
                $location.url('/profile');
            })
            .catch(function(err) {
                console.log('goToProfile err: ', err);
            });
    };

}]);

app.service('loginService', ['userService', '$window', '$http', '$location', function(userService, $window, $http, $location) {

    var sv = this;

    sv.userData = userService.userData;

    sv.login = function(email, password) {
        return $http.post('http://localhost:3000/auth', {
                email: email,
                pw: password
            })
            //logs user in with token
            .then(function(result) {
                console.log('login result:', result);
                //set token in window session storage
                $window.sessionStorage.token = result.data.token;
                //set lang_preference in window session storage
                $window.sessionStorage.lang_preference = result.data.profile.lang_preference;
                //send user to their home page
                $location.url('/home');
            })
            .catch(function(err) {
                console.log('login error: ', err);
                delete $window.sessionStorage.token;
            });
    };

}]);

app.service('logoutService', ['$window', '$location', function($window, $location) {

    var sv = this;

    sv.showLogout = false;

    sv.showLogOutFunc = function() {
        if ($window.sessionStorage.token) {
            sv.showLogout = true;
        } else {
            sv.showLogout = false;
        }
    };

    sv.logout = function() {
        delete $window.sessionStorage.token;

        sv.showLogout = false;

        // $location.url('/');
        $window.location.href = '/';

        sv.message = 'successfully logged out';
    };

}]);
