(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{630:function(t,n,i){"use strict";i.r(n),function(t){i.d(n,"default",(function(){return u}));var o=i(1),e=i(645),a=i(641),r=i(648),c=i(649),s=i(650),d=i(639),p=i(651);i(307);function l(t,n){return(l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t})(t,n)}var u=function(n){var i,e;function u(){return n.apply(this,arguments)||this}e=n,(i=u).prototype=Object.create(e.prototype),i.prototype.constructor=i,l(i,e);var h=u.prototype;return h.onReady=function(){Object(a.a)(this.context.urls),t("#facetedSearch").length>0?this.initFacetedSearch():(this.onSortBySubmit=this.onSortBySubmit.bind(this),o.c.on("sortBy-submitted",this.onSortBySubmit)),this.showProductsPerPage(),this.showItem(),this.loadOptionForProductCard(this.context),this.showMoreProducts(),this.fancyboxVideoBanner(),Object(s.a)(),Object(c.a)(),Object(p.a)(this.context)},h.initFacetedSearch=function(){var n=this,i=t("#product-listing-container .productListing"),o=t("#faceted-search-container"),e=t(".pagination"),a=t(".halo-product-show-more"),c={template:{productListing:"halothemes/gallery/halo-product-listing",sidebar:"brand/sidebar",paginator:"halothemes/gallery/halo-product-paginator"},config:{shop_by_brand:!0,brand:{products:{limit:this.context.brandProductsPerPage}}},showMore:"brand/show-more"};this.facetedSearch=new r.a(c,(function(r){i.html(r.productListing),o.html(r.sidebar),e.html(t(r.paginator).find(".pagination").children()),a.html(t(r.paginator).find(".halo-product-show-more").children()),t("body").triggerHandler("compareReset"),t("#product-listing-container .product").length>0&&Object(d.a)(n.context,"product-listing-container"),n.showProductsPerPage(),n.showItem(),n.showMoreProducts(),t("html, body").animate({scrollTop:0},100)}))},h.showProductsPerPage=function(){try{var t=new URL(window.location.href).searchParams.get("limit");if(null!=t){var n=document.querySelectorAll("select#limit option");Array.prototype.forEach.call(n,(function(n){n.value==t&&(n.selected=!0)}))}}catch(t){}},h.showItem=function(){var n,i=parseInt(t(".pagination-info .total").text()),o=this.getUrlParameter("limit");n=void 0!==o?o:this.context.brandProductsPerPage;var e=1,a=i,r=1,c=t(".pagination-list .pagination-item--current").next(),s=(r-1)*n,d=i-s,p=parseInt(t(".pagination-item--current > a").text()),l=p-1;0===c.length?r=parseInt(t(".pagination-item--current").find("a").text()):r=parseInt(c.find("a").text()),i<=n?(t(".pagination-info .start").text(e),t(".pagination-info .end").text(a)):(p<=1?a=n:(e=l*n+1,a=!0?t(".pagination-list .pagination-item--next").length>0?s+d-1:s+d:p*n-1),t(".pagination-info .start").text(e),t(".pagination-info .end").text(a))},h.showMoreProducts=function(){var n=this.context,i=this.getUrlParameter("limit");t("#listing-showmoreBtn > a").on("click",(function(o){o.preventDefault();var e=t(".pagination-item--current").next(),a=e.find("a").attr("href");t("#listing-showmoreBtn > a").addClass("loading"),t.ajax({type:"get",url:a.replace("http://","//"),success:function(o){if(t(o).find("#product-listing-container .productListing").length>0){if(t("#product-listing-container .productListing").append(t(o).find("#product-listing-container .productListing").children()),t(".pagination-list").html(t(o).find(".pagination-list").html()),t("#listing-showmoreBtn > a").removeClass("loading").blur(),0===(e=t(".pagination-item--current").next()).length)t("#listing-showmoreBtn > a").addClass("disable").text("No more products"),t(".pagination .pagination-info .end").text(t(".pagination-info .total").text());else{var a,r=i,c=parseInt(t(".pagination-item--current > a").text());a=void 0!==r?r:n.brandProductsPerPage,t(".pagination .pagination-info .end").text(parseInt(a)*c)}t(o).find("#product-listing-container .product").length>0&&Object(d.a)(n,"product-listing-container")}}})}))},h.fancyboxVideoBanner=function(){t(".video-block-image[data-fancybox]").length&&t(".video-block-image[data-fancybox]").fancybox({autoDimensions:!1,padding:0,width:970,height:600,autoScale:!1,transitionIn:"none",transitionOut:"none"}),t(".button-popup-video[data-fancybox]").length&&t(".button-popup-video[data-fancybox]").fancybox({autoDimensions:!1,padding:0,width:970,height:600,autoScale:!1,transitionIn:"none",transitionOut:"none"})},h.getUrlParameter=function(t){var n,i,o=decodeURIComponent(window.location.search.substring(1)).split("&");for(i=0;i<o.length;i++)if((n=o[i].split("="))[0]===t)return void 0===n[1]||n[1]},h.loadOptionForProductCard=function(n){t("#featured-products .card").length>0&&Object(d.a)(n,"featured-products"),t("#product-listing-container .product").length>0&&Object(d.a)(n,"product-listing-container")},u}(e.a)}.call(this,i(3))}}]);
//# sourceMappingURL=theme-bundle.chunk.15.js.map