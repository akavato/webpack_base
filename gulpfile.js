const gulp = require('gulp');
const smartgrid = require('smart-grid');

var settings = {
    filename: '_smart-grid',
    outputStyle: 'scss',
    columns: 12,
    offset: '0px',
    mobileFirst: true,
    container: {
        maxWidth: '1920px',
        fields: '30px'
    },
    breakPoints: {
        xl: {
            width: '1920px',
            fields: '30px'
        },
        lg: {
            width: '1366px',
            /* -> @media (min-width: 1366px) */
            fields: '30px'
        },
        md: {
            width: '1024px',
            fields: '15px'
        },
        sm: {
            width: '768px',
            fields: '15px'
        },
        xs: {
            width: '444px',
            fields: '0px'
        }
    },
    mixinNames: {
        container: 'wrapper',
        row: 'row-flex',
        rowFloat: 'row-float',
        rowInlineBlock: 'row-ib',
        rowOffsets: 'row-offsets',
        column: 'col',
        size: 'size',
        columnFloat: 'col-float',
        columnInlineBlock: 'col-ib',
        columnPadding: 'col-padding',
        columnOffsets: 'col-offsets',
        shift: 'shift',
        from: 'from',
        to: 'to',
        fromTo: 'from-to',
        reset: 'reset',
        clearfix: 'clearfix',
        debug: 'debug'
    }
};

gulp.task('smartgrid', function(done) {
    smartgrid('src/sass', settings);
    done();
});
