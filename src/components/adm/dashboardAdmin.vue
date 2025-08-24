<script setup>
import Menu from './Menu.vue'
import alerta from '@/components/alerta.vue';
import { getData } from '../../../Servicos/GetData';
import { useRouter } from 'vue-router';
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  LineElement, PointElement, CategoryScale, LinearScale, Filler
} from 'chart.js'

import { getTotal, getRanking, getTotalUsers, getNewUsers, dashBoardDadosMes } from '../../../Servicos/DashBoard';
import { ref, onMounted } from 'vue';
import processo from '../processo.vue';
const total = ref(0);
const ranking = ref([]);
const totalUsers = ref(0);
const newUsers = ref(0);
const dadosMes = ref({})
const chartData = ref({
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  datasets: [{
    label: 'Vendas',
    data: [], // será preenchido após carregar os dados
    borderColor: '#f97316',
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    fill: true,
    tension: 0.4
  }]
});

const p = ref(false);

onMounted(async () => {
  try {
    p.value = true;
    const [totalResult, rankingResult, totalUsersResult, newUsersResult, dashBoardDadosMesResult] = await Promise.all([
      getTotal(),
      getRanking(),
      getTotalUsers(),
      getNewUsers(),
      dashBoardDadosMes()
    ]);

    dadosMes.value = dashBoardDadosMesResult;
    total.value = totalResult;
    ranking.value = rankingResult;
    totalUsers.value = totalUsersResult;
    newUsers.value = newUsersResult;

    chartData.value = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [{
        label: 'Vendas',
        data: mesesOrdem.map(mes => dadosMes.value[mes] || 0),
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        fill: true,
        tension: 0.4
      }]
    };

    p.value = false;
  } catch (error) {
    p.value = false;
    console.error("Erro ao carregar os dados:", error);
  }
});



const router = useRouter();

// Registrar módulos do Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

const mesesOrdem = [
  'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }
  }
}


</script>

  <template>
<div class="h-screen w-screen fixed">
  <div class="h-20 w-full space-x-2 p-4 bg-orange-500 flex items-center justify-end shadow-md">



<!-- Menu -->
 <div class="relative mb-12 mr-65">
    <Menu/>
 </div>
<processo v-if="p" />


    <!-- Notificações -->
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
<path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
       </div>

       <!-- Foto do ADM -->
       <div class="w-8 h-8 rounded-full bg-white text-orange-500 text-xs font-bold flex items-center justify-center">
                ADM
       </div>



</div>

<!-- Inicio do Ranking -->
<div class="flex items-center justify-center p-4 ">

        <div class="space-y-4  max-h-[720px] overflow-y-auto">
          <!-- Inicio do carde de ver mais relatórios -->
          <div class="bg-orange-500  h-50 rounded-md px-4 py-4 ">
           <div>
            <p class="text-white font-bold text-lg ">Bem Vindo, Silva K André!</p>
            <p class="text-sm text-gray-100 py-2">Acompanhe o desempenho da sua equipe e tome decisões estratégcas com o base nos dados. Seu Dashboard foi atualizado com as últmas métricas.</p>
            <input
            type="button"
            value="Ver Relatório Completo"
            class="bg-white text-orange-500 font-semibold px-4 py-2 w-full rounded-md flex itms-center justify-center"
            >
           </div>
          </div>
          <!-- Fim! -->

          <!-- <div class="h-64">
    <Bar :data="chartData" :options="chartOptions" />
  </div> -->

   <!-- Inicio dos cards estrategicoss! -->

   <!-- Vendas Totais -->
         <div class="bg-white rounded-md h-25 shadow-md">
          <div class="py-2 px-4">
            <p class="text-gray-700 text-sm">Vendas Totais</p>
            <p class="py-1 text-2xl font-semibold">{{ total.total }}</p>
            <div class="flex row flex-row space-x-1">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-green-500 mt-0.9">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
             </svg>
            <div class="text-sm text-green-500 ">{{ total.variacao }}%</div>
              <div class="text-sm text-black whitespace-nowrap">vs mês passado</div>
             </div>
          </div>

         </div>

         <!-- Novos Cliente -->
         <div class="bg-white rounded-md h-25 shadow-md">
          <div class="py-2 px-4">
            <p class="text-gray-700 text-sm">Novos Agentes</p>
            <p class="py-1 text-2xl font-semibold">{{ newUsers.mesAtual }}</p>
            <div class="flex row flex-row space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-green-500">
<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
           </svg>
          <div class="text-sm text-green-500 ">{{ newUsers.percentual }}%</div>
            <div class="text-sm text-black whitespace-nowrap">vs mês passado</div>
           </div>
          </div>

         </div>

         <!-- Taxa de Conversão -->
         <div class="bg-white rounded-md h-25 shadow-md">
          <div class="py-2 px-4">
            <p class="text-gray-700 text-sm">Taxa de Conversão</p>
            <p class="py-1 text-2xl font-semibold">28,6%</p>
            <div class="flex row flex-row space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-green-500">
<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
           </svg>
          <div class="text-sm text-green-500 ">3,4% </div>
            <div class="text-sm text-black whitespace-nowrap">vs mês passado</div>
           </div>
          </div>
         </div>

         <!--Meta Mensal -->
         <div class="bg-white rounded-md h-20 shadow-md">
          <div class="py-2 px-4">
            <p class="text-gray-700 text-sm">Meta Mensal</p>
            <p class="py-1 text-2xl font-semibold">78,6%</p>
          </div>

         </div>

           <!-- O graico das vendas -->
           <div class="bg-white p-4 rounded-2xl shadow-md">
              <h2 class="text-lg font-bold mb-4">Desempenho de Vendas</h2>
               <div class="h-40">
              <Line :data="chartData" :options="chartOptions" />
               </div>
              </div>


        <!-- Top dos Agentes -->
         <div class="bg-white p-4   rounded-md h-80 shadow-md  ">
            <div class="text-md py-4  font-bold  text-gray-500 max-h-[280px] space-y-4 overflow-y-auto">
            Ranking dos Agentes
            
          <div class="py-4 space-y-4">
            <!-- 1 -->
           <div class="flex row space-x-14" v-for="(item, index) in ranking" :key="item.userId">
            <div class="w-7 h-7 rounded-full  text-white bg-green-500 text-xs font-bold flex items-center justify-center">
               {{ index + 1 }}
          </div>
            <div class="text-md font-semibold">{{ item.userName }}</div>
            <div class="text-md font-semibold">{{ item.total }}</div>
        </div>


           </div>

    </div>
</div>






        </div>
      </div>
  </div>


  <!-- <main class="py-9">
     <Menu/>
  </main> -->

  <button type="button" @click="buscarDados"></button>

</template>