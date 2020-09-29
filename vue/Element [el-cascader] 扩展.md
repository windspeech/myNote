

### Element [el-cascader] 扩展 点击文字可选择对应项

```js
<template>
  <div class="templateManagePackage g-container">
    <el-cascader v-model="values" :options="options" :props="props" clearable>
      <template slot-scope="{ node, data }">
        <div @click="clickEvent(node, data)">
          <span>{{ data.label }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </div>
      </template>
    </el-cascader>
  </div>
</template>

<script>

export default {
  name: 'TemplateManagePackage',
  data() {
    return {
      values: [],
      props: { multiple: true, expandTrigger: 'hover' },
      options: [{
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }, {
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }]
    }
  },
  methods: {
    filterNode(list) {
      const arr = []
      if (!list.hasChildren) {
        return [list.path]
      }
      function _iterate(data) {
        data.forEach(({ hasChildren, path, children }) => {
          if (!hasChildren) {
            arr.push(path)
          }
          return _iterate(children)
        })
        return arr
      }
      return _iterate(list.children)
    },
    compareData(node, type) {
      const v = this.filterNode(node)
      let oldValue = this.values
      const arr = []
      // 未选择 => 全选
      if (type === 2) {
        return [...v, ...oldValue]
      }

      const newValue = v.join('##').split('##')
      oldValue = oldValue.join('##').split('##')
      // 全选 => 反选
      if (type === 0) {
        newValue.forEach(i => {
          const indexOf = oldValue.indexOf(i)
          if (indexOf > -1) {
            oldValue.splice(indexOf, 1)
          }
        })
      } else { // 子级选择部分 => 全选
        newValue.forEach(i => {
          const indexOf = oldValue.indexOf(i)
          if (indexOf < 0) {
            oldValue.push(i)
          }
        })
      }
      oldValue.forEach(o => {
        arr.push(o.split(','))
      })
      return arr
    },
    clickEvent(node) {
      let values = []
      const { checked, indeterminate } = node
      if (checked) {
        // 全选 => 反选
        values = this.compareData(node, 0)
      } else if (indeterminate) {
        // 子级选择部分 => 全选
        values = this.compareData(node, 1)
      } else {
        // 未选择 => 全选
        values = this.compareData(node, 2)
      }
      this.values = [...values]
    }
  }
}
</script>

```

