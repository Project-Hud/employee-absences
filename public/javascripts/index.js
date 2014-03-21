(function () {



numberOfSlides = $('.slider--slide').length


sliderWidth = 300
currentSlide = 0

containerWidth = sliderWidth * numberOfSlides

numberOfDays = 1 + Math.floor(Math.random() * 6)

$('.slider-container').css("width", containerWidth)



function slideTo(num){
  $('.slider-container').animate({left: -(sliderWidth * num / 2)})
  currentSlide = num
}

for (var i = 0; i < numberOfSlides; i++) {
  $('.controls').append('<li></li>')

}

$('.days-left').text(numberOfDays)

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

function changeOpacity(){
  $('.title__holiday').animate({opacity: 1})
}

setInterval(function (){
  slideNext()
}, 5000)

})()
