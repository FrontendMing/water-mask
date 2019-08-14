export default class WaterMask {
  constructor(opts) {
    opts = opts || {}
    this.container = document.body,
    this.width = opts.width || '300px',
    this.height = opts.height || '200px',
    this.textAlign = opts.textAlign || 'center',
    this.textBaseline = opts.textBaseline || 'middle',
    this.font = opts.font || "14px Microsoft Yahei",
    this.fillStyle = opts.fillStyle || 'rgba(160, 160, 160, 0.5)',
    this.content = opts.content || {
      position: '产品技术部',
      name: '瓜皮王',
      time: '2019-08-15'
    },
    this.rotate = opts.rotate || '15',
    this.zIndex = opts.zIndex || 1000

    this.init()
  }

  init(){
    const canvas = document.createElement('canvas')

    canvas.setAttribute('width', this.width)
    canvas.setAttribute('height', this.height)
    const ctx = canvas.getContext("2d")

    ctx.textAlign = this.textAlign
    ctx.textBaseline = this.textBaseline
    ctx.font = this.font
    ctx.fillStyle = this.fillStyle
    ctx.rotate(Math.PI / 180 * this.rotate)

    const halfWidth = parseFloat(this.width) / 2
    const halfHeight = parseFloat(this.height) / 2

    ctx.fillText(this.content.position, halfWidth, halfHeight - 20)
    ctx.fillText(this.content.name, halfWidth, halfHeight)
    ctx.fillText(this.content.time, halfWidth, halfHeight + 20)

    const base64Url = canvas.toDataURL()
    const __wm = document.querySelector('.__wm')

    const watermarkDiv = __wm || document.createElement("div")
    const styleStr = `
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:${this.zIndex};
      pointer-events:none;
      background-repeat:repeat;
      background-image:url('${base64Url}')`

    watermarkDiv.setAttribute('style', styleStr)
    watermarkDiv.classList.add('__wm')

    if (!__wm) {
      this.container.style.position = 'relative'
      this.container.insertBefore(watermarkDiv, this.container.firstChild)
    }
    
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
    if (MutationObserver) {
      let mo = new MutationObserver(() => {
        const __wm = document.querySelector('.__wm')
        // 只在__wm元素变动才重新初始化
        if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
          // 避免一直触发
          mo.disconnect()
          mo = null
          this.init()
        }
      })

      mo.observe(this.container, {
        attributes: true,
        subtree: true,
        childList: true
      })
    }
  }
}