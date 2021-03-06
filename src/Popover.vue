<template>
  <div class="popover" ref="popover">
    <div class="content-wrapper" ref="contentWrapper" v-if="visible" :class="[`position-${position}`]">
      <slot name="content" :hide="close"></slot>
    </div>
    <span class="trigger-wrapper" ref="triggerWrapper">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "Popover",
  props: {
    position: {
      type: String,
      default: 'top',
      validator (value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
      }
    },
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return ['click', 'hover'].indexOf(value) >= 0
      }
    }
  },
  data () {
    return {
      visible: false,
    }
  },
  methods: {
    computePosition () {
      const { contentWrapper, triggerWrapper } = this.$refs
      document.body.appendChild(contentWrapper)
      const {width, height, top, left} = triggerWrapper.getBoundingClientRect()
      const { height: height2 } = contentWrapper.getBoundingClientRect()
      let positionMap = {
        top: { top: top + window.scrollY,
            left: left + window.scrollX
        },
        bottom: {
          top: top + height + window.scrollY,
              left: left + window.scrollX
        },
        left: {
          top: top + window.scrollY + (height - height2) / 2,
              left: left + window.scrollX
        },
        right: {
          top: top + window.scrollY + (height - height2) / 2,
              left: left + window.scrollX + width
        }
      }
      contentWrapper.style.left = positionMap[this.position].left + 'px'
      contentWrapper.style.top = positionMap[this.position].top + 'px'
    },
    clickDocument(e) {
      if( this.$refs.popover && (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))) {
        return
      }
      if(this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)) {
        return
      }
      this.close()
    },
    open () {
      this.visible = true
      this.$nextTick( ()=>{
        this.computePosition()
        document.addEventListener('click', this.clickDocument)
      })
    },
    close() {
      this.visible = false
      document.removeEventListener('click', this.clickDocument)
    },
    onClick (e) {
      if (this.$refs.triggerWrapper.contains(e.target)) {
        this.visible === true ? this.close() : this.open()
      }
    },
    setEvent(isRemove) {
      const element = this.$refs.popover
      if(this.trigger === 'click') {
        isRemove ?
            element.removeEventListener( 'click', this.onClick) :
            element.addEventListener('click', this.onClick)
      }else {
        isRemove ?
            element.removeEventListener( 'mouseenter', this.open) &&
            element.removeEventListener('mouseleave',  this.close) :
            element.addEventListener( 'mouseenter', this.open) &&
            element.addEventListener('mouseleave',  this.close)
      }
    }
  },
  mounted() {
    this.setEvent(false)
  },
  beforeDestroy() {
    this.setEvent(true)
  }
}
</script>

<style scoped lang="scss">
$border-color: #aaa;
$border-radius: 4px;

.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper{
  position: absolute;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
  background: white;
  padding: .5em 1em;
  max-width: 20em;
  word-break: break-all;
  &::before, &::after {
    content: '';
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
  }
  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before, &::after {
      left: 10px;
    }
    &::before {
      border-top-color: black;
      border-bottom: none;
      top: 100%;
    }
    &::after {
      border-top-color: white;
      border-bottom: none;
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before, &::after {
      left: 10px;
    }
    &::before {
      border-bottom-color: black;
      border-top: none;
      bottom: 100%;
    }
    &::after {
      border-bottom-color: white;
      border-top: none;
      bottom: calc(100% - 1px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before, &::after {
      transform: translateY(-50%);
      top: 50%;
    }
    &::before {
      border-left-color: black;
      border-right: none;
      left: 100%;
    }
    &::after {
      border-left-color: white;
      border-right: none;
      left: calc(100% - 1px);
    }

}
  &.position-right {
    margin-left: 10px;

    &::before, &::after {
      transform: translateY(-50%);
      top: 50%;
    }

    &::before {
      border-right-color: black;
      border-left: none;
      right: 100%;
    }

    &::after {
      border-right-color: white;
      border-left: none;
      right: calc(100% - 1px);
    }
  }
}
.trigger-wrapper {
  display: inline-block;
}
</style>
