import haloUnistallMegaMenu from './haloUnistallMegaMenu';

export default function(context) {
    const $body = $('body');

    function header_sticky() {
        var header_position, header_height,
            sticky = $('.header-sticky');
            
        header_height = sticky.height();
        header_position = $('.body').offset();

        if (sticky.length > 0) {
            header_scroll(header_position, header_height, sticky);
        }
    }

    function header_scroll(header_position, header_height, sticky) {
        $(window).on('scroll load', function() {
            var scroll = $(window).scrollTop();

            if (scroll > header_height) {
                if ($(window).width() > 1024 && $('.halo-bottomHeader .navPages-list:not(.navPages-list--user)').length) {
                    $('.halo-bottomHeader .navPages-list:not(.navPages-list--user)').children().prependTo('#halo-menu-mobile .navPages-list:not(.navPages-list--user)');

                    if (context.themeSettings.haloMenuResize == true) {
                        if($('#halo-navPages-dropdown').children().length){
                            $('.navPages-item-toggle').before($('#halo-navPages-dropdown').children());
                            $('.navPages-item-toggle').addClass('u-hiddenVisually');
                        }
                    }

                    $('.halo-menu-megamenu .has-megamenu').each((index, element) => {
                        if($('.megamenu-slider', element).hasClass('slick-initialized')){
                            $('.megamenu-slider', element).get(0).slick.setPosition();
                        }

                        if($('.megamenu-slider2', element).hasClass('slick-initialized')){
                            $('.megamenu-slider2', element).get(0).slick.setPosition();
                        }
                    });
                }

                sticky.addClass('is-sticky');
                $body.addClass('has-stickyNavPages');

                if($body.hasClass('has-stickyToolbar')){
                    $body.css('padding-top', header_height + $('.page-listing .halo-toolbar').height());
                } else{
                    $body.css('padding-top', header_height);
                }
            } else {
                if ($(window).width() > 1024 && $('#halo-menu-mobile .navPages-list:not(.navPages-list--user)').length) {
                    $('#halo-menu-mobile .navPages-list:not(.navPages-list--user)').children().prependTo('.halo-bottomHeader .navPages-list:not(.navPages-list--user)');
                    
                    if (context.themeSettings.haloMenuResize == true) {
                        const $main = $('#halo-navigation-list');
                        const $toggle = $main.children('.navPages-item-toggle');
                        const $dropdown = $('#halo-navPages-dropdown');

                        do {
                            const $lastItem = $main.children('.navPages-item:not(:last-child):last');

                            const lastItemRight = Math.round($lastItem.offset().left - $main.offset().left + $lastItem.width());
                            const mainWidth = Math.round($main.width());

                            if ($dropdown.children().length > 0) {
                                const toggleRight = Math.round($toggle.offset().left - $main.offset().left + $toggle.width());

                                if (toggleRight > mainWidth) {
                                    $dropdown.prepend($lastItem);
                                    haloUnistallMegaMenu(context);
                                } else {
                                    break;
                                }
                            } else if (lastItemRight > mainWidth) {
                                $dropdown.prepend($lastItem);
                                $toggle.removeClass('u-hiddenVisually');
                                haloUnistallMegaMenu(context);
                            } else {
                                break;
                            }
                        } while (true);
                    }

                    $('.navPages-list-megamenu .has-megamenu').each((index, element) => {
                        if($('.megamenu-slider', element).hasClass('slick-initialized')){
                            $('.megamenu-slider', element).get(0).slick.setPosition();
                        }

                        if($('.megamenu-slider2', element).hasClass('slick-initialized')){
                            $('.megamenu-slider2', element).get(0).slick.setPosition();
                        }
                    });
                }

                sticky.removeClass('is-sticky');
                $body.removeClass('has-stickyNavPages').css('padding-top', 0);
            }
        });
    }

    header_sticky();
}
