const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        slideChange: function () {
            const activeSlide = this.slides[this.activeIndex];
            const videos = document.querySelectorAll('.swiper-slide video');

            // Pausar todos los videos
            videos.forEach(video => video.pause());

            // Reproducir video del slide activo
            const activeVideo = activeSlide.querySelector('video');
            if (activeVideo) {
                activeVideo.play();
            }
        },
    },
});