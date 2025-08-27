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
<<<<<<< HEAD
              <div class="flex items-center justify-between">
            <p class="py-1 text-2xl font-semibold">{{ total.total }}</p>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-orange-500">
  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
</svg>
            </div>
=======
            <p class="py-1 text-2xl font-semibold">{{ total.total }}</p>
>>>>>>> 43afa04ef53c78ca0cf16b6281b25689a2a97cf9
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
<<<<<<< HEAD
            <div class="flex items-center justify-between">
            <p class="py-1 text-2xl font-semibold">{{ newUsers.mesAtual }}</p>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-orange-500">
  <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
</svg>
</div>
=======
            <p class="py-1 text-2xl font-semibold">{{ newUsers.mesAtual }}</p>
>>>>>>> 43afa04ef53c78ca0cf16b6281b25689a2a97cf9
            <div class="flex row flex-row space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-green-500">
<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
           </svg>
<<<<<<< HEAD
           
          <div class="text-sm text-green-500 ">{{ newUsers.percentual }}%</div>
 <div class="text-sm text-black whitespace-nowrap">vs mês passado</div>
=======
          <div class="text-sm text-green-500 ">{{ newUsers.percentual }}%</div>
            <div class="text-sm text-black whitespace-nowrap">vs mês passado</div>
>>>>>>> 43afa04ef53c78ca0cf16b6281b25689a2a97cf9
           </div>
           <div class="flex items-center justify-end">
          
</div>
          </div>

         </div>

         <!-- Taxa de Conversão -->
         <div class="bg-white rounded-md h-25 shadow-md">
          <div class="py-2 px-4">
            <p class="text-gray-700 text-sm">Taxa de Conversão</p>
             <div class="flex items-center justify-between">
            <p class="py-1 text-2xl font-semibold">28,6%</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-orange-500">
  <path fill-rule="evenodd" d="M11.99 2.243a4.49 4.49 0 0 0-3.398 1.55 4.49 4.49 0 0 0-3.497 1.306 4.491 4.491 0 0 0-1.307 3.498 4.491 4.491 0 0 0-1.548 3.397c0 1.357.6 2.573 1.548 3.397a4.491 4.491 0 0 0 1.307 3.498 4.49 4.49 0 0 0 3.498 1.307 4.49 4.49 0 0 0 3.397 1.549 4.49 4.49 0 0 0 3.397-1.549 4.49 4.49 0 0 0 3.497-1.307 4.491 4.491 0 0 0 1.306-3.497 4.491 4.491 0 0 0 1.55-3.398c0-1.357-.601-2.573-1.549-3.397a4.491 4.491 0 0 0-1.307-3.498 4.49 4.49 0 0 0-3.498-1.307 4.49 4.49 0 0 0-3.396-1.549Zm3.53 7.28a.75.75 0 0 0-1.06-1.06l-6 6a.75.75 0 1 0 1.06 1.06l6-6Zm-5.78-.905a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm4.5 4.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clip-rule="evenodd" />
</svg>
            </div>
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
              <div class="flex items-center justify-between">
            <p class="py-1 text-2xl font-semibold">78,6%</p>
 

            </div>
          </div>

         </div>

           <!-- O grafico das vendas -->
           <div class="bg-white p-4 rounded-2xl shadow-md">
              <h2 class="text-lg font-bold mb-4">Desempenho de Vendas</h2>
               <div class="h-40">
              <Line :data="chartData" :options="chartOptions" />
               </div>
              </div>


        <!-- Top dos Agentes -->
         <div class="bg-white p-4   rounded-md h-80 shadow-md  ">
          
            <div class=" mb-4">
            <div class="flex justify-between items-center mb-4">
              <div class="text-lg font-bold">Ranking dos Agentes</div>
              <div class="text-sm font-semibold">Agosto 2025</div>
            </div>
               
          <div class="py-4 space-y-4 max-h-[280px] space-y-4 overflow-y-auto">
            <!-- 1 -->
           <div class="flex row space-x-14" v-for="(item, index) in ranking" :key="item.userId">
<<<<<<< HEAD
            <div class="bg-white border-l-4 rounded-md border-orange-600 pl-4 flex items-center mb-4 space-x-4">
            <div class="w-9 h-9 rounded-full  text-white bg-green-500 text-xs font-bold flex items-center justify-center">
               {{ index + 1 }}
          </div>
          <div class="flex items-center justify-between w-64 ">
              <div class="text-md font-semibold whitespace-nowrap">{{ item.userName }}</div>
              <div class="text-md font-semibold">{{ item.total }}</div>
          </div>
          </div>
        </div>

      </div>
=======
            <div class="w-7 h-7 rounded-full  text-white bg-green-500 text-xs font-bold flex items-center justify-center">
               {{ index + 1 }}
          </div>
            <div class="text-md font-semibold">{{ item.userName }}</div>
            <div class="text-md font-semibold">{{ item.total }}</div>
        </div>


           
>>>>>>> 43afa04ef53c78ca0cf16b6281b25689a2a97cf9

    </div>
    
</div>






        </div>
      </div>
  


  <!-- <main class="py-9">
     <Menu/>
  </main> -->

  <button type="button" @click="buscarDados"></button>

</template>