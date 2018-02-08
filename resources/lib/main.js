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
        snap: '.snapTarget',
        snapmode: 'both',
        snapTolerance: 50,
        scroll: false
    });

    $("section.container").draggable({
        revert: 'valid',
        revertDuration: 800,
        stack: '.sp',
        scroll: false,
        distance: 50,
        stop: function(){
            $('section.container').attr('style','');
            $('.'+currentFocus).attr('style','display: none; position: relative;')
            $('.'+currentFocus).fadeIn('fast');
            $('.box-spines .sp').removeClass('noDragTemp');
            $('.rotation').fadeOut('fast');

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
            $('.rotation').fadeIn('slow');
        }
    });

    // $('figure').on('dblclick',function(){
    //     $(this).parent().parent().fadeOut('slow');
    //     $('.box').attr('class','box show-front')
    //     $('.'+currentFocus).attr('style','display: none; position: relative;')
    //     $('.'+currentFocus).fadeIn('fast');
    //     $('.box-spines .sp').removeClass('noDragTemp');
    //     // currentFocus = null;
    // });

    $('.sp').mouseenter(function(){
        if (!$(this).hasClass('noDragTemp')){
            $('.dropbox').fadeIn('slow');
            $('.box').attr('class','box show-front');
        }
    });

    $('.play-box').on('click',function(){
        $('#cart-container').css({'top':'100vh'});
        $('#play-container').css({'top':'0'});
        $('#gamescreen').attr('src','./resources/pico/'+currentFocus+'.html').focus();

    });

    $('.tobottomshelf').on('click',function(){
        $('#cart-container').css({'top':'0'});
        $('#play-container').css({'top':'-100vh'});
        $('#gamescreen').attr('src','./resources/pico/placeholder.html');
    });
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
