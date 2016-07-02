var cucumber = require('gulp-cucumber');
var gulp = require('gulp');
 
gulp.task('cucumber', function() {
    return gulp.src('tests/features/*').pipe(cucumber({
        'steps': 'tests/features/steps/*.js',
        'support': 'tests/features/support/*.js',
        'format': 'summary'
    }));
});