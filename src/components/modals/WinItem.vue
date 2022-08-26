<template>
  <div
    class="modal-default"
    :class="{
      'none-modal': deposite === false,
    }"
  >
    <div
      class="modal-body"
      :class="{
        'visible-modal': deposite === true,
        'fade-modal': deposite === false,
      }"
    >
      <div class="modal-close" v-if="int === null" @click="deposite = false">
        <div class="close">
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="welcome">
        <div class="welcome-wrapper" v-if="items">
          <div class="welcome-title">{{ $t("content.bonus.card") }}</div>
          <div class="welcome-text">{{ $t("content.bonus.subtitle", {0: items.length}) }}</div>
          <div class="welcome-cards" v-if="items">
            <div
              class="welcome-cards__i"
              v-for="(i, idx) in items"
              :key="idx"
              :class="{ open: i.isOpen }"
            >
              <div class="welcome-cards__item front">
                <div class="welcome-cards__item-wrapper">
                  <img src="/img/gift.svg" class="welcome-cards__item-gift" />
                </div>
              </div>
              <div class="welcome-cards__item back">
                <div class="welcome-cards__item-wrapper">
                  <div class="skin-win" v-if="i.type === 'item'">
                    <img :src="$root.steamUrl + i.item.image" alt="" />
                    <strong>{{ i.item.marketName }}</strong>
                    <span class="sosiska-wrap">
                      <span>{{ $root.conv(i.item.price) }}</span> <Sosiska
                    /></span>
                  </div>
                  <div class="skin-win" v-else-if="i.type === 'text'">
                    <img
                      v-if="!isNaN(parseInt(i.text[$root.language]))"
                      :src="`/img/bonus/${$root.language}/${
                        i.text[$root.language]
                      }.png`"
                      alt=""
                    />
                    <img v-else src="/img/bonus/ru/1.png" alt="" />
                    <strong
                      v-if="!isNaN(parseInt(i.text[$root.language]))"
                      >{{ $t(`bonusRed.${i.text[$root.language]}`) }}</strong
                    >
                    <strong v-else>{{ i.text[$root.language] }}</strong>
                  </div>
                  <div class="skin-win" v-else>
                    <img
                      src="/img/icon.svg"
                      style="width: 200px; height: 200px"
                      alt=""
                    />
                    <strong>Баланс</strong>
                    <span class="sosiska-wrap">
                      <span>{{ $root.conv(i.balance) }}</span> <Sosiska
                    /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deposite: false,
      items: null,
      counter: 0,
      int: null,
    };
  },
  watch: {
    deposite(val) {
      if (!val) {
        this.items = null;
        this.int = null;
        this.counter = 0;
      }
    },
  },
  sockets: {
    bonusRedeemed(val) {
      this.items = val.map((item) => {
        item.isOpen = false;
        return item;
      });
      this.deposite = true;

      this.int = setInterval(() => {
        if (this.items[this.counter] !== undefined) {
          this.items[this.counter].isOpen = true;
          this.counter++;
        } else {
          setTimeout(() => {
            clearInterval(this.int)
            this.int = null;
          }, 500);
        }
      }, 300);
    },
  },
};
</script>


<style lang="scss" scoped>
.modal {
  &-default {
    font-family: "Oswald";
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-body {
    width: 1410px;
    position: relative;
    height: auto;
    border: 1px solid #fff;
    max-width: 95%;
    background: #202020;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 20px;
    margin-right: 25px;
  }

  &-close {
    position: absolute;
    top: 26px;
    right: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    background: #181818;
    box-shadow: 0px 0px 10px #2b2b2b;
    border-radius: 5px;
    transition: all 300ms;
    &:hover {
      opacity: 0.8;
    }
  }

  &-bonus {
    width: 300px;
    height: 100%;
    padding: 35px 31px 35px 29px;
    max-width: 95%;
    background: #202020;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 20px;

    .modal-head {
      margin-bottom: 20px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .modal {
    &-default {
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      overflow-y: scroll;
      display: block;
      z-index: 9999;
    }

    &-body,
    &-bonus {
      padding: 30px 15px;
      width: 100%;
      margin: 0;
      max-width: 100%;
      box-shadow: unset;
      border-radius: 0;
      background-size: cover;
      background-position: center;
      height: auto;
    }

    &-bonus {
      .modal-head {
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        margin-bottom: 28px;
        justify-content: center;
      }

      .nickname {
        margin-bottom: 22px;
      }
    }
  }
}

.skin-win {
  display: flex;
  flex-direction: column;
  img {
    text-align: center;
    margin-bottom: 20px;
    width: 200px;
  }

  strong {
    color: #fff;
    font-size: 20px;
    line-height: 22px;
    text-align: center;
    margin-bottom: 20px;
  }

  .sosiska-wrap {
    margin: 0 auto;
    span {
      font-size: 22px;
      line-height: 24px;
      color: #fff;
      font-weight: 600;
    }
    img {
      width: 30px !important;
      height: 30px !important;
    }
  }
}

.welcome {
  flex: 1;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("/img/winbg.jpg");
  background-size: cover;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  height: 100%;
  &-wrapper {
    background: url("/img/welcome-bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    padding: 23px 10px 80px 10px;
    text-align: center;
  }
  &-title {
    text-transform: uppercase;
    font-weight: 600;
    color: #fff;
    font-size: 48px;
    line-height: 71px;
    margin-bottom: 28px;
  }

  &-text {
    font-weight: normal;
    font-size: 28px;
    line-height: 27px;
    text-align: center;
    color: #fff;
    margin: 0 auto;
    margin-bottom: 80px;
  }

  &-cards {
    padding: 31px 31px 38px 31px;
    background: radial-gradient(
        45.96% 45.96% at 50% 50%,
        #de3720 0%,
        transparent 100%
      ),
      transparent;
    display: flex;
    justify-content: center;
    gap: 100px;
    margin: 0 auto;
    margin-bottom: 44px;
    &__i {
      position: relative;
      width: 280px;
      height: 400px;
      .front {
        transform: perspective(500px) rotateY(0deg);
      }

      .back {
        transform: perspective(500px) rotateY(180deg);
      }

      &.open .front {
        transform: perspective(500px) rotateY(-180deg);
      }

      &.open .back {
        transform: perspective(500px) rotateY(0deg);
      }
    }
    &__item {
      position: absolute;
      left: 0;
      transition: transform 0.5s ease-in-out;
      backface-visibility: hidden;
      overflow: hidden;
      right: 0;
      border-radius: 10px;
      width: 280px;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      &.open {
        z-index: 3;
      }
      &-wrapper {
        background: linear-gradient(0deg, #b93220 0%, rgba(0, 0, 0, 1) 100%);
        background-position-x: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background-size: cover;
        position: relative;
        width: 100%;
        height: 100%;
      }
      &-gift {
        width: 130px;
        height: 130px;
      }
      &-btn {
        background: #de3720;
        box-shadow: 0px 0px 10px #de3720;
        border-radius: 5px;
        font-weight: 600;
        font-size: 18px;
        line-height: 18px;
        color: #fff;
        cursor: pointer;
        width: 206px;
        height: 50px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 300ms;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20px;
        margin: 0 auto;
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .welcome {
    &-cards {
      gap: 20px;
    }
  }
}

@media screen and (max-width: 1350px) {
  .welcome {
    &-cards {
      padding: 0;
      &__item-btn {
        width: 150px;
      }
    }
  }
}

@media screen and (max-width: 1250px) {
  .welcome {
    &-cards {
      width: unset;
    }
  }
}
@media screen and (max-width: 1000px) {
  .welcome {
    &-cards {
      width: 600px;
    }
  }
}
@media screen and (max-width: 900px) {
  .welcome {
    padding: 0;
    &-text {
      width: 330px;
    }
    &-wrapper {
      padding: 15px 15px 50px 15px;
    }
    &-cards {
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px 36px;
      width: unset;
    }
  }
}
</style>