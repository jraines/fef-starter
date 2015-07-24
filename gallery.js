function Gallery(api_outfits) {
  this.outfits = _.map(api_outfits, function(o){
    return new Outfit(o);
  });

  this.render = function(){
    _.each(this.outfits, function(o) {
      o.render();
    });
  }
}

function Outfit(data) {
  this.image_url = data.large_image_url;

  this.render = function(){
    $outfitView = $('<div class="outfit"></div>');
    $outfitView.css('background-image', 'url(' + this.image_url + ')');
    $('#outfits').append($outfitView);
  }
}

gallery = new Gallery(api_outfits);

$(document).ready(function() {
  gallery.render();
});
