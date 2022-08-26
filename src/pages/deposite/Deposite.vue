<template>
  <div class="profile" v-if="$root.user && loading == false">
    <ProfileInfo />
    <div class="profile-content">
      <div class="profile-header">{{ $t("content.deposit.title") }}</div>
      <div class="profile-body">
        <div class="deposite">
          <div class="deposite-steam">
            <div class="deposite-title">{{ $t("content.deposit.inv") }}</div>
            <div class="deposite-steam__form">
              <div class="deposite-steam__form-search">
                <input
                  type="text"
                  name=""
                  id=""
                  :placeholder="$t('content.market.search')"
                />
              </div>
              <div
                class="deposite-steam__form-select select"
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
                    $t("content.deposit.rare")
                  }}</span>
                  <span v-else>{{ selectRare.name }}</span>
                </div>
                <div class="select-list" v-if="selectRareOpen">
                  <span
                    v-if="selectRare.value !== null"
                    @click="selectRare = { name: 'All', value: null }"
                  >
                    {{ $t("content.deposit.all") }}
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
              <div class="deposite-steam__form-max price-input">
                <div class="price-input__name">
                  {{ $t("content.deposit.price") }}
                </div>
                <input type="number" placeholder="0.01" />
              </div>
            </div>
            <div class="deposite-steam__list">
              <div
                class="skin"
                :class="[
                  typeof depositeInv.selected.items[item.assetid] ===
                  'undefined'
                    ? ''
                    : 'selected',
                ]"
                v-for="item in depositeInv.items"
                :key="item.inventId"
                :style="{ border: `1px solid #${item.nameColor}` }"
                @click="selectDepositeItem(item)"
              >
                <img
                  :src="
                    'https://steamcommunity-a.akamaihd.net/economy/image/' +
                    item.iconUrl
                  "
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
                    border: '1px solid #' + item.nameColor,
                  }"
                >
                  {{ $root.conv(item.price) }} <Sosiska />
                </div>
                <div
                  class="skin--shadow"
                  :style="{
                    background:
                      'radial-gradient(76% 76% at 50% 114%, #' +
                      item.nameColor +
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
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
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
              </div>
            </div>
          </div>
          <div class="deposite-site">
            <div class="deposite-title">
              {{ $t("content.deposit.invRust") }}
            </div>
            <div class="deposite-site__header" @click="depositeItems">
              <div class="deposite-site__header-item sosiska-wrap">
                {{ $t("content.deposit.balance") }}
                <span class="sosiska-wrap"
                  >{{
                    $root.user !== null ? $root.conv($root.user.balance) : "0"
                  }}
                  <Sosiska
                /></span>
              </div>
              <div class="deposite-site__header-item sosiska-wrap">
                {{ $t("content.deposit.selected") }}
                <span class="green sosiska-wrap"
                  >{{ $root.conv(depositeInv.selected.price) }} <Sosiska
                /></span>
              </div>
              <div class="deposite-site__header-btn">
                {{ $t("content.deposit.dep") }}
              </div>
            </div>
            <div class="deposite-site__list">
              <div
                class="skin"
                v-for="item in depositeInv.selected.items"
                :key="item.inventId"
                :style="{ border: `1px solid #${item.nameColor}` }"
                @click="selectDepositeItem(item)"
              >
                <img
                  :src="
                    'https://steamcommunity-a.akamaihd.net/economy/image/' +
                    item.iconUrl
                  "
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
                    border: '1px solid #' + item.nameColor,
                  }"
                >
                  {{ $root.conv(item.price) }} <Sosiska />
                </div>
                <div
                  class="skin--shadow"
                  :style="{
                    background:
                      'radial-gradient(76% 76% at 50% 114%, #' +
                      item.nameColor +
                      ' 0%, rgba(255, 41, 11, 0) 100%), linear-gradient(0deg, #1e1e1e 13%, rgba(30, 30, 30, 0) 73.5%)',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="deposite-bonus">
          <div class="if">
            <div class="promocode">
              <div class="promo-title">
                {{ $t("content.deposit.promodep") }}
              </div>
              <fieldset class="promocode-field">
                <input
                  v-model="code"
                  :placeholder="$t('content.deposite.code')"
                  type="text"
                />
                <svg
                  class="btn-tr"
                  @click="checkCode"
                  width="30"
                  height="26"
                  viewBox="0 0 30 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.1025 4.49548C24.1854 3.75051 22.8659 3.85814 22.1546 4.73385L12.7783 16.2938L7.88426 9.93416C7.15422 8.98629 5.79372 8.80899 4.8458 9.53819C3.89704 10.2678 3.71979 11.6287 4.44983 12.5779L11.0188 21.114C11.7488 22.0618 13.1097 22.2395 14.0581 21.5099C14.3285 21.3019 14.5284 21.0392 14.6702 20.7521L25.4771 7.42968C26.1879 6.5527 26.02 5.23961 25.1025 4.49548Z"
                    fill="#DE3720"
                  />
                </svg>
              </fieldset>
            </div>
            <div class="nickname">
              <div class="promo-title">
                {{ $t("content.deposit.nicknameRule") }}
              </div>
              <fieldset class="nickname-field">
                <input
                  :value="$root.settings.bonus.name.profileString"
                  disabled
                  type="text"
                />
                <div class="nickname-field__right">
                  <span> +10% </span>
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.7327 10.7045L22.0658 9.82674L22.4289 8.7857C22.6234 8.22812 22.4223 7.60927 21.9373 7.27259L21.0316 6.6438L21.0553 5.54164C21.068 4.9512 20.6856 4.4248 20.1201 4.2544L19.0645 3.93627L18.7464 2.8807C18.576 2.31513 18.047 1.93253 17.4592 1.94549L16.3571 1.96916L15.7284 1.06356C15.3916 0.578482 14.7728 0.377142 14.2151 0.571883L13.174 0.934965L12.2963 0.268007C11.8261 -0.0893357 11.1754 -0.0893357 10.7051 0.268007L9.82738 0.934965L8.78629 0.571883C8.22861 0.37719 7.60981 0.578435 7.27304 1.06356L6.64439 1.96916L5.54228 1.94549C4.95203 1.93339 4.42539 2.31527 4.25499 2.8807L3.93692 3.93627L2.88134 4.2544C2.31587 4.4248 1.93342 4.95129 1.94619 5.54169L1.96981 6.6438L1.06421 7.27259C0.579083 7.60927 0.377934 8.22812 0.572578 8.7857L0.935612 9.82674L0.268703 10.7045C-0.0885912 11.1747 -0.0885912 11.8254 0.268703 12.2956L0.93566 13.1733L0.572626 14.2144C0.37803 14.7719 0.579178 15.3909 1.06426 15.7275L1.96986 16.3562L1.94623 17.4584C1.93342 18.0489 2.31587 18.5753 2.88139 18.7456L3.93696 19.0639L4.25504 20.1192C4.42544 20.6848 4.95318 21.0644 5.54233 21.0547L6.64444 21.0309L7.27309 21.9366C7.60991 22.4216 8.22871 22.6229 8.78634 22.4281L9.82742 22.0651L10.7052 22.7321C10.9403 22.9107 11.2205 23.0001 11.5007 23.0001C11.781 23.0001 12.0612 22.9107 12.2963 22.7321L13.1741 22.0651L14.2151 22.4281C14.7728 22.6227 15.3917 22.4217 15.7284 21.9366L16.3571 21.0309L17.4592 21.0547C18.0524 21.0671 18.576 20.6849 18.7464 20.1192L19.0645 19.0639L20.1201 18.7456C20.6855 18.5754 21.0679 18.0489 21.0553 17.4584L21.0316 16.3562L21.9373 15.7275C22.4224 15.3909 22.6235 14.772 22.4289 14.2144L22.0658 13.1733L22.7327 12.2956C23.09 11.8254 23.09 11.1747 22.7327 10.7045ZM5.2418 9.54305C5.2418 7.6779 6.41034 6.37521 8.08347 6.37521C9.7467 6.37521 10.8214 7.55466 10.8214 9.37997C10.8214 11.5871 9.36372 12.5923 8.00934 12.5923C6.37987 12.5923 5.2418 11.3384 5.2418 9.54305ZM9.45416 16.5512C9.42886 16.5966 9.38089 16.6249 9.32881 16.6249H8.12799C8.07715 16.6249 8.03014 16.598 8.00436 16.5542C7.97859 16.5104 7.97787 16.4561 8.00255 16.4117L13.5324 6.44906C13.5577 6.40348 13.6057 6.37521 13.6579 6.37521H14.8736C14.9244 6.37521 14.9715 6.40214 14.9973 6.44595C15.023 6.4898 15.0237 6.54399 14.9989 6.58842L9.45416 16.5512ZM14.9477 16.5952C13.3328 16.5952 12.1948 15.3417 12.1801 13.5471C12.1801 11.6808 13.3487 10.3781 15.0218 10.3781C16.685 10.3781 17.7597 11.5575 17.7597 13.3829C17.7597 15.59 16.302 16.5952 14.9477 16.5952Z"
                      fill="#33FF00"
                    />
                  </svg>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="bonus">
            <span class="bonus-title">{{ $t("content.deposit.bonuses") }}</span>
            <div class="bonus-list">
              <div class="bonus-list__item main-item">
                <div class="bonus-list__item-title">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.9565 3.11632H13.7919C13.9455 2.8732 14.0469 2.60029 14.0758 2.31167C14.1681 1.38926 13.6823 0.562387 12.8553 0.195794C12.0951 -0.141175 11.2408 -0.00342518 10.6257 0.554512L9.15506 1.88732C8.86866 1.57407 8.45694 1.3772 8 1.3772C7.54225 1.3772 7.12988 1.5747 6.84341 1.88892L5.37091 0.554356C4.75475 -0.0035814 3.90081 -0.1408 3.14097 0.195981C2.31416 0.562606 1.82828 1.38976 1.92091 2.31214C1.94987 2.60054 2.05119 2.87332 2.20478 3.11632H1.04347C0.467156 3.11632 0 3.58351 0 4.15979V5.72501C0 6.01314 0.233594 6.24676 0.52175 6.24676H15.4783C15.7664 6.24676 16 6.01317 16 5.72501V4.15979C16 3.58351 15.5328 3.11632 14.9565 3.11632ZM6.43478 2.94242V3.11632H3.98031C3.33181 3.11632 2.82144 2.51176 2.98341 1.83657C3.05475 1.53923 3.26937 1.28576 3.54697 1.15745C3.92816 0.981262 4.35041 1.03782 4.67056 1.32761L6.43522 2.92704C6.43512 2.9322 6.43478 2.93726 6.43478 2.94242ZM13.0404 2.17314C13.0016 2.71542 12.5117 3.11639 11.9681 3.11639H9.56522V2.94248C9.56522 2.93632 9.56484 2.93023 9.56478 2.92407C9.96453 2.5617 10.8317 1.7757 11.3021 1.34936C11.5694 1.10707 11.9434 0.993981 12.2892 1.09711C12.7853 1.24511 13.0767 1.66704 13.0404 2.17314Z"
                      fill="#DE3720"
                    />
                    <path
                      d="M1.04346 7.29034V14.9425C1.04346 15.5188 1.51061 15.986 2.08693 15.986H6.95649V7.29034H1.04346Z"
                      fill="#DE3720"
                    />
                    <path
                      d="M9.04346 7.29034V15.986H13.913C14.4893 15.986 14.9565 15.5188 14.9565 14.9425V7.29034H9.04346Z"
                      fill="#DE3720"
                    />
                  </svg>
                  <span>{{ $t("content.deposit.allBonus") }}</span>
                </div>
                <div class="bonus-list__item-percent">+{{ allPercent }}%</div>
              </div>
              <div
                class="bonus-list__item"
                :class="{ 'main-item': codePercent !== 0 }"
              >
                <span class="bonus-list__item-title">
                  {{ $t("content.deposit.promodep") }}</span
                >
                <div class="bonus-list__item-percent">+{{ codePercent }}%</div>
              </div>
              <div
                class="bonus-list__item"
                :class="{ 'main-item': data.name !== undefined }"
              >
                <span class="bonus-list__item-title">
                  {{ $root.settings.bonus.name.profileString }}
                  {{ $t("content.deposit.inName") }}</span
                >
                <div class="bonus-list__item-percent">
                  +{{ data.name !== undefined ? data.name : "0" }}%
                </div>
              </div>
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
      loading: true,
      trade: false,
      tradeID: null,
      selectRareOpen: false,
      selectRare: {
        name: "All",
        value: null,
      },
      items: null,
      depositeInv: {
        items: [],
        selected: {
          items: {},
          price: 0.0,
        },
      },

      //
      allPercent: 0,
      data: {},
      code: null,
      codeUse: null,
      codePercent: 0,
    };
  },
  computed: {
    payWithBonus() {
      if (this.depositeInv.selected.price) {
        var percent = parseInt(this.allPercent) / 100;
        return (
          parseInt(this.depositeInv.selected.price) +
          parseInt(this.depositeInv.selected.price) * percent
        );
      } else {
        return 0;
      }
    },
  },
  watch: {
    selectRare(val) {
      if (val.value === null) {
        this.depositeInv.items = this.items;
      } else {
        this.depositeInv.items = this.items.filter((item) => {
          for (let i = 0; i < item.tags.length; i++) {
            const tag = item.tags[i];
            if (tag.name === val.name) {
              return item;
            }
          }
        });
      }
    },
  },
  async created() {
    if (this.$root.user == null) {
      this.$router.push("/");
    } else {
      await this.$root.request("GET", "/api/deposit/inventory").then((data) => {
        this.items = data.sort((a, b) => b.price - a.price);
        this.depositeInv.items = this.items;
      });
      await this.$root.request("GET", "/api/bonus/deposit").then((resp) => {
        this.data = resp;
        if (resp.name) {
          this.allPercent = this.allPercent + resp.name;
        }
        if (resp.referral) {
          this.allPercent = this.allPercent + resp.referral;
        }
      });
      this.loading = false;
    }
  },
  methods: {
    selectDepositeItem(item) {
      if (
        typeof this.depositeInv.selected.items[item.assetid] !== "undefined"
      ) {
        delete this.depositeInv.selected.items[item.assetid];
        this.depositeInv.selected.price = parseFloat(
          (this.depositeInv.selected.price - item.price).toFixed(2)
        );
      } else {
        this.depositeInv.selected.items[item.assetid] = item;
        this.depositeInv.selected.price = parseFloat(
          (this.depositeInv.selected.price + item.price).toFixed(2)
        );
      }
      this.$forceUpdate();
    },
    async depositeItems() {
      await this.$root
        .request("POST", "/api/deposit/steam", {
          idList: [...Object.keys(this.depositeInv.selected.items)],
          promo: this.codeUse,
        })
        .then(() => {
          this.$root.showNotify(
            "success",
            this.$t("content.deposite.depositeCreated")
          );
        });
    },
    async checkCode() {
      this.codeUse = null;
      this.$root
        .request("GET", "/api/bonus/deposit/code/check", {
          value: this.code,
        })
        .then((resp) => {
          this.codeUse = this.code;
          this.allPercent = this.allPercent + resp.percentage;
          this.codePercent = resp.percentage;
          this.$root.showNotify(
            "success",
            this.$t("content.deposite.checkCode", { 0: this.code })
          );
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
}

.deposite {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;

  & > div {
    background: #232323;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 545px;
    flex: 1;
    padding: 20px;
  }

  &-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
    margin-left: -7px;
    margin-bottom: 20px;
  }
  &-steam {
    &__form {
      display: flex;
      margin-bottom: 20px;
      &-search {
        margin-right: 10px;
        input {
          width: 163px;
          height: 34px;
          background: #181818;
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

      &-select {
        margin-right: 24px;
      }

      &-max {
        width: 123px;
      }
    }
    &__list {
      display: flex;
      min-height: 100px;
      max-height: 400px;
      gap: 10px;
      flex-wrap: wrap;
      overflow-y: auto;

      & > div {
        cursor: pointer;
        transition: all 300ms;
        &:hover {
          opacity: 0.7;
        }
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

  &-site {
    &__header {
      background: #434343;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      display: flex;
      align-items: center;
      height: 54px;
      padding: 12px 20px;
      margin-bottom: 20px;
      &-item {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #7b7b7b;
        &:not(:last-child) {
          margin-right: 30px;
        }
        span {
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
          margin-left: 5px;
          &.green {
            color: #72f235;
          }
        }
      }

      &-btn {
        width: 146px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #de3720;
        border-radius: 10px;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        margin-left: auto;
        transition: all 300ms;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
    }
    &__list {
      display: flex;
      min-height: 100px;
      max-height: 400px;
      gap: 10px;
      flex-wrap: wrap;
      overflow-y: auto;

      & > div {
        cursor: pointer;
        transition: all 300ms;
        &:hover {
          opacity: 0.7;
        }
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
}

.deposite-bonus {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.if {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.promocode,
.nickname {
  flex: 1;
  &-field {
    display: flex;
    border-radius: 20px;
    height: 50px;
    align-items: center;
    border: none;
    outline: none;

    input {
      background: transparent;
      border: none;
      outline: none;
      margin-right: auto;
    }
  }
}

.promocode {
  margin-bottom: 23px;
  &-field {
    padding: 11px 17px 12px 21px;
    background: linear-gradient(90deg, #181818 50%, #de3720 120%);
    input {
      font-family: "Oswald";
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      color: #fff;
      text-transform: uppercase;
      &::placeholder {
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        color: #9c9c9c;
        text-transform: uppercase;
      }
    }
  }
}

.nickname {
  &-field {
    padding: 14px 17px 15px 21px;
    background: linear-gradient(90deg, #181818 50%, rgba(110, 238, 78, 1) 120%);

    input {
      font-weight: 500;
      color: #ffffff;
      font-family: "Oswald";
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #ffffff;
    }

    &__right {
      display: flex;
      align-items: center;
      span {
        font-family: "Oswald";
        font-size: 14px;
        line-height: 21px;
        font-weight: 500;
        display: inline-block;
        font-weight: 500;
        color: #33ff00;
        margin-right: 4px;
      }
    }
  }
}

.promo-title {
  margin-bottom: 17px;
  text-transform: uppercase;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #fff;
}

.bonus {
  flex: 1;
  margin-left: auto;
  &-title {
    display: inline-block;
    text-transform: uppercase;
    margin-bottom: 17px;
    font-family: "Oswald";
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #ffffff;
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    &__item {
      width: 100%;
      display: flex;
      background: #181818;
      border-radius: 20px;

      &:not(:last-child) {
        margin-bottom: 20px;
      }
      &-title {
        font-family: "Oswald";
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        padding: 14px 0 15px 18px;
        color: #7d7d7d;
        flex: 1;
        text-transform: uppercase;
      }

      &-percent {
        background: #2b2b2b;
        border-radius: 20px;
        min-width: 60px;
        max-width: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Oswald";
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        color: #7d7d7d;
      }
    }

    &__item.main-item {
      background: rgba(222, 55, 32, 0.2);

      svg {
        filter: drop-shadow(0px 0px 10px #de3720);
        margin-right: 15px;
      }

      .bonus-list__item-title {
        display: flex;
        align-items: center;
        padding: 12px 0 12px 18px;

        span {
          font-family: "Oswald";
          font-weight: 500;
          font-size: 18px;
          line-height: 27px;
          color: #fff;
        }
      }

      .bonus-list__item-percent {
        background: #de3720;
        color: #fff;
      }
    }
  }
}

@media screen and (max-width: 1860px) {
  .deposite {
    & > div {
      width: 100%;
      flex: unset;
    }
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

@media screen and (max-width: 600px) {
  .deposite > div {
    padding: 10px;
  }

  .deposite {
    &-title {
      margin-left: 13px;
    }

    &-steam {
      &__form {
        gap: 10px;

        & > div {
          margin: 0;
        }
        &-search input {
          width: 100px;
        }

        &-select {
          width: 100px;
        }

        &-max {
          width: 100px;
        }
      }
    }

    &-site {
      &__header {
        padding: 12px 15px;
        &-item {
          &:not(:last-child) {
            margin-right: 15px;
          }
          font-size: 10px;
          line-height: 12px;
          span {
            font-size: 10px;
            line-height: 12px;
          }
        }

        &-btn {
          width: 100px;
        }
      }
    }
  }
}
</style>