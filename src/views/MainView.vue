<template>
  <div class="main-view">
    <header class="header">
      <h5 class="title">Hello, {{ username }}</h5>
      <button @click="handleLogout" class="logout-btn">Đăng xuất</button>
    </header>

    <div id="chat-box" class="chat-box">
      <ul class="message-list">
        <li
          v-for="(message, index) in messages"
          :key="index"
          class="message-item"
          :class="{ owner: message.username === username }"
        >
          <p class="message-item-username">{{ message.username }}</p>
          <p class="message-item-content">{{ message.content }}</p>
        </li>
      </ul>
    </div>

    <footer class="footer">
      <form class="chat-form" @submit.prevent="handleSend">
        <input
          class="message-input"
          type="text"
          placeholder="Nhập tin nhắn..."
          v-model="contentSend"
        />
        <button class="send-btn" type="submit">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, onUpdated } from "vue";
import { fb } from "../firebase/firebase.js";

export default {
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  emits: ["onLogout"],
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup(props, { emit }) {
    const db = fb.getDatabase();
    const contentSend = ref("");
    const messages = ref([]);
    const messagesRef = fb.ref(db, "messages");

    // listening database change
    fb.onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.key === "messages") {
        const result = [];
        Object.keys(data).forEach((k) => {
          result.push(data[k]);
        });
        messages.value = result;
      }
    });

    function handleSend() {
      if (contentSend.value) {
        const newMessageRef = fb.push(messagesRef);
        fb.set(newMessageRef, {
          username: props.username,
          content: contentSend.value,
        });
        contentSend.value = "";
      }
    }

    function handleLogout() {
      emit("onLogout");
    }

    function scrollChatBox() {
      const el = document.getElementById("chat-box");
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }

    onMounted(() => {
      scrollChatBox();
    });

    onUpdated(() => {
      scrollChatBox();
    });

    return { contentSend, messages, handleSend, handleLogout, scrollChatBox };
  },
};
</script>

<style lang="css" scoped>
.main-view {
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: var(--shadow);
  background-color: var(--primary-color);
  position: relative;
  text-align: center;
  max-width: 90vw;
  width: 450px;
  max-height: 450px;
  height: 100%;
  color: var(--primary-color);
  overflow: hidden;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: white;
  padding: 25px;
}
.title {
  font-size: 1.2rem;
}
.logout-btn {
  font-size: 0.8rem;
  display: block;
  padding: 8px 15px;
  border-radius: 25px;
  background: white;
  color: var(--primary-color);
  transition: all ease 0.6s;
  font-weight: 600;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
.logout-btn:hover {
  background-color: var(--btn-hover-color);
}
.chat-box {
  flex-grow: 1;
  border-radius: 30px 30px 0 0;
  background-color: white;
  padding: 20px 25px;
  overflow-y: auto;
}
.chat-box::-webkit-scrollbar {
  width: 5px;
}
.chat-box::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.chat-box::-webkit-scrollbar-thumb {
  background: var(--secondary-color);
}
.chat-box::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}
.footer {
  padding: 15px 25px 20px;
  background-color: white;
}
.chat-form {
  display: flex;
  align-items: center;
}
.message-input {
  padding: 10px 15px;
  border: none;
  border-radius: 25px;
  border: 2px solid var(--secondary-color);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  flex-grow: 1;
  margin-right: 1rem;
}
.send-btn {
  background-color: transparent;
  font-size: 1.4rem;
  color: orangered;
}
.message-item {
  word-break: break-all;
}
.message-item + .message-item {
  margin-top: 1.6rem;
}
.message-item {
  text-align: left;
}
.message-item.owner {
  text-align: right;
}
.message-item-username {
  margin-bottom: 0.4rem;
  opacity: 0.6;
}
.message-item-content {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  background-color: #88adc957;
  display: inline-block;
  font-weight: bold;
  line-height: 1.4;
}
</style>
