<template>
  <div class="profile">
    <div class="profile-content">
      <div class="profile-header">
        <svg
          width="17"
          height="15"
          viewBox="0 0 17 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="margin-right: 12px;cursor: pointer"
          @click="$router.back()"
        >
          <path
            d="M6.563 14.3442C6.51921 14.3122 6.47759 14.2772 6.43848 14.2396L0.356773 8.15784C-0.118551 7.68309 -0.118969 6.91296 0.355784 6.43771C0.356089 6.43741 0.356431 6.43706 0.356735 6.43676L6.43844 0.355054C6.91411 -0.119281 7.68424 -0.118216 8.15861 0.357449C8.19594 0.39489 8.2308 0.434725 8.26295 0.476688C8.60395 0.985309 8.52952 1.66551 8.08658 2.08834L4.72948 5.45761C4.55102 5.63626 4.34584 5.78606 4.12131 5.90157L3.75641 6.06578L15.7009 6.06578C16.3222 6.0427 16.8674 6.47675 16.9841 7.0875C17.0916 7.7506 16.6413 8.37534 15.9782 8.48287C15.9086 8.49416 15.8382 8.49937 15.7678 8.49846L3.77465 8.49846L4.03617 8.62009C4.29179 8.74108 4.52434 8.90574 4.7234 9.10663L8.08658 12.4698C8.52952 12.8926 8.60395 13.5728 8.26295 14.0815C7.86608 14.6235 7.105 14.7411 6.563 14.3442Z"
            fill="white"
          ></path>
        </svg>
        {{ $t("content.stats.title") }} - {{ $route.params.id }}
      </div>
      <div class="profile-body">
        <div class="stats">
          <div class="stats-tabs">
            <div
              class="stats-tabs__item"
              :class="{ active: currentHistory === 1 }"
              @click="currentHistory = 1"
            >
              <span>{{ $t("content.stats.crash") }}</span>
            </div>
            <div
              class="stats-tabs__item"
              :class="{ active: currentHistory === 2 }"
              @click="currentHistory = 2"
            >
              <span>{{ $t("content.stats.roulette") }}</span>
            </div>
            <div
              class="stats-tabs__item"
              :class="{ active: currentHistory === 3 }"
              @click="currentHistory = 3"
            >
              <span>{{ $t("content.stats.up") }}</span>
            </div>
          </div>
          <div class="stats-table" v-if="items !== null">
            <div class="stats-table__head">
              <div class="td">{{ $t("content.stats.game") }}</div>
              <div class="td bet">{{ $t("content.stats.bet") }}</div>
              <div class="td">{{ $t("content.stats.multi") }}</div>
              <div class="td">{{ $t("content.stats.total") }}</div>
            </div>
            <div class="stats-table__body">
              <div class="tr" v-for="item in items" :key="item.id">
                <div class="td name" v-if="item.globalGameId === 1">
                  <img src="/img/stats-icons/crash.svg" class="crash" alt="" />
                  <span>{{ $t("content.stats.crash") }}</span>
                </div>
                <div class="td name" v-if="item.globalGameId === 2">
                  <img
                    src="/img/stats-icons/roulette.svg"
                    class="crash"
                    alt=""
                  />
                  <span>{{ $t("content.stats.roulette") }}</span>
                </div>
                <div class="td name" v-if="item.globalGameId === 3">
                  <img
                    src="/img/stats-icons/upgrade.svg"
                    class="crash"
                    alt=""
                  />
                  <span>{{ $t("content.stats.up") }}</span>
                </div>
                <div class="td bet">
                  <div class="skins">
                    <img
                      class="skins-item"
                      v-for="skin in item.items"
                      :key="skin.id"
                      :src="$root.steamUrl + skin.image + '/40fx40f'"
                      alt=""
                    />
                  </div>
                  <div class="bet-value sosiska-wrap">
                    {{ $root.conv(item.sum).toFixed(2) }} <Sosiska />
                  </div>
                </div>
                <div class="td multi">
                 <div class="multi-wrapper win" v-if="item.win !== null && item.globalGameId === 1">
                       x{{ currentHistory !== 0 ? item.multiplier : item.coefficient 
                    }}
                  </div>
                  <div class="multi-wrapper lose" v-if="item.win == null && item.globalGameId === 1">
                   x{{ item.coefficient || item.multiplier }}
                  </div>
                  <div class="multi-wrapper win" v-if="item.win !== null && item.globalGameId !== 1">
                    x{{ item.coefficient
                    }}
                  </div>
                  <div class="multi-wrapper lose" v-if="item.win == null && item.globalGameId !== 1">
                    x{{ item.coefficient
                    }}
                  </div>
                </div>
                <div class="td end" v-if="item.win === null">
                  <span class="lost">{{ $t("content.stats.lost") }}</span>
                  <img src="/img/clear.png" alt="" />
                </div>
                <div class="td end" v-else>
                  <span class="green sosiska-wrap"
                    >{{ $root.conv(item.win).toFixed(2) }} <Sosiska
                  /></span>
                  <img :src="$root.steamUrl + item.winItem.image + '/40fx40f'" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="empty" v-else>{{ $t("content.noBets") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: null,
      currentHistory: 1,
      userName: null,
    };
  },
  watch: {
    async currentHistory(val) {
      switch (val) {
        case 1:
          this.$root
            .request("GET", `/api/game/1/bet/${this.$route.params.id}`)
            .then((resp) => {
              this.history = resp.items;
            });
          break;
        case 2:
          this.$root
            .request("GET", `/api/game/2/bet/${this.$route.params.id}`)
            .then((resp) => {
              this.history = resp.items;
            });
          break;
        case 3:
          this.$root
            .request("GET", `/api/game/3/bet/${this.$route.params.id}`)
            .then((resp) => {
              this.history = resp.items;
            });
          break;
      }
    },
  },
  computed: {
    items() {
      return this.history;
    },
  },
  created() {
    this.$root
      .request("GET", `/api/game/1/bet/${this.$route.params.id}`)
      .then((resp) => {
        this.history = resp.items;
      });
  },
};
</script>

