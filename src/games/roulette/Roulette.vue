<template>
  <div class="roulette" v-if="loading == false">
    <div class="roulette-left">
      <div class="roulette-game">
        <img
          class="wheel"
          src="/img/roulette/wheel.png"
          :style="{
            transform: `translateX(-50%) rotate(${wheel}deg)`,
            transition: `${tn}ms`,
          }"
          alt=""
        />
        <img src="/img/roulette/arrow.png" alt="" class="arrow" />
        <div class="roulette__info" v-if="status !== 1">
          <div v-if="status == 0">
            {{ $t("content.roulette.start") }} {{ this.mp }}
          </div>
          <div v-if="status == 2">
            {{ $t("content.roulette.end") }} {{ this.mp }}
          </div>
        </div>
        <div class="roulette__info" v-if="status == 1 && rouletteHasStart">
          <div>{{ $t("content.roulette.run") }}</div>
        </div>
      </div>
      <div class="roulette-history">
        <router-link
          :to="'/roulette/' + item.id"
          class="roulette-history__item"
          v-for="(item, idx) in history"
          :class="{
            y: item.multiplier === 0,
            g: item.multiplier === 1,
            b: item.multiplier === 2,
            p: item.multiplier === 3,
            r: item.multiplier === 4,
          }"
          :key="idx"
        ></router-link>
      </div>
      <Inventory small />
    </div>
    <div class="roulette-right">
      <div
        class="roulette-right__item"
        v-for="(coef, idx) in $root.settings.games.roulette.multipliers"
        :key="coef.coefficient"
        :class="{
          lose: status === 2 && coef.coefficient !== winCef,
          win: status === 2 && coef.coefficient == winCef,
        }"
      >
        <button
          :disabled="status !== 0 || user == null || Object.keys(userInventory.selected.items).length == 0"
          class="roulette-right__item-header"
          @click="createBet(idx)"
        >
          <span>{{ coefList[idx] }}x</span>
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
            {{ allBets[idx].bets ? allBets[idx].bets.length : 0 }}
          </div>
          <div class="roulette-right__item-stats--sum sosiska-wrap">
            {{ $root.conv(allBets[idx].sum) }} <Sosiska />
          </div>
        </div>

        <transition name="fade" mode="out-in">
          <transition-group
            name="list"
            class="roulette-right__item-players"
            v-if="allBets[idx].bets.length > 0"
            tag="div"
          >
            <div
              class="roulette-right__item-players--item"
              v-for="item in allBets[idx].bets"
              :key="item.id"
            >
              <img
                @click="$router.push(`/user/${item.user.uuid}`)"
                :src="
                  'https://avatars.akamai.steamstatic.com/' +
                  item.user.avatar +
                  '_medium.jpg'
                "
                alt=""
                class="roulette-right__item-players--avatar"
              />
              <div class="roulette-right__item-players--name">
                {{ item.user.userName }}
              </div>
              <div
                class="roulette-right__item-players--sum sosiska-wrap"
                v-if="coef.coefficient == winCef && status == 2"
              >
                +{{ $root.conv(item.sum * winCef) }} <Sosiska />
              </div>
              <div
                class="roulette-right__item-players--sum sosiska-wrap"
                v-else
              >
                {{ $root.conv(item.sum) }} <Sosiska />
              </div>
            </div>
          </transition-group>

          <div class="roulette-right__item-players clear" v-else>
            <span>{{ $t("content.noBets") }}</span>
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

      <div class="footer">
        <div class="footer-hash" @click="$root.fair = true">
          {{ $t("content.hash") }} <span>{{ hash }}</span>
        </div>
        <div class="footer-true" @click="$root.fair = true">
          <img src="/img/true.svg" width="16px" height="18px" alt="True Fact" />
          <span>{{ $t("content.true") }}</span>
        </div>
      </div>
    </div>
    <Fair
      :modal.sync="$root.fair"
      :hash="hash"
      :crash="dataMulti"
      :salt="salt"
    />
  </div>
  <Loader v-else />
</template>


