const productos = {
    "Laptop": 12000,
    "Mouse": 250,
    "Teclado": 480,
    "Monitor": 3100
};

const promociones = {
    "DESC10": 0.10,
    "DESC20": 0.20
};

const validarNombre = (nombre) => {
    if (typeof nombre !== "string" || nombre.trim().length < 3) {
        throw new Error("El nombre no es válido.");
    }
    return nombre.trim();
};

const validarProducto = (producto) => {
    if (!productos[producto]) {
        throw new Error("El producto no existe en el catálogo.");
    }
    return producto;
};

const validarCantidad = (cantidad) => {
    if (typeof cantidad !== "number" || cantidad <= 0 || !Number.isInteger(cantidad)) {
        throw new Error("La cantidad debe ser un número entero y mayor que 0.");
    }
    return cantidad;
};

const validarPromocion = (codigo) => {
    if (!codigo) return 0; // No se aplica descuento

    if (!promociones[codigo]) {
        throw new Error("El código de promoción no es válido.");
    }
    return promociones[codigo];
};

const calcularSubtotal = (producto, cantidad) =>
    productos[producto] * cantidad;

const aplicarDescuento = (subtotal, descuento) =>
    subtotal - (subtotal * descuento);

const generarReporte = (pedido, subtotal, total, descuento) => {
    return `REPORTE DEL PEDIDO
Cliente: ${pedido.nombre}
Producto: ${pedido.producto}
Cantidad: ${pedido.cantidad}
Precio unitario: $${productos[pedido.producto]}

Subtotal: $${subtotal}
Descuento aplicado: ${descuento * 100}%
Total a pagar: $${total}`;
};

const procesarPedido = (pedido) => {
    try {
        const nombre = validarNombre(pedido.nombre);
        const producto = validarProducto(pedido.producto);
        const cantidad = validarCantidad(pedido.cantidad);
        const descuento = validarPromocion(pedido.codigoPromo);

        const subtotal = calcularSubtotal(producto, cantidad);
        const total = aplicarDescuento(subtotal, descuento);

        console.log(generarReporte(pedido, subtotal, total, descuento));

    } catch (error) {
        console.error("Error al procesar el pedido:", error.message);
    }
};

const pedidoEjemplo = {
    nombre: "Juan Pérez",
    producto: "Laptop",
    cantidad: 2,
    codigoPromo: "DESC10"
};

procesarPedido(pedidoEjemplo);


