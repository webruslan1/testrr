<template>
  <div>
    <div class="crash" :style="{ display: loading == false ? '' : 'none' }">
      <div class="crash-left">
        <div
          class="crash-game"
          :style="{ opacity: status !== null ? '1' : '0' }"
          
        >
          <div class="crash-game__bg">
             <!-- <div
              ref="start"
              class="bg"
              :style="{
                opacity: status === 0 ? '1' : '0',
                width: width,
                height: height,
                overflow: 'hidden',
                margin: '0px auto',
              }"
            ></div>

             <div
              ref="run"
              class="bg"
              :style="{
                opacity: status === 1 ? '1' : '0',
                width: width,
                height: height,
                overflow: 'hidden',
                margin: '0px auto',
              }"
            ></div>

             <div
              ref="end"
              class="bg"
              :style="{
                opacity: status === 2 ? '1' : '0',
                width: width,
                height: height,
                overflow: 'hidden',
                margin: '0px auto',
              }"
            ></div> -->
           
          </div>
          <div
            class="crash-game__wrapp"
            :style="{ display: status === 0 ? 'block' : 'none' }"
          >
            <div
              ref="start"
              class="crash-game__wrapp-bg"
              :style="{
                width: width,
                height: height,
                overflow: 'hidden',
                margin: '0px auto',
              }"
            ></div>

            <div class="overlay"></div>
            <div class="crash-game__text norm" v-if="status === 0">
              {{ $t("content.crash.start") }} {{ mp }}
            </div>
          </div>
          <div
            class="crash-game__wrapp"
            :style="{ display: status === 1 ? 'block' : 'none' }"
          >
            <div
              ref="run"
              class="crash-game__wrapp-bg"
              :style="{
                width: width,
                height: height,
                overflow: 'hidden',
                margin: '0px auto',
              }"
            ></div>
  
            <div class="overlay"></div>
            <div class="crash-game__text" v-if="status === 1">{{ mp }}</div>
          </div>
          <div
            class="crash-game__wrapp"
            :style="{ display: status === 2 ? 'block' : 'none' }"
          >
            <div
              ref="end"
              class="crash-game__wrapp-bg"
              :style="{
                width: width,
                height: height,
                overflow: 'hidden',
                margin: '0px auto',
              }"
            ></div>
      
            <div class="overlay"></div>
            <div class="crash-game__text" v-if="status === 2">{{ mp }}</div>
          </div>
        </div>

        <div class="crash-info__stats mob">
          <div class="crash-info__stats-wrapper">
            <router-link
              :to="'/crash/' + item.id"
              class="crash-info__stats-item"
              :style="{
                background: `linear-gradient(73.7deg, ${$root.getGameColor(
                  item.multiplier
                )} -30.37%, rgba(174, 66, 66, 0) 87.99%`,
                color: $root.getGameColor(item.multiplier),
              }"
              v-for="item in history"
              :key="item.id"
            >
              {{ item.multiplier.toFixed(2) }}
            </router-link>
          </div>
        </div>
        <div class="crash-info__game-bet mob">
          <div class="crash-info__game-bet--list">
            <div class="btn-tr" @click="autoTake = 1.2">x1.2</div>
            <div class="btn-tr" @click="autoTake = 1.5">x1.5</div>
            <div class="btn-tr" @click="autoTake = 2">x2</div>
          </div>
          <div class="crash-info__game-bet--fieldset">
            <input type="number" v-model="autoTake" />
          </div>
          <button
            class="crash-info__game-bet--button"
            @click="createBet"
            v-if="selectedSkins == null || status !== 1"
            :disabled="
              status !== 0 ||
              Object.keys(userInventory.selected.items).length == 0
            "
          >
            {{ $t("content.crash.bet") }}
          </button>
          <button
            class="crash-info__game-bet--button"
            :disabled="betTake"
            @click="takeBet"
            v-else
          >
            {{ $t("content.crash.take") }}
          </button>
        </div>
        <Inventory />
      </div>
      <div class="crash-info">
        <div
          class="crash-info__header noselect"
          v-if="
            Object.keys(userInventory.selected.items).length == 0 &&
            selectedSkins === null
          "
        >
          <div class="crash-info__header-img">
            <svg
              width="50"
              height="67"
              viewBox="0 0 50 67"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M49.3132 57.9138C48.5891 56.5765 47.3895 55.6013 45.9306 55.1685L45.3312 54.9901L45.9306 54.8117C47.3868 54.3776 48.5891 53.4023 49.3105 52.065C50.0346 50.7278 50.1949 49.1888 49.7621 47.7339C49.3292 46.2764 48.354 45.0741 47.0181 44.3501C45.6768 43.6233 44.1325 43.4657 42.6843 43.9013L25.3777 49.0523L8.06805 43.9014C6.61718 43.4698 5.07564 43.6262 3.73429 44.3502C2.39833 45.0743 1.42313 46.2767 0.99029 47.7328C0.557452 49.1889 0.717763 50.7279 1.44185 52.0651C2.16325 53.4024 3.36557 54.3776 4.8217 54.8104L5.42319 54.9895L4.8217 55.1685C2.27931 55.9249 0.678904 58.3121 0.777911 60.8468C0.777911 60.8512 0.776629 60.8551 0.776629 60.8595C0.776629 60.8613 0.777655 60.8628 0.777655 60.8646C0.79702 61.3235 0.853449 61.7851 0.990418 62.2448C1.42326 63.7024 2.39846 64.9047 3.73442 65.6287C4.37053 65.9729 5.05717 66.1459 5.7533 66.2316C5.90758 66.2918 6.07277 66.3315 6.24859 66.3315C6.30618 66.3315 6.35966 66.3163 6.41698 66.3144C6.42327 66.3144 6.4293 66.3167 6.43571 66.3167C6.46687 66.3167 6.49765 66.3035 6.52894 66.303C6.88868 66.2843 7.23777 66.2349 7.57596 66.1497C7.73961 66.1161 7.90633 66.1259 8.06831 66.0775L25.3772 60.9272L38.1256 64.7209L38.6102 64.8886C38.6688 64.9086 38.7309 64.9069 38.7914 64.9189L42.6848 66.0775C43.123 66.2085 43.5798 66.278 44.1196 66.2953C44.1811 66.3501 44.2479 66.3007 44.312 66.2993C46.8235 66.2993 49.0466 64.6548 49.7626 62.2461C50.1949 60.7887 50.0346 59.2511 49.3132 57.9138ZM6.62923 63.5185C6.08046 63.5537 5.534 63.4896 5.03819 63.2227C4.34347 62.8459 3.83855 62.2234 3.61412 61.466C3.53781 61.2094 3.55128 60.954 3.54512 60.6983C3.63297 59.269 4.79605 58.1235 6.24847 58.1235C7.75807 58.1235 8.98438 59.3512 8.98438 60.8594C8.98438 62.2329 7.95096 63.3255 6.62923 63.5185ZM47.1382 61.4674C46.7589 62.7459 45.527 63.5475 44.2766 63.5662C42.8472 63.4459 41.7677 62.2837 41.7677 60.8596C41.7677 59.3514 42.9941 58.1237 44.5036 58.1237C46.0131 58.1237 47.2395 59.3514 47.2395 60.8596C47.2395 60.893 47.2395 60.9265 47.2422 60.9598C47.2238 61.1293 47.189 61.299 47.1382 61.4674Z"
                fill="#434343"
              />
              <path
                d="M25.3546 44.4437C34.4042 44.4437 41.7677 37.0268 41.7677 27.9091C41.7677 27.4496 41.7383 27.0234 41.7062 26.5972L41.6769 26.1804C41.1772 19.6598 38.1875 15.5999 35.5476 12.017C33.1884 8.81344 31.1498 6.04802 31.1498 2.03629C31.1498 1.5233 30.8612 1.05301 30.4042 0.817935C29.95 0.585421 29.397 0.626845 28.9829 0.926176C24.5263 4.13905 21.7956 9.85674 20.8097 13.7777C20.0777 16.7007 19.9253 19.9403 19.8933 22.2822C16.9996 21.0558 16.0939 16.1317 16.0833 16.0755C16.0085 15.652 15.7413 15.2873 15.3565 15.0922C14.9745 14.8998 14.5229 14.8905 14.1355 15.0816C13.935 15.179 9.22997 17.5878 8.96282 26.9633C8.94141 27.2772 8.94141 27.5938 8.94141 27.9091C8.94153 37.0268 16.3052 44.4437 25.3546 44.4437Z"
                fill="#3A3A3A"
              />
            </svg>
          </div>
          <div
            class="crash-info__header-title"
            v-html="$t('content.crash.selectItems')"
          ></div>
        </div>
        <div class="crash-info__header" v-else>
          <div class="crash-info__header-dollars">
            <span class="crash-info__header-dollars--from sosiska-wrap"
              >{{
                selectedPrice == null
                  ? $root.conv(userInventory.selected.price).toFixed(2)
                  : $root.conv(selectedPrice).toFixed(2)
              }}
              <Sosiska
            /></span>
            <img width="20px" src="/img/crash/arrow.gif" alt="" />
            <span
              class="crash-info__header-dollars--to sosiska-wrap"
              v-if="winPrice"
            >
              {{ $root.conv(winPrice).toFixed(2) }} <Sosiska />
            </span>
            <span
              class="crash-info__header-dollars--to sosiska-wrap"
              v-else-if="
                selectedPrice !== null && betTake === false && status === 1
              "
            >
              {{ $root.conv(selectedPrice * mp).toFixed(2) }} <Sosiska />
            </span>
            <span class="crash-info__header-dollars--to sosiska-wrap" v-else>
              {{
                $root.conv(userInventory.selected.price * autoTake).toFixed(2)
              }}
              <Sosiska />
            </span>
          </div>
          <div class="crash-info__header-skins" v-if="selectedSkins === null">
            <div class="crash-info__header-skins--from">
              <div
                class="skin"
                v-for="item in Object.values(userInventory.selected.items)
                  .sort((a, b) => b.price - a.price)
                  .slice(0, 2)"
                :key="item.inventId + userInventory.selected.price"
                :style="{ border: `1px solid #${item.borderColor}` }"
              >
                <img :src="$root.steamUrl + item.image + '/123fx123f'" alt="" />
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
              </div>
              <div
                class="crash-info__header-skins--more"
                v-if="Object.values(userInventory.selected.items).length > 2"
              >
                +{{ Object.values(userInventory.selected.items).length - 2 }}
              </div>
            </div>
            <div class="crash-info__header-skins--arrow"></div>
            <div class="crash-info__header-skins--to"></div>
          </div>
          <div class="crash-info__header-skins" v-else>
            <div class="crash-info__header-skins--from">
              <div
                class="skin"
                v-for="item in Object.values(selectedSkins)
                  .sort((a, b) => b.price - a.price)
                  .slice(0, 2)"
                :key="item.inventId + selectedPrice"
                :style="{ border: `1px solid #${item.borderColor}` }"
              >
                <img :src="$root.steamUrl + item.image + '/123fx123f'" alt="" />
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
              </div>
              <div
                class="crash-info__header-skins--more"
                v-if="Object.values(selectedSkins).length > 2"
              >
                +{{ Object.values(selectedSkins).length - 2 }}
              </div>
            </div>
            <div
              class="crash-info__header-skins--arrow"
              :style="{ opacity: winItem ? '1' : '0' }"
            >
              <img width="60px" src="/img/crash/arrow.gif" alt="" />
            </div>
            <div class="crash-info__header-skins--to" v-if="winItem">
              <div class="skin" :style="{ border: `1px solid #${winItem.bc}` }">
                <img :src="$root.steamUrl + winItem.i + '/123fx123f'" alt="" />
                <div class="skin--content">
                  <strong>{{ winItem.mn }}</strong>
                  <span></span>
                </div>
                <div
                  class="skin--price"
                  :style="{
                    background: 'black',
                    color: '#fff',
                    border: `1px solid #${winItem.bc}`,
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
        </div>

        <div class="crash-info__stats">
          <div class="crash-info__stats-wrapper">
            <router-link
              tag="div"
              :to="'/crash/' + item.id"
              class="crash-info__stats-item"
              :style="{
                background: `linear-gradient(73.7deg, ${$root.getGameColor(
                  item.multiplier
                )} -30.37%, rgba(174, 66, 66, 0) 87.99%`,
                color: $root.getGameColor(item.multiplier),
              }"
              v-for="item in history"
              :key="item.id"
            >
              {{ item.multiplier.toFixed(2) }}
            </router-link>
          </div>
        </div>
        <div class="crash-info__game">
          <div class="crash-info__game-stat">
            <div class="crash-info__game-stat--item">
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.18239 9.2941C8.49183 9.2941 10.3706 7.41529 10.3707 5.10585C10.3707 2.79641 8.49179 0.917603 6.18239 0.917603C3.87299 0.917603 1.99414 2.79641 1.99414 5.10585C1.99414 7.41529 3.87295 9.2941 6.18239 9.2941Z"
                  fill="#434343"
                />
                <path
                  d="M15.8172 9.2941C18.1266 9.2941 20.0055 7.41529 20.0055 5.10585C20.0055 2.79641 18.1266 0.917603 15.8172 0.917603C13.5077 0.917603 11.6289 2.79641 11.6289 5.10585C11.6289 7.41529 13.5078 9.2941 15.8172 9.2941Z"
                  fill="#434343"
                />
                <path
                  d="M6.1829 10.0271C2.77363 10.0271 0 12.8005 0 16.2095V18.3064C0 18.7349 0.347445 19.0824 0.776016 19.0824H11.5893C12.0178 19.0824 12.3653 18.7349 12.3653 18.3064V16.2095C12.3653 12.8358 9.6467 10.0271 6.1829 10.0271Z"
                  fill="#434343"
                />
                <path
                  d="M11.9134 11.4108C11.8048 11.4998 11.7896 11.66 11.8763 11.7706C13.6459 14.0279 13.4007 16.2104 13.4007 18.3064C13.4007 18.4632 13.3806 18.6154 13.3429 18.7605C13.3005 18.9237 13.4248 19.0824 13.5933 19.0824H21.2247C21.6533 19.0824 22.0008 18.7349 22.0008 18.3064V16.2095C22.0008 10.9531 15.8681 8.17017 11.9134 11.4108Z"
                  fill="#434343"
                />
              </svg>
              <span>{{ players }}</span>
            </div>
            <div class="crash-info__game-stat--item">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.36914 20.1208H4.56417V22H1.36914V20.1208Z"
                  fill="#434343"
                />
                <path
                  d="M17.4355 20.1208H20.6306V22H17.4355V20.1208Z"
                  fill="#434343"
                />
                <path
                  d="M20.7109 0H1.28906C0.577113 0 0 0.577113 0 1.28906V17.5457C0 18.2576 0.577113 18.8347 1.28906 18.8347H20.7109C21.4229 18.8347 22 18.2576 22 17.5457V1.28906C22 0.577113 21.4229 0 20.7109 0ZM19.906 16.7407H2.09404V2.09404H19.9059V16.7407H19.906Z"
                  fill="#434343"
                />
                <path
                  d="M7.53051 8.00793C6.75334 8.00793 6.12109 8.64022 6.12109 9.41735C6.12109 10.1945 6.75334 10.8268 7.53051 10.8268C8.30765 10.8268 8.93993 10.1945 8.93993 9.41735C8.93993 8.64022 8.30765 8.00793 7.53051 8.00793Z"
                  fill="#434343"
                />
                <path
                  d="M13.079 8.69263H10.1309C10.1953 8.92341 10.2305 9.16632 10.2305 9.41738C10.2305 9.66845 10.1953 9.91135 10.1309 10.1421H13.079C13.4786 10.1421 13.8037 9.81704 13.8037 9.41738C13.8037 9.01773 13.4786 8.69263 13.079 8.69263Z"
                  fill="#434343"
                />
                <path
                  d="M18.6166 3.38306H3.38281V15.4516H18.6166V3.38306H18.6166ZM13.0778 11.4311H9.32445C8.84728 11.8566 8.2189 12.1158 7.53084 12.1158C6.04288 12.1158 4.83236 10.9053 4.83236 9.41733C4.83236 7.92936 6.04288 6.71885 7.53084 6.71885C8.2189 6.71885 8.84728 6.97808 9.32445 7.40351H13.0778C14.1882 7.40351 15.0916 8.30689 15.0916 9.41733C15.0916 10.5278 14.1882 11.4311 13.0778 11.4311Z"
                  fill="#434343"
                />
              </svg>
              <span class="sosiska-wrap"
                >{{ $root.conv(bank).toFixed(2) }} <Sosiska
              /></span>
            </div>
            <div class="crash-info__game-stat--item">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.2506 0.345204C20.99 0.108016 20.5841 0.130918 20.3349 0.380094L20.1377 0.577364L19.6953 0.135086C19.531 -0.029226 19.2635 -0.0487338 19.0889 0.104665C18.8976 0.272715 18.8906 0.564387 19.0677 0.741547L19.5206 1.19439L18.782 1.93298L18.5196 1.67057C18.264 1.41495 17.8496 1.41495 17.594 1.67057L12.9249 6.33973C12.7397 6.52488 12.6895 6.79314 12.7725 7.02418L12.3072 7.48949C12.2356 7.46315 12.1595 7.44862 12.0817 7.44862C11.9082 7.44862 11.7417 7.51759 11.6189 7.64031L10.8863 8.37292L10.196 7.68259C9.81769 7.30425 9.21969 7.27383 8.805 7.61178L6.13475 9.78728C5.90728 9.97261 5.76827 10.247 5.75336 10.54C5.73845 10.833 5.84888 11.1201 6.05633 11.3275L6.99404 12.2652L6.26142 12.9979C6.1387 13.1206 6.06974 13.2871 6.06974 13.4606C6.06974 13.5399 6.08478 13.6173 6.11202 13.6901L5.65913 14.1376C5.42804 14.0545 5.15979 14.1048 4.97468 14.2899L0.7249 18.5397C0.46481 18.7998 0.470052 19.2231 0.736544 19.4766L3.19917 21.8196C3.4874 22.0939 3.95155 22.0497 4.18281 21.7259L7.68214 16.8277C7.86033 16.5677 7.82798 16.2177 7.6051 15.9948L7.24859 15.6383L7.6121 15.2741L8.18758 15.8496L9.28269 19.1121C9.37408 19.3843 9.6282 19.5584 9.90285 19.5584C9.95974 19.5584 10.0175 19.5509 10.075 19.5353L12.8848 18.7707C13.0977 18.7128 13.2754 18.558 13.3468 18.3494C13.4483 18.0526 13.3279 17.735 13.0703 17.5771L12.799 17.4108L11.9546 14.3073L12.7186 13.6589C13.8749 14.4788 15.2655 14.9273 16.6956 14.9273C16.9388 14.9273 17.1833 14.9143 17.4278 14.888C17.6692 14.8621 17.8751 14.7015 17.9632 14.4753L18.7089 12.5609C18.7918 12.348 18.7577 12.1073 18.6189 11.9258C18.4801 11.7443 18.2568 11.6483 18.0295 11.6726C16.9215 11.7909 15.818 11.5706 14.8555 11.0656C14.86 11.0221 14.8636 10.9784 14.8654 10.9344C14.8896 10.3402 14.6624 9.75824 14.2419 9.33774L13.8956 8.99142L14.2732 8.61372L14.9211 9.2616C15.0442 9.38471 15.2109 9.45329 15.3839 9.45329C15.3974 9.45329 15.4111 9.45286 15.4247 9.452C15.6121 9.44031 15.7854 9.34866 15.9006 9.20037L19.9841 3.94551C20.1866 3.68495 20.1634 3.31447 19.9301 3.08115L19.7075 2.85853L21.2735 1.29254C21.5365 1.02957 21.5289 0.598418 21.2506 0.345204ZM9.75023 13.2882L9.41499 13.6234C9.32978 13.7086 9.21815 13.7512 9.10647 13.7512C8.99479 13.7512 8.88312 13.7087 8.79795 13.6234C8.62758 13.4531 8.62758 13.1768 8.798 13.0064L9.13324 12.6712C9.30365 12.5008 9.57994 12.5008 9.75027 12.6712C9.92064 12.8416 9.92064 13.1179 9.75023 13.2882ZM7.91959 11.3397L7.1932 10.6133L9.44279 8.78053L9.96077 9.29851L7.91959 11.3397Z"
                  fill="#434343"
                />
              </svg>
              <span>{{ skins }}</span>
            </div>
          </div>
          <div class="crash-info__game-bet">
            <div class="crash-info__game-bet--list">
              <div class="btn-tr" @click="autoTake = 1.2">x1.2</div>
              <div class="btn-tr" @click="autoTake = 1.5">x1.5</div>
              <div class="btn-tr" @click="autoTake = 2">x2</div>
            </div>
            <div class="crash-info__game-bet--fieldset">
              <input type="number" v-model="autoTake" />
            </div>
            <button
              class="crash-info__game-bet--button"
              @click="createBet"
              v-if="selectedSkins == null || status !== 1"
              :disabled="
                status !== 0 ||
                Object.keys(userInventory.selected.items).length == 0
              "
            >
              {{ $t("content.crash.bet") }}
            </button>
            <button
              class="crash-info__game-bet--button"
              :disabled="betTake"
              @click="takeBet"
              v-else
            >
              {{ $t("content.crash.take") }}
            </button>
          </div>
        </div>
        <div class="crash-info__list">
          <div
            class="crash-info__list-item"
            :class="{
              win: bet.win != null,
              lose: bet.win == null && status === 2,
            }"
            v-for="bet in bets"
            :key="bet.id + bet.sum"
          >
            <img
              @click="$router.push(`/user/${bet.user.uuid}`)"
              :src="
                'https://avatars.akamai.steamstatic.com/' +
                bet.user.avatar +
                '_medium.jpg'
              "
              alt=""
              class="crash-info__list-item--avatar"
            />
            <div class="crash-info__list-item--skins">
              <img
                v-for="skin in bet.items.slice(0, 2)"
                :src="$root.steamUrl + skin.image + '/36fx36f'"
                :key="skin.id + bet.sum"
                :alt="skin.marketName"
                class="crash-info__list-item--skin"
              />
              <div
                class="crash-info__list-item--more"
                v-if="bet.items.length > 2"
              >
                +{{ bet.items.length - 2 }}
              </div>
            </div>
            <div class="crash-info__list-item--bet sosiska-wrap">
              {{ $root.conv(bet.sum).toFixed(2) }} <Sosiska />
            </div>
            <div
              class="crash-info__list-item--state"
              v-if="bet.win == null && status !== 2"
            >
              {{ $t("content.crash.inGame") }}
            </div>
            <div
              class="crash-info__list-item--state"
              v-if="status === 2 && bet.win === null"
            >
              {{ mp }}x
            </div>
            <div class="crash-info__list-item--state" v-if="bet.win != null">
              <span class="sosiska-wrap"
                >{{ $root.conv(bet.win) }} <Sosiska
              /></span>
              <span>{{ bet.multiplier }}x</span>
              <img
                :src="$root.steamUrl + bet.winItem.image + '/123fx123f'"
                alt=""
              />
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="footer-hash" @click="$root.fair = true">
            {{ $t("content.hash") }} <span>{{ hash }}</span>
          </div>
          <div class="footer-true" @click="$root.fair = true">
            <img
              src="/img/true.svg"
              width="16px"
              height="18px"
              alt="True Fact"
            />
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
    <Loader :style="{ display: loading == true ? '' : 'none' }" />
  </div>
