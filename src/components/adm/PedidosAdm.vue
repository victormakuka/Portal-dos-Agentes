<template>
     <!-- Div do header-laranja -->
    <div class="h-30 w-full bg-orange-500  fixed">
        <!-- Botão de voltar -->
       <div class="text-xl font-bold px-3 py-2 flex flex-row text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mt-1.5"> 
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Pedidos
       </div>

       <!-- Descrição do header -->
        <div class="px-12">
        <div class="text-sm text-white whitespace-nowrap">
           Responda apenas com um click todas as 
           <div class="text-sm text-white whitespace-nowrap">
            solicitações dos seus subagentes
        </div>
        </div>
       </div>
    </div>
    <main class="fixed py-8">
        <Menu/>
    </main>
</template>

<script setup>
import Menu from './Menu.vue';
</script>