<template>
  <div class=" h-screen w-screen">
    <!-- Div do header-laranja -->
    <div class="w-full h-30 fixed bg-orange-500 ">
     
      <!-- Botão de voltar -->
      <div class="text-xl font-bold px-3 py-2 flex flex-row text-white">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mt-1.5"> 
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
                Agentes
       </div>
 <!-- Descrição do header -->
      <div class="px-12">
         <div class="text-sm  whitespace-nowrap text-white">
          Faça a gestão dos seus Subagentes editando 
        </div>
        <div class="text-sm text-gray-600 whitespace-nowrap text-white">e alterando os dados dos seus Subagentes.
        </div>
    </div> 
  </div>

    <div class="py-8 top-6 left-0 z-10">
      <Menu />
    </div>
  <div class="flex items-center justify-center p-2 h-2/3 w-full">
    <div class=" whitespace-nowrap">
      <div class="text-2xl text-orange-500 font-bold flex flex-row items-end">
        Todos Agentes
      </div>

      <div class="py-4">
        <table>
          <thead>
            <tr>
              <th class="py-3">ID</th>
              <th>NOME</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(agente, index) in agentes"
              :key="agente.id"
              @click="abrirPerfil(agente)"
              :class="[
                'cursor-pointer hover:opacity-80',
                index % 2 === 0 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'
              ]"
            >
              <td class="px-2 py-2">{{ agente.id }}</td>
              <td class="px-20">{{ agente.nome }}</td>
            </tr>
          </tbody>
        </table>

        <div class="flex items-end justify-end mr-[-3px]">
          <button
            class="text-sm text-gray-200 font-semibold bg-orange-500 hover:bg-orange-400 py-2 px-2 mt-4 flex items-end justify-end rounded-md"
          >
            Ver mais
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
              <path
                fill-rule="evenodd"
                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    </div>

    <main v-if="aparecerPerfil">
      <verPerfil @fechar-perfil="aparecerPerfil = false" :agente="agenteSelecionado" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import verPerfil from './verPerfil.vue'
import Menu from './Menu.vue'
import { getAllUsers } from '../../../Servicos/GetAllUsers'
import { onMounted } from 'vue'
const aparecerPerfil = ref(false)
const agenteSelecionado = ref(null)
const agentes = ref([])

onMounted(async() => {
  await getAllUsers()
  agentes.value = await getAllUsers()
})

function abrirPerfil(agente) {
  agenteSelecionado.value = agente
  aparecerPerfil.value = true
}
</script>
