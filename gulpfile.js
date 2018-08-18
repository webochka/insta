const gulp         = require('gulp');
const stylus       = require('gulp-stylus');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const concat       = require('gulp-concat');
const include      = require('gulp-include');
const gutil        = require('gulp-util');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const handlebars   = require('gulp-handlebars');
const wrap         = require('gulp-wrap');
const declare      = require('gulp-declare');
const cache        = require('gulp-cached');
const eslint       = require('gulp-eslint');
const merge        = require('merge-stream');
const sequence     = require('run-sequence');
const path         = require('path');
const del          = require('del');
const server       = require('browser-sync').create();

const errorHandler = (title = 'Error') => plumber({
  errorHandler: notify.onError({
    title,
    message: '<%= error.message %>',
    sound: 'Submarine'
  })
});

const isProd = gutil.env.prod;

gulp.task('server', () => {
  server.init({
    server: {
      baseDir: ['public', 'src'],
      routes: {
        '/libs': 'node_modules'
      }
    },
    files: [
      'public/css/**/*.css',
      'public/js/**/*.js',
      'public/**/*.html'
    ],
    open: gutil.env.open !== false,
    ghostMode: false,
    middleware: [
      require('connect-history-api-fallback')()
    ]
  });
});


gulp.task('styles', () => {
  return gulp
    .src('src/css/[^_]*.styl')
    .pipe(errorHandler())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      paths: ['src/css', 'node_modules'],
      'include css': true,
      compress: isProd
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/css'));
});


const bundleScripts = (src) => {
  return gulp
    .src(src)
    .pipe(errorHandler())
    .pipe(sourcemaps.init())
    .pipe(include({
      includePaths: [
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'src', 'js')
      ]
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
};

gulp.task('scripts:vendor', () => {
  return bundleScripts('src/js/vendor.js');
});

gulp.task('scripts:app', () => {
  return bundleScripts('src/js/app.js');
});

gulp.task('scripts', [
  'scripts:vendor',
  'scripts:app'
]);


gulp.task('lint', () => {
  return gulp
    .src([
      'src/js/**/*.js',
      '!src/js/vendor.js',
      '!node_modules/**'
    ])
    .pipe(errorHandler())
    .pipe(cache('lint'))
    .pipe(eslint())
    .pipe(eslint.format());
});


gulp.task('templates', () => {
  const hbs = require('handlebars');

  const partials = gulp
    .src('src/templates/**/_*.hbs')
    .pipe(errorHandler())
    .pipe(handlebars({
      handlebars: hbs
    }))
    .pipe(wrap('Handlebars.registerPartial(<%= partName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
      imports: {
        partName(fileName) {
          return JSON.stringify(path.basename(fileName, '.js').substr(1));
        }
      }
    }));


  const templates = gulp
    .src('src/templates/**/[^_]*.hbs')
    .pipe(errorHandler())
    .pipe(handlebars({
      handlebars: hbs
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'templates',
      noRedeclare: true
    }));

  return merge(partials, templates)
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('static:html', () => {
  return gulp
    .src('src/index.html')
    .pipe(errorHandler())
    .pipe(gulp.dest('public'));
});

gulp.task('static:fonts', () => {
  return gulp
    .src([
      'node_modules/font-awesome/fonts/*.{woff2,woff}',
      'node_modules/bootstrap/dist/fonts/*.{woff2,woff}'
    ])
    .pipe(errorHandler())
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('static:images', () => {
  return gulp
    .src('src/img/**/*.*')
    .pipe(errorHandler())
    .pipe(gulp.dest('public/img'));
});

gulp.task('static', ['static:html', 'static:images', 'static:fonts'], () => {
  return gulp
    .src([
      'src/favicon.ico'
    ])
    .pipe(errorHandler())
    .pipe(gulp.dest('public'));
});


gulp.task('clean', () => {
  return del('public').then((paths) => {
    gutil.log('Deleted:', gutil.colors.magenta(paths.join('\n')));
  });
});


gulp.task('build', (cb) => {
  sequence(
    'clean',
    'styles',
    'scripts',
    // 'lint',
    'templates',
    'static',
    cb
  );
});


gulp.task('watch', () => {
  gulp.watch('src/css/**/*.styl', ['styles']);
  gulp.watch(['src/js/**/*.js', '!src/js/vendor.js'], ['scripts:app', 'lint']);
  gulp.watch('!src/js/vendor.js', ['scripts:vendor']);
  gulp.watch('src/index.html', ['static:html']);
  gulp.watch('src/templates/**/*.hbs', ['templates']);
});


gulp.task('default', () => {
  sequence(
    'build',
    'watch',
    'server'
  );
});
