<template>
  <div v-if="$root.user && loading == false" class="profile">
    <ProfileInfo />
    <div class="profile-content">
      <div class="profile-header">{{ $t("content.stats.title") }}</div>
      <div class="profile-body">
        <div class="stats">
          <div class="stats-tabs">
            <div
              class="stats-tabs__item"
              :class="{ active: currentHistory === 0 }"
              @click="currentHistory = 0"
            >
              <span>{{ $t("content.stats.allGames") }}</span>
            </div>
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
          <div class="stats-table" v-if="items.length !== 0">
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
                  <div
                    class="multi-wrapper win"
                    v-if="item.win !== null && item.globalGameId === 1"
                  >
                    x{{
                      currentHistory !== 0 ? item.multiplier : item.coefficient
                    }}
                  </div>
                  <div
                    class="multi-wrapper lose"
                    v-if="item.win == null && item.globalGameId === 1"
                  >
                    x{{ item.coefficient || item.multiplier }}
                  </div>
                  <div
                    class="multi-wrapper win"
                    v-if="item.win !== null && item.globalGameId !== 1"
                  >
                    x{{ item.coefficient
                    }}
                  </div>
                  <div
                    class="multi-wrapper lose"
                    v-if="item.win == null && item.globalGameId !== 1"
                  >
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
                  <img
                    :src="$root.steamUrl + item.winItem.image + '/40fx40f'"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <button
              class="stats-table__loadmore"
              @click="loadMore"
              :disabled="page === totalPages"
            >
              {{ $t("content.stats.loadMore") }}
            </button>
          </div>
          <div class="empty" v-else>{{ $t("content.noBets") }}</div>
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
      history: [],
      totalPages: null,
      page: 1,
      currentHistory: 0,
      loading: true,
    };
  },
  watch: {
    async currentHistory(val) {
      this.page = 1;
      switch (val) {
        case 0:
          this.$root.request("GET", "/api/game/bet").then((resp) => {
            this.history = resp.items;
            this.totalPages = resp.meta.totalPages;
          });
          break;
        case 1:
          this.$root.request("GET", "/api/game/1/bet").then((resp) => {
            this.history = resp.items;
            this.totalPages = resp.meta.totalPages;
          });
          break;
        case 2:
          this.$root.request("GET", "/api/game/2/bet").then((resp) => {
            this.history = resp.items;
            this.totalPages = resp.meta.totalPages;
          });
          break;
        case 3:
          this.$root.request("GET", "/api/game/3/bet").then((resp) => {
            this.history = resp.items;
            this.totalPages = resp.meta.totalPages;
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
    if (this.$root.user == null) {
      this.$router.push("/");
    } else {
      this.$root.request("GET", "/api/game/bet").then((resp) => {
        this.history = resp.items;
        this.totalPages = resp.meta.totalPages;
        this.loading = false;
      });
    }
  },
  methods: {
    loadMore() {
      if (this.currentHistory === 0) {
        this.$root
          .request("GET", "/api/game/bet", { page: this.page + 1 })
          .then((resp) => {
            this.history.push(...resp.items);
            this.page++;
          });
      } else {
        this.$root
          .request("GET", `/api/game/${this.currentHistory}/bet`, {
            page: this.page + 1,
          })
          .then((resp) => {
            this.history.push(...resp.items);
            this.page++;
          });
      }
    },
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
