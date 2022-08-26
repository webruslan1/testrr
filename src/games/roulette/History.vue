<template>
  <div class="history" v-if="data">
    <div class="history-header">
      <router-link to="/roulette" class="history-header__back">
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
        >{{$t('content.history')}} - #{{ $route.params.id }}</span
      >
      <div class="history-header__date">
        {{ $root.formatDate(data.finishedAt) }}
      </div>
      <div class="history-header__truefact" @click="$root.fair = true">
        {{$t('content.true')}}
      </div>
    </div>
    <div class="history-body">
      <div class="history-stats">
        <div class="history-stats__hash">
          <div class="history-stats__hash-wrapper">
            <div class="history-stats__hash-title">{{$t('content.checkTrue')}}</div>
            <div class="history-stats__hash-subtitle">{{$t('content.hash')}} {{ data.hash }}</div>
          </div>
          <div class="history-stats__hash-check" @click="$root.fair = true">
            {{$t('content.check')}}
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
            <span class="sosiska-wrap">{{ $root.conv(bank).toFixed(2) }} <Sosiska /></span>
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
          class="roulette-right__item"
          v-for="(coef, idx) in $root.settings.games.roulette.multipliers"
          :key="coef.coefficient"
          :class="{
            lose: coef.coefficient !== winCef,
            win: coef.coefficient == winCef,
          }"
        >
          <button class="roulette-right__item-header">
            <span>x{{ coefList[idx] }}</span>
          </button>
          <div class="roulette-right__item-stats">
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9939 9.41365C15.1979 10.2868 16.6667 11.7827 16.6667 13.5833C16.6667 15.0998 15.6431 16.1282 13.8944 16.6971C12.5308 17.1407 10.685 17.3333 8.33333 17.3333C5.98171 17.3333 4.13587 17.1407 2.77224 16.6971C1.02359 16.1282 0 15.0998 0 13.5833C0 11.7827 1.46876 10.2868 3.67274 9.41365C4.87566 10.7707 6.60744 11.5 8.33333 11.5C10.0592 11.5 11.762 10.7707 12.9939 9.41365ZM8.33333 0.666672C10.8646 0.666672 12.9167 2.7187 12.9167 5.25001C12.9167 7.78131 10.8646 9.83334 8.33333 9.83334C5.80203 9.83334 3.75 7.78131 3.75 5.25001C3.75 2.7187 5.80203 0.666672 8.33333 0.666672Z"
                fill="#7B7B7B"
              />
            </svg>
            <div class="roulette-right__item-stats--count">
              {{ allBets[coef.coefficient].length }}
            </div>
            <div class="roulette-right__item-stats--sum sosiska-wrap">
              {{ $root.conv(allBets[coef.coefficient].sum) }} <Sosiska />
            </div>
          </div>

          <transition name="fade" mode="out-in">
            <transition-group
              name="list"
              class="roulette-right__item-players"
              v-if="allBets[coef.coefficient].length > 0"
              tag="div"
            >
              <div
                class="roulette-right__item-players--item"
                v-for="item in allBets[coef.coefficient]"
                :key="item.id"
              >
                <img
                :src="'https://avatars.akamai.steamstatic.com/' + item.user.avatar + '_medium.jpg'"
                  alt=""
                  class="roulette-right__item-players--avatar"
                />
                <div class="roulette-right__item-players--name">
                  {{ item.user.userName }}
                </div>
                <div class="roulette-right__item-players--sum sosiska-wrap" v-if="coef.coefficient == winCef">
                  +{{ $root.conv(item.sum * winCef) }} <Sosiska />
                </div>
                <div class="roulette-right__item-players--sum sosiska-wrap" v-else>
                  {{ $root.conv(item.sum) }} <Sosiska />
                </div>
              </div>
            </transition-group>

            <div class="roulette-right__item-players clear" v-else>
              <span>{{$t('content.noBets')}}</span>
              <svg
                width="30"
                height="26"
                viewBox="0 0 30 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.6635 3.0726C19.9553 3.0726 20.226 1.19772 18.9084 0.868444C18.8245 0.852845 18.7545 0.841476 18.6635 0.841476H10.8769C9.58507 0.841476 9.31442 2.71633 10.632 3.04559C10.7159 3.06119 10.7858 3.0726 10.8769 3.0726H18.6635ZM22.6414 3.07219C21.3495 3.07219 21.0788 1.1973 22.3964 0.868033C22.4803 0.852433 22.5503 0.841064 22.6414 0.841064H24.8725C27.2954 0.841064 29.3605 2.90605 29.3605 5.32902V7.56059C29.3605 8.85239 27.4856 9.12304 27.1564 7.80553C27.1407 7.72163 27.1294 7.65166 27.1294 7.56059C27.1294 6.34806 27.4067 4.93485 26.6546 3.9504C25.5955 2.70329 24.307 3.07219 22.6414 3.07219ZM22.6414 23.7632C21.3495 23.7632 21.0788 25.6381 22.3964 25.9674C22.4803 25.983 22.5503 25.9944 22.6414 25.9944H24.8725C27.2954 25.9944 29.3605 23.9294 29.3605 21.5064V19.2748C29.3605 17.9831 27.4856 17.7124 27.1564 19.0299C27.1407 19.1138 27.1294 19.1838 27.1294 19.2748C27.1294 20.4874 27.4067 21.9006 26.6546 22.8851C25.5955 24.1321 24.307 23.7632 22.6414 23.7632ZM6.88513 23.7632C8.17693 23.7632 8.44763 25.6381 7.1301 25.9674C7.04621 25.983 6.97619 25.9944 6.88513 25.9944H4.654C2.23105 25.9944 0.166016 23.9294 0.166016 21.5064V19.2748C0.166016 17.9831 2.0409 17.7124 2.37018 19.0299C2.38578 19.1138 2.39714 19.1838 2.39714 19.2748C2.39714 20.4874 2.11976 21.9006 2.8719 22.8851C3.93097 24.1321 5.21938 23.7632 6.88513 23.7632ZM6.88513 3.0726C8.17693 3.0726 8.44763 1.19772 7.1301 0.868444C7.04621 0.852845 6.97619 0.841476 6.88513 0.841476H4.654C2.23105 0.841476 0.166016 2.90651 0.166016 5.32946V7.56101C0.166016 8.8528 2.0409 9.12346 2.37018 7.80594C2.38578 7.72204 2.39714 7.65207 2.39714 7.56101C2.39714 6.34847 2.11976 4.93525 2.8719 3.95081C3.93097 2.70371 5.21938 3.0726 6.88513 3.0726ZM2.39714 11.5583C2.39714 10.2664 0.522298 9.99574 0.193024 11.3133C0.177425 11.3972 0.166016 11.4672 0.166016 11.5583V15.2995C0.166016 16.5914 2.0409 16.8621 2.37018 15.5445C2.38578 15.4606 2.39714 15.3906 2.39714 15.2995V11.5583ZM10.8773 23.7519C9.58553 23.7519 9.31483 25.6267 10.6324 25.956C10.7163 25.9716 10.7862 25.983 10.8773 25.983H18.6639C19.9557 25.983 20.2264 24.1081 18.9089 23.7789C18.825 23.7632 18.755 23.7519 18.6639 23.7519H10.8773ZM27.1437 15.2992C27.1437 16.5909 29.0185 16.8616 29.3478 15.5441C29.3634 15.4602 29.3748 15.3902 29.3748 15.2992V11.5578C29.3748 10.266 27.4999 9.99535 27.1707 11.3128C27.155 11.3967 27.1437 11.4667 27.1437 11.5578V15.2992Z"
                  fill="#4B4B4B"
                />
              </svg>
            </div>
          </transition>
        </div>
      </div>
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
      winCef: null,
      allBets: [],
      coefList:[2,4,6,11,21],
      numb: {
        0: { min: 354, max: 366, coef: 21 },
        1: { min: 368, max: 380, coef: 2 },
        2: { min: 382, max: 394, coef: 4 },
        3: { min: 397, max: 408, coef: 2 },
        4: { min: 412, max: 423, coef: 6 },
        5: { min: 426, max: 438, coef: 2 },
        6: { min: 440, max: 452, coef: 4 },
        7: { min: 454, max: 466, coef: 2 },
        8: { min: 469, max: 481, coef: 11 },
        9: { min: 483, max: 495, coef: 2 },
        10: { min: 498, max: 510, coef: 4 },
        11: { min: 512, max: 524, coef: 6 },
        12: { min: 526, max: 538, coef: 2 },
        13: { min: 542, max: 553, coef: 6 },
        14: { min: 555, max: 568, coef: 2 },
        15: { min: 570, max: 582, coef: 4 },
        16: { min: 584, max: 596, coef: 2 },
        17: { min: 600, max: 611, coef: 11 },
        18: { min: 613, max: 625, coef: 2 },
        19: { min: 628, max: 640, coef: 4 },
        20: { min: 642, max: 654, coef: 2 },
        21: { min: 657, max: 668, coef: 6 },
        22: { min: 671, max: 683, coef: 2 },
        23: { min: 686, max: 697, coef: 4 },
        24: { min: 699, max: 712, coef: 2 },
      },
      winCefList:[2,4,6,11,21]
    };
  },
  computed: {
    ...mapState({ user: "user" }),
  },
  created() {
    this.$root
      .request("GET", "/api/game/2/" + this.$route.params.id)
      .then((resp) => {
        this.data = resp;
        this.players = this.data.bets.length;
        this.data.bets.forEach((element) => {
          this.skins = this.skins + element.items.length;
          element.items.forEach((item) => {
            this.bank = this.bank + item.price;
          });
        });

        for (
          var index = 0;
          index < this.$root.settings.games.roulette.multipliers.length;
          index++
        ) {
          var element = this.$root.settings.games.roulette.multipliers[index];
          this.allBets[element.coefficient] = this.data.bets.filter(
            (item) => item.coefficient === element.coefficient
          );
          this.allBets[element.coefficient].sum = 0;
          this.allBets[element.coefficient].forEach((el) => {
            this.allBets[element.coefficient].sum += el.sum;
          });
        }
        this.winCef = this.winCefList[resp.multiplier];
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
    position: relative;
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    padding: 20px 18px 40px 20px;
    gap: 20px;
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
    .roulette-right__item {
      &.lose {
        opacity: 0.5;
        .roulette-right__item-players--sum {
          color: #cc3a3a;
        }
      }
      &.win {
        .roulette-right__item-players--sum {
          color: #59cc4f;
        }
      }
      flex: 1;
      &:nth-child(1) {
        .roulette-right__item-header {
          background: #ffc700;
        }
      }
      &:nth-child(2) {
        .roulette-right__item-header {
          background: #59cc4f;
        }
      }
      &:nth-child(3) {
        .roulette-right__item-header {
          background: #4f85cc;
        }
      }
      &:nth-child(4) {
        .roulette-right__item-header {
          background: #ff00f2;
        }
      }
      &:nth-child(5) {
        .roulette-right__item-header {
          background: #cc3a3a;
        }
      }
      &-header {
        height: 40px;
        opacity: 0.8;
        transition: all 300ms;
        padding-left: 10px;
        display: flex;
        align-items: center;
        border-radius: 10px;
        margin-bottom: 10px;
        width: 100%;
        span {
          font-weight: 800;
          font-size: 14px;
          line-height: 17px;
          /* identical to box height */
          color: #ffffff;
          text-transform: uppercase;
        }
      }

      &-stats {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 10px;
        background: #212121;
        border-radius: 10px;
        margin-bottom: 10px;

        &--count {
          margin-left: 7px;
          font-weight: 600;
          font-size: 12px;
          line-height: 14px;
          color: #ffffff;
        }

        &--sum {
          margin-left: auto;
          font-weight: 600;
          font-size: 12px;
          line-height: 14px;
          color: #ffffff;
        }
      }

      &-players {
        height: calc(100vh - 340px);
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        &.clear {
          border: 1px dashed #4b4b4b;
          border-radius: 10px;
          height: calc(100vh - 340px);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          span {
            font-weight: bold;
            font-size: 12px;
            line-height: 14px;
            color: #4b4b4b;
            margin-bottom: 5px;
          }
        }

        &--item {
          background: #212121;
          border-radius: 10px;
          height: 50px;
          display: flex;
          align-items: center;
          padding: 0 10px 0 12px;
          &:not(:last-child) {
            margin-bottom: 10px;
          }
        }

        &--avatar {
          width: 30px;
          height: 30px;
          margin-right: 12px;
          border-radius: 5px;
        }

        &--name {
          display: inline-block;
          font-weight: 500;
          font-size: 12px;
          line-height: 14px;
          width: 50px;
          color: #7b7b7b;
          padding: 0;
          overflow: hidden;
          text-decoration: none;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &--sum {
          font-weight: 600;
          font-size: 12px;
          line-height: 14px;
          color: #ffffff;
          margin-left: auto;
        }
      }
    }
  }
}

@media screen and (max-width: 1750px) {
  .history {
    &-body {
      height: unset;
    }
    &-list {
      margin-bottom: 10px;
      flex-wrap: wrap;
      height: unset;
      .roulette-right__item {
        min-width: 200px;
      }

      .roulette-right__item-players {
        height: unset;
        min-height: 150px;
        max-height: 300px;
      }

      .roulette-right__item-players.clear {
        height: unset;
        min-height: 150px;
        max-height: 300px;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .history {
    margin-bottom: 60px;
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
      padding: 10px;
      padding-bottom: 50px;
      gap: 15px;
    }

    .roulette-right__item {
      min-width: 160px;
    }

    .roulette-right__item-players.clear {
      min-height: 150px;
    }
  }
}
</style>