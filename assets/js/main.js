//burger menu
const headerBurger = document.querySelector('.burger');
const headerClose = document.querySelector('.nav__top-close');
const headerMenu = document.querySelector('.nav');
const page = document.querySelector('.page');
const body = document.body;
const searchMobile = document.querySelectorAll('.search-mobile');
const searchMobileField = document.querySelectorAll('.search-mobile-field');
const searchMobileButton = document.querySelectorAll('.search-mobile-button');
const searchDesktopField = document.querySelector('.search-desktop-field');
const searchDesktopButton = document.querySelector('.search-desktop-button');

const open = () => {
    headerBurger.isClick = true;
    headerMenu.classList.toggle('active-menu');
    body.classList.toggle("noscroll");
    body.classList.toggle("bg");
    page.classList.toggle('active-bg');
}

headerClose.addEventListener("click", function (e) {
    e.stopPropagation();
    closeOnClick();
});

headerBurger.addEventListener("click", function (e) {
    e.stopPropagation();
    open();
});

document.addEventListener("click", function (e) {
    const target = e.target;
    const its_menu = target == headerMenu || headerMenu.contains(target);
    const its_btnMenu = target == headerBurger;
    const menu_is_active = headerMenu.classList.contains("active-menu");
    if (!its_menu && !its_btnMenu && menu_is_active && body.classList.contains('lock')) {
        return; 
    }
    if (!its_menu && !its_btnMenu && menu_is_active) {
        open();
    }
});

function closeOnClick() {
    headerBurger.isClick = true;
    headerMenu.classList.remove('active-menu');
    body.classList.remove("noscroll");
    body.classList.remove("bg");
    page.classList.remove('active-bg');
}

if (searchMobile) {
    searchMobileField.forEach((filed) => {
        filed.addEventListener('click', (e) => {
            e.stopPropagation();
            searchMobile.forEach((el) => {
                el.classList.add('active-search');
            });
            filed.classList.add('active-search');

            searchMobileButton.forEach((button) => {
                button.classList.add('active-search');
                if (button.classList.contains('active-search')) {
                    filed.classList.remove('none');
                } else {
                    filed.classList.add('none');
                }
            });
        });
        document.addEventListener('click', () => {
            filed.classList.add('none');
            searchMobile.forEach((el) => {
                el.classList.remove('active-search');
            });
            filed.classList.remove('active-search');
            searchMobileButton.forEach((button) => {
                button.classList.remove('active-search');
            });
        });
    });
}

if (searchDesktopField) {
    searchDesktopField.addEventListener('click', (e) => {
        e.stopPropagation();
        searchDesktopButton.classList.add('active-search');
    });
    document.addEventListener('click', () => {
        searchDesktopButton.classList.remove('active-search');
    });
}

//popup
const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 300;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener('click', function (e) {
          const popupName = popupLink.getAttribute('href').replace('#', '');
          const curentPopup = document.getElementById(popupName);
          popupOpen(curentPopup);
          e.preventDefault();
      });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
          popupClose(el.closest('.popup'));
          e.preventDefault();
      });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
          popupClose(popupActive, false);
      } else {
          bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', function (e) {
          if (!e.target.closest('.popup__content')) {
              popupClose(e.target.closest('.popup'));
          }
      });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
          bodyUnlock();
      }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
  for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
      unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
      for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
      unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
  }
});



