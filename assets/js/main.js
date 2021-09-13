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
    let currentIndex = 0;
    let nextStep = true;
    let prevStep = false;
    prevBtn.classList.add('disable');
    return {
        autoRun: function () {
            const intervalID = setInterval(() => {
                debugger;
                if (nextStep) {
                    if (currentIndex < galleryCount - 3) {
                        currentIndex++;
                        this.showSlide();
                        console.log(currentIndex);
                        if (currentIndex === galleryCount - 3) {
                            nextStep = false;
                            prevStep = true;
                            return;
                        }
                    }
                }
                if (prevStep) {
                    currentIndex--;
                    this.showSlide();
                    if (currentIndex === 0) {
                        prevStep = false;
                        nextStep = true;
                    }
                }
            }, 3000);
        },
        showSlide: function () {
            let transformLength = transformUnit * currentIndex;
            galleryContainer.style.transform = `translateX(${transformLength}%)`;
        },
        next: function () {
            nextBtn.onclick = () => {
                if (currentIndex < galleryCount - 3) {
                    currentIndex++;
                    if (prevBtn.classList.contains('disable')) {
                        prevBtn.classList.remove('disable');
                    }
                    this.showSlide();
                }
                console.log(currentIndex);
                if (currentIndex >= galleryCount - 3) {
                    if (!nextBtn.classList.contains('disable')) {
                        nextBtn.classList.add("disable");
                    }
                }
            }
        },
        prev: function () {
            prevBtn.onclick = () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    if (nextBtn.classList.contains('disable')) {
                        nextBtn.classList.remove('disable');
                    }
                    this.showSlide();
                }

                if (currentIndex <= 0) {
                    if (!prevBtn.classList.contains('disable')) {
                        prevBtn.classList.add("disable");
                    }
                }
            }
        },
        run: function () {
            // this.autoRun();
            this.next();
            this.prev();

        }
    }
})();
galleryHandle.run();

// END GALLERY
//----------------------------------------------------------------