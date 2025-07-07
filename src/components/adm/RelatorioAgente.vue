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
              <select
                v-model="agenteSelecionado"
                class="text-xs px-2 py-1 border rounded-md outline-none"
                @change="GetUserRelatorio(mesSelecionado, anoSelecionado, agenteSelecionado)"
                >
                <option value="">Selecionar agente</option>
                <option v-for="ag in agentes" :key="ag.id" :value="ag.id">{{ ag.nome }}</option>
              </select>

                 <!-- Select do Ano -->
                 <select v-model="anoSelecionado"  class="text-xs px-2 py-1 border rounded-md outline-none" @change="GetUserRelatorio(mesSelecionado, anoSelecionado, agenteSelecionado)">
                    <option value="">Ano</option>
                    <option v-for="(a, i) in ano" :key="i" :value="a">{{ a }}</option>

                 </select>

                 <!-- Select do Mes -->
                 <select v-model="mesSelecionado" class="text-xs px-2 py-1 border rounded-md outline-none"
                 @change="GetUserRelatorio(mesSelecionado, anoSelecionado, agenteSelecionado)">
                    <option value="">Mês</option>
                    <option v-for="(m, i) in meses" :key="i" :value="i">{{ m }}</option>
                 </select>      
              </div>
                 
              <div class="flex flex-col text-sm ">
                <div class="font-bold">{{ agenteSelecionado }}</div>
                <div class="flex flex-row space-x-2 text-xs">
                <div>{{ meses[mesSelecionado] }}</div>
                <div>{{ anoSelecionado }}</div>
                
            </div> 
            <div class="flex flex-row space-x-2">Mensal: {{ valorTotal }}KZ</div>
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
                         v-for="relatorio in relatorios" :key="relatorio.dia"
                        class="hover:bg-gray-50 border-b border-gray-300" >
                             <td class="py-4">{{ relatorio.dia }}</td>
                             <td class="pl-32">{{ relatorio.valor }}</td>
                             <td class="pl-26 ">{{ relatorio.hora }}</td>
                     </tr>
               </tbody>
             </div>
          </table>
       </div>
      </div>
    </div>
  </main>
</div>
<processo v-if="processing"/>
</template>

<script setup>
import Menu from '@/components/adm/Menu.vue';
import { getAllUsers } from '../../../Servicos/GetAllUsers';
import { ref, computed, reactive } from 'vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getRelatorio } from '../../../Servicos/GetRelatorio';
import processo from '../processo.vue';

const router = useRouter()
let agentes = ref([])
let processing = ref()
let valorTotal = ref(0);
let hasData = ref[false]
onMounted(async()=>{
  processing.value = true
  const response = await getAllUsers()
  agentes.value = response
  if(!response)
      router.push("/")
  processing.value = false  
})
const ano = ['2025', '2024', '2023']

const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const agenteSelecionado = ref('')
const mesSelecionado = ref(new Date().getMonth())
const anoSelecionado = ref(new Date().getFullYear())

let UserName = agenteSelecionado

//  Zé simulei os dados para relatorios
const relatorios = ref([])
UserName = agenteSelecionado.value

const GetUserRelatorio = async (mesSelecionado, anoSelecionado, agenteSelecionado) => {
  let todosDias = []
  const response = await getRelatorio(agenteSelecionado, mesSelecionado + 1, anoSelecionado)
  if(response == null){
    hasData = true
    relatorios.value = null
    return;
  }

  // Cria um mapa com os dias que vieram da API
  const diasComDados = new Map()
  response.forEach(item => {
    diasComDados.set(item.dia, item)
  })

  // Descobre quantos dias tem o mês selecionado
  const diasNoMes = new Date(anoSelecionado, mesSelecionado + 1, 0).getDate()

  // Cria o array final, preenchendo os dias ausentes com valor 0

  for (let dia = 1; dia <= diasNoMes; dia++) {
    if (diasComDados.has(dia)) {
      todosDias.push(diasComDados.get(dia))
    } else {
      todosDias.push({
        ano: anoSelecionado,
        mes: meses[mesSelecionado], // função para retornar 'Julho', etc
        dia,
        hora: '00:00:00',
        valor: 0
      })
    }
  }

  // Atualiza os relatórios
  relatorios.value = todosDias

  // Soma o total
  valorTotal = relatorios.value.reduce((total, item) => total + item.valor, 0)

  console.log(valorTotal)
  console.log(todosDias)
}


</script>