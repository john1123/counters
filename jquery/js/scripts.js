$(document).ready(function() {
    App.init();
});

var App = (function(){
    var listeners = [];

    var mainPage = "main"; // Главная страница открываемая по-умолчанию

    var counters;
    var services;
    var history;
    
	return {
        init: function(){
            $.mobile.loading( "show", {
                text: "Загружаются данные",
                textVisible: true,
                theme: "a",
                html: ""
              });
            $.getJSON( "data.php?type=counters", function( data ) {
                counters = data;
                App.dataLoaded();
            });
            $.getJSON( "data.php?type=history", function( data ) {
                history = data;
                App.dataLoaded();
            });
            $.getJSON( "data.php?type=services", function( data ) {
                services = data;
                App.dataLoaded();
            });
            $(document).on("pagebeforeshow", function(event){
                $divPage = $(event.target);
                App.preparePage($divPage.attr('id'));
            });
        },
        dataLoaded: function() {
            // Если все данные были загружены
            if (typeof counters === 'object' && typeof services === 'object' && typeof history === 'object') {
                App.triggerEvent("Data loaded");
                $.mobile.loading("hide"); // Прячем loader
                var pageId = window.location.hash.length > 0 ? window.location.hash.replace('#','') : mainPage;
                App.preparePage(pageId);
            }
        },
        preparePage: function(pageId) {
            App.triggerEvent("Prepare page", pageId);
            switch (pageId) {
                case mainPage:
                    break;
                case "history":
                    for (key in history) {
                        console.log(history[key]);
                    }
                    break;
                case "counters":
                    break;
            }
        },
        
		run: function(){
		},


        // events
        addEventListener : function(eventType, callback) {
            if ( ! listeners.hasOwnProperty(eventType) ) {
                listeners[eventType] = [];
            }
            listeners[eventType].push(callback);
        },
        removeEventListener : function(eventType, callback) {
            var i;
            if ( listeners.hasOwnProperty(eventType) ) {
                for (i = 0; i < listeners[eventType].length; i++) {
                    if (listeners[eventType][i] === callback) {
                        listeners[eventType].splice(i, 1);
                    }
                }
            }    
        },
        triggerEvent : function(eventType, args) {
            console.log(eventType, (typeof args === "undefined" ? "" : JSON.stringify(args))); // DEBUG:
            if ( listeners.hasOwnProperty(eventType) ) {
                var i, list = listeners[eventType];
                for (i = 0; i < list.length; i++) {
                    list[i](args);
                }
            }
        }
	}
})();