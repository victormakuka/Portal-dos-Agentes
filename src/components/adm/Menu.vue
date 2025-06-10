<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importa o router


const menuAberto = ref(false);
const router = useRouter(); // Instancia do roteador

function agentes() {
  router.push('/Agentes'); // Navegação correta
   menuAberto.value = false;
 
}
const Submenu = ref(false)
function AbilitarSubmenu(){
   Submenu.value = true
   
}

</script>

<template>
  <div class="relative">
    <router-view />

    <div class="flex h-screen relative">

      <!-- Botão hambúrguer -->
      
      <button
       
        @click="menuAberto = !menuAberto"
        :class="[
          'absolute top-0 left-1.5 z-50 text-[23px] cursor-pointer focus:outline-none p-2 rounded',
          menuAberto ? 'text-white bg-orange-600' : 'text-orange-600 '
        ]"
      >
        ☰
       
      
      </button>
        
     
      <!-- Sidebar -->
      <div
        :class="[
          'fixed top-0 left-0 h-full w-1/2 bg-orange-600 text-white p-4 transition-transform duration-300 ease-in-out z-40 rounded-r-md shadow-lg',
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        ]"
        ref="sidebar"
        @click.stop
      > 
      
      <div class="text-[11px]  text-blue-200 font-bold px-7 py-12.5"> 
        Portal dos agentes
      </div>
      <div class="">
      
      <div class="">
        <hr class="mt-[-32px] text-gray-300">
      </div>

      <div  class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-400 cursor-pointer hover:bg-orange-500 text-white">
   <router-link to="/Dashboard" class="hover:text-orange-100">Dashboard</router-link>
      </div>

      <div @click="AbilitarSubmenu()" class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-400 cursor-pointer hover:bg-orange-500 text-white">
    <router-link to="" class="hover:text-orange-100">Agentes</router-link>
      </div>
          <div v-if="Submenu"   class="text-left text-sm font-thin mt-2 w-4/5 mx-auto text-gray-200" id="submenu">
    <h1 class="cursor-pointer p-2 hover:bg-orange-500 rounded-md mt-1">      
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill " viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg> Adicionar</h1>
    <h1 class="cursor-pointer p-2 hover:bg-orange-500 rounded-md mt-1">Editar</h1>
    <h1 class="cursor-pointer p-2 hover:bg-orange-500 rounded-md mt-1">Ver agentes</h1>

  </div>
       <div  class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-400 cursor-pointer hover:bg-orange-500 text-white">
   <router-link to="" class="hover:text-orange-100">Pedidos</router-link>
      </div>
      <div  class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-400 cursor-pointer hover:bg-orange-500 text-white">
   <router-link to="" class="hover:text-orange-100">Relatórios</router-link>
      </div>

</div>
  
 
  <hr class="mt-[350px]  lg:mt-[950px]  text-gray-300">

  <div  class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-400 cursor-pointer hover:bg-orange-500 text-white">
   <router-link to="/Dashboard" class="hover:text-orange-100">Definições</router-link>
      </div>

      <div  class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-400 cursor-pointer hover:bg-orange-500 text-white">
   <router-link to="/Dashboard" class="hover:text-orange-100">Terminar sessão</router-link>
      </div>
      </div>

      <!-- Overlay com blur -->
      <div
        v-if="menuAberto"
        class="fixed inset-0 bg-black/50  z-20"
        @click="menuAberto = false"
      ></div>

      <slot />
    </div>
  </div>
</template>
