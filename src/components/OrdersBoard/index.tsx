import { useState } from 'react'
import { Order } from '../../types/Order'
import { api } from '../../utils/api'
import { OrderModal } from '../OrderModal'
import { Board, OrdersContainer } from './styles'

interface OrdersBoardProps {
  icon: string
  title: string
  orders: Order[]
  onCancelOrder: (orderId: string) => void
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleOpenModal(order: Order) {
    setIsModalVisible(true)
    setSelectedOrder(order)
  }

  function handleCloseModal() {
    setIsModalVisible(false)
    setSelectedOrder(null)
  }

  async function handleCancelOrder() {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    await api.delete(`/orders/${selectedOrder?._id}`)

    onCancelOrder(selectedOrder!._id)
    setIsLoading(false)
    setIsModalVisible(false)
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              onClick={() => handleOpenModal(order)}
              type="button"
              key={order._id}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  )
}
