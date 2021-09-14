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
    const galleryContainer = $('.gallery-container');
    const galleryItems = $$('.gallery-item');
    const galleryCount = galleryItems.length;
    const transformUnit = -100 / 3;
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