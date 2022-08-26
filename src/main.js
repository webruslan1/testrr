import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/main.scss';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueCookie from 'vue-cookie';
import i18n from './plugins/i18n';
import { current_language } from './plugins/i18n';
import Notifications from 'vue-notification';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import { mapState, mapActions } from "vuex";
import Sosiska from './components/Sosiska.vue'
import Loader from './components/loader/Loader.vue'
import $ from 'jquery';
import VueYandexMetrika from 'vue-yandex-metrika'
import Fair from "@/components/modals/Fair";
import Inventory from "@/components/inventory/Inventory";
import ProfileInfo from "@/components/profile-info/ProfileInfo";

Vue.component('Fair', Fair)
Vue.component('Inventory', Inventory)
Vue.component('ProfileInfo', ProfileInfo)

Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(Notifications);
Vue.use(VueYandexMetrika, {
  id: 89333072,
  router: router,
  env: process.env.NODE_ENV
})
Vue.component('Sosiska', Sosiska)
Vue.component('Loader', Loader)

var socket
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://' + window.location.hostname + ':8080';
  socket = io('http://localhost:8080', {
    path: "/wss",
    reconnection: true,
    reconnectionDelay: 500,
    maxReconnectionAttempts: Infinity,
    secure: true
  });
} else {
  axios.defaults.baseURL = 'https://' + window.location.hostname;
  socket = io('https://' + window.location.hostname, {
    path: "/wss",
    reconnection: true,
    reconnectionDelay: 500,
    maxReconnectionAttempts: Infinity,
    secure: true
  });
}
Vue.use(VueSocketIOExt, socket);

axios.defaults.withCredentials = true;
axios.defaults.params = {};

Vue.config.productionTip = false;

