<script setup>
import MenuAgente from './MenuAgente.vue';

</script>

<template>
<div class="h-screen w-screen fixed">
    <div class="h-20 w-full space-x-2 p-2  bg-orange-500 flex items-center justify-center ">

        <!-- Menu -->
         <div class="relative  mb-12 mr-65 ">
            <MenuAgente />
         </div>

            <!-- Notificações -->
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
               </div>

             <!-- Foto do agente! -->
              <div class="w-8 h-8 rounded-full bg-white text-orange-500 text-xs font-bold flex items-center justify-center">
                VM
              </div>
             
    </div>

       <div class="flex items-center justify-center p-4">
        <div class="space-y-4 w-full">
            <p class="text-xl font-bold text-orange-600 ">Ranking</p>

        </div>

       </div>
    

</div>


 
</template>