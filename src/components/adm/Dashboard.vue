<script >
import Menu from './Menu.vue'
import alerta from '@/components/alerta.vue';
export default {
  data(){
   return{
     AparecerAlerta: true
   }
  }, 
  components: {
    Menu,
    alerta
  },
 }

</script>

  <template>
<div class="text-center text-2xl font-bold text-orange-600 mt-4">
Dashboard do administrador
</div>
    
  <main>
     <Menu/>
  </main>
  
 
</template>