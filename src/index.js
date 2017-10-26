class FreezeCssColumns {
  constructor (element, options = {
    marginTopFallback: '100em'
  }) {
    this.element = element
    this.options = options

    this.isEngaged = false

    this.children = [].slice.call(this.element.childNodes).filter((node) => node.nodeType === 1)
    this.initialDisplayStyle = this.element.style.display

    // Save children's initial styles to be able to reset them later
    this.initialChildrenStyles = this.children.map((child) => {
      return {
        marginTop: child.style.marginTop,
        breakBefore: child.style.breakBefore
      }
    })
  }

  // Fix columns
  engage () {
    let currentOffset = null
    let ieFix = false

    // Reset styles to allow for proper reflow on resize
    this.disengage()

    // Loop through items and find first item in every new column
    this.children.forEach((child) => {
      let childOffset = child.offsetLeft

      // First column
      if (currentOffset === null) {
        currentOffset = childOffset
      // New column
      } else if (childOffset > currentOffset) {
        // Add break-before
        child.style.breakBefore = 'column'

        // Check if the column was moved to the right by accident
        // IE seems to have a different implementation here, see https://stackoverflow.com/a/23001256
        // Needs additional fixes, see below
        if (child.offsetLeft > childOffset) {
          ieFix = true
          child.style.removeProperty('break-before')
        }

        // Add margin-top fallback if break-before is not supported
        if (window.getComputedStyle(child).breakBefore !== 'column') {
          child.style.marginTop = this.options.marginTopFallback
        }

        // Keep new column as reference
        currentOffset = childOffset
      }
    })

    // Compensate for margin-top in IE (behaving differently than Firefox)
    // This cannot be done by simply comparing the element's height before and after since IE picks the wrong items to fix, moving them between columns
    // This is apparently due to offsetLeft returning incorrect values
    if (ieFix) {
      let elementBottomEdge = this.element.offsetTop + this.element.offsetHeight
      let childrenBottomEdge = 0

      this.children.forEach((child) => {
        let childBottomEdge = child.offsetTop + child.offsetHeight

        childrenBottomEdge = Math.max(childrenBottomEdge, childBottomEdge)
      })

      if (elementBottomEdge > childrenBottomEdge) {
        this.element.style.marginBottom = childrenBottomEdge - elementBottomEdge + 'px'
      }
    }

    // Force column redraw in order for "break-before" to take effect
    this.redraw()

    // Save state
    this.isEngaged = true
  }

  // Unfix columns
  disengage () {
    // Reset styles to allow for proper reflow on resize
    this.children.forEach((child, i) => {
      Object.keys(this.initialChildrenStyles[i]).forEach((property) => {
        child.style[property] = this.initialChildrenStyles[i][property]
      })
    })

    this.redraw()

    this.isEngaged = false
  }

  // Reflow on resize, e.g.
  update () {
    if (!this.isEngaged) {
      return
    }

    this.engage()
  }

  // Force column redraw
  redraw () {
    this.element.style.display = 'none'
    void this.element.offsetHeight
    this.element.style.display = this.initialDisplayStyle
  }
}

export default FreezeCssColumns
