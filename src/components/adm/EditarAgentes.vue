<template>
    <body class="bg-gray-100 h-screen w-screen">  
   <div class="m-0 py-4 px-12 border  border-gray-300 shadow-sm w-[395px]">
     <div class="text-md font-bold ">Vejâ todos seus Subagentes</div> <div class="text-sm text-gray-600">Faça a gestão dos seus Subagentes editando e alterando os dados dos seus Subagentes.
     </div>
    </div>
    
    
<div class="py-24 px-10 whitespace-nowrap">
     
  <div class="text-2xl font-bold flex flex-row items-end ">
   Todos Agentes
  </div>

  <div class="py-4 ">
    <table >
        <thead >
            <tr>
                <th class="py-3">Id</th>
                <th>Nome</th>
               
            </tr>
        </thead>
        <tbody class="">
            <tr class="cursor-pointer bg-orange-500 text-white hover:bg-orange-550" >
                <td class="py-2 px-2">123</td>
                <td class="px-20">Victor Makuka</td>
                
            </tr>
            <tr class="cursor-pointer bg-gray-200 hover:bg-gray-300">
                <td class="px-2 py-2">321</td>
                <td class="px-20">Edvaldo João</td>
               
            </tr>
            <tr class="cursor-pointer bg-orange-500 text-white hover:bg-orange-550">
                <td class="py-2 px-2">234</td>
                <td class="px-20">Kennedy Victor</td>
               
            </tr>
            <tr @click="verPerfil()"  class="cursor-pointer bg-gray-200 hover:bg-gray-300">
                <td class="px-2 py-2">456</td>
                <td class="px-20">Silva André</td>
                
            </tr>
              <tr class="cursor-pointer bg-orange-500 text-white hover:bg-orange-550">
                <td class="px-2 py-2">456</td>
                <td class="px-20">Silva André</td>
            </tr>
              <tr class="cursor-pointer bg-gray-200 hover:bg-gray-300">
                <td class="px-2 py-2">456</td>
                <td class="px-20">Silva André</td>
            </tr>
              <tr class="cursor-pointer bg-orange-500 text-white hover:bg-orange-600">
                <td class="px-2 py-2">456</td>
                <td class="px-20">Silva André</td>
            </tr>
            
        </tbody> 
        
    </table>
    
    <div class="flex items-end justify-end  mr-[-3px]">
    <button class="text-sm text-gray-200 font-semibold bg-orange-500 hover:bg-orange-400 py-2 px-2 mt-4 flex items-end justify-end rounded-md">
        Ver mais
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
</svg>

    </button>
   </div>
    
  </div>
</div>
   <main v-if="aparcerPerfil">
    <verPerfil  @fechar-perfil="aparcerPerfil = false"/>
   </main>
 </body>
</template>


<script >
import verPerfil from './verPerfil.vue';
export default {
  components: {
            verPerfil
  },
  methods: {
    verPerfil() {
      this.aparcerPerfil = true; // Exibe o perfil ao clicar na linha
    }
  },
  data() {
    return {
      aparcerPerfil: false, // Controla a exibição do perfil
            }
          }
   
}
 
</script>