</template>


<script>
import lottie from "lottie-web";
// import StartBg from "@/lottie/crash/beginbg.json";
// import RunBg from "@/lottie/crash/main3.json";
// import EndBg from "@/lottie/crash/endbg.json";
// const bg = () => import("@/lottie/crash/bg.json");
// const start = () => import("@/lottie/crash/start.json");
const start = () => import("@/lottie/crash/begin.json");
const run = () => import("@/lottie/crash/main3.json");
// const end = () => import("@/lottie/crash/end.json");
const end = () => import("@/lottie/crash/endNew.json");

import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      loading: true,
      start: null,
      run: null,
      end: null,
      bg: null,
      height: "281px",
      width: "500px",
      mp: null,
      status: null,
      history: null,
      autoTake: 2,
      bets: [],
      selectedSkins: null,
      selectedPrice: null,
      skins: 0,
      bank: 0,
      players: 0,
      isWin: false,
      betTake: false,
      dataMulti: null,
      hash: null,
      salt: null,
      winItem: null,
      winPrice: null,
      localItems: null,
    };
  },
  computed: {
    ...mapState({ userInventory: "userInventory", user: "user" }),
  },
  async created() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.start.stop();
        this.run.stop();
        this.end.stop();
        this.bg.stop();
      } else {
        var status = this.status;
        this.status = null;
        setTimeout(() => {
          this.status = status;
        }, 100);
      }
    });

    if (window.innerWidth <= 600) {
      this.width = "100%";
    }
    if (this.$route.params.code !== undefined) {
      if (this.user) {
        await this.$root
          .request("GET", "/api/referral/check", {
            code: this.$route.params.code,
          })
          .then(() => {
            this.$root.code = this.$route.params.code;
            this.$root.refModal = true;
          })
          .catch(() => {
            this.$router.replace("/");
          });
      } else {
        await this.$root
          .request("GET", "/api/referral/check", {
            code: this.$route.params.code,
          })
          .then(() => {
            localStorage.setItem("referralCode", this.$route.params.code);
            this.$router.replace("/");
          })
          .catch(() => {
            this.$router.replace("/");
          });
      }
    }

    await this.$root.request("GET", "/api/game/1").then((resp) => {
      this.history = resp.history;
      this.hash = resp.history[0].hash;
      this.dataMulti = resp.history[0].multiplier;
      this.salt = resp.history[0].secret;
      this.bets = resp.current.bets;
      this.status = resp.current.status;
      this.hash = resp.current.hash;
      this.updateBets(this.bets);
      if (this.user !== null) {
        this.bets.forEach((item) => {
          if (item.user.uuid === this.user.uuid) {
            this.selectedSkins = item.items;
            if (item.win != null) {
              this.betTake = true;
              var winItem = item.winItem;
              winItem.p = winItem.price;
              winItem.bc = winItem.borderColor;
              winItem.i = winItem.image;
              winItem.mn = winItem.marketName;
              this.winItem = winItem;
              this.winPrice = item.win;
            }
            item.items.forEach((el) => {
              if (this.selectedPrice !== null) {
                this.selectedPrice =
                  parseFloat(this.selectedPrice) + parseFloat(el.price);
              } else {
                this.selectedPrice = parseFloat(el.price);
              }
            });
          }
        });
      }
    });

    this.localItems = JSON.parse(localStorage.getItem("dataItems"));
  },
  mounted() {
    var that = this;
    // bg().then(function (data) {
    //   that.bg = lottie.loadAnimation({
    //     container: that.$refs.bg,
    //     renderer: "svg",
    //     loop: true,
    //     autoplay: false,
    //     animationData: data,
    //   });
    // });

    start().then(function (data) {
      that.start = lottie.loadAnimation({
        container: that.$refs.start,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: data,
      });
    });

    run().then(function (data) {
      that.run = lottie.loadAnimation({
        container: that.$refs.run,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData: data,
      });
    });

    end().then(function (data) {
      that.end = lottie.loadAnimation({
        container: that.$refs.end,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: data,
      });
    });

    var intr = setInterval(() => {
      if (
        this.$socket.connected &&
        this.run &&
        this.start &&
        this.end 
      ) {
        this.loading = false;
        clearInterval(intr);
      }
    }, 500);
  },
  sockets: {
    gameCrashMultiplier(mess) {
      this.status = 1;
      this.mp = mess;
      if (
        (mess * 100) % 3 === 0 &&
        this.selectedPrice !== null &&
        this.betTake == false
      ) {
        var winPriceVal = (this.selectedPrice * mess).toFixed(0);
        for (let i = winPriceVal; i > 0; i--) {
          let some = this.localItems[i];
          if (some !== undefined) {
            if (this.selectedPrice !== some.p) {
              this.winItem = some;
              i = 0;
            }
          }
        }
      }
    },
    gameCrashTimer(mess) {
      if (this.status !== 2) {
        this.mp = mess;
      }
      if (this.status == 0) {
        if (this.mp == 1) {
          this.$root.playSound("crashStart");
        }
      }
    },
    gameCrashFinished(mess) {
      if (this.history !== null) {
        this.history.pop();
        this.history.unshift(mess);
      } else {
        this.history.push(mess);
      }
      this.status = 2;
      this.betTake = false;
      this.hash = mess.hash;
      this.dataMulti = mess.multiplier;
      this.salt = mess.secret;
      this.mp = mess.multiplier;
      this.$root.playSound("crashEnd");
    },
    gameCrashInitialized() {
      this.isWin = false;
      this.status = 0;
      this.bets = [];
      this.skins = 0;
      this.players = 0;
      this.bank = 0;
      this.selectedSkins = null;
      this.selectedPrice = null;
      this.winItem = null;
      this.winPrice = null;
    },
    gameCrashBlocked() {
      this.status = 1;
    },
    gameCrashBetUpdate(data) {
      // Факт изменения ставки Crash-игры (Только выигрыш)
      const bet = this.bets.find((b) => b.id === data.id);
      if (bet) {
        bet.win = data.win;
        bet.multiplier = data.multiplier;
        bet.winItem = data.winItem;
        if (this.user && this.user.uuid === bet.user.uuid) {
          this.betTake = true;
          var winItem = data.winItem;
          winItem.p = winItem.price;
          winItem.bc = winItem.borderColor;
          winItem.i = winItem.image;
          winItem.mn = winItem.marketName;
          this.winItem = winItem;
          this.winPrice = data.win;
          this.isWin = true;
          this.$root.playSound("win");
        }
      }
    },
    gameCrashBetNew(mess) {
      var item = mess;
      this.bets.push(item);
      this.skins += item.items.length;
      this.bank += item.items.reduce((p, c) => p + c.price, 0);
      this.players += 1;
      this.bets.sort((a, b) => {
        if (this.user !== null && a.user.uuid === this.user.uuid) {
          return -1;
        } else {
          return b.sum - a.sum;
        }
      });
    },
  },
  beforeDestroy() {
    this.clearSelect();
    this.start.destroy();
    this.run.destroy();
    this.end.destroy();
  },
  watch: {
    status(val) {
      try {
        if (val === 0) {
          // this.bgs.play();
          // this.bgr.stop();
          // this.bge.stop();
          this.run.stop();
          this.end.stop();
          this.start.play();
        } else if (val === 1) {
          // this.bgs.stop();
          // this.bgr.play();
          // this.bge.stop();
          this.end.stop();
          this.start.stop();
          this.run.play();
        } else if (val === 2) {
          // this.bgs.stop();
          // this.bgr.stop();
          // this.bge.play();
          this.run.stop();
          this.start.stop();
          this.end.play();
        }
      } catch {
        var status = this.status;
        this.status = null;
        setTimeout(() => {
          this.status = status;
        }, 100);
      }
    },
  },
  methods: {
    ...mapActions({
      getInventory: "getInventory",
      removeInventoryItems: "removeInventoryItems",
      clearSelect: "clearSelect",
    }),
    updateBets(bets) {
      bets.forEach((element) => {
        this.skins = this.skins + element.items.length;
        element.items.forEach((item) => {
          this.bank = this.bank + item.price;
        });
      });
      this.bets.sort((a, b) => {
        if (this.user !== null && a.user.uuid === this.user.uuid) {
          return -1;
        } else {
          return b.sum - a.sum;
        }
      });
      this.players = bets.length;
    },
    async createBet() {
      if (this.autoTake > 1) {
        await this.$root
          .request("POST", "/api/game/1/bet", {
            multiplier: parseFloat(this.autoTake),
            itemIds: [
              ...Object.keys(this.userInventory.selected.items).map((item) =>
                parseInt(item)
              ),
            ],
          })
          .then(() => {
            this.selectedSkins = this.userInventory.selected.items;
            this.selectedPrice = this.userInventory.selected.price;
            this.removeInventoryItems([
              ...Object.keys(this.userInventory.selected.items).map((item) =>
                parseInt(item)
              ),
            ]);
            this.clearSelect();
          });
      } else {
        this.$root.showNotify("error", this.$t("content.crash.autoWith"));
      }
    },
    async takeBet() {
      await this.$root.request("PATCH", "/api/game/1/bet").then(() => {
        this.betTake = true;
      });
    },
  },
};
</script>


