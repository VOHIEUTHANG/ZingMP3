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
    let galleryCount = galleryItems.length;
    let transformUnit = -100 / itemsCount;

    setInterval(function(){
        if((gallery.offsetWidth / galleryItem.offsetWidth).toFixed(0) != itemsCount){
        itemsCount = gallery.offsetWidth / galleryItem.offsetWidth;
        itemsCount = Number(itemsCount.toFixed(0));
        transformUnit = -100 / itemsCount;
    }
    },500);

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

// START THEME 
// ------------------------------------------------------------------

const themeHandle = (function(){
    const themeList = $$('.card-item');
    const htmlNode = $(':root[theme]');
    const themeModalOverlay = $('.theme-modal-overlay');
    const applyButtons = $$('.card-background'); 
    return {
        clearActive: ()=>{
            applyButtons.forEach(function(item,index){
                if(item.classList.contains('active')){
                    item.classList.remove('active');
                }
            });
        },
        main(){
            const _this = this;
            themeList.forEach(function(item,index){
                const applyButton = item.querySelector('.card-background');
                applyButton.onclick = () =>{
                    _this.clearActive();
                    htmlNode.setAttribute('theme',item.dataset.theme);
                    themeModalOverlay.style.display = "none";
                    applyButton.classList.add('active');
                }
            });
        },
        run(){
            this.main();
        }
    };
})();
themeHandle.run();

// END THEME
// ------------------------------------------------------------------

