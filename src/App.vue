<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref } from 'vue'
import { useCookie } from './index'

const name = ref('')
const content = ref('')

const {
  getCookie,
  setCookie,
  removeCookie,
  removeAllCookies,
  isCookieAvailable,
  cookieEntries,
} = useCookie()

function set() {
  setCookie(name.value, content.value)
}
function check() {
  // eslint-disable-next-line no-alert
  alert(`Cookie existance: ${isCookieAvailable(name.value)}`)
}
function get() {
  // eslint-disable-next-line no-alert
  alert(`Cookie content: ${getCookie(name.value)}`)
}
function remove() {
  // eslint-disable-next-line no-alert
  alert(`Cookie removed: ${removeCookie(name.value)}`)
}
function getAll() {
  console.log(cookieEntries())
  // eslint-disable-next-line no-alert
  alert('Check console :)')
}
</script>

<template>
  <main>
    <h1>
      Cookie Test Page
    </h1>
    <div class="fields">
      <input v-model.trim="name" type="text" placeholder="Name">
      <input v-model.trim="content" type="text" placeholder="Content">
    </div>
    <div class="controls">
      <button type="button" @click="set">
        Add
      </button>
      <button type="button" @click="check">
        Check
      </button>
      <button type="button" @click="get">
        Get content
      </button>
      <button type="button" @click="remove">
        Delete
      </button>
      <button type="button" @click="getAll">
        GetAll
      </button>
      <button type="button" @click="removeAllCookies">
        RemoveAll
      </button>
    </div>
  </main>
</template>

<style>
.fields {
  width: 500px;
  margin-bottom: 20px;
}
.fields input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
.fields input:last-child {
  margin-bottom: 0
}
.controls {
  display: flex;
  align-items: center;
}
.controls button {
  margin-right: 10px;
}
.controls button:last-child {
  margin-right: 0;
}
</style>
