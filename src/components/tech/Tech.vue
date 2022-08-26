<template>
  <div class="tech">
    <div class="tech-anim">
      <div
        ref="tech"
        :style="{
          width: width,
          height: height,
          overflow: 'hidden',
          margin: '0px auto',
        }"
      ></div>
    </div>
    <div class="tech-block">
      <div class="tech-title">
        <span>
          website <br />
          maintenance
        </span>
      </div>
      <div class="tech-socials">
        <div class="tech-socials__title">all information here</div>
        <div class="tech-socials__links">
          <div
            class="navbar-footer__soc-item btn-tr"
            @click="open($root.settings.common.discord_group)"
          >
            <svg
              width="23"
              height="17"
              viewBox="0 0 23 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9334 1.82684C17.5041 1.17893 15.9758 0.70806 14.3781 0.439941C14.1819 0.78366 13.9526 1.24597 13.7946 1.61373C12.0961 1.36626 10.4133 1.36626 8.74608 1.61373C8.58805 1.24597 8.3536 0.78366 8.15563 0.439941C6.55615 0.70806 5.02615 1.18066 3.59687 1.83027C0.714003 6.05104 -0.0674941 10.167 0.323256 14.2245C2.23532 15.6079 4.08835 16.4483 5.9101 16.9982C6.3599 16.3985 6.76106 15.7609 7.10665 15.0889C6.44846 14.8466 5.81806 14.5476 5.2224 14.2004C5.38042 14.087 5.535 13.9684 5.68434 13.8464C9.31743 15.4928 13.2649 15.4928 16.8546 13.8464C17.0057 13.9684 17.1602 14.087 17.3165 14.2004C16.7191 14.5493 16.087 14.8483 15.4288 15.0906C15.7744 15.7609 16.1738 16.4002 16.6253 16.9999C18.4488 16.45 20.3036 15.6096 22.2156 14.2245C22.6741 9.52081 21.4324 5.44267 18.9334 1.82684ZM7.60161 11.7292C6.511 11.7292 5.6166 10.7427 5.6166 9.54142C5.6166 8.34015 6.4919 7.35199 7.60161 7.35199C8.71136 7.35199 9.60573 8.33842 9.58663 9.54142C9.58835 10.7427 8.71136 11.7292 7.60161 11.7292ZM14.9373 11.7292C13.8467 11.7292 12.9523 10.7427 12.9523 9.54142C12.9523 8.34015 13.8275 7.35199 14.9373 7.35199C16.047 7.35199 16.9414 8.33842 16.9223 9.54142C16.9223 10.7427 16.047 11.7292 14.9373 11.7292Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
          <div
            class="navbar-footer__soc-item btn-tr"
            @click="open($root.settings.common.twitter_url)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              id="Layer_1"
              width="27"
              height="19"
              version="1.1"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M3.5,421.4c56,5.1,106.1-8.9,151.5-42.9c-7-1.6-13.4-1.6-19.5-3.1c-35.7-8.5-60.4-30-74.9-63.5   c-0.7-1.7-2.5-3.8-0.9-5.5c1.2-1.3,3.5-0.2,5.2,0c12.6,1.3,25.2,0.9,37.6-2c0.2-2.2-1.4-2-2.6-2.4c-30.7-8.2-53-26.5-67.4-54.8   c-6.6-13-10.2-26.6-10.6-41.2c-0.2-5.7,0.1-5.8,5.4-3.3c12.6,6,25.8,9.4,40.9,10.1c-6.9-5.6-13.1-10.5-18.4-16.4   c-16.1-17.9-25.1-38.8-27-62.9c-1.5-19.6,2.6-37.9,11.1-55.5c1.9-3.9,3.6-3.6,6-0.7C56.6,97.7,76.1,115,97.6,130   c16,11.2,33,20.5,50.9,28.4c23.6,10.3,48.1,17.2,73.5,21.3c8,1.3,16.2,1.6,24.3,2.4c4.1,0.4,5.2-0.8,4.4-5   c-4.1-21.6-1.3-42.6,8.1-62.3c16.1-33.6,43.1-54,79.8-59.4c32.6-4.8,61.9,4.5,86.2,27.4c3.7,3.5,7,4.4,12,3.1   c19.6-5,38.3-12.1,55.9-22.1c0.5-0.3,1.1-0.4,2.9-1.1c-8.2,24.1-22.7,41.9-43,55.5c4.7,0.9,18.6-1.6,28.2-4.6   c9.2-2.9,18.4-5.5,27.2-9.4c1.2,1.3,0.1,2-0.4,2.7c-11.7,16.5-25.1,31.4-41.1,43.8c-2.2,1.7-4.3,3.6-6.6,5.2   c-1.7,1.2-1.8,2.7-1.7,4.4c0.7,18.2-0.6,36.3-3.2,54.2c-2.7,18.3-7.3,36.1-13.4,53.6c-5,14.3-10.9,28.2-17.9,41.7   c-17.3,33.2-39.8,62.4-67.9,87.3c-29.9,26.4-63.9,45.4-101.9,57.2c-23.7,7.4-48,11.7-72.9,13c-19.2,1-38.3,0.7-57.3-1.7   c-27.2-3.3-53.4-10.7-78.6-21.5c-12.9-5.5-25.1-12.1-37.3-19C6.1,424.4,4.4,423.6,3.5,421.4z"
                  fill="#FFFFFF"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lottie from "lottie-web";
const tech = () => import("@/lottie/tech/tech.json");
export default {
  data() {
    return {
      tech: null,
      height: 281,
      width: 500,
    };
  },
  mounted() {
    var that = this;
    tech().then(function (data) {
      that.tech = lottie.loadAnimation({
        container: that.$refs.tech,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data,
      });
    });
  },
  methods: {
    open(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.tech {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
      50% 50% at 50% 50%,
      #9c1010 0%,
      rgba(255, 2, 2, 0) 70%
    ),
    url("/img/tech.png");
  background-position: center center;

  &-title {
    width: 480px;
    height: 150px;
    background: #de3720;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    span {
      font-family: "Exo 2";
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 38px;
      color: #ffffff;
      text-align: center;
      text-transform: uppercase;
    }
  }

  &-socials {
    width: 480px;
    height: 50px;
    background: #2b2b2b;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    &__title {
      text-transform: uppercase;
      font-family: "Exo 2";
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
    }

    &__links {
      display: flex;
      align-items: center;
      gap: 11px;
      margin-left: auto;
    }
  }
}
</style>