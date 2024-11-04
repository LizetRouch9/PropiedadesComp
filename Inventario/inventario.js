const app = Vue.createApp({
  data() {
    return {
      nuevoProducto: '',
      nuevaCantidad: 1,
      nuevoPrecio: 0,
      productos: [],
      mensajeLimite: ''  // Mensaje para el límite de stock
    };
  },
  computed: {
    cantidadTotal() {
      return this.productos.reduce((total, producto) => total + producto.cantidad, 0);
    },
    inversionTotal() {
      return this.productos.reduce((total, producto) => total + producto.precioTotal, 0);
    },
    obtenerColorTexto() {
      return this.productos.map(producto => {
        return producto.cantidad > 10 ? 'text-danger' : '';
      });
    }
  },
  methods: {
    agregar() {
      if (this.cantidadTotal + this.nuevaCantidad > 12) {
        this.mensajeLimite = 'Límite de stock alcanzado. No puede agregar más de 12 unidades en total.';
        return;
      } else {
        this.mensajeLimite = ''; 
      }

      if (this.nuevoProducto) {
        const precioTotal = this.nuevaCantidad * this.nuevoPrecio;
        this.productos.push({
          id: this.productos.length + 1,
          descripcion: `${this.nuevoProducto} - Cantidad: ${this.nuevaCantidad} - Precio unitario: $${this.nuevoPrecio.toFixed(2)}`,
          cantidad: this.nuevaCantidad,
          precioTotal: precioTotal
        });
        this.nuevoProducto = '';
        this.nuevaCantidad = 1;
        this.nuevoPrecio = 0;
      }
    }
  }
});

app.mount('#app');
