/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Version: 3.2.0
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'dux',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            //'app.translate',
            'app.settings',
            'app.utils'            
        ]);    
})();

