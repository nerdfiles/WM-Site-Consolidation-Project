/**
 * jQuery Metadata Configuration
 *
 * jQuery Metadata Configuration
 *
 * @author              aalexander
 * @project             wm-redesign
 * @package             wm-redesign-r2
 * @subpackage          site-consolidation
 * @version             0.0.1
 * @lastmodified        03-18-2011 1:40PM
 * @depends             jquery.metadata
 *
 * @js-for              all
 * @tested              ie6,ie7,ie8,chrome_10.x,opera_11.x,firefox_3.6.x,safari_5.x,
 */

$.metadata.setType('attr', 'data-settings');


/**
 * jQuery init
 *
 * jQuery init
 *
 * @author              aalexander
 * @project             wm-redesign
 * @package             wm-redesign-r2
 * @subpackage          site-consolidation
 * @version             0.0.1
 * @lastmodified        03-18-2011 1:40PM
 * @depends             jquery
 *
 * @js-for              all
 * @tested              ie6,ie7,ie8,chrome_10.x,opera_11.x,firefox_3.6.x,safari_5.x,
 * @valid               true
 */


$(function() {
    
/**
 * jQuery Tabs Configuration
 *
 * jQuery Tabs Configuration
 *
 * @author              aalexander
 * @project             wm-redesign
 * @package             wm-redesign-r2
 * @subpackage          site-consolidation
 * @version             0.0.1
 * @lastmodified        03-18-2011 1:40PM
 * @depends             jquery.tabs
 *
 * @js-for              all
 * @tested              ie6,ie7,ie8,chrome_10.x,opera_11.x,firefox_3.6.x,safari_5.x,
 * @valid               true
 */
 
    $.tabs("div.tabs");
    
    
/**
 * jQuery FAQ Init
 *
 * jQuery FAQ Init
 *
 * @author              aalexander
 * @project             wm-redesign
 * @package             wm-redesign-r2
 * @subpackage          site-consolidation
 * @subsubpackage       wm-module-faq
 * @version             0.0.1
 * @lastmodified        03-18-2011 1:40PM
 * @depends             jquery
 *
 * @js-for              all
 * @tested              ie6,ie7,ie8,chrome_10.x,opera_11.x,firefox_3.6.x,safari_5.x,
 * @valid               true
 */

    $("dl[class*='faq']").each(function(e) {
        var $self = $(this),
            cn = $self.attr("class"),
            grid = cn.match(/\:(grid\_\d{0,2})/),
            grid = grid[1];
            
        $self.find("dd").addClass(grid+" alpha").css({
            margin: "0 !important",
            float: "none !important"
        });

    });
    

/**
 * jQuery FAQ Toggle Next
 *
 * jQuery FAQ Init
 *
 * @author              aalexander
 * @project             wm-redesign
 * @package             wm-redesign-r2
 * @subpackage          site-consolidation
 * @subsubpackage       wm-module-faq
 * @version             0.0.1
 * @lastmodified        03-18-2011 1:40PM
 * @depends             jquery
 *
 * @js-for              all
 * @tested              ie6,ie7,ie8,chrome_10.x,opera_11.x,firefox_3.6.x,safari_5.x,
 * @valid               true
 */
    
    $(".toggle-next").each(function(e) {
        var that = $(this),
            nextElem = that.next(),
            parentElem = that.parent();
            
        nextElem.wrapInner('<div class="faq-answer-container" style="padding-left: 30px"></div>');
        /*nextElem.wrapInner(function() {
            return '<div class="faq-answer-container" style="height: '+nextElem.height()+'px"></div>';
        });*/
        
        that.bind("click", function(e) {
            if (parentElem.hasClass("faq-toggle-list")) {
                //nextElem.height()
                nextElem.animate({
                    height: ["toggle", "swing"]
                }, 300);
                //nextElem.slideToggle("slow", function() {});
            } else {
                nextElem.toggle();
            }
        
            that.toggleClass("toggle-next-active");
            
            e.preventDefault();
        });
        
    });
    
    $(".toggle-all").bind("click", function(e) {
    
        var $self = $(this);
            
        if ( $self.hasClass('toggle-all-active') == false ) {
            // show all
            $self.closest('.faq-container').find('dd').slideDown();
            $self.closest('.faq-container').find('dt').addClass('toggle-next-active');
            $self.addClass('toggle-all-active');
        } else {
            // all hidden
            $self.closest('.faq-container').find('dd').slideUp();
            $self.closest('.faq-container').find('dt').removeClass('toggle-next-active');
            $self.removeClass('toggle-all-active');
        }
        
        e.preventDefault();
        //return false;
    });
    
});