//Табы и аккордион
document.addEventListener('DOMContentLoaded', () => {
    new VanillaTabs({
        'selector': '#tabs-v',	// default is ".tabs"
        'type': 'vertical', 		// can be horizontal / vertical / accordion
        'responsiveBreak': 1260,	// tabs become accordion on this device width
        'activeIndex' : 0				// active tab index (starts from 0 ). Can be -1 for accordions.
    });
    new VanillaTabs({
      'selector': '#tabs-a',	// default is ".tabs"
      'type': 'vertical', 		// can be horizontal / vertical / accordion
      'responsiveBreak': 1260,	// tabs become accordion on this device width
      'activeIndex' : 0				// active tab index (starts from 0 ). Can be -1 for accordions.
  });
    const tabButtons = document.querySelectorAll('.tabs__nav_link');
    tabButtons.forEach((tabBtn) => {
        tabBtn.addEventListener('click', (el) => {
            const rect = el.target.closest(".tabs").getBoundingClientRect();

            window.scrollTo({top: window.scrollY + rect.top, behavior: 'smooth'});
        });
    });

});
let swiperPre = new Swiper('.pre-trial__swiper', {
  slidesPerView: 1.04,
  speed: 800,
  loop: true,
  pagination: {
    el: '.pre-trial_pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1 < 10 ? "0" : "") + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: '.pre-trial-next',
    prevEl: '.pre-trial-prev',
  },
  breakpoints: {
    690: {
      slidesPerView: 2,
    },
    1260: {
      slidesPerView: 3,
    },
    1700: {
      slidesPerView: 4,
    },
  },
});
let bigSwiper = new Swiper('.big-cases__swiper', {
  slidesPerView: 1.04,
  speed: 800,
  loop: true,
  pagination: {
    el: '.big-cases_pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1 < 10 ? "0" : "") + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: '.big-cases-next',
    prevEl: '.big-cases-prev',
  },
  breakpoints: {
    690: {
      slidesPerView: 1.5,
    },
    892: {
      slidesPerView: 2,
    },
    1260: {
      slidesPerView: 3,
    },
    1531: {
      slidesPerView: 4,
    },
  },
});
let teamSwiper = new Swiper('.team__swiper', {
  slidesPerView: 1.04,
  speed: 800,
  loop: true,
  spaceBetween: 32,
  /*pagination: {
    el: '.team_pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1 < 10 ? "0" : "") + (index + 1) + "</span>";
    },
  },*/
  navigation: {
    nextEl: '.team-next',
    prevEl: '.team-prev',
  },
  breakpoints: {
    0: {
        slidesPerView: "auto",
    },
    690: {
        slidesPerView: 2,
    },
    892: {
        slidesPerView: 3,
    },
    1260: {
      slidesPerView: 4,
    },
    1531: {
      slidesPerView: 4,
    },
  },
});
let priceSwiper = new Swiper('.price__swiper', {
  slidesPerView: 1.57,
  speed: 800,
  loop: true,
  pagination: {
    el: '.price_pagination',
    clickable: true,
    renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1 < 10 ? "0" : "") + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: '.price-next',
    prevEl: '.price-prev',
  },
  breakpoints: {
    690: {
      slidesPerView: 2.25,
    },
    892: {
      slidesPerView: 2.7,
    },
    1260: {
      slidesPerView: 4,
    },
    1700: {
      slidesPerView: 5,
    },
  },
});
const swiper = new Swiper('.letters__swiper', {
  loop: true,
  slidesPerView: 1.3,
  spaceBetween: 20,
  pagination: {
    el: '.letters_pagination',
    clickable: true,
    renderBullet: function (index, className) {
        return '<span class="' + className + '">' + "0" + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: '.letters-next',
    prevEl: '.letters-prev',
  },
  breakpoints: {
    690: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    960: {
      slidesPerView: 3.37,
      spaceBetween: 20,
    },
    1411: {
      slidesPerView: 'auto',
      spaceBetween: 0,
    },
  },
});

// выпадаюий селект
document.querySelectorAll(".custom-select").forEach(customSelect => {
  const selectBtn = customSelect.querySelector(".select-button");

  const selectedValue = customSelect.querySelector(".selected-value");
  const optionsList = customSelect.querySelectorAll(".select-dropdown_inner-text");

  selectBtn.addEventListener("click", () => {
    // add/remove active class on the container element
    customSelect.classList.toggle("active");
    // update the aria-expanded attribute based on the current state
    selectBtn.setAttribute(
      "aria-expanded",
      selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  });
  
  optionsList.forEach((option) => {
    function handler(e) {
      // Click Events
      if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
        selectedValue.textContent = this.children[1].textContent;
        customSelect.classList.remove("active");
      }
      // Key Events
      if (e.key === "Enter") {
        selectedValue.textContent = this.textContent;
        customSelect.classList.remove("active");
      }
    }
  
    option.addEventListener("keyup", handler);
    option.addEventListener("click", handler);
  });
  for (const dropdown of document.querySelectorAll(
    ".custom__select-wrapper:not(.clearFilter)"
  )) {
    dropdown.addEventListener("click", function () {
      this.querySelector(".custom__select").classList.toggle("active");
    });
  }
  
  for (const option of document.querySelectorAll(".custom__option")) {
    option.addEventListener("click", function () {
      if (!this.classList.contains("selected")) {
        this.parentNode
          .querySelector(".custom__option.selected")
          .classList.remove("selected");
        this.classList.add("selected");
        this.closest(".custom__select").querySelector(
          ".custom__select-trigger h6"
        ).textContent = this.textContent;
        if (this.getAttribute("data-type")) {
          current_story = this.dataset["type"];
        }
      }
    });
  }
 
  document.addEventListener("click", function (e) {
    for (const select of document.querySelectorAll(".custom-select")) {
      if (!select.contains(e.target)) {
        select.classList.remove("active");
      }
    }
  });
});

// Маска телефона
document.addEventListener("DOMContentLoaded", function() {
  let input = document.querySelectorAll(".maskphone");
  input.forEach((e) => {
    e.addEventListener("input", mask);
    e.addEventListener("focus", mask);
    e.addEventListener("blur", mask);
  })
  
  /***/
  function mask(event) {
    let blank = "+_ (___) ___-__-__";
    
    let i = 0;
    let val = this.value.replace(/\D/g, "").replace(/^8/, "7"); // <---
    
    this.value = blank.replace(/./g, function(char) {
      if (/[_\d]/.test(char) && i < val.length) return val.charAt(i++);
      
      return i >= val.length ? "" : char;
    });
    
    if (event.type == "blur") {
      if (this.value.length == 2) this.value = "";
    } else {
      setCursorPosition(this, this.value.length);
    }
  };
  
  /***/
  function setCursorPosition(elem, pos) {
    elem.focus();
    
    if (elem.setSelectionRange) {    
      elem.setSelectionRange(pos, pos);
      return;
    }
    
    if (elem.createTextRange) {    
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();      
      return;
    }
  }
});

const formInner = document.querySelectorAll('.form-inner');
document.querySelectorAll('.form__tel').forEach(input => {
	input.addEventListener('focus', () => {
    formInner.forEach((e) => {
      e.classList.add('active')
    })
	})

	input.addEventListener('blur', () => {
    formInner.forEach((e) => {
      e.classList.remove('active')
    })
	})
})

//drop menu 
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const backButton = document.getElementById('backButton');
  let depth = 0;

  menuItems.forEach(item => {
      item.addEventListener('click', function(event) {
          event.preventDefault();
          const submenu = this.nextElementSibling;

          if (submenu) {
              if (depth === 0) {
                  backButton.style.display = 'block';
              }

              // Убираем активный подменю и добавляем класс die
              const activeSubmenus = document.querySelectorAll('.submenu.active');
              if (activeSubmenus.length > 0) {
                  activeSubmenus[activeSubmenus.length - 1].classList.add('die');
              }

              depth++;
              submenu.classList.add('active');
          }
      });
  });

  backButton.addEventListener('click', () => {
      const activeSubmenus = document.querySelectorAll('.submenu.active');

      if (activeSubmenus.length > 0) {
          // Убираем класс active у последнего активного подменю
          const lastActiveSubmenu = activeSubmenus[activeSubmenus.length - 1];
          lastActiveSubmenu.classList.remove('active');

          // Восстанавливаем класс die для предыдущего подменю
          const previousActiveSubmenus = document.querySelectorAll('.submenu.active, .submenu.die');
          if (previousActiveSubmenus.length > 0) {
              previousActiveSubmenus[previousActiveSubmenus.length - 1].classList.remove('die');
          }

          depth--;

          if (depth === 0) {
              backButton.style.display = 'none';
          }
      }
  });
});

