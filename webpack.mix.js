const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/app.js', 'public/js').react();
mix.styles(['resources/css/main.global.css',], 'public/css/main.global.css');
mix.styles(['resources/css/app.css',], 'public/css/app.css');
mix.copy('resources/assets/img', 'public/assets/img');
mix.copy('resources/assets/fonts', 'public/assets/fonts');
