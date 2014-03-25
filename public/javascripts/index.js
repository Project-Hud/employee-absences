(function () {

var numberOfSlides = $('.slider--slide').length
  , sliderWidth = 370
  , currentSlide = 0
  , containerWidth = sliderWidth * numberOfSlides
  , sliderContainer = $('.slider-container')

function init() {
  sliderContainer.css("width", containerWidth)

  for (var i = 0; i < numberOfSlides; i++) {
    $('.controls').append('<li class=\"slide-control\"></li>')

  }

  slideTo(0)

  setInterval(function (){
    slideNext()
  }, 5000)
}

function slideTo(num){
  sliderContainer.animate({left: -(sliderWidth * num )}, 700)
  $('.slider--slide.is-active').removeClass('is-active')
  $('.slider--slide:eq(' + num + ')').addClass('is-active')
  $('.slide-control.slide-is-active').removeClass('slide-is-active')
  $('.slide-control:eq(' + num + ')').addClass('slide-is-active')
  currentSlide = num
}

function slideNext(){
  if(currentSlide === (numberOfSlides - 1)) {
    slideTo(0)
  } else {
    slideTo(currentSlide + 1)

  }
}

function slidePrev(){
  slideTo(currentSlide - 1)
}

init()

})()
