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
      <div class="modal-close" @click="$emit('update:deposite', false)">
        <div class="close">
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="modal-head">
        <span>{{ $t("content.deposite.title") }}</span>
      </div>
      <div class="deposite-wrapper">
        <div class="deposite-card">
          <div class="deposite-card__img">
            <img
              :src="'/img/deposite/' + currentItem.icon + '.png'"
              :alt="currentItem.title"
            />
          </div>
          <div class="deposite-card__wrapper">
            <span class="deposite-card__title">{{ currentItem.title }}</span>
            <div
              class="deposite-card__close"
              :class="{ open: showCards }"
              @click="showCards = !showCards"
            >
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99997 7.42017C5.7849 7.42017 5.56987 7.33805 5.4059 7.17417L0.24617 2.01439C-0.0820565 1.68616 -0.0820565 1.154 0.24617 0.825904C0.574263 0.497811 1.10632 0.497811 1.43457 0.825904L5.99997 5.39156L10.5654 0.826063C10.8936 0.49797 11.4256 0.49797 11.7537 0.826063C12.0821 1.15416 12.0821 1.68632 11.7537 2.01455L6.59404 7.17433C6.42999 7.33824 6.21495 7.42017 5.99997 7.42017Z"
                  fill="#7D7D7D"
                />
              </svg>
            </div>
          </div>

          <div
            class="deposite-card__list-wrapper"
            v-if="showCards"
            :class="{ open: showCards }"
          >
            <div class="deposite-card__list">
              <div
                class="deposite-card__item"
                v-for="item in $root.settings.deposit.payment.systemList"
                :key="item.name"
                @click="
                  currentItem = item;
                  showCards = false;
                "
              >
                <img
                  :src="'/img/deposite/' + item.icon + '.png'"
                  :alt="item.title"
                />
                

                <span class="deposite-card__item-title">{{ item.title }}</span>
                <span class="deposite-card__item-subtitle"
                  >{{ $t("content.deposite.minSum") }}
                  {{
                    item.minSum !== undefined
                      ? item.minSum
                      : $root.settings.deposit.payment.minSum
                  }}
                  RUB</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="deposite">
          <div class="deposite-top">
            <div class="deposite-top__bnp">
              <input v-model="pay" placeholder="0" type="number" />
              <span>usd</span>
            </div>
          </div>
          <div class="deposite-bottom">
            <svg
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.43741 7.27336H6.04163C5.83003 6.93847 5.69039 6.56257 5.65058 6.16501C5.52338 4.89447 6.1925 3.75552 7.33167 3.25056C8.37877 2.78642 9.55547 2.97616 10.4028 3.74467L12.4285 5.58051C12.823 5.14903 13.3901 4.87785 14.0195 4.87785C14.65 4.87785 15.218 5.14989 15.6126 5.58271L17.6408 3.74445C18.4895 2.97594 19.6658 2.78693 20.7124 3.25082C21.8513 3.75582 22.5205 4.89516 22.3929 6.16565C22.353 6.56291 22.2135 6.93865 22.0019 7.27336H23.6015C24.3953 7.27336 25.0388 7.91687 25.0388 8.71065V10.8666C25.0388 11.2635 24.7171 11.5853 24.3202 11.5853H3.71875C3.32188 11.5853 3.00008 11.2635 3.00008 10.8666V8.71065C3.00012 7.91687 3.64359 7.27336 4.43741 7.27336ZM16.1754 7.03382V7.27336H19.5563C20.4495 7.27336 21.1525 6.44062 20.9294 5.51061C20.8311 5.10104 20.5355 4.75191 20.1532 4.57517C19.6281 4.33248 19.0465 4.41039 18.6055 4.80954L16.1748 7.01264C16.175 7.01974 16.1754 7.02671 16.1754 7.03382ZM7.07668 5.97419C7.13022 6.72114 7.80494 7.27344 8.55379 7.27344H11.8635V7.0339C11.8635 7.02542 11.864 7.01703 11.8641 7.00855C11.3135 6.50941 10.119 5.42676 9.4711 4.8395C9.1029 4.50578 8.58771 4.35 8.11146 4.49205C7.42805 4.69591 7.0267 5.27709 7.07668 5.97419Z"
                fill="#7D7D7D"
              />
              <path
                d="M23.6016 13.0227V23.563C23.6016 24.3568 22.9581 25.0003 22.1643 25.0003H15.4568V13.0227H23.6016Z"
                fill="#7D7D7D"
              />
              <path
                d="M12.5823 13.0227V25.0003H5.87485C5.08103 25.0003 4.43756 24.3568 4.43756 23.563V13.0227H12.5823Z"
                fill="#7D7D7D"
              />
            </svg>

            <span class="deposite-bottom__title"
              >{{ $t("content.deposite.weGet") }}
            </span>
            <div class="deposite-bottom__dollar">
              <span class="sosiska-wrap"
                >{{ payWithBonus.toFixed(2) }} <Sosiska
              /></span>
            </div>
            <div class="deposite-bottom__price">
              <span class="sosiska-wrap"
                >+{{ (payWithBonus - pay).toFixed(2) }} <Sosiska
              /></span>
            </div>
          </div>
        </div>

        <button class="deposite-btn" @click="goPay">
          <span>{{ $t("content.deposite.addBalance") }}</span>
        </button>
        <div class="deposite-warn">
          {{ $t("content.deposite.checkAll") }}
        </div>
        <div class="deposite-other">
          <div class="deposite-other__title">
            {{ $t("content.deposite.others") }}
          </div>
          <div class="deposite-other__wrapper">
            <div @click="goSkins" class="deposite-other__skins">
              <span>{{ $t("content.deposite.skins") }}</span>
              <svg
                width="39"
                height="32"
                viewBox="0 0 39 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.294 24.9693L19.0481 23.1867L21.0023 18.8799L21.715 17.9814L23.9616 19.7645L23.2481 20.6628L21.294 24.9693Z"
                  fill="white"
                />
                <path
                  d="M23.2481 20.663L23.9616 19.7646L21.715 17.9815L21.0023 18.8801L23.1889 20.7929L23.2481 20.663Z"
                  fill="white"
                />
                <path
                  d="M18.6861 19.1778C18.378 19.1039 18.1881 18.7944 18.262 18.4863C18.3358 18.1782 18.6457 17.9881 18.9538 18.062C19.3361 18.1412 19.7109 17.897 19.7927 17.515C19.8165 17.4034 19.8728 17.3016 19.9549 17.2224L20.7117 16.4871C20.939 16.2665 21.3023 16.2719 21.5229 16.4992C21.7434 16.7267 21.7381 17.0897 21.5105 17.3102L20.8681 17.9357C20.5764 18.8412 19.6485 19.3809 18.7172 19.1861L18.6861 19.1778Z"
                  fill="white"
                />
                <path
                  d="M17.2234 14.4159L16.9267 14.6837C15.5036 15.9694 13.5126 16.419 11.6753 15.8696L11.5971 18.7366L12.8387 18.8379C14.6927 18.9917 16.5372 18.4483 18.012 17.3144L19.4704 16.1942L17.2234 14.4159Z"
                  fill="white"
                />
                <path
                  d="M11.6751 15.8699L11.6094 18.2778L12.7747 18.3476C14.6554 18.4494 16.5084 17.8584 17.9829 16.6865L19.0365 15.8567L17.221 14.4155L16.9242 14.6833C15.5016 15.9686 13.512 16.4183 11.6751 15.8699Z"
                  fill="white"
                />
                <path
                  d="M25.0309 18.417L27.819 21.3623L29.0736 21.626L33.6588 25.9979L30.4493 30.0408L23.6048 20.2143L23.265 18.9493L25.0309 18.417Z"
                  fill="white"
                />
                <path
                  d="M5.45105 4.33926L6.52072 2.99159L14.157 9.05371L13.0874 10.4011L5.45105 4.33926Z"
                  fill="white"
                />
                <path
                  d="M15.9683 14.152L15.0699 13.4387L12.2823 10.4936L13.3517 9.14557L17.3943 12.3551L15.9683 14.152Z"
                  fill="white"
                />
                <path
                  d="M22.5119 19.2003L16.3227 13.7022L18.4614 11.0096L25.0182 16.2151C25.424 16.5366 25.685 17.006 25.7444 17.5203C25.8034 18.0348 25.6557 18.5513 25.3335 18.9564C25.0002 19.3759 24.5089 19.6394 23.9753 19.6854C23.4416 19.7317 22.9122 19.5563 22.5119 19.2003Z"
                  fill="white"
                />
                <path
                  d="M10.1931 2.97768L9.66564 5.48736L8.59536 6.83515L6.79911 5.40871L7.86871 4.06132L9.29483 2.26411L10.1931 2.97768Z"
                  fill="white"
                />
                <path
                  d="M17.3958 12.3558L13.3517 9.14587L14.0671 8.24806C14.2643 8.00024 14.6247 7.95882 14.8726 8.1557L18.4667 11.0081L17.3958 12.3558Z"
                  fill="white"
                />
                <path
                  d="M25.0211 16.2125L18.507 11.0411L17.3958 12.3556L25.4617 18.7587C25.9818 17.921 25.7923 16.8268 25.0211 16.2125Z"
                  fill="white"
                />
                <path
                  d="M24.9736 22.1792L30.4494 30.0407L33.6589 25.9978L29.0737 21.6259L27.8192 21.3622L26.6243 20.0998L24.9736 22.1792Z"
                  fill="white"
                />
                <path
                  d="M28.9165 27.3597L29.9866 26.0125L30.8845 26.7254L29.8143 28.0729L28.9165 27.3597Z"
                  fill="white"
                />
                <path
                  d="M32.4079 24.8051L31.5744 24.0106L30.6996 25.1127L31.5974 25.8259L32.4079 24.8051Z"
                  fill="white"
                />
                <path
                  d="M5.09747 4.78577L6.43382 5.84574C6.43896 5.84712 6.4397 5.85515 6.44453 5.85876L8.24174 7.28488L8.25445 7.28829L11.8338 10.1374C11.6562 10.3608 11.6699 10.6808 11.866 10.8882L14.6544 13.8324C14.673 13.8518 14.6932 13.8703 14.7146 13.887L15.6124 14.6025C15.7016 14.6783 15.8148 14.7202 15.932 14.7209C14.7214 15.5115 13.2249 15.7319 11.8376 15.323C11.6676 15.2694 11.4822 15.3014 11.3397 15.4088C11.1947 15.5129 11.1063 15.6785 11.1008 15.8571L11.0226 18.7217C11.0154 18.9868 11.1905 19.2224 11.4466 19.2914C11.4801 19.3006 11.5144 19.3066 11.549 19.3095L12.7904 19.4105C14.7847 19.5807 16.7702 18.998 18.3557 17.7767L19.2643 17.0831L19.782 17.5425C19.6896 17.9097 19.3249 18.139 18.9541 18.0634C18.646 17.9895 18.3362 18.1796 18.2623 18.4877C18.1884 18.7958 18.3783 19.1053 18.6867 19.1793L18.7165 19.1872C19.4836 19.3464 20.2677 19.0059 20.6757 18.3371L20.6919 18.3522L20.5525 18.5285C20.5241 18.565 20.5002 18.6047 20.4811 18.6468L18.5258 22.9501C18.4169 23.1899 18.4851 23.4732 18.6914 23.6369L20.9391 25.42C21.0773 25.5298 21.2583 25.5696 21.43 25.5283C21.6014 25.487 21.7446 25.3691 21.8175 25.2083L23.6189 21.2425L26.4924 25.3654L29.9779 30.3704C30.0552 30.4812 30.1695 30.5611 30.3004 30.5962L30.3031 30.5969C30.3463 30.6079 30.3905 30.614 30.4349 30.6148C30.6165 30.6209 30.79 30.5401 30.9027 30.3978L34.112 26.3537C34.296 26.1212 34.2729 25.7868 34.0581 25.5823L30.2683 21.9715L29.4708 21.2116C29.4326 21.1746 29.3891 21.143 29.3423 21.1177C29.3249 21.109 29.3052 21.1078 29.288 21.0985C29.2576 21.0843 29.2261 21.0729 29.1939 21.0643L28.4743 20.9132L28.1149 20.8369L28.0054 20.7221L27.0732 19.7368C27.0632 19.7251 27.0545 19.7132 27.0436 19.7022L26.1197 18.7324C26.5795 17.6893 26.2741 16.4672 25.3773 15.763L18.8211 10.5585L15.2271 7.70556C14.731 7.31198 14.0098 7.39475 13.616 7.8908L10.2996 5.25946L10.7554 3.09501C10.8005 2.8824 10.7214 2.66261 10.5512 2.52742L9.65138 1.81519C9.40335 1.61884 9.04316 1.66033 8.84642 1.90769L7.77807 3.25367L6.87845 2.54063C6.62994 2.34387 6.26908 2.38576 6.07239 2.63399L5.00497 3.98081C4.80863 4.22885 4.84985 4.58896 5.09747 4.78577ZM17.6581 16.8638C16.2988 17.9117 14.5956 18.4121 12.8853 18.2655L12.1839 18.2083L12.2282 16.5868C13.9964 16.8788 15.8036 16.3796 17.1713 15.2214L18.3902 16.3053L17.6581 16.8638ZM22.7978 20.313C22.7705 20.3489 22.7471 20.3876 22.7283 20.4286L21.077 24.0636L19.7549 23.0144L21.4943 19.1824L21.5491 19.1133L22.1289 19.6285C22.3688 19.8412 22.6469 20.0062 22.9484 20.1148L22.7978 20.313ZM26.6615 20.9755L27.1683 21.509L27.4029 21.7566C27.4831 21.8413 27.5872 21.8996 27.7013 21.9238L28.4583 22.0828L28.7955 22.1541L29.3836 22.7143L31.2163 24.4611L30.6981 25.116L31.5977 25.8273L32.0477 25.2556L32.8816 26.0507L30.4785 29.0781L29.7336 28.0093L29.813 28.072L30.8836 26.7243L29.9863 26.009L29.1105 27.1167L26.5418 23.4283L25.6872 22.2011L26.6615 20.9755ZM25.4328 19.6741L25.8672 20.1315L25.0031 21.2193L24.3166 20.2367L24.3489 20.1949C24.7473 20.1126 25.1194 19.9337 25.4328 19.6741ZM18.5572 11.8137L24.6642 16.6629C25.0165 16.9333 25.2102 17.3615 25.1807 17.8047L18.2004 12.2625L18.5572 11.8137ZM17.4871 13.1609L24.6354 18.836C24.114 19.2367 23.3811 19.2096 22.8912 18.771L17.1126 13.6346L17.4871 13.1609ZM14.5144 8.6041L17.6586 11.1003L17.3009 11.5489L14.156 9.05313L14.5144 8.6041ZM13.4444 9.95196L16.5887 12.4476L15.8759 13.3461L15.4582 13.015L13.0402 10.4606L13.4444 9.95196ZM9.75758 6.29218L12.9031 8.78758L12.5458 9.23513L9.40034 6.74035L9.75758 6.29218ZM9.38777 3.06949L9.55972 3.20573L9.29477 4.46286L8.67336 3.9699L9.38777 3.06949ZM7.95965 4.86877L8.85819 5.58152L8.5014 6.02691L7.60366 5.31118L7.95965 4.86877ZM6.61489 3.79582L7.064 4.15389L6.70634 4.60252L6.25832 4.24474L6.61489 3.79582Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal-bonus"
      :class="{
        'visible-modal': deposite === true,
        'fade-modal': deposite === false,
      }"
    >
      <div class="modal-head">
        <span>{{ $t("content.deposite.getBonus") }}</span>
      </div>

      <div class="promocode">
        <div class="promo-title">{{ $t("content.deposite.promodep") }}</div>
        <fieldset class="promocode-field" :class="{ have: codeUse !== null }">
          <input
            v-model="code"
            :placeholder="$t('content.deposite.code')"
            type="text"
            :readonly="codeUse !== null"
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
        <div class="promo-title">{{ $t("content.deposite.nicknameRule") }}</div>
        <fieldset
          class="nickname-field"
          :class="{ have: data.name !== undefined }"
        >
          <input
            :value="$root.settings.bonus.name.profileString"
            disabled
            type="text"
          />
          <div class="nickname-field__right">
            <span> +5% </span>
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
      <div class="bonus">
        <span class="bonus-title">{{ $t("content.deposite.bonuses") }}</span>
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
              <span>{{ $t("content.deposite.allBonus") }}</span>
            </div>
            <div class="bonus-list__item-percent">+{{ allPercent }}%</div>
          </div>
          <div
            class="bonus-list__item"
            :class="{ 'main-item': codePercent !== 0 }"
          >
            <span class="bonus-list__item-title">
              {{ $t("content.deposite.promodep") }}</span
            >
            <div class="bonus-list__item-percent">+{{ codePercent }}%</div>
          </div>
          <div
            class="bonus-list__item"
            :class="{ 'main-item': data.name !== undefined }"
          >
            <span class="bonus-list__item-title">
              {{ $root.settings.bonus.name.profileString }}
              {{ $t("content.deposite.inName") }}</span
            >
            <div class="bonus-list__item-percent">
              +{{ data.name !== undefined ? data.name : "0" }}%
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
      showCards: false,
      pay: null,
      allPercent: 0,
      data: {},
      code: null,
      codeUse: null,
      codePercent: 0,
      currentItem: null,
    };
  },
  computed: {
    payWithBonus() {
      if (this.pay) {
        var percent = parseFloat(this.allPercent) / 100;
        return parseFloat(this.pay) + parseFloat(this.pay) * percent;
      } else {
        return 0;
      }
    },
  },
  watch: {
    async deposite(val) {
      if (val) {
        await this.$root.request("GET", "/api/bonus/deposit").then((resp) => {
          this.data = resp;
          if (resp.name) {
            this.allPercent = this.allPercent + resp.name;
          }
          if (resp.referral) {
            this.allPercent = this.allPercent + resp.referral;
          }
        });
      }
    },
  },
  props: ["deposite"],
  created() {
    this.currentItem = this.$root.settings.deposit.payment.systemList[0];
  },
  methods: {
    async checkCode() {
      if (this.codeUse == null) {
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
      }
    },
    async goPay() {
      await this.$root
        .request("POST", "/api/deposit/payment", {
          sum: +this.pay,
          lang: this.$root.language,
          ps: this.currentItem.name,
          promo: this.codeUse,
        })
        .then((resp) => {
          if (resp.url !== "undefined" && resp.url !== null) {
            window.location = resp.url;
          }
        });
    },
    goSkins() {
      this.$emit("update:deposite", false);
      this.$router.replace(`/deposite`);
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

  &-head {
    margin-bottom: 31px;
    display: flex;
    align-items: center;
    img {
      width: 22px;
      height: 26px;
      margin-right: 22px;
    }

    span {
      text-transform: uppercase;
      font-weight: 500;
      font-family: "Oswald";
      font-size: 14px;
      line-height: 21px;
      color: #ffffff;
    }
  }

  &-body {
    width: 560px;
    position: relative;
    height: auto;
    padding: 32px 25px 49px 31px;
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

.deposite-wrapper {
  width: 460px;
  margin: 0 auto;
}

.deposite {
  background: #181818;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 27px;
  &-top {
    position: relative;
    display: flex;
    border-bottom: 1px solid #202020;

    &__bnp,
    &__rub {
      display: flex;
      input {
        font-weight: 500;
        background: transparent;
        outline: none;
        border: none;
        width: 100%;
        font-family: "Oswald";
        font-size: 14px;
        line-height: 21px;
        color: #7d7d7d;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }

      span {
        display: block;
        text-transform: uppercase;
        font-family: "Oswald";
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #7d7d7d;
      }
    }

    &__bnp {
      border-right: 1px solid #202020;
      padding: 28px 31px 27px 22px;
      flex: 1;
      span {
        margin-left: auto;
      }
    }

    &__rub {
      padding: 28px 19px 27px 31px;
      flex: 1;
      span {
        margin-right: auto;
      }
      input {
        text-align: right;
      }
    }

    &__refresh {
      width: 40px;
      height: 40px;
      position: absolute;
      background: #202020;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &-bottom {
    padding: 20px 16px 21px 19px;
    display: flex;
    align-items: flex-end;
    svg {
      margin-right: 10px;
    }

    &__title {
      text-transform: uppercase;
      margin-right: auto;
      font-family: "Oswald";
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;
      color: #7d7d7d;
    }

    &__dollar {
      display: flex;
      align-items: flex-end;
      margin-right: 8px;
      span {
        font-family: "Oswald";
        font-size: 14px;
        line-height: 21px;
        font-weight: 500;
        margin-right: 4px;
      }
      img {
        margin-bottom: 2px;
      }
    }

    &__price {
      display: flex;
      align-items: flex-end;
      span {
        font-family: "Oswald";
        font-size: 14px;
        line-height: 21px;
        font-weight: 500;
        color: #33ff00;
        text-shadow: 0px 0px 4px #2ee66d;
        margin-right: 4px;
      }
      img {
        margin-bottom: 2px;
      }
    }
  }
}

.deposite-card {
  display: flex;
  background: #181818;
  border-radius: 15px;
  margin-bottom: 40px;
  position: relative;
  &__img {
    padding: 18px 16px 13px 19px;
    border-right: 2px solid #202020;
    img {
      width: 80px;
      height: 25px;
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    padding: 15px 16px;
    flex: 1;
  }

  &__title {
    font-family: "Oswald";
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #fff;
    text-transform: uppercase;
    margin-right: auto;
  }

  &__close {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #202020;
    border-radius: 10px;
    transform: rotate(0deg);
    transition: all 300ms;
    cursor: pointer;

    &.open {
      transform: rotate(-180deg);
    }

    &:hover {
      opacity: 0.8;
    }
  }

  &__list {
    flex-wrap: wrap;
    display: flex;
    gap: 14px 13px;
    overflow-y: auto;
    height: 215px;
    &-wrapper {
      height: 252px;
      width: 100%;
      background: #181818;
      border-radius: 15px;
      position: absolute;
      z-index: 2;
      top: 67px;
      padding: 20px 10px 17px 18px;
    }

    &::-webkit-scrollbar {
      width: 5px;
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

  &__item {
    background: #202020;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 100px;

    img,
    svg {
      margin-bottom: 18px;
      width: 80px;
      height: 25px;
    }

    &-title {
      font-family: "Oswald";
      color: #fff;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
    }

    &-subtitle {
      font-family: "Oswald";
      font-size: 10px;
      line-height: 15px;
      color: #9e9e9e;
      margin-top: -1px;
    }
  }
}

.deposite-btn {
  width: 100%;
  height: 60px;
  background: #33ff00;
  border-radius: 15px;
  border: none;
  outline: none;
  position: relative;
  cursor: pointer;
  transition: all 300ms;
  margin-bottom: 21px;
  border: 2px solid #181818;
  &:hover {
    opacity: 0.8;
  }
  span {
    font-family: "Oswald";
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    color: #ffffff;
    text-transform: uppercase;
  }
}

.deposite-warn {
  display: inline-block;
  padding: 10px 0;
  font-size: 14px;
  text-align: center;
  margin-bottom: 30px;
  line-height: 20px;
  color: #7d7d7d;
  line-height: 20px;
  background: #181818;
  border-radius: 15px;
  width: 100%;
}

.deposite-other {
  &__title {
    color: #7d7d7d;
    font-family: "Oswald";
    font-size: 14px;
    line-height: 21px;
    font-weight: normal;
    margin-bottom: 15px;
    text-transform: uppercase;
    text-align: center;
  }

  &__wrapper {
    display: flex;
    column-gap: 18px;
  }

  &__skins,
  &__crypt {
    padding: 16px 10px 17px 31px;
    background: #de3720;
    border-radius: 15px;
    display: flex;
    align-items: center;
    flex: 1;
    cursor: pointer;
    border: 2px solid #181818;
    transition: all 300ms;
    &:hover {
      opacity: 0.8;
    }
    span {
      font-family: "Oswald";
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      margin-right: auto;
      color: #fff;
      text-transform: uppercase;
    }
  }

  &__crypt {
    img {
      margin-right: 12px;
    }
  }
}

.promocode,
.nickname {
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
    &.have {
      background: linear-gradient(
        90deg,
        #181818 50%,
        rgba(110, 238, 78, 1) 120%
      );

      svg path {
        color: #33ff00;
        fill: #33ff00;
      }
    }
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
  margin-bottom: 138px;
  &-field {
    padding: 14px 17px 15px 21px;
    background: linear-gradient(90deg, #181818 50%, #de3720 120%);
    &.have {
      background: linear-gradient(
        90deg,
        #181818 50%,
        rgba(110, 238, 78, 1) 120%
      );

      .nickname-field__right span,
      .nickname-field__right svg path {
        color: #33ff00;
        fill: #33ff00;
      }
    }
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
        color: #de3720;
        margin-right: 4px;
      }

      svg path {
        fill: #de3720;
      }
    }
  }
}

.promo-title {
  margin-bottom: 7px;
  text-transform: uppercase;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #7d7d7d;
}

.bonus {
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
        padding: 14px 0 14px 18px;

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

  .deposite {
    &-wrapper {
      width: 100%;
    }
    &-top {
      &__bnp,
      &__rub {
        width: 50%;
        input {
          width: 70px;
        }
      }
    }
    &-bottom {
      &__title {
        font-size: 11px;
        line-height: 14px;
        margin-bottom: 2px;
      }
    }
  }

  .bonus {
    .bonus-title {
      display: inline-block;
      width: 100%;
      text-align: center;
      margin-bottom: 28px;
    }
  }
}
</style>