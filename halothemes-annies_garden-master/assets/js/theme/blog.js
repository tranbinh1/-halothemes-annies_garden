import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import PageManager from './page-manager';
import haloAddOption from './halothemes/haloAddOptionForProductCard';
import haloProductLookbook from './halothemes/haloProductLookbook';

export default class Blog extends PageManager {
    constructor(context) {
        super(context);
    }

	onReady() {
        this.getAllTags(this.context);
        haloAddOption(this.context);
        haloProductLookbook(this.context, $('.halo-blog-lookbook .lookbook-slider'));
        this.lookbookCarousel();
    }

    getAllTags(context){
        if (context.themeSettings.halo_sidebar_popular_tags == true) {
            const requestOptions = {
                config: {
                    blog: {
                        posts: {
                            limit: 100,
                        },
                    },
                },
                template: 'halothemes/halo-all-tags',
            };

            utils.api.getPage('/blog', requestOptions, (error, response) => {
               if (error) {
                    return '';
                }

                $('.tags-list').html(response);

                var arr = {};

                $('.tags-list [data-tag]').each(function() {
                    var txt = $(this).data('tag');

                    if (arr[txt])
                        $(this).remove();
                    else
                        arr[txt] = true;
                });
            });
        }
    }
    lookbookCarousel() {
        if ($('.blog-lookbook-gallery .lookbook-slider').length) {
            if (!$('.blog-lookbook-gallery .lookbook-slider').hasClass('slick-slider')) {
                $('.blog-lookbook-gallery .lookbook-slider').slick({
                    rows: 0,
                    rtl: false,
                    dots: true,
                    arrows: false,
                    mobileFirst: true,
                    infinite: false,
                    adaptiveHeight: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            }
        }
    }
}
