const splide = new Splide( '#gallery-splide',{
    type: 'slide',
    rewind: boolean = true,
    perPage: 1,
    pagination: false,
});
splide.mount();


$(function () {

    const body = $('.body'),
          navbar = $('#navbar'),
          burgerBtn = $('.navbar-toggler'),
          navLinks = $('.nav-link');

    let scrollOffset = $(window).scrollTop();

    /* Fixed Header */
    checkScroll(scrollOffset);

    function checkScroll(scrollOffset) {
        scrollOffset >= $('#header').innerHeight() ? navbar.addClass('fixed') : navbar.removeClass('fixed');
    }

    $(window).on('scroll', function () {
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset);

        /* Active section definition */
        $('.section-scroll').each(function () {
            const top = $(this).offset().top - $('.navbar').outerHeight() - 5,
                  bottom = top + $(this).outerHeight();
            if (scrollOffset >= top && scrollOffset <= bottom) {
                navLinks.removeClass("active");
                navbar.find(`a[href="#${$(this).attr('id')}"]`).addClass('active')
            }
        });
    });
    burgerBtn.on('click', function (e) {
       if (!$(this).hasClass('collapsed')) {
           body.addClass('lock');
           $('.navbar-collapse.collapsing').animate({
               height: '100vh',
           }, {
               duration: 'slow',
               easing: 'linear'
           });
       } else {
           body.removeClass('lock');
       }
      });

    /* Smooth scroll */
    navLinks.on('click', function (e) {
        e.preventDefault();
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-collapse').removeClass('show');
            burgerBtn.addClass('collapsed');
            burgerBtn.attr('aria-expanded', false);
            body.removeClass('lock');
        }
        const $this = $(this),
              blockId = $(this).attr('href'),
              blockOffset = $(blockId).offset().top;
        navLinks.removeClass('active');
        $this.addClass('active');
        scrollOffset === 0 ?
            $('html, body').animate({
                scrollTop: blockOffset - navbar.height() * 2.7
            }, 500) :
            $('html, body').animate({
                scrollTop: blockOffset - navbar.height()
            }, 500);
    });
});

