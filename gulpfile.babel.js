// based on https://css-tricks.com/gulp-for-wordpress-creating-the-tasks/

import { src, dest, watch, series, parallel } from "gulp";
// for dev and production flag
import yargs from "yargs";
import cleanCss from "gulp-clean-css";
import gulpif from "gulp-if";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "autoprefixer";
import gulp from "gulp";
import sass from "gulp-dart-sass";
// deleting assets dist folder
import del from "del";
import webpack from "webpack-stream";
import named from "vinyl-named";
import browserSync from "browser-sync";

/**
 * Paths to project folders
 */

var paths = {
  input: "assets/src/",
  output: "assets/dist/",
  styles: {
    input: [
      "assets/src/css/scss/main.scss",
      "assets/src/css/scss/editor-styles.scss",
    ],
    output: "assets/dist/css/",
    watch: "assets/src/css/scss/**/*.scss",
  },
  scripts: {
    input: ["assets/src/js/main.js", "assets/src/js/editor.js"],
    output: "assets/dist/js",
    watch: "assets/src/js/**/*.js",
  },
  copy: {
    input: [
      "assets/src/**/*",
      "!assets/src/{js,css}",
      "!assets/src/{js,css}/**/*",
    ],
    output: "assets/dist",
  },
  php: {
    watch: ["**/*.php", "templates/**/*.twig"],
  },
  json: {
    watch: ["**/*.json"],
  },
};

const PRODUCTION = yargs.argv.prod;

export const styles = () => {
  return src(paths.styles.input)
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(
      sass({
        silenceDeprecations: ["legacy-js-api", "mixed-decls"],
      }).on("error", sass.logError)
    )
    .pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
    .pipe(gulpif(PRODUCTION, cleanCss()))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest(paths.styles.output))
    .pipe(server.stream());
};

export const copy = () => {
  return src(paths.copy.input).pipe(dest(paths.copy.output));
};

export const clean = () => del([paths.output]);

// in case there are multiple js files as entry points add it in an area: return src(['src/js/main.js','src/js/admin.js'])
export const scripts = () => {
  return src(["assets/src/js/main.js", "assets/src/js/editor.js"])
    .pipe(named())
    .pipe(
      webpack({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [],
                },
              },
            },
          ],
        },
        mode: PRODUCTION ? "production" : "development",
        devtool: !PRODUCTION ? "inline-source-map" : false,
        output: {
          filename: "[name].js",
        },
        externals: {
          jquery: "jQuery",
        },
      })
    )
    .pipe(dest("assets/dist/js"));
};

export const watchForChanges = () => {
  watch(paths.styles.watch, styles);
  watch(paths.copy.input, series(copy, reload));
  watch(paths.scripts.watch, series(scripts, reload));
  watch(paths.php.watch, reload);
  watch(paths.json.watch, reload);
};

const server = browserSync.create();
export const serve = (done) => {
  server.init({
    proxy: "forstbetrieb-bucheggberg.local",
    open: true, // Automatically open browser
    https: false, // Disable HTTPS
  });
  done();
};
export const reload = (done) => {
  server.reload();
  done();
};

export const dev = series(
  clean,
  parallel(styles, copy, scripts),
  serve,
  watchForChanges
);
export const build = series(clean, parallel(styles, copy, scripts));
export default dev;
