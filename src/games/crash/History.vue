<template>
  <div class="history" v-if="data">
    <div class="history-header">
      <router-link to="/" class="history-header__back">
        <svg
          data-v-547aeb2c=""
          width="27"
          height="25"
          viewBox="0 0 27 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            data-v-547aeb2c=""
            d="M11.563 19.3442C11.5192 19.3122 11.4776 19.2772 11.4385 19.2396L5.35677 13.1578C4.88145 12.6831 4.88103 11.913 5.35578 11.4377C5.35609 11.4374 5.35643 11.4371 5.35673 11.4368L11.4384 5.35505C11.9141 4.88072 12.6842 4.88178 13.1586 5.35745C13.1959 5.39489 13.2308 5.43472 13.263 5.47669C13.6039 5.98531 13.5295 6.66551 13.0866 7.08834L9.72948 10.4576C9.55102 10.6363 9.34584 10.7861 9.12131 10.9016L8.75641 11.0658L20.7009 11.0658C21.3222 11.0427 21.8674 11.4767 21.9841 12.0875C22.0916 12.7506 21.6413 13.3753 20.9782 13.4829C20.9086 13.4942 20.8382 13.4994 20.7678 13.4985L8.77465 13.4985L9.03617 13.6201C9.29179 13.7411 9.52434 13.9057 9.7234 14.1066L13.0866 17.4698C13.5295 17.8926 13.6039 18.5728 13.263 19.0815C12.8661 19.6235 12.105 19.7411 11.563 19.3442Z"
            fill="#DE3720"
          ></path>
        </svg>
      </router-link>
      <span class="history-header__title"
        >{{ $t("content.history") }} - #{{ $route.params.id }}</span
      >
      <div class="history-header__date">
        {{ $root.formatDate(data.finishedAt) }}
      </div>
      <div class="history-header__truefact" @click="$root.fair = true">
        {{ $t("content.true") }}
      </div>
    </div>
    <div class="history-body">
      <div class="history-stats">
        <div class="history-stats__hash">
          <div class="history-stats__hash-wrapper">
            <div class="history-stats__hash-title">
              {{ $t("content.checkTrue") }}
            </div>
            <div class="history-stats__hash-subtitle">
              {{ $t("content.hash") }} {{ data.hash }}
            </div>
          </div>
          <div class="history-stats__hash-check" @click="$root.fair = true">
            {{ $t("content.check") }}
          </div>
        </div>
        <div class="history-stats__list">
          <div class="history-stats__list-item">
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.18239 9.2941C8.49183 9.2941 10.3706 7.41529 10.3707 5.10585C10.3707 2.79641 8.49179 0.917603 6.18239 0.917603C3.87299 0.917603 1.99414 2.79641 1.99414 5.10585C1.99414 7.41529 3.87295 9.2941 6.18239 9.2941Z"
                fill="#434343"
              />
              <path
                d="M15.8172 9.2941C18.1266 9.2941 20.0055 7.41529 20.0055 5.10585C20.0055 2.79641 18.1266 0.917603 15.8172 0.917603C13.5077 0.917603 11.6289 2.79641 11.6289 5.10585C11.6289 7.41529 13.5078 9.2941 15.8172 9.2941Z"
                fill="#434343"
              />
              <path
                d="M6.1829 10.0271C2.77363 10.0271 0 12.8005 0 16.2095V18.3064C0 18.7349 0.347445 19.0824 0.776016 19.0824H11.5893C12.0178 19.0824 12.3653 18.7349 12.3653 18.3064V16.2095C12.3653 12.8358 9.6467 10.0271 6.1829 10.0271Z"
                fill="#434343"
              />
              <path
                d="M11.9134 11.4108C11.8048 11.4998 11.7896 11.66 11.8763 11.7706C13.6459 14.0279 13.4007 16.2104 13.4007 18.3064C13.4007 18.4632 13.3806 18.6154 13.3429 18.7605C13.3005 18.9237 13.4248 19.0824 13.5933 19.0824H21.2247C21.6533 19.0824 22.0008 18.7349 22.0008 18.3064V16.2095C22.0008 10.9531 15.8681 8.17017 11.9134 11.4108Z"
                fill="#434343"
              />
            </svg>
            <span>{{ players }}</span>
          </div>
          <div class="history-stats__list-item">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.36914 20.1208H4.56417V22H1.36914V20.1208Z"
                fill="#434343"
              />
              <path
                d="M17.4355 20.1208H20.6306V22H17.4355V20.1208Z"
                fill="#434343"
              />
              <path
                d="M20.7109 0H1.28906C0.577113 0 0 0.577113 0 1.28906V17.5457C0 18.2576 0.577113 18.8347 1.28906 18.8347H20.7109C21.4229 18.8347 22 18.2576 22 17.5457V1.28906C22 0.577113 21.4229 0 20.7109 0ZM19.906 16.7407H2.09404V2.09404H19.9059V16.7407H19.906Z"
                fill="#434343"
              />
              <path
                d="M7.53051 8.00793C6.75334 8.00793 6.12109 8.64022 6.12109 9.41735C6.12109 10.1945 6.75334 10.8268 7.53051 10.8268C8.30765 10.8268 8.93993 10.1945 8.93993 9.41735C8.93993 8.64022 8.30765 8.00793 7.53051 8.00793Z"
                fill="#434343"
              />
              <path
                d="M13.079 8.69263H10.1309C10.1953 8.92341 10.2305 9.16632 10.2305 9.41738C10.2305 9.66845 10.1953 9.91135 10.1309 10.1421H13.079C13.4786 10.1421 13.8037 9.81704 13.8037 9.41738C13.8037 9.01773 13.4786 8.69263 13.079 8.69263Z"
                fill="#434343"
              />
              <path
                d="M18.6166 3.38306H3.38281V15.4516H18.6166V3.38306H18.6166ZM13.0778 11.4311H9.32445C8.84728 11.8566 8.2189 12.1158 7.53084 12.1158C6.04288 12.1158 4.83236 10.9053 4.83236 9.41733C4.83236 7.92936 6.04288 6.71885 7.53084 6.71885C8.2189 6.71885 8.84728 6.97808 9.32445 7.40351H13.0778C14.1882 7.40351 15.0916 8.30689 15.0916 9.41733C15.0916 10.5278 14.1882 11.4311 13.0778 11.4311Z"
                fill="#434343"
              />
            </svg>
            <span class="sosiska-wrap"
              >{{ $root.conv(bank).toFixed(2) }} <Sosiska
            /></span>
          </div>
          <div class="history-stats__list-item">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.2506 0.345204C20.99 0.108016 20.5841 0.130918 20.3349 0.380094L20.1377 0.577364L19.6953 0.135086C19.531 -0.029226 19.2635 -0.0487338 19.0889 0.104665C18.8976 0.272715 18.8906 0.564387 19.0677 0.741547L19.5206 1.19439L18.782 1.93298L18.5196 1.67057C18.264 1.41495 17.8496 1.41495 17.594 1.67057L12.9249 6.33973C12.7397 6.52488 12.6895 6.79314 12.7725 7.02418L12.3072 7.48949C12.2356 7.46315 12.1595 7.44862 12.0817 7.44862C11.9082 7.44862 11.7417 7.51759 11.6189 7.64031L10.8863 8.37292L10.196 7.68259C9.81769 7.30425 9.21969 7.27383 8.805 7.61178L6.13475 9.78728C5.90728 9.97261 5.76827 10.247 5.75336 10.54C5.73845 10.833 5.84888 11.1201 6.05633 11.3275L6.99404 12.2652L6.26142 12.9979C6.1387 13.1206 6.06974 13.2871 6.06974 13.4606C6.06974 13.5399 6.08478 13.6173 6.11202 13.6901L5.65913 14.1376C5.42804 14.0545 5.15979 14.1048 4.97468 14.2899L0.7249 18.5397C0.46481 18.7998 0.470052 19.2231 0.736544 19.4766L3.19917 21.8196C3.4874 22.0939 3.95155 22.0497 4.18281 21.7259L7.68214 16.8277C7.86033 16.5677 7.82798 16.2177 7.6051 15.9948L7.24859 15.6383L7.6121 15.2741L8.18758 15.8496L9.28269 19.1121C9.37408 19.3843 9.6282 19.5584 9.90285 19.5584C9.95974 19.5584 10.0175 19.5509 10.075 19.5353L12.8848 18.7707C13.0977 18.7128 13.2754 18.558 13.3468 18.3494C13.4483 18.0526 13.3279 17.735 13.0703 17.5771L12.799 17.4108L11.9546 14.3073L12.7186 13.6589C13.8749 14.4788 15.2655 14.9273 16.6956 14.9273C16.9388 14.9273 17.1833 14.9143 17.4278 14.888C17.6692 14.8621 17.8751 14.7015 17.9632 14.4753L18.7089 12.5609C18.7918 12.348 18.7577 12.1073 18.6189 11.9258C18.4801 11.7443 18.2568 11.6483 18.0295 11.6726C16.9215 11.7909 15.818 11.5706 14.8555 11.0656C14.86 11.0221 14.8636 10.9784 14.8654 10.9344C14.8896 10.3402 14.6624 9.75824 14.2419 9.33774L13.8956 8.99142L14.2732 8.61372L14.9211 9.2616C15.0442 9.38471 15.2109 9.45329 15.3839 9.45329C15.3974 9.45329 15.4111 9.45286 15.4247 9.452C15.6121 9.44031 15.7854 9.34866 15.9006 9.20037L19.9841 3.94551C20.1866 3.68495 20.1634 3.31447 19.9301 3.08115L19.7075 2.85853L21.2735 1.29254C21.5365 1.02957 21.5289 0.598418 21.2506 0.345204ZM9.75023 13.2882L9.41499 13.6234C9.32978 13.7086 9.21815 13.7512 9.10647 13.7512C8.99479 13.7512 8.88312 13.7087 8.79795 13.6234C8.62758 13.4531 8.62758 13.1768 8.798 13.0064L9.13324 12.6712C9.30365 12.5008 9.57994 12.5008 9.75027 12.6712C9.92064 12.8416 9.92064 13.1179 9.75023 13.2882ZM7.91959 11.3397L7.1932 10.6133L9.44279 8.78053L9.96077 9.29851L7.91959 11.3397Z"
                fill="#434343"
              />
            </svg>
            <span>{{ skins }}</span>
          </div>
        </div>
      </div>

      <div class="history-list" v-if="data.bets.length !== 0">
        <div
          class="history-list__item"
          :class="{
            win: bet.win !== null,
            lose: bet.win == null,
          }"
          v-for="bet in data.bets"
          :key="bet.id"
        >
          <img
            :src="'https://avatars.akamai.steamstatic.com/' + bet.user.avatar + '_medium.jpg'"
            alt=""
            class="history-list__item--avatar"
          />
          <div class="history-list__item--skins">
            <img
              v-for="skin in bet.items.slice(0, 2)"
              :src="$root.steamUrl + skin.image"
              :key="skin.id"
              :alt="skin.marketName"
              class="history-list__item--skin"
            />
            <div
              class="history-list__item--more"
              v-if="bet.items.length > 2"
            >
              +{{ bet.items.length - 2 }}
            </div>
          </div>
          <div class="history-list__item--bet sosiska-wrap">
            {{ $root.conv(bet.sum).toFixed(2) }} <Sosiska />
          </div>
          <div class="history-list__item--state" v-if="bet.win === null">
            {{ data.multiplier }}x
          </div>
          <div class="history-list__item--state" v-else>
            <span class="sosiska-wrap"
              >{{ $root.conv(bet.win) }} <Sosiska
            /></span>
            <span>{{ bet.multiplier }}x</span>
            <img :src="$root.steamUrl + bet.winItem.image" alt="" />
          </div>
        </div>
      </div>
      <div v-else class="history-list__none">{{ $t("content.noBets") }}</div>
    </div>

    <Fair
      :modal.sync="$root.fair"
      :hash="data.hash"
      :crash="data.multiplier"
      :salt="data.secret"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: null,
      players: 0,
      bank: 0,
      skins: 0,
    };
  },
  computed: {
    ...mapState({ user: "user" }),
  },
  created() {
    this.$root
      .request("GET", "/api/game/1/" + this.$route.params.id)
      .then((resp) => {
        this.data = resp;
        this.players = this.data.bets.length;
        this.data.bets.forEach((element) => {
          this.skins = this.skins + element.items.length;
          element.items.forEach((item) => {
            this.bank = this.bank + item.price;
          });
        });
        this.data.bets.sort((a, b) => b.sum - a.sum);
        if (this.user !== null) {
          this.data.bets.sort((e) => {
            if (e.user.id === this.user.id) {
              return -1;
            } else {
              return 0;
            }
          });
        }
      });
  },
};
</script>


