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
                activeElement: 1,
                // change <dd> height on <dt> active state change (false), or stay set to setMaxHeight (true)?
                fixedHeight: false,
                // only applicable if fixedHeight is true
                height: 300,
                // only applicable if fixedHeight is false
                animateHeight: false,
                // ...
                animateHeightSpeed: 500,
                // ...
                animateHeightType: "fade",
                // only applicable if fixedHeight is true
                animateOnLoad: true,
                // only applicable if animateOnLoad is true
                animateOnLoadSpeed: 500,
                
                fadeContent: true,
                fadeContentSpeed: 500
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
   			
   		if (typeof($self.attr("data-settings")) === 'undefined' 
   			|| (typeof($self.attr("data-settings")) === 'string' 
   				&& String($self.attr("data-settings")) === '' )) {
   				
   			$self.data("data-settings", _settings);
   			
   			// setting to var on element from [arg-param] (if present) or [def]
   			// if metadata on element exists, override these
   			
   		}
    
        return $self.each(function(index, e) {
        	
            var $self = $(this),
            
            	// new pattern?
            	_settings = (typeof($self.attr("data-settings")) !== "string") 
            				? $self.data("data-settings") 
            				: (function() {
            					var em = $self.metadata({type:'attr', name:'data-settings'}) || $.parseJSON($self.attr("data-settings"));
            					em['settingsType'] = 'elem';
            					return em;
            				}()),
                $tabs = $self.find('li'),
                $panesContainer = $self.next(),
                
                activeElement = (_settings.activeElement-1),
                _set_activeElement = (_settings.activeElement && _settings.activeElement > 0),
                _set_fixedHeight = _settings.fixedHeight,
                _set_maxHeight = (_settings.height+_settings.adjustHeight),
                
                $activeTab = (_set_activeElement) ? $self.find('li:eq('+activeElement+')') : $self.find('li.active'),
                $activePane = (_set_activeElement) ? $self.next().find('div:eq('+activeElement+')') : $panesContainer.find('div.active');
            
            // ...
                         
            // animate on load and set fixed height
            
            if (_set_fixedHeight) {
                if (_settings.animateOnLoad) {
                    $panesContainer.animate({
                        "height": _set_maxHeight
                    }, _settings.animateOnLoadSpeed);
                } else {
                    $panesContainer.css({
                        "height": _set_maxHeight
                    });
                }
            }
            
            // set active element
               
            if (_set_activeElement) {
                $self.find('li.active').removeClass('active');
                $panesContainer.find('div.active').removeClass('active');
                
                $activeTab.addClass('active');
                $activePane.addClass('active');
            }
            
            $tabs.bind('click', function(e) {
                var $activeTab = $(this),
                    activeTabIndex = $self.find('li').index($activeTab);
                    $panesContainer = $activeTab.parent().next(),
                    $activePane = $panesContainer.find('div:eq('+activeTabIndex+')');
                                    
                if (!$activeTab.hasClass("active")) {
                                        
                    $activeTab.parent().find('li.active').removeClass('active');
                    $activeTab.addClass('active');
                    
                    if (_settings.animateHeight) {
                        $activePane.parent().find('div.active').animate({
                            "height": "hide",
                            "opacity": "hide"
                        }).queue(function() {
                            $(this).removeClass('active)');
                            
                            $activePane.animate({
                                "height": "show",
                                "opacity": "show"
                            }, _settings.fadeContentSpeed).queue(function() {
                                $(this).addClass('active');
                                $(this).dequeue();
                            });
                            
                            $(this).dequeue();
                        }, _settings.fadeContentSpeed);
                    } else {
                        $activePane.parent().find('div.active').removeClass('active');
                        $activePane.addClass('active');
                    }
                
                }
            });
        
       	});
        
    };
        
})(jQuery, window);
