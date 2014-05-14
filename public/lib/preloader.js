// ************************ //
// Preloader
// ************************ //
$(window).load(function(){
    $('#preload').delay(800).fadeOut(700, function(){
          $('.header_tag').addClass('animated delayp2');
          $('.phone_preview .regular_text_left').addClass('animated delayp6');
          $('.phone_preview .regular_text_right').addClass('animated delayp4');
      });
      $('#preload').delay(800).find('.text-logo').removeClass('delayp2');
      $('#preload').delay(800).find('.prl').removeClass('delayp4');
});