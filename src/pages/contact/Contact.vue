<template>
  <div class="policy">
    <div class="profile-content">
      <div class="profile-header">{{$t('content.navbar.contact')}}</div>
      <div class="profile-body">
        <h2 style="margin-bottom: 20px; text-align: center">
          Beneficiary:<br />
          INTERNATIONAL BUSINESS SYSTEMS S.R.L.<br />
          <br />
          Reg. number:<br />
          3-102-693823<br />
          <br />
          Beneficiary’s address:<br />
          SAN JOSE-SANTA ANA,<br />
          THREE HUNDRED AND FIFTY METERS OF THE RESTAURANT CEVICHE DEL REY,
          COSTA-RICA
        </h2>
      </div>
    </div>
  </div>
</template>


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
    height: calc(100vh - 70px);
    padding: 20px;

    h2 {
      font-size: 16px;
      line-height: 18px;
      font-weight: 600;
    }
  }
}

@media screen and (max-width: 1860px) {
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
</style>