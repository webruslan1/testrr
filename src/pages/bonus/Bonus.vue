<template>
  <div class="profile" v-if="$root.user && loading == false">
    <ProfileInfo />
    <div class="profile-content">
      <div class="profile-header">{{ $t("content.bonus.card") }}</div>
      <div class="profile-body">
        <div class="bonus">
          <div class="bonus-footer">
            <div class="bonus-footer__promo">
              <div class="promo">
                <div class="promo-title">
                  <svg
                    width="40"
                    height="24"
                    viewBox="0 0 40 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M38.8281 0H1.17188C0.524687 0 0 0.522619 0 1.16725V22.8327C0 23.4774 0.524687 24 1.17188 24H38.8281C39.4753 24 40 23.4774 40 22.8327V1.16725C40 0.522619 39.4753 0 38.8281 0ZM6.69648 13.7071H21.2609C21.9081 13.7071 22.4328 14.2298 22.4328 14.8744C22.4328 15.519 21.9081 16.0417 21.2609 16.0417H6.69648C6.0493 16.0417 5.52461 15.519 5.52461 14.8744C5.52461 14.2298 6.0493 13.7071 6.69648 13.7071ZM5.52461 9.1256C5.52461 8.48096 6.0493 7.95834 6.69648 7.95834H18.1513C18.7985 7.95834 19.3232 8.48096 19.3232 9.1256C19.3232 9.77023 18.7985 10.2928 18.1513 10.2928H6.69648C6.0493 10.2928 5.52461 9.77023 5.52461 9.1256ZM31.087 12.9925C29.9481 12.5915 28.782 12.1327 27.9667 11.4957C27.1379 10.8482 26.758 9.73257 26.9753 8.58415C27.2089 7.34958 28.0703 6.36566 29.2258 6.00949V5.65083C29.2258 5.0062 29.7505 4.48358 30.3977 4.48358C31.0448 4.48358 31.5695 5.0062 31.5695 5.65083V5.93751C32.2975 6.12139 32.8061 6.45391 33.0157 6.61008C33.5341 6.99606 33.6402 7.72754 33.2526 8.24385C32.8651 8.76009 32.1308 8.86584 31.6123 8.47979C31.3967 8.31926 30.8007 7.97429 29.9245 8.23708C29.4341 8.38423 29.3061 8.8709 29.2786 9.0165C29.2265 9.29205 29.2818 9.55623 29.4132 9.65888C29.9639 10.0891 30.9633 10.4728 31.8681 10.7914C33.5832 11.3953 34.5368 12.9784 34.241 14.7309C34.0225 16.0256 33.0656 17.3376 31.5696 17.8038V18.2459C31.5696 18.8905 31.0449 19.4132 30.3977 19.4132C29.7505 19.4132 29.2259 18.8905 29.2259 18.2459V17.9255C28.5345 17.8334 27.9433 17.607 27.1567 17.0945C26.6151 16.7416 26.4633 16.0182 26.8176 15.4787C27.1719 14.9392 27.8982 14.7881 28.4398 15.1409C29.1611 15.6109 29.4346 15.6538 30.3899 15.6475C31.2977 15.6414 31.8245 14.9676 31.9297 14.3439C31.9923 13.9721 31.9663 13.3021 31.087 12.9925Z"
                      fill="#de3720"
                    />
                  </svg>
                  <span style="text-transform: uppercase">{{
                    $t("content.profile.promo")
                  }}</span>
                </div>
                <fieldset class="promo-field" v-if="$root.user">
                  <input type="text" placeholder="PROMO" v-model="promocode" />
                </fieldset>
                <button v-if="$root.user" @click="usePromo" class="promo-btn">
                  {{ $t("content.profile.usePromo") }}
                </button>
                <a
                  v-else
                  class="promo-btn promo-login"
                  :href="$root.authUrl + '/api/auth/login'"
                  >{{ $t("others.sign-in") }}</a
                >
              </div>
            </div>
            <div
              class="bonus-footer__nick"
              :class="{
                'user-none': $root.user.bonusNamePercent == null,
                'user-max':
                  $root.user.bonusNamePercent ==
                  $root.settings.bonus.name.levels[
                    $root.settings.bonus.name.levels.length - 1
                  ].percent,
              }"
              v-if="$root.user"
            >
              <div class="bonus-footer__nick-top">
                <svg
                  width="30"
                  height="30"
                  viewBox="5 5 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.0436 10.8273H30.8599C31.1479 10.3706 31.338 9.85801 31.3922 9.31589C31.5653 7.58335 30.6545 6.03024 29.1038 5.34168C27.6785 4.70875 26.0767 4.96749 24.9232 6.01545L22.1658 8.51885C21.6288 7.93048 20.8568 7.56069 20.0001 7.56069C19.1418 7.56069 18.3686 7.93165 17.8314 8.52185L15.0705 6.01516C13.9152 4.96719 12.3141 4.70946 10.8893 5.34203C9.33906 6.03065 8.42804 7.58429 8.60171 9.31677C8.65603 9.85848 8.84599 10.3708 9.13398 10.8273H6.95651C5.87592 10.8273 5 11.7048 5 12.7872V15.7271C5 16.2683 5.43799 16.7071 5.97829 16.7071H34.0219C34.5621 16.7071 35.0002 16.2684 35.0002 15.7271V12.7872C35.0001 11.7048 34.1242 10.8273 33.0436 10.8273ZM17.0653 10.5006V10.8273H12.4631C11.2472 10.8273 10.2902 9.69172 10.5939 8.42353C10.7277 7.86503 11.1301 7.38895 11.6506 7.14794C12.3653 6.81701 13.157 6.92325 13.7573 7.46754L17.0661 10.4717C17.0659 10.4814 17.0653 10.4909 17.0653 10.5006ZM29.4509 9.05569C29.378 10.0742 28.4596 10.8274 27.4402 10.8274H22.9349V10.5007C22.9349 10.4892 22.9342 10.4777 22.934 10.4662C23.6836 9.78552 25.3096 8.30919 26.1915 7.50839C26.6927 7.05332 27.394 6.8409 28.0423 7.0346C28.9726 7.31258 29.519 8.1051 29.4509 9.05569Z"
                    fill="#DE3720"
                  />
                  <path
                    d="M6.95703 18.667V33.04C6.95703 34.1225 7.83295 34.9999 8.91354 34.9999H18.044V18.667H6.95703Z"
                    fill="#DE3720"
                  />
                  <path
                    d="M21.957 18.667V34.9999H31.0875C32.1681 34.9999 33.044 34.1225 33.044 33.04V18.667H21.957Z"
                    fill="#DE3720"
                  />
                </svg>

                <span style="text-transform: uppercase">{{
                  $t("content.bonus.nick")
                }}</span>
              </div>
              <div class="bonus-footer__nick-warn">
                <span v-if="$root.user.bonusNamePercent === null">
                  {{ $t("content.bonus.nick-none.0") }}
                  <strong>{{ $t("content.bonus.nick-none.1") }}</strong
                  >{{ $t("content.bonus.nick-none.2") }}
                </span>
                <span
                  v-if="
                    $root.user.bonusNamePercent !== null &&
                    $root.user.bonusNamePercent !==
                      $root.settings.bonus.name.levels[
                        $root.settings.bonus.name.levels.length - 1
                      ].percent
                  "
                >
                  {{ $t("content.bonus.nick-have.0") }}
                  <strong>{{ $t("content.bonus.nick-have.1") }}</strong
                  >{{ $t("content.bonus.nick-have.2") }}
                </span>
                <span
                  v-if="
                    $root.user.bonusNamePercent ===
                    $root.settings.bonus.name.levels[
                      $root.settings.bonus.name.levels.length - 1
                    ].percent
                  "
                >
                  {{ $t("content.bonus.nick-max.0") }}
                  <strong>{{ $t("content.bonus.nick-max.1") }}</strong
                  >{{ $t("content.bonus.nick-max.2") }}
                </span>
              </div>
              <div class="bonus-footer__nick-bottom">
                <div class="bonus-footer__nick-bottom-left">
                  <span v-if="$root.user.bonusNamePercent !== null">{{
                    $t("content.bonus.nick-per-have")
                  }}</span>
                  <span v-else>{{ $t("content.bonus.nick-per-none") }}</span>

                  <div class="bonus-percent">
                    +{{ $root.user.bonusNamePercent }}%
                  </div>
                </div>
                <div class="bonus-footer__nick-bottom-right">
                  <div class="bonus-footer__progress">
                    <div
                      class="bonus-footer__progress-line"
                      :style="{ width: percentName + '%' }"
                    ></div>
                    <div class="bonus-footer__progress-list">
                      <div
                        class="bonus-footer__progress-item"
                        v-for="i in $root.settings.bonus.name.levels"
                        :key="i.days"
                      >
                        <div class="bonus-footer__progress-item-box"></div>

                        <div class="bonus-footer__progress-item-percent">
                          +{{ i.percent }}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bonus-footer__nick" v-else>
              <div class="bonus-footer__nick-top">
                <svg
                  width="30"
                  height="30"
                  viewBox="5 5 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.0436 10.8273H30.8599C31.1479 10.3706 31.338 9.85801 31.3922 9.31589C31.5653 7.58335 30.6545 6.03024 29.1038 5.34168C27.6785 4.70875 26.0767 4.96749 24.9232 6.01545L22.1658 8.51885C21.6288 7.93048 20.8568 7.56069 20.0001 7.56069C19.1418 7.56069 18.3686 7.93165 17.8314 8.52185L15.0705 6.01516C13.9152 4.96719 12.3141 4.70946 10.8893 5.34203C9.33906 6.03065 8.42804 7.58429 8.60171 9.31677C8.65603 9.85848 8.84599 10.3708 9.13398 10.8273H6.95651C5.87592 10.8273 5 11.7048 5 12.7872V15.7271C5 16.2683 5.43799 16.7071 5.97829 16.7071H34.0219C34.5621 16.7071 35.0002 16.2684 35.0002 15.7271V12.7872C35.0001 11.7048 34.1242 10.8273 33.0436 10.8273ZM17.0653 10.5006V10.8273H12.4631C11.2472 10.8273 10.2902 9.69172 10.5939 8.42353C10.7277 7.86503 11.1301 7.38895 11.6506 7.14794C12.3653 6.81701 13.157 6.92325 13.7573 7.46754L17.0661 10.4717C17.0659 10.4814 17.0653 10.4909 17.0653 10.5006ZM29.4509 9.05569C29.378 10.0742 28.4596 10.8274 27.4402 10.8274H22.9349V10.5007C22.9349 10.4892 22.9342 10.4777 22.934 10.4662C23.6836 9.78552 25.3096 8.30919 26.1915 7.50839C26.6927 7.05332 27.394 6.8409 28.0423 7.0346C28.9726 7.31258 29.519 8.1051 29.4509 9.05569Z"
                    fill="#DE3720"
                  />
                  <path
                    d="M6.95703 18.667V33.04C6.95703 34.1225 7.83295 34.9999 8.91354 34.9999H18.044V18.667H6.95703Z"
                    fill="#DE3720"
                  />
                  <path
                    d="M21.957 18.667V34.9999H31.0875C32.1681 34.9999 33.044 34.1225 33.044 33.04V18.667H21.957Z"
                    fill="#DE3720"
                  />
                </svg>
                <span>{{ $t("content.bonus.nick") }}</span>
              </div>
              <a
                class="promo-btn bonus-footer__nick-login"
                :href="$root.authUrl + '/api/auth/login'"
              >
                {{ $t("others.sign-in") }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loader v-else-if="$root.user && loading == true" />
</template>
 

<script>
export default {
  data() {
    return {
      data: null,
      currentTask: null,
      percent: null,
      promocode: "",
      loading: true,
      loadingCanTake: false,
    };
  },
  created() {
    if(this.$root.user == null){
      this.$router.push('/')
    }else{
      this.loading = false;
    }
  },
  computed: {
    percentName() {
      var length = this.$root.settings.bonus.name.levels.length;
      var userPercent = this.$root.user.bonusNamePercent;
      if (userPercent > 0) {
        var arr =
          +Object.entries(this.$root.settings.bonus.name.levels).filter(
            (item) => item[1].percent === userPercent
          )[0][0] + 1;
        return (arr / length) * 100;
      } else {
        return 0;
      }
    },
  },
  methods: {
    async usePromo() {
      if (this.promocode.length > 0) {
        await this.$root
          .request("POST", "/api/bonus/promo/code", {
            value: this.promocode,
          })
          .then(() => {
            this.$root.$showNotify(
              "success",
              this.$t("content.profile.promoSuccess")
            );
          });
      } else {
        this.$root.showNotify("error", this.$t("content.bonus.promolength"));
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.profile {
  height: 100%;
  display: flex;

  &-content {
    flex: 1;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    overflow: hidden;
  }
  &-header {
    background: rgba(48, 48, 48, 0.8);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    padding: 14px 33px;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
  }
  &-body {
    position: relative;
    height: calc(100% - 50px);
    padding: 20px;
  }
}

.promo {
  &-title {
    display: flex;
    align-items: flex-end;
    margin-bottom: 50px;
    svg {
      filter: drop-shadow(0px 0px 5px rgba(222, 55, 32, 0.5));
      margin-right: 19px;
      margin-bottom: 2px;
    }

    span {
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
    }
  }

  &-field {
    background: #171717;
    border: 1px solid #474747;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 20px 41px 17px 39px;
    display: flex;
    align-items: center;
    margin-bottom: 46px;
    input {
      width: 80%;
      height: 53px;
      font-weight: 600;
      font-size: 36px;
      line-height: 53px;
      letter-spacing: 0.2em;
      color: #474747;
      text-transform: uppercase;
      background: transparent;
      outline: none;
      border: none;
      &::placeholder {
        color: #474747;
        font-weight: 600;
        font-size: 36px;
        line-height: 53px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }
    }

    svg {
      margin-left: auto;
    }
  }

  &-btn {
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    background: #de3720 !important;
    border-radius: 20px !important;
    transition: all 300ms;
    cursor: pointer;
    width: 100%;
    border: none;
    outline: none;

    &:hover {
      opacity: 0.7;
    }
  }
}

.bonus {
  & * {
    color: #fff;
  }
  &-header {
    margin-bottom: 15px;
    background: linear-gradient(
        180deg,
        rgba(255, 199, 0, 0) 69.81%,
        #de3720 256.67%
      ),
      url(/img/bonus-bg.png);
    height: 270px;
    background-size: cover;
    background-position-x: right;
    background-repeat: no-repeat;
    border-radius: 10px;
    padding: 11px;
    position: relative;
    &__wrapper {
      border: 1px solid #ffffff57;
      border-radius: 10px;
      height: 100%;
      display: flex;
      align-items: center;
      padding-top: 26px;
      flex-direction: column;
    }

    &__title {
      font-weight: 600;
      font-size: 48px;
      line-height: 71px;
      margin-bottom: 7px;
    }

    &__btn {
      background: #de3720;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;
      width: 192px;
      height: 59px;
      margin-bottom: 17px;
      cursor: pointer;
      transition: all 300ms;
      &:hover {
        opacity: 0.7;
      }
    }

    &__subtitle {
      font-weight: normal;
      font-size: 24px;
      line-height: 36px;
      mix-blend-mode: overlay;
    }

    // &__user {
    //   padding: 6px 10.5px 5px 8.5px;
    //   background: #1F1F1F;
    //   border-radius: 10px 0px 0px 0px;
    //   position: absolute;
    //   right: 0;
    //   bottom: 0;
    //   display: flex;
    //   align-items: center;
    //   &-avatar {
    //     width: 39px;
    //     height: 39px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     border: 1px solid #303030;
    //     border-radius: 5px;
    //     margin-right: 9.5px;
    //     img {
    //       width: 35px;
    //       height: 35px;
    //       border-radius: 3px;
    //     }
    //   }

    //   &-name {
    //     font-weight: normal;
    //     font-size: 18px;
    //     line-height: 27px;
    //     margin-right: 35px;
    //   }

    //   &-lvl,
    //   &-progress {
    //     background: rgba(255, 199, 0, 0.1);
    //     border-radius: 5px;
    //     text-transform: uppercase;
    //     span {
    //       color: #de3720;
    //     }
    //   }

    //   &-lvl {
    //     margin-right: 11px;
    //     font-weight: 500;
    //     padding: 4px 7px 5px 8px;
    //   }

    //   &-progress {
    //     padding: 4.5px 4.5px 4.5px 5px;
    //   }
    // }
  }

  &-center {
    background: #1f1f1f;
    border-radius: 10px;
    padding: 12px 13px 27px 28px;
    position: relative;
    margin-bottom: 15px;

    &__title {
      font-weight: normal;
      font-size: 24px;
      line-height: 36px;
      margin-bottom: 11px;
    }

    &__line {
      display: flex;
      align-items: center;
      column-gap: 13px;
      margin-bottom: 11px;
      &-progress {
        background: #171717;
        border-radius: 10px;
        position: relative;
        height: 53px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;

        &-wrapper {
          background: #3d351c;
          height: 35px;
          width: 98%;
          border-radius: 10px;
        }

        &-stroke {
          border-radius: 10px;
          height: 100%;
          background: #de3720;
          height: 100%;
        }

        &-title {
          font-weight: 500;
          font-size: 18px;
          line-height: 27px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-transform: uppercase;
        }
      }

      &-price {
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 89px;
        height: 53px;
        position: relative;
        background: #171717;
        box-shadow: 0px 0px 5px rgba(222, 55, 32, 0.5),
          inset 0px 0px 8px #ff0000;
        img {
          margin-right: 8px;
          width: 18px;
          height: 21px;
        }

        span {
          font-weight: 600;
          font-size: 18px;
          line-height: 22px;
          color: #ff0000;
          text-shadow: 0px 0px 10px rgba(255, 0, 0, 0.5);
        }
      }

      &-completed {
        background: #171717;
        border: 1px solid #474747;
        border-radius: 10px;
        height: 53px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;
        width: 110px;
        position: relative;
      }

      &-top {
        position: absolute;
        top: -20px;
        font-weight: normal;
        font-size: 10px;
        line-height: 15px;
        color: #474747;
      }
    }

    &__list {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 120px;
      column-gap: 10px;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
      &-item {
        display: flex;
        align-items: center;
        min-width: 300px;
        svg {
          margin-right: 8px;
        }

        span {
          font-weight: normal;
          font-size: 14px;
          line-height: 40px;
        }
      }
    }

    &__btn {
      background: #de3720 !important;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
      width: 262px;
      height: 40px;
      position: absolute;
      bottom: 19px;
      right: 17px;
      cursor: pointer;
      transition: all 300ms;
      &:disabled {
        opacity: 0.5;
        cursor: no-drop !important;
        &:hover {
          opacity: 0.5;
        }
      }
      &:hover {
        opacity: 0.7;
      }
    }

    &__mob {
      display: none;
    }
  }

  &-footer {
    display: flex;
    column-gap: 18px;
    height: 260px;
    &__promo {
      background: #1f1f1f;
      border-radius: 10px;
      width: 50%;
      position: relative;

      .promo {
        padding: 32px 20px 31px 20px;

        &-title {
          margin-bottom: 28px;
        }
        &-field {
          margin-bottom: 21px;
          height: 70px;
          input {
            font-size: 34px;
            line-height: 36px;
            height: 36px;

            &::placeholder {
              font-size: 34px;
              line-height: 36px;
            }
          }
        }
        &-btn {
          height: 59px;
        }
        &-login {
          width: 100%;
        }
      }
    }

    &__nick {
      width: 50%;
      background: #1f1f1f;
      border-radius: 10px;
      height: 100%;
      padding: 27px 20px 34px 20px;

      &-login {
        width: 100%;
        height: 60px;
      }

      &.user-none {
        .bonus-percent {
          background: rgba(255, 0, 0, 0.31);
          color: #ff3d00;
        }

        .bonus-footer__nick-warn {
          background: #1f1f34;
          span {
            color: #5d5d8b;
          }

          strong {
            color: #5d5d8b;
          }
        }
      }

      &.user-max {
        .bonus-footer__nick-warn {
          background: rgba(51, 255, 0, 0.4);
          span {
            color: #33ff00;
          }

          strong {
            color: #33ff00;
          }
        }
      }

      & &-top {
        display: flex;
        align-items: center;
        margin-bottom: 28px;
        svg {
          width: 30px;
          height: 30px;
          margin-right: 18px;
        }

        span {
          font-weight: 600;
          font-size: 18px;
          line-height: 27px;
        }
      }

      &-warn {
        height: 70px;
        width: 100%;
        background: #171717;
        border: 1px solid #474747;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        margin-bottom: 26px;
        span {
          font-weight: normal;
          font-size: 16px;
          line-height: 18px;
          color: #de3720;
        }
        strong {
          display: inline-block;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 18px;
          line-height: 27px;
          color: #de3720;
          margin: 3px 0;
          font-size: 18px;
        }
      }

      &-bottom {
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        row-gap: 60px;
        column-gap: 30px;
        justify-content: center;
        &-left {
          background: #171717;
          border-radius: 10px;
          flex: 1;
          min-width: 100px;
          height: 50px;
          display: flex;

          span {
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            color: #474747;
            padding: 14px 0 15px 18px;
          }
          .bonus-percent {
            margin-left: auto;
            height: 50px;
            width: 50px;
            font-size: 18px;
            line-height: 27px;
          }
        }
      }
    }

    &__progress {
      height: 5px;
      border-radius: 10px;
      background: #171717;
      position: relative;
      &-line {
        position: absolute;
        left: 0;
        top: 0;
        background: #de3720;
        height: 100%;
        border-radius: 10px;
        z-index: 10;
      }

      &-list {
        display: flex;
      }

      &-item {
        position: relative;
        &:not(:last-child) {
          margin-right: 37px;
        }
        &-box {
          width: 5px;
          height: 5px;
          background: #ababab;
          border-radius: 10px;
        }
        &-percent {
          position: absolute;
          left: -15px;
          top: -45px;
          width: 30px;
          height: 30px;
          background: #5b221b;
          box-shadow: 0px 0px 5px rgba(222, 55, 32, 0.5),
            inset 0px 0px 8px rgba(255, 255, 255, 0.5);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          color: #fff;
          font-size: 10px;
          line-height: 15px;
          color: #ffffff;
        }
      }
    }
  }

  &-percent {
    background: #de3720;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #fff;
  }
}

@media screen and (max-width: 1900px) {
  .bonus {
    &-footer {
      flex-direction: column;
      gap: 15px;
      &__promo {
        width: 100%;
      }

      &__nick {
        width: 100%;
      }
    }
  }

  .profile-content {
    padding-bottom: 30px;
  }

  .profile-body {
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
      margin-right: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background: #303030;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
      background-color: #212121;
      border-radius: 5px;
      box-shadow: inset 0 0 6px #171728;
      -webkit-box-shadow: inset 0 0px 0px 1px #171728;
    }
  }
}

@media screen and (max-width: 1600px) {
  .bonus {
    &-footer {
      &__nick {
        &-warn {
          span {
            font-size: 14px;
            line-height: 18px;
            strong {
              font-size: 14px;
              line-height: 18px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1400px) {
  .bonus {
    &-footer {
      &__nick {
        &-warn {
          height: 45px;
          span {
            font-size: 10px;
            line-height: 12px;
            strong {
              font-size: 10px;
              line-height: 12px;
            }
          }
        }
      }
    }

    .promo {
      &-btn {
        font-size: 16px;
        line-height: 18px;
        height: 50px;
      }
    }
  }
}
@media screen and (max-width: 1250px) {
  .bonus {
    padding: 10px 15px;
    &-header {
      &__title {
        font-size: 40px;
        line-height: 50px;
        margin-bottom: 15px;
      }

      &__btn {
        height: 50px;
      }
    }
    &-center {
      &__line {
        &-progress {
          &-title {
            font-size: 14px;
            line-height: 18px;
          }
        }
      }
    }
    &-footer {
      &__nick {
        padding: 27px 25px 39px 25px;
      }
      &__progress {
        &-item {
          &:not(:last-child) {
            margin-right: 40px;
          }

          &-percent {
            width: 30px;
            height: 30px;
            top: -35px;
            left: -15px;
            font-size: 12px;
            line-height: 14px;
          }
        }
      }
    }
    .promo {
      padding: 32px 25px 36px 25px;
      &-field {
        padding: 10px 10px 10px 15px;
        input {
          font-size: 20px;
          line-height: 22px;
          height: 22px;
          &::placeholder {
            font-size: 22px;
            line-height: 22px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1250px) {
  .bonus {
    padding: 10px 15px;
    &-header {
      &__title {
        font-size: 40px;
        line-height: 50px;
        margin-bottom: 15px;
      }

      &__btn {
        height: 50px;
      }
    }
    &-center {
      &__line {
        &-progress {
          &-title {
            font-size: 14px;
            line-height: 18px;
          }
        }
      }
    }
    &-footer {
      &__nick {
        padding: 27px 25px 39px 25px;
      }
      &__progress {
        &-item {
          &:not(:last-child) {
            margin-right: 40px;
          }

          &-percent {
            width: 30px;
            height: 30px;
            top: -35px;
            left: -15px;
            font-size: 12px;
            line-height: 14px;
          }
        }
      }
    }
    .promo {
      padding: 32px 25px 36px 25px;
      &-field {
        padding: 10px 10px 10px 15px;
        input {
          font-size: 22px;
          line-height: 22px;
          height: 22px;
          &::placeholder {
            font-size: 22px;
            line-height: 22px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .bonus-center__list {
    display: block;
    height: unset;
  }
}

@media screen and (max-width: 900px) {
  .profile {
    flex-direction: column;

    &-header {
      padding: 10px 10px 0 23px;
      background: unset;
    }

    &-body {
      padding: 20px 10px;
      height: 1125px;
      overflow: hidden;
    }

    &-content {
      margin-bottom: 70px;
    }
  }
}

@media screen and (max-width: 625px) {
  .bonus {
    padding: 10px 15px;
    &-header {
      height: 200px;
      &__title {
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;
        margin-bottom: 15px;
      }

      &__btn {
        width: 116px;
        height: 41px;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        margin-bottom: 11px;
      }

      &__subtitle {
        font-size: 14px;
        line-height: 21px;
      }

      &__user {
        padding: 4px 7px 3px 5px;
        &-avatar {
          width: 26px;
          height: 26px;
          img {
            width: 22px;
            height: 22px;
          }
        }

        &-name {
          font-size: 12px;
          line-height: 18px;
        }
        &-lvl {
          padding: 2px 4px 3px 4px;
          font-size: 10px;
          line-height: 15px;
          font-weight: 500;
          span {
            font-weight: 300;
            font-size: 10px;
            line-height: 15px;
          }
        }

        &-progress {
          padding: 2px 2px 3px 2px;
          font-weight: 300;
          font-size: 10px;
          line-height: 15px;
          span {
            font-weight: 300;
            font-size: 10px;
            line-height: 15px;
          }
        }
      }
    }
    &-center {
      &__mob {
        display: flex;
        column-gap: 13px;
        justify-content: center;
        margin-bottom: 11px;
      }
      &__line {
        background: rgba(23, 23, 40, 0.4);
        padding-bottom: 10px;
        border-radius: 10px 10px 0 0;
        margin: 0;
        &-progress {
          &-title {
            font-size: 12px;
          }
        }
        & &-price,
        & &-completed {
          display: none;
        }
      }
      &__list {
        background: rgba(23, 23, 40, 0.4);
        border-radius: 0px 0px 10px 10px;
        margin-bottom: 28px;
        margin-left: 0;
        padding-left: 20px;
        padding-bottom: 5px;
        &-item {
          svg {
            width: 10px;
            height: 8px;
          }
          span {
            font-size: 10px;
            line-height: 25px;
          }
        }
      }

      &__btn {
        margin: 0 auto;
        position: relative;
        right: 0;
        bottom: 0;
      }
    }
    &-footer {
      height: 310px;
      flex-direction: column;
      row-gap: 17px;
      &__promo {
        width: 100%;
      }

      &__nick {
        width: 100%;
        &-bottom {
          flex-direction: column;

          &-left {
            width: 100%;
          }

          &-right {
            width: 100%;
            padding-left: 20px;
          }
        }
      }
    }
  }
}
</style>