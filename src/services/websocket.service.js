class WebSocketService {
  constructor() {
    this.socket = null
  }

  connect(url) {
    this.socket = new WebSocket(url)

    this.socket.onopen = () => console.log('WebSocket Connected')
    this.socket.onerror = (err) => console.error('WebSocket Error:', err)
  }

  subscribe(callback) {
    if (this.socket) {
      this.socket.onmessage = (event) => callback(JSON.parse(event.data))
    }
  }

  disconnect() {
    if (this.socket) this.socket.close()
  }
}

export const wsService = new WebSocketService()
