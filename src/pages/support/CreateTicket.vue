<template>
  <div class="support" v-if="$root.user && loading == false">
    <SupportInfo />
    <div class="support-content">
      <router-link to="/support/1" class="support-header">
        <svg
          width="17"
          height="15"
          style="margin-right: 12px"
          viewBox="0 0 17 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.563 14.3442C6.51921 14.3122 6.47759 14.2772 6.43848 14.2396L0.356773 8.15784C-0.118551 7.68309 -0.118969 6.91296 0.355784 6.43771C0.356089 6.43741 0.356431 6.43706 0.356735 6.43676L6.43844 0.355054C6.91411 -0.119281 7.68424 -0.118216 8.15861 0.357449C8.19594 0.39489 8.2308 0.434725 8.26295 0.476688C8.60395 0.985309 8.52952 1.66551 8.08658 2.08834L4.72948 5.45761C4.55102 5.63626 4.34584 5.78606 4.12131 5.90157L3.75641 6.06578L15.7009 6.06578C16.3222 6.0427 16.8674 6.47675 16.9841 7.0875C17.0916 7.7506 16.6413 8.37534 15.9782 8.48287C15.9086 8.49416 15.8382 8.49937 15.7678 8.49846L3.77465 8.49846L4.03617 8.62009C4.29179 8.74108 4.52434 8.90574 4.7234 9.10663L8.08658 12.4698C8.52952 12.8926 8.60395 13.5728 8.26295 14.0815C7.86608 14.6235 7.105 14.7411 6.563 14.3442Z"
            fill="white"
          />
        </svg>
        {{ $t("content.support.goQuest") }}
      </router-link>
      <div class="support-body">
        <div class="create" v-if="question">
          <div class="create-title">
            <span>{{ $t("content.support.createTicket") }}</span>
            <span> - {{ question.data[$root.language][0] }}</span>
          </div>
          <div class="create-form">
            <div class="create-form__item">
              <div class="create-form__item-label">
                1. {{ $t("content.support.selectTheme") }}
              </div>
              <div
                class="create-form__item-select"
                v-if="thems"
                @click="select = !select"
              >
                <div class="create-form__item-select--selected">
                  <span>{{ selected.data[$root.language][0] }}</span>
                  <svg
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.87135e-08 3.06064L6.5 10.5L13 3.06064L10.762 0.5L6.5 5.37702L2.23804 0.5L8.87135e-08 3.06064Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div class="create-form__item-select--list" v-if="select">
                  <div
                    class="btn-tr"
                    v-for="item in thems"
                    :key="item.id"
                    v-html="item.data[$root.language][0]"
                    @click="selected = item"
                  ></div>
                </div>
              </div>
            </div>
            <div class="create-form__item">
              <div class="create-form__item-label">
                2. {{ $t("content.support.putMess") }}
              </div>
              <textarea
                class="create-form__item-textarea"
                v-model="message"
                rows="10"
                style="resize: none;"
              ></textarea>
              <div class="create-form__item-img">
              <img v-for="(img, idx) in image"  :key="idx" :src="img" alt="">
              </div>
              <!-- <label for="upload-file" class="create-form__item-loadimg btn-tr">
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0986 0.577637H0.901408C0.403831 0.577637 0 0.981468 0 1.47905V12.5213C0 13.0189 0.403831 13.4227 0.901408 13.4227H15.0986C15.5962 13.4227 16 13.0189 16 12.5213V1.47905C16 0.981468 15.5962 0.577637 15.0986 0.577637ZM14.1972 2.38045V10.5094L12.1357 8.00614C12.0595 7.91465 11.9256 7.89797 11.8287 7.96738L9.43054 9.71837L5.312 5.71206C5.26513 5.66519 5.19797 5.64581 5.13352 5.64851C5.06772 5.65482 5.00777 5.68998 4.96992 5.74406L1.80282 10.275V2.38045H14.1972ZM8.78873 5.76074C8.78873 4.95307 9.44586 4.29595 10.2535 4.29595C11.0612 4.29595 11.7183 4.95307 11.7183 5.76074C11.7183 6.5684 11.0612 7.22552 10.2535 7.22552C9.44586 7.22552 8.78873 6.5684 8.78873 5.76074Z"
                    fill="white"
                  />
                </svg>
                <span>{{ $t("content.support.loadImg") }}</span>
              </label> -->
              <input
                type="file"
                accept="image/jpeg, image/gif, image/png"
                id="upload-file"
                hidden
                @change="onFileChange"
              />
            </div>
            <!-- <div class="create-form__item">
              <div class="create-form__item-label">3. Пройдите капчу</div>
              <div class="create-form__item-hcap">
                <img src="/img/hcap.png" alt="" />
              </div>
            </div> -->
          </div>
          <div class="create-btn btn-tr" @click="createTicket">
            {{ $t("content.support.createTicket") }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loader v-else-if="$root.user && loading == true" />
</template>

<script>
import { mapState, mapActions } from "vuex";
import SupportInfo from "@/components/support-info/SupportInfo";
export default {
  components: {
    SupportInfo,
  },
  data() {
    return {
      question: null,
      select: false,
      selected: null,
      thems: null,
      message: "",
      image: [],
      loading: true
    };
  },
  watch: {
    "$route.params.id"() {
      this.fetchQuestion();
    },
  },
  computed: {
    ...mapState({ support: "support" }),
  },
  async created() {
    if (this.$root.user == null) {
      this.$router.push("/");
    }else{
      await this.fetchQuestion();
      this.loading = false;
    }
  },
  methods: {
    ...mapActions({ getSupport: "getSupport", getTickets: "getTickets" }),
    async fetchQuestion() {
      if (this.support === null) {
        await this.getSupport();
      }
      this.question = this.support.folder.filter(
        (item) => item.id == this.$route.params.id
      )[0];
      this.thems = this.support.question.filter(
        (item) => item.folderId === this.question.id
      );
      this.selected = this.thems[0];
    },
    async createTicket() {
      if (
        this.message.length >= this.$root.settings.support.messageMinLength &&
        this.message.length <= this.$root.settings.support.messageMaxLength
      ) {
        let data = new FormData();
        data.append("file", this.image);

        await this.$root
          .request("POST", "/api/support/ticket", {
            questionId: this.selected.id,
            subject: this.selected.data[this.$root.language][0],
            message: this.message,
            img: this.image,
          })
          .then(async (resp) => {
            await this.getTickets();
            this.$router.push("/tickets/" + resp);
          });
      } else {
        this.$root.showNotify(
          "error",
          this.$t("chat.length", {
            0: this.$root.settings.support.messageMinLength,
            1: this.$root.settings.support.messageMaxLength,
          })
        );
      }
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = function (e) {
        if(vm.image !== undefined){
          vm.image.push(e.target.result);
        }else{
          vm.image = []
          vm.image.push(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    },
    upload() {
      let data = new FormData();
      let that = this;

      data.append("file", this.image);
      data.append("sizes", this.sizes);
      data.append("root", "uploads/test");

      this.$root
        .request("POST", "/api/photo/upload-base64", data)
        .then(function (res) {
          let result_input = document.querySelector(
            "input[name=" + that.result + "]"
          );
          let data = res["data"];
          result_input.value = data["path"];
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.support {
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
    display: flex;
    align-items: center;
  }
  &-body {
    padding: 20px;
  }
}

.create {
  background: #1f1f1f;
  border: 1px solid #313131;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 14px 20px 25px 28px;
  &-title {
    display: flex;
    align-items: center;
    margin-left: -10px;
    margin-bottom: 16px;
    span {
      &:first-child {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
      }

      &:last-child {
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        color: #828282;
        margin-left: 5px;
      }
    }
  }
  &-form {
    margin-bottom: 20px;
    &__item {
      &-img{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 10px;
        img{
          width: 50px;
          height: 50px;
        }
      }
      &-label {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        margin-bottom: 6px;
      }
      &-select {
        margin-bottom: 16px;
        position: relative;
        &--selected {
          background: #181818;
          border-radius: 5px;
          height: 30px;
          display: flex;
          align-items: center;
          padding: 6px 11px 7px 13px;
          cursor: pointer;
          span {
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #ffffff;
          }
          svg {
            margin-left: auto;
          }
        }

        &--list {
          position: absolute;
          background: #3b3b3b;
          border-radius: 5px;
          width: 100%;

          div {
            padding: 5px 13px;
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #ffffff;
          }
        }
      }
      &-textarea {
        background: #181818;
        border-radius: 5px;
        width: 100%;
        margin-bottom: 12px;
        border: none;
        padding: 10px 10px;
        font-size: 12px;
        line-height: 14px;
        color: #fff;
        outline: none;
      }
      &-loadimg {
        width: 219px;
        height: 34px;
        background: #181818;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
          margin-left: 8px;
        }
      }
    }
  }
  &-btn {
    width: 219px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2ee66d;
    border-radius: 5px;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }
}

@media screen and (max-width: 900px) {
  .support {
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

  .create {
    padding: 20px 10px;

    &-title {
      margin: 0;
      margin-bottom: 20px;
      span {
        &:first-child {
          font-size: 12px;
        }

        &:last-child {
          font-size: 12px;
        }
      }
    }
  }
}
</style>