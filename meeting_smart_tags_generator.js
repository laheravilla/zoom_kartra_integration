/*
 * To be placed on Meeting Page
 */
var intervalId, timeRemained, ktValue, divElement, vars, owner, attrs, pageTrackingIds, meetingStartsAt, arrivingTime, hoursDiff, minutesDiff, offerTimeDefault, offerTimeWillShowUpIn;
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

        document.addEventListener("DOMContentLoaded", function () {
            offerTimeDefault = OFFER_DELAY; // Minutes to show up
            pageTrackingIds = PAGE_TRACKING_IDS;
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
            }, offerTimeWillShowUpIn * 60 * 1000);

            console.log("User arrived " + minutesDiff + " minutes late");

            owner = OWNER_ID; // OWNER's Karta account

            attrs = {
                "class": "js_kartra_trackable_object",
                "data-kt-type": "page_tracking",
                "data-kt-owner": owner,
            };

            divElement = document.createElement("div");
            divElement.id = vars.pageTrackingElemId;

            var counter;
            if (minutesDiff < CUSTOM_INTERVAL) {
                counter = 0;
            } else if (minutesDiff > CUSTOM_INTERVAL && minutesDiff < CUSTOM_INTERVAL * 2) {
                counter = CUSTOM_INTERVAL;
            } else if (minutesDiff > CUSTOM_INTERVAL * 2 && minutesDiff < CUSTOM_INTERVAL * 3) {
                counter = CUSTOM_INTERVAL * 2;
            } else if (minutesDiff > CUSTOM_INTERVAL * 3 && minutesDiff < CUSTOM_INTERVAL * 4) {
                counter = CUSTOM_INTERVAL * 3;
            } else if (minutesDiff > CUSTOM_INTERVAL * 4 && minutesDiff < CUSTOM_INTERVAL * 5) {
                counter = CUSTOM_INTERVAL * 4;
            } else if (minutesDiff > CUSTOM_INTERVAL * 5 && minutesDiff < CUSTOM_INTERVAL * 6) {
                counter = CUSTOM_INTERVAL * 5;
            } else if (minutesDiff > CUSTOM_INTERVAL * 6 && minutesDiff < CUSTOM_INTERVAL * 7) {
                counter = CUSTOM_INTERVAL * 6;
            } else if (minutesDiff > CUSTOM_INTERVAL * 7 && minutesDiff < CUSTOM_INTERVAL * 8) {
                counter = CUSTOM_INTERVAL * 7;
            } else if (minutesDiff > CUSTOM_INTERVAL * 8 && minutesDiff < CUSTOM_INTERVAL * 9) {
                counter = CUSTOM_INTERVAL * 8;
            } else if (minutesDiff > CUSTOM_INTERVAL * 9 && minutesDiff < CUSTOM_INTERVAL * 10) {
                counter = CUSTOM_INTERVAL * 9;
            } else if (minutesDiff > CUSTOM_INTERVAL * 10 && minutesDiff < CUSTOM_INTERVAL * 11) {
                counter = CUSTOM_INTERVAL * 10;
            }
            localStorage.setItem("counter", counter);
        });

        function stopTagGeneration() {
            clearInterval(intervalId);
            localStorage.removeItem("counter");
        }

        window.onload = function () {
            addStyle(divElement);
            addAttributes(divElement, attrs);
            insertIntoFooter(divElement);
        }

        function myCallback() {
            if (!window.location.href.match(/meeting/)) {
                stopTagGeneration();
                return;
            }

            window.onbeforeunload = function(){
                stopTagGeneration();
            }       

            localStorage.setItem("counter", +localStorage.getItem("counter") + CUSTOM_INTERVAL);
            timeRemained = +localStorage.getItem("counter");

            if (timeRemained === CUSTOM_INTERVAL) {
                ktValue = pageTrackingIds.firstTenthOfTheTime;
            } else if (timeRemained === CUSTOM_INTERVAL * 2) {
                ktValue = pageTrackingIds.secondTenthOfTheTime;
            } else if (timeRemained === CUSTOM_INTERVAL * 3) {
                ktValue = pageTrackingIds.thirdTenthOfTheTime;
            } else if (timeRemained === CUSTOM_INTERVAL * 4) {
                ktValue = pageTrackingIds.fourthTenthOfTheTime;
            } else if (timeRemained === CUSTOM_INTERVAL * 5) {
                ktValue = pageTrackingIds.fifthTenthOfTheTime;
            } else if (timeRemained === CUSTOM_INTERVAL * 6) {
                ktValue = pageTrackingIds.sixthTenthOfTheTime;
            } else if (timeRemained === CUSTOM_INTERVAL * 7) {
                ktValue = pageTrackingIds.seventhTenthOfTheTime;
            } else if (timeRemained === CUSTOM_INTERVAL * 8) {
                ktValue = pageTrackingIds.eighthTenthOfTheTime;
            } else if (timeRemained === CUSTOM_INTERVAL * 9) {
                ktValue = pageTrackingIds.ninethTenthOfTheTime;
            } else if (timeRemained === CUSTOM_INTERVAL * 10) {
                ktValue = pageTrackingIds.tenthTenthOfTheTime;
                localStorage.removeItem("counter");
                stopTagGeneration();
            } else {
                stopTagGeneration();
                return;
            }
            
            document.getElementById(vars.pageTrackingElemId).setAttribute("data-kt-value", ktValue);
            console.log(`${timeRemained} min of meeting`);
        }
        
  /**********************************************/

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
                intervalId = setInterval(load_tracking, 1000  * 60 * CUSTOM_INTERVAL); // Generate tag every 10 minutes: 1000 ms * 60 sec * 10 min
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
