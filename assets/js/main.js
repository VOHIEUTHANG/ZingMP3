const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

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
                settingBtn.classList.remove('active');
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
