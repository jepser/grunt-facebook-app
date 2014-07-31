module.exports = function( grunt ) {
	'use strict';

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration
	grunt.initConfig( {
		pkg:    grunt.file.readJSON( 'package.json' ),
		//add bower vendor clients
		vendorResources: {
			js : [],
			css : []
		},
		concat: {
			all : {
				options: {
					stripBanners: true,
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
						' * Licensed GPLv2+' +
						' */\n'
				},
				files : {
	                'app/scripts/vendor.js':'<%= vendorResources.js %>',
	                'app/styles/vendor.css':'<%= vendorResources.css %>'
				}
			}
		},
		jshint: {
			browser: {
				all: [
					'app/scripts/**/*.js',
				],
				options: {
					jshintrc: '.jshintrc'
				}
			},
			grunt: {
				all: [
					'Gruntfile.js'
				],
				options: {
					jshintrc: '.gruntjshintrc'
				}
			}   
		},
		uglify: {
			all: {
				files: {
					'app/scripts/app.min.js': ['src/scripts/app.js'],
				},
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
						' * Licensed GPLv2+' +
						' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},
		{% if ('sass' === css_type) { %}
		sass:   {
			all: {
				files: {
					'app/styles/app.css': 'src/styles/app.scss'
				}
			}
		},
		{% } else if ('less' === css_type) { %}
		less:   {
			all: {
				files: {
					'app/styles/app.css': 'src/styles/app.less'
				}
			}
		},
		{% } %}
		cssmin: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			minify: {
				expand: true,
				cwd: 'app/styles/',
				src: ['app.css'],
				dest: 'app/styles/',
				ext: '.min.css'
			}
		},
		copy: {
			all : {
				files : [
	            	{
	                    expand:true,
	                    cwd: 'src/includes',
	                    src: '*',
	                    dest: 'app/includes/',
	                    flatten: true
	                },
	                {
	                    expand:true,
	                    cwd: 'src/services',
	                    src: '*',
	                    dest: 'app/services/',
	                    flatten: true
	                }
            	]
			},
            statics : {
            	files : [
	            	{
	                    expand:true,
	                    cwd: 'src/images',
	                    src: '*',
	                    dest: 'app/images/',
	                    flatten: true
	                },
	                {
	                    expand:true,
	                    cwd: 'src/fonts',
	                    src: '*',
	                    dest: 'app/fonts/',
	                    flatten: true
	                }
            	]
            }
        },
		includereplace: {
			all: {
				options: {
					includesDir : 'src/partials',
				},
				files : [
                    {
                        cwd : 'src/',
                        src: ['*.html', '**/*.html'],
                        dest : 'app',
                        expand : true
                    }
                ]
			}
		},
		watch:  {
			{% if ('sass' === css_type) { %}
			sass: {
				files: ['src/styles/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			{% } else if ('less' === css_type) { %}
			less: {
				files: ['src/styles/*.less'],
				tasks: ['less', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			{% } else { %}
			styles: {
				files: ['src/styles/*.css'],
				tasks: ['cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			{% } %}
			scripts: {
				files: ['src/scripts/**/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					debounceDelay: 500
				}
			},
			includes : {
				files : ['src/**/*.html'],
				tasks : ['includereplace']
			},
			server : {
				files : ['src/includes/*', 'src/services/*'],
				tasks : ['copy.all']
			}
		}
	} );

	// Default task.
	{% if ('sass' === css_type) { %}
	grunt.registerTask( 'default', ['jshint', 'concat', 'uglify', 'sass', 'cssmin', 'includereplace'] );
	{% } else if ('less' === css_type) { %}
	grunt.registerTask( 'default', ['jshint', 'concat', 'uglify', 'less', 'cssmin', 'includereplace'] );
	{% } else { %}
	grunt.registerTask( 'default', ['jshint', 'concat', 'uglify', 'cssmin', 'includereplace'] );
	{% } %}

	grunt.util.linefeed = '\n';
};