import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal, modalTypes } from './modal';
import 'slick-carousel';
import haloYoutubeCarousel from '../halothemes/haloVideo';
import haloNotifyMe from '../halothemes/haloNotifyMe';

export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.card-quickview', event => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('productId');

        modal.$modal.removeClass().addClass('modal modal--quickView');
        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');

            soldProduct(modal.$content.find('.productView-soldProduct'), context);
            viewingProduct(modal.$content.find('.productView-ViewingProduct'), context);
            countDownProduct(modal.$content.find('.productView-countDown'));

            modal.$content.find('[data-slick]').slick();
            modal.$content.find('.productView-for').get(0).slick.setPosition();

            initThumbnailsHeight(modal.$content.find('.quickView'));
            haloYoutubeCarousel(modal.$content.find('[data-slick]'));
            haloNotifyMe(modal.$content.find('.quickView'), context);

            if($('body').hasClass('page-type-product')){
                modal.$content.on('click', '.dropdown-menu-button', event => {
                    event.stopPropagation();
                });
            }

            var productDetails = new ProductDetails(modal.$content.find('.quickView'), context);
            productDetails.setProductVariant();

            return productDetails;
        });
    });
}

function viewingProduct(context, wrapper) {
    if(wrapper.length > 0){ 
        var viewerText = context.themeSettings.product_viewingProduct_text,
            numbersViewer_text = context.themeSettings.product_viewingProduct_viewer,
            numbersViewerList =  JSON.parse("[" + numbersViewer_text + "]"); 
        
        setInterval(function() {
            var numbersViewerItem = (Math.floor(Math.random()*numbersViewerList.length));

            wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-eye"/></svg>' + numbersViewerList[numbersViewerItem] + " " + viewerText);
            wrapper.removeClass('u-hiddenVisually').show();
        }, 10000);  
    }
}

function countDownProduct(wrapper) {
    if(wrapper.length > 0){
        var countDown = wrapper.data('countdown'),
            countDownDate = new Date(countDown).getTime(),
            seft = wrapper;

        var countdownfunction = setInterval(function() {
            var now = new Date().getTime(),
                distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(countdownfunction);
                seft.remove();
            } else {
                var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds = Math.floor((distance % (1000 * 60)) / 1000),
                    strCountDown = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-bell"/></svg><span class="text"><span>Limited time offer, end in:</span></span> <span class="num">'+days+'d :</span> <span class="num">'+hours+'h :</span> <span class="num">'+minutes+'m :</span> <span class="num">'+seconds+'s</span>';

                seft.html(strCountDown);
            }
        }, 1000);
    }
}

function soldProduct(wrapper, context) {
    if(wrapper.length > 0){ 
        var numbersProduct_text = context.themeSettings.product_soldProduct_products,
            numbersHours_text = context.themeSettings.product_soldProduct_hours,
            soldProductText = context.themeSettings.product_soldProduct_text,
            soldProductText2 = context.themeSettings.product_soldProduct_hours_text;

        var numbersProductList =  JSON.parse("[" + numbersProduct_text + "]"), 
            numbersProductItem = (Math.floor(Math.random()*numbersProductList.length)),
            numbersHoursList =  JSON.parse("[" + numbersHours_text + "]"),
            numbersHoursItem = (Math.floor(Math.random()*numbersHoursList.length));

        wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-fire"/></svg><span>' + numbersProductList[numbersProductItem] + " " + soldProductText + " " + numbersHoursList[numbersHoursItem] + " " + soldProductText2 + '</span>');
        wrapper.show();
    }
}

function initThumbnailsHeight($scope){
    var el = $scope;

    var $carousel_nav = el.find('.productView-nav'),
        $carousel_for = el.find('.productView-for');

    if ($carousel_for.find('.slick-arrow').length) {
        $carousel_for.parent().addClass('arrows-visible');
    } else {
        $carousel_for.parent().addClass('arrows-disable');
    }
}
