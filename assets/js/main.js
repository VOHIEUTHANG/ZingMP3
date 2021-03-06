const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const loading = $('.loader-background');

window.onload = function () {
  loading.style.transform = 'translateY(100%)';
}

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
  const settingSnow = $('.zm-profile-snow');
  const particle = $('#particles-js');


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
      settingSnow.onclick = function (e) {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
          particle.style.display = 'block';
        } else {
          particle.style.display = 'none';
        }
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

  setInterval(function () {
    if ((gallery.offsetWidth / galleryItem.offsetWidth).toFixed(0) != itemsCount) {
      itemsCount = gallery.offsetWidth / galleryItem.offsetWidth;
      itemsCount = Number(itemsCount.toFixed(0));
      transformUnit = -100 / itemsCount;
    }
  }, 500);

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

const themeHandle = (function () {
  const themeList = $$('.card-item');
  const htmlNode = $(':root[theme]');
  const themeModalOverlay = $('.theme-modal-overlay');
  const applyButtons = $$('.card-background');
  return {
    clearActive: () => {
      applyButtons.forEach(function (item, index) {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });
    },
    main() {
      const _this = this;
      themeList.forEach(function (item, index) {
        const applyButton = item.querySelector('.card-background');
        applyButton.onclick = () => {
          _this.clearActive();
          htmlNode.setAttribute('theme', item.dataset.theme);
          themeModalOverlay.style.display = "none";
          applyButton.classList.add('active');
        }
      });
    },
    run() {
      this.main();
    }
  };
})();
themeHandle.run();

// END THEME
// ------------------------------------------------------------------

// START MAIN ----------------------------------------------------------------

function convertSecondsToMinutes(seconds) {
  seconds = Math.round(seconds);
  let second = seconds % 60;
  let minute = Math.floor(seconds / 60);
  if (second.toString().length === 1) {
    second = `0${second}`;
  } else {
    second = `${second}`;
  }
  if (minute.toString().length === 1) {
    minute = `0${minute}`;
  } else {
    minute = `${minute}`;
  }
  return `${minute}:${second}`;
}

// RamDom Song
function randomNumber(start, end) {
  if (Number.isInteger(start) && Number.isInteger(end)) {
    return Math.floor(Math.random() * (end + 1 - start)) + start;
  }
  return -1;
}

function runRandom(currentNumber, start, end) {
  let random = randomNumber(start, end);
  let i = 0;
  if (random !== -1) {
    while (random == currentNumber) {
      random = randomNumber(start, end);
      i++;
      if (i === 100) return -1;
    }
    return random;
  }
  return -1;
}

