import utils from '@bigcommerce/stencil-utils';

export default function(context, el) {
    var $popup = $('.lookbook-popup');
    var $el = el;

    const $options = {
        template: 'halothemes/products/halo-lookbook-tmp'
    };

    $el.find('.item .item-point').on('click', event => {
        $popup.removeClass('is-open').empty();

        var $prodId = $(event.target).data('product-id'),
            position = $(event.target).offset(),
            container = $el.offset();

        if($prodId != undefined){
            utils.api.product.getById($prodId, $options, (err, response) => {
                if(err){
                    return false;
                }

                $popup.html(response);
            });

            if ($(window).width() >= 551) {
                $popup.css({'top': position.top - container.top - 100, 'left': position.left - container.left + 30});
            } else {
                $popup.css({'top': position.top - container.top + 15, 'left': 15});
            }

            $popup.addClass("is-open");
        }
    });

    $(document).on('click', '.close-product', event => {
        event.preventDefault();

        if ($popup.hasClass("is-open")) {
            $popup.removeClass("is-open");
        }
    });

    $(document).on('click', event => {
        if($popup.hasClass("is-open")) {
            if(($(event.target).closest($popup).length === 0) && ($(event.target).closest('.item .item-point').length === 0)) {
                $popup.removeClass("is-open");
            }
        }
    });
}
