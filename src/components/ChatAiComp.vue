<template>
  <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
    <div class="flex flex-col h-full overflow-x-auto mb-4">
      <div class="flex flex-col h-full">
        <div class="grid grid-cols-12 gap-y-2" v-for="item in chatMessages" :key="item.message">

          <div class="col-start-1 col-end-8 p-3 rounded-lg" v-if="item.user === 'bot'">
            <div class="flex flex-row items-center">
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                Ai
              </div>
              <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                <div>{{ item.message }}</div>
              </div>
            </div>
          </div>

          <div class="col-start-6 col-end-13 p-3 rounded-lg" v-else>
            <div class="flex items-center justify-start flex-row-reverse">
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                Me
              </div>
              <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                <div>{{ item.message }}</div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

    <div v-if="isLoading" class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div class="bg-blue-600 h-2.5 rounded-full" style="width: 100%"></div>
    </div>


    <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div></div>
      <div class="flex-grow">
        <div class="relative w-full">
          <input v-model="currentHumanMessage.message" type="text"
            class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
        </div>
      </div>
      <div class="ml-4">
        <button
          class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
          :disable="isLoading" @click="sendMessage">
          <span>Enviar</span>
          <span class="ml-2">
            <svg class="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import type { chatMessages } from "../models/ChatModels";
import useGoogleAI from "../composables/useGoogleAi";

const { sendToAI, isLoading } = useGoogleAI();

const chatMessages = ref<chatMessages[]>([{
  message: 'Hola, soy un bot. ¿En que te puedo ayudar?',
  user: 'bot'
}]);

const sendMessage = async () => {
  chatMessages.value.push(currentHumanMessage.value);
  const aiResponse = await sendToAI(currentHumanMessage.value.message);
  if (!aiResponse.isSuccess) {
    alert("aiResponse.response")
  }
  chatMessages.value.push({ message: aiResponse.response, user: 'bot' });
  currentHumanMessage.value = { message: '', user: 'human' };
}

const currentHumanMessage = ref<chatMessages>({ message: '', user: 'human' });

</script>