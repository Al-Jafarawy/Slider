var sliderImages = Array.from(
  document.querySelectorAll('.slider-container img')
);
var numberOfImages = sliderImages.length;

var slide = 1;
var prevButton = document.getElementById('prev');
var nextButton = document.getElementById('next');
var slideNumber = document.getElementById('slider-number');

var numbaringUl = document.createElement('ul');
numbaringUl.setAttribute('id', 'numUl');

for (var i = 1; i <= numberOfImages; i++) {
  var numbaringli = document.createElement('li');
  numbaringli.setAttribute('data-num', i);
  numbaringli.appendChild(document.createTextNode(i));
  numbaringUl.appendChild(numbaringli);
}

var counter = document.getElementById('counter');
counter.appendChild(numbaringUl);

var remeActiveBullets = Array.from(document.querySelectorAll(' ul li'));
function remeActive() {
  sliderImages.forEach(function (img) {
    img.classList.remove('active');
  });
  remeActiveBullets.forEach(function (bultts) {
    bultts.classList.remove('active');
  });
}

for(var j = 0; j < remeActiveBullets.length; j++) {
  remeActiveBullets[j].onclick = function () {
    slide = parseInt(this.getAttribute('data-num'));
    checker();  
  };
}

prevButton.onclick = prevButtonOnClick;
nextButton.onclick = nextButtonOnClick;
function prevButtonOnClick() {
  if (slide === 1) {
    return false;
  } else {
    slide--;
    checker();
  }
}
function nextButtonOnClick() {
  if (slide === numberOfImages) {
    return false;
  } else {
    slide++;
    checker();
  }
}

function checker() {
  slideNumber.textContent = 'Slide #' + slide + ' of ' + numberOfImages;
  remeActive();
  sliderImages[slide - 1].classList.add('active');
  numbaringUl.children[slide - 1].classList.add('active');

  // disable prev or next
  if (slide === 1) {
    prevButton.classList.add('disable');
  } else {
    prevButton.classList.remove('disable');
  }

  if (slide === numberOfImages) {
    nextButton.classList.add('disable');
  } else {
    nextButton.classList.remove('disable');
  }
}



checker();
