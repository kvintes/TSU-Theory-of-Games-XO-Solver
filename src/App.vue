<template>
    <div id="application">
        <div class="info">
            {{ isLoading ? 'Загрузка ...' : '' }}
            {{ info }} {{ objInfoGame}}
        </div>
        <div class="page">
            <button @click="() => fillNodes()">Заполнить результаты</button>
            <button @click="() => getInfo()">Получить информацию об игре</button>
            <div class="field">
                <div class="column" v-for="slice, index in getTree" :key="slice">
                    <div class="item" v-for="it, ind in slice" :key="it"
                        @click="() => {
                            indexes[index] = ind;
                            indexes = indexes.slice(0, index+1);
                        }"
                        :class="{ 'item_active': indexes[index] === ind}">
                        <draw-xo :items="it.field" :res="it.getResult()"></draw-xo>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DrawXo from '@/components/DrawXo.vue';
import { XOTreeSolver } from "@/lib/xo.js";
import { ref, onMounted } from "vue";
export default {
    name: "App",
    components: {
        DrawXo
    },
    setup(){
        const tree = ref(new XOTreeSolver());
        onMounted(()=>{
            tree.value.fillTree();
        });
        const isLoading = ref(false);
        const indexes = ref([]);
        const info = ref(`Информация (${Date.now()}) об игре: (9! = 362880)`);
        const objInfoGame = ref({});
        return {
            indexes,
            tree,
            info,
            objInfoGame,
            isLoading
        }
    },
    computed: {
        getTree(){
            const tail = [];
            let rootItems = this.tree?.root.items;
            for(const ind of this.indexes){
                tail.push(rootItems[ind]?.items);
                rootItems = rootItems[ind]?.items;
            }
            return [
                this.tree?.root.items,
                ...tail
            ] || [];
        }
    },
    methods: {
        getInfo() {
            this.isLoading = true;
            setTimeout(() => {
                this.objInfoGame = this.tree.getInfo();
                this.isLoading = false;
            })
        },
        fillNodes() {
            this.isLoading = true;
            setTimeout(() => {
                this.tree.fillNodesResultByRoot();
                this.isLoading = false;
            })
        }
    }
}
</script>

<style>
*,
*::after,
*::before,
body,
html{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
#application{
    border: 10px solid red;

    min-height: 100dvh;
    height: 100dvh;
    position: relative;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
}
.info{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid yellow;
}
.page{
    width: 100%;
    /* height: 100%; */
    flex: 1;
    position: relative;
    overflow-y: auto;

    display: flex;
    gap: 10px;

    border: 10px solid green;
    position: relative;
}
.column{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.item{
    padding: 10px;
    border: 1px solid transparent;
}
.item_active{
    border: 1px solid blue;
    border: 100%;
}
.field{
    display: flex;
    gap: 20px;
    flex: 1;
    height: 100%;
    width: 100%;
    overflow-x: auto;
    border: 1px solid blue;
    overflow-y: auto;
}
</style>