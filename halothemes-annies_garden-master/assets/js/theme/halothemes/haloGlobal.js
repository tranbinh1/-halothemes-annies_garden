import utils from '@bigcommerce/stencil-utils';
import { defaultModal } from '../global/modal';
import { CollapsibleEvents } from '../common/collapsible';

export default function(context, productId){
	function footerMobileToggle(){
        $('.footer-info-col--mobile .footer-info-heading').on('click', event => {
            $('.footer-info-col--mobile .footer-info-heading').not($(event.currentTarget)).removeClass('is-clicked');

            if($(event.currentTarget).hasClass('is-clicked')){
                $(event.currentTarget).removeClass('is-clicked');
            } else{
                $(event.currentTarget).addClass('is-clicked');
            }

            $('.footer-info-col--mobile').each((index, element) => {
                if($('.footer-info-heading', element).hasClass('is-clicked')){
                    $(element).find('.footer-info-wrapper').slideDown("slow");
                } else{
                    $(element).find('.footer-info-wrapper').slideUp("slow");
                }
            });
        });
    }
    footerMobileToggle();

    function checkCookiesPopup() {
        if ($('#consent-manager').length) {
            var height = $('#consent-manager').height();
            $('body').css('padding-bottom',height);
        }
        if ($('#consent-manager-update-banner').length) {
            var height = $('#consent-manager-update-banner').height();
            $('body').css('padding-bottom',height);
        }
    }
    checkCookiesPopup();

    function addWishList() {
        $('.card .card-wishlist').on('click', event => {
            event.preventDefault();

            var $this_wl = $(event.currentTarget),
                url_awl = $this_wl.attr('href');

            $.post(url_awl).done(() => {
                window.location.href = url_awl;
            });
        });
    }
    addWishList();

    function authPopup() {
        $('[data-login-form]').on('click', event => {
            event.preventDefault();
            if (!$('body').hasClass('page-type-login')) {
                const $target = $(event.currentTarget);
                $target.parent().siblings('.halo-auth-popup').toggleClass('is-open');
            } else{
                $('html, body').animate({
                    scrollTop: $('.login').offset().top,
                }, 700);
            }
        });

        $(document).on('click', event => {
            if ($('.halo-auth-popup').hasClass('is-open')) {
                if (($(event.target).closest('.halo-auth-popup').length === 0) && ($(event.target).closest('[data-login-form]').length === 0)){
                    $('.halo-auth-popup').removeClass('is-open');
                }
            }
        });
    }
    authPopup();

    function authSidebar() {
        $('[data-login-form-mobile]').on('click', event => {
            event.preventDefault();
            if (!$('body').hasClass('page-type-login')) {
                if($('.halo-auth-sidebar').hasClass('is-open')){
                    $('.halo-auth-sidebar').removeClass('is-open');
                    $('body').removeClass('openAuthSidebar');
                } else{
                    $('.halo-auth-sidebar').addClass('is-open');
                    $('body').addClass('openAuthSidebar');
                }
            } else{
                $('html, body').animate({
                    scrollTop: $('.login').offset().top,
                }, 700);
            }
        });

        $('.halo-auth-sidebar .halo-sidebar-close').on('click', event =>{
            event.preventDefault();

            $('.halo-auth-sidebar').removeClass('is-open');
            $('body').removeClass('openAuthSidebar');
        });

        $(document).on('click', event => {
            if ($('.halo-auth-sidebar').hasClass('is-open')) {
                if (($(event.target).closest('.halo-auth-sidebar').length === 0) && ($(event.target).closest('[data-login-form-mobile]').length === 0)){
                    $('.halo-auth-sidebar').removeClass('is-open');
                    $('body').removeClass('openAuthSidebar');
                }
            }
        });
    }
    authSidebar();

    function clickHaloBackground(){
        $('.halo-background').on('click', event => {
            event.preventDefault();

            if ($('body').hasClass('has-activeNavPages')) {
                $('.mobileMenu-toggle').trigger('click');
            }

            $('[data-search="quickSearch"]').removeClass('is-open');
            $('body').removeClass('openSidebar openSearchMobile openBeforeYouLeave');
            $('.page-sidebar-mobile').removeClass('is-open');
            $('.page-sidebar').removeClass('is-open');
        });
    }
    clickHaloBackground();

    function menuMobile(){
        $('.halo-menu-mobile .halo-sidebar-close').on('click', event => {
            event.preventDefault();

            if ($('body').hasClass('has-activeNavPages')) {
                $('.mobileMenu-toggle').trigger('click');
            }
        });

        if ($(window).width() <= 1024) {
            $('.mobileMenu-toggle').on('click', event => {
                if($('.halo-bottomHeader .navPages-list:not(.navPages-list--user)').length){
                    $('.halo-bottomHeader .navPages-list:not(.navPages-list--user)').children().prependTo('#halo-menu-mobile .navPages-list:not(.navPages-list--user)');
                }
            });
        }
    }
    menuMobile();

    function sidebarMobile(){
        $('.page-sidebar-mobile').on('click', event => {
            if($(event.currentTarget).hasClass('is-open')){
                $(event.currentTarget).removeClass('is-open');
                $('.page-sidebar').removeClass('is-open');
                $('body').removeClass('openSidebar');
            } else{
                $(event.currentTarget).addClass('is-open');
                $('.page-sidebar').addClass('is-open');
                $('body').addClass('openSidebar');
            }
        });

        $('.page-sidebar .page-sidebar-close').on('click', event => {
            event.preventDefault();
            $('.page-sidebar-mobile').removeClass('is-open');
            $('.page-sidebar').removeClass('is-open');
            $('body').removeClass('openSidebar');
        });
    }
    sidebarMobile();

    function searchFormMobile() {
        if ($(window).width() <= 1024) {
            if ($('.item--quicksearch #quickSearch').length) {
                $('#quickSearch').appendTo('#halo-search-mobile .halo-sidebar-wrapper');
            }
        } else {
            if (!$('.item--quicksearch #quickSearch').length) {
                $('#halo-search-mobile #quickSearch').appendTo('.item--quicksearch');
            }
        }
    }
    searchFormMobile();

    function searchMobileClick(){
        const $search = $('[data-search="quickSearch"]');

        $search.on('click', event => {
            event.preventDefault();

            if(!$search.hasClass('is-open')){
                $search.addClass('is-open');
                $('body').addClass('openSearchMobile');
            } else{
                $search.removeClass('is-open');
                $('body').removeClass('openSearchMobile');
            }
        });

        $('#halo-search-mobile .halo-sidebar-close').on('click', event => {
            event.preventDefault();
            
            $search.removeClass('is-open');
            $('body').removeClass('openSearchMobile');
        });
    }
    searchMobileClick();

    function hoverMenu(){
        if ($(window).width() > 1024) {
            if ($('.navPages-list:not(.navPages-list--user) > .navPages-item.has-dropdown').length) {
                $('.navPages-list:not(.navPages-list--user) > .navPages-item.has-dropdown').on('mouseover', event => {
                    $('body').addClass('openMenuPC');
                })
                .on('mouseleave', event => {
                    $('body').removeClass('openMenuPC');
                });
            }
        }
    } 
    hoverMenu();

    function askAnExpert(context, productId){
        var message;

        if(!$('body').hasClass('page-type-product')){
            $('.ask-an-expert-link').on('click', event => {
                event.preventDefault();

                const $options = {
                    template: 'halothemes/halo-ask-an-expert-content'
                };

                const modal = defaultModal();

                modal.$modal.removeClass().addClass('modal modal--standard halo-ask-an-expert');
                modal.open();

                utils.api.getPage('/', $options, (err, response) => {
                    modal.updateContent(response);
                });
            });
        } else if($('body').hasClass('page-type-product')){
            $('.ask-an-expert-link').on('click', event => {
                event.preventDefault();

                const $options = {
                    template: 'halothemes/halo-ask-an-expert-content'
                };

                const modal = defaultModal();

                modal.$modal.removeClass().addClass('modal modal--standard halo-ask-an-expert');
                modal.open();

                utils.api.product.getById(productId, $options, (err, response) => {
                    modal.updateContent(response);
                });
            });
        }

        $(document).on('change', '#term-ask', event => {
            if($("#term-ask:checked").length){
                $('#halo-ask-an-expert-button').attr('disabled', false);
            } else{
                $('#halo-ask-an-expert-button').attr('disabled', true);
            }
        });

        $(document).on('click', '#halo-ask-an-expert-button', event => {
            var ask_proceed = true,
                subjectMail = context.themeSettings.halo_ask_an_expert_subject_mail,
                labelMail = context.themeSettings.halo_ask_an_expert_label_name,
                mailTo = context.themeSettings.halo_ask_an_expert_mailto,
                customerName = $('#halo-ask-an-expert-form input[name=customer_name]').val(),
                customerMail = $('#halo-ask-an-expert-form input[name=customer_email]').val(),
                customerPhone = $('#halo-ask-an-expert-form input[name=customer_phone]').val(),
                typeContact = $('#halo-ask-an-expert-form input[name=type_contact]:checked').val(),
                typePackage = $('#halo-ask-an-expert-form input[name=type_package]:checked').val(),
                customerMessage = $('#halo-ask-an-expert-form textarea[name=message]').val();

            if(!$('body').hasClass('page-type-product')){
                message = "<div style='border: 1px solid #ccc;padding: 30px;max-width: 500px;margin: 0 auto;'>\
                                <h2 style='margin-top:0;margin-bottom:30px;color: #000000;'>"+subjectMail+"</h2>\
                                <p style='border-bottom: 1px solid #ccc;padding-bottom: 23px;margin-bottom:25px;color: #000000;'>You received a new message from your online store's ask an expert form.</p>\
                                <table style='width:100%;'>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Customer Name: </strong></td><td>" + customerName + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Email Address: </strong></td><td>" + customerMail + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Phone Number: </strong></td><td>" + customerPhone + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>How would you like me to contact you? </strong></td><td>" + typeContact + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Do you need: </strong></td><td>" + typePackage + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>What can i help you with today? </strong></td><td>" + customerMessage + "</td></tr>\
                        </table></div>";
            } else if($('body').hasClass('page-type-product')){
                var img = $('.halo-ask-an-expert [data-product-image]').attr('data-product-image'),
                    title =  $('.halo-ask-an-expert [data-product-title]').attr('data-product-title'),
                    sku = $('.halo-ask-an-expert [data-product-sku]').attr('data-product-sku'),
                    url = $('.halo-ask-an-expert [data-product-url]').attr('data-product-url');


                message = "<div style='border: 1px solid #ccc;padding: 30px;max-width: 500px;margin: 0 auto;'>\
                                <h2 style='margin-top:0;margin-bottom:30px;color: #000000;'>"+subjectMail+"</h2>\
                                <p style='border-bottom: 1px solid #ccc;padding-bottom: 23px;margin-bottom:25px;color: #000000;'>You received a new message from your online store's ask an expert form.</p>\
                                <table style='width:100%;'>\
                                <tr>\
                                    <td style='border-bottom: 1px solid #ccc;padding-bottom: 25px;margin-bottom:25px;width:50%;'><img style='width: 100px' src='"+img+"' alt='"+title+"' title='"+title+"'></td><td style='border-bottom: 1px solid #ccc;padding-bottom: 25px;margin-bottom:25px;'>"+sku+" <br><a href='"+url+"'>"+title+"</a></td>\
                                </tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Customer Name: </strong></td><td>" + customerName + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Email Address: </strong></td><td>" + customerMail + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Phone Number: </strong></td><td>" + customerPhone + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>How would you like me to contact you? </strong></td><td>" + typeContact + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>Do you need: </strong></td><td>" + typePackage + "</td></tr>\
                            <tr><td style='padding-right: 10px;vertical-align: top;width:50%;'><strong>What can i help you with today? </strong></td><td>" + customerMessage + "</td></tr>\
                        </table></div>";
            }
      
            $("#halo-ask-an-expert-form input[required], #halo-ask-an-expert-form textarea[required]").each((index, el) => {
                if (!$.trim($(el).val())) {
                    $(el).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
                    ask_proceed = false;
                } else {
                    $(el).parent('.form-field').removeClass('form-field--error').addClass('form-field--success');
                }

                var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

                if ($(el).attr("name") == "customer_email" && !email_reg.test($.trim($(el).val()))) {
                    $(el).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
                    ask_proceed = false;
                }
            });

            if (ask_proceed) {
                var ask_post_data = {
                    "api": "i_send_mail",
                    "subject": subjectMail,
                    "from_name": labelMail,
                    "email": mailTo,
                    "email_from": customerMail,
                    "message": message
                };

                $.post('https://themevale.net/tools/sendmail/ask-an-expert/', ask_post_data, (response) => {
                    if (response.type == 'error') {
                        var output = '<div class="alertBox alertBox--error"><p class="alertBox-column alertBox-message">' + response.text + '</p></div>';
                    } else {
                        var output = '<div class="alertBox alertBox--success"><p class="alertBox-column alertBox-message">Thank you. We\'ve received your feedback and will respond shortly.</p></div>';
                        $("#halo-ask-an-expert-form  input[required], #halo-ask-an-expert-form textarea[required]").val('');
                        $("#halo-ask-an-expert-form").hide();
                    }
                    $("#halo-ask-an-expert-results").hide().html(output).show();
                }, 'json');
            }
        });
    }
    askAnExpert(context, productId);

    function clickSubLinksMenu(){
        $(document).on('click', '.halo-menu-megamenu .navPage-subMenu-links .navPages-action', event => {
            if($(event.target).hasClass('has-subMenu')){
                event.preventDefault();
                $(event.target).parent('.navPage-subMenu-item-child').addClass('is-open');
                $(event.target).parents('.navPage-subMenu-links').siblings().addClass('is-hidden');
            }
        });

        $(document).on('click', '.halo-menu-megamenu .navPage-subMenu-links .navPage-subMenu-title .navPages-action', event => {
            event.preventDefault();

            $(event.target).parents('.navPage-subMenu-item-child.is-open').removeClass('is-open');
            $(event.target).parents('.navPage-subMenu-links').siblings().removeClass('is-hidden');
        });
    }
    clickSubLinksMenu();

    function backToTop() {
        var offset = $(window).height()/2;
        const backToTop = $('#haloBackToTop');

        $(window).scroll(event => {
            ($(event.currentTarget).scrollTop() > offset) ? backToTop.addClass('is-visible') : backToTop.removeClass('is-visible');
        });

        backToTop.on('click', event => {
            event.preventDefault();

            $('body,html').animate({
                scrollTop: 0
            }, 1000);
        });
    }
    backToTop();

    // Product Tab
    function productShippingTab() {
        var link_page = context.themeSettings.productView_tab1_link;
        if (link_page) {
            $.ajax({
               url:link_page,
               type:'GET',
               success: function(data){
                    var content = $(data).find('.page-content').html();
                    if ($('#tab-1-mobile').children().not('.loadingOverlay').length <= 0) {
                        $('#tab-1-mobile').html(content);
                    }
               }
            });
        }
    }

    function productReturnTab() {
        var link_page = context.themeSettings.productView_tab2_link;
        if (link_page) {
            $.ajax({
               url:link_page,
               type:'GET',
               success: function(data){
                    var content = $(data).find('.page-content').html();
                    if ($('#tab-2-mobile').children().not('.loadingOverlay').length <= 0) {
                        $('#tab-2-mobile').html(content);
                    }
               }
            });
        }
    }

    function productCustomHTML() {
        var link_page = context.themeSettings.product_custom_html_link;
        if (link_page) {
            $.ajax({
               url:link_page,
               type:'GET',
               success: function(data){
                    var content = $(data).find('.page-content').html();
                    if ($('#halo-productView-about > .container-fluid .halo-about-us').length <= 0) {
                        $('#halo-productView-about > .container-fluid').html(content);
                    }
               }
            });
        }
    }

    if ($('.page-type-product')) {
        $(window).on('scroll load', function() {
            var scroll = $(window).scrollTop() + 1500,
                returnSroll = $(window).scrollTop() + 1000,
                productCustomSroll = scroll + 1600;

            if ($('#halo-productView-tabs').length) {
                var productTab = $('#halo-productView-tabs').offset().top;
            }

            if ($('#halo-productView-about').length) {
                var productCustom = $('#halo-productView-about').offset().top;
            }

            if (scroll >= productTab) {
                productShippingTab();
            }

            if (returnSroll >= productTab) {
                productReturnTab();
            }

            if (scroll >= productCustom) {
                productCustomHTML();
            }

        });
    }

    $(window).resize(function() {
        if ($(window).width() > 1024) {
            $('#halo-menu-mobile').css({'top': $("header .halo-middleHeader").outerHeight() + 1, 'height': $(window).height() - $("header .halo-middleHeader").outerHeight()});
            if(!$('.header').hasClass('is-sticky')){
                if($('#halo-menu-mobile .navPages-list:not(.navPages-list--user)').length){
                    $('#halo-menu-mobile .navPages-list:not(.navPages-list--user)').children().prependTo('.halo-bottomHeader .navPages-list:not(.navPages-list--user)');
                }
            }
        } else {
            $('#halo-menu-mobile').css({'top': 0, 'height': '100%'});
        }

        searchFormMobile();
    });
}
