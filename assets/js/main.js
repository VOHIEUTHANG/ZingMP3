const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// START HEADER 
const headerController = (function () {
    const app = $('#app');
    // THEME
    const closeBtn = $('.theme-close-btn');
    const overlay = $('.theme-modal-overlay');
    const themeBtn = $('.zm-theme');
    const themeModal = $('.theme-modal');
    // SETTING 
    const settingBtn = $('.zm-setting');
    const settingModal = $('.zm-setting-menu');

    return {
        themeSection: function () {
            themeBtn.onclick = function () {
                overlay.style.display = 'block';
            }
            closeBtn.onclick = function (e) {
                e.stopPropagation();
                overlay.style.display = 'none';
            }
            overlay.onclick = function (e) {
                e.stopPropagation();
                overlay.style.display = 'none';
            }
            themeModal.onclick = function (e) {
                e.stopPropagation();
            }
        },
        settingSection: function () {
            app.addEventListener('click', function () {
                if (settingBtn.classList.contains('active')) {
                    settingBtn.classList.remove('active');
                }
            });

            settingBtn.onclick = function (e) {
                e.stopPropagation();
                this.classList.toggle('active');
            };

            settingModal.onclick = function (e) {
                e.stopPropagation();
            }
        },
        run: function () {
            this.settingSection();
            this.themeSection();
        }
    }
})();
headerController.run();
//END HEADER
//----------------------------------------------------------------

// START GALLERY 
const galleryHandle = (function () {
    const nextBtn = $('.gallery-btn.next');
    const prevBtn = $('.gallery-btn.previous');

    //calculate width
    const gallery = $('.gallery');
    const galleryItem = $('.gallery-item');
    let itemsCount = gallery.offsetWidth / galleryItem.offsetWidth;
    itemsCount = Number(itemsCount.toFixed(0));

    const galleryContainer = $('.gallery-container');
    const galleryItems = $$('.gallery-item');
    const galleryCount = galleryItems.length;
    const transformUnit = -100 / itemsCount;

    let intervalID;
    let currentIndex = 0;
    let nextStep = true;
    let prevStep = false;
    prevBtn.classList.add('disable');
    return {
        autoRun: function () {
            intervalID = setInterval(() => {
                if (currentIndex <= galleryCount - 3 && currentIndex >= 0) {
                    if (nextStep) {
                        currentIndex++;
                        this.showSlide();
                        if (currentIndex === galleryCount - 3) {
                            nextStep = false;
                            prevStep = true;
                            return;
                        }
                    } else if (prevStep) {
                        currentIndex--;
                        this.showSlide();
                        if (currentIndex === 0) {
                            prevStep = false;
                            nextStep = true;
                        }
                    }
                }
            }, 3000);
        },
        showSlide: function () {
            let transformLength = transformUnit * currentIndex;
            galleryContainer.style.transform = `translateX(${transformLength}%)`;
            this.checkDisable();
        },
        next: function () {
            nextBtn.onclick = () => {
                if (currentIndex < galleryCount - 3) {
                    currentIndex++;
                    this.showSlide();
                    if (currentIndex === galleryCount - 3) {
                        prevStep = true;
                        nextStep = false;
                    } else {
                        nextStep = true;
                        prevStep = false;
                    }
                    clearInterval(intervalID);
                    this.autoRun();
                }

            }
        },

        checkDisable: function () {
            if (currentIndex === 0) {
                if (!prevBtn.classList.contains('disable')) {
                    prevBtn.classList.add('disable');
                }
            } else if (currentIndex === galleryCount - 3) {
                if (!nextBtn.classList.contains('disable')) {
                    nextBtn.classList.add('disable');
                }
            } else {
                if (prevBtn.classList.contains('disable')) {
                    prevBtn.classList.remove('disable');
                }
                if (nextBtn.classList.contains('disable')) {
                    nextBtn.classList.remove('disable');
                }
            }
        },
        prev: function () {
            prevBtn.onclick = () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    this.showSlide();
                    if (currentIndex === 0) {
                        nextStep = true;
                        prevStep = false;
                    } else {
                        prevStep = true;
                        nextStep = false;
                    }
                    clearInterval(intervalID);
                    this.autoRun();
                }
            }
        },

        run: function () {
            this.autoRun();
            this.next();
            this.prev();

        }
    }
})();
galleryHandle.run();

