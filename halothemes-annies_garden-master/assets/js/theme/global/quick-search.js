import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import StencilDropDown from './stencil-dropdown';
import haloQuickSearch from '../halothemes/haloSearchCategories';

export default function (context) {
    const TOP_STYLING = 'top: unset;';
    const $quickSearchResults = $('.quickSearchResults');
    const $quickSearchResultsCustom = $('.quickSearchResultsCustom');
    const $quickSearchDiv = $('#quickSearch');
    const $searchQuery = $('#search_query');
    const $searchQuery2 = $('#search_query2');
    const stencilDropDownExtendables = {
        hide: () => {
            $searchQuery.trigger('blur');
        },
        show: (event) => {
            $searchQuery.trigger('focus');
            event.stopPropagation();
        },
    };
    // const stencilDropDown = new StencilDropDown(stencilDropDownExtendables);
    // stencilDropDown.bind($('[data-search="quickSearch"]'), $quickSearchDiv, TOP_STYLING);

    $(document).on('click', event => {
        // If the target element has this data tag or one of it's parents, do not close the search results
        // We have to specify `.modal-background` because of limitations around Foundation Reveal not allowing
        // any modification to the background element.
        if (($(event.target).closest('[data-prevent-quick-search-close]').length === 0) && ($(event.target).closest('.before-you-leave-search').length === 0))  {
            // stencilDropDown.hide($container);

            $quickSearchResults.removeClass('is-open');
            $quickSearchResultsCustom.removeClass('is-open');
        }
    });

    // stagger searching for 200ms after last input
    const doSearch = _.debounce((searchQuery, category) => {
        var quickSearch = new haloQuickSearch;

        quickSearch.search(searchQuery, category, { template: 'search/quick-results' }, (err, response) => {
            if (err) {
                return false;
            }

            $quickSearchResultsCustom.removeClass('is-open');
            $quickSearchResults.html(response).addClass('is-open');
        });
    }, 200);

    utils.hooks.on('search-quick', (event) => {
        const searchQuery = $(event.currentTarget).val();
        const category = $(event.currentTarget).parents('form').find('select[name="category"]').val();

        // server will only perform search with at least 3 characters
        if (searchQuery.length < 3) {
            $quickSearchResults.removeClass('is-open');
            $quickSearchResultsCustom.addClass('is-open');
            return;
        }

        doSearch(searchQuery, category);
    });

    // Catch the submission of the quick-search
    $quickSearchDiv.on('submit', event => {
        const searchQuery = $(event.currentTarget).find('input').val();

        if (searchQuery.length === 0) {
            return event.preventDefault();
        }

        return true;
    });
    if (context.quickSearchBefore) {
        $searchQuery.on('click', event => {
            $quickSearchResults.empty().removeClass('is-open');
            $quickSearchResultsCustom.addClass('is-open');

            var listIDs = context.quickSearchPopularId.split(','),
                listID = listIDs.slice(0,parseInt(context.quickSearchResultLimit));

            const $options = {
                template: 'halothemes/products/product-card-2'
            };

            if(!$quickSearchResultsCustom.find('.productGrid .product').length){
                $quickSearchResultsCustom.find('.quickResults-product').addClass('is-loading');

                var num = 0;

                for (var i = 0; i <= listID.length; i++) {
                    var $prodId = listID[i];

                    if($prodId != undefined){
                        utils.api.product.getById($prodId, $options, (err, response) => {
                            if(err){
                                return false;
                            }

                            var hasProd = $(response).find('.card').data('product-id');

                            if(hasProd != undefined){
                                if($quickSearchResultsCustom.find('.productGrid .product').length < listID.length){
                                    $quickSearchResultsCustom.find('.productGrid').append(response);
                                }

                                num++;

                                if(num == listID.length){
                                    $quickSearchResultsCustom.find('.quickResults-product').removeClass('is-loading');
                                }
                            }
                        });            
                    }
                }
            }
        });

        $searchQuery2.on('click', event => {
            $quickSearchResults.empty().removeClass('is-open');
            $quickSearchResultsCustom.addClass('is-open');

            var listIDs = context.quickSearchPopularId.split(','),
                listID = listIDs.slice(0,3);

            const $options = {
                template: 'halothemes/products/product-card-2'
            };

            if(!$quickSearchResultsCustom.find('.productGrid .product').length){
                $quickSearchResultsCustom.find('.quickResults-product').addClass('is-loading');
                
                var num = 0;

                for (var i = 0; i <= listID.length; i++) {
                    var $prodId = listID[i];

                    if($prodId != undefined){
                        utils.api.product.getById($prodId, $options, (err, response) => {
                            if(err){
                                return false;
                            }

                            var hasProd = $(response).find('.card').data('product-id');

                            if(hasProd != undefined){
                                if (context.themeSettings.haloAddOptionForProduct == true) {
                                    var $product = $(response).find('.card'),
                                        productId = $product.data("product-id");                        

                                    if (productId != undefined) {
                                        utils.api.product.getById(productId, { template: 'halothemes/halo-add-option-for-product' }, (err, resp) => {
                                            if (err) {
                                                $('[data-product-id='+productId+']').find('.card-option').remove();
                                                return;
                                            }

                                            $('[data-product-id='+productId+']').find('.card-option').html(resp);
                                        });
                                    }
                                }

                                if($quickSearchResultsCustom.find('.productGrid .product').length < listID.length){
                                    $quickSearchResultsCustom.find('.productGrid').append(response);
                                }

                                num++;

                                if(num == listID.length){
                                    $quickSearchResultsCustom.find('.quickResults-product').removeClass('is-loading');
                                }
                            }

                        });
                    }
                }
            }
        });
    }
    $('[data-search="quickSearch"]').on('click', event => {
        $searchQuery.trigger('click');
    });

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    function searchCategory() {
        var category = getUrlParameter('category');

        $('#haloSearchCategory').val(category).trigger("change");
        $('select[name="category"]').val(category).trigger("change");

        $(document).on('mouseover', '#haloSearchCategory .halo-select-category', function() {
            if($(this).children().length > 1){
            } else{
                if($('body').hasClass('page-type-default')){
                    const url = '/categories.php';
                    const $options = {
                        template: 'halothemes/halo-all-categories'
                    };

                    utils.api.getPage(url, $options, (err, response) => {
                        if (err) {
                            return '';
                        }

                        $('#haloSearchCategory .halo-select-category').append(response);
                    });
                }
            }
        });

        $('[data-search="quickSearch"]').on('click', event => {
            if($('#haloSearchCategory .halo-select-category').children().length > 1){
            } else{
                if($('body').hasClass('page-type-default')){
                    const url = '/categories.php';
                    const $options = {
                        template: 'halothemes/halo-all-categories'
                    };

                    utils.api.getPage(url, $options, (err, response) => {
                        if (err) {
                            return '';
                        }

                        $('#haloSearchCategory .halo-select-category').append(response);
                    });
                }
            }
        });

        $('form[action="/search.php"]').on('submit', (event) => {
            if($(event.currentTarget).find('select[name="category"]').val() === ''){
                $(event.currentTarget).find('select').attr('name','');
            }
        });
    }
    searchCategory();

    $(document).ready(function(){
        var category = getUrlParameter('category');

        if($('body').hasClass('page-type-search')){
            $('#haloSearchCategory .halo-select-category').trigger('click');
        } else{
            $('#haloSearchCategory').val(category).trigger("change");
            $('select[name="category"]').val(category).trigger("change");
        }
    });
}
