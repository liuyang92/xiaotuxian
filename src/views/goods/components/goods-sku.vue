<template>
  <div class="goods-sku">
    <dl v-for="spec in goods.specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="val in spec.values" :key="val.name">
          <img
            :class="{ selected: val.selected,disabled:val.disabled }"
            @click="changeSku(spec.values, val)"
            v-if="val.picture"
            :src="val.picture"
            alt=""
          />
          <span
            :class="{ selected: val.selected ,disabled:val.disabled}"
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
      //   console.log(valueArr)
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
  //   console.log(pathMap)
  return pathMap
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    },
    skuId: {
      type: String,
      default: () => ('')
    }
  },
  setup (props, { emit }) {
    // console.log(prop)
    //   生成路径字典
    const pathMap = getPathMap(props.goods.skus)
    // console.log(pathMap)
    // 获得当前选中状态的值得数组,即使没选中也要准备好
    const getSelectedVal = (specs) => {
      const arr = []
      specs.forEach(spec => {
        //   查找选项里面是有有已经选中的,有返回true,没有返回false
        const selectedVal = spec.values.find(val => val.selected)
        // const selectedVal = null
        // arr里面放入结果,有的话放入name,没有的话放入undefined
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
    updateItemStatus(props.goods.specs)
    // 通讯功能1.接收父组件shuid,默认激活按钮
    if (props.skuId) {
      const sku = props.goods.skus.find(sku => sku.id === props.skuId)
      props.goodsspecs.forEach((spec, i) => {
        spec.values.forEach(val => {
          if (val.name === sku.specs[i].valueName) {
            val.selected = true
          }
        })
      })
    }

    // 选中状态切换函数
    /**
     * 1 假设每个按钮都有一个selected属性,为true时为选中,false时取消选中(初始化时都为false,全部不选中)
     * 2 如果点击时已选中,则取消选中
     * 3 否则点击时为没选中,则全部按钮都取消选中,然后给点击的按钮改为选中(true)
     */
    const changeSku = (values, val) => {
      // 禁用状态,阻止行为
      if (val.disabled) return false
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
      updateItemStatus(props.goods.specs, pathMap)
      // 通讯功能2  当规格选择完毕.通知父组件(skuId,price,oldprice,stock,attrsText)
      // 其他情况:{}
      const selectedArr = getSelectedVal(props.goods.specs)
      const validSelectedArr = selectedArr.filter(val => val)
      if (validSelectedArr.length === props.goods.specs.length) {
        const skuIds = pathMap[validSelectedArr.join(spliter)]
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        // 选完
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          stock: sku.inventory,
          attrsText: sku.specs.reduce((p, c) => (p += `${c.name}:${c.valueName}`), '').trim()
        })
      } else {
        // 没有
        emit('change', {})
      }
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
