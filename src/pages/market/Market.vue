<template>
  <div class="profile" v-if="$root.user && loading == false">
    <ProfileInfo />
    <div class="profile-content">
      <div class="profile-header">{{$t('content.market.title')}}</div>
      <div class="profile-body">
        <div class="market">
          <div class="market-form">
            <div class="market-form__search">
              <input
                type="text"
                :placeholder="$t('content.market.search')"
                v-model="search"
              />
            </div>
            <div
              class="market-form__select select"
              :class="{ open: selectRareOpen }"
              @click="selectRareOpen = !selectRareOpen"
            >
              <div class="select-current">
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.99997 6.84034C5.7849 6.84034 5.56987 6.75822 5.4059 6.59433L0.24617 1.43455C-0.0820565 1.10633 -0.0820565 0.574163 0.24617 0.24607C0.574263 -0.0820233 1.10632 -0.0820233 1.43457 0.24607L5.99997 4.81173L10.5654 0.246229C10.8936 -0.0818639 11.4256 -0.0818639 11.7537 0.246229C12.0821 0.574323 12.0821 1.10649 11.7537 1.43471L6.59404 6.59449C6.42999 6.75841 6.21495 6.84034 5.99997 6.84034Z"
                    fill="#7B7B7B"
                  />
                </svg>
                <span v-if="selectRare.value === null">{{
                  $t("content.market.rare")
                }}</span>
                <span v-else>{{ selectRare.name }}</span>
              </div>
              <div class="select-list" v-if="selectRareOpen">
                <span
                  v-if="selectRare.value !== null"
                  @click="selectRare = { name: 'All', value: null }"
                >
                  {{ $t("content.market.all") }}
                </span>
                <span
                  @click="selectRare = item"
                  v-for="item in $root.settings.items.tags.category.values"
                  :key="item.value"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
            <div class="market-form__max price-input">
              <div class="price-input__name">
                {{ $t("content.market.price") }}
              </div>
              <input type="number" placeholder="0.01" v-model="max" />
            </div>
            <div class="market-form__pag">
              <button
                class="market-form__pag-prev"
                :disabled="!loadingMarket"
                @click="prevPage"
              >
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-0.00049305 5.99997C-0.00049305 5.7849 0.0816231 5.56987 0.245511 5.4059L5.40529 0.24617C5.73352 -0.0820565 6.26568 -0.0820565 6.59377 0.24617C6.92187 0.574263 6.92187 1.10632 6.59377 1.43457L2.02811 5.99997L6.59361 10.5654C6.92171 10.8936 6.92171 11.4256 6.59361 11.7537C6.26552 12.0821 5.73336 12.0821 5.40513 11.7537L0.245351 6.59404C0.0814371 6.42999 -0.00049305 6.21495 -0.00049305 5.99997Z"
                    fill="white"
                  />
                </svg>
              </button>
              <div class="market-form__pag-page" v-if="totalPage !== null">
                {{ page }}/{{ totalPage }}
              </div>
              <button
                class="market-form__pag-next"
                :disabled="!loadingMarket"
                @click="nextPage"
              >
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.84034 6.00003C6.84034 6.2151 6.75822 6.43013 6.59433 6.5941L1.43455 11.7538C1.10633 12.0821 0.574163 12.0821 0.24607 11.7538C-0.0820233 11.4257 -0.0820233 10.8937 0.24607 10.5654L4.81173 6.00003L0.246229 1.43461C-0.0818639 1.10639 -0.0818639 0.574383 0.246229 0.246316C0.574323 -0.0820694 1.10649 -0.0820694 1.43471 0.246316L6.59449 5.40596C6.75841 5.57001 6.84034 5.78505 6.84034 6.00003Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div v-if="loadingMarket" class="market-list">
            <div
              class="skin"
              v-for="item in magInventory"
              :key="item.id"
              :style="{ border: `1px solid #${item.borderColor}` }"
            >
              <img loading="lazy" :src="$root.steamUrl + item.image + '/123fx123f'" alt="" />
              <div class="skin--content">
                <strong>{{ item.marketName }}</strong>
                <span></span>
              </div>
              <div
                class="skin--price"
                :style="{
                  background: 'black',
                  color: '#fff',
                  border: '1px solid #' + item.borderColor,
                }"
              >
                {{ $root.conv(item.price) }} <Sosiska />
              </div>
              <div
                class="skin--shadow"
                :style="{
                  background:
                    'radial-gradient(76% 76% at 50% 114%, #' +
                    item.borderColor +
                    ' 0%, rgba(255, 41, 11, 0) 100%), linear-gradient(0deg, #1e1e1e 13%, rgba(30, 30, 30, 0) 73.5%)',
                }"
              ></div>
              <div class="skin-permis">
                <!-- <div
                  class="skin-permis__item sell"
                  v-if="item.canSell == false"
                >
                  <div class="skin-permis__item-wrap">
                    {{ $t("content.inventory.noSell") }}
                  </div>
                </div> -->
                <!-- <div class="skin-permis__item swap" v-if="item.swap == false">
              <div class="skin-permis__item-wrap">{{$t('content.inventory.noSwap')}}</div>
            </div> -->
                <div
                  class="skin-permis__item with"
                  v-if="item.canWithdraw == false"
                >
                  <div class="skin-permis__item-wrap">
                    {{ $t("content.inventory.noWith") }}
                  </div>
                </div>
                <!-- <div class="skin-permis__item bets" v-if="item.canBet == false">
                  <div class="skin-permis__item-wrap">
                    {{ $t("content.inventory.noBets") }}
                  </div>
                </div> -->
              </div>
              <div class="skin--buy">
                <div class="skin--buy__btn" @click="buyItem(item.id)">
                  {{ $t("content.market.buy") }}
                </div>
                <div class="skin--buy__price sosiska-wrap">
                  {{ $t("content.market.for") }} {{ $root.conv(item.price) }}
                  <Sosiska />
                </div>
              </div>
            </div>
            <div
              class="mag-content__list-empty"
              v-if="magInventory.length === 0"
            >
              {{ $t("content.market.notfind") }}
            </div>
          </div>
          <div v-else class="market-list">
            <div class="loading">
              <img src="/img/loading.svg" alt="" />
            </div>
          </div>
          <div class="market-form__pag pag-mob">
            <div class="market-form__pag-prev" @click="prevPage">
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-0.00049305 5.99997C-0.00049305 5.7849 0.0816231 5.56987 0.245511 5.4059L5.40529 0.24617C5.73352 -0.0820565 6.26568 -0.0820565 6.59377 0.24617C6.92187 0.574263 6.92187 1.10632 6.59377 1.43457L2.02811 5.99997L6.59361 10.5654C6.92171 10.8936 6.92171 11.4256 6.59361 11.7537C6.26552 12.0821 5.73336 12.0821 5.40513 11.7537L0.245351 6.59404C0.0814371 6.42999 -0.00049305 6.21495 -0.00049305 5.99997Z"
                  fill="white"
                />
              </svg>
            </div>
            <div class="market-form__pag-page" v-if="totalPage !== null">
              {{ page }}/{{ totalPage }}
            </div>
            <div class="market-form__pag-next" @click="nextPage">
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.84034 6.00003C6.84034 6.2151 6.75822 6.43013 6.59433 6.5941L1.43455 11.7538C1.10633 12.0821 0.574163 12.0821 0.24607 11.7538C-0.0820233 11.4257 -0.0820233 10.8937 0.24607 10.5654L4.81173 6.00003L0.246229 1.43461C-0.0818639 1.10639 -0.0818639 0.574383 0.246229 0.246316C0.574323 -0.0820694 1.10649 -0.0820694 1.43471 0.246316L6.59449 5.40596C6.75841 5.57001 6.84034 5.78505 6.84034 6.00003Z"
                  fill="white"
                />
              </svg>
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
      selectRareOpen: false,
      lastCall: null,
      selectRare: {
        name: "All",
        value: null,
      },
      magInventory: [],
      loadingMarket: false,
      page: 1,
      next: null,
      search: null,
      max: null,
      totalPage: null,
      loading: true
    };
  },
  watch: {
    max() {
      this.debounce(this.fetchMarket, 1000)();
    },
    search() {
      this.debounce(this.fetchMarket, 1000)();
    },
    selectRare() {
      this.debounce(this.fetchMarket, 1000)();
    },
  },
  async created() {
    if (this.$root.user == null) {
      this.$router.push("/");
    } else{
      await this.fetchMarket(1);
      this.loading = false;
    }
  },
  methods: {
    debounce(f, t) {
      const vm = this;
      return function (args) {
        let previousCall = vm.lastCall;
        vm.lastCall = Date.now();
        if (previousCall && vm.lastCall - previousCall <= t) {
          clearTimeout(vm.lastCallTimer);
        }
        vm.lastCallTimer = setTimeout(() => f(args), t);
      };
    },
    async fetchMarket(p) {
      var page = '';
      if (p === undefined) {
        page = 1;
      } else {
        page = p;
      }
      this.loadingMarket = false;
      await this.$root
        .request("GET", "/api/item", {
          limit: 35,
          name: this.search !== null && this.search !== "" ? this.search : null,
          category: this.selectRare.value,
          minPrice: 0.01,
          maxPrice: this.max !== null && this.max !== "" ? this.max : 10000,
          page: page,
        })
        .then((resp) => {
          this.totalPage = resp.meta.totalPages;
          this.next = resp.links.next;
          this.magInventory = resp.items.sort((a, b) => b.price - a.price);
          this.page = page;
          setTimeout(() => {
            this.loadingMarket = true;
          }, 500);
        })
        .catch(() => {
          setTimeout(() => {
            this.loadingMarket = true;
          }, 500);
        });
    },
    async prevPage() {
      if (this.page !== 1) {
        await this.fetchMarket(this.page - 1);
      }
    },
    async nextPage() {
      if (this.page !== this.totalPage) {
        await this.fetchMarket(this.page + 1);
      }
    },
    async buyItem(idItem) {
      await this.$root
        .request("POST", "/api/item/buy", {
          buyItemIds: [idItem],
        })
        .then(() => {
          this.$root.showNotify("info", this.$t("content.market.itemBuy"));
        });
    },
  },
};
</script>


