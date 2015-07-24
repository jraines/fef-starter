function Gallery(api_outfits) {
  this.outfits = _.map(api_outfits, function(o){
    return new Outfit(o);
  });

  var galleryInstance = this;

  this.setupNav = function(){
    $('#next').on('click', function(){
      galleryInstance.nextPage();
    });

    $('#prev').on('click', function(){
      galleryInstance.prevPage();
    });
  }
  this.setupNav();

  this.pageSize = 8;
  this.page = 0;

  this.currentPageOutfits = function(){
    var last = this.pageSize * (this.page + 1);
    var first = last - this.pageSize;

    return this.outfits.slice(first, last);
  }

  this.nextPage = function(){
    this.page++;
    this.render();
  }

  this.prevPage = function(){
    this.page--;
    this.render();
  }

  this.render = function(){
    $('#outfits').empty();
    _.each(this.currentPageOutfits(), function(o) {
      o.render();
    });
  }
}

function Outfit(data) {
  this.image_url = data.large_image_url;

  this.render = function(){
    $outfitView = $('<div class="outfit"></div>');
    $outfitView.css('background-image', 'url(' + this.image_url + ')');
    $outfitView.hide();
    $('#outfits').append($outfitView);
    $outfitView.fadeIn();
  }
}


$(document).ready(function() {
  gallery = new Gallery(api_outfits);
  gallery.render();
});