// START MAIN ----------------------------------------------------------------
const mainHandle = (function(){
    const listSong = $('.list-songs');
    const leftControl = $('.player-control-left');
    return {
        currentIndex: 0,
        songs: [
            {
              name: "Tình Đơn Phương",
              singer: "Nguyên ft. KOO x Freak D",
              path: "./assets/Musics/ChillMusic/TinhDonPhuong.mp3",
              image:
                "https://halotravel.vn/wp-content/uploads/2020/10/cap-hay-ve-tinh-yeu-don-phuong.jpg",
              new: true,
            },
            {
              name: "Người Lạ Thoáng Qua",
              singer: "Đinh Tùng Huy x Vux",
              path: "./assets/Musics/ChillMusic/NguoiLaThoangQua.mp3",
              image:
                "https://i.ytimg.com/vi/s-eNhNIwwIs/maxresdefault.jpg",
              new: true,
            },
            {
              name: "Thương Thầm",
              singer: "NB3 Hoài Bảo x Freak D",
              path: "./assets/Musics/ChillMusic/ThuongTham.mp3",
              image:
                "https://i.scdn.co/image/ab67616d0000b27379bbf430f1811a35f687874f",
            },
            {
              name: "Thê Lương",
              singer: "Phúc Chinh",
              path: "./assets/Musics/ChillMusic/TheLuong.mp3",
              image:
                "https://chuyenvui.com/wp-content/uploads/2021/06/loi-bai-hat-the-luong-2.jpg",
      
            },
            {
              name: "Sài Gòn Nay Mưa",
              singer: "JSOL ft. Hoàng Duyên",
              path: "./assets/Musics/ChillMusic/SaiGonNayMua.mp3",
              image:
                "https://i.ytimg.com/vi/WbVbcOYJFJk/mqdefault.jpg",
            },
            {
              name: "Rồi Tới Luôn",
              singer: "Nal",
              path: "./assets/Musics/ChillMusic/RoiToiLuon.mp3",
              image:
                "https://info-imgs.vgcloud.vn/2020/06/26/13/an-tuong-bo-anh-chill-duoi-anh-hoang-hon-phong-cach-hongkong-5.jpg",
              hot: true,
            },
            {
              name: "Họa Mây",
              singer: "X2X",
              path: "./assets/Musics/ChillMusic/HoaMay.mp3",
              image: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/0/b/0/4/0b047a80b0cbc0690afa34177f81b3f6.jpg",
              hot: true,
            },
            {
              name: "Từ Chối Nhẹ Nhàng Thôi",
              singer: "Phúc Du x Bích Phương",
              path: "./assets/Musics/ChillMusic/TuChoiNheNhangThoi.mp3",
              image: "https://billboardvn.vn/wp-content/uploads/2020/06/Voting-2MV.jpg",
              hot: true,
            },
            {
              name: "Thật Là Đáng Buồn",
              singer: "Doãn Hiếu x Phạm Nguyên Ngọc",
              path: "./assets/Musics/ChillMusic/ThatLaDangBuon.mp3",
              image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/1/9/9/6/1996507ca69734dd0bc8564e8a657800.jpg",
            },
            {
              name: "yêu Là Cưới",
              singer: "Phát Hồ X2X",
              path: "./assets/Musics/ChillMusic/YeuLaCuoi.mp3",
              image: "https://i.ytimg.com/vi/J9ChQu2zYEY/maxresdefault.jpg",
              new: true,
            },
            {
              name: "3107-3",
              singer: "W/n x Nâu x Duongg",
              path: "./assets/Musics/ChillMusic/3107-3.mp3",
              image:
                "https://data.chiasenhac.com/data/cover/145/144390.jpg",
              new: true,
            },
            {
              name: "Hơn Cả Mây Trời",
              singer: "Việt x Hawys",
              path: "./assets/Musics/ChillMusic/HonCaMayTroi.mp3",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqtnv3B0d4WU1tYf3zXCNePTrwcNFKm-wVYw&usqp=CAU",
            },
      
            {
              name: "Ghé Qua",
              singer: "Dick x Tofu x PC",
              path: "./assets/Musics/ChillMusic/GheQua.mp3",
              image:
                "https://i.ytimg.com/vi/wNH2zUpr_k4/maxresdefault.jpg",
            },
            {
              name: "Lỗi Tại Anh",
              singer: "Alex Lam x Freak D",
              path: "./assets/Musics/ChillMusic/LoiTaiAnh.mp3",
              image:
                "https://lyricvn.com/wp-content/uploads/2021/07/8451c24e944f5054e5b8090f254080e0.jpg",
            },
            {
              name: "Đoạn Tuyệt Nàng Đi",
              singer: "Phát Huy T4 x Dino",
              path: "./assets/Musics/ChillMusic/DoatTuyetNangDi.mp3",
              image: "https://i.ytimg.com/vi/Vo7N4uSaJV8/maxresdefault.jpg",
            },
            {
              name: "Cưới Thôi",
              singer: "Masiu x Masew",
              path: "./assets/Musics/ChillMusic/CuoiThoi.mp3",
              image: "https://i1.sndcdn.com/artworks-WI5MsTNygIpswgJa-lABTlA-t500x500.jpg",
              new: true,
            },
            {
              name: "Cưới Thôi Vocal Nữ",
              singer: "Masiu x Masew X B Ray x TAP ",
              path: "./assets/Musics/ChillMusic/CuoiThoiVocalNu.mp3",
              image: "https://data.chiasenhac.com/data/cover/147/146172.jpg",
              new: true,
            },
            {
              name: "Thích Em Hơi Nhiều",
              singer: " Wren Evans x Freak D",
              path: "./assets/Musics/ChillMusic/ThichEmHoiNhieu.mp3",
              image: "https://i.ytimg.com/vi/faSVTByG0LQ/maxresdefault.jpg?v=60de85cc",
              new: true,
            },
      
            {
              name: "Muốn Nói Với Em",
              singer: "TTeam x BlackBi (Truong Nguyen Lofi mix)",
              path: "./assets/Musics/ChillMusic/MuonNoiVoiEm.mp3",
              image: "https://i.ytimg.com/vi/eg29qwPW4V8/maxresdefault.jpg",
            },
            {
              name: "Anh Thề Đấy",
              singer: "Thanh Hưng x Dino",
              path: "./assets/Musics/ChillMusic/AnhTheDay.mp3",
              image: "https://avatar-ex-swe.nixcdn.com/song/2021/05/28/a/5/3/8/1622187655260_640.jpg",
            },
            {
              name: "Dù Cho Mai Về Sau",
              singer: "Bùi Trường Linh x FREAK D",
              path: "./assets/Musics/ChillMusic/DuChoMaiVeSau.mp3",
              image: "https://i.scdn.co/image/ab67616d0000b273d08e312c1749467b13f34608",
              hot: true,
            },
      
            {
              name: "Chẳng Thể Tìm Được Em",
              singer: "PhucXp ft. Freak D",
              path: "./assets/Musics/ChillMusic/ChangTheTimDuocEm.mp3",
              image:
                "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/a/b/8/6ab8deee3953592dc9a4cfcb81bfb1b8.jpg",
            },
            {
              name: "Nàng Thơ",
              singer: "Hoàng Dũng x Freak D",
              path: "./assets/Musics/ChillMusic/NangTho.mp3",
              image:
                "https://i.ytimg.com/vi/Zzn9-ATB9aU/maxresdefault.jpg",
            },
            {
              name: "Chỉ Là Muốn Nói",
              singer: "Khải",
              path: "./assets/Musics/ChillMusic/ChiLaMuonNoi.mp3",
              image: "https://i.ytimg.com/vi/LFpKuYb04h0/maxresdefault.jpg",
            },
            {
              name: "Em Bỏ Thuốc Chưa",
              singer: "Bích Phương x Freak D",
              path: "./assets/Musics/ChillMusic/EmBoThuocChua.mp3",
              image:
                "https://bloganchoi.com/wp-content/uploads/2020/05/bich-phuong.jpg",
            },
            {
              name: "Giờ Em Đâu",
              singer: "DATKAA x Prod. QT BEATZ ",
              path: "./assets/Musics/ChillMusic/GioEmODau.mp3",
              image:
                "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/1/2/5/c/125cdc5d9d35bf1e1b664feb124055c0.jpg",
            },
            {
              name: "Hạ Còn Vương Nắng",
              singer: "DATKAA x KIDO x Prod. QT BEATZ",
              path: "./assets/Musics/ChillMusic/HaConVuonNang.mp3",
              image:
                "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/8/4/e/684e70dd4cabcd49a65f076096c1f820.jpg",
            },
            {
              name: "Hẹn Em Kiếp Sau",
              singer: "Lã. x Duy Phúc x TiB",
              path: "./assets/Musics/ChillMusic/HenEmKiepSau.mp3",
              image:
                "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/c/a/5/c/ca5c05e1e0e068e8d505216ed0794a6e.jpg",
            },
            {
              name: "Hong Kong 1",
              singer: "Nguyễn Trọng Tài x San Ji x Double X",
              path: "./assets/Musics/ChillMusic/HongKongI.mp3",
              image:
                "https://avatar-ex-swe.nixcdn.com/playlist/2018/10/10/5/b/a/2/1539155622062_500.jpg",
            },
            {
              name: "Tháng Năm",
              singer: " Soobin x Freak D",
              path: "./assets/Musics/ChillMusic/ThangNam.mp3",
              image: "https://i.ytimg.com/vi/sG9JhIRuTkA/maxresdefault.jpg",
            },
            {
              name: "Chuyện Rằng",
              singer: "Thịnh Suy x Freak D",
              path: "./assets/Musics/ChillMusic/Chuyen Rang.mp3",
              image: "https://i.scdn.co/image/ab67616d0000b2734be34a1e036c97d22b5392d5",
            },
            {
              name: "Nợ Ai Đó Lời Xin Lỗi",
              singer: "Bozitt x Freak D",
              path: "./assets/Musics/ChillMusic/No Ai Do Loi Xin Loi.mp3",
              image:
                "https://i1.sndcdn.com/artworks-cgg23tTwEz2VnTMX-rxOrJA-t500x500.jpg",
            },
            {
              name: "Dại Khờ",
              singer: "NB3 Hoài Bảo x Freak D",
              path: "./assets/Musics/ChillMusic/Dại Khờ (Lofi Ver.) - NB3 Hoài Bảo x Freak D.mp3",
              image: "https://i.ytimg.com/vi/bUNwFuMfEFs/maxresdefault.jpg"
            },
            {
              name: "Thức Giấc",
              singer: "Da LAB x Ryan",
              path: "./assets/Musics/ChillMusic/ThucGiac.mp3",
              image: "https://i.ytimg.com/vi/R3trO4a49go/maxresdefault.jpg",
            },
            {
              name: "Tình Đầu",
              singer: "Tăng Duy Tân",
              path: "./assets/Musics/ChillMusic/TInhDau.mp3",
              image:
                "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/a/d/1/0ad18644161b1bbe41bc1ca0471600ba.jpg",
              hot: true,
            },
            {
              name: "Tình Đẹp Đến Mấy Cũng Tàn",
              singer: "Như Việt Ft Đình Dũng x Vux",
              path: "./assets/Musics/ChillMusic/TinhDauDepDenMayCungTan.mp3",
              image:
                "https://thuthuat.taimienphi.vn/cf/Images/tt/2019/12/16/loi-bai-hat-tinh-dep-den-may-cung-tan.jpg",
            },
            {
              name: "Mãi Mãi Không Phải Anh",
              singer: "Thanh Bìnhk",
              path: "./assets/Musics/ChillMusic/MaiMaiKhongPhaiAnh.mp3",
              image: "https://i.ytimg.com/vi/q5Kw-Yw0_E8/maxresdefault.jpg",
            },
            {
              name: "Hôm Nay Em Cưới Rồi",
              singer: "Khải Đăng x Freak D",
              path: "./assets/Musics/ChillMusic/HomNayEmCuoiRoi.mp3",
              image: "https://i.ytimg.com/vi/NuWAl7-Vkwk/maxresdefault.jpg",
            },
      
          ],
        renderSong(){
            const data = this.songs.reduce(function(accumulator,item,index){
                return accumulator + `
                <li class="song-item ${mainHandle.currentIndex === index ? "active" : ""}" data-index="${index}">
                <div class="media">
                 <div class="media-left">
                     <div class="song-thumb">
                       <img src="${item.image}" alt="">
                       <div class="icon-wrapper">
                         <i class="fas fa-play play-icon"></i>
                       </div>  
                       <div class="icon-wrapper">
                         <i class="active-icon"></i>
                       </div>  
                     </div>
                     <div class="card-info">
                       <h4 class="song-name">${item.name}</h4>
                       <h5 class="song-singer">
                         <a href="" class="singer-name">${item.singer}</a>
                       </h5>
                     </div>
                 </div>
                 <div class="media-right">
                   <div class="icon heart">
                     <span class="add-to-library hover-detail active">Thêm Vào Thư Viện</span>
                     <span class="remove-from-library hover-detail">Xóa khỏi Thư Viện</span>
                     <i class="far fa-heart"></i>
                   </div>
                   <div class="icon more">
                     <span class="hover-detail">Khác</span>
                     <i class="fas fa-ellipsis-h"></i>
                   </div>
                 </div>
                </div>
                <div class="next-song">
                  <h4 class="title">Tiếp Theo</h4>
                  <h5 class="sub-title">Từ playlist
                    <a href="" class="">Đỉnh cao trending</a>
                  </h5>
                </div>
               </li>
                `;
            },"");
            listSong.innerHTML = data;
        },
        loadCurrentSong(){
         leftControl.innerHTML = `
         <a href="" class="media-thumbnail">
         <div class="thumbnail">
           <img src="${this.songs[this.currentIndex].image}" alt="">
         </div>
       </a>
       <div class="media-content">
         <a href="" class="song-name">${this.songs[this.currentIndex].name}</a>
         <h5 class="song-singer">
           <a href="">${this.songs[this.currentIndex].singer}</a>
         </h5>
       </div>
       <div class="media-more">
         <div class="icon heart">
           <span class="add-to-library hover-detail active">Thêm Vào Thư Viện</span>
           <span class="remove-from-library hover-detail">Xóa khỏi Thư Viện</span>
           <i class="far fa-heart"></i>
         </div>
         <div class="icon more">
           <span class="hover-detail">Khác</span>
           <i class="fas fa-ellipsis-h"></i>
         </div>

       </div>
         `;
        },
        run(){
            this.renderSong();
            this.loadCurrentSong();
        }
    }
})();
mainHandle.run();
//END MAIN ----------------------------------------------------------------