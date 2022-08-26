<template>
  <div class="up" v-if="loading == false">
    <div class="up-game">
      <div class="up-game__inventory">
        <Inventory />
      </div>
      <div class="up-game__main">
        <div class="up-game__main-game">
          <svg
            width="270"
            height="270"
            viewBox="0 0 270 270"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="135"
              cy="135"
              r="130"
              stroke="#232323"
              stroke-width="10"
            />
            <circle
              cx="135"
              cy="135"
              r="110"
              stroke="#1D1D1D"
              stroke-width="30"
            />
            <circle
              cx="135"
              cy="135"
              r="95"
              fill="url(#paint0_radial_79_2221)"
              fill-opacity="0.2"
            />
            <circle
              v-if="dashOff"
              :stroke-dasharray="dashArr"
              :stroke-dashoffset="dashOff"
              id="st0"
              cy="135"
              cx="135"
              r="130"
              fill="transparent"
              stroke="#DE3720"
              stroke-width="10"
              ref="st0"
            ></circle>
            <rect x="134" y="16" width="2" height="17" rx="1" fill="#343434" />
            <rect x="134" y="237" width="2" height="17" rx="1" fill="#343434" />
            <rect
              x="103.217"
              y="20.1842"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-15 103.217 20.1842)"
              fill="#343434"
            />
            <rect
              x="160.416"
              y="233.654"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-15 160.416 233.654)"
              fill="#343434"
            />
            <rect
              x="74.5664"
              y="32.193"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-30 74.5664 32.193)"
              fill="#343434"
            />
            <rect
              x="185.066"
              y="223.585"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-30 185.066 223.585)"
              fill="#343434"
            />
            <rect
              x="50"
              y="51.2079"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-45 50 51.2079)"
              fill="#343434"
            />
            <rect
              x="206.271"
              y="207.478"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-45 206.271 207.478)"
              fill="#343434"
            />
            <rect
              x="31.1914"
              y="75.933"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-60 31.1914 75.933)"
              fill="#343434"
            />
            <rect
              x="222.584"
              y="186.433"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-60 222.584 186.433)"
              fill="#343434"
            />
            <rect
              x="19.4238"
              y="104.684"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-75 19.4238 104.684)"
              fill="#343434"
            />
            <rect
              x="232.893"
              y="161.883"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-75 232.893 161.883)"
              fill="#343434"
            />
            <rect
              x="15.498"
              y="135.5"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-90 15.498 135.5)"
              fill="#343434"
            />
            <rect
              x="236.498"
              y="135.5"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-90 236.498 135.5)"
              fill="#343434"
            />
            <rect
              x="19.4238"
              y="104.682"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-75 19.4238 104.682)"
              fill="#343434"
            />
            <rect
              x="232.893"
              y="161.881"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-75 232.893 161.881)"
              fill="#343434"
            />
            <rect
              x="15.498"
              y="135.499"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-90 15.498 135.499)"
              fill="#343434"
            />
            <rect
              x="236.498"
              y="135.499"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-90 236.498 135.499)"
              fill="#343434"
            />
            <rect
              x="19.6836"
              y="166.281"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-105 19.6836 166.281)"
              fill="#343434"
            />
            <rect
              x="233.152"
              y="109.082"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-105 233.152 109.082)"
              fill="#343434"
            />
            <rect
              x="31.6914"
              y="194.932"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-120 31.6914 194.932)"
              fill="#343434"
            />
            <rect
              x="223.084"
              y="84.4318"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-120 223.084 84.4318)"
              fill="#343434"
            />
            <rect
              x="50.7051"
              y="219.499"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-135 50.7051 219.499)"
              fill="#343434"
            />
            <rect
              x="206.977"
              y="63.2287"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-135 206.977 63.2287)"
              fill="#343434"
            />
            <rect
              x="75.4316"
              y="238.307"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-150 75.4316 238.307)"
              fill="#343434"
            />
            <rect
              x="185.932"
              y="46.9151"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-150 185.932 46.9151)"
              fill="#343434"
            />
            <rect
              x="104.182"
              y="250.075"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-165 104.182 250.075)"
              fill="#343434"
            />
            <rect
              x="161.381"
              y="36.605"
              width="2"
              height="17"
              rx="1"
              transform="rotate(-165 161.381 36.605)"
              fill="#343434"
            />
            <defs>
              <filter
                id="filter0_d_79_2221"
                x="78.0723"
                y="92.656"
                width="112.828"
                height="65.848"
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
                <feGaussianBlur stdDeviation="10" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_79_2221"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_79_2221"
                  result="shape"
                />
              </filter>
              <radialGradient
                id="paint0_radial_79_2221"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(135 135) rotate(90) scale(78)"
              >
                <stop stop-color="#DE3720" />
                <stop offset="1" stop-color="#DE3720" stop-opacity="0" />
              </radialGradient>
            </defs>
          </svg>
          <div
            class="arrow"
            :style="{
              transform: `translate(-50%,-50%) rotate(${per * 3.6}deg)`,
              transition: `all ${perTm}s`,
            }"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.330557 23.7415C0.663551 24.0445 1.15756 24.0845 1.53752 23.8435L12.0003 17.1857L22.4632 23.8435C22.8421 24.0835 23.3352 24.0436 23.6701 23.7415C24.0031 23.4406 24.0951 22.9546 23.8951 22.5526L12.8953 0.552974C12.7253 0.213979 12.3793 8.91436e-07 12.0003 8.58305e-07C11.6214 8.25173e-07 11.2753 0.213979 11.1054 0.552974L0.105562 22.5526C-0.0954341 22.9546 -0.00341983 23.4406 0.330557 23.7415Z"
                fill="#DE3720"
              />
            </svg>
          </div>

          <div
            class="up-game__main-game--wrapper select-skin"
            v-if="this.isWin === null"
          >
            <div
              class="up-game__main-game--title"
              v-if="Object.values(magInventory.selected.items).length == 0"
            >
              {{ $t("content.up.chanceUp") }}
            </div>
            <div
              v-if="Object.values(magInventory.selected.items).length > 0"
              class="skin"
              :key="Object.values(magInventory.selected.items)[0].id"
              :style="{
                border: `1px solid #${
                  Object.values(magInventory.selected.items)[0].bc
                }`,
              }"
            >
              <img
                :src="
                  $root.steamUrl +
                  Object.values(magInventory.selected.items)[0].i +
                  '/70fx70f'
                "
                alt=""
              />
              <div class="skin--content">
                <strong>{{
                  Object.values(magInventory.selected.items)[0].mn
                }}</strong>
                <span></span>
              </div>
              <div
                class="skin--price"
                :style="{
                  background: 'black',
                  color: '#fff',
                  border:
                    '1px solid #' +
                    Object.values(magInventory.selected.items)[0].bc +
                    '!important',
                }"
              >
                {{
                  $root.conv(Object.values(magInventory.selected.items)[0].p)
                }}
                <Sosiska />
              </div>
              <div
                class="skin--shadow"
                :style="{
                  background:
                    'radial-gradient(76% 76% at 50% 114%, #' +
                    Object.values(magInventory.selected.items)[0].bc +
                    ' 0%, rgba(255, 41, 11, 0) 100%), linear-gradient(0deg, #1e1e1e 13%, rgba(30, 30, 30, 0) 73.5%)',
                }"
              ></div>
            </div>
            <div
              class="up-game__main-game--chance"
              v-if="chance > 0 && chance !== 'Infinity'"
            >
              {{ chance }}%
            </div>
            <div class="up-game__main-game--chance" v-else>0%</div>
          </div>

          <div class="up-game__main-game--wrapper" v-if="this.isWin === false">
            <div class="up-game__main-game--title">
              {{ $t("content.up.youLose") }}
            </div>
          </div>

          <div class="up-game__main-game--wrapper" v-if="this.isWin === true">
            <div class="up-game__main-game--title">
              {{ $t("content.up.youWon") }}
            </div>
            <div
              class="skin"
              :key="winItem.id"
              :style="{ border: `1px solid #${winItem.bc}` }"
            >
              <img :src="$root.steamUrl + winItem.i + '/70fx70f'" alt="" />
              <div class="skin--content">
                <strong>{{ winItem.mn }}</strong>
                <span></span>
              </div>
              <div
                class="skin--price"
                :style="{
                  background: 'black',
                  color: '#fff',
                  border: '1px solid #' + winItem.bc + '!important',
                }"
              >
                {{ $root.conv(winItem.p) }} <Sosiska />
              </div>
              <div
                class="skin--shadow"
                :style="{
                  background:
                    'radial-gradient(76% 76% at 50% 114%, #' +
                    winItem.bc +
                    ' 0%, rgba(255, 41, 11, 0) 100%), linear-gradient(0deg, #1e1e1e 13%, rgba(30, 30, 30, 0) 73.5%)',
                }"
              ></div>
            </div>
          </div>
        </div>

        <div class="up-game__main-buttons">
          <button :disabled="status == 1" class="btn-tr" @click="selectXItem(1.5)">x1.5</button>
          <button :disabled="status == 1" class="btn-tr" @click="selectXItem(3)">x3</button>
          <button :disabled="status == 1" class="btn-tr" @click="selectXItem(5)">x5</button>
          <button :disabled="status == 1" class="btn-tr" @click="selectXItem(10)">x10</button>
        </div>
        <button
          :disabled="
            status === 1 ||
            chance == 'Infinity' ||
            chance == 'NaN' ||
            chance == 0
          "
          class="up-game__main-play"
          @click="createBet"
        >
          {{ $t("content.up.upgrade") }}
        </button>

        <div class="footer" v-if="hash !== null">
          <div class="footer-true" @click="$root.fair = true">
            <img src="/img/true.svg"  width="16px" height="18px" alt="True Fact" />
            <span>{{ $t("content.true") }}</span>
          </div>
        </div>
      </div>
      <div class="up-game__skins">
        <div class="up-game__skins-header">
          <div class="up-game__skins-header--title">
            <span>{{ $t("content.up.selectItems") }}</span>
            <span
              >{{ $t("content.up.allHave") }} {{ this.allItems.length }}</span
            >
          </div>
          <div class="up-game__skins-header--form">
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
        </div>

        <div class="up-game__skins-wrapper">
          <div v-if="loadingMarket" class="up-game__skins-list">
            <div
              class="skin"
              :class="[
                typeof magInventory.selected.items[item.id] === 'undefined'
                  ? ''
                  : 'selected',
              ]"
              v-for="item in magInventory.items"
              :key="item.id"
              :style="{ border: `1px solid #${item.bc}` }"
              @click="selectMagItem(item)"
            >
              <img :src="$root.steamUrl + item.i + '/123fx123f'" alt="" />
              <div class="skin--content">
                <strong>{{ item.mn }}</strong>
                <span></span>
              </div>
              <div
                class="skin--price"
                :style="{
                  background: 'black',
                  color: '#fff',
                  border: '1px solid #' + item.bc,
                }"
              >
                {{ $root.conv(item.p) }} <Sosiska />
              </div>
              <div
                class="skin--shadow"
                :style="{
                  background:
                    'radial-gradient(76% 76% at 50% 114%, #' +
                    item.bc +
                    ' 0%, rgba(255, 41, 11, 0) 100%), linear-gradient(0deg, #1e1e1e 13%, rgba(30, 30, 30, 0) 73.5%)',
                }"
              ></div>
              <div class="skin--selected">
                <img src="/img/selected.svg" width="22px" height="22px" alt="Selected">
              </div>
            </div>
              <div
              class="up-game__skins-list--empty"
              v-if="magInventory.items.length === 0"
            >
              {{ $t("content.market.notfind") }}
            </div>
            
            <infinite-loading
              v-if="magInventory.items.length !== 0"
              ref="Infinity"
              spinner="spiral"
              @infinite="infiniteHandler"
              style="heigth: 10px"
            ></infinite-loading>
          </div>
          <div v-else class="loading">
            <img src="/img/loading.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="up-history">
      <div class="up-history__head">
        <div class="th">{{ $t("content.up.player") }}</div>
        <div class="th">{{ $t("content.up.skins") }}</div>
        <div class="th">{{ $t("content.up.chance") }}</div>
        <div class="th">{{ $t("content.up.win") }}</div>
      </div>
      <div class="up-history__body">
        <div
          class="tr"
          :class="{
            wait: bet.processedAt === undefined,
            win: bet.win !== null && bet.processedAt !== undefined,
            lose: bet.win === null && bet.processedAt !== undefined,
          }"
          v-for="bet in history"
          :key="bet.id"
        >
          <div class="td avatar">
            <img
              @click="$router.push(`/user/${bet.user.uuid}`)"
              :src="
                'https://avatars.akamai.steamstatic.com/' +
                    bet.user.avatar +
                    '_medium.jpg'
              "
              :alt="bet.user.userName"
            />
          </div>
          <div class="td skins">
            <div class="skins-items">
              <img
                v-for="item in bet.items.slice(0, 2)"
                :src="$root.steamUrl + item.image + '/36fx36f'"
                :alt="item.marketName"
                :key="item.id"
              />
              <div class="skins-items--more" v-if="bet.items.length > 2">
                +{{ bet.items.length - 2 }}
              </div>
            </div>
            <div class="val sosiska-wrap">
              {{ $root.conv(bet.sum) }} <Sosiska />
            </div>
          </div>
          <div class="td perc">
            {{ ((1 / bet.coefficient) * 100).toFixed(2) }}%
          </div>
          <div class="td end">
            <div
              class="sosiska-wrap"
              v-if="bet.win !== null && bet.processedAt !== undefined"
            >
              {{ $root.conv(bet.win) }} <Sosiska />
            </div>
            <div v-if="bet.processedAt === undefined">
              {{ $t("content.up.inGame") }}
            </div>
            <div v-if="bet.win == null && bet.processedAt !== undefined">
              {{ $t("content.up.lose") }}
            </div>
          </div>
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
import InfiniteLoading from "vue-infinite-loading";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      loading: true,
      hash: null,
      salt: null,
      dataMulti: null,
      chance: 0,
      dashArr: null,
      dashOff: null,
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
      page: null,
      next: null,
      allItems: null,
      totalPage: null,
      minUp: null,
      maxUp: null,
      per: 0,
      isWin: null,
      perTm: 5,
      winItem: null,
      status: 0,
      history: [],
    };
  },
  async created() {
    if (localStorage.getItem("dataItems")) {
      this.allItems = JSON.parse(localStorage.getItem("dataItems"));
      this.allItems = Object.values(this.allItems).sort((a, b) => b.p - a.p);
      await this.fetchMarket();
    }
    await this.$root.request("GET", "/api/game/3/history").then((resp) => {
      this.history = resp.map((item) => {
        return item.bet;
      });
    });
    var intr = setInterval(() => {
      if (this.$socket.connected) {
        this.loading = false;
        clearInterval(intr);
      }
    }, 500);
  },
  watch: {
    min() {
      this.debounce(this.fetchMarket, 1000)();
    },
    max() {
      this.debounce(this.fetchMarket, 1000)();
    },
    search() {
      this.debounce(this.fetchMarket, 1000)();
    },
    totalPage() {
      if (this.$refs.Infinity !== undefined) {
        this.$refs.Infinity.stateChanger.reset();
      }
    },
    "userInventory.selected.price"() {
      if (this.status == 0) {
        this.isWin = null;
        this.perTm = 0;
        this.per = 0;
        this.winItem = null;
      }

      var sum = 0;
      this.magInventory.selected.price = 0.0;
      this.magInventory.selected.items = {};
      Object.values(this.userInventory.selected.items).forEach(
        (item) => (sum += item.price)
      );
      this.minUp =
        (this.userInventory.selected.price /
          this.$root.settings.games.upgrader.multiplierPercentageMax) *
          100 +
        1;
      this.fetchMarket();
    },
    "magInventory.selected.items"() {
      if (this.status == 0) {
        this.isWin = null;
        this.perTm = 0;
        this.per = 0;
        this.winItem = null;
        this.chance = (
          (this.userInventory.selected.price /
            this.magInventory.selected.price) *
          100
        ).toFixed(2);
        var radius = 130;
        var circumference = radius * 2 * Math.PI;
        this.dashArr = `${circumference} ${circumference}`;
        var offset = "";
        if (this.chance !== "Infinity" && this.chance !== "NaN") {
          offset = circumference - (this.chance / 100) * circumference;
          this.$root.playSound("selectX");
        } else {
          offset = circumference - (0 / 100) * circumference;
        }
        this.dashOff = offset;
      }
    },
  },
  computed: {
    ...mapState({ userInventory: "userInventory", user: "user" }),
  },
  sockets: {
    gameUpgraderMultiplier(mess) {
      var mp = mess / 100;
      this.per = mp + 300;
      if (this.chance >= mp) {
        setTimeout(() => {
          this.isWin = true;
          this.$root.playSound("win");
          this.status = 0;
        }, 5000);
      } else {
        setTimeout(() => {
          this.isWin = false;
          this.$root.playSound("rouletteLose");
          this.status = 0;
        }, 5000);
      }
    },
    gameUpgraderBetNew(mess) {
      this.history.unshift(mess);
      this.history.pop();
    },
    gameUpgraderBetUpdate(data) {
      this.history = this.history.map((item) => {
        if (item.id !== data.id) {
          return item;
        } else {
          item.game = data.game;
          item.win = data.win;
          item.multiplier = data.multiplier;
          item.winItem = data.winItem;
          item.processedAt = data.processedAt;
          return item;
        }
      });
    },
    gameUpgraderFinished(data) {
      this.hash = data.hash;
      this.salt = data.secret;
      this.dataMulti = data.multiplier;
    },
  },
  beforeDestroy() {
    this.clearSelect();
  },
  methods: {
    ...mapActions({
      clearSelect: "clearSelect",
      getInventory: "getInventory",
      removeInventoryItems: "removeInventoryItems",
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
      this.page = 0;
      this.loadingMarket = false;
      this.magInventory.items = null;
      this.magInventory.selected.items = {};
      this.magInventory.selected.price = 0.0;
      var filteredItems = this.allItems
        .filter((item) => {
          if (this.search !== null && this.search !== "") {
            if (!item.mn.toLowerCase().includes(this.search.toLowerCase())) {
              return false;
            }
          }
          if (this.min !== null && this.min !== "") {
            if (parseFloat(this.min) > this.$root.conv(this.minUp)) {
              if (this.$root.conv(item.p) < this.min) return false;
            } else {
              if (this.$root.conv(item.p) < this.$root.conv(this.minUp))
                return false;
            }
          } else {
            if (this.minUp !== null) {
              if (this.$root.conv(item.p) < this.$root.conv(this.minUp))
                return false;
            }
          }
          if (this.max !== null && this.max !== "") {
            if (this.$root.conv(item.p) > this.max) return false;
          }
          return item;
        })
        .sort((a, b) => a.p - b.p);
      this.totalPage = parseInt(filteredItems.length / 30) + 1;
      this.magInventory.items = filteredItems.splice(this.page, 30);
      setTimeout(() => {
        this.loadingMarket = true;
      }, 200);
    },
    async pushMarket() {
      this.page++;
      var filteredItems = this.allItems
        .filter((item) => {
          if (this.search !== null && this.search !== "") {
            if (!item.mn.toLowerCase().includes(this.search.toLowerCase())) {
              return false;
            }
          }
          if (this.min !== null && this.min !== "") {
            if (
              this.minUp !== null &&
              parseInt(this.min) > this.$root.conv(this.minUp)
            ) {
              if (this.$root.conv(item.p) < this.min) return false;
            } else {
              if (this.$root.conv(item.p) < this.$root.conv(this.minUp))
                return false;
            }
          } else {
            if (this.minUp !== null) {
              if (this.$root.conv(item.p) < this.$root.conv(this.minUp))
                return false;
            }
          }
          if (this.max !== null && this.max !== "") {
            if (this.$root.conv(item.p) > this.max) return false;
          }
          return item;
        })
        .sort((a, b) => a.p - b.p);
      this.totalPage = parseInt(filteredItems.length / 30) + 1;
      this.magInventory.items.push(...filteredItems.splice(this.page * 30, 30));
    },
    async infiniteHandler($state) {
      if (this.page <= this.totalPage) {
        await this.pushMarket();
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    selectMagItem(item) {
      if (typeof this.magInventory.selected.items[item.id] !== "undefined") {
        this.magInventory.selected.items = {};
        this.magInventory.selected.price = 0.0;
      } else {
        this.magInventory.selected.items = {};
        this.magInventory.selected.price = 0.0;
        this.magInventory.selected.items[item.id] = item;
        this.magInventory.selected.price = item.p;
      }
      this.$forceUpdate();
    },
    async createBet() {
      this.perTm = 5;
      await this.$root
        .request("POST", "/api/game/3/bet", {
          betItemIds: [
            ...Object.keys(this.userInventory.selected.items).map((item) =>
              parseInt(item)
            ),
          ],
          itemId: Object.values(this.magInventory.selected.items)[0].id,
        })
        .then(() => {
          this.status = 1;
          this.removeInventoryItems([
            ...Object.keys(this.userInventory.selected.items).map((item) =>
              parseInt(item)
            ),
          ]);
          this.clearSelect();
          this.winItem = Object.values(this.magInventory.selected.items)[0];
        });
    },
    selectXItem(x) {
      var localItems = JSON.parse(localStorage.getItem("dataItems"));
      var winPriceVal = (this.userInventory.selected.price * x).toFixed(0);
      for (let i = winPriceVal; i > this.userInventory.selected.price; i--) {
        let some = localItems[i];
        if (some !== undefined) {
          this.selectMagItem(some);
          i = 0;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#st0 {
  -moz-transform: rotate(-90deg); 
  -ms-transform: rotate(-90deg); 
  -webkit-transform: rotate(-90deg); 
  -o-transform: rotate(-90deg);
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: 0.35s stroke-dashoffset;
}
.footer {
  position: absolute;
  display: flex;
  left: 20px;
  bottom: 0;
  gap: 10px;

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
.up {
  &-game {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    margin-bottom: 20px;
    &__inventory {
      width: 500px;
    }

    &__main {
      background: #181818;
      padding: 50px 20px 80px 20px;
      border-radius: 10px;
      flex: 1;
      position: relative;
      &-game {
        width: 270px;
        height: 270px;
        margin: 0 auto;
        margin-bottom: 72px;
        position: relative;
        &--wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          &.select-skin {
            .skin {
              margin: 0 auto;
              width: 90px;
              height: 90px;
            }
          }
        }

        .skin {
          border: none !important;
          width: 100px;
          height: 100px;
          margin-top: 10px;
          cursor: unset;
          &:hover {
            opacity: 1;
          }
        }

        .skin img {
          width: 70px;
          height: 70px;
          margin-bottom: 20px;
        }

        .skin--shadow {
          background: none !important;
          display: none !important;
        }

        .skin--content {
          display: none;
        }

        .skin--price {
          right: 50%;
          transform: translateX(50%);
          border-radius: 10px;
        }

        .arrow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 210px;
          height: 210px;
          svg {
            display: inline-block;
            margin: 0 auto;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        &--chance {
          font-weight: 900;
          font-size: 36px;
          line-height: 43px;
          color: #ffffff;
          text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.4);
          text-align: center;
          margin-bottom: 3px;
        }

        &--title {
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #919191;
          text-align: center;
        }
      }

      &-buttons {
        display: flex;
        gap: 14px;
        margin-bottom: 10px;
        button {
          background: #232323;
          border-radius: 10px;
          flex: 1;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
        }
      }

      &-play {
        background: #de3720;
        width: 100%;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        cursor: pointer;
        height: 40px;
        border: 1px solid transparent;
        transition: all 300ms;
        &:hover {
          background: #181818;
          border: 1px solid #de3720;
          color: #fff;
        }
      }
    }

    &__skins {
      width: 500px;
      background: #181818;
      border-radius: 10px;
      &-header {
        padding: 20px 40px 0 20px;

        &--title {
          display: flex;
          margin-bottom: 15px;
          span {
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #ffffff;

            &:last-child {
              margin-left: auto;
            }
          }
        }

        &--form {
          display: flex;
          gap: 10px;
          input {
            padding: 11px 5px 12px 9px;
            background: #232323;
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
      }

      &-wrapper {
        height: 550px;
        padding: 20px;
      }

      &-list {
        min-height: 100px;
        max-height: 510px;
        display: flex;
        gap: 10px;
        overflow-y: auto;
        flex-wrap: wrap;
        position: relative;

          &--empty {
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
  }

  &-history {
    &__head {
      display: flex;
      margin-bottom: 14px;
      .th {
        &:first-child {
          margin-left: 19px;
        }
        &:not(:first-child) {
          text-align: center;
        }
        flex: 1;
        text-transform: uppercase;
        font-weight: 300;
        font-size: 12px;
        line-height: 14px;
        color: #707070;
      }
    }

    &__body {
      height: calc(100vh - 720px);
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .tr {
        padding: 12px 0;
        display: flex;
        border-radius: 10px;
        align-items: center;
        &.wait {
          background: linear-gradient(90deg, #181818 0%, #4c5233 100%);
          .end div {
            background: #f0ec0f;
          }
        }

        &.win {
          background: linear-gradient(90deg, #181818 0%, #445233 100%);
          .end div {
            background: #72f235;
          }
        }

        &.lose {
          background: linear-gradient(90deg, #181818 0%, #523333 100%);

          .end div {
            background: #e24949;
          }
        }

        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      .td {
        &:not(:first-child) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        flex: 1;

        &.avatar {
          margin-left: 20px;
          img {
            width: 34px;
            height: 34px;
            border-radius: 10px;
          }
        }

        &.skins {
          display: flex;
          align-items: center;

          .skins-items {
            display: flex;
            gap: 7px;
            img {
              width: 36px;
              height: 36px;
            }
          }

          .val {
            margin-left: 21px;
            font-weight: 600;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
            color: #ffffff;
          }
        }

        &.perc {
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          color: #ffffff;
        }

        &.end div {
          text-transform: uppercase;
          width: 85px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          font-weight: bold;
          font-size: 12px;
          line-height: 14px;
          color: #ffffff;
        }
      }
    }
  }
}

.skins-items--more {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #de3720;
  font-size: 14px;
  font-weight: 500;
}

@media screen and (max-width: 1860px) {
  .up {
    padding-bottom: 10px;
    &-game {
      flex-wrap: wrap;
      &__main {
        width: 100%;
        order: 1;
        flex: unset;
      }
      &__inventory {
        order: 2;
        flex: 1;
        .inventory {
          width: 100%;
        }
      }

      &__skins {
        order: 3;
        flex: 1;
      }
    }
  }
}

@media screen and (max-width: 1750px) {
  .up-game__skins-wrapper {
    height: 520px;
  }

  .up-game__skins-list {
    max-height: 480px;
  }
}

@media screen and (max-width: 1520px) {
  .up {
    &-game {
      &__inventory {
        width: 100%;
        flex: unset;
      }

      &__skins {
        width: 100%;
        flex: unset;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .up {
    margin-bottom: 60px;
  }

  .up-game__skins {
    background: #2b2b2b;
  }

  .up-game__skins-wrapper {
    padding: 10px;
    height: unset;
    min-height: 120px;
    max-height: 340px;
  }

  .up-history__body {
    height: calc(100vh - 401px);
  }

  .up-game__skins-list {
    height: unset;
    min-height: 80px;
    max-height: 300px;
  }

  .up-game__skins-header {
    padding: 10px 20px 0 10px;
  }

  .up-game__skins-header--form input {
    width: 33%;
    background: #181818;
  }
}

@media screen and (max-width: 600px) {
  .up-game__skins-header--title span {
    font-size: 12px;
    line-height: 14px;
  }

  .up-history__body {
    height: calc(100vh - 401px);
  }

  .skins-items img:not(:last-child) {
    display: none;
  }

  .up-history__body .td.skins .val {
    margin-left: 8px;
  }

  .up-history__body .tr .end div {
    margin-right: 5px;
  }
}
</style>