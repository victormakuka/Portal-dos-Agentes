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
        <h2 class="text-xl font-bold text-orange-600 mb-2 whitespace-nowrap flex items-start justify-start">Ver todos relatórios</h2>
         
        <div class="flex flex-row space-x-12 ">
        <!-- A parte do mes Atual -->
         <div class="flex items-center gap-2">
            <!-- A seta esquerda -->
        <button @click="mesAnterior">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
           </svg>
        </button>
        <!-- A seta direita -->
        <span class="font-medium">{{ meses[mesAtual] }}</span>
        <button @click="mesSeguinte">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
               <!-- O select do dia -->
      <select v-model="diaSelecionado" class=" text-xs border rounded-md px-2 py-1 outline-none">
        <option value="">Selecionar Dia</option>
        <option v-for="dia in diasNoMes" :key="dia" :value="dia">{{ dia }}</option>
      </select>
</div>
     
      <!-- A tabela -->
       <div class=" p-2">
          <table class="table-auto">
             <thead>
                 <tr>
                    <div class="py-2">
                        <th class="text-xs font-bold">Dia</th>
                        <th class="text-xs px-8 font-bold">Agente</th>
                        <th class="text-xs px-18 font-bold">Valor</th>
                        <th class="text-xs font-bold">Hora</th>
                    </div>
                 </tr>
             </thead>
             <div class="max-h-[400px] overflow-y-auto text-sm whitespace-nowrap">
               <tbody>
                <tr
          v-for="item in relatFiltrados"
        :key="item.id"
        class="border-b border-gray-300"
        >
                 <td class="py-4">{{ item.dia }}</td>
                 <td class="pl-8">{{ item.agente }}</td>
                <td class="pl-9">{{ item.valor }}</td>
                <td class="pl-13">{{ item.hora }}</td>
             </tr>
               </tbody>
             </div>
          </table>
       </div>

  
     </div>
   </div>
  </main>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Menu from '@/components/adm/Menu.vue'

const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const mesAtual = ref(new Date().getMonth())
const diaSelecionado = ref('')

// Simulei relatórios
const relatorios = ref([
  { id: 1, dia: 1, agente: 'Victor Makuka', valor: '25.000', hora: '12h:30' },
  { id: 2, dia: 1, agente: 'Edvaldo', valor: '100.000', hora: '13h:01' },
  { id: 3, dia: 1, agente: 'Kennedy', valor: '200.000', hora: '14h:00' },
  { id: 4, dia: 2, agente: 'Silva André', valor: '50.000', hora: '10h:30' },
  { id: 4, dia: 2, agente: 'Marta Simão', valor: '50.000', hora: '10h:30' },
  { id: 4, dia: 2, agente: 'Abraão Eduardo', valor: '50.000', hora: '10h:22' },
  { id: 4, dia: 2, agente: 'Guilherme', valor: '50.000', hora: '10h:30' },
  { id: 4, dia: 2, agente: 'Kennedy João', valor: '50.000', hora: '10h:30' },
  { id: 4, dia: 2, agente: 'Marcia Vidal', valor: '50.000', hora: '10h:30' },
  { id: 4, dia: 2, agente: 'Abilio Cupaia', valor: '50.000', hora: '10h:30' },
  { id: 4, dia: 2, agente: 'Aricleni dos Santos', valor: '50.000', hora: '10h:30' },
])

const diasNoMes = Array.from({ length: 31 }, (_, i) => i + 1)

const relatFiltrados = computed(() => {
  return relatorios.value.filter(r =>
    diaSelecionado.value ? r.dia == diaSelecionado.value : true
  )
})

const mesAnterior = () => {
  mesAtual.value = (mesAtual.value -1+12)%12
}

const mesSeguinte = () => {
  mesAtual.value = (mesAtual.value + 1) % 12
}
</script>