import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar as NativeStatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const roles = [
  { id: 'admin', name: 'Administrador', scope: 'Control total', summary: 'Usuarios, menu, promociones, inventario, facturacion y KPIs.' },
  { id: 'chef', name: 'Gerente / Chef', scope: 'Cocina y operacion', summary: 'Prioriza comandas, cambia estados y controla consumo de insumos.' },
  { id: 'waiter', name: 'Personal de mesa', scope: 'Sala y clientes', summary: 'Toma pedidos, agrega notas, consulta cuenta y envia a cocina.' },
  { id: 'cashier', name: 'Caja', scope: 'Cobros e informes', summary: 'Cierra tickets, aplica descuentos y revisa ventas por turno.' },
];

const initialOrders = [
  { id: '101', table: 'Mesa 4', guest: 'Ana Perez', status: 'Nuevo', items: 'Risotto, tiramisu, agua mineral', total: 42.5 },
  { id: '102', table: 'Mesa 8', guest: 'Carlos Ruiz', status: 'Preparacion', items: 'Solomillo, ensalada tibia, coulant', total: 68.9 },
  { id: '103', table: 'Terraza 2', guest: 'Laura Gomez', status: 'Listo', items: 'Pasta fresca, cheesecake, limonada', total: 36.2 },
  { id: '104', table: 'Barra 1', guest: 'Miguel Torres', status: 'Preparacion', items: 'Tabla de quesos, mousse, vino', total: 31.8 },
];

const dishes = [
  { name: 'Tiramisu en copa', category: 'Postre', price: 8.5, stock: 'Disponible' },
  { name: 'Coulant de chocolate', category: 'Postre', price: 9, stock: 'Disponible' },
  { name: 'Cheesecake frutos rojos', category: 'Postre', price: 8, stock: 'Disponible' },
  { name: 'Menu degustacion', category: 'Chef', price: 54, stock: 'Limitado' },
];

const inventory = [
  { name: 'Chocolate 70%', area: 'Pasteleria', stock: 4, min: 8, unit: 'kg' },
  { name: 'Frutos rojos', area: 'Pasteleria', stock: 3, min: 6, unit: 'kg' },
  { name: 'Harina italiana', area: 'Cocina', stock: 12, min: 10, unit: 'kg' },
  { name: 'Vino tinto reserva', area: 'Barra', stock: 18, min: 12, unit: 'bot.' },
];

const modules = ['Resumen', 'Pedidos', 'Menu', 'Caja', 'Inventario'];

