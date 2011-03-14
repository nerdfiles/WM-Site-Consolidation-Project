;(function($, window) {
    
    var document = window.document,
    	_config = {
    		debugMode: true
    	};
    
    /*
    if ( (typeof(window.console === "undefined") || typeof(window.console.log == "undefined")) ) {
        var console = {};
        console.note = function(o) {
        	if (_config.debugMode) {
        		console.log(o);
        	}
        };
    }
    */
   
    $.tabs = function(c, _params) {
    
        var $self = $(c),
        	
        	// internal defaults (test defaults);
        	_defaults = { 
                // debug mode
                debugMode: _config.debugMode,
                // adjust height of <dd> container
                adjustHeight: 0,
                // e.g. values: [1-N]
                activeElement: 2,
                // change <dd> height on <dt> active state change (false), or stay set to setMaxHeight (true)?
                fixedHeight: false,
                // only applicable if fixedHeight is true
                height: 300,
                // only applicable if fixedHeight is false
                animateHeight: false,
                // ...
                animateHeightSpeed: 500,
                // ...
                animateHeightType: 'fade',
                // only applicable if fixedHeight is true
                animateOnLoad: true,
                // only applicable if animateOnLoad is true
                animateOnLoadSpeed: 500,
                fadeContent: true,
                fadeContentSpeed: 500,
                headersSelector: 'strong',
                urlActiveElementName: 'activeElement'
   			},
   			
   			// internal settings
   			_settings = (_params)
   			            ? (function(_params) { 
   							_params['settingsType'] = 'arg-param';
   							return _params;
   						})(_params) 
   					    : (function(_defaults) { 
   							_defaults['settingsType'] = 'def';
   							return _defaults;
   						})(_defaults);
   			
   		if (typeof($self.attr('data-settings')) === 'undefined' 
   			|| (typeof($self.attr('data-settings')) === 'string' 
   				&& String($self.attr('data-settings')) === '' )) {
   				
   			$self.data('data-settings', _settings);
   			
   			// setting to var on element from [arg-param] (if present) or [def]
   			// if metadata on element exists, override these
   			
   		}
    
        return $self.each(function(index, e) {

            var $self = $(this),
                _settings = ( (typeof($self.attr('data-settings')) === 'string' && $self.attr('data-settings') === '') 
                            || $self.attr('data-settings') === undefined )  
            				? $self.data('data-settings') 
            				: (function() {
            					var em = $self.metadata({type:'attr', name:'data-settings'}) || $.parseJSON($self.attr('data-settings'));
            					em['settingsType'] = 'elem';
            					return em;
            				}()), // be sure to check if specific properties are on their respective elements, if not, then use _settings
                activeElement = ( _settings.activeElement-1 ),
                _set_activeElement = ( _settings.activeElement && _settings.activeElement > 0 ),
                _set_fixedHeight = _settings.fixedHeight,
                _set_maxHeight = ( _settings.height + _settings.adjustHeight ),
                headerSelector = _settings.headersSelector + '.header',
                $tabs = $self.find('.tab-tabs .header');

            // Construct tabs

            $self.append('<div class="tab-tabs"></div><div class="tab-panes"></div>');
            $self.find(headerSelector).prependTo($self.find('.tab-tabs'));
            $self.find('div.body').appendTo($self.find('.tab-panes'));

            // Check for hard-coded "active" settings

            if ( $self.find('.tab-tabs .active').length === 0 ) {
                // @class="active" not set, prop set in _settings
                
                $self.find('.tab-tabs .header').not(':eq(' + activeElement + ')' ).removeClass('active');
                $self.find('.tab-tabs .header').eq(activeElement).addClass('active');
                $self.find('.tab-panes .body').eq(activeElement).addClass('active');
            }

            var loc = location.href,
                rx = new RegExp( _settings.urlActiveElementName + "=(\\d{0,4})" ),
                _set_urlActiveElement = (loc.match(rx)) ? (parseInt(loc.match(rx)[1], 8) - 1) : null;

            if ( _settings.urlActiveElementName ) {
                $self.find('.tab-tabs .header').not(':eq(' + _set_urlActiveElement + ')' ).removeClass('active');
                $self.find('.tab-tabs .header').eq(_set_urlActiveElement).addClass('active');
                $self.find('.tab-panes .body').removeClass('active');
                $self.find('.tab-panes .body').eq(_set_urlActiveElement).addClass('active');
            }

            // Bind click

            $tabs.live('click', function(e) {
                var $activeTab = $(this),
                    $activePane = $activeTab.parent().next().find('.body').eq($activeTab.index()),
                    $allTabs = $activeTab.parent().find('.header'),
                    $allPanes = $activeTab.parent().next().find('.body');

                // clear all
                $allTabs.removeClass('active');
                $allPanes.removeClass('active');

                //$tabs.removeClass('active');
                $activeTab.addClass('active');
                $activePane.addClass('active');

            });
        
       	});
        
    };
        
})(jQuery, window);
