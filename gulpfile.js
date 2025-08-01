import gulp from "gulp";
import rename from "gulp-rename";
import cleanCSS from "gulp-clean-css";
import terser from "gulp-terser";
import gulpIf from "gulp-if";
import { deleteAsync } from "del";
import flatten from "gulp-flatten";

// Define target files for processing, excluding generated and configuration files
const srcFiles = ["**/*.css", "**/*.js", "!**/*.min.*", "!node_modules/**", "!dist/**", "!gulpfile.js", "!.prettierrc", "!.prettierignore", "!package.json", "!bun.lockb"];

// Clean dist folder
async function clean() {
  await deleteAsync(["dist"]);
}

// Minify files
function minify() {
  return gulp
    .src(srcFiles)
    .pipe(gulpIf("*.css", cleanCSS()))
    .pipe(gulpIf("*.js", terser()))
    .pipe(rename({ suffix: ".min" }))
    .pipe(flatten())
    .pipe(gulp.dest("./dist"));
}

// Watch for changes
function watch() {
  // Initial build
  gulp.series(
    clean,
    minify
  )(() => {
    console.log("Initial build complete. Watching for changes...");
  });

  // Watch for changes and rebuild
  gulp
    .watch(srcFiles, minify)
    .on("change", function (path) {
      console.log(`File ${path} was changed`);
    })
    .on("add", function (path) {
      console.log(`File ${path} was added`);
    })
    .on("unlink", function (path) {
      console.log(`File ${path} was removed`);
    });
}

// Build task
const build = gulp.series(clean, minify);

export { clean, minify, watch, build };
export default watch;
