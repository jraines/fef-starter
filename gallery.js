//The Gallery object knows how to accept an array of JSON objects
//representing outfits, and store a collection of our custom outfit
//objects. It knows how to render a subset of those, and to page through
//them
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


//this object represents a View of an outfit
//it knows how to render itself to the page,
//and how to set up click listeners on itself
function OutfitView(outfitModel){
  var model = outfitModel;
  var view = this;

  this.div = function(){
    $outfit = $('<div class="outfit"></div>');
    $outfit.css('background-image', 'url(' + model.image_url + ')');
    $outfit.hide();
    return $outfit
  }

  this.setUpClick = function($div){
    $div.on('click', function() {
      imgUrl = model.image_url;

      //TODO this could also be extracted into its own view object
      $bigOutfitView = $('<div class="big-outfit"></div>');
      $bigOutfitView.css('background-image', 'url(' + model.image_url + ')');

      $mask = $('body').append('<div class="mask"></div>');
      $('.mask').append($bigOutfitView);

      $('.mask').on('click', function(){
        $('.big-outfit').remove();
        $('.mask').remove();
      });

    });
  }

  this.render = function(){
    $outfitView = this.div();
    $('#outfits').append($outfitView);
    this.setUpClick($outfitView);
    $outfitView.fadeIn();
  }
}

//this is the outfit "model"
function Outfit(data) {
  this.image_url = data.large_image_url;

  this.render = function(){
    new OutfitView(this).render();
  }
}


$(document).ready(function() {
  gallery = new Gallery(api_outfits);
  gallery.render();
});
