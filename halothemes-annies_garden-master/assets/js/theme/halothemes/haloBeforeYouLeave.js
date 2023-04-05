import utils from '@bigcommerce/stencil-utils';

export default function(context){
	const $beforeLeave = $('#halo-before-you-leave'); 

	function ProductsCarousel(tab) {
		if(!tab.hasClass('slick-slider')) {
			if(tab.find('.product').length > 0){
		        tab.slick({
		            dots: true,
		            arrows: true,
		            slidesToShow: 1,
		            slidesToScroll: 1,
		            slidesPerRow: 1,
	                rows: 3,
		            infinite: false,
		            adaptiveHeight: true,
		            nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next'><use xlink:href=#slick-arrow-next></use></svg>", 
	                prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous'><use xlink:href=#slick-arrow-prev></use></svg>"
		        });
			}
	    }
	}

    function beforeYouLeave() {
        var beforeYouLeave_time = $('#halo-before-you-leave').data("time");
        var beforeYouLeave = $("#halo-before-you-leave");
        var idleTime = 0;

        if (!$(beforeYouLeave).length) {
            return;
        } else{
        	setTimeout(function() {
        		recommendedProducts();
            }, beforeYouLeave_time/2 + 100);

            var slickInterval = setInterval(function() {
            	timerIncrement();
            }, beforeYouLeave_time);
	        
	        $(document).on('mousemove keydown scroll', event => {
	        	resetTimer();
	        });

	        $(document).on('click', '#halo-before-you-leave .halo-sidebar-close', event =>{
	        	event.preventDefault();

	            $('body').removeClass('openBeforeYouLeave');
	        });

	        $(document).on('click', '.before-you-leave-banner .content .button', event =>{
	        	event.preventDefault();

	            $('body').removeClass('openBeforeYouLeave');
	        });

	        $(document).on('click', '.before-you-leave-search [data-search-popup]', event => {
	        	event.preventDefault();

	            var $beforeLeaveSearch = $('.before-you-leave-search');

	            $beforeLeaveSearch.toggleClass('is-open');

	            if($beforeLeaveSearch.hasClass('is-open')){
	            	$beforeLeaveSearch.siblings().addClass('is-hidden');
	            	$beforeLeave.find('.tabs-contents').addClass('is-hidden');
	            	$beforeLeave.find('.before-you-leave-back').addClass('is-hidden');
	            	$('#quickSearch .quickSearchResults').appendTo($beforeLeaveSearch);
	            	$('#quickSearch .quickSearchResultsCustom').appendTo($beforeLeaveSearch);
	            } else{
	            	$beforeLeaveSearch.find('.quickSearchResults').appendTo('#quickSearch');
	            	$beforeLeaveSearch.find('.quickSearchResultsCustom').appendTo('#quickSearch');
	            	$beforeLeaveSearch.siblings().removeClass('is-hidden');
	            	$beforeLeave.find('.tabs-contents').removeClass('is-hidden');
	            	$beforeLeave.find('.before-you-leave-back').removeClass('is-hidden');
	            }
	        });
        }
        
        function timerIncrement() {
            idleTime = idleTime + 1;

            if (idleTime >= 1 && !$('body.openBeforeYouLeave').length) {
            	$('body').addClass('openBeforeYouLeave');
            }
        }

        function resetTimer() {
            idleTime = -1;
        }

        function recommendedProducts() {
        	const $options = {
	            template: 'halothemes/products/halo-before-you-leave-tmp'
	        };

            var productIDS = context.themeSettings.before_you_leave_recommended_id,
            	listIDs = JSON.parse("[" + productIDS + "]");

            var $tab = $('#halo-before-you-leave #tab-recommended');

            if ($tab.length) {
            	for (var i = 0; i < listIDs.length; i++) {
	                var $prodId = listIDs[i];

	                if($prodId != undefined){
	                   	utils.api.product.getById($prodId, $options, (err, response) => {
				            if(err){
				                return false;
				            }

				            var hasProduct = $(response).find('.card').data('product-id');

				            if(hasProduct !== undefined && hasProduct !== null && hasProduct !== ''){
					            if ($tab.find('.product').length < listIDs.length){
					            	if($tab.find('.product-slider').hasClass('slick-initialized')) {
					            		$tab.find('.product-slider').slick('unslick');
					            		$tab.find('.product-slider').append(response);
					            	} else{
					            		$tab.find('.product-slider').append(response);
					            	}

					            	ProductsCarousel($tab.find('.product-slider'));
					            }
					        }

	            			$('#halo-before-you-leave .tab.recommended .count').text(listIDs.length);
				        });
				    }
                }
            }
        }
    }

	$(window).on("load", function() {
		if (context.themeSettings.halobeforeyouleave == true) {
			beforeYouLeave();
		}
	});
}
