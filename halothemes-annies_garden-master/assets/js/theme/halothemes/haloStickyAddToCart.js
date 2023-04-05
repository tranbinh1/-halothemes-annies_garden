import utils from '@bigcommerce/stencil-utils';
import swal from 'sweetalert2';
import _ from 'lodash';

export default function($scope, context){
    if ($('#form-action-addToCart').length) {
        var scroll = $('#form-action-addToCart').offset(),
            h_statc = $('#halo_sticky_addToCart').outerHeight(),
            scrollTop = scroll.top;

        $(window).scroll(function(){
            const $sticky = $('#halo_sticky_addToCart');

            if($(window).scrollTop() > scrollTop + 400){

                if(!$('#halo_sticky_addToCart').hasClass('show_sticky')){
                    $('#halo_sticky_addToCart').addClass('show_sticky');

                    if ($(window).width() > 550) {
                        $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 40);
                        $('.halo-ask-an-expert').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 40);
                    } else {
                        if($('#halo_sticky_addToCart').length){
                            $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 30);
                            $('.halo-ask-an-expert').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 130);
                        } else {
                            $('#recently_bought_list').css("bottom", 30);
                            $('.halo-ask-an-expert').css("bottom", 150);
                        }
                    }
                }
            } else{
                $('#halo_sticky_addToCart').removeClass('show_sticky');
                $('.pop-up-option').removeClass('is-open');
                $('body').removeClass('openPopupOption');

                $('.choose_options_add').removeClass('is-active');

                $('#recently_bought_list').css("bottom", 30);

                if ($(window).width() > 550) {
                    $('.halo-ask-an-expert').css("bottom", 30);
                } else {
                    $('.halo-ask-an-expert').css("bottom", 150);
                }
            }
        });

        $(document).on('click','.choose_options_add', function(event){
            $(this).toggleClass('is-active');
            $('.pop-up-option').toggleClass('is-open');
            $('body').addClass('openPopupOption');
        });

        $(document).on('click','.pop-up-option .btn-close', function(event){
            $(".pop-up-option").removeClass('is-open');
            $('body').removeClass('openPopupOption');
            $('.choose_options_add').removeClass('is-active');
        });

        $(document).on('click','.sticky-product-expand', function(event){
            if($('#halo_sticky_addToCart').hasClass('show-full-sticky')) {
                $('#halo_sticky_addToCart').removeClass('show-full-sticky');
            } else {
                $('#halo_sticky_addToCart').addClass('show-full-sticky');
            }
        });

        window.onload = function(){
            if($(window).scrollTop() > scrollTop + 400){
                if(!$('#halo_sticky_addToCart').hasClass('show_sticky')){
                    $('#halo_sticky_addToCart').addClass('show_sticky');

                    if ($(window).width() > 550) {
                        $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 40);
                        $('.halo-ask-an-expert').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 40);
                    } else {
                        if($('#halo_sticky_addToCart').length){
                            $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 30);
                            $('.halo-ask-an-expert').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 130);
                        } else {
                            $('#recently_bought_list').css("bottom", 30);
                            $('.halo-ask-an-expert').css("bottom", 150);
                        }
                    }
                }
            }
        }
    }
}
