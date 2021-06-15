        var intervalId, timeRemained, ktValue, divElement, vars, customInterval, owner, attrs, pageTrackingIds, meetingStartsAt, arrivingTime, hoursDiff, minutesDiff, offerTimeDefault, offerTimeWillShowUpIn;
        vars = {
                pageTrackingElemId: "yl_agency_dynamic_tracking",
                offerBarClass: ".js-notification-bar"
        };
        
        function addStyle(elem) {
            elem.display = "none";
        }

        function addAttributes(elem, attrs) {
            Object.keys(attrs).map(function (key) {
                elem.setAttribute(key, attrs[key]);
            });
        }

        function insertIntoFooter(elem) {
            document.querySelector("footer").insertAdjacentElement("beforeend", elem);
        }

        function createTrackingContainer(attrKey = null, attrVal = null) {
            attrs[attrKey] = attrVal;
            var div = document.createElement("div");
            addStyle(div);
            addAttributes(div, attrs);
            insertIntoFooter(div);
        }

        document.addEventListener("DOMContentLoaded", function () {
            
            offerTimeDefault = OFFER_DELAY; // Minutes to show up
            pageTrackingIds = PAGE_TRACKING_IDS;
            attrs = {
                "class": "js_kartra_trackable_object",
                "data-kt-type": "page_tracking",
                "data-kt-owner": OWNER_ID,
            };
            customInterval = typeof CUSTOM_INTERVAL !== "undefined" ? CUSTOM_INTERVAL : 10; // If inexistent, then its value is 10 by default
            meetingStartsAt = document.cookie // Meeting time
                .split("; ")
                .find(row => row.startsWith("meetingStartsAt="))
                .replace(/meetingStartsAt=/, "");

            arrivingTime = new Date(); // User arriving time to the room
            hoursDiff = (arrivingTime.getHours() - new Date(+meetingStartsAt * 1000).getHours()) * 60;
            minutesDiff = hoursDiff + (arrivingTime.getMinutes() - new Date(+meetingStartsAt * 1000).getMinutes());

            // Calculate time in minutes for offer to show up if user gets connected later
            offerTimeWillShowUpIn = offerTimeDefault;
            if (minutesDiff > 1) {
                offerTimeWillShowUpIn = offerTimeDefault - minutesDiff;
            }
            
            document.querySelector(vars.offerBarClass).dataset.delayDuration = offerTimeWillShowUpIn * 60; // Update offer delay
            document.querySelector(vars.offerBarClass).dataset.delayReocur = "every";

            console.log("Offer will show up in " + offerTimeWillShowUpIn + " minutes");

            setTimeout(function () {
                // Remove custom style for notification bar with the offer CTA
                document.getElementById("yl-agency-style").remove();

                // Track offer apparition
                createTrackingContainer("data-kt-value", pageTrackingIds.offerShowsUp);
            }, offerTimeWillShowUpIn * 60 * 1000);

            console.log("User arrived " + minutesDiff + " minutes late");

            document.querySelector(`${vars.offerBarClass} [data-component="button"] a.kartra_button1`).addEventListener("click", onClickOfferBtn);

            function onClickOfferBtn () {              
                createTrackingContainer("data-kt-value", pageTrackingIds.interactedWithCTAOffer);
            }

            var counter;
            if (minutesDiff < customInterval) {
                counter = 0;
            } else if (minutesDiff > customInterval && minutesDiff < customInterval * 2) {
                counter = customInterval;
            } else if (minutesDiff > customInterval * 2 && minutesDiff < customInterval * 3) {
                counter = customInterval * 2;
            } else if (minutesDiff > customInterval * 3 && minutesDiff < customInterval * 4) {
                counter = customInterval * 3;
            } else if (minutesDiff > customInterval * 4 && minutesDiff < customInterval * 5) {
                counter = customInterval * 4;
            } else if (minutesDiff > customInterval * 5 && minutesDiff < customInterval * 6) {
                counter = customInterval * 5;
            } else if (minutesDiff > customInterval * 6 && minutesDiff < customInterval * 7) {
                counter = customInterval * 6;
            } else if (minutesDiff > customInterval * 7 && minutesDiff < customInterval * 8) {
                counter = customInterval * 7;
            } else if (minutesDiff > customInterval * 8 && minutesDiff < customInterval * 9) {
                counter = customInterval * 8;
            } else if (minutesDiff > customInterval * 9 && minutesDiff < customInterval * 10) {
                counter = customInterval * 9;
            } else if (minutesDiff > customInterval * 10 && minutesDiff < customInterval * 11) {
                counter = customInterval * 10;
            }
            localStorage.setItem("counter", counter);
        });

        function stopTagGeneration() {
            clearInterval(intervalId);
            localStorage.removeItem("counter");
        }

        window.onload = function () {
            divElement = document.createElement("div");
            divElement.id = vars.pageTrackingElemId;
            addStyle(divElement);
            addAttributes(divElement, attrs);
            insertIntoFooter(divElement);
        };

        function myCallback() {
            if (!window.location.href.match(/meeting/)) {
                stopTagGeneration();
                return;
            }

            window.onbeforeunload = function(){
                stopTagGeneration();
            }       

            localStorage.setItem("counter", +localStorage.getItem("counter") + customInterval);
            timeRemained = +localStorage.getItem("counter");

            if (timeRemained === customInterval) {
                ktValue = pageTrackingIds.presentDuringFirstPart;
            } else if (timeRemained === customInterval * 2) {
                ktValue = pageTrackingIds.presentDuringSecondPart;
            } else if (timeRemained === customInterval * 3) {
                ktValue = pageTrackingIds.presentDuringThirdPart;
            } else if (timeRemained === customInterval * 4) {
                ktValue = pageTrackingIds.presentDuringFourthPart;
            } else if (timeRemained === customInterval * 5) {
                ktValue = pageTrackingIds.presentDuringFifthPart;
            } else if (timeRemained === customInterval * 6) {
                ktValue = pageTrackingIds.presentDuringSixthPart;
            } else if (timeRemained === customInterval * 7) {
                ktValue = pageTrackingIds.presentDuringSeventhPart;
            } else if (timeRemained === customInterval * 8) {
                ktValue = pageTrackingIds.presentDuringEighthPart;
            } else if (timeRemained === customInterval * 9) {
                ktValue = pageTrackingIds.presentDuringNinthParte;
            } else if (timeRemained === customInterval * 10) {
                ktValue = pageTrackingIds.presentDuringTenthPart;
                localStorage.removeItem("counter");
                stopTagGeneration();
            } else {
                stopTagGeneration();
                return;
            }
            
            document.getElementById(vars.pageTrackingElemId).setAttribute("data-kt-value", ktValue);
            console.log(`${timeRemained} min of meeting`);
        }
        
        /********* End of Yurniel Lahera Agency **********/

        if (typeof window['kartra_tracking_loaded'] == "undefined") {
            window['kartra_tracking_loaded'] = true;
            window['processed_assets'] = [];

            if (window.addEventListener) {
                window.addEventListener('DOMContentLoaded', function() {init_kartra_tracking();}, false);
            } else {
                window.attachEvent('DOMContentLoaded', function() {init_kartra_tracking();});
            }

            function inIframe () {
                try {
                    return window.self !== window.top;
                } catch (e) {
                    return true;
                }
            }

            // check if we need to track the analytics
            function track_analytics() {
                if (inIframe()) {
                    try {
                        var url = window.top.location.href;
                    } catch (e) {
                        var url = '';
                    }
                } else {
                    var url = window.location.href;
                }

                var excluded_locations = [
                    'pages/sites/',
                    'membership/edit', 
                    '/load_template_for_screenshot/', 
                    'load_form_for_screenshot/', 
                    'forms/edit/'
                ];
                var ok = true;

                if (url) {
                    excluded_locations.forEach(function (value) {
                        if (url.indexOf(value) !== -1) {
                            ok = false;
                        }
                    });
                }
                return ok;
            }

            function init_kartra_tracking() {
                createTrackingContainer("data-kt-value", pageTrackingIds.enteredConferenceRoom);
                intervalId = setInterval(load_tracking, 1000  * 60 * customInterval); // Generate tag every 10 minutes: 1000 ms * 60 sec * 10 min
            }

            function load_tracking(container) {
                myCallback();

                if (typeof container === 'undefined') {
                    var kartra_trackable_elements = document.getElementsByClassName("js_kartra_trackable_object");
                } else {
                    var kartra_trackable_elements = container.getElementsByClassName("js_kartra_trackable_object");
                }

                var vendors = {};

                if (kartra_trackable_elements.length > 0 && track_analytics()) {
                    for (i = 0; i < kartra_trackable_elements.length; i++) {

                        /* Attribute not present move to next element */
                        if (kartra_trackable_elements[i].getAttribute('data-kt-type') == null ||
                            kartra_trackable_elements[i].getAttribute('data-kt-value') == null ||
                            kartra_trackable_elements[i].getAttribute('data-kt-type') == '' ||
                            kartra_trackable_elements[i].getAttribute('data-kt-value') == '') {
                            continue;
                        }

                        var parent_wrapper = ( typeof container === 'undefined' ? true : false ) && someParentHasTheClass(kartra_trackable_elements[i], 'js_trackable_wrapper');

                        if (parent_wrapper) {
                            parent_wrapper.addEventListener('kartra_show_hidden_asset', handle_show_hidden_asset, false);
                        } else {
                            var value = kartra_trackable_elements[i].getAttribute('data-kt-value');
                            var type = kartra_trackable_elements[i].getAttribute('data-kt-type');

                            if (window['processed_assets'].indexOf(value) !== -1) {
                                continue;
                            }

                            window['processed_assets'].push(type + '|' +value);
                            var the_trackable = 'kartra_trackable_items_' + kartra_trackable_elements[i].getAttribute('data-kt-owner');



                            if (typeof window[the_trackable] == "undefined") {
                                window[the_trackable] = {};
                            }

                            if (typeof window[the_trackable][type] == "undefined") {
                                window[the_trackable][type] = [];
                            }

                            if (window[the_trackable][type].indexOf(value) == -1) {
                                window[the_trackable][type].push(value);
                            }
                            if (typeof vendors[kartra_trackable_elements[i].getAttribute('data-kt-owner')] == "undefined") {
                                vendors[kartra_trackable_elements[i].getAttribute('data-kt-owner')] = [];
                            }
                            vendors[kartra_trackable_elements[i].getAttribute('data-kt-owner')] = window[the_trackable];
                        }
                    }

                    track(vendors);
                    window[the_trackable] = {};
                }
            }

            function track(vendors) {
                var links = [];
                for (var key in vendors) {
                    a = 'https://app.kartra.com/analytics/track/'+key+'?';
                    a += Object.keys(vendors[key]).map(function(k) {
                        if (vendors[key][k].length > 1) {
                            var element = [];
                            vendors[key][k].forEach(function(tracking_element) {
                                element.push(encodeURIComponent(k) + '[]=' + encodeURIComponent(tracking_element));
                            });
                            return element.join('&').trim('&');
                        } else {
                            return encodeURIComponent(k) + '[]=' + encodeURIComponent(vendors[key][k])
                        }

                    }).join('&');

                    // add the device
                    a += '&device=' + get_device_for_tracking();
                    links.push(a);
                }

                var timeout = 0;
                if (inIframe()) {
                    timeout = 1000;
                }
                setTimeout(function() {
                    for (var key_link in links) {
                        var img = document.createElement("img");
                        img.width = 1;
                        img.height = 1;
                        img.src = links[key_link];
                    }
                }, timeout);
            }

            function someParentHasTheClass(element, classname) {
                if (element.className && element.className.split(' ').indexOf(classname)>=0) {
                    return element;
                }

                return element.parentNode && someParentHasTheClass(element.parentNode, classname);
            }

            function handle_show_hidden_asset() {
                load_tracking(this);
            }

            function get_device_for_tracking() {
                if (document.documentElement.clientWidth < 767) {
                    deviceType = 'mobile';
                } else if (document.documentElement.clientWidth < 1024) {
                    deviceType = 'tablet';
                } else {
                    deviceType = 'desktop';
                }
                return deviceType;
            }
        }
