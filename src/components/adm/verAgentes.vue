<template>
  <div class="bg-gray-100 h-screen w-screen">
    <div class="m-0 py-4 px-12 border border-gray-300 shadow-sm w-[395px]">
      <div class="text-md font-bold">Vejâ todos seus Subagentes</div>
      <div class="text-sm text-gray-600">
        Faça a gestão dos seus Subagentes editando e alterando os dados dos seus Subagentes.
      </div>
    </div>

    <div class="absolute top-6 left-0 z-10">
      <Menu />
    </div>

    <div class="py-24 px-10 whitespace-nowrap">
      <div class="text-2xl font-bold flex flex-row items-end">
        Todos Agentes
      </div>

      <div class="py-4">
        <table>
          <thead>
            <tr>
              <th class="py-3">ID</th>
              <th>NOME</th>
              <th>EMAIL</th>
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
              <td class="px-20">{{ agente.email }}</td>
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
