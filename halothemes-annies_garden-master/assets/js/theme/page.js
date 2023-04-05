import fancybox from './halothemes/jquery.fancybox.min';
import utils from '@bigcommerce/stencil-utils';
import PageManager from './page-manager';
import haloProductLookbook from './halothemes/haloProductLookbook';
import haloAddOption from './halothemes/haloAddOptionForProductCard';

export default class Page extends PageManager {
    constructor(context) {
        super(context);
    }

    onReady() {
        this.faqsPage();
        this.faqsToggle();
        this.portfolioPage();
        
        haloAddOption(this.context);
        haloProductLookbook(this.context, $('.halo-lookbook-slider'));
        this.lookbookCarousel();
        this.portfolioCustomCarousel();
    }

    faqsPage(){
        $('.faq-desc').appendTo('.page-normal .page-description');
    }

    portfolioPage(){
        $('.halo-image-portfolio .item:hidden').slice(0,6).css('display', 'inline-block');

        if($('.halo-image-portfolio .item').length > 6){
            $('.halo-image-portfolio').append('<div class="halo-infinite-portfolio"><div class="button button--transparent">Load More</div></div>');
        }

        $('.halo-infinite-portfolio .button').on('click', (event) => {
            event.preventDefault();

            $('.halo-image-portfolio .item:hidden').slice(0,6).css('display', 'inline-block');
    
            if($(".halo-image-portfolio .item:hidden").length == 0){
                $('.halo-infinite-portfolio .button').addClass('disable').text('No more items');
            }
        });

        if($('.page-portfolio .page-sidebar-mobile').length > 0){
            $('.page-portfolio .page-sidebar-mobile').append('<svg class="icon"><use xlink:href="#icon-sidebar"></use></svg>');
        }

        $('.halo-image-portfolio .item').each((index, element) => {
            if($('.external-link', element).length > 0){
                $('.external-link', element).append('<svg class="icon"><use xlink:href="#icon-external-link"></use></svg>');
            }
        });
    }

    faqsToggle(){
        $('.page-normal .card .title').on('click', (event) => {
            event.preventDefault();

            var $target = $(event.currentTarget);

            $('.page-normal .card .title').not($target).removeClass('collapsed');

            if($target.hasClass('collapsed')){
                $target.removeClass('collapsed');
            } else{
                $target.addClass('collapsed');
            }

            $('.page-normal .card').each((index, element) => {
                if($('.title', element).hasClass('collapsed')){
                    $(element).find('.collapse').slideDown("slow");
                } else{
                    $(element).find('.collapse').slideUp("slow");
                }
            });
        });
    }

    //Lookbook page
    lookbookCarousel() {
        if ($('.halo-lookbook-slider').length) {
            if (!$('.halo-lookbook-slider').hasClass('slick-slider')) {
                $('.halo-lookbook-slider').slick({
                    dots: true,
                    arrows: false,
                    mobileFirst: true,
                    adaptiveHeight: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    lazyLoad: 'anticipated',
                    nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>", 
                    prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
                    responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            dots: false,
                            arrows: true
                        }
                    }]
                });
            }
        }
    }

    // Portfolio page
    portfolioCustomCarousel() {
        if ($('.halo-portfolio-custom .halo-row').length) {
            if (!$('.halo-portfolio-custom .halo-row').hasClass('slick-slider')) {
                $('.halo-portfolio-custom .halo-row').slick({
                    dots: true,
                    arrows: false,
                    mobileFirst: true,
                    infinite: false,
                    adaptiveHeight: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    lazyLoad: 'anticipated',
                    nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>", 
                    prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
                    responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            dots: false,
                            arrows: true
                        }
                    }]
                });
            }
        }
    }
}
