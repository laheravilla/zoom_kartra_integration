/*
 * To be placed on Meeting Page's head 
*/
let links = [
            "https://source.zoom.us/1.9.1/css/bootstrap.css",
            "https://source.zoom.us/1.9.1/css/react-select.css"
        ];

        function createLinkElement(href) {
            const link = document.createElement("link");
            link.type = "text/css";
            link.setAttribute("rel", "stylesheet");
            link.href = href;
            return link;
        }

        function insertLinkIntoHead(element) {
            document.querySelector("head").insertAdjacentElement("beforeend", element);
        }

        links.forEach(function (value) {
            insertLinkIntoHead(createLinkElement(value));
        });
