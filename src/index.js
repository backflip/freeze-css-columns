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
      return child.style
    })
  }

  // Fix columns
  engage () {
    let currentOffset = null

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

        // Add margin-top fallback if break-before is not supported
        if (!window.getComputedStyle(child).breakBefore) {
          child.style.marginTop = this.options.marginTopFallback
        }

        // Keep new column as reference
        currentOffset = childOffset
      }
    })

    // Force column redraw in order for "break-before" to take effect
    this.redraw()

    // Save state
    this.isEngaged = true
  }

  // Unfix columns
  disengage () {
    // Reset styles to allow for proper reflow on resize
    this.children.forEach((child, i) => {
      child.style = this.initialChildrenStyles[i]
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
