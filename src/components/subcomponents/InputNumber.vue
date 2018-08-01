<template>
  <div class="input-number">
    <button @click="handleDown" :disabled="currentValue <= min">-</button>
    <input type="text" :value="currentValue" @change="handleChange" @keyup.up='handleUp' @keyup.down='handleDown' />
    <button @click="handleUp" :disabled="currentValue >= max">+</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    //子组件将父组件传递过来的值进行保存，在本组件的作用域下进行使用
    currentValue: this.value
  }),
  props: {
    max: {
      //必须是数字类型
      type: Number,
      //默认值为Infinity
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },
  watch: {
    //监听子组件currentValue是否改变
    currentValue: function(val) {
      //$emit与父组件通信  （子组件-->父组件）
      //this指向当前组件实例
      this.$emit("input", val);
      //定义自定义函数进行通信
      this.$emit("on-change", val);
    },
    //监听父组件value是否改变
    value: function(val) {
      this.updateValue(val);
    }
  },
  methods: {
    //父组件传递过来的值可能不符合条件（大于最大值，小于最小值）
    updateValue: function(val) {
      if (val > this.max) {
        val = this.max;
      }
      if (val < this.min) {
        val = this.min;
      }
      this.currentValue = val;
    },
    handleDown: function() {
      this.currentValue -= this.step;
      if (this.currentValue <= this.min) {
        this.currentValue = this.min;
      }
    },
    handleUp: function() {
      this.currentValue += this.step;
      if (this.currentValue >= this.max) {
        this.currentValue = this.max;
      }
    },
    //验证输入值是否为数字
    isValueNumber(value) {
      return /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9]*$)|(^-?0{1}$)/.test(value + "");
    },
    handleChange: function(event) {
      var val = event.target.value.trim();
      var max = this.max;
      var min = this.min;
      if (this.isValueNumber(val)) {
        val = Number(val);
        this.currentValue = val;
        if (val > max) {
          this.current = max;
        }
        if (val < min) {
          this.current = min;
        }
      } else {
        //如果输入的不是数字，将输入的内容重置为之前的currentValue
        event.target.value = this.currentValue;
      }
    }
  },
  //初始化
  mounted: function() {
    this.updateValue(this.value);
  }
};
</script>

<style lang="" scoped>
</style>