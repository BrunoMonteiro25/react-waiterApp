import { Order } from '../../types/Order'
import { OrdersBoard } from '../OrdersBoard'
import { Container } from './styles'

const orders: Order[] = [
  {
    _id: '637462a46f203037575c0026',
    table: '123',
    status: 'WAITING',
    products: [
      {
        product: {
          name: 'Pizza quatro queijos',
          imagePath: '1668569091977-quatro-queijos.png',
          price: 40,
        },
        quantity: 3,
        _id: '637462a46f203037575c0027',
      },
      {
        product: {
          name: 'Coca-Cola',

          imagePath: '1668570172818-coca-cola.png',
          price: 7,
        },
        quantity: 2,
        _id: '637462a46f203037575c0028',
      },
    ],
  },
]

export function Orders() {
  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="👨‍🍳" title="Em preparção" orders={[]} />
      <OrdersBoard icon="✅" title="Pronto!" orders={[]} />
    </Container>
  )
}
