(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').once().before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;
(function($) {

Drupal.admin = Drupal.admin || {};
Drupal.admin.behaviors = Drupal.admin.behaviors || {};

/**
 * @ingroup admin_behaviors
 * @{
 */

/**
 * Apply active trail highlighting based on current path.
 *
 * @todo Not limited to toolbar; move into core?
 */
Drupal.admin.behaviors.toolbarActiveTrail = function (context, settings, $adminMenu) {
  if (settings.admin_menu.toolbar && settings.admin_menu.toolbar.activeTrail) {
    $adminMenu.find('> div > ul > li > a[href="' + settings.admin_menu.toolbar.activeTrail + '"]').addClass('active-trail');
  }
};

/**
 * @} End of "ingroup admin_behaviors".
 */

Drupal.admin.behaviors.shorcutcollapsed = function (context, settings, $adminMenu) {

  // Create the dropdown base 
  $("<li class=\"label\"><a>"+Drupal.t('Shortcuts')+"</a></li>").prependTo("body.menu-render-collapsed div.toolbar-shortcuts ul"); 

}

Drupal.admin.behaviors.shorcutselect = function (context, settings, $adminMenu) {

  // Create the dropdown base
  $("<select id='shortcut-menu'/>").appendTo("body.menu-render-dropdown div.toolbar-shortcuts");
    
  // Create default option "Select"
  $("<option />", {
    "selected"  :  "selected",
    "value"     :  "",
    "text"      :  Drupal.t('Shortcuts')
  }).appendTo("body.menu-render-dropdown div.toolbar-shortcuts select");
    
  // Populate dropdown with menu items
  $("body.menu-render-dropdown div.toolbar-shortcuts a").each(function() {
    var el = $(this);
    $("<option />", {
      "value"   :  el.attr("href"),
      "text"    :  el.text()
    }).appendTo("body.menu-render-dropdown div.toolbar-shortcuts select");
    });
    
  $("body.menu-render-dropdown div.toolbar-shortcuts select").change(function() {
    window.location = $(this).find("option:selected").val();
  });
  
  $('body.menu-render-dropdown div.toolbar-shortcuts ul').remove();

};

})(jQuery);
;
/**
 * @file
 * JavaScript file for the Coffee module.
 */

(function($) {
  // Remap the filter functions for autocomplete to recognise the
  // extra value "command".
  var proto = $.ui.autocomplete.prototype,
  	initSource = proto._initSource;

  function filter(array, term) {
  	var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), 'i');
  	return $.grep(array, function(value) {
                return matcher.test(value.command) || matcher.test(value.label) || matcher.test(value.value);
  	});
  }

  $.extend(proto, {
  	_initSource: function() {
  		if ($.isArray(this.options.source)) {
  			this.source = function(request, response) {
  				response(filter(this.options.source, request.term));
  			};
  		}
  		else {
  			initSource.call(this);
  		}
  	}
  });

  Drupal.coffee = Drupal.coffee || {};

  Drupal.behaviors.coffee = {
    attach: function() {
      $('body').once('coffee', function() {
        var body = $(this);

        Drupal.coffee.bg.appendTo(body).hide();

        Drupal.coffee.form
        .append(Drupal.coffee.label)
        .append(Drupal.coffee.field)
        .append(Drupal.coffee.results)
        .wrapInner('<div id="coffee-form-inner" />')
        .addClass('hide-form')
        .appendTo(body);

        // Load autocomplete data set, consider implementing
        // caching with local storage.
        Drupal.coffee.dataset = [];
        
        var jquery_ui_version = $.ui.version.split('.');
        var jquery_ui_newer_1_9 = parseInt(jquery_ui_version[0]) >= 1 && parseInt(jquery_ui_version[1]) > 9;
        var autocomplete_data_element = (jquery_ui_newer_1_9) ? 'ui-autocomplete' : 'autocomplete';

        $.ajax({
          url: Drupal.settings.basePath + '?q=admin/coffee/menu',
          dataType: 'json',
          success: function(data) {
            Drupal.coffee.dataset = data;

            // Apply autocomplete plugin on show
            var $autocomplete = $(Drupal.coffee.field).autocomplete({
              source: Drupal.coffee.dataset,
              focus: function( event, ui ) {
                  // Prevents replacing the value of the input field
                  event.preventDefault();
              },
              select: function(event, ui) {
                Drupal.coffee.redirect(ui.item.value, event.metaKey);
                event.preventDefault();
                return false;
              },
              delay: 0,
              appendTo: Drupal.coffee.results
           });

           $autocomplete.data(autocomplete_data_element)._renderItem = function(ul, item) {
              return  $('<li></li>')
                      .data('item.autocomplete', item)
                      .append('<a>' + item.label + '<small class="description">' + item.value + '</small></a>')
                      .appendTo(ul);
            };

            // This isn't very nice, there are methods within that we need
            // to alter, so here comes a big wodge of text...
            var self = Drupal.coffee.field;
            if (!jquery_ui_newer_1_9){
                $(Drupal.coffee.field).data(autocomplete_data_element).menu = $('<ol></ol>')
                    .addClass('ui-autocomplete')
                    .appendTo(Drupal.coffee.results)
                    // prevent the close-on-blur in case of a "slow" click on the menu (long mousedown).
                    .mousedown(function(event) {
                        event.preventDefault();
                    })
                    .menu({
                        selected: function(event, ui) {
                            var item = ui.item.data('item.autocomplete');
                            Drupal.coffee.redirect(item.value, event.metaKey);
                            event.preventDefault();
                        }
                    })

                    .hide()
                    .data('menu');
            }

            // We want to limit the number of results.
            $(Drupal.coffee.field).data(autocomplete_data_element)._renderMenu = function(ul, items) {
          		var self = this;
          		items = items.slice(0, 7); // @todo: max should be in Drupal.settings var.
          		$.each( items, function(index, item) {
                    if (typeof(self._renderItemData) === "undefined"){
                        self._renderItem(ul, item);
                    }
                    else {
                        self._renderItemData(ul, item);
                    }

          		});
          	};

          	// On submit of the form select the first result if available.
          	Drupal.coffee.form.submit(function() {
          	  var firstItem = jQuery(Drupal.coffee.results).find('li:first').data('item.autocomplete');
          	  if (typeof firstItem == 'object') {
          	    Drupal.coffee.redirect(firstItem.value, false);
          	  }

          	  return false;
          	});
          },
          error: function() {
            Drupal.coffee.field.val('Could not load data, please refresh the page');
          }
        });

        // Key events
        $(document).keydown(function(event) {
          var activeElement = $(document.activeElement);

          // Show the form with alt + D. Use 2 keycodes as 'D' can be uppercase or lowercase.
          if (Drupal.coffee.form.hasClass('hide-form') && 
        		  event.altKey === true && 
        		  // 68/206 = d/D, 75 = k. 
        		  (event.keyCode === 68 || event.keyCode === 206  || event.keyCode === 75)) {
            Drupal.coffee.coffee_show();
            event.preventDefault();
          }
          // Close the form with esc or alt + D.
          else if (!Drupal.coffee.form.hasClass('hide-form') && (event.keyCode === 27 || (event.altKey === true && (event.keyCode === 68 || event.keyCode === 206)))) {
            Drupal.coffee.coffee_close();
            event.preventDefault();
          }
        });
      });
    }
  };

  // Prefix the open and close functions to avoid
  // conflicts with autocomplete plugin.

  /**
   * Open the form and focus on the search field.
   */
  Drupal.coffee.coffee_show = function() {
    Drupal.coffee.form.removeClass('hide-form');
    Drupal.coffee.bg.show();
    Drupal.coffee.field.focus();
    $(Drupal.coffee.field).autocomplete({enable: true});
  };

  /**
   * Close the form and destroy all data.
   */
  Drupal.coffee.coffee_close = function() {
    Drupal.coffee.field.val('');
    //Drupal.coffee.results.empty();
    Drupal.coffee.form.addClass('hide-form');
    Drupal.coffee.bg.hide();
    $(Drupal.coffee.field).autocomplete({enable: false});
  };

  /**
   * Close the Coffee form and redirect.
   * Todo: make it work with the overlay module.
   */
  Drupal.coffee.redirect = function(path, openInNewWindow) {
    Drupal.coffee.coffee_close();

    if (openInNewWindow) {
      window.open(Drupal.settings.basePath + path);
    }
    else {
      document.location = Drupal.settings.basePath + path;
    }
  };

  /**
   * The HTML elements.
   */
  Drupal.coffee.label = $('<label for="coffee-q" class="element-invisible" />').text(Drupal.t('Query'));

  Drupal.coffee.results = $('<div id="coffee-results" />');

  // Instead of appending results one by one, we put them in a placeholder element
  // first and then append them all at once to prevent flickering while typing.
  Drupal.coffee.resultsPlaceholder = $('<ol />');

  Drupal.coffee.form = $('<form id="coffee-form" action="#" />');

  Drupal.coffee.bg = $('<div id="coffee-bg" />').click(function() {
    Drupal.coffee.coffee_close();
  });

  Drupal.coffee.field = $('<input id="coffee-q" type="text" autocomplete="off" />');

}(jQuery));
;
