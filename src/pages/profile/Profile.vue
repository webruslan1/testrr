<template>
  <div class="profile" v-if="$root.user && loading == false">
    <ProfileInfo />
    <div class="profile-content">
      <div class="profile-header">{{ $t("content.profile.title") }}</div>
      <div class="profile-body">
        <div class="profile-top">
          <div class="profile-top__item">
            <div class="profile-top__item-title">
              <span>{{ $t("content.profile.tradeLink") }}</span>
              <a
                :href="
                  'https://steamcommunity.com/profiles/' +
                  $root.user.steamId +
                  '/tradeoffers/privacy'
                "
                target="_blank"
                >{{ $t("content.profile.take") }}</a
              >
            </div>
            <div class="profile-top__item-form">
              <fieldset class="profile-top__item-form--field">
                <input
                  type="text"
                  v-model="$root.user.tradeUrl"
                  @keypress.enter="setTradeUrl"
                />
              </fieldset>
              <button
                class="profile-top__item-form--btn btn-tr"
                @click="setTradeUrl"
              >
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.7202 0.218739C17.4296 -0.0729129 16.9532 -0.0729129 16.6626 0.218739L7.86495 9.01423L3.3342 4.4525C3.04362 4.15978 2.57035 4.15978 2.27763 4.4525L0.690106 6.03895C0.399522 6.32847 0.399522 6.80494 0.690106 7.09659L7.33186 13.7821C7.62244 14.0717 8.09571 14.0717 8.3895 13.7821L19.3067 2.8639C19.6015 2.57225 19.6015 2.09471 19.3067 1.80199L17.7202 0.218739Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="profile-info">
          <div class="profile-info__tabs">
            <div
              class="profile-info__tabs-item"
              :class="{ active: currentTab === 'inventory' }"
              @click="currentTab = 'inventory'"
            >
              {{ $t("content.profile.inv") }}
            </div>
            <div
              class="profile-info__tabs-item"
              :class="{ active: currentTab === 'trans' }"
              @click="currentTab = 'trans'"
            >
              {{ $t("content.profile.trans") }}
            </div>
            <div
              class="profile-info__tabs-item"
              :class="{ active: currentTab === 'output' }"
              @click="currentTab = 'output'"
            >
              {{ $t("content.profile.with") }}
            </div>
          </div>

          <div
            v-if="currentTab === 'inventory' && userInventory.items"
            class="profile-info__inventory"
          >
            <div
              class="skin"
              :class="[
                typeof userInventory.selected.items[item.inventId] ===
                'undefined'
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
                <div
                  class="skin-permis__item sell"
                  v-if="item.canSell == false"
                >
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
              style="heigth: 5px"
            ></infinite-loading>
          </div>
          <div v-else-if="currentTab === 'trans'" class="profile-info__trans">
            <div class="profile-info__trans-head">
              <div class="profile-info__trans-head--td">
                {{ $t("content.profile.do") }}
              </div>
              <div class="profile-info__trans-head--td">
                {{ $t("content.profile.status") }}
              </div>
              <div class="profile-info__trans-head--td">
                {{ $t("content.profile.sum") }}
              </div>
              <div class="profile-info__trans-head--td">
                {{ $t("content.profile.date") }}
              </div>
            </div>
            <div class="profile-info__trans-body">
              <div
                class="profile-info__trans-body-item"
                v-for="i in trans.items"
                :key="i.id"
                :class="{
                  success: i.status === 2,
                  error: i.status === 3,
                  waiting: i.status === 1,
                  created: i.status === 0,
                }"
              >
                <div class="profile-info__trans-body--tr">
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.method === 'buy'"
                  >
                    {{ $t("content.profile.buy") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.method === 'sell'"
                  >
                    {{ $t("content.profile.sell") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.method === 'payment'"
                  >
                    {{ $t("content.profile.depositeCurr") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.method === 'steam'"
                  >
                    {{ $t("content.profile.depositeSteam") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.method === 'promo'"
                  >
                    {{ $t("content.profile.promoDep") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.method === 'admin'"
                  >
                    {{ $t("content.profile.adminDep") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.method === 'withdraw'"
                  >
                    {{ $t("content.profile.widthDep") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.method === 'referralDeposit'"
                  >
                    {{ $t("content.profile.reffDep") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.status === 2"
                  >
                    {{ $t("content.profile.success") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.status === 3"
                  >
                    {{ $t("content.profile.cancel") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.status === 1"
                  >
                    {{ $t("content.profile.inProc") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.status === 0"
                  >
                    {{ $t("content.profile.created") }}
                  </div>
                  <div class="profile-info__trans-body--td">
                    {{ $root.conv(i.sum).toFixed(2) }} <Sosiska />
                  </div>
                  <div class="profile-info__trans-body--td">
                    {{ $root.formatDate(i.createdAt) }}
                  </div>
                </div>
              </div>
              <infinite-loading
                v-if="trans.items !== null"
                ref="InfinityTrans"
                spinner="spiral"
                @infinite="infiniteHandlerTrans"
                style="heigth: 2px"
              ></infinite-loading>
            </div>
          </div>
          <div v-else-if="currentTab === 'output'" class="profile-info__trans">
            <div class="profile-info__trans-head">
              <div class="profile-info__trans-head--td">
                {{ $t("content.profile.do") }}
              </div>
              <div class="profile-info__trans-head--td">
                {{ $t("content.profile.status") }}
              </div>
              <div class="profile-info__trans-head--td">
                {{ $t("content.profile.sum") }}
              </div>
              <div class="profile-info__trans-head--td">
                {{ $t("content.profile.date") }}
              </div>
            </div>
            <div class="profile-info__trans-body">
              <div
                class="profile-info__trans-body-item"
                v-for="i in withdr.items"
                :key="i.id"
                :class="{
                  success: i.status === 2,
                  error: i.status === 3,
                  waiting: i.status === 1,
                  created: i.status === 0,
                }"
              >
                <div class="profile-info__trans-body--tr">
                  <div class="profile-info__trans-body--td">
                    {{ $t("content.profile.withOne") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.status === 2"
                  >
                    {{ $t("content.profile.success") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.status === 3"
                  >
                    {{ $t("content.profile.cancel") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.status === 1"
                  >
                    {{ $t("content.profile.inProc") }}
                  </div>
                  <div
                    class="profile-info__trans-body--td"
                    v-if="i.status === 0"
                  >
                    {{ $t("content.profile.created") }}
                  </div>
                  <div class="profile-info__trans-body--td">
                    {{ $root.conv(i.sum) }} <Sosiska />
                  </div>
                  <div class="profile-info__trans-body--td">
                    {{ $root.formatDate(i.updatedAt) }}
                  </div>
                </div>
              </div>
              <infinite-loading
                v-if="withdr.items !== null"
                ref="InfinityWithdr"
                spinner="spiral"
                @infinite="infiniteHandlerWithdr"
                style="heigth: 2px"
              ></infinite-loading>
            </div>
          </div>
        </div>
        <div class="profile-footer" v-if="currentTab === 'inventory'">
          <div class="profile-footer__list">
            <div class="profile-footer__list-item">
              <span class="profile-footer__list-item--title">{{
                $t("content.profile.selectAll")
              }}</span>
              <div class="profile-footer__list-item--action">
                <input
                  type="checkbox"
                  id="selectall"
                  v-model="allInput"
                  class="options-list__item-checkbox-input checkbox-input"
                  @change="selectAll(allInput)"
                />
                <label
                  for="selectall"
                  class="options-list__item-checkbox-label checkbox-label"
                ></label>
              </div>
            </div>
            <div class="profile-footer__list-item">
              <span class="profile-footer__list-item--title">{{
                $t("content.profile.ourSumm")
              }}</span>
              <div class="profile-footer__list-item--action sosiska-wrap">
                {{ $root.conv($root.user.balance) }} <Sosiska />
              </div>
            </div>
            <div class="profile-footer__list-item">
              <span class="profile-footer__list-item--title">{{
                $t("content.profile.selected")
              }}</span>
              <div class="profile-footer__list-item--action sosiska-wrap">
                {{ $root.conv(userInventory.selected.price) }} <Sosiska />
              </div>
            </div>
          </div>
          <div class="profile-footer__buttons">
            <button
              class="profile-footer__btn"
              @click="withItems"
              :disabled="
                Object.keys(this.userInventory.selected.items).length === 0
              "
            >
              {{ $t("content.profile.doWith") }}
            </button>
            <button
              class="profile-footer__btn"
              @click="sellItems"
              :disabled="
                Object.keys(this.userInventory.selected.items).length === 0
              "
            >
              {{ $t("content.profile.doSell") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loader v-else-if="$root.user && loading == true" />
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      currentTab: "inventory",
      allInput: false,
      trans: null,
      withdr: null,
      promoCode: null,
      loading: true,
    };
  },
  computed: {
    ...mapState({
      userInventory: "userInventory",
      user: "user",
      invPagination: "invPagination",
    }),
  },
  async mounted() {
    if (this.$root.user == null) {
      this.$router.push("/");
    } else {
      if (this.userInventory.items === null) {
        await this.getInventory();
      }
      await this.getWithItems();
      await this.getTransItems();
      this.loading = false;
    }
  },
  beforeDestroy() {
    this.clearSelectedItems();
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
    async setTradeUrl() {
      await this.$root
        .request("POST", "/api/user/tradeUrl", {
          tradeUrl: this.$root.user.tradeUrl,
        })
        .then(() => {
          this.$root.showNotify(
            "success",
            this.$t("content.profile.tradeSuccess")
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
    async infiniteHandlerTrans($state) {
      if (this.trans.links.next !== "") {
        await this.pushTrans();
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async infiniteHandlerWithdr($state) {
      if (this.withdr.links.next !== "") {
        await this.pushWithdr();
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async pushTrans() {
      await this.$root.request("GET", this.trans.links.next).then((data) => {
        data.items = data.items.filter((item) => {
          if (item.bonus) {
            var allPercent = 0;
            if (item.bonus.name !== undefined) {
              allPercent = allPercent + item.bonus.name;
            }
            if (item.bonus.referral !== undefined) {
              allPercent = allPercent + item.bonus.referral;
            }
            if (item.bonus.code !== undefined) {
              allPercent = allPercent + item.bonus.code.percentage;
            }
            if (item.bonus.depositType !== undefined) {
              allPercent = allPercent + item.bonus.depositType.percentage;
            }
            if (item.bonus.paymentSystem !== undefined) {
              allPercent = allPercent + item.bonus.paymentSystem.percentage;
            }
            item.sum = item.sum + (item.sum / 100) * allPercent;
          }
          return item;
        });
        this.trans.items.push(...data.items);
        this.trans.links = data.links;
        this.trans.meta = data.meta;
      });
    },
    async pushWithdr() {
      await this.$root.request("GET", this.withdr.links.next).then((data) => {
        this.withdr.items.push(...data.items);
        this.withdr.links = data.links;
        this.withdr.meta = data.meta;
      });
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
          this.$root.showNotify("info", this.$t("content.profile.withItems"));
        });
    },
    async getWithItems() {
      await this.$root.request("GET", "/api/withdraw").then((data) => {
        this.withdr = data;
      });
    },
    async getTransItems() {
      await this.$root.request("GET", "/api/transaction").then((data) => {
        data.items = data.items.filter((item) => {
          if (item.bonus) {
            var allPercent = 0;
            if (item.bonus.name !== undefined) {
              allPercent = allPercent + item.bonus.name;
            }
            if (item.bonus.referral !== undefined) {
              allPercent = allPercent + item.bonus.referral;
            }
            if (item.bonus.code !== undefined) {
              allPercent = allPercent + item.bonus.code.percentage;
            }
            if (item.bonus.depositType !== undefined) {
              allPercent = allPercent + item.bonus.depositType.percentage;
            }
            if (item.bonus.paymentSystem !== undefined) {
              allPercent = allPercent + item.bonus.paymentSystem.percentage;
            }
            item.sum = item.sum + (item.sum / 100) * allPercent;
          }
          return item;
        });
        this.trans = data;
      });
    },
    async sellItems() {
      await this.$root
        .request("POST", "/api/item/sell", {
          itemIds: [
            ...Object.keys(this.userInventory.selected.items).map((item) =>
              parseInt(item)
            ),
          ],
        })
        .then(() => {
          this.clearSelectedItems();
          this.$root.showNotify("info", this.$t("content.profile.sellItems"));
        });
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
  &-top {
    gap: 15px;
    display: flex;
    margin-bottom: 20px;

    &__item {
      background: #1f1f1f;
      border-radius: 10px;
      width: 100%;
      padding: 14px 15px 15px 20px;

      &-title {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        span {
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
        }
        a {
          margin-left: auto;
          font-weight: 500;
          font-size: 12px;
          line-height: 14px;
          color: #aaaaaa;
        }
      }

      &-form {
        display: flex;
        &--field {
          flex: 1;
          background: #1f1f1f;
          border: 0.5px solid #3d3d3d;
          border-radius: 10px;
          display: flex;
          align-items: center;
          input {
            margin-left: 5px;
            font-size: 14px;
            line-height: 16px;
            width: 90%;
            height: 20px;
            background: transparent;
            border: none;
            outline: none;

            &::placeholder {
              font-size: 14px;
              line-height: 16px;
            }
          }
        }

        &--btn {
          margin-left: 15px;
          width: 40px;
          height: 40px;
          background: #de3720;
          border-radius: 10px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  &-info {
    margin-top: 20px;
    &__tabs {
      display: flex;
      column-gap: 10px;
      margin-bottom: 20px;
      &-item {
        background: #1f1f1f;
        border: 1px solid #de3720;
        border-radius: 10px;
        width: 140px;
        height: 40px;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 300ms;
        cursor: pointer;
        &.active,
        &:hover {
          background: #de3720;
          border-color: #de3720;
          color: #000000;
        }
      }
    }

    &__inventory {
      display: flex;
      flex-wrap: wrap;
      gap: 11px;
      overflow-y: auto;
      max-height: calc(100vh - 420px);
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
      &-skin {
        width: 120px;
        height: 120px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        user-select: none;
        cursor: pointer;
        border: 1px solid #de3720;
        transition: all 300ms;
        &:hover {
          opacity: 0.7;
        }
        &.selected {
          opacity: 0.7;

          .profile-info__inventory-skin--selected {
            display: block;
          }
        }
        &--shadow {
          width: 100%;
          height: 100%;
          position: absolute;
          bottom: 0;
          border-radius: 10px;
          left: 0;
          background: radial-gradient(
              76% 76% at 50% 130%,
              rgba(222, 55, 32, 0.65) 0%,
              rgba(255, 41, 11, 0) 100%
            ),
            linear-gradient(0deg, #1e1e1e 13%, rgba(30, 30, 30, 0) 73.5%);
          z-index: 1;
        }
        &--selected {
          position: absolute;
          top: 0;
          right: 0;
          display: none;
        }
        img {
          width: 105px;
          height: 105px;
        }

        &--content {
          position: absolute;
          left: 9.6px;
          bottom: 25px;
          display: flex;
          flex-direction: column;
          z-index: 3;
          strong {
            font-weight: 500;
            font-size: 12px;
            line-height: 14px;
            color: #ffffff;
          }

          span {
            font-weight: 300;
            font-size: 10px;
            line-height: 12px;
            color: #999999;
            margin-top: -2px;
          }
        }

        &--price {
          position: absolute;
          z-index: 3;
          right: 0;
          bottom: 0;
          background: #de3720;
          width: 60px;
          height: 17px;
          border-radius: 10px 0px 10px 10px;
          font-weight: bold;
          font-size: 9px;
          line-height: 11px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 16px !important;
            height: 16px !important;
          }
        }
      }
    }

    &__trans {
      &-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-right: 5px;

        &--td {
          text-align: center;
          font-weight: 300;
          font-size: 12px;
          line-height: 14px;
          color: #ffffff;
          flex: 1;
        }
      }
      &-body {
        overflow-x: auto;
        max-height: calc(100vh - 325px);
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
        &-item {
          height: 40px;
          margin-right: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          &:not(:last-child) {
            margin-bottom: 10px;
          }
          &.success {
            background: linear-gradient(
              90deg,
              #a6ff00 -20.1%,
              #8a8a8a48 22.67%
            );
            .profile-info__trans-body--tr {
              background: linear-gradient(
                90deg,
                #33ff00 -20.1%,
                transparent 22.67%
              );
            }
          }
          &.error {
            background: linear-gradient(
              90deg,
              #de3720 -20.1%,
              #8a8a8a48 22.67%
            );
            .profile-info__trans-body--tr {
              background: linear-gradient(
                90deg,
                #ff0000 -20.1%,
                transparent 22.67%
              );
            }
          }
          &.waiting {
            background: linear-gradient(
              90deg,
              #0352ff -20.1%,
              #8a8a8a48 22.67%
            );
            .profile-info__trans-body--tr {
              background: linear-gradient(
                90deg,
                #0085ff -20.1%,
                transparent 22.67%
              );
            }
          }

          &.created {
            background: linear-gradient(
              90deg,
              #c2e913 -20.1%,
              #8a8a8a48 22.67%
            );
            .profile-info__trans-body--tr {
              background: linear-gradient(
                90deg,
                #c2e913 -20.1%,
                transparent 22.67%
              );
            }
          }
        }
        &--tr {
          border-radius: 9px;
          width: calc(100% - 4px);
          height: calc(100% - 4px);
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        &--td {
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
      }
    }
  }

  &-footer {
    background: #1f1f1f;
    border-radius: 10px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    height: 100px;
    padding: 20px 25px 20px 20px;
    display: flex;
    align-items: center;
    &__list {
      display: flex;
      gap: 20px;
      &-item {
        display: flex;
        flex-direction: column;
        &--title {
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;
          color: #7b7b7b;
          margin-bottom: 13px;
        }

        &--action {
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #fff;
        }
      }
    }

    &__buttons {
      display: flex;
      margin-left: auto;
    }

    &__btn {
      background: #de3720;
      border-radius: 10px;
      width: 140px;
      height: 40px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      bottom: none;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 300ms;
      border: 1px solid transparent;
      margin-left: auto;
      &:hover {
        background: #3d3d3d;
        color: #fff;
        border: 1px solid #de3720;
      }

      &:last-child {
        margin-left: 10px;
      }
    }
  }
}

@media screen and (max-width: 1500px) {
  .profile {
    &-top {
      flex-direction: column;
      &__item {
        flex: 1;
        width: unset;
      }
    }

    &-info {
      &__inventory {
        height: calc(100vh - 540px);
      }

      &__trans-body {
        height: calc(100vh - 445px);
      }
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
}

@media screen and (max-width: 900px) {
  .profile {
    &-footer {
      bottom: 345px;
      width: calc(100% - 20px);
      height: 105px;
      padding: 10px 15px 10px 20px;
      align-items: flex-end;
      &__list {
        flex-wrap: wrap;
        width: 160px;
        gap: 10px;
        &-item {
          &:first-child {
            width: 100%;
            flex-direction: row-reverse;
            justify-content: flex-end;

            .profile-footer__list-item--title {
              margin: 0;
              margin-left: 17px;
            }
          }
        }
      }

      &__buttons {
        flex-direction: column;
        gap: 5px;
      }

      &__btn {
        width: 110px;
      }
    }

    &-info {
      &__inventory {
        margin-top: 125px;
        max-height: unset;
        height: 310px;
      }
    }
  }

  .profile-info__trans-body--td {
    text-align: center;
    font-size: 12px;
    line-height: 14px;
  }

  .profile-info__inventory-skin {
    width: 101px;
    height: 101px;
  }
}
</style>