<style lang="scss" scoped>
.history {
  border-radius: 20px;
  overflow: hidden;
  &-header {
    background: rgba(48, 48, 48, 0.8);
    height: 50px;
    display: flex;
    box-shadow: 0px 0px 4px rgb(0 0 0 / 20%);
    padding: 0 20px 0 15px;
    align-items: center;
    &__back {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      background: #181818;
      border-radius: 10px;
      cursor: pointer;
      transition: all 300ms;
      &:hover {
        opacity: 0.7;
      }
    }

    &__title {
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
    }

    &__date {
      font-size: 12px;
      line-height: 14px;
      color: #ffffff;
      margin-left: auto;
    }

    &__truefact {
      height: 30px;
      padding: 0 20px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #181818;
      border-radius: 10px;
      cursor: pointer;
      transition: all 300ms;
      color: #fff;
      font-size: 12px;
      line-height: 15px;
      text-transform: uppercase;
      &:hover {
        opacity: 0.7;
      }
    }
  }

  &-body {
    position: relative;
    height: calc(100vh - 70px);
    padding: 20px;
    background: rgba(0, 0, 0, 0.25);
  }

  &-stats {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
    flex-wrap: wrap;
    &__hash {
      background: #212121;
      flex: 1;
      height: 50px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding: 0 20px;

      &-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }

      &-title {
        font-size: 16px;
        line-height: 18px;
        font-weight: 500;
      }

      &-subtitle {
        font-size: 12px;
        line-height: 14px;
        margin-right: 20px;
      }

      &-check {
        height: 30px;
        padding: 0 20px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #181818;
        border-radius: 10px;
        cursor: pointer;
        transition: all 300ms;
        color: #fff;
        font-size: 12px;
        line-height: 15px;
        text-transform: uppercase;
        margin-left: auto;
        &:hover {
          opacity: 0.7;
        }
      }
    }

    &__list {
      display: flex;
      gap: 10px;
      height: 50px;

      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #212121;
        padding: 0 20px;
        border-radius: 10px;
        svg {
          margin-right: 15px;
        }

        span {
          font-size: 14px;
          line-height: 16px;
          color: #fff;
        }
      }
    }
  }

  &-list {
    padding-right: 3px;
    overflow-y: auto;
    height: calc(100vh - 180px);
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
    &__item {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      background: #212121;
      border-radius: 10px;

      &:not(.lose, .win) {
        .history-list__item--state {
          background: #1f1f1f;
          border: 1px solid #de3720;
          box-sizing: border-box;
          border-radius: 10px;
          width: 85px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          text-align: center;
          color: #ffffff;
          text-transform: uppercase;
        }
      }

      &.win {
        background: linear-gradient(
            270deg,
            rgba(114, 242, 53, 0.29) -27.01%,
            rgba(114, 242, 53, 0) 49.94%
          ),
          #212121;
        .history-list__item--state {
          display: flex;
          align-items: center;
          span {
            &:first-child {
              font-weight: normal;
              font-size: 12px;
              line-height: 14px;
              text-align: center;
              color: #72f235;
              margin-right: 15px;
            }

            &:nth-child(2) {
              background: linear-gradient(
                  270deg,
                  #6dd32d -67.06%,
                  rgba(109, 211, 45, 0) 68.82%
                ),
                rgba(114, 242, 53, 0.3);
              border-radius: 10px;
              width: 85px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: normal;
              font-size: 12px;
              line-height: 14px;
              text-align: center;
              color: #72f235;
              margin-right: 10px;
            }
          }

          img {
            width: 36px;
            height: 36px;
          }
        }
      }

      &.lose {
        background: linear-gradient(
            270deg,
            rgba(242, 53, 53, 0.29) -27.01%,
            rgba(242, 53, 53, 0) 49.94%
          ),
          #212121;
        .history-list__item--state {
          background: rgba(222, 55, 32, 0.3);
          border-radius: 10px;
          width: 85px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          text-align: center;
          color: #de3720;
        }
      }

      &:not(:last-child) {
        margin-bottom: 10px;
      }
      &--avatar {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        margin-right: 20px;
      }

      &--skins {
        display: flex;
        gap: 7px;
        margin-right: 24px;
      }

      &--skin {
        width: 36px;
        height: 36px;
      }

      &--more{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #de3720;
        font-size: 14px;
        font-weight: 500;
      }

      &--bet {
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: #747474;
      }

      &--state {
        margin-left: auto;
      }
    }

    &__none {
      font-size: 20px;
      line-height: 22px;
      text-align: center;
      text-transform: uppercase;
    }
  }

  @media screen and (max-width: 900px) {
    .history {
      &-header {
        &__date {
          display: none;
        }

        &__truefact {
          display: none;
        }
      }
      &-body {
        margin-bottom: 60px;
        border-radius: 0 0 20px 20px;
      }

      &-stats {
        &__hash {
          width: 100%;
          flex-wrap: wrap;
          height: unset;
          padding: 10px;
          gap: 10px;
          &-wrapper {
            justify-content: center;
            gap: 10px;
          }

          &-subtitle {
            font-size: 10px;
            line-height: 12px;
            text-align: center;
            word-break: break-all;
            margin-right: 0;
          }

          &-check {
            margin: 0 auto;
          }
        }

        &__list {
          width: 100%;
          &-item {
            flex: 1;
          }
        }
      }

      &-list {
        &__item {
          &--state {
            img {
              display: none;
            }
            span:nth-child(2) {
              margin: 0 !important;
            }
          }

          &--skins {
            margin-right: 15px;
            img:not(:first-child) {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>