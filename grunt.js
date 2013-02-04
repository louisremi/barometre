/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! Barometre - v<%= meta.version %> - */'
    },
    concat: {
      js: {
        src: [
          'script/libs/jquery.js',
          'script/libs/lodash.js',
          'script/libs/backbone.js',
          'script/libs/raphael.js',
          'script/libs/g.raphael.js',
          'script/libs/g.line.js',
          
          'script/app.js',

          'script/views/Links.js',
          'script/views/TabMenu.js',
          'script/views/DisplayMenu.js',
          'script/views/YearMenu.js',
          'script/views/MonthMenu.js',
          'script/views/QuestionMonth.js',
          'script/views/QuestionEvolution.js',
          'script/views/QuestionYear.js',
          'script/views/QuestionCompare.js',
          'script/views/actualite_views.js',
          'script/views/conso_views.js',

          'script/bpce.ui.js',
          'script/views/manager.js',
          'script/bpce.slider.js',
          'script/model.js',
          'script/router.js'
        ],
        dest: 'script/barometre.all.js'
      },
      css: {
        src: [
          'css/normalize.css',
          'css/index.css'
        ],
        dest: 'css/barometre.all.css'
      }
    },
    min: {
      js: {
        src: ['script/barometre.all.js'],
        dest: 'script/barometre.all.min.js'
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

};
