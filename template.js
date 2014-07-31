/**
 * grunt-facebook-app
 * https://github.com/jepser/grunt-facebook-app
 *
 * Copyright (c) 2014 Nadd.co (Jepser Bernardino)
 * Licensed under the MIT License
 */

'use strict';

// Basic template description
exports.description = 'Create a Facebook app.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after the question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template
exports.template = function( grunt, init, done ) {
	init.process( {}, [
		// Prompt for these values.
		init.prompt( 'title', 'Facebook App' ),
		init.prompt( 'description', 'The best facebook app ever made!' ),
		init.prompt( 'author_name' ),
		init.prompt( 'author_email' ),
		{
			name: 'css_type',
			message: 'CSS Preprocessor: Will you use "Sass", "LESS", or "none" for CSS with this project?',
			default: 'LESS'
		}
	], function( err, props ) {
		props.keywords = [];
		props.version = '0.1.0';
		props.devDependencies = {
			'grunt': '~0.4.1',
			'matchdep': '~0.1.2',
			'traverse': '~0.0.6',
			'charm': '~0.2.0',
			'deep-is': '~0.1.2',
			'sigmund': '~1.0.0',
			'grunt-contrib-concat': '~0.1.2',
			'grunt-contrib-uglify': '~0.1.1',
			'grunt-contrib-cssmin': '~0.6.0',
			'grunt-contrib-jshint': '~0.1.1',
			'grunt-contrib-nodeunit': '~0.1.2',
			'grunt-contrib-watch': '~0.2.0',
			'grunt-contrib-copy' : '~0.4.1',
			'grunt-include-replace' : '~2.0.0'
		};
		
		// Sanitize names where we need to for PHP/JS
		props.name = props.title.replace( /\s+/g, '-' ).toLowerCase();
		// An additional value, safe to use as a JavaScript identifier.
		// An additional value that won't conflict with NodeUnit unit tests.

		// Files to copy and process
		var files = init.filesToCopy( props );

		switch( props.css_type.toLowerCase()[0] ) {
			case 'l':
				delete files[ 'src/styles/sass/app.scss'];
				delete files[ 'src/styles/src/app.css' ];
				
				props.devDependencies["grunt-contrib-less"] = "~0.11.2";
				props.css_type = 'less';
				break;
			case 'n':
			case undefined:
				delete files[ 'src/styles/less/app.less'];
				delete files[ 'src/styles/sass/app.scss'];
				
				props.css_type = 'none';
				break;
			// SASS is the default
			default:
				delete files[ 'src/styles/less/app.less'];
				delete files[ 'src/styles/src/app.css' ];
				
				props.devDependencies["grunt-contrib-sass"] = "~0.7.3";
				props.css_type = 'sass';
				break;
		}
		
		console.log( files );
		
		// Actually copy and process files
		init.copyAndProcess( files, props );
		
		// Generate package.json file
		init.writePackageJSON( 'package.json', props );
		
		// Done!
		done();
	});
};
