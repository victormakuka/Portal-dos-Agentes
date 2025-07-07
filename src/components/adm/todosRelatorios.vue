<template>
  <div class="h-screen w-screen">

 

    <div class="w-full h-30 fixed bg-orange-500 ">
            <!-- Botão de voltar -->
        <div class="text-xl font-bold px-8 py-2 flex flex-row text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"   stroke-width="1.5" stroke="currentColor"
    class="size-5 mt-1.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Todos Relatórios
           </div>
            <!-- Descrição do header -->
                <div class="px-17">
                    <div class="text-sm  whitespace-nowrap text-white">
                         Veja o relatório mensal do agentes 
                    </div>
                </div>
    </div>

    <div class="py-8 top-6 left-0 z-10">
      <Menu />
    </div>

     <main class="pt-24 px-4 pb-16">
      <div class="flex items-center justify-center w-full">
        <div class="space-y-4 w-full">
          <h2 class="text-xl font-bold text-orange-600 mb-2 whitespace-nowrap flex items-start justify-start">
            Ver todos relatórios
          </h2>

          <!-- CONTROLES DE FILTRO -->
          <div class="flex flex-row space-x-12">
            <!-- Seleção de mês -->
            <div class="flex items-center gap-2">
              <!-- Seta esquerda -->
              <button @click="mesAnterior">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <span class="font-medium">{{ meses[mesAtual] }}</span>
              <!-- Seta direita -->
              <button @click="mesSeguinte">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            <!-- Filtro por dia -->
            <select v-model="diaSelecionado" class="text-xs border rounded-md px-2 py-1 outline-none">
              <option value="">Selecionar Dia</option>
              <option v-for="dia in diasNoMes" :key="dia" :value="dia">{{ dia }}</option>
            </select>
          </div>

          <!-- TABELA DE RELATÓRIOS -->
          <div class="p-2 max-h-[400px] overflow-y-auto">
            <table class="table-auto text-sm whitespace-nowrap w-full">
              <thead>
                <tr>
                  <th class="text-xs font-bold py-2">Dia</th>
                  <th class="text-xs font-bold px-8">Agente</th>
                  <th class="text-xs font-bold px-8">Valor</th>
                  <th class="text-xs font-bold px-8">Hora</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in relatoriosFiltrados" :key="item.id" class="border-b border-gray-300">
                  <td class="py-4">{{ item.dia }}</td>
                  <td class="pl-8">{{ item.agente }}</td>
                  <td class="pl-8">{{ item.valor }}</td>
                  <td class="pl-8">{{ item.hora }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Menu from '@/components/adm/Menu.vue'
import { GetRelatorioMes } from '../../../Servicos/getRelatoriosMes'

// Estados
const relatorios = ref([])
const mesAtual = ref(new Date().getMonth())
const ano = new Date().getFullYear()
const diaSelecionado = ref('')

// Lista de meses
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

// Dias do mês (1 a 31)
const diasNoMes = Array.from({ length: 31 }, (_, i) => i + 1)

// Carrega relatórios do mês
const getRelatoriosMes = async () => {
  const response = await GetRelatorioMes(ano, mesAtual.value + 1)
  relatorios.value = response
}

// Computed para aplicar o filtro por dia
const relatoriosFiltrados = computed(() => {
  if (!diaSelecionado.value) {
    return relatorios.value
  }
  return relatorios.value.filter(r => r.dia == diaSelecionado.value)
})

// Botão para voltar mês
const mesAnterior = async () => {
  mesAtual.value = (mesAtual.value - 1 + 12) % 12
  await getRelatoriosMes()
}

// Botão para avançar mês
const mesSeguinte = async () => {
  mesAtual.value = (mesAtual.value + 1) % 12
  await getRelatoriosMes()
}

// Ao carregar componente
onMounted(async () => {
  await getRelatoriosMes()
})
</script>