export default function() {
    if ($('.all-categories-list').length > 0) {
        $(document).on('click', '.all-categories-list .icon-dropdown', function() {
            var $this = $(this).parent();

            $this.siblings().removeClass('is-clicked current-cate');
            $this.toggleClass('is-clicked');
            $this.siblings().find("> .dropdown-category-list").slideUp("slow");
            $this.find("> .dropdown-category-list").slideToggle("slow");
        });

        $('.all-categories-list li').each(function() {
            if ($(this).hasClass('current-cate')) {
                $(this).find("> .dropdown-category-list").slideToggle("slow");
            }
        });
    }
}