new Vue({
  data() {
    return {
      authUrl: process.env.NODE_ENV == 'development' ? 'http://' : 'https://' + window.location.hostname,
      steamUrl: "https://community.cloudflare.steamstatic.com/economy/image/",
      deposite: false,
      sessions: false,
      options: false,
      rulesModal: false,
      tech: null,
      fair: false,
      chatShow: true,
      language: current_language,
      online: 1,
      settings: null,
      loading: true,
      refModal: false,
      code: null,
      playAu: null
    };
  },
  watch: {
    '$route'() {
      this.checkSub()
    }
  },
  async created() {
    if (window.innerWidth <= 1200) {
      this.chatShow = false;
    }
    if (this.$cookie.get('lang') == undefined) {
      this.changeLanguage('en')
    }
    if (this.language === 'ru') {
      document.title = 'RustDuel - Играй по новому!';
    } else {
      document.title = 'RustDuel - Play the new way!';
    }
    if (process.env.NODE_ENV === 'development') {
      this.authUrl = 'http://' + window.location.hostname + ':8080';
      this.steamUrl = "http://cdn.steamcommunity.com/economy/image/"
    }
    this.checkSub();
    await this.request('GET', '/api/settings').then(resp => {
      this.settings = resp;
      if (resp.maintenance !== undefined) {
        this.tech = resp.maintenance;
      } else {
        this.tech = false;
      }
    })


    if (this.$cookie.get('sound') === null) {
      this.$cookie.set('sound', 1);
    }


    if (this.tech !== true) {
      await this.getUser().then(async () => {
        if (localStorage.getItem('referralCode')) {
          await this.request("GET", "/api/referral/check", {
            code: localStorage.getItem('referralCode'),
          })
            .then(() => {
              this.code = localStorage.getItem('referralCode');
              this.refModal = true;
            }).catch(() => {
              localStorage.removeItem('referralCode')
            });
        }
        var intr = setInterval(() => {
          if (this.$socket.connected) {
            this.loading = false;
            clearInterval(intr)
          }
        }, 500)
      }).catch(() => {
        this.loading = false;
      })

      if (localStorage.getItem('hashItems')) {
        this.request('GET', '/api/item/data', {
          hash: localStorage.getItem('hashItems')
        }).then(resp => {
          var data = resp.data.reduce((a, v) => ({ ...a, [v.p]: v }), {})
          localStorage.setItem('hashItems', resp.hash)
          localStorage.setItem('dataItems', JSON.stringify(data))
        }).catch(() => 'Инвентарь не обновлялся')

      } else {
        this.request('GET', '/api/item/data').then((resp) => {
          var data = resp.data.reduce((a, v) => ({ ...a, [v.p]: v }), {})
          localStorage.setItem('hashItems', resp.hash)
          localStorage.setItem('dataItems', JSON.stringify(data))
        })
      }
    }else{
      this.loading = false;
    }



  },
  sockets: {
    userBalanceChanged() {
      this.updateBalance();
    },
    async userInventoryChanged() {
      if(this.$route.path == '/' || this.$route.path == '/roulette' || this.$route.path == '/upgrade' || this.$route.path == '/profile'){
        this.scrollInventory();
      }
      this.getInventory();
    },
    online(mess) {
      this.online = mess;
    },
    itemsChanged() {
      this.request('GET', '/api/item/data', {
        hash: localStorage.getItem('hashItems')
      }).then(resp => {
        var data = resp.data.reduce((a, v) => ({ ...a, [v.p]: v }), {})
        localStorage.setItem('hashItems', resp.hash)
        localStorage.setItem('dataItems', JSON.stringify(data))
      }).catch(() => 'Инвентарь не обновлялся')
    }
  },
  computed: {
    ...mapState({ user: "user" }),
  },
  methods: {
    ...mapActions({
      getUser: 'getUser',
      updateBalance: 'updateBalance',
      getInventory: 'getInventory'
    }),
    checkSub() {
      if (this.$route.name === 'Crash') {
        socket.emit('gameSubscribe', 1)
      } else {
        socket.emit('gameUnsubscribe', 1)
      }

      if (this.$route.name === 'Roulette') {
        socket.emit('gameSubscribe', 2)
      } else {
        socket.emit('gameUnsubscribe', 2)
      }

      if (this.$route.name === 'Upgrade') {
        socket.emit('gameSubscribe', 3)
      } else {
        socket.emit('gameUnsubscribe', 3)
      }
    },
    changeLanguage(lang) {
      if (this.$i18n.locale !== lang) {
        this.$i18n.locale = lang;
        this.language = lang;
        this.$cookie.set('lang', lang);
        if (lang === 'ru') {
          document.title = 'RustDuel - Играй по новому!';
        } else {
          document.title = 'RustDuel - Play the new way!';
        }
      }
    },
    scrollInventory() {
      setTimeout(() => {
        $(".inventory-list__wrapper").scrollTop(0);
      }, 50);
    },
    conv(sum) {
      return parseFloat((sum / 100).toFixed(2));
    },
    async request(type, uri, data = {}) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (res, rej) => {
        try {
          let result = null;

          if (type === 'PATCH') {
            result = await this.$root.axios.patch(uri, data);
          }
          else if (type === 'POST') {
            result = await this.$root.axios.post(uri, data);
          } else {
            result = await this.$root.axios.get(uri, { params: data });
          }

          return res(result.data);
        } catch (e) {
          if (typeof e.response !== 'undefined' && typeof e.response.data.message !== 'undefined') {
            var newString = '';
            if(typeof e.response.data.message == 'string'){
              e.response.data.message.split(' ').forEach(item => {
                if (item[item.length - 1] == '.' || item[item.length - 1] == ':') {
                  newString = newString + (this.$t(item.slice(0, -1)) + item[item.length - 1] + ' ')
                } else {
                  newString = newString + (this.$t(item) + ' ')
                }
              })
              this.showNotify('error', newString)
            }
           
            return rej(e.response.data.message);
          } else {
            return rej(false);
          }
        }
      });
    },
    formatDate(d, secTrue) {
      var date = new Date(d);
      var dd = date.getDate();
      if (dd < 10) dd = '0' + dd;
      var mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      var hh = date.getHours();
      if (hh < 10) hh = '0' + hh;
      var min = date.getMinutes();
      if (min < 10) min = '0' + min;
      var sec = date.getSeconds();
      if (sec < 10) sec = '0' + sec;
      if (secTrue) {
        return dd + '.' + mm + '.' + date.getFullYear() + ' ' + hh + ':' + min + ':' + sec;
      } else {
        return dd + '.' + mm + '.' + date.getFullYear() + ' ' + hh + ':' + min;
      }
    },
    showNotify(type, text, duration) {
      let title = this.language === 'en' ? 'Success' : 'Успешно';

      if (type === 'error') {
        title = this.language === 'en' ? 'Error' : 'Ошибка';
      } else if (type === 'warn') {
        title = this.language === 'en' ? 'Warning' : 'Предупреждение';
      } else if (type === 'info') {
        title = this.language === 'en' ? 'Information' : 'Информация';
      }

      if (this.$cookie.get('sound') == '1') {
        if (type == 'error') {
          this.playSound('error');
        } else {
          this.playSound('notification');
        }
      }
      // <span class="notif-date">13 минут назад</span>
      this.$notify({
        title: title,
        type,
        text: `<p class="notif-text">${text}</p>`,
        ignoreDuplicates: false,
        duration,
        speed: 1000,
        width: 300,
      });
    },
    playSound(sound) {
      if (this.$cookie.get('sound')) {
        if (this.$cookie.get('sound') == '1') {
          this.playAu = new Audio(''.concat('/sounds/').concat(sound, '.mp3'));
          try {
            (this.playAu.volume = 0.5), this.playAu.play();
          } catch (n) {
            console.log(n);
          }
        }
      } else {
        this.$cookie.set('sound', '1')
        this.playAu = new Audio(''.concat('/sounds/').concat(sound, '.mp3'));
        try {
          (this.playAu.volume = 0.5), this.playAu.play();
        } catch (n) {
          console.log(n);
        }
      }
    },
    stopSound() {
      if (this.playAu !== null) {
        this.playAu.pause()
        this.playAu == null;
      }
    },
    getGameColor(multiplier) {
      if (multiplier > 0 && multiplier <= 1.5) {
        return '#ae4242';
      } else if (multiplier > 1.5 && multiplier <= 3) {
        return '#429BAE';
      } else if (multiplier > 3 && multiplier <= 5) {
        return 'rgb(88 189 142)';
      } else if (multiplier > 5 && multiplier <= 10) {
        return '#5EAE42';
      } else {
        return '#FFC701';
      }
    },
  },
  el: '#app',
  router,
  i18n,
  store,
  render: (h) => h(App),
});
