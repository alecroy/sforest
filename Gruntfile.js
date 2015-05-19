'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: {
        src: ['./*.js', './test/**/*_test.js'],
        options: {
          curly: true,
          eqeqeq: true,
          expr: true,
          mocha: true,
          node: true,
          strict: true,
          undef: true,
          unused: true,
        },
      },
    },
    jscs: {
      all: {
        src: ['./*.js', './test/**/*_test.js'],
        options: {
          config: '.jscsrc',
          verbose: true,
        },
      },
    },
    simplemocha: {
      all: {
        src: ['./test/**/*_test.js'],
      },
    },
    watch: {
      files: ['./*.js', './test/**/*_test.js'],
      tasks: ['lint', 'test'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('test', 'simplemocha');
  grunt.registerTask('lint', ['jshint', 'jscs']);

  grunt.registerTask('default', ['lint', 'test']);
};