// END GALLERY
//----------------------------------------------------------------

//START CAROUSEL
const carouselLists = $$('.zm-carousel-list');
carouselLists.forEach(function (item, index) {
    item.setAttribute('data-type', index);
});
const carouselsNextBtn = $$('.zm-btn.zm-next');
carouselsNextBtn.forEach(function (item, index) {
    item.setAttribute('data-type', index);
})
const carouselsPrevBtn = $$('.zm-btn.zm-prev');
carouselsPrevBtn.forEach(function (item, index) {
    item.setAttribute('data-type', index);
})
const carouselHandle = function (dataType = 0) {
    const nextBtn = carouselsNextBtn[dataType];
    const prevBtn = carouselsPrevBtn[dataType];
    const carouselItem = $('.zm-carousel-item');
    const carouselList = carouselLists[dataType];
    const carouselItems = carouselList.querySelectorAll('.zm-carousel-item');

    const itemsCount = carouselItems.length;
    let itemCount = carouselList.offsetWidth / carouselItem.offsetWidth;
    itemCount = Number(itemCount.toFixed(0));


    const transformUnit = -100 / itemCount;
    let currentIndex = 0;

    prevBtn.classList.add('disable');
    nextBtn.classList.remove('disable');

    let countTimes = Math.floor(itemsCount / itemCount);
    const surplus = itemsCount % itemCount;
    if (surplus === 0) {
        countTimes -= 1;
    }
    const saveCountTimes = countTimes;


    return {
        showSlide: function () {
            const transformWidth = currentIndex * transformUnit;
            carouselList.style.transform = `translateX(${transformWidth}%)`;
        },
        checkDisable: function () {
            if (countTimes === saveCountTimes) {
                if (!prevBtn.classList.contains('disable')) {
                    prevBtn.classList.add('disable');
                }
                if (nextBtn.classList.contains('disable')) {
                    nextBtn.classList.remove('disable');
                }
            } else if (countTimes === 0) {
                if (!nextBtn.classList.contains('disable')) {
                    nextBtn.classList.add('disable');
                }
                if (prevBtn.classList.contains('disable')) {
                    prevBtn.classList.remove('disable');
                }
            }
            if (countTimes > 0 && countTimes < saveCountTimes) {
                if (nextBtn.classList.contains('disable')) {
                    nextBtn.classList.remove('disable');
                }
                if (prevBtn.classList.contains('disable')) {
                    prevBtn.classList.remove('disable');
                }
            }
        },
        nextBtn: function () {
            nextBtn.onclick = () => {
                if (countTimes > 0) {
                    if (surplus != 0 && countTimes - 1 === 0) {
                        currentIndex += surplus;
                    } else {
                        currentIndex += itemCount;
                    }
                    this.showSlide();
                    countTimes -= 1;
                    console.log(currentIndex);
                    this.checkDisable();
                }
            }
        },
        prevBtn: function () {
            prevBtn.onclick = () => {
                if (countTimes < saveCountTimes) {
                    if (surplus != 0 && countTimes === 0) {
                        currentIndex -= surplus;
                    } else {
                        currentIndex -= itemCount;
                    }
                    this.showSlide();
                    console.log(currentIndex);
                    countTimes += 1;
                    this.checkDisable();
                }
            }

        },
        run: function () {
            this.nextBtn();
            this.prevBtn();

        }
    }
};
carouselHandle(0).run();
carouselHandle(1).run();
carouselHandle(4).run();
// END CAROUSEL
// ------------------------------------------------------------------