<style lang="scss" scoped>
.empty {
  text-align: center;
}
.profile {
  height: 100%;
  display: flex;

  &-content {
    flex: 1;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
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
    padding: 20px;
  }
}

.stats {
  &-tabs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 25px;

    &__item {
      background: #1f1f1f;
      padding: 9px 14px 11px 14px;
      transition: all 300ms;
      cursor: pointer;
      &:hover {
        opacity: 0.5;
      }
      &.active span {
        font-style: normal;
        font-weight: 00;
        font-size: 12px;
        line-height: 14px;
        color: #ffffff;
        position: relative;

        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: -3px;
          width: 100%;
          height: 1px;
          background: #de3720;
          border-radius: 2px;
        }
      }
      & span {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;

        color: #7b7b7b;
      }
      &:first-child {
        border-radius: 10px 0 0 10px;
      }

      &:last-child {
        border-radius: 0 10px 10px 0;
      }
    }
  }

  &-table {
    &__head {
      display: flex;
      margin-bottom: 10px;
      .td {
        flex: 1;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #7b7b7b;

        &.bet {
          flex: 2;
        }
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
      overflow-y: auto;
      height: calc(100vh - 250px);
      padding-right: 5px;
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
      .tr {
        padding: 5px 0;
        align-items: center;
        display: flex;
        background: #1f1f1f;
        border-radius: 10px;
        .td {
          flex: 1;
          &.name {
            display: flex;
            align-items: center;

            img {
              margin-left: 20px;
              height: 22px;
              &.crash {
                width: 16.5px;
                margin-right: 11px;
              }

              &.roulette {
                width: 22px;
                margin-right: 9px;
              }

              &.upgrade {
                width: 22px;
                margin-right: 9px;
              }
            }

            span {
              font-weight: 600;
              font-size: 12px;
              line-height: 14px;

              color: #ffffff;
            }
          }

          &.bet {
            display: flex;
            align-items: center;
            flex: 2;

            .skins {
              display: flex;
              gap: 10px;

              img {
                &:not(:nth-child(1), :nth-child(2), :nth-child(3), :nth-child(4)) {
                  display: none;
                }
              }
            }

            .skins-item {
              width: 40px;
              height: 40px;
            }

            .bet-value {
              margin-left: 10px;
              font-weight: 600;
              font-size: 12px;
              line-height: 14px;
              color: #ffffff;
            }
          }

          &.multi {
            .multi-wrapper {
              border-radius: 10px;
              font-weight: 600;
              font-size: 12px;
              line-height: 14px;
              min-width: 63px;
              max-width: 70px;
              height: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              &.lose {
                background: rgba(222, 55, 32, 0.3);
                color: rgba(222, 55, 32, 0.7);
              }

              &.win {
                background: rgba(114, 242, 53, 0.3);
                color: rgba(114, 242, 53, 0.7);
              }
            }
          }

          &.end {
            display: flex;
            align-items: center;
            .lost {
              font-weight: 600;
              font-size: 12px;
              line-height: 14px;
              color: #7b7b7b;
            }

            .green {
              font-weight: 600;
              font-size: 12px;
              line-height: 14px;
              color: #72f235;
            }

            img {
              margin-left: auto;
              margin-right: 20px;
              width: 40px;
              height: 40px;
            }
          }
        }
      }
    }

    &__loadmore {
      margin: 0 auto;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 16px;
      line-height: 18px;
      background: #de3720;
      color: #fff;
      text-align: center;
      cursor: pointer;
      transition: all 300ms;
      width: 100%;
      &:hover {
        opacity: 0.7;
      }
    }

    &-clear {
      text-align: center;
      font-size: 22px;
      line-height: 24px;
      color: #fff;
      text-transform: uppercase;
    }
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
    }

    &-content {
      margin-bottom: 70px;
    }
  }

  .stats-table__head .td.bet {
    flex: 1;
  }

  .stats-table__body .tr .td.bet {
    flex: 1;
    & .skins {
      & > img:not(:first-child) {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .stats-table__head .td:first-child,
  .stats-table__head .td:last-child {
    flex: 0.5;
  }
  .stats-table__body .tr .td.name {
    flex: 0.5;
    span {
      display: none;
    }
  }

  .stats-table__body .tr .td.end {
    flex: 0.5;
    img {
      display: none;
    }
  }

  .stats-tabs {
    justify-content: center;

    & > div {
      border-radius: 0 !important;
    }
  }
}
</style>