function money(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${safeValue.toFixed(2).replace('.', ',')} EUR`;
}

export default function App() {
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const isTablet = width >= 720;
  const contentWidth = isTablet ? Math.min(width - 48, 980) : width;
  const contentPadding = isCompact ? 14 : 20;
  const metricWidth = isTablet ? '23.5%' : isCompact ? '100%' : '48%';
  const roleWidth = isTablet ? 220 : Math.max(152, Math.min(190, width * 0.46));

  const [activeRole, setActiveRole] = useState(roles[0]);
  const [activeModule, setActiveModule] = useState('Resumen');
  const [orders, setOrders] = useState(initialOrders);

  const totalSales = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
  const readyOrders = orders.filter((order) => order.status === 'Listo').length;
  const lowStock = inventory.filter((item) => item.stock <= item.min);

  function updateOrder(id, status) {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status } : order)));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="light" />
      <View style={[styles.appShell, Platform.OS === 'android' && styles.androidInset]}>
        <View style={[styles.header, { paddingHorizontal: contentPadding }]}>
          <View style={styles.headerText}>
            <Text style={styles.kicker}>Restaurante Connect</Text>
            <Text style={[styles.title, isCompact && styles.titleCompact]}>Operacion movil</Text>
          </View>
          <View style={styles.onlineBadge}>
            <Text style={styles.onlineText}>Expo Go</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.roleRail, { paddingHorizontal: contentPadding }]}
        >
          {roles.map((role) => (
            <Pressable
              key={role.id}
              onPress={() => setActiveRole(role)}
              style={[styles.roleChip, { width: roleWidth }, activeRole.id === role.id && styles.roleChipActive]}
            >
              <Text numberOfLines={1} style={[styles.roleName, activeRole.id === role.id && styles.roleNameActive]}>
                {role.name}
              </Text>
              <Text numberOfLines={1} style={[styles.roleScope, activeRole.id === role.id && styles.roleScopeActive]}>
                {role.scope}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.outerContent}>
          <View style={[styles.content, { width: contentWidth, padding: contentPadding }]}>
            <View style={styles.heroCard}>
              <Text style={styles.heroEyebrow}>{activeRole.scope}</Text>
              <Text style={[styles.heroTitle, isCompact && styles.heroTitleCompact]}>{activeRole.name}</Text>
              <Text style={styles.heroText}>{activeRole.summary}</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moduleRail}>
              {modules.map((module) => (
                <Pressable
                  key={module}
                  onPress={() => setActiveModule(module)}
                  style={[styles.moduleTab, activeModule === module && styles.moduleTabActive]}
                >
                  <Text style={[styles.moduleText, activeModule === module && styles.moduleTextActive]}>{module}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {activeModule === 'Resumen' && (
              <View style={styles.grid}>
                <MetricCard width={metricWidth} label="Ventas hoy" value={money(totalSales)} toneStyle={styles.metricRed} />
                <MetricCard width={metricWidth} label="Pedidos listos" value={`${readyOrders}/${orders.length}`} toneStyle={styles.metricGreen} />
                <MetricCard width={metricWidth} label="Ticket promedio" value={money(totalSales / orders.length)} toneStyle={styles.metricBlue} />
                <MetricCard width={metricWidth} label="Stock critico" value={`${lowStock.length} alertas`} toneStyle={styles.metricAmber} />
              </View>
            )}

            {activeModule === 'Pedidos' && (
              <View style={styles.stack}>
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} onUpdate={updateOrder} compact={isCompact} />
                ))}
              </View>
            )}

            {activeModule === 'Menu' && (
              <View style={styles.stack}>
                {dishes.map((dish) => (
                  <View key={dish.name} style={styles.card}>
                    <View style={styles.rowBetween}>
                      <View style={styles.flexText}>
                        <Text style={styles.cardKicker}>{dish.category}</Text>
                        <Text style={styles.cardTitle}>{dish.name}</Text>
                      </View>
                      <Text style={styles.amount}>{money(dish.price)}</Text>
                    </View>
                    <Text style={styles.cardBody}>Estado: {dish.stock}. Precio sincronizado con sala y caja.</Text>
                  </View>
                ))}
              </View>
            )}

            {activeModule === 'Caja' && (
              <View style={styles.cardDark}>
                <Text style={styles.darkKicker}>Cierre de turno</Text>
                <Text style={[styles.darkValue, isCompact && styles.darkValueCompact]}>{money(totalSales)}</Text>
                <View style={styles.divider} />
                <Text style={styles.darkLine}>Ticket promedio: {money(totalSales / orders.length)}</Text>
                <Text style={styles.darkLine}>Pedidos cerrados: {readyOrders}</Text>
                <Text style={styles.darkLine}>Metodos: efectivo, tarjeta y transferencia</Text>
              </View>
            )}

            {activeModule === 'Inventario' && (
              <View style={styles.stack}>
                {inventory.map((item) => {
                  const isLow = item.stock <= item.min;
                  const progress = `${Math.min(100, (item.stock / Math.max(item.min * 2, 1)) * 100)}%`;
                  return (
                    <View key={item.name} style={styles.card}>
                      <View style={styles.rowBetween}>
                        <View style={styles.flexText}>
                          <Text style={styles.cardTitle}>{item.name}</Text>
                          <Text style={styles.cardBody}>{item.area}</Text>
                        </View>
                        <Text style={[styles.stockBadge, isLow && styles.stockBadgeLow]}>{isLow ? 'Reponer' : 'OK'}</Text>
                      </View>
                      <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, isLow && styles.progressFillLow, { width: progress }]} />
                      </View>
                      <Text style={styles.amount}>{item.stock} {item.unit}</Text>
                    </View>
                  );
                })}
              </View>
            )}

            <View style={styles.platformNote}>
              <Text style={styles.platformTitle}>Simulacion local</Text>
              <Text style={styles.platformText}>
                Si LAN no abre en Expo Go, usa el modo tunnel. Plataforma detectada: {Platform.OS}.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function MetricCard({ label, value, toneStyle, width }) {
  return (
    <View style={[styles.metricCard, toneStyle, { width }]}>
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function OrderCard({ order, onUpdate, compact }) {
  return (
    <View style={styles.card}>
      <View style={[styles.rowBetween, compact && styles.rowStack]}>
        <View style={styles.flexText}>
          <Text style={styles.cardKicker}>{order.table}</Text>
          <Text style={styles.cardTitle}>{order.guest}</Text>
        </View>
        <StatusPill status={order.status} />
      </View>
      <Text style={styles.cardBody}>{order.items}</Text>
      <View style={[styles.rowBetween, compact && styles.rowStack]}>
        <Text style={styles.amount}>{money(order.total)}</Text>
        <View style={styles.actionRow}>
          <SmallButton label="Preparar" onPress={() => onUpdate(order.id, 'Preparacion')} />
          <SmallButton label="Listo" onPress={() => onUpdate(order.id, 'Listo')} />
        </View>
      </View>
    </View>
  );
}

function StatusPill({ status }) {
  const style = status === 'Listo' ? styles.statusReady : status === 'Preparacion' ? styles.statusCooking : styles.statusNew;
  return <Text style={[styles.statusPill, style]}>{status}</Text>;
}

function SmallButton({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.smallButton, pressed && styles.smallButtonPressed]}>
      <Text style={styles.smallButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#020617' },
  appShell: { flex: 1, backgroundColor: '#020617' },
  androidInset: { paddingTop: NativeStatusBar.currentHeight || 0 },
  header: { paddingTop: 12, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  headerText: { flex: 1, minWidth: 0 },
  kicker: { color: '#fecaca', fontSize: 12, fontWeight: '900', letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { color: '#ffffff', fontSize: 28, fontWeight: '900', marginTop: 2 },
  titleCompact: { fontSize: 23 },
  onlineBadge: { backgroundColor: 'rgba(34,197,94,0.14)', borderColor: 'rgba(34,197,94,0.25)', borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 },
  onlineText: { color: '#86efac', fontSize: 12, fontWeight: '800' },
  roleRail: { paddingBottom: 14, columnGap: 10 },
  roleChip: { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderRadius: 18, padding: 14 },
  roleChipActive: { backgroundColor: '#dc2626', borderColor: '#ef4444' },
  roleName: { color: '#e2e8f0', fontWeight: '900', fontSize: 14 },
  roleNameActive: { color: '#ffffff' },
  roleScope: { color: '#94a3b8', fontWeight: '700', fontSize: 12, marginTop: 4 },
  roleScopeActive: { color: '#fee2e2' },
  outerContent: { alignItems: 'center', backgroundColor: '#f8fafc', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 42 },
  content: { rowGap: 18 },
  heroCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 22, shadowColor: '#0f172a', shadowOpacity: 0.08, shadowRadius: 18, elevation: 3 },
  heroEyebrow: { color: '#dc2626', fontWeight: '900', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  heroTitle: { color: '#0f172a', fontWeight: '900', fontSize: 28, marginTop: 8 },
  heroTitleCompact: { fontSize: 23 },
  heroText: { color: '#475569', lineHeight: 22, marginTop: 10, fontWeight: '600' },
  moduleRail: { columnGap: 8, paddingRight: 20 },
  moduleTab: { backgroundColor: '#e2e8f0', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10 },
  moduleTabActive: { backgroundColor: '#0f172a' },
  moduleText: { color: '#475569', fontWeight: '900', fontSize: 13 },
  moduleTextActive: { color: '#ffffff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  metricCard: { borderRadius: 20, padding: 18, minHeight: 96 },
  metricRed: { backgroundColor: '#fee2e2' },
  metricGreen: { backgroundColor: '#dcfce7' },
  metricBlue: { backgroundColor: '#dbeafe' },
  metricAmber: { backgroundColor: '#fef3c7' },
  metricValue: { color: '#0f172a', fontWeight: '900', fontSize: 22 },
  metricLabel: { color: '#475569', fontWeight: '800', fontSize: 12, marginTop: 8 },
  stack: { rowGap: 12 },
  card: { backgroundColor: '#ffffff', borderRadius: 22, padding: 18, borderColor: '#e2e8f0', borderWidth: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', columnGap: 12 },
  rowStack: { flexDirection: 'column', rowGap: 12 },
  flexText: { flex: 1, minWidth: 0 },
  cardKicker: { color: '#64748b', fontWeight: '900', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' },
  cardTitle: { color: '#0f172a', fontWeight: '900', fontSize: 17, marginTop: 4 },
  cardBody: { color: '#64748b', fontWeight: '600', lineHeight: 21, marginTop: 10 },
  amount: { color: '#0f172a', fontWeight: '900', marginTop: 12 },
  actionRow: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 8, rowGap: 8, marginTop: 12 },
  smallButton: { backgroundColor: '#fee2e2', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9 },
  smallButtonPressed: { opacity: 0.72 },
  smallButtonText: { color: '#b91c1c', fontWeight: '900', fontSize: 12 },
  statusPill: { borderRadius: 999, overflow: 'hidden', paddingHorizontal: 10, paddingVertical: 6, fontSize: 11, fontWeight: '900' },
  statusNew: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
  statusCooking: { backgroundColor: '#fef3c7', color: '#b45309' },
  statusReady: { backgroundColor: '#dcfce7', color: '#15803d' },
  cardDark: { backgroundColor: '#0f172a', borderRadius: 24, padding: 22 },
  darkKicker: { color: '#fecaca', fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase', fontSize: 12 },
  darkValue: { color: '#ffffff', fontWeight: '900', fontSize: 36, marginTop: 10 },
  darkValueCompact: { fontSize: 29 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.12)', marginVertical: 18 },
  darkLine: { color: '#cbd5e1', fontWeight: '700', marginBottom: 10 },
  stockBadge: { backgroundColor: '#dcfce7', color: '#15803d', borderRadius: 999, overflow: 'hidden', paddingHorizontal: 10, paddingVertical: 6, fontSize: 11, fontWeight: '900' },
  stockBadgeLow: { backgroundColor: '#fee2e2', color: '#b91c1c' },
  progressTrack: { backgroundColor: '#e2e8f0', height: 8, borderRadius: 999, overflow: 'hidden', marginTop: 16 },
  progressFill: { backgroundColor: '#22c55e', height: '100%', borderRadius: 999 },
  progressFillLow: { backgroundColor: '#dc2626' },
  platformNote: { backgroundColor: '#ffffff', borderRadius: 22, padding: 18, borderColor: '#e2e8f0', borderWidth: 1 },
  platformTitle: { color: '#0f172a', fontWeight: '900', fontSize: 17 },
  platformText: { color: '#64748b', fontWeight: '600', lineHeight: 21, marginTop: 8 },
});
