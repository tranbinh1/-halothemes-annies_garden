import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import adminBar from './global/adminBar';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';
import objectFitImages from './global/object-fit-polyfill';
import haloGlobal from './halothemes/haloGlobal';
import haloRecentlyBoughtPopup from './halothemes/haloRecentlyBoughtPopup';
import haloStickyHeader from './halothemes/haloStickyNavigation';
import haloResizeMenu from './halothemes/haloResizeMenu';
import haloAjaxAddToCart from './halothemes/haloAjaxAddToCart';
import haloBeforeYouLeave from './halothemes/haloBeforeYouLeave';
import haloQuickShop from './halothemes/haloQuickShop';
import haloNewsletterPopup from './halothemes/haloNewsletterPopup';
import RecentlyViewedProducts from './halothemes/haloRecentlyViewedProducts';
import haloLoginPopup from './halothemes/haloLoginPopup';
import haloMegaMenu from './halothemes/haloMegaMenu';
    window.haloMegaMenu = haloMegaMenu;

export default class Global extends PageManager {
    onReady() {
        const {
            channelId, cartId, productId, categoryId, secureBaseUrl, maintenanceModeSettings, adminBarLanguage, showAdminBar,
        } = this.context;
        cartPreview(secureBaseUrl, cartId, this.context);
        quickSearch(this.context);
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel();
        mobileMenuToggle();
        privacyCookieNotification();
        if (showAdminBar) {
            adminBar(secureBaseUrl, channelId, maintenanceModeSettings, JSON.parse(adminBarLanguage), productId, categoryId);
        }
        haloNewsletterPopup(this.context);
        haloGlobal(this.context, this.context.productId);
        haloStickyHeader(this.context);
        haloResizeMenu(this.context);
        haloRecentlyBoughtPopup(this.context);
        haloAjaxAddToCart(this.context);
        loadingProgressBar();
        svgInjector();
        objectFitImages();
        haloBeforeYouLeave(this.context);
        RecentlyViewedProducts(this.context);

        if (!$('body').hasClass('page-type-login')) {
            haloLoginPopup();
        }

        if (this.context.themeSettings.halo_quick_shop == true) {
            haloQuickShop(this.context);
        }
    }
}
