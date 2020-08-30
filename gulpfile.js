const {src, dest, series, watch} = require('gulp')

const browserSync = require('browser-sync').create()
const reload = browserSync.reload

var postcss = require('gulp-postcss');

var pxtoviewport = require('postcss-px-to-viewport');

//协助加载gulp相关插件
const plugins = require('gulp-load-plugins')()
//不是gulp私有前缀
const del = require('del')

//压缩js
function js(cb) {
    src('js/*.js')
        //下一个处理关节
        .pipe(plugins.uglify())
        .pipe(dest('./dist/js'))
        .pipe(reload({stream: true}))//刷新页面上加载的元素 热更新
    //通知结束，解决报错 Did you forget to signal async completion?
   


function css(cb){
  let processors = [
    pxtoviewport({
      viewportWidth: 750,
      viewportUnit: 'vmin'
    })
  ];
  // var processors = [px2rem({remUnit: 75})];
  src('./css/*.scss')
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.autoprefixer({
      cascade: false, //
      remove: false  //自动删除过时的
    }))
    .pipe(postcss(processors))
    .pipe(dest('./dist'))
    .pipe(reload({stream: true}))//刷新页面上加载的元素 热更新
  cb()
};

// function image(cb) {
//   src('./img/*')
//     .pipe(dest('dist/img'))
//   cb()
// }

// function image(cb) {
//     src('sco/img/**/*')
//         .pipe(plugins.imagemin())
//         .pipe(dest('dist/images'))
//     cb()
// }

// 删除dist目录内容
function clean(cb) {
  //.代表相对于gulpfile.js文件的相对路径
  (async () => {
    const deletedPaths = await del('./dist/*.css')
    cb()
  })();
}

function watcher(cb) {
  // watch('js/*.js', js)
  watch('./css/*.scss', css)
}

//server
// function serve(cb) {
//     browserSync.init({
//         server: {
//             baseDir: './'
//         }
//     })
//     cb()
// }
//为了单独可以运行 npx gulp scripts
exports.image = image

//执行npm run build 时 执行的是function
exports.default = series([
  clean,
  // image,
  css,
  watcher
])