<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      bets: [],
      hash: null,
      wheel: 0,
      salt: null,
      dataMulti: null,
      history: null,
      status: null,
      isWin: false,
      rouletteHasStart: false,
      isPlay: false,
      tn: 0,
      mp: null,
      allBets: [
        { bets: [], sum: 0 },
        { bets: [], sum: 0 },
        { bets: [], sum: 0 },
        { bets: [], sum: 0 },
        { bets: [], sum: 0 },
      ],
      loading: true,
      winCef: null,
      coefList: [2, 4, 6, 11, 21],
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
    ...mapState({ userInventory: "userInventory", user: "user" }),
  },
  beforeDestroy() {
    this.$root.stopSound();
    this.clearSelect();
  },
  async mounted() {
    await this.$root.request("GET", "/api/game/2").then((resp) => {
      this.history = resp.history;
      this.hash = this.history[0].hash;
      this.dataMulti = this.history[0].multiplier;
      this.salt = this.history[0].secret;
      //
      this.bets = resp.current.bets;
      this.hash = resp.current.hash;
      this.status = resp.current.status;

      if (resp.current.status == 2) {
        this.wheelToNum(resp.current.multiplier, 0);
      } else if (resp.current.status == 0) {
        this.wheelToNum(this.history[0].multiplier, 0);
      } else {
        this.rouletteHasStart = true;
      }

      this.updateBets(this.bets);
    });
    var intr = setInterval(() => {
      if (this.$socket.connected) {
        this.loading = false;
        clearInterval(intr);
      }
    }, 500);
  },
  sockets: {
    gameRouletteInitialized() {
      this.bets = [];
      this.updateBets([]);
      this.status = 0;
      this.isPlay = false;
      this.isWin = false;
    },
    gameRouletteBlocked() {
      this.$root.playSound("rouletteStart");
      this.status = 1;
    },
    gameRouletteMultiplier(mess) {
      this.wheelToNum(mess, this.$root.settings.games.roulette.status1TimeMs);
    },
    gameRouletteFinished(mess) {
      this.history.unshift(mess);
      this.history.pop();
      this.winCef = this.winCefList[mess.multiplier];
      this.status = 2;
      this.hash = mess.hash;
      this.dataMulti = mess.multiplier;
      this.salt = mess.secret;
      this.mp = mess.multiplier;
      this.rouletteHasStart = false;
      if (this.isPlay && !this.isWin) {
        this.$root.playSound("rouletteLose");
      }
    },
    gameRouletteTimer(mess) {
      this.mp = mess;
    },
    gameRouletteBetNew(mess) {
      if (this.user) {
        if (mess.user.uuid === this.user.uuid) {
          this.isPlay = true;
        }
      }

      var item = mess;
      this.bets.push(item);
      this.allBets[item.multiplier].bets.push(item);
      this.allBets[item.multiplier].sum += item.sum;
    },
    gameRouletteBetUpdate(data) {
      this.bets.forEach((item) => {
        if (item.id == data.id) {
          this.allBets[item.multiplier].bets = this.allBets[
            item.multiplier
          ].bets.map((el) => {
            if (el.id == data.id) {
              el.win = data.win;
              return el;
            } else {
              return el;
            }
          });
        }
      });
      this.$forceUpdate();
      //  if (data.id === item.id && this.user.uuid == item.user.uuid) {
      //       this.isWin = true;
      //       this.$root.playSound("win");
      //     }
    },
  },
  methods: {
    ...mapActions({
      getInventory: "getInventory",
      removeInventoryItems: "removeInventoryItems",
      clearSelect: "clearSelect",
    }),
    async wheelToNum(num, sec) {
      this.tn = 0;
      this.wheel = this.wheel - 1080;
      this.winCef = this.numb[num].coef;
      var srNum =
        this.numb[num].min + (this.numb[num].max - this.numb[num].min) / 2;

      setTimeout(() => {
        this.tn = sec;
        this.wheel = srNum + 720;
      }, 100);
    },
    async createBet(mp) {
      if(this.userInventory.selected.price > this.$root.settings.games.roulette.multipliers[mp].maxBet){
        this.$root.showNotify('error', this.$t('game.roulette.bet.too_big'))
        return false
      }
      await this.$root
        .request("POST", "/api/game/2/bet", {
          multiplier: mp,
          itemIds: [
            ...Object.keys(this.userInventory.selected.items).map((item) =>
              parseInt(item)
            ),
          ],
        })
        .then(() => {
          this.removeInventoryItems([
            ...Object.keys(this.userInventory.selected.items).map((item) =>
              parseInt(item)
            ),
          ]);
          this.clearSelect();
        });
    },
    updateBets(bets) {
      if (bets.length === 0) {
        this.allBets = [];
        for (
          var idx = 0;
          idx < this.$root.settings.games.roulette.multipliers.length;
          idx++
        ) {
          this.allBets.push({ bets: [], sum: 0 });
        }
      } else {
        this.bets.forEach((item) => {
          this.allBets[item.multiplier].bets.push(item);
          this.allBets[item.multiplier].sum += item.sum;
        });
      }
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.maininfo_roulete {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
}
.list-enter-active,
.list-leave-active {
  transition: all 300ms;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.footer {
  position: absolute;
  display: flex;
  left: 0;
  bottom: 0;
  gap: 10px;
  &-hash {
    padding: 5px 9px 5px 9px;
    background: #212121;
    border-radius: 0px 10px;
    font-weight: 300;
    font-size: 10px;
    line-height: 12px;
    color: #6a6a6a;
    transition: all 300ms;
    opacity: 0.8;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
    span {
      color: #aa4235;
    }
  }

  &-true {
    display: flex;
    padding: 5px 10px;
    background: #212121;
    border-radius: 10px 10px 0px 0px;
    align-items: center;
    transition: all 300ms;
    opacity: 0.8;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
    img {
      margin-right: 5px;
    }

    span {
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      color: #425539;
      text-shadow: 0px 0px 4px rgba(54, 77, 43, 0.5);
    }
  }
}
.roulette {
  display: flex;
  gap: 20px;
  &-left {
    width: 500px;
  }
  &-game {
    height: 260px;
    background: rgba(24, 24, 24, 0.01);
    box-shadow: inset 0px 0px 50px #181818;
    border-radius: 10px;
    margin-bottom: 10px;
    position: relative;
  }

  &__info {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    & > div {
      font-size: 20px;
      line-height: 22px;
      font-weight: 600;
      color: #fff;
    }
  }

  &-history {
    display: flex;
    gap: 10px;
    height: 28px;
    margin-bottom: 10px;

    &__item {
      width: 41px;
      border-radius: 5px;
      opacity: 0.8;
      cursor: pointer;
      transition: all 300ms;
      &.y {
        background: #ffc700;
      }

      &.g {
        background: #59cc4f;
      }

      &.b {
        background: #4f85cc;
      }

      &.p {
        background: #ff00f2;
      }

      &.r {
        background: #cc3a3a;
      }
      &:hover {
        opacity: 1;
      }
    }
  }

  &-right {
    position: relative;
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    padding: 20px 18px 40px 20px;
    gap: 20px;
    &__item {
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
        cursor: pointer;
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
        &:hover {
          opacity: 1;
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
        height: calc(100vh - 180px);
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        &.clear {
          border: 1px dashed #4b4b4b;
          border-radius: 10px;
          height: calc(100vh - 180px);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          span {
            font-weight: bold;
            font-size: 12px;
            line-height: 14px;
            margin-bottom: 5px;
            color: #4b4b4b;
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

.roulette-game {
  position: relative;
  background: url("/img/roulette/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;

  .arrow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0px;
  }

  .wheel {
    overflow: hidden;
    width: 500px;
    height: 500px;
    position: absolute;
    top: 30px;
    left: 50%;
    transition-timing-function: ease-in;
  }
}

@media screen and (max-width: 1750px) {
  .roulette {
    flex-direction: column;

    &-left {
      width: 100%;
      gap: 20px;

      .inventory {
        width: 100%;
      }
    }

    &-game {
      flex: 1;
      min-width: 355px;
    }
    &-right {
      margin-bottom: 10px;
      flex-wrap: wrap;

      &__item {
        &-players {
          height: calc(100vh - 640px);

          &.clear {
            height: calc(100vh - 640px);
          }
        }
      }
    }
  }
  .roulette-right__item {
    min-width: 200px;
  }

  .roulette-right__item-players.clear {
    height: unset;
    min-height: 300px;
  }
}

@media screen and (max-width: 900px) {
  .roulette {
    margin-bottom: 60px;

    &-right {
      padding: 10px;
      padding-bottom: 50px;
      gap: 15px;
    }
  }

  .footer-true {
    width: 96px;
    padding: 5px;
    font-size: 10px;
    line-height: 12px;
    img {
      width: 12px;
      height: 14px;
    }
  }
  .footer-hash {
    flex: 1;
    padding: 5px 15px 5px 9px;
    span {
      word-break: break-all;
    }
  }

  .roulette-right__item {
    min-width: 160px;
  }

  .roulette-right__item-players.clear {
    min-height: 150px;
  }
}
</style>