<style lang="scss" scoped>
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

.crash {
  display: flex;
  gap: 20px;
  &-left {
    width: 500px;
  }
  &-game {
    height: 260px;
    background: #181818;
    box-shadow: inset 0px 0px 50px #181818;
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    //
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &__wrapp > div:first-child {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    
    .bg {
      position: absolute;
      z-index: 3;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 4;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &__text {
      position: absolute;
      font-size: 30px;
      z-index: 3;
      line-height: 32px;
      color: rgb(235, 52, 52);
      top: 10px;
      left: 50%;
      font-weight: 600;
      transform: translateX(-50%);

      &.norm {
        color: #fff;
        font-size: 19px;
        line-height: 22px;
      }
    }
  }

  &__infogame {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    & > div {
      font-size: 24px;
      line-height: 26px;
      font-weight: 600;
      color: #fff;
    }
  }

  &-info {
    position: relative;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    height: calc(100vh - 20px);
    flex: 1;
    padding: 20px;
    padding-bottom: 40px;
    &__header {
      background: #212121;
      border-radius: 10px;
      padding: 9px 30px 35px 30px;
      margin-bottom: 20px;
      &.noselect {
        height: 210px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      &-img {
        margin-bottom: 5px;
      }

      &-title {
        font-weight: 500;
        font-family: "Oswald";
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        color: #434343;
      }
      &-dollars {
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        &--from {
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
        }

        &--to {
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
        }
      }

      &-skins {
        display: flex;
        &--from {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          width: calc(50% - 50px);
        }

        &--arrow {
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &--more {
          width: 40px;
          height: 40px;
          background: #de3720;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          line-height: 16px;
          border-radius: 5px;
        }

        &--to {
          display: flex;
          align-items: center;
          justify-content: center;
          width: calc(50% - 50px);
        }
      }
    }

    &__stats {
      position: relative;
      height: 28px;
      overflow: hidden;
      max-width: inherit;
      min-width: 300px;
      width: 100%;
      margin: 0 auto;
      margin-bottom: 20px;
      &::-webkit-scrollbar {
        display: none;
      }
      &-wrapper {
        position: absolute;
        width: 1500px;
        display: flex;
        gap: 8px;
        height: inherit;
      }
      &-item {
        cursor: pointer;
        width: 64px;
        background: linear-gradient(
          73.7deg,
          #ae4242 -30.37%,
          rgba(174, 66, 66, 0) 87.99%
        );
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #cd4c4c;
      }
    }

    &__game {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      flex-wrap: wrap;

      &-stat {
        display: flex;
        column-gap: 21px;
        margin-right: 10px;
        align-items: center;
        &--item {
          display: flex;
          align-items: center;
          svg {
            margin-right: 15px;
          }
          span {
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #434343;
          }
        }
      }

      &-bet {
        display: flex;
        align-items: center;
        margin-left: auto;
        &--edit {
          margin-right: 12px;
        }

        &--list {
          display: flex;
          gap: 10px;
          margin-right: 10px;
          div {
            background: #212121;
            border-radius: 10px;
            width: 40px;
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

        &--fieldset {
          background: #212121;
          border: 1px solid #434343;
          box-sizing: border-box;
          border-radius: 10px;
          width: 110px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;

          input {
            text-align: center;
            width: 30px;
            border: none;
            outline: none;
            font-weight: bold;
            font-size: 14px;
            line-height: 17px;
            color: #ffffff;
            background: transparent;
          }
        }

        &--button {
          width: 176px;
          height: 40px;
          background: #de3720;
          box-shadow: 0px 0px 5px rgba(222, 55, 32, 0.5),
            inset 0px 0px 5px 5px rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 18px;
          line-height: 22px;
          color: #ffffff;
          cursor: pointer;
          transition: all 300ms;

          &:hover {
            box-shadow: 0px 0px 5px rgba(222, 55, 32, 0.5),
              inset 0px 0px 8px #ffffff;
          }
        }
      }
    }

    &__list {
      padding-right: 3px;
      height: calc(100vh - 420px);
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

      &-item {
        display: flex;
        align-items: center;
        padding: 12px 15px;
        background: #212121;
        border-radius: 10px;

        &:not(.lose, .win) {
          .crash-info__list-item--state {
            background: #1f1f1f;
            border: 1px solid #de3720;
            box-sizing: border-box;
            border-radius: 10px;
            width: 85px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: normal;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
            color: #ffffff;
            text-transform: uppercase;
          }
        }

        &.win {
          background: linear-gradient(
              270deg,
              rgba(114, 242, 53, 0.29) -27.01%,
              rgba(114, 242, 53, 0) 49.94%
            ),
            #212121;
          .crash-info__list-item--state {
            display: flex;
            align-items: center;
            span {
              &:first-child {
                font-weight: normal;
                font-size: 12px;
                line-height: 14px;
                text-align: center;
                color: #72f235;
                margin-right: 15px;
              }

              &:nth-child(2) {
                background: linear-gradient(
                    270deg,
                    #6dd32d -67.06%,
                    rgba(109, 211, 45, 0) 68.82%
                  ),
                  rgba(114, 242, 53, 0.3);
                border-radius: 10px;
                width: 85px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: normal;
                font-size: 12px;
                line-height: 14px;
                text-align: center;
                color: #72f235;
                margin-right: 10px;
              }
            }

            img {
              width: 36px;
              height: 36px;
            }
          }
        }

        &.lose {
          background: linear-gradient(
              270deg,
              rgba(242, 53, 53, 0.29) -27.01%,
              rgba(242, 53, 53, 0) 49.94%
            ),
            #212121;
          .crash-info__list-item--state {
            background: rgba(222, 55, 32, 0.3);
            border-radius: 10px;
            width: 85px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: normal;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
            color: #de3720;
          }
        }

        &:not(:last-child) {
          margin-bottom: 10px;
        }
        &--avatar {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          margin-right: 20px;
        }

        &--skins {
          display: flex;
          gap: 7px;
          margin-right: 24px;
        }

        &--skin {
          width: 36px;
          height: 36px;
        }

        &--more {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #de3720;
          font-size: 14px;
          font-weight: 500;
        }

        &--bet {
          font-weight: 500;
          font-size: 12px;
          line-height: 14px;
          color: #747474;
        }

        &--state {
          margin-left: auto;
        }
      }
    }
  }
}

.mob {
  display: none;
}
@media screen and (max-width: 1750px) {
  .crash {
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
    &-info {
      margin-bottom: 10px;
      &__game {
        flex-direction: column-reverse;

        &-bet {
          justify-content: center;
          margin-bottom: 10px;
          width: 100%;
          flex-wrap: wrap;
        }

        &-stat {
          width: 100%;
          justify-content: center;
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .mob {
    display: flex;
  }
  .crash {
    margin-bottom: 60px;
    &-game {
      video {
        width: 100%;
        height: 100%;
      }

      &__text {
        &.norm {
          font-size: 18px;
          width: 225px;
        }
      }
    }
    &-info {
      padding: 10px;
      padding-bottom: 50px;
      &__header {
        display: none;
      }

      & &__stats {
        display: none;
      }

      & &__game-bet {
        display: none;
      }
    }
  }

  .crash-info__list-item--state {
    img {
      display: none;
    }
    span:nth-child(2) {
      margin: 0 !important;
    }
  }

  .crash-info__list-item--skins {
    img:not(:first-child) {
      display: none;
    }
  }

  .crash-info__game-bet--button {
    width: 100%;
    margin-top: 10px;
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
}
</style>
