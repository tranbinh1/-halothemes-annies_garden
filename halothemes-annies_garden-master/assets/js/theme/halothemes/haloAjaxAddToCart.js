import utils from '@bigcommerce/stencil-utils';
import modalFactory, { ModalEvents } from '../global/modal';

export default function (context) {
    const modal = modalFactory('#modal')[0];

    $(document).on('click', '.halo-add-to-cart', (event) => {
        if (window.FormData === undefined) {
            return;
        }

        const $addToCartBtn = $(event.currentTarget);
        const waitMessage = $addToCartBtn.data('waitMessage');
        const originalBtnVal = $addToCartBtn.find('span').text();

        event.preventDefault();

        $addToCartBtn
            .find('span')
            .text(waitMessage);
        $addToCartBtn
            .prop('disabled', true);

        const productId = $(event.currentTarget).data('product-id');

        if (productId === 0) {
            return;
        }

        const formData = new FormData();
        formData.append('product_id', productId);

        let qty = 1;

        $(event.target).parents('form').find('[name^="qty"]').each((id, el) => {
            qty = parseInt($(el).val(), 10);
        });

        if (qty) {
            formData.append('qty[]', qty);
        }

        // Add item to cart
        utils.api.cart.itemAdd(formData, (err, response) => {
            const errorMessage = err || response.data.error;

            $addToCartBtn
                .find('span')
                .text(originalBtnVal);
            $addToCartBtn
                .prop('disabled', false);

            // Guard statement
            if (errorMessage) {
                // Strip the HTML from the error message
                const tmp = document.createElement('DIV');
                tmp.innerHTML = errorMessage;

                alert(tmp.textContent || tmp.innerText);

                return;
            }

            if (context.themeSettings.halo_add_to_cart_popup === 'normal'){
                modal.$modal.removeClass().addClass('modal modal--preview');
                modal.open({ size: 'large' });
            } else if (context.themeSettings.halo_add_to_cart_popup === 'mini'){
                modal.$modal.removeClass().addClass('modal modal--preview modal--previewMini');
                modal.open({ size: 'small' });

                if($(".modal-background:visible").length > 0){
                    $('.modal-background:visible').hide();
                }
            }

            updateCartContent(modal, response.data.cart_item.hash);
        });
    });

    function updateCartContent(modal, cartItemHash) {
        getCartContent(cartItemHash, (err, response) => {
            if (err) {
                return;
            }

            modal.updateContent(response);

            // Update cart counter
            const $body = $('body');
            const quantity = $(response).find('[data-cart-quantity]').data('cartQuantity') || $('[data-cart-quantity]').data('cartQuantity') || 0;

            $body.trigger('cart-quantity-update', quantity);
        });
    }

    function getCartContent(cartItemHash, onComplete) {
        const options = {
            template: 'cart/preview',
            params: {
                suggest: cartItemHash,
            },
            config: {
                cart: {
                    suggestions: {
                        limit: 4,
                    },
                },
            },
        };

        utils.api.cart.getContent(options, onComplete);
    }
}
