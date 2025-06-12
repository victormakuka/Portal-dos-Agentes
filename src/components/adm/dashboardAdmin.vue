<script setup>
import Menu from './Menu.vue'
import alerta from '@/components/alerta.vue';
import { getData } from '../../../Servicos/GetData';
import { useRouter } from 'vue-router';

const router = useRouter();

const buscarDados = async () => {
  const userData = await getData();
  console.log("Dados do usuário:", userData);
  if (!userData) {
    router.push('/');
  }
};

</script>

  <template>
<div class="text-center text-2xl font-bold text-orange-600 mt-4">
Dashboard do administrador
</div>
    
  <main>
     <Menu/>
  </main>

  <button type="button" @click="buscarDados">buscar dados</button>

</template>