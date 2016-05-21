
$(window).load(function(){


//---------------------------------------------------------------------------
// Hello my baby, hello my honey, hello my ragtime gal
//---------------------------------------------------------------------------


//---------------------------------------------------------------------------
// Setup Sharing Tooltip
//---------------------------------------------------------------------------


// Sharing is caring
  function shareFacebook(text, url){
    var text  = text
      , url   = url
    FB.ui({
        method: 'feed',
        link: url,
        name: text
      },
      function(response) {}
    )
  }

// Clicking till it works
  $('#modal-share .facebook').on('click',function(){
   var text = $(this).attr('rel')
      , url = $(location).attr('href')
   shareFacebook(text, url)
   return false
  })

// Tooltip im in love
  $('article').on('click', function(e){
    $('#modal-share').css({'display':'none'})
    var
        mouseX      = e.pageX
      , mouseY      = e.pageY
      , selection   = $.selection()
      , url         = $(location).attr('href')
      , encodedUrl  = encodeURIComponent(url)
      , twitter     = 'https://twitter.com/intent/tweet?text='+selection+'&?url='+encodedUrl
      , facebook     = selection + ' — ' + url

    if (  selection.length > 5 ) {
      $('#modal-share').css({'display':'block', 'top': mouseY , 'left': mouseX })
      $('#modal-share .twitter').attr('href',twitter)
      $('#modal-share .facebook').attr('rel',facebook)
    }
  })


//---------------------------------------------------------------------------
// Setup Hash and menu Navigation
//---------------------------------------------------------------------------

// Hash me baby
  if(window.location.hash){
    var target = '#' + window.location.hash.substr(1)
    if( $(target).length ) {
      setTimeout(function(){
        var top = $(target).offset().top
        window.scrollTo(0, top)
      }, 500)
    }
  }


// Click me baby
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this).attr('href')
    if(  $(target).length ) {
      setTimeout(function(){
        var top = $(target).offset().top
        window.scrollTo(0, top)
      }, 500)
      if(history.pushState) {
        history.pushState(null, null, target);
      }else {
        location.hash = target;
      }
      event.preventDefault()
    }
  })

//---------------------------------------------------------------------------
// Scrolling is the new black
//---------------------------------------------------------------------------

  var previousScroll = 0

  $(window).scroll(function() {

    // Check Diretion
    var currentScroll = $(this).scrollTop()

    // Menu Home behaviour
    var header  = $('header.global').offset().top
      , headerHeight  = $('header.global').height()
      , cover    = $('section.content header').height()
      , scroll  = $(window).scrollTop()

    if ( scroll >= cover ) {
      $('header.global').addClass('sticky')
      $('header.global').addClass('slideDown')

      if ( currentScroll >= (cover + (cover / 3)) ) {
        if ( currentScroll > previousScroll ){ // Down
          $('header.global').addClass('slideUp')
          $('header.global').removeClass('slideDown')
        } else { // UP
          $('header.global').removeClass('slideUp')
          $('header.global').addClass('slideDown')
        }
      }
    }
    if ( scroll <= cover ) {
      $('header.global').addClass('slideUp')
      $('header.global').removeClass('slideDown')
    }
    if ( scroll <= headerHeight ) {
      $('header.global').removeClass('slideUp')
      $('header.global').addClass('slideDown')
      $('header.global').removeClass('sticky')
    }

    previousScroll = currentScroll;

  })

//---------------------------------------------------------------------------
// So long and thanks for all the frogs
//---------------------------------------------------------------------------


})
