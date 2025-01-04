import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { OrderItem } from "../types";
import { OrderState } from "../reducers/order-reducer";
import { formatCurrency, formatDate } from "../helpers";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 5,
  },
});

export default function OrderPDF({ state }: { state: OrderState }) {
  const { pdfId } = state;
  const order = state.orderPDF.find((order) => order.id === pdfId);

  if (!order) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.title}>Detalles del Pedido</Text>
          <Text style={styles.text}>No se encontró la orden seleccionada.</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Detalles del Pedido</Text>
        <View style={styles.section}>
          <Text style={styles.text}>Dirección: {order.direction}</Text>
          <Text style={styles.text}>Fecha: {formatDate(order.date)}</Text>
        </View>
        {order.order.map((item: OrderItem) => (
          <View key={item.id} style={styles.section}>
            <Text style={styles.text}>Producto: {item.name}</Text>
            <Text style={styles.text}>Cantidad: {item.quantity}</Text>
            <Text style={styles.text}>
              Precio: {formatCurrency(item.price)}
            </Text>
            <Text style={styles.text}>
              Total: {formatCurrency(item.quantity * item.price)}
            </Text>
          </View>
        ))}
        <View style={styles.section}>
          <Text style={styles.text}>
            Total de la Orden:{" "}
            {order.order
              .reduce(
                (total: number, item: OrderItem) =>
                  total + item.quantity * item.price,
                0
              )}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