const mainHandle = (function () {
  const listSong = $('.list-songs');
  const leftControl = $('.player-control-left');
  const audio = $('.audio');

  const playBtn = $('.play.main-item');
  const nextBtn = $('.forward.main-item');
  const prevBtn = $('.backward.main-item');
  const repeatBtn = $('.repeat.main-item');
  const shuffleBtn = $('.random.main-item');
  const mainProgress = $('.progressbar');
  const volumneIcon = $('.volumne-icon');
  const volumneIconLow = $('.volumne-icon > i.low');
  const volumneIconMute = $('.volumne-icon > i.mute');
  const volumneIconHigh = $('.volumne-icon > i.high');

  const audioProgress = $('#volume-range');

  const timeRight = $('.time.right');
  const timeLeft = $('.time.left');

  const maxValue = Number(mainProgress.max);
  return {
    currentIndex: 0,
    songs: [
      {
        name: "Ta C??? ??i C??ng Nhau",
        singer: "??en x Linh C??o",
        path: "./assets/musics/TaCuDiCungNhau.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/song/2020/10/05/b/a/b/3/1601880462967_640.jpg",
      },
      {
        name: "L?? Do N??o ????? Quay L???i V???i Nhau",
        singer: "Par SG x New$oulZ",
        path: "./assets/musics/LyDoNaoDeQuayLaiVoiNhau.mp3",
        image: "https://i1.sndcdn.com/artworks-000566367992-pmljgr-t500x500.jpg",
      },
      {
        name: "Mu???n N??i V???i Em",
        singer: "TTeam x BlackBi (Truong Nguyen Lofi mix)",
        path: "./assets/musics/MuonNoiVoiEm.mp3",
        image: "https://i.ytimg.com/vi/eg29qwPW4V8/maxresdefault.jpg",
      },
      {
        name: "T??nh ????n Ph????ng",
        singer: "Nguy??n ft. KOO x Freak D",
        path: "./assets/musics/TinhDonPhuong.mp3",
        image:
          "https://halotravel.vn/wp-content/uploads/2020/10/cap-hay-ve-tinh-yeu-don-phuong.jpg",
        new: true,
      },
      {
        name: "Ng?????i L??? Tho??ng Qua",
        singer: "??inh T??ng Huy x Vux",
        path: "./assets/musics/NguoiLaThoangQua.mp3",
        image:
          "https://i.ytimg.com/vi/s-eNhNIwwIs/maxresdefault.jpg",
        new: true,
      },
      {
        name: "Th????ng Th???m",
        singer: "NB3 Ho??i B???o x Freak D",
        path: "./assets/musics/ThuongTham.mp3",
        image:
          "https://i.scdn.co/image/ab67616d0000b27379bbf430f1811a35f687874f",
      },
      {
        name: "Th?? L????ng",
        singer: "Ph??c Chinh",
        path: "./assets/musics/TheLuong.mp3",
        image:
          "https://chuyenvui.com/wp-content/uploads/2021/06/loi-bai-hat-the-luong-2.jpg",

      },
      {
        name: "S??i G??n Nay M??a",
        singer: "JSOL ft. Ho??ng Duy??n",
        path: "./assets/musics/SaiGonNayMua.mp3",
        image:
          "https://i.ytimg.com/vi/WbVbcOYJFJk/mqdefault.jpg",
      },
      {
        name: "R???i T???i Lu??n",
        singer: "Nal",
        path: "./assets/musics/RoiToiLuon.mp3",
        image:
          "https://info-imgs.vgcloud.vn/2020/06/26/13/an-tuong-bo-anh-chill-duoi-anh-hoang-hon-phong-cach-hongkong-5.jpg",
        hot: true,
      },
      {
        name: "C?????i Th??i Ver 2",
        singer: "Masiu x Masew X B Ray x TAP ",
        path: "./assets/musics/CuoiThoiVocalNu.mp3",
        image: "https://data.chiasenhac.com/data/cover/147/146172.jpg",
      },
      {
        name: "H???a M??y",
        singer: "X2X",
        path: "./assets/musics/HoaMay.mp3",
        image: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/0/b/0/4/0b047a80b0cbc0690afa34177f81b3f6.jpg",
        hot: true,
      },
      {
        name: "T??? Ch???i Nh??? Nh??ng Th??i",
        singer: "Ph??c Du x B??ch Ph????ng",
        path: "./assets/musics/TuChoiNheNhangThoi.mp3",
        image: "https://billboardvn.vn/wp-content/uploads/2020/06/Voting-2MV.jpg",
        hot: true,
      },
      {
        name: "Th???t L?? ????ng Bu???n",
        singer: "Do??n Hi???u x Ph???m Nguy??n Ng???c",
        path: "./assets/musics/ThatLaDangBuon.mp3",
        image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/1/9/9/6/1996507ca69734dd0bc8564e8a657800.jpg",
      },
      {
        name: "y??u L?? C?????i",
        singer: "Ph??t H??? X2X",
        path: "./assets/musics/YeuLaCuoi.mp3",
        image: "https://i.ytimg.com/vi/J9ChQu2zYEY/maxresdefault.jpg",
        new: true,
      },
      {
        name: "3107-3",
        singer: "W/n x N??u x Duongg",
        path: "./assets/musics/3107-3.mp3",
        image:
          "https://data.chiasenhac.com/data/cover/145/144390.jpg",
        new: true,
      },
      {
        name: "H??n C??? M??y Tr???i",
        singer: "Vi???t x Hawys",
        path: "./assets/musics/HonCaMayTroi.mp3",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqtnv3B0d4WU1tYf3zXCNePTrwcNFKm-wVYw&usqp=CAU",
      },

      {
        name: "Gh?? Qua",
        singer: "Dick x Tofu x PC",
        path: "./assets/musics/GheQua.mp3",
        image:
          "https://i.ytimg.com/vi/wNH2zUpr_k4/maxresdefault.jpg",
      },
      {
        name: "L???i T???i Anh",
        singer: "Alex Lam x Freak D",
        path: "./assets/musics/LoiTaiAnh.mp3",
        image:
          "https://lyricvn.com/wp-content/uploads/2021/07/8451c24e944f5054e5b8090f254080e0.jpg",
      },
      {
        name: "??o???n Tuy???t N??ng ??i",
        singer: "Ph??t Huy T4 x Dino",
        path: "./assets/musics/DoatTuyetNangDi.mp3",
        image: "https://i.ytimg.com/vi/Vo7N4uSaJV8/maxresdefault.jpg",
      },
      {
        name: "C?????i Th??i",
        singer: "Masiu x Masew",
        path: "./assets/musics/CuoiThoi.mp3",
        image: "https://i1.sndcdn.com/artworks-WI5MsTNygIpswgJa-lABTlA-t500x500.jpg",
      },

      {
        name: "Th??ch Em H??i Nhi???u",
        singer: " Wren Evans x Freak D",
        path: "./assets/musics/ThichEmHoiNhieu.mp3",
        image: "https://i.ytimg.com/vi/faSVTByG0LQ/maxresdefault.jpg?v=60de85cc",
        new: true,
      },


      {
        name: "Anh Th??? ?????y",
        singer: "Thanh H??ng x Dino",
        path: "./assets/musics/AnhTheDay.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/song/2021/05/28/a/5/3/8/1622187655260_640.jpg",
      },
      {
        name: "D?? Cho Mai V??? Sau",
        singer: "B??i Tr?????ng Linh x FREAK D",
        path: "./assets/musics/DuChoMaiVeSau.mp3",
        image: "https://i.scdn.co/image/ab67616d0000b273d08e312c1749467b13f34608",
        hot: true,
      },

      {
        name: "Ch???ng Th??? T??m ???????c Em",
        singer: "PhucXp ft. Freak D",
        path: "./assets/musics/ChangTheTimDuocEm.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/a/b/8/6ab8deee3953592dc9a4cfcb81bfb1b8.jpg",
      },
      {
        name: "N??ng Th??",
        singer: "Ho??ng D??ng x Freak D",
        path: "./assets/musics/NangTho.mp3",
        image:
          "https://i.ytimg.com/vi/Zzn9-ATB9aU/maxresdefault.jpg",
      },
      {
        name: "Ch??? L?? Mu???n N??i",
        singer: "Kh???i",
        path: "./assets/musics/ChiLaMuonNoi.mp3",
        image: "https://i.ytimg.com/vi/LFpKuYb04h0/maxresdefault.jpg",
      },
      {
        name: "Em B??? Thu???c Ch??a",
        singer: "B??ch Ph????ng x Freak D",
        path: "./assets/musics/EmBoThuocChua.mp3",
        image:
          "https://bloganchoi.com/wp-content/uploads/2020/05/bich-phuong.jpg",
      },
      {
        name: "Gi??? Em ????u",
        singer: "DATKAA x Prod. QT BEATZ ",
        path: "./assets/musics/GioEmODau.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/1/2/5/c/125cdc5d9d35bf1e1b664feb124055c0.jpg",
      },
      {
        name: "H??? C??n V????ng N???ng",
        singer: "DATKAA x KIDO x Prod. QT BEATZ",
        path: "./assets/musics/HaConVuonNang.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/8/4/e/684e70dd4cabcd49a65f076096c1f820.jpg",
      },
      {
        name: "H???n Em Ki???p Sau",
        singer: "L??. x Duy Ph??c x TiB",
        path: "./assets/musics/HenEmKiepSau.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/c/a/5/c/ca5c05e1e0e068e8d505216ed0794a6e.jpg",
      },
      {
        name: "Hong Kong 1",
        singer: "Nguy???n Tr???ng T??i x San Ji x Double X",
        path: "./assets/musics/HongKongI.mp3",
        image:
          "https://avatar-ex-swe.nixcdn.com/playlist/2018/10/10/5/b/a/2/1539155622062_500.jpg",
      },
      {
        name: "Th??ng N??m",
        singer: " Soobin x Freak D",
        path: "./assets/musics/ThangNam.mp3",
        image: "https://i.ytimg.com/vi/sG9JhIRuTkA/maxresdefault.jpg",
      },
      {
        name: "Chuy???n R???ng",
        singer: "Th???nh Suy x Freak D",
        path: "./assets/musics/Chuyen Rang.mp3",
        image: "https://i.scdn.co/image/ab67616d0000b2734be34a1e036c97d22b5392d5",
      },
      {
        name: "N??? Ai ???? L???i Xin L???i",
        singer: "Bozitt x Freak D",
        path: "./assets/musics/No Ai Do Loi Xin Loi.mp3",
        image:
          "https://i1.sndcdn.com/artworks-cgg23tTwEz2VnTMX-rxOrJA-t500x500.jpg",
      },
      {
        name: "D???i Kh???",
        singer: "NB3 Ho??i B???o x Freak D",
        path: "./assets/musics/D???i Kh??? (Lofi Ver.) - NB3 Ho??i B???o x Freak D.mp3",
        image: "https://i.ytimg.com/vi/bUNwFuMfEFs/maxresdefault.jpg"
      },
      {
        name: "Th???c Gi???c",
        singer: "Da LAB x Ryan",
        path: "./assets/musics/ThucGiac.mp3",
        image: "https://i.ytimg.com/vi/R3trO4a49go/maxresdefault.jpg",
      },
      {
        name: "T??nh ?????u",
        singer: "T??ng Duy T??n",
        path: "./assets/musics/TInhDau.mp3",
        image:
          "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/a/d/1/0ad18644161b1bbe41bc1ca0471600ba.jpg",
        hot: true,
      },
      {
        name: "T??nh ?????p ?????n M???y C??ng T??n",
        singer: "Nh?? Vi???t Ft ????nh D??ng x Vux",
        path: "./assets/musics/TinhDauDepDenMayCungTan.mp3",
        image:
          "https://thuthuat.taimienphi.vn/cf/Images/tt/2019/12/16/loi-bai-hat-tinh-dep-den-may-cung-tan.jpg",
      },
      {
        name: "M??i M??i Kh??ng Ph???i Anh",
        singer: "Thanh B??nhk",
        path: "./assets/musics/MaiMaiKhongPhaiAnh.mp3",
        image: "https://i.ytimg.com/vi/q5Kw-Yw0_E8/maxresdefault.jpg",
      },
      {
        name: "H??m Nay Em C?????i R???i",
        singer: "Kh???i ????ng x Freak D",
        path: "./assets/musics/HomNayEmCuoiRoi.mp3",
        image: "https://i.ytimg.com/vi/NuWAl7-Vkwk/maxresdefault.jpg",
      },

    ],
    length() {
      return this.songs.length;
    },
    renderSong() {
      const data = this.songs.reduce(function (accumulator, item, index) {
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
                         <a href="#" class="singer-name">${item.singer}</a>
                       </h5>
                     </div>
                 </div>
                 <div class="media-right">
                   <div class="icon heart">
                     <span class="add-to-library hover-detail active">Th??m V??o Th?? Vi???n</span>
                     <span class="remove-from-library hover-detail">X??a kh???i Th?? Vi???n</span>
                     <i class="far fa-heart"></i>
                   </div>
                   <div class="icon more">
                     <span class="hover-detail">Kh??c</span>
                     <i class="fas fa-ellipsis-h"></i>
                   </div>
                 </div>
                </div>
               </li>
                `;
      }, "");
      listSong.innerHTML = data;
    },
    loadCurrentSong() {
      //Load current Song in control bar
      const imgThumbnail = $('.thumbnail > img');
      const songName = $('.media-content .song-name');
      const singerName = $('.media-content .song-singer > a');
      imgThumbnail.src = `${this.songs[this.currentIndex].image}`;
      songName.innerText = `${this.songs[this.currentIndex].name}`;
      singerName.innerText = `${this.songs[this.currentIndex].singer}`;
      audio.src = `${this.songs[this.currentIndex].path}`;
      //Load song active in queue
      const songs = $$('.song-item');
      const songActive = $('.song-item.active');
      if (songActive) songActive.classList.remove('active');
      songs.forEach((song, index) => {
        if (song.dataset.index == this.currentIndex) {
          song.classList.add('active');
        }
      });
    },
    nextSong() {
      if (this.currentIndex < this.length() - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
    },
    prevSong() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.length() - 1;
      }
      this.loadCurrentSong();
    },
    mainHandle() {
      //PLAY BTN HANDLE 
      //===================================
      const cdThumb = $('.thumbnail');
      //reset main progressbar value 
      mainProgress.value = 0;

      playBtn.onclick = function (e) {
        this.classList.toggle('is-playing');
        if (this.classList.contains('is-playing')) {
          playHandle();
        } else {
          pauseHandle();
        }
      };

      function playHandle() {
        audio.play();
        cdAnimate.play();
        $('.song-item.active').classList.add('is-playing');
        if (!playBtn.classList.contains('is-playing')) {
          playBtn.classList.add('is-playing');
        }
      };

      function pauseHandle() {
        audio.pause();
        cdAnimate.pause();
        $('.song-item.active').classList.remove('is-playing');
        if (playBtn.classList.contains('is-playing')) {
          playBtn.classList.remove('is-playing');
        }
      }

      // play next song when current song ended
      audio.onended = () => {
        nextBtn.click();
      };
      //NEXT SONG HANDLE 
      nextBtn.onclick = () => {
        this.nextSong();
        playHandle();
      };
      //PREVIOUS SONG HANDLE 
      prevBtn.onclick = () => {
        this.prevSong();
        playHandle();
      }
      //PLAY AGAIN HANDLER
      repeatBtn.onclick = () => {
        repeatBtn.classList.toggle('active');
        if (repeatBtn.classList.contains('active')) {
          audio.onended = () => {
            audio.play();
          };
        } else {
          audio.onended = () => {
            nextBtn.click();
          };
        }

        if (shuffleBtn.classList.contains('active')) {
          shuffleBtn.classList.remove('active');
        }
      }

      shuffleBtn.onclick = () => {
        shuffleBtn.classList.toggle('active');
        if (shuffleBtn.classList.contains('active')) {
          audio.onended = () => {
            this.currentIndex = runRandom(this.currentIndex, 0, this.length());
            this.loadCurrentSong();
            playHandle();
          };
        } else {
          audio.onended = () => {
            nextBtn.click();
          };
        }
        if (repeatBtn.classList.contains('active')) {
          repeatBtn.classList.remove('active');
        }
      }

      //Playing song handler
      //===================================
      function subUpdate() {
        if (audio.duration) {
          let percentTime = (audio.currentTime / audio.duration) * 100;
          percentTime = Number(percentTime.toFixed(3));
          mainProgress.style.background = `linear-gradient(
              to right,
              white 0%,
              white ${percentTime}%,
              var(--progressbar-bg) ${percentTime}%,
               var(--progressbar-bg) 100%
            )`;
          timeLeft.innerText = convertSecondsToMinutes(audio.currentTime);
          timeRight.innerText = convertSecondsToMinutes(audio.duration);
        }
      }

      function mainUpdate() {
        if (audio.duration) {
          let percentTime = (audio.currentTime / audio.duration) * 100;
          percentTime = Number(percentTime.toFixed(3));
          mainProgress.value = percentTime / 100 * maxValue;
        }
      }

      audio.addEventListener("timeupdate", mainUpdate);
      audio.addEventListener("timeupdate", subUpdate);

      mainProgress.oninput = function () {
        // audio.removeEventListener('timeupdate', mainUpdate);
        const percentTime = Math.round(mainProgress.value / maxValue * 100);
        mainProgress.style.background = `linear-gradient(
              to right,
              white 0%,
              white ${percentTime}%,
              var(--progressbar-bg) ${percentTime}%,
              var(--progressbar-bg) 100%
            )`;
        audio.currentTime = Math.round(percentTime / 100 * audio.duration);
      }

      //===================================
      //Audio progress handler 
      audio.volume = 0.7;
      audioProgress.value = Math.round(audio.volume * 100);
      audioProgress.style.background = `linear-gradient(
              to right,
              white 0%,
              white ${audioProgress.value}%,
              var(--progressbar-bg) ${audioProgress.value}%,
              var(--progressbar-bg) 100%
            )`;

      if (audioProgress.value == 0) {
        volumneIconMute.style.display = 'block';
      } else if (audioProgress.value < 70) {
        volumneIconLow.style.display = 'block';
      } else {
        volumneIconHigh.style.display = 'block';
      }

      audioProgress.oninput = function () {
        audioProgress.style.background = `linear-gradient(
              to right,
              white 0%,
              white ${audioProgress.value}%,
              var(--progressbar-bg) ${audioProgress.value}%,
              var(--progressbar-bg) 100%
            )`;
        audio.volume = audioProgress.value / 100;

        volumneIconLow.style.display = "none";
        volumneIconMute.style.display = "none";
        volumneIconHigh.style.display = "none";
        console.log(audioProgress.value);
        if (audioProgress.value == 0) {
          volumneIconMute.style.display = 'block';
        } else if (audioProgress.value < 50) {
          volumneIconLow.style.display = 'block';
        } else {
          volumneIconHigh.style.display = 'block';
        }
      }

      //Song in queue click handle 
      const songs = $$('.song-item');
      const songActive = $('.song-item.active');
      listSong.onclick = (e) => {
        const songThumb = e.target.closest('.song-thumb');
        if (songThumb) {
          const songItem = songThumb.closest('.song-item');
          if (songItem) {
            if (!songItem.classList.contains('active')) {
              this.currentIndex = songItem.dataset.index;
              this.loadCurrentSong();
              playHandle();
            } else {
              playBtn.click();
            }
          }
        }
      };

      //Progress bar handler

      //CD animation
      const cdAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
        duration: 10000,
        iterations: Infinity,
      });
      cdAnimate.pause();

      //Key presss handle 
      //===================================
      document.onkeydown = function (e) {
        e.preventDefault();
        switch (e.which) {
          case 32:
            playBtn.click();
            break;
          case 40:
            nextBtn.click();
            break;
          case 38:
            prevBtn.click();
        }
      };

    },
    run() {
      this.renderSong();
      this.loadCurrentSong();
      this.mainHandle();
    }
  }
})();
mainHandle.run();
//END MAIN ----------------------------------------------------------------