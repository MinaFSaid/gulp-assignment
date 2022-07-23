const { src, dest,watch, series, parallel } = require('gulp');
const  htmlmin  = require('gulp-htmlmin');

var processhtml = require('gulp-processhtml')

function Html(){
 return src("project/*.html").pipe(processhtml()).pipe(htmlmin({collapseWhitespace:true, removeComments:true}))
 .pipe(dest('dist'))
}
exports.Htmltest=Html

var concat = require('gulp-concat');
var clean = require('gulp-clean-css');
function Css(){
  return src(["project/css/**/*.css","project/css/layout/**/*.css"]).pipe(concat("style.min.css")).pipe(clean())
  .pipe(dest('dist/css'))
}
exports.Csstest=Css

const terser = require('gulp-terser');
function Js(){
  return src("project/js/**/*.js").pipe(concat("script.min.js")).pipe(terser()).pipe(dest('dist/scripts'))
}
exports.Javascript = Js

const image = require('gulp-imagemin');
// const { watch } = require('browser-sync');
function Img(){
  return src("project/pics/*").pipe(image()).pipe(dest('dist/Images'))
}
exports.Images=Img


 
  function Watchtask(){
  watch("project/js/**/*.js",Js)
  watch("project/pics/*",Img)
  watch("project/css/**/*.css",Css)
  watch("project/*.html",Html)
}


exports.default = series (parallel(Html,Css,Js,Img),Watchtask)