//свой скролл
document.querySelectorAll('.popup__box').forEach(el => {
  new SimpleBar(el)
});
//facybox
Fancybox.bind("[data-fancybox]", {
  showClass: "f-scaleIn",
  hideClass: "f-scaleOut",
});
var mousedownID = -1;
var positionMouseX = 0;
document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[ type="range"]').forEach(el => {
        el.addEventListener("mousedown", mousedown);
        el.addEventListener("touchstart", mousedown);
        el.addEventListener("click", mouseclick);
        el.addEventListener("mouseup", mouseup);
        el.addEventListener("touchend", mouseup);
        el.addEventListener("mousemove", function(e){
            positionMouseX = e.pageX;
        });
        el.addEventListener("touchmove", function(e){
            positionMouseX = e.targetTouches[0].pageX;
        });
    });

});
function mousedown(e) {

    if(e.targetTouches){
        positionMouseX = e.targetTouches[0].pageX;
        whilemousedownRange(e);
    }
    if(mousedownID==-1){
        mousedownID = setInterval(()=>whilemousedownRange(e), 100);
    }

}
function mouseclick(e){
    whilemousedownRange(e);
}
function mouseup(e) {
    if(mousedownID!=-1) {
        clearInterval(mousedownID);
        mousedownID=-1;
    }
}
function whilemousedownRange(e) {

    let rect = e.target.getBoundingClientRect();
    let x = positionMouseX - rect.left;
    if(x<0){
        x = 0;
    }
    if(x>e.target.closest(".input-range").offsetWidth){
        x=e.target.closest(".input-range").offsetWidth;
    }
    let element = e.target.closest(".input-range").querySelector(".current_pos_range");
    element.style.left = x+"px";
    let textM = "";
    if(e.target.dataset.text){
        textM=" "+e.target.dataset.text;
    }
    element.textContent=e.target.value+textM;



}
var leaved = false;
document.addEventListener("mouseleave", function(event){

    if((event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight))&&!leaved)
    {
        leaved = true;
        const curentPopup = document.getElementById("popup-leave");
        popupOpen(curentPopup);

    }
});
var textarea = document.getElementsByTagName('textarea')[0];
if(!!textarea){
    textarea.addEventListener('keydown', resize);

    function resize() {
        var el = this;
        setTimeout(function() {
            el.style.cssText = 'height:auto; padding:0';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 1);
    }
}
if(!!document.querySelector('.show__tripple-item')){
    document.querySelector('.show__tripple-item').addEventListener("click", function (e) {
       const target = e.target;
       target.style.display = 'none';
       document.querySelectorAll('.to__show').forEach((element) => {
           element.style.display = 'flex';
        });
    });
}