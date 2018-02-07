$(document).ready(init);



function init() {
    var currentFocus = null;
    var dropped = false;

    $('section').on('click','.box figure',rotateBox);

    $(".sp").draggable({
        revert: 'invalid',
        revertDuration: 800,
        stack: '.sp',
        cancel: '.noDragTemp',
        start: function(){
            $('.dropbox').fadeIn('slow');
        },
        stop: function(){
            $('.dropbox').fadeOut('fast');
        }
    });

    $('.dropbox').droppable({
        accept: '.sp',
        tolerance: 'intersect',
        drop: function(event,ui){
            currentFocus = ui.draggable.attr("class").split(" ")[1];
            ui.draggable.hide();
            $('#'+currentFocus).fadeIn('slow');
            $('.dropbox').fadeOut('fast');
            $('.box-spines .sp').addClass('noDragTemp');
        }
    });

    $('figure').on('dblclick',function(){
        $(this).parent().parent().fadeOut('slow');
        $('.'+currentFocus).attr('style','display: none;')
        $('.'+currentFocus).fadeIn('fast');
        $('.box-spines .sp').removeClass('noDragTemp');
        currentFocus = null;
    })
}



function rotateBox(){
    let $box = $(this).parent();
    let currentClass = $box.attr('class');
    switch (currentClass) {
        case 'box show-front':
            return $box.attr('class','box show-back');
        case 'box show-back':
            return $box.attr('class','box show-front');
    }
}
