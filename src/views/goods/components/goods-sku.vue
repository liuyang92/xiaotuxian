<template>
  <div class="goods-sku">
    <dl v-for="spec in goods.specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="val in spec.values" :key="val.name">
          <img
            :class="{ selected: val.selected }"
            @click="changeSku(spec.values, val)"
            v-if="val.picture"
            :src="val.picture"
            alt=""
          />
          <span
            :class="{ selected: val.selected }"
            @click="changeSku(spec.values, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
// 根据现有sku计算出所有可以走的路径集合
const spliter = '☆'
const getPathMap = skus => {
  const pathMap = {}
  //   console.log('skus', skus)
  skus.forEach(sku => {
    //   过滤无效sku
    if (sku.inventory > 0) {
      // 得到sku的值数组
      const valueArr = sku.specs.map(spec => spec.valueName)
      //  得到sku值得子集
      const subSets = powerSet(valueArr)
      //   console.log(subSets)
      //   遍历数组,将每个选项以☆拼接成字符串作为pathMap的key
      subSets.forEach(subSet => {
        const key = subSet.join(spliter)
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    }
  },
  setup (prop) {
    //   生成路径字典
    const pathMap = getPathMap(prop.goods.skus)
    // console.log(pathMap)
    // 获得当前选中状态的值得数组,即使没选中也要准备好
    const getSelectedVal = specs => {
      const arr = []
      specs.forEach(spec => {
        const selectedVal = spec.values.find(val => val.selected)
        arr.push(selectedVal ? selectedVal.name : undefined)
      })
      return arr
    }
    // 更新所有按钮状态的方法
    const updateItemStatus = specs => {
      specs.forEach((spec, i) => {
        const selectedArr = getSelectedVal(specs)
        // console.log(selectedArr)
        spec.values.forEach(val => {
          // 如果激活,跳过判断
          if (val.selected) return false
          //   将按钮带入数组
          selectedArr[i] = val.name
          //   提出无用属性值,拼接五角星,得到key
          const key = selectedArr.filter(item => item).join(spliter)
          val.disabled = !pathMap[key]
        })
      })
    }
    // 初始化更新禁用状态
    updateItemStatus(prop.goods.specs)
    const changeSku = (values, val) => {
      // 如果点击时已经选中,取反
      if (val.selected) {
        val.selected = false
      } else {
        // 如果没选中,别人全部取消,自己选中
        values.forEach(val => {
          val.selected = false
        })
        val.selected = true
      }
      //   点击按钮时,更新其他按钮状态
      updateItemStatus(prop.goods.specs)
    }
    return { changeSku }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
