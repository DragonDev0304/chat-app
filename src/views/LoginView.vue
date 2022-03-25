<template>
  <div class="login-view">
    <form @submit.prevent="handleLogin">
      <h2 class="title">Đăng nhập</h2>
      <input
        class="name-input"
        v-model="username"
        type="text"
        placeholder="Nhập tên của bạn..."
      />
      <button class="submit-btn" type="submit">Enter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  emits: ["onLogin"],
  methods: {
    handleLogin() {
      if (!this.username) {
        this.username = "admin";
      }
      this.$emit("onLogin", this.username);
    },
  },
};
</script>

<style lang="css" scoped>
.login-view {
  display: inline-block;
  padding: 25px;
  border-radius: 30px;
  box-shadow: var(--shadow);
  background-color: white;
  position: relative;
  top: -5rem;
  text-align: center;
}
.title {
  color: var(--primary-color);
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 25px;
}
.name-input {
  padding: 10px 15px;
  border: none;
  border-radius: 25px;
  border: 2px solid var(--secondary-color);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}
.submit-btn {
  display: block;
  padding: 10px 30px;
  margin: 1.6rem auto 0;
  border-radius: 25px;
  background: var(--btn-color);
  color: white;
  transition: all ease 0.6s;
  font-weight: 600;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
.submit-btn:hover {
  background-color: var(--btn-hover-color);
}
</style>
