# 多行水印

## 原理
    canvas转base64，作为背景图插入到DOM，并动态监听水印DOM元素的变化

## js
## 导入文件
    import WaterMask from '@/utils/WaterMask.js'

## 在页面 created 时实例化
## @example
    created(){
      new WaterMask({
        width: '200px',
        height: '120px',
        fillStyle: 'rgba(160, 160, 160, 0.1)'
      })
    } 