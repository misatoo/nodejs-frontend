export default {
  id: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'info'
  },
  message: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 3000
  },
  debounce: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function,
    default: () => {}
  },
  topmostOffset: {
    type: Number,
    default: 20
  },
  elementOffset: {
    type: Number,
    default: 20
  },
  _totalOffset: {
    type: Number
  },
  showClose: {
    type: Boolean
  }
}