<style lang="scss" scoped>
.pag-mob {
  display: none !important;
  margin-top: 20px;
}
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

.market {
  &-form {
    display: flex;
    margin-bottom: 20px;
    &__search {
      user-select: none;

      input {
        margin-right: 10px;
        background: #1f1f1f;
        width: 225px;
        height: 34px;
        width: 163px;
        height: 34px;
        background: #1f1f1f;
        border-radius: 10px;
        padding-left: 20px;
        outline: none;
        border: none;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: #eee;
        &::placeholder {
          font-weight: 500;
          font-size: 12px;
          line-height: 14px;
          color: #7b7b7b;
        }
      }
    }
    &__select {
      height: 34px;
      margin-right: 20px;
      background: #1f1f1f;
      .select-list span {
        background: #1f1f1f;
      }
    }
    &__max {
      background: #1f1f1f;
      height: 34px;
      width: 123px;
    }

    &__pag {
      margin-left: auto;
      display: flex;
      gap: 7px;
      &-prev {
        background: #2b2b2b;
        border-radius: 5px;
        height: 34px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 300ms;
        &:hover {
          opacity: 0.7;
        }
      }

      &-page {
        background: #2b2b2b;
        border-radius: 5px;
        height: 34px;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        user-select: none;
      }

      &-next {
        background: #2b2b2b;
        border-radius: 5px;
        height: 34px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 300ms;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  &-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    overflow: auto;
    min-height: 100px;
    max-height: calc(100vh - 160px);

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

  &-wrapper {
    height: calc(100% - 154px);
    overflow: hidden;
  }

  .skin:hover {
    opacity: 1;
    .skin--content,
    .skin--price,
    .skin--shadow,
    img {
      opacity: 0.5;
      filter: blur(1px);
    }
    .skin--buy {
      display: flex;
      opacity: 1;
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
    .skin--buy {
      &__btn {
        width: 70px;
        height: 30px;
        font-size: 12px;
      }
    }
  }

  .market {
    &-form {
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      &__pag {
        width: 100%;
        justify-content: center;
      }
    }
  }

  .pag-mob {
    display: flex !important;
  }
}
</style>