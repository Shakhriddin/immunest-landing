import './model-viewer';
import { translate } from './translate';

window.addEventListener('DOMContentLoaded', () => {
  function addActiveClass(element) {
    element.classList.add('--active');
  }
  function removeActiveClass(element) {
    element.classList.remove('--active');
  }
  const body = document.querySelector('body');
  const wrapper = document.querySelector('.wrapper');
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.transform = 'scale(2.5)';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 1000);
    body.classList.remove('--lock');
    const showItems = document.querySelectorAll('.--show-items');
    if (showItems.length > 0) {
      for (let index = 0; index < showItems.length; index++) {
        const showItem = showItems[index];
        if (!showItem.classList.contains('--active')) {
          showItem.classList.add('--active');
        }
      }
    }
  }, 1500);

  const languageBtn = document.querySelector('.menu__language-btn');
  const languageDropdown = document.querySelector('.menu__dropdown');
  const languageItems = document.querySelectorAll('.menu__dropdown-item');
  const allLanguages = ['en', 'ru', 'uz'];
  languageBtn.addEventListener('click', function () {
    languageBtn.classList.toggle('--active');
    languageDropdown.classList.toggle('--active');
    window.addEventListener('click', function (e) {
      if (
        !e.target.closest('.menu__language-btn') &&
        !e.target.closest('.menu__dropdown')
      ) {
        removeActiveClass(languageBtn);
        removeActiveClass(languageDropdown);
      }
    });
  });
  if (languageItems.length > 0) {
    for (let i = 0; i < languageItems.length; i++) {
      const languageItem = languageItems[i];
      languageItem.addEventListener('click', changeURLLanguage);
      function changeURLLanguage() {
        const language = languageItem.textContent;
        location.href = window.location.pathname + '#' + language;
        location.reload();
      }
      function changeLanguage() {
        const hash = window.location.hash.substr(1);
        if (!allLanguages.includes(hash)) {
          location.href = window.location.pathname + '#uz';
          location.reload();
        }
        languageBtn.textContent = hash;
        if (languageItem.textContent == hash) {
          addActiveClass(languageItem);
        }
        document.querySelector('title').innerHTML = translate['title'][hash];
        document.getElementById('contact__error-1').classList.add('--' + hash);
        document.getElementById('contact__error-2').classList.add('--' + hash);
        document.getElementById('firstName').classList.add('--' + hash);
        if (document.getElementById('firstName').classList.contains('--ru')) {
          document
            .getElementById('firstName')
            .setAttribute('placeholder', 'Вашe Имя');
        } else if (
          document.getElementById('firstName').classList.contains('--en')
        ) {
          document
            .getElementById('firstName')
            .setAttribute('placeholder', 'Your Name');
        } else {
          document
            .getElementById('firstName')
            .setAttribute('placeholder', 'Ismingiz');
        }
        document.getElementById('message').classList.add('--' + hash);
        if (document.getElementById('message').classList.contains('--ru')) {
          document
            .getElementById('message')
            .setAttribute('placeholder', 'Оставьте свой комментарий');
        } else if (
          document.getElementById('firstName').classList.contains('--en')
        ) {
          document
            .getElementById('message')
            .setAttribute('placeholder', 'Enter comment here');
        } else {
          document
            .getElementById('message')
            .setAttribute('placeholder', 'Xabar kiritish');
        }
        for (let key in translate) {
          let element = document.querySelector('.--translate-' + key);
          if (element) {
            element.innerHTML = translate[key][hash];
          }
        }
      }
      changeLanguage();
    }
  }
  const header = document.querySelector('.header');
  const adviceSection = document.querySelector('.advice');
  const aboutSection = document.querySelector('.about');
  const instructionSection = document.querySelector('.instruction');
  const decors = document.querySelectorAll('.--decor');
  decors.forEach((decor) => {
    window.addEventListener('scroll', function () {
      decor.classList.toggle('--fixed', window.scrollY > header.offsetHeight);
      body.classList.toggle(
        '--scroll-advice',
        window.scrollY > header.offsetHeight * 0.7
      );
      body.classList.toggle(
        '--scroll-about',
        window.scrollY > header.offsetHeight * 0.7 + adviceSection.offsetHeight
      );
      if (
        window.scrollY >
        header.offsetHeight * 0.5 +
          adviceSection.offsetHeight +
          aboutSection.offsetHeight
      ) {
        body.classList.remove('--scroll-about');
      }
      if (
        window.scrollY >
        header.offsetHeight * 0.5 +
          adviceSection.offsetHeight +
          aboutSection.offsetHeight +
          instructionSection.offsetHeight
      ) {
        body.classList.remove('--scroll-advice');
      }
    });
  });
  document
    .querySelector('.header__wave')
    .addEventListener('click', function (e) {
      window.scrollTo({
        top: header.offsetHeight,
        behavior: 'smooth',
      });
      e.preventDefault();
    });
  document
    .querySelector('.header-content__link')
    .addEventListener('click', function (e) {
      window.scrollTo({
        top: wrapper.offsetHeight,
        behavior: 'smooth',
      });
      e.preventDefault();
    });
  const shieldBtns = document.querySelectorAll('.--shield-btn');
  const shieldFrontface = document.querySelector('.shield__frontface');
  const shieldBackface = document.querySelector('.shield__backface');
  const shieldCloseBtn = document.querySelector('.shield__close-btn');
  const shieldTexts = document.querySelectorAll('.shield__text');
  if (shieldBtns.length > 0) {
    for (let i = 0; i < shieldBtns.length; i++) {
      const shieldBtn = shieldBtns[i];
      shieldBtn.addEventListener('click', function () {
        addActiveClass(shieldBtn);
        addActiveClass(shieldFrontface);
        addActiveClass(shieldBackface);
        addActiveClass(shieldTexts[i]);
        shieldCloseBtn.addEventListener('click', function () {
          removeActiveClass(shieldBtn);
          removeActiveClass(shieldFrontface);
          removeActiveClass(shieldBackface);
          removeActiveClass(shieldTexts[i]);
        });
      });
    }
  }
  const contactButton = document.querySelector('.form__button');
  contactButton.addEventListener('click', function () {
    clientName();
    clientNumber();
  });

  const form = document.querySelector('#form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstNameValue = document.getElementById('firstName').value;
    const phoneNumberValue = document.getElementById('phoneNumber').value;
    const messageValue = document.getElementById('message').value;
    const token = '1931913377:AAHr0g2ma0n7obZCUY6XLdm8OAzErp49FFQ';
    const chatID = -503440518;
    let message = `<b>IMMUNEST</b>  %0A<b>👤Ismi: </b> <i>${firstNameValue}</i>%0A  <b>📞Tel.raqami: </b><i>${phoneNumberValue}</i>%0A <b>✉️Text: </b> <i>${messageValue}</i>`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${message}&parse_mode=html`;
    let api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();

    if (
      document.getElementById('firstName').value.length >= 3 &&
      document.getElementById('phoneNumber').value.length == 13 &&
      document.getElementById('message').value.length > 0
    ) {
      document.querySelector('.contact__user-name').innerHTML =
        document.getElementById('firstName').value;
      document.querySelector('.contact__user-number').innerHTML =
        document.getElementById('phoneNumber').value;
      addActiveClass(document.querySelector('.contact__popup'));
      form.reset();
      document.getElementById('firstName').classList.remove('contact--valid');
      document.getElementById('phoneNumber').classList.remove('contact--valid');
      setTimeout(() => {
        removeActiveClass(document.querySelector('.contact__popup'));
      }, 5000);
    }
  });

  contactButton.addEventListener('mousedown', function () {
    contactButton.style.transform = 'scale(0.9)';
    contactButton.addEventListener('mouseup', function () {
      contactButton.style.transform = 'scale(1)';
    });
  });

  function clientName() {
    let firstName, message;
    let errElement = document.getElementById('firstName');
    message = document.getElementById('contact__error-1');
    firstName = document.getElementById('firstName').value;
    try {
      if (firstName == '') {
        errElement.classList.add('contact--error');
        errElement.classList.remove('contact--valid');
        throw '!';
      }
      if (firstName.length >= 3) {
        errElement.classList.remove('contact--error');
        errElement.classList.add('contact--valid');
        message.innerHTML = '';
      }
    } catch (e) {
      if (message.classList.contains('--ru')) {
        message.innerHTML = 'Введите свое имя' + e;
      } else if (message.classList.contains('--en')) {
        message.innerHTML = 'Enter your name' + e;
      } else {
        message.innerHTML = 'Ismingizni kiriting' + e;
      }
    }
  }
  function clientNumber() {
    let phoneNumber, message;
    let errElement = document.getElementById('phoneNumber');
    message = document.getElementById('contact__error-2');
    phoneNumber = document.getElementById('phoneNumber').value;
    try {
      if (phoneNumber == '') {
        errElement.classList.add('contact--error');
        errElement.classList.remove('contact--valid');
        throw '!';
      }

      if (phoneNumber.length == 13) {
        errElement.classList.remove('contact--error');
        errElement.classList.add('contact--valid');
        message.innerHTML = '';
      } else {
        if (message.classList.contains('--ru')) {
          message.innerHTML = 'Введите свой номер в виде +998 12 345 67 89!';
        } else if (message.classList.contains('--en')) {
          message.innerHTML = 'Enter your number as  +998 12 345 67 89!';
        } else {
          message.innerHTML =
            "Raqamingizni  +998 12 345 67 89 ko'rinishda kiriting!";
        }
        errElement.classList.add('contact--error');
        errElement.classList.remove('contact--valid');
      }
    } catch (e) {
      if (message.classList.contains('--ru')) {
        message.innerHTML = 'Введите свой номер' + e;
      } else if (message.classList.contains('--en')) {
        message.innerHTML = 'Enter your number' + e;
      } else {
        message.innerHTML = 'Raqamingizni  kiriting' + e;
      }
    }
  }
  function isValueName(evt) {
    let ch = String.fromCharCode(evt.which);
    if (/[0-9-+-@-!-_-#-$-%-^-&-*]/.test(ch) && !/[']/.test(ch)) {
      evt.preventDefault();
    }
  }
  function isValueNum(evt) {
    let ch = String.fromCharCode(evt.which);
    if (!/[0-9]/.test(ch)) {
      evt.preventDefault();
    }
  }
  document.getElementById('phoneNumber').addEventListener('keyup', function () {
    clientNumber();
  });
  document.getElementById('firstName').addEventListener('keyup', function () {
    clientName();
  });
  const animItems = document.querySelectorAll('.--anim-items');
  if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 6;
        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        if (
          pageYOffset > animItemOffset - animItemPoint &&
          pageYOffset < animItemOffset + animItemHeight
        ) {
          addActiveClass(animItem);
        } else {
          removeActiveClass(animItem);
        }
      }
      function offset(el) {
        const rect = el.getBoundingClientRect(),
          scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
      }
    }
    setTimeout(() => {
      animOnScroll();
    }, 400);
  }
  //lazy-loading
  const lazyImages = document.querySelectorAll(
    'img[data-src],source[data-srcset]'
  );
  const loadMapBlock = document.querySelector('.--load-map');
  const windowHeight = document.documentElement.clientHeight;
  const lazySpinners = document.querySelectorAll('.--lazy__spinner');

  let lazyImagesPositions = [];
  if (lazyImages.length > 0) {
    lazyImages.forEach((img) => {
      if (img.dataset.src || img.dataset.srcset) {
        lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
        lazyScrollCheck();
      }
    });
  }

  window.addEventListener('scroll', lazyScroll);
  function lazyScroll() {
    if (
      document.querySelectorAll('img[data-src],source[data-srcset]').length > 0
    ) {
      lazyScrollCheck();
    }
    if (!loadMapBlock.classList.contains('--loaded')) {
      getMap();
    }
  }

  function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(
      (item) => pageYOffset > item - windowHeight
    );
    if (imgIndex >= 0) {
      if (lazyImages[imgIndex].dataset.src) {
        lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
        lazyImages[imgIndex].removeAttribute('data-src');
      } else if (lazyImages[imgIndex].dataset.srcset) {
        lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
        lazyImages[imgIndex].removeAttribute('data-srcset');
      }
      delete lazyImagesPositions[imgIndex];
      if (
        document.querySelectorAll('img[data-src],source[data-srcset]').length >=
          32 &&
        document.querySelectorAll('img[data-src],source[data-srcset]').length <
          40
      ) {
        setTimeout(() => {
          lazySpinners[0].classList.add('--active');
        }, 2000);
      }
      if (
        document.querySelectorAll('img[data-src],source[data-srcset]').length >=
          24 &&
        document.querySelectorAll('img[data-src],source[data-srcset]').length <
          33
      ) {
        setTimeout(() => {
          lazySpinners[1].classList.add('--active');
        }, 2000);
      }
      if (
        document.querySelectorAll('img[data-src],source[data-srcset]').length >=
          14 &&
        document.querySelectorAll('img[data-src],source[data-srcset]').length <
          24
      ) {
        lazySpinners[2].classList.add('--active');
      }
    }
  }
  function getMap() {
    const loadMapBlockPosition =
      loadMapBlock.getBoundingClientRect().top + pageYOffset;
    if (pageYOffset > loadMapBlockPosition - windowHeight) {
      const loadMapURL = loadMapBlock.dataset.map;
      if (loadMapURL) {
        loadMapBlock.insertAdjacentHTML(
          'beforeend',
          `<iframe src="${loadMapURL}" allowfullscreen="" loading="lazy"><iframe/>`
        );
        loadMapBlock.classList.add('--loaded');
        addActiveClass(lazySpinners[6]);
      }
    }
  }
});
