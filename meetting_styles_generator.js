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


/* Function to add style element */
function addStyle(styles) {
  /* Create style document */
  var css = document.createElement('style');
  css.type = 'text/css';
  css.id = "yl-agency-style";

  if (css.styleSheet) 
      css.styleSheet.cssText = styles;
  else 
      css.appendChild(document.createTextNode(styles));

  /* Append style to the tag name */
  document.getElementsByTagName("head")[0].appendChild(css);
}

/* Set the style */
var styles = '.js-notification-bar {display: none!important}';

/* Function call */
window.onload = function() { addStyle(styles) }()
