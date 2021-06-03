/*
 * To be placed on Meeting Page's head
*/
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
