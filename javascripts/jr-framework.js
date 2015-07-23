//this makes the function a jQuery plugin
$.fn.tooltip = function(text){

  //just declaring the local variables I will use
  var $selection, top, left, $box;

  //inside a jquery plugin, this is the jquery selection
  $selection = this;

  top    = $selection.position().top;
  left   = $selection.position().left;

  $box = $('<div></div>');
  $box.text(text);

  //this line is what makes this part of the framework.
  //Without the styling provided in the "components" file of the
  //Sass framework, the box will not have the proper styles
  $box.addClass('jr-tooltip');

  //This part of the css we have to set dynamically with jQuery,
  //because we want the tooltip to appear relative to the element
  //it is attached to
  $box.css('top', top);
  $box.css('left', left + 100 + 'px');

  //this will be called when the element is hovered over
  //and attach the tooltip to the page.  We hide the box
  //before it is attached to the page just so we can give
  //it a nice animation into view after attaching it.
  function enter(){
    $box.hide().appendTo('body').fadeIn();
  }

  //this function will be called when the user stops hovering over
  //the element with the tooltip attached to it
  function leave(){
    $box.remove();
  }

  //set up the above two functions to work on/off hover
  $selection.hover(enter, leave);

  //return this, so that users of our jQuery plugin can chain other
  //jQuery functions onto it, as they expect to be able to do.
  return this;
}
