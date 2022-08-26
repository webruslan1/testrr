<template>
  <div class="inventory">
    <div class="inventory-header">
      <div class="inventory-header__list">
        <div class="inventory-header__list-item">
          <span>{{ $t("content.inventory.selectAll") }}</span>
          <span>
            <input
              type="checkbox"
              id="selectall"
              v-model="allInput"
              class="checkbox-input"
              @change="selectAll(allInput)"
            />
            <label for="selectall" class="checkbox-label"></label>
          </span>
        </div>
        <div class="inventory-header__list-item">
          <span>{{ $t("content.inventory.allSum") }}</span>
          <span v-if="$root.user" class="sosiska-wrap"
            >{{ $root.conv($root.user.balance) }} <Sosiska
          /></span>
          <span v-else class="sosiska-wrap">0 <Sosiska /></span>
        </div>
        <div class="inventory-header__list-item">
          <span>{{ $t("content.inventory.selected") }}</span>
          <span class="sosiska-wrap"
            >{{ $root.conv(userInventory.selected.price) }} <Sosiska
          /></span>
        </div>
      </div>
      <div class="inventory-header__buttons" v-if="user">
        <div class="inventory-header__buttons-item" @click="openMag">
          {{ $t("content.inventory.market") }}
        </div>
        <button
          class="inventory-header__buttons-item"
          @click="withItems"
          :disabled="
            Object.keys(this.userInventory.selected.items).length === 0
          "
        >
          {{ $t("content.inventory.withdr") }}
        </button>
      </div>
    </div>
    <div
      class="inventory-list"
      :class="{ small: small == true, upgrade: upgrade }"
    >
      <div class="inventory-list__wrapper" v-if="user">
        <div
          class="skin"
          :class="[
            typeof userInventory.selected.items[item.inventId] === 'undefined'
              ? ''
              : 'selected',
          ]"
          @click="selectInventory(item), updateInventory()"
          v-for="item in userInventory.items"
          :key="item.inventId"
          :style="{ border: `1px solid #${item.borderColor}` }"
        >
          <img
            loading="lazy"
            :src="$root.steamUrl + item.image + '/123fx123f'"
            alt=""
          />
          <div class="skin--content">
            <strong>{{ item.marketName }}</strong>
            <span></span>
          </div>
          <div
            class="skin--price sosiska-wrap"
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
                'radial-gradient(76% 76% at 50% 130%, #' +
                item.borderColor +
                ' 0%, rgba(255, 41, 11, 0) 100%), linear-gradient(0deg, #1e1e1e 13%, rgba(30, 30, 30, 0) 73.5%)',
            }"
          ></div>
          <div class="skin--selected">
            <img src="/img/selected.svg" width="22px" height="22px" alt="Selected">
          </div>
          <div class="skin-permis">
            <div class="skin-permis__item sell" v-if="item.canSell == false">
              <div class="skin-permis__item-wrap">
                {{ $t("content.inventory.noSell") }}
              </div>
            </div>
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
            <div class="skin-permis__item bets" v-if="item.canBet == false">
              <div class="skin-permis__item-wrap">
                {{ $t("content.inventory.noBets") }}
              </div>
            </div>
          </div>
        </div>
        <infinite-loading
          v-if="userInventory.items !== null"
          ref="Infinity"
          spinner="spiral"
          data-input="autocompleteClass.Value"
          @infinite="infiniteHandler"
          style="heigth: 10px"
        ></infinite-loading>
      </div>
      <div v-else class="inventory-list__usernone">
        <div class="inventory-list__usernone-subtitle">
          {{ $t("content.inventory.inventory") }}
        </div>
        <div class="inventory-list__usernone-desc">
          {{ $t("content.inventory.no") }}
        </div>
        <a
          :href="$root.authUrl + '/api/auth/login'"
          class="inventory-list__usernone-btn"
        >
          <svg
            data-v-1f2e67c3=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="mdi-steam"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              data-v-1f2e67c3=""
              d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C7.4,22 3.55,18.92 2.36,14.73L6.19,16.31C6.45,17.6 7.6,18.58 8.97,18.58C10.53,18.58 11.8,17.31 11.8,15.75V15.62L15.2,13.19H15.28C17.36,13.19 19.05,11.5 19.05,9.42C19.05,7.34 17.36,5.65 15.28,5.65C13.2,5.65 11.5,7.34 11.5,9.42V9.47L9.13,12.93L8.97,12.92C8.38,12.92 7.83,13.1 7.38,13.41L2,11.2C2.43,6.05 6.73,2 12,2M8.28,17.17C9.08,17.5 10,17.13 10.33,16.33C10.66,15.53 10.28,14.62 9.5,14.29L8.22,13.76C8.71,13.58 9.26,13.57 9.78,13.79C10.31,14 10.72,14.41 10.93,14.94C11.15,15.46 11.15,16.04 10.93,16.56C10.5,17.64 9.23,18.16 8.15,17.71C7.65,17.5 7.27,17.12 7.06,16.67L8.28,17.17M17.8,9.42C17.8,10.81 16.67,11.94 15.28,11.94C13.9,11.94 12.77,10.81 12.77,9.42A2.5,2.5 0 0,1 15.28,6.91C16.67,6.91 17.8,8.04 17.8,9.42M13.4,9.42C13.4,10.46 14.24,11.31 15.29,11.31C16.33,11.31 17.17,10.46 17.17,9.42C17.17,8.38 16.33,7.53 15.29,7.53C14.24,7.53 13.4,8.38 13.4,9.42Z"
            ></path>
          </svg>
          <span>{{ $t("content.noauth") }}</span>
        </a>
      </div>
    </div>

    <div class="inventory-action" v-if="user">
      <div class="inventory-action__shop" @click="openMag">
        {{ $t("content.inventory.market") }}
      </div>
      <button
        class="inventory-action__withdraw"
        @click="withItems"
        :disabled="Object.keys(this.userInventory.selected.items).length === 0"
      >
        {{ $t("content.inventory.withdr") }}
      </button>
    </div>

    <div class="mag" :class="{ upgrade: upgrade }" v-if="mag">
      <div class="mag-header">
        <div class="mag-header__item">
          <span>{{ $t("content.inventory.balance") }}</span>
          <span class="sosiska-wrap"
            >{{
              $root.conv(userInventory.selected.price + $root.user.balance)
            }}
            <Sosiska
          /></span>
        </div>
        <div class="mag-header__item">
          <span>{{ $t("content.inventory.selected") }}</span>
          <span class="sosiska-wrap"
            >{{ $root.conv(magInventory.selected.price) }} <Sosiska
          /></span>
        </div>
        <div class="mag-header__close btn-tr" @click="mag = false">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 13.6018L13.6022 17L8.5 11.8986L3.39819 17L0 13.6018L5.10162 8.50019L0 3.398L3.39819 0L8.5 5.10162L13.6022 0L17 3.39819L11.8986 8.5L17 13.6018Z"
              fill="#232323"
            />
          </svg>
        </div>
      </div>
      <div class="mag-content">
        <div class="mag-content__form">
          <input
            type="text"
            :placeholder="$t('content.market.search')"
            v-model="search"
          />
          <input
            type="number"
            :placeholder="$t('content.market.min')"
            v-model="min"
          />
          <input
            type="number"
            :placeholder="$t('content.market.max')"
            v-model="max"
          />
        </div>
        <div class="mag-content__wrapper">
          <div v-if="loadingMarket" class="mag-content__list">
            <div
              class="skin"
              :class="[
                typeof magInventory.selected.items[item.id] === 'undefined'
                  ? ''
                  : 'selected',
              ]"
              @click="selectMagItem(item)"
              v-for="item in magInventory.items"
              :key="item.id"
              :style="{ border: `1px solid #${item.borderColor}` }"
            >
              <img
                loading="lazy"
                :src="$root.steamUrl + item.image + '/123fx123f'"
                alt=""
              />
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
                    'radial-gradient(76% 76% at 50% 130%, #' +
                    item.borderColor +
                    ' 0%, rgba(255, 41, 11, 0) 100%), linear-gradient(0deg, #1e1e1e 13%, rgba(30, 30, 30, 0) 73.5%)',
                }"
              ></div>
              <div class="skin--selected">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="9" fill="#181818" />
                  <g filter="url(#filter0_d_79_2361)">
                    <circle cx="11" cy="11" r="7" fill="#72F235" />
                  </g>
                  <path
                    d="M14.5165 8.25822C14.179 7.91393 13.632 7.91393 13.2945 8.25822L10.2392 11.3745L9.47522 10.5953C9.13769 10.251 8.59067 10.251 8.25314 10.5953C7.91562 10.9396 7.91562 11.4976 8.25314 11.8417L9.628 13.2441C9.96553 13.5884 10.5126 13.5884 10.8501 13.2441L14.5165 9.50484C14.8541 9.16055 14.8541 8.60252 14.5165 8.25822Z"
                    fill="white"
                  />
                  <defs>
                    <filter
                      id="filter0_d_79_2361"
                      x="0"
                      y="0"
                      width="22"
                      height="22"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.446658 0 0 0 0 0.95 0 0 0 0 0.209792 0 0 0 0.5 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_79_2361"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_79_2361"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div class="skin-permis">
                <!-- <div
                  class="skin-permis__item sell"
                  v-if="item.canSell == false"
                >
                  <div class="skin-permis__item-wrap">
                    {{ $t("content.inventory.noSell") }}
                  </div>
                </div>
                <div class="skin-permis__item swap" v-if="item.swap == false">
                  <div class="skin-permis__item-wrap">
                    {{ $t("content.inventory.noSwap") }}
                  </div>
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
            </div>
            <div
              class="mag-content__list-empty"
              v-if="magInventory.items.length === 0"
            >
              {{ $t("content.market.notfind") }}
            </div>
            <infinite-loading
              v-if="magInventory.items.length !== 0"
              ref="Infinity"
              spinner="spiral"
              data-input="autocompleteClass.Value"
              @infinite="magHandler"
              style="heigth: 10px"
            ></infinite-loading>
          </div>
          <div v-else class="loading">
            <img src="/img/loading.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="mag-footer">
        <button
          class="mag-footer__buy"
          @click="buy"
          :disabled="
            Object.keys(this.magInventory.selected.items).length === 0 ||
            magInventory.items.length == 0 ||
            !loadingMarket
          "
        >
          {{ $t("content.inventory.buy") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { mapState, mapActions } from "vuex";
import $ from "jquery";
export default {
  components: {
    InfiniteLoading,
  },
  props: {
    small: {
      type: Boolean,
    },
    upgrade: {
      type: Boolean,
    },
  },
  data() {
    return {
      mag: false,
      allInput: false,
      lastCall: null,
      magInventory: {
        items: [],
        selected: {
          items: {},
          price: 0.0,
        },
      },
      min: null,
      max: null,
      search: null,
      loadingMarket: false,
      page: 1,
      next: null,
    };
  },
  computed: {
    ...mapState({
      userInventory: "userInventory",
      user: "user",
      invPagination: "invPagination",
    }),
  },
  watch: {
    mag(val) {
      if (val) {
        if (window.innerWidth <= 1200) {
          $("html").css("overflow", "hidden");
        }
      } else {
        $("html").css("overflow", "unset");
      }
    },
    min() {
      this.debounce(this.fetchMarket, 1000)();
    },
    max() {
      this.debounce(this.fetchMarket, 1000)();
    },
    search() {
      this.debounce(this.fetchMarket, 1000)();
    },
    "userInventory.selected.price"() {
      if (this.mag === true) {
        this.fetchMarket();
      }
    },
  },
  async mounted() {
    if (this.user !== null) {
      if (this.userInventory.items === null) {
        await this.getInventory();
      }
    }

    const vm = this;
    $("body").click(function (event) {
      if (
        !$(event.target).closest(".mag").length &&
        vm.mag === true &&
        !$(event.target).closest(".inventory-action__shop").length &&
        !$(event.target).closest(".inventory-header__buttons-item").length &&
        !$(event.target).closest(".inventory").length
      ) {
        vm.mag = false;
      }
    });
  },
  methods: {
    ...mapActions({
      getInventory: "getInventory",
      selectInventory: "selectInventory",
      clearSelectedItems: "clearSelect",
      updateInventory: "updateInventory",
      selectAll: "selectAll",
      pushInventory: "pushInventory",
    }),
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
    async fetchMarket() {
      this.page = 1;
      this.loadingMarket = false;
      try {
        await this.$root
          .request("GET", "/api/item", {
            limit: 30,
            name:
              this.search !== null && this.search !== "" ? this.search : null,
            minPrice: this.min !== null && this.min !== "" ? this.min : 0.01,
            maxPrice:
              this.max !== null && this.max !== ""
                ? this.max
                : this.$root.conv(this.user.balance) +
                    this.$root.conv(this.userInventory.selected.price) ===
                  0
                ? 10000
                : this.$root.conv(this.user.balance) +
                  this.$root.conv(this.userInventory.selected.price),
            page: 1,
          })
          .then((resp) => {
            this.next = resp.links.next;
            this.magInventory.items = resp.items.sort(
              (a, b) => b.price - a.price
            );
          });
        this.loadingMarket = true;
      } catch (error) {
        this.magInventory.items = [];
        this.loadingMarket = true;
      }
    },
    async openMag() {
      this.mag = !this.mag;
      if (this.mag === true) {
        this.max = null;
        this.min = null;
        this.search = null;
        await this.fetchMarket();
      }
    },
    selectMagItem(item) {
      if (typeof this.magInventory.selected.items[item.id] !== "undefined") {
        delete this.magInventory.selected.items[item.id];
        this.magInventory.selected.price = parseFloat(
          (this.magInventory.selected.price - item.price).toFixed(2)
        );
      } else {
        if (
          this.magInventory.selected.price + item.price <=
          this.userInventory.selected.price + this.$root.user.balance
        ) {
          this.magInventory.selected.items[item.id] = item;
          this.magInventory.selected.price = parseFloat(
            (this.magInventory.selected.price + item.price).toFixed(2)
          );
        }
      }
    },
    async loadMore() {
      this.page++;
      if (this.next !== "") {
        await this.$root
          .request("GET", "/api/item", {
            limit: 30,
            name:
              this.search !== null && this.search !== "" ? this.search : null,
            minPrice: this.min !== null && this.min !== "" ? this.min : 0.01,
            maxPrice:
              this.max !== null && this.max !== ""
                ? this.max
                : this.$root.conv(this.user.balance) +
                    this.$root.conv(this.userInventory.selected.price) ===
                  0
                ? 10000
                : this.$root.conv(this.user.balance) +
                  this.$root.conv(this.userInventory.selected.price),
            page: this.page,
          })
          .then((resp) => {
            this.next = resp.links.next;
            this.magInventory.items.push(
              ...resp.items.sort((a, b) => b.price - a.price)
            );
          });
      }
    },
    async buy() {
      if (
        this.userInventory.selected.items !== null &&
        Object.keys(this.userInventory.selected.items).length !== 0
      ) {
        await this.$root
          .request("POST", "/api/item/buy", {
            sellItemIds: [
              ...Object.keys(this.userInventory.selected.items).map((item) =>
                parseInt(item)
              ),
            ],
            buyItemIds: [
              ...Object.keys(this.magInventory.selected.items).map((item) =>
                parseInt(item)
              ),
            ],
          })
          .then(() => {
            this.magInventory.selected.items = {};
            this.magInventory.selected.price = 0.0;
            this.clearSelectedItems();
            this.$root.playSound("buy");
            if (this.allInput) {
              this.selectAll(false);
            }
          });
      } else {
        await this.$root
          .request("POST", "/api/item/buy", {
            buyItemIds: [
              ...Object.keys(this.magInventory.selected.items).map((item) =>
                parseInt(item)
              ),
            ],
          })
          .then(() => {
            this.magInventory.selected.items = {};
            this.magInventory.selected.price = 0.0;
            this.$root.playSound("buy");
          });
      }
    },
    async withItems() {
      await this.$root
        .request("POST", "/api/withdraw", {
          idList: [
            ...Object.keys(this.userInventory.selected.items).map((item) =>
              parseInt(item)
            ),
          ],
        })
        .then(() => {
          this.clearSelectedItems();
          this.$root.showNotify(
            "info",
            this.$t("content.inventory.notifwithdr")
          );
        });
    },
    async infiniteHandler($state) {
      if (this.invPagination.next !== "") {
        await setTimeout(async () => {
          await this.pushInventory();
          $state.loaded();
        }, 1000);
      } else {
        $state.complete();
      }
    },
    async magHandler($state) {
      if (this.next !== "") {
        await setTimeout(async () => {
          await this.loadMore();
          $state.loaded();
        }, 1000);
      } else {
        $state.complete();
      }
    },
  },
};
</script>


<style scoped lang="scss">
.inventory {
  width: 500px;
  position: relative;
  &-header {
    display: flex;
    margin-bottom: 10px;
    border-radius: 10px;
    background: #181818;
    padding: 20px 30px 20px 20px;
    &__list {
      flex: 1;
      display: flex;

      &-item {
        display: flex;
        flex-direction: column;
        &:first-child {
          margin-right: auto;
        }

        &:not(:last-child, :first-child) {
          margin-right: 20px;
        }
        span {
          &:first-child {
            font-weight: normal;
            font-size: 14px;
            line-height: 17px;
            color: #7b7b7b;
            margin-bottom: 13px;
          }

          &:last-child {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            color: #ffffff;
          }
        }
      }
    }

    &__buttons {
      display: none;
    }
  }

  &-list {
    height: 480px;
    border-radius: 10px;
    background: #181818;
    border-radius: 10px 10px 0 0;
    padding: 20px 20px 10px 20px;

    &__usernone {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &-subtitle {
        font-size: 26px;
        line-height: 28px;
        color: #fff;
        margin-bottom: 5px;
      }

      &-desc {
        font-size: 24px;
        line-height: 26px;
        margin-bottom: 20px;
      }

      &-btn {
        border-radius: 20px;
        height: 50px;
        margin-bottom: 20px;
        transition: all 300ms;
        text-transform: uppercase;
        width: 100%;
        background: #de3720;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        span {
          color: #000;
          margin-left: 10px;
          font-size: 20px;
          font-weight: 500;
        }
        &:hover {
          opacity: 0.7;
        }
      }
    }

    &.small {
      height: 420px;

      .inventory-list__wrapper {
        min-height: 100px;
        max-height: 390px;
      }
    }

    &.upgrade {
      height: 472px;

      .inventory-list__wrapper {
        min-height: 100px;
        max-height: 440px;
      }
    }

    &__wrapper {
      min-height: 141px;
      max-height: 440px;

      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      overflow-y: auto;
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

  &-action {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 20px;
    background: #181818;
    border-radius: 0 0 10px 10px;
    div,
    button {
      outline: none;
      width: 204px;
      height: 40px;
      text-transform: uppercase;
      background: #de3720;
      border-radius: 10px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      border: 1px solid transparent;
      transition: all 300ms;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #1f1f1f;
        border: 1px solid #de3720;
        color: #ffffff;
      }
    }
  }
}

.mag {
  width: 500px;
  height: 650px;
  position: absolute;
  right: -520px;
  bottom: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 999;
  overflow: hidden;
  &.upgrade {
    bottom: unset;
    top: 0;
  }
  &-header {
    background: #434343;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 21px 25px 21px 20px;
    display: flex;
    align-items: center;
    &__item {
      display: flex;
      flex-direction: column;
      &:nth-child(1) {
        span {
          &:first-child {
            font-weight: normal;
            font-size: 14px;
            line-height: 17px;
            color: #7b7b7b;
            margin-bottom: 14px;
          }

          &:last-child {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            color: #ffffff;
          }
        }
      }

      &:nth-child(2) {
        margin-left: 90px;
        span {
          &:first-child {
            font-weight: normal;
            font-size: 14px;
            line-height: 17px;
            color: #7b7b7b;
            margin-bottom: 14px;
          }

          &:last-child {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            color: #fff;
          }
        }
      }
    }

    &__close {
      margin-left: auto;
    }
  }

  &-content {
    background: #232323;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px 10px 0 0;
    position: relative;
    height: 480px;
    &__form {
      display: flex;
      padding: 10px 30px 10px 30px;
      position: absolute;
      background: #232323;
      justify-content: center;
      z-index: 5;
      bottom: -5px;
      width: 100%;
      gap: 10px;
      input {
        padding: 11px 5px 12px 9px;
        background: #181818;
        border-radius: 10px;
        height: 40px;
        width: 140px;
        border: none;
        outline: none;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #fff;
        &::placeholder {
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          color: #4b4b4b;
        }
      }
    }

    &__wrapper {
      padding: 20px;
      height: 420px;
      position: relative;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      min-height: 100px;
      max-height: 400px;
      overflow-y: auto;
      gap: 10px;
      justify-content: center;

      &-empty {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        height: 100%;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

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

  &-footer {
    display: flex;
    background: #232323;
    padding: 10px 10px 20px 10px;
    align-items: center;
    justify-content: center;
    &__buy {
      height: 40px;
      width: 100%;
      background: #de3720;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      text-transform: uppercase;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 300ms;
      &:hover {
        border: 1px solid #de3720;
        background: #181818;
        color: #fff;
      }
    }

    &__more {
      height: 40px;
      width: 45%;
      margin-left: auto;
      background: #de3720;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      text-transform: uppercase;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 300ms;
      &:hover {
        border: 1px solid #de3720;
        background: #181818;
        color: #fff;
      }
    }

    &__refresh {
      width: 40px;
      height: 40px;
      margin-left: 20px;
      background: #1f1f1f;
      border: 1px solid #de3720;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

@media screen and (max-width: 1750px) {
  .inventory {
    &-header {
      &__list {
        &-item {
          flex-direction: row;
          gap: 20px;

          span {
            &:first-child {
              margin: 0;
            }
          }
        }
      }
    }
    &-list {
      height: unset !important;
      min-height: 100px !important;
      max-height: 330px !important;
      &__wrapper {
        height: unset !important;
        min-height: 70px !important;
        max-height: 300px !important;
      }
    }
  }

  .mag {
    left: 50%;
  }
}

@media screen and (max-width: 1200px) {
  .inventory {
    &-header {
      padding: 10px 10px 10px 20px;
      &__list {
        flex-wrap: wrap;
        &-item {
          &:first-child {
            width: 100%;
            margin-bottom: 10px;
          }
          &:not(:first-child) {
            flex-direction: column;
            gap: 10px;
          }
          gap: 20px;

          span {
            &:first-child {
              margin: 0;
            }
          }
        }
      }
      &__buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        &-item {
          text-transform: uppercase;
          background: #de3720;
          border-radius: 10px;
          width: 110px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 12px;
          line-height: 14px;
          color: #000000;
          cursor: pointer;
        }
      }
    }

    &-list {
      border-radius: 10px;
      padding: 10px;
    }

    &-action {
      display: none;
    }
  }

  .mag {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    width: 100%;
    z-index: 1000;
    height: 100vh;

    &-header {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    & > div {
      width: calc(100% - 20px);
      margin-left: auto;
      margin-right: auto;
    }
    &-content {
      &__form {
        padding: 10px;

        & input {
          width: 33%;
        }
      }
      &__wrapper {
        height: 330px;
        padding: 10px;
      }
      &__list {
        height: 300px;
      }
    }
  }
}
</style>