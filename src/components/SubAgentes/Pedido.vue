<template>
    <div class="m-0 py-4 px-12 border  border-gray-300 shadow-sm w-[395px]"> <div class="text-md font-bold ">Solicitar a Recarga</div> <div class="text-sm text-gray-600">Solicite a sua recargar no seu agente de forma segura  rápida.</div></div>

   

<div class="py-24 px-8">
     
 <div class="text-2xl font-bold flex flex-row items-end ">
     
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 text-orange-600 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
Victor Makuka 
</div>

  <div class=" mt-8 space-x-2">
    <select name="valor" id="valor" class="border border-orange-600 text-sm text-gray-600 rounded-sm w-[150px] py-2 px-2">
        <option value="">Selecione o valor</option>
    </select>
    <input 
    type="submit"
    value="Solicitar"
    class="bg-orange-600 text-white text-sm rounded-sm py-2 px-2 w-[100px]">
</div>
  <div class="py-4 ">
    <table >
        <thead >
            <tr>
                <th class="py-3">Data da solicitação</th>
                <th>Valor</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr >
                <td class="py-2">06/06/2025 21:13</td>
                <td class="px-4">25 000kz</td>
                <td >Pendente</td>
            </tr>
            <tr>
                <td>05/06/2025 12:48</td>
                <td class="px-4">100 000kz</td>
                <td>Realizada</td>
            </tr>
            <tr >
                <td class="py-2">06/06/2025 21:13</td>
                <td class="px-4">25 000kz</td>
                <td >Pendente</td>
            </tr>
            <tr>
                <td>05/06/2025 12:48</td>
                <td class="px-4">100 000kz</td>
                <td>Realizada</td>
            </tr>
            
        </tbody>
        
    </table>
  </div>
</div>
  <main>
 
  </main>
</template>
<script setup>

</script>