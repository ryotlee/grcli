module.exports = function (grunt) {
    var buildPage = 'index';
    grunt.initConfig({
        concurrent: {
            target: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        clean: {
            release: ['./dist']
        },
        copy: {
            main: {
               files: [
                  // includes files within path
                  { expand: true, src: ['src/assets/*'], dest: 'dist/static/assets/', filter: 'isFile' },
                  { expand: true, src: ['src/lib/*'], dest: 'dist/static/lib', filter: 'isFile',flatten: true },
                  // { expand: true, src: ['r.js'], dest: 'dist/static/', filter: 'isFile', flatten: true },
                  { expand: true, src: ['src/*.html'], dest: 'dist/', filter: 'isFile', flatten: true }
                ]
            }
        },
        cssmin: {
            combine: {
                 files: {
                    './dist/static/css/main.min.css': [
                        './src/css/style.css'
                    ]
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './src',
                    name: './main',
                    mainConfigFile: "./r.js",
                    out: './dist/static/main.js'
                }
            }
        },
        uglify: {
          options: {
            mangle: {
              reserved: ['$', 'require', 'define']
            },
            compress: false,
            beautify: false,
            sourceMap: true
          },
          my_target: {
            files: {
              'dist/static/main.min.js': ['dist/static/main.js', 'r.js']
            }
          }
        },
        nodemon: {
            dev: {
                script: 'server/index.js',
                options: {
                    watch: 'dist/**'
                }
            }
        },
        watch: {
          options: {
              livereload: true
          },
          configFiles: {
            files: ['Gruntfile.js', 'r.js'],
            tasks: ['copy']
          },
          // for scripts, run jshint and uglify
          scripts: {
            files: ['src/*.js','src/**/*.js', 'r.js'],
            tasks: ['copy','requirejs', 'uglify']
          },
          css: {
            files: 'src/css/*.css',
            tasks: ['cssmin']
          },
          html: {
            files: 'src/*.html',
            tasks: ['copy']
          }
        }
    });
    //
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concurrent');
    
    //编译
    grunt.registerTask("default", ['build','concurrent:target']);

    //
    grunt.registerTask('build', ['clean', 'copy', 'cssmin', 'requirejs', 'uglify']);
};