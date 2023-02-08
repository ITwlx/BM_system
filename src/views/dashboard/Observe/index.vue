<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="12">
                <Search></Search>
            </el-col>
            <el-col :span="12">
                <SaleCategory />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import SaleCategory from './SaleCategory'
import Search from './Search'
export default {
    name:'Observe',
    components:{
        SaleCategory,
        Search
    }
}
</script>

<style>

</style>