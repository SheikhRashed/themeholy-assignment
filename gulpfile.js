  const gulpif = require('gulp-if');
  const arg = require('yargs').argv;
  const minify = require('gulp-minifier');
  const nunjucks = require('gulp-nunjucks');
  const strip = require('gulp-strip-comments');
  const sourcemaps = require('gulp-sourcemaps');
  const fileinclude = require('gulp-file-include');
  const htmlbeautify = require('gulp-html-beautify');
  const sass = require('gulp-sass')(require('sass'));
  const {src, dest, series, watch } = require('gulp');
  
  const browserSync = require('browser-sync').create();
  const reload = browserSync.reload;
  const run = require('gulp-run-command').default;
  const path = require('path');
  
  
  const configs = {
    nodeRoot: './',
    srcPath: 'src',
    version: '1.0.0',
    dirLocal: '',
    released: '07.14.2024',
    markup: {
        copyright: '2024'
    },
    html: {
        beautify: { indentSize: 0, indent_with_tabs: false, preserve_newlines: false },
        minify: { indentSize: 0, indent_with_tabs: false, preserve_newlines: false, indent_char: '', eol: '' }
    },
    build: {
        local: 'local',
        server: 'server',
    },
    server: {
        path: 'server',
        folder: 'html'
    }
  };
  

  function copyAssetsAndSources(cb) {
    var cmnd = (arg._[0]) ? arg._[0] : 'build';
    var type = (cmnd == 'build' || cmnd == 'develop') ? 'local' : cmnd;
    var distPath = ( cmnd === 'server' ) ? `${configs.server.path}/` :  configs.build[type];

    src(`${configs.srcPath}/images/**`).pipe(dest(`${distPath}/images`));
    src(`${configs.srcPath}/assets/**`).pipe(dest(`${distPath}/assets`));
    src([`${configs.srcPath}/form/**`, `!${configs.srcPath}/form/*-package.php`]).pipe(dest(`${distPath}/form`));
  
    cb();
  }

  // compile html file of niomobile
  function compileHtml(cb) {
  
    var cmnd = (arg._[0]) ? arg._[0] : 'build',
    local = (arg.local) ? true : false,
    // live = (arg.live) ? true : false,
    type = (cmnd == 'build' || cmnd == 'develop') ? 'local' : cmnd;
  
    var build = configs.build[type],
      isMinify = (type == 'server') ? true : false,
      beautify = (type == 'server') ? 'minify' : 'beautify';
  
    var linkURL = (local ? configs.dirLocal : ''),
      imagePath = linkURL + 'images/',
      assetPath = linkURL + 'assets/',
      distPath = ( cmnd === 'server' ) ? `${configs.server.path}/` : `${build}/`;


    src([`${configs.srcPath}/html/*.njk`, `${configs.srcPath}/html/**`, `!${configs.srcPath}/html/_partial/**`])
      .pipe(nunjucks.compile({
          build: build,
          URL: linkURL,
          assetRoot: assetPath,
          imageRoot: imagePath,
          VER: configs.version,
          YEAR: configs.markup.copyright,
      }))
      .pipe(gulpif(isMinify, strip()))
      .pipe(htmlbeautify(configs.html[beautify]))
      .pipe(dest(distPath));
  
    cb();
  }

  
  // compile scss file of niomobile
  function compileSCSS(cb) {
    var file = arg.css ? arg.css : '*';
    var cmnd = (arg._[0]) ? arg._[0] : 'build';
    var type = (cmnd == 'build' || cmnd == 'develop') ? 'local' : cmnd;
    var distPath = `${configs.build[type]}/assets/css`,
        output = (type == 'server') ? 'compressed' : 'expanded',
        source = (type == 'local') ? true : false;
  
    src([`${configs.srcPath}/scss/${file}.scss`])
        .pipe(gulpif(source, sourcemaps.init()))
        .pipe(sass({ outputStyle: output }).on('error', sass.logError))
        .pipe(gulpif(source, sourcemaps.write('./')))
        .pipe(dest(`${distPath}`))
        .pipe(browserSync.stream());
    cb();
  }
  
  // compile js file of niomobile
  function compileJS(cb) {
    
    var cmnd = (arg._[0]) ? arg._[0] : 'build';
    var type = (cmnd == 'build' || cmnd == 'develop') ? 'local' : cmnd;
  
    var distPath = `${configs.build[type]}/assets/js`,
        build = (type == 'local') ? 'local' : type,
        isMinify = (type == 'server') ? true : false;
  
    src([`${configs.srcPath}/js/**`, `!${configs.srcPath}/js/vendors/**`])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@root',
            context: {
                vendorRoot: 'src',
                build: build,
                nodeRoot: configs.nodeRoot
            }
        }))
        .pipe(gulpif(isMinify, minify({ minify: true, minifyJS: { sourceMap: false } })))
        .pipe(dest(`${distPath}`));
        
    cb();
  }

  // #Development Server For App & Docs 
  exports.develop = function () {
  
    browserSync.init({
      port: 4040,
      server: {
        baseDir: `./${configs.build.local}/`
      },
    });
  
  
    // watching assets & Images
    watch([`${configs.srcPath}/assets/**`, `${configs.srcPath}/images/**`], copyAssetsAndSources);
    watch([`local/assets/images/**`, `local/images/**`]).on('change', reload);
  
    // watching scss & css 
    watch([`${configs.srcPath}/scss/**`], { ignoreInitial: false }, compileSCSS);
    watch([`local/assets/css/*.css`]).on('change', reload);
  
    // watching html 
    watch([`${configs.srcPath}/html/*.njk`, `${configs.srcPath}/html/**`, `${configs.srcPath}/html/**/*.njk`], compileHtml);
    watch([`local/*.html`, `local/**/*.html`]).on('change', reload);
  
    // watching js
    watch([`${configs.srcPath}/js/**`], compileJS);
    watch([`local/assets/js/**`]).on('change', reload);
    
  }
  
  // #Build App
  exports.build = series(compileHtml, compileSCSS, compileJS, copyAssetsAndSources);
  exports.server = series(compileHtml, compileSCSS, compileJS, copyAssetsAndSources);