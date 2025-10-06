<template>
    <div class="res">
        {{ res }}
    </div>
    <div class="xo">
        <div class="divider_left"></div>
        <div class="divider_right"></div>
        <div class="divider_top"></div>
        <div class="divider_bottom"></div>
        <div class="line" v-for="it in items" :key="it + Date()">
            <div class="line__el" v-for="el in it" :key="el">
                {{ el }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        res: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default: () => [
                [null, null, null],
                [null, 'x', null],
                [null, null, null]
            ]
        }
    }   
}
</script>

<style scoped>
.res{
    border: 1px solid grey;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.xo{
    border: 1px solid green;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    aspect-ratio: 1;
    gap: 10px;
    position: relative;

    --d: 32%;
}
.line{
    display: flex;
    width: 100%;
    position: relative;
    justify-content:space-between;
}
.line__el{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
    aspect-ratio: 1;
    /* border: 1px solid red; */
}
.divider_left{
    position: absolute;
    height: 100%;
    left: var(--d);
    border: 1px solid green;
}
.divider_right{
    position: absolute;
    height: 100%;
    right: var(--d);
    border: 1px solid green;
}
.divider_top{
    position: absolute;
    width: 100%;
    top: var(--d);
    border: 1px solid green;
}
.divider_bottom{
    position: absolute;
    width: 100%;
    bottom: var(--d);
    border: 1px solid green;
}
</style>