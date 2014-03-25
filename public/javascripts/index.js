(function () {

var numberOfSlides = $('.slider--slide').length
  , sliderWidth = 300
  , currentSlide = 0
  , containerWidth = sliderWidth * numberOfSlides

function init() {
  $('.slider-container').css("width", containerWidth)

  for (var i = 0; i < numberOfSlides; i++) {
    $('.controls').append('<li></li>')

  }

  slideTo(0)

  setInterval(function (){
    slideNext()
  }, 5000)
}

function slideTo(num){
  $('.slider-container').animate({left: -(sliderWidth * num / 2)})
  $('.slider--slide.is-active').removeClass('is-active')
  $('.slider--slide:eq(' + num + ')').addClass('is-active')
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
