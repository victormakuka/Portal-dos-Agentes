
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importa o router


const menuAberto = ref(false);
const router = useRouter(); // Instancia do roteador

  const terminarSessao = () => {
    localStorage.removeItem('refreshToken'); // Remove o token do localStorage
    sessionStorage.removeItem('acessToken'); // Remove o token do sessionStorage
    router.push('/Login'); // Redireciona para a página de login
  };

</script>


<template>
<div class="relative">
   
  <router-view />
  <div class="flex h-screen relative">
    <!-- Botão hambúrguer fixo no canto esquerdo -->
    <button
      @click="menuAberto = !menuAberto"
      :class="[
        'absolute top-4 left-4 z-20 text-3xl hover:text-orange-800 focus:outline-none hover:bg-white-900',
        menuAberto ? 'text-white bg-orange-600' : 'text-orange-600'
      ]"
    >☰
    </button>

    <!-- Sidebar -->
    <div 
      :class="[ 'fixed top-0 left-0 h-full w-1/2 lg:w-1/5 md:w-1/5 bg-orange-600 text-white p-4 transition-transform duration-300 ease-in-out z-10  rounded-t-md',
      menuAberto ? 'translate-x-0' : '-translate-x-full']"
      ref="sidebar"
      @click.stop
    >
     
      <ul class="space-y-3 pt-[100px] px-[4px] block flex items-start flex-col ">
       
        <li><a href="#" class="block hover:text-orange-100 transition">Ver perfil</a></li>
        <router-link to="/Pedido" class="block hover:text-orange-100 transition">Pedido </router-link>
        <li><a href="#" class="block hover:text-orange-100 transition">Relatórios</a>
        </li>
        <li class="block hover:text-orange-100 transition" @click="terminarSessao">Terminar Sessão</li>
      </ul>
 
    </div>
    <!-- Overlay -->
    <!-- <div
      v-if="menuAberto"
      class="fixed inset-0  z-0"
      ></div> -->
    <div
      v-if="menuAberto"
    class="fixed inset-0"
      @click="menuAberto = false"
    ></div>
      <slot />
    
   </div>
</div>

  
</template>
