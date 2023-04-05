import utils from '@bigcommerce/stencil-utils';

export default class haloMegaMenu{
    constructor() {}

    menuItem(num) {
        return {
            setMegaMenu(param) {
                // Defaut params
                param = $.extend({
                    style: '',
                    dropAlign: 'fullWidth',
                    dropWidth: '493px',
                    cateColumns: 1,
                    disabled: false,
                    bottomCates: '',
                    products:'',
                    productId: '',
                    label: '',
                    content: '',
                    imagesTop: '',
                    imagesCustom: ''
                }, param);

                $('.navPages-list:not(.navPages-list--user) > li:nth-child(' + num + ')').each(function(idx, el) {
                    if (param.disabled === false) {
                        const subMegaMenu = $(el).find('> .navPage-subMenu');

                        if(param.style === 'style 1') {
                            if(!$(el).hasClass('has-megamenu')){
                                $(el).addClass('has-megamenu style-1 fullWidth');

                                if(!subMegaMenu.find('.cateArea').length){
                                    subMegaMenu.find('> .navPage-subMenu-list').wrap('<div class="cateArea columns-'+param.cateColumns+'"></div>');

                                    subMegaMenu.find('.cateArea').prepend(param.content);
                                }

                                if(!subMegaMenu.find('.imageArea').length){
                                    subMegaMenu.append('<div class="imageArea"><div class="megamenu-right-item">'+param.images+'</div></div>');
                                    
                                    if (param.products.length && (param.products !== '')) {
                                        subMegaMenu.find('.imageArea').prepend('<div class="megamenu-left-item megamenu-product-list">'+param.products+'</div>');
                                    }
                                }

                                subMegaMenu.find('.imageArea').css({
                                    'width': '100%',
                                    'max-width': param.imageAreaWidth
                                });

                                subMegaMenu.find('.cateArea').css({
                                    'width': '100%',
                                    'max-width': param.cateAreaWidth
                                });

                                if (param.productId.length && (param.productId !== '')) {
                                    var productIDS = param.productId,
                                        featuredProductCarousel = subMegaMenu.find('.megamenu-product-list');

                                    const $options = {
                                        template: 'halothemes/products/halo-megamenu-tmp'
                                    };

                                    if (productIDS !== '') {
                                        var listIDs = JSON.parse("[" + productIDS + "]");

                                        if (featuredProductCarousel.length) {
                                            featuredProductCarousel.find('.megamenu-slider').addClass('is-loading');

                                            var n = 0;

                                            for (var i = 0; i < listIDs.length; i++) {
                                                var productId = listIDs[i];

                                                utils.api.product.getById(productId, $options, (err, response) => {
                                                    var hasProd = $(response).find('.card').data('product-id');

                                                    if(hasProd != undefined && hasProd !== null && hasProd !== ''){
                                                        if(featuredProductCarousel.find('.megamenu-slider').hasClass('slick-initialized')) {
                                                            featuredProductCarousel.find('.megamenu-slider').slick('unslick');
                                                            featuredProductCarousel.find('.megamenu-slider').append(response);
                                                        } else {
                                                            featuredProductCarousel.find('.megamenu-slider').append(response);
                                                        }

                                                        productSlider(featuredProductCarousel);
                                                    }
                                                });
                                            }

                                            featuredProductCarousel.find('.megamenu-slider').removeClass('is-loading');
                                        }
                                    }

                                    function productSlider(element){
                                        element.each(function(idx, el) {
                                            if($('.megamenu-slider', el).length > 0){
                                                if($('.megamenu-slider .item', el).length > 0){
                                                    $('.megamenu-slider', el).slick({
                                                        infinite: false,
                                                        dots: true,
                                                        arrows: false,
                                                        slidesToShow: 1,
                                                        slidesToScroll: 1,
                                                        slidesPerRow: 1,
                                                        rows: 2,
                                                        nextArrow: "<svg class='slick-next slick-arrow' aria-label='Next Product'><use xlink:href=#icon-arrow-right></use></svg>", 
                                                        prevArrow: "<svg class='slick-prev slick-arrow' aria-label='Previous Product'><use xlink:href=#icon-arrow-left></use></svg>"
                                                    });
                                                }
                                            }
                                        });
                                    } 
                                }
                            }
                        }

                        if(param.style === 'style 2') {
                            if(!$(el).hasClass('has-megamenu')){
                                $(el).addClass('has-megamenu style-2 fullWidth');

                                if(!subMegaMenu.find('.cateArea').length){
                                    subMegaMenu.find('> .navPage-subMenu-list').wrap('<div class="cateArea columns-'+param.cateColumns+'"></div>');

                                    subMegaMenu.find('.cateArea').prepend(param.content);
                                }

                                if(!subMegaMenu.find('.imageArea').length){
                                    subMegaMenu.append('<div class="imageArea"><div class="megamenu-right-item">'+param.images+'</div></div>');
                                    
                                    if (param.products.length && (param.products !== '')) {
                                        subMegaMenu.find('.imageArea').prepend('<div class="megamenu-left-item megamenu-product-list">'+param.products+'</div>');
                                    }
                                }

                                subMegaMenu.find('.imageArea').css({
                                    'width': '100%',
                                    'max-width': param.imageAreaWidth
                                });

                                subMegaMenu.find('.cateArea').css({
                                    'width': '100%',
                                    'max-width': param.cateAreaWidth
                                });
                            }
                        }

                        if(param.style === 'style 3') {
                            if(!$(el).hasClass('has-megamenu')){
                                $(el).addClass('has-megamenu style-3 fullWidth');

                                if(!subMegaMenu.find('.cateArea').length){
                                    subMegaMenu.find('> .navPage-subMenu-list').wrap('<div class="container"><div class="cateArea columns-'+param.cateColumns+'"></div></div>');

                                    subMegaMenu.find('.cateArea').prepend(param.content);
                                }

                                if (param.imagesTop.length && (param.imagesTop !== '')) {
                                    function megamenuImageTop($_image_array) {
                                        var j = 2;

                                        for (var i = 0, len = $_image_array.length; i < len; i++) {
                                            j = j + 1;
                                            subMegaMenu.find('.cateArea > ul > li:nth-child(' + j + ') > .navPages-action').after($_image_array[i]);
                                        }
                                    }

                                    megamenuImageTop(param.imagesTop);
                                }

                                if (param.bottomCates.length && (param.bottomCates !== '')) {
                                    subMegaMenu.append(param.bottomCates);

                                    if (param.countDown.length && (param.countDown !== '')) {
                                        subMegaMenu.find('.megamenu-custom-list .container').append('<span class="megamenu-countDown"></span>');
                                        subMegaMenu.find('.megamenu-countDown').attr({
                                            'data-menu-countdown': param.countDown
                                        });

                                        productCountDown($('.megamenu-countDown'));
                                    }

                                    function productCountDown(element){
                                        var countDown = element.data('menu-countdown'),
                                            countDownDate = new Date(countDown).getTime(),
                                            seft = element;

                                        var countdownfunction = setInterval(function() {
                                            var now = new Date().getTime(),
                                            distance = countDownDate - now;

                                            if (distance < 0) {
                                                clearInterval(countdownfunction);
                                                seft.html('');
                                            } else {
                                                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                                                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                                                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                                        
                                                var strCountDown = " End ins: <span class='num'>"+days+"<span>D : </span></span><span class='num'>"+hours+"<span>H : </span></span><span class='num'>"+minutes+"<span>M : </span></span><span class='num'>"+seconds+"<span>S</span></span>";

                                                seft.html(strCountDown);
                                            }
                                        }, 1000);
                                    } 
                                }
                            }
                        }

                        if(param.style === 'style 4') {
                            if(!$(el).hasClass('has-megamenu')){
                                $(el).addClass('has-megamenu style-4 fullWidth');
                            }

                            if(!subMegaMenu.find('.centerArea').length){
                                subMegaMenu.find('> .navPage-subMenu-list').wrap('<div class="centerArea itemArea columns-'+param.cateColumns+'"></div>');
                            }

                            if(!subMegaMenu.find('.leftArea').length){
                                subMegaMenu.prepend('<div class="leftArea itemArea">'+param.imagesCustom+'</div>');
                            }

                            if(!subMegaMenu.find('.rightArea').length){
                                subMegaMenu.append('<div class="rightArea itemArea"><div class="megamenu-right-item">'+param.images+'</div></div>');
                                
                                if (param.products.length && (param.products !== '')) {
                                    subMegaMenu.find('.rightArea').prepend('<div class="megamenu-left-item megamenu-product-list">'+param.products+'</div>');
                                }
                            }

                            if (param.productId.length && (param.productId !== '')) {
                                var productIDS = param.productId,
                                    featuredProductCarousel = subMegaMenu.find('.megamenu-product-list');

                                const $options = {
                                    template: 'halothemes/products/halo-megamenu-tmp-2'
                                };

                                if (productIDS !== '') {
                                    var listIDs = JSON.parse("[" + productIDS + "]");

                                    if (featuredProductCarousel.length) {
                                        featuredProductCarousel.find('.megamenu-slider2').addClass('is-loading');

                                        var n = 0;

                                        for (var i = 0; i < listIDs.length; i++) {
                                            var productId = listIDs[i];

                                            utils.api.product.getById(productId, $options, (err, response) => {
                                                var hasProd = $(response).find('.card').data('product-id');

                                                if(hasProd != undefined && hasProd !== null && hasProd !== ''){
                                                    if(featuredProductCarousel.find('.megamenu-slider2').hasClass('slick-initialized')) {
                                                        featuredProductCarousel.find('.megamenu-slider2').slick('unslick');
                                                        featuredProductCarousel.find('.megamenu-slider2').append(response);
                                                    } else {
                                                        featuredProductCarousel.find('.megamenu-slider2').append(response);
                                                    }

                                                    productSlider(featuredProductCarousel);
                                                }
                                            });
                                        }

                                        featuredProductCarousel.find('.megamenu-slider2').removeClass('is-loading');
                                    }
                                }

                                function productSlider(element){
                                    element.each(function(idx, el) {
                                        if($('.megamenu-slider2', el).length > 0){
                                            if($('.megamenu-slider2 .item', el).length > 0){
                                                $('.megamenu-slider2', el).slick({
                                                    infinite: false,
                                                    dots: false,
                                                    arrows: true,
                                                    slidesToShow: 1,
                                                    slidesToScroll: 1,
                                                    nextArrow: "<svg class='slick-next slick-arrow' aria-label='Next Product'><use xlink:href=#slick-arrow-next></use></svg>", 
                                                    prevArrow: "<svg class='slick-prev slick-arrow' aria-label='Previous Product'><use xlink:href=#slick-arrow-prev></use></svg>"
                                                });
                                            }
                                        }
                                    });
                                } 
                            }
                        }

                        const navPagesAction = $(el).children('.navPages-action').children('.text');

                        if (param.label === 'new') {
                            navPagesAction.append('<span class="navPages-label new-label">New</span>');
                        } else if (param.label === 'sale') {
                            navPagesAction.append('<span class="navPages-label sale-label">Sale</span>');
                        } else if (param.label === 'hot') {
                            navPagesAction.append('<span class="navPages-label hot-label">Hot</span>');
                        }
                    } else{
                        const navPagesAction = $(el).children('.navPages-action').children('.text');

                        if (param.label === 'new') {
                            navPagesAction.append('<span class="navPages-label new-label">New</span>');
                        } else if (param.label === 'sale') {
                            navPagesAction.append('<span class="navPages-label sale-label">Sale</span>');
                        } else if (param.label === 'hot') {
                            navPagesAction.append('<span class="navPages-label hot-label">Hot</span>');
                        }
                    }
                });

                return this;
            }
        }
    }
}
