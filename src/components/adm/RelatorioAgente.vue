<template>
    <div class="h-screen w-screen">
        <div class="w-full h-30 fixed bg-orange-500 ">
            <!-- Botão de voltar -->
        <div class="text-xl font-bold px-8 py-2 flex flex-row text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"   stroke-width="1.5" stroke="currentColor"
    class="size-5 mt-1.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                 Relatórios do Agente
           </div>
            <!-- Descrição do header -->
                <div class="px-17">
                    <div class="text-sm  whitespace-nowrap text-white">
                         Veja o relatório mensal de cada agentes de 
                         <p>forma rápida e segura</p>
                    </div>
                </div>
       </div>

       <div class="py-8 top-6 left-0 z-10">
          <Menu />
       </div>

       <main class="pt-24 px-4 pb-16">
         <div class="flex items-center justify-center w-full">
            <div class="space-y-4 w-full">
                <h2 class="text-xl font-bold text-orange-600 mb-2 whitespace-nowrap flex items-start justify-start">Relatório</h2>

              <div class="flex flex-row space-x-8">        
                <!-- Select do Agente -->
                 <select v-model="agenteSelecionado" class="text-xs px-2 py-1 border rounded-md outline-none">
                    <option value="">Selecionar agente</option>
                    <option v-for="ag in agentes" :key="ag.id" :value="ag.nome">{{ ag.nome }}</option>
                 </select>

                 <!-- Select do Ano -->
                 <select v-model="anoSelecionado"  class="text-xs px-2 py-1 border rounded-md outline-none">
                    <option value="">Ano</option>
                    <option v-for="(a, i) in ano" :key="i" :value="i">{{ a }}</option>

                 </select>

                 <!-- Select do Mes -->
                 <select v-model="mesSelecionado" class="text-xs px-2 py-1 border rounded-md outline-none">
                    <option value="">Mês</option>
                    <option v-for="(m, i) in meses" :key="i" :value="i">{{ m }}</option>
                 </select>      
              </div>
                 
              <div class="flex flex-col text-sm ">
                <div class="font-bold">{{ agenteSelecionado }}</div>
                <div class="flex flex-row space-x-2 text-xs">
                <div>Julho</div>
                <div>2025</div>
            </div> 
              </div>
             

              <!-- Tabela -->

              <div class=" p-2">
                <table class="table-auto">
                    
                    <thead>            
                       <tr>
                         <div class="py-3 ">
                           <th class="text-xs font-bold">Dia</th>
                           <th class="text-xs px-30 font-bold">Valor</th>
                           <th class="text-xs  font-bold">Hora</th>
                        </div>
                 </tr>
             </thead>
            
             <div class="max-h-[400px] overflow-y-auto text-sm whitespace-nowrap">
                <tbody>
                    <tr
                         v-for="pedido in relatoriosFiltrados" :key="pedido.id"
                        class="hover:bg-gray-50 border-b border-gray-300" >
                             <td class="py-4">{{ pedido.dia }}</td>
                             <td class="pl-32">{{ pedido.valor }}</td>
                             <td class="pl-26 ">{{ pedido.hora }}</td>
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
import Menu from '@/components/adm/Menu.vue';

import { ref, computed } from 'vue'

const agentes = [
  { id: 1, nome: 'Victor Makuka' },
  { id: 2, nome: 'Edvaldo Dantas' },
  { id: 3, nome: 'Silva André' },
  { id: 4, nome: 'Abílio Cupaia' },
 { id: 5, nome: 'Aricleni do Santos'},
 { id: 6, nome: 'Kennedy Victor'},
  
]

const ano = ['2025', '2024', '2023']
let UserName = ref('')

const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const agenteSelecionado = ref('')
const mesSelecionado = ref(new Date().getMonth())
const anoSelecionado = ref(new Date().getFullYear())

//  Zé simulei os dados para relatorios
const relatorios = ref([
  {
    id: 1,
    agente: 'Victor Makuka',
    dia: 1,
    valor: '25.000',
    hora: '13h'
  },
  {
    id: 2,
    agente: 'Victor Makuka',
    dia: 1,
    valor: '50.000',
    hora: '14h'
  },
  {
    id: 3,
    agente: 'Edvaldo Dantas' ,
    dia: 1,
    valor: '30.000',
    hora: '15h'
    },
    {
    id: 4,
    agente: 'Edvaldo Dantas' ,
    dia: 1,
    valor: '30.000',
    hora: '15h'
    },
    {
    id: 5,
    agente: 'Edvaldo Dantas' ,
    dia: 2,
    valor: '50.000',
    hora: '9h'
    },
    {
    id: 6,
    agente: 'Edvaldo Dantas' ,
    dia: 4,
    valor: '100.000',
    hora: '12h'
    },
    {
    id: 7,
    agente: 'Victor Makuka',
    dia: 2,
    valor: '25.000',
    hora: '10h'
    },
    {
    id: 8,
    agente: 'Victor Makuka',
    dia: 3,
    valor: '55.000',
    hora: '18h'
    },
    {
    id: 9,
    agente: 'Victor Makuka',
    dia: 4,
    valor: '',
    hora: ''
    },
    {
    id: 10,
    agente: 'Victor Makuka',
    dia: 5,
    valor: '150.000',
    hora: '7h'
    },
    {
    id: 11,
    agente: 'Victor Makuka',
    dia: 6,
    valor: '50.000',
    hora: '11h'
    },
    {
    id: 12,
    agente: 'Victor Makuka',
    dia: 7,
    valor: '',
    hora: ''
    },
    {
    id: 13,
    agente: 'Victor Makuka',
    dia: 8,
    valor: '',
    hora: ''
    },
    {
    id: 14,
    agente: 'Victor Makuka',
    dia: 9,
    valor: '150.000',
    hora: '14h'
    },
    {
    id: 15,
    agente: 'Victor Makuka',
    dia: 10,
    valor: '25.000',
    hora: '14h'
  },

  
])
UserName =agenteSelecionado.value

const relatoriosFiltrados = computed(() => {
  return relatorios.value.filter(r =>
      r.agente === agenteSelecionado.value
    
)
})

</script>