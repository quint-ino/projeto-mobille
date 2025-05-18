import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cart, setCart] = useState([]);

  const handleLogin = () => {
    if (email.toLowerCase() === 'teste@atlcompany.com' && password === '123456') {
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);
  };

  return isLoggedIn ? (
    <ProductListScreen cart={cart} setCart={setCart} onLogout={handleLogout} />
  ) : (
    <LoginScreen
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onLogin={handleLogin}
    />
  );
}

function LoginScreen({ email, password, setEmail, setPassword, onLogin }) {
  return (
    <SafeAreaView style={[styles.container, styles.centerContent]}>
      <Text style={styles.loginTitle}>ATL Company</Text>
      <Text style={styles.loginSubtitle}>Bem-vindo! Faça login para continuar.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#666"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function ProductListScreen({ cart, setCart, onLogout }) {
  const [modalVisible, setModalVisible] = useState(false);

  // Produtos com 3 imagens no carrossel
  const products = [
     {
      id: '1',
      name: 'Velas Aromáticas 110g - Vários Aromas',
      price: 35.00,
      images: [
        'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m12uqxqh5rno3f@resize_w450_nl.webp',
        'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m5a2qwllcgc2f6@resize_w450_nl.webp',
        'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m12uqxqh5s0u1f@resize_w450_nl.webp',
      ],
    },
    {
      id: '2',
      name: 'Caixa Decorativa',
      price: 95.00,
      images: [
        'https://sottilecasa.cdn.magazord.com.br/img/2024/11/produto/41126/caixa-decorativa-madeira-creme-c-esferas-em-metal-dourado-p1.jpg',
        'https://sottilecasa.cdn.magazord.com.br/img/2024/11/produto/41125/caixa-decorativa-madeira-creme-c-esferas-em-metal-dourado-p-2.jpg',
      ],
    },
    {
      id: '3',
      name: 'Kit Crochê e Tricô',
      price: 50.00,
      images: [
        'https://cdn.awsli.com.br/2500x2500/1410/1410241/produto/61897264/Kit%20costura%20-%20estojo.jpeg',
        'https://cdn.awsli.com.br/600x450/1410/1410241/produto/61897264/5dbc5b37f5.jpg',
        'https://cdn.awsli.com.br/600x450/1410/1410241/produto/61897264/908725b06a.jpg',
      ],
    },
    {
      id: '4',
      name: 'Conjunto Stencil - Artesanato Decorativo ',
      price: 11.50,
      images: [
        'https://texpapel.cdn.magazord.com.br/img/2023/03/produto/7113/stencil-barrado-10x30-ref-7738.jpg?ims=600x600',
        'https://texpapel.cdn.magazord.com.br/img/2023/03/produto/6274/stencil-coracoes-7x15-ref-8126.jpg?ims=600x600',
        'https://texpapel.cdn.magazord.com.br/img/2023/03/produto/6549/stencil-cafe-coffee-10x30-ref-215.jpg?ims=600x600',
      ],
    },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.productCard}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {item.images.map((imgUri, index) => (
            <Image
              key={`${item.id}-img-${index}`}
              source={{ uri: imgUri }}
              style={styles.productImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ATL</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.cartButton}>
            <Text style={styles.cartText}>Carrinho ({cart.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de produtos - 1 por linha */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
        key={'singleColumn'} // força re-render quando mudar colunas (aqui fixo 1)
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>© ArteLier 2025</Text>
      </View>

      {/* Modal Carrinho */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Carrinho</Text>
            {cart.length === 0 ? (
              <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
            ) : (
              <FlatList
                data={cart}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.cartItem}>
                    <Text style={styles.cartItemText}>
                      {item.name} - R$ {item.price.toFixed(2)}
                    </Text>
                    <TouchableOpacity onPress={() => removeFromCart(index)}>
                      <Text style={styles.removeText}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
            <Text style={styles.cartTotal}>
              Total: R$ {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const primary = '#1e293b';
const accent = '#3b82f6';
const red = '#ef4444';
const background = '#f8fafc';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: background },
  centerContent: { justifyContent: 'center', paddingHorizontal: 30 },

  // Login
  loginTitle: { fontSize: 32, fontWeight: '900', color: primary, textAlign: 'center', marginBottom: 10 },
  loginSubtitle: { fontSize: 16, color: '#64748b', marginBottom: 30, textAlign: 'center' },
  input: {
    backgroundColor: 'white',
    padding: 14,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    color: primary,
  },
  loginButton: { backgroundColor: accent, padding: 16, borderRadius: 10 },
  loginButtonText: { color: 'white', fontWeight: '700', fontSize: 16, textAlign: 'center' },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: primary,
    alignItems: 'center',
  },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  cartButton: {
    backgroundColor: accent,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  cartText: { color: 'white', fontWeight: '700' },
  logoutButton: {
    backgroundColor: red,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutButtonText: { color: 'white', fontWeight: '700' },

  // Produtos
  productsContainer: { paddingBottom: 100, paddingHorizontal: 10 },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    width: width - 20,
    alignSelf: 'center',
    elevation: 3,
  },
  carousel: {
    width: width - 44,
    height: 180,
    marginBottom: 10,
    borderRadius: 10,
  },
  productImage: {
    width: width - 44,
    height: 180,
    borderRadius: 10,
    marginRight: 8,
  },
  productName: { fontSize: 16, fontWeight: '700', color: primary, textAlign: 'center' },
  productPrice: { fontSize: 14, color: '#64748b', marginVertical: 6, textAlign: 'center' },
  addButton: {
    backgroundColor: accent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: 'center',
  },
  addButtonText: { color: 'white', fontWeight: '600', fontSize: 15 },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: primary,
    padding: 14,
    alignItems: 'center',
  },
  bottomText: { color: 'white', fontSize: 12 },

  // Modal Carrinho
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', borderRadius: 15, padding: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: primary },
  emptyCartText: { textAlign: 'center', color: '#64748b', marginVertical: 30 },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  cartItemText: { color: primary, fontWeight: '600', flex: 1 },
  removeText: { color: '#ef4444', fontWeight: '600' },
  cartTotal: { marginTop: 20, textAlign: 'right', fontSize: 16, fontWeight: 'bold', color: primary },
  closeButton: { backgroundColor: primary, padding: 12, borderRadius: 10, marginTop: 15 },
  closeButtonText: { color: 'white', fontWeight: '700', textAlign: 'center' },
});