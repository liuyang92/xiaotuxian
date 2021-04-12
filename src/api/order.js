import request from '@/utils/request'

/**
 * 获取结算页面的信息（生成订单前的信息）
 * @returns Promise
 */
export const findOrderPre = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 获取再次购买的订单结算信息
 * @param {String} id - 订单ID
 * @returns
 */
export const findOrderRepurchase = (id) => {
  return request(`/member/order/repurchase/${id}`, 'get')
}

/**
 * 添加收货地址
 * @param {Object} address
 *    receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 1
 */
export const insertAddress = (address) => {
  return request('/member/address', 'post', address)
}

/**
 * 修改收货地址
 * @param {Object} address
 *    id:'',
 *    receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 1
 */
export const updateAddress = (address) => {
  return request(`/member/address/${address.id}`, 'put', address)
}

/**
 * 提交订单
 * @param {Object} order - 订单信息
 */
export const createOrder = (order) => {
  return request('/member/order', 'post', order)
}

/**
 * 获取订单详情
 * @param {String} orderId - 订单ID
 */
export const findOrderDetail = (orderId) => {
  return request(`/member/order/${orderId}`, 'get')
}

/**
 * 获取订单分页列表
 * @param {String} page - 页码
 * @param {String} pageSize - 每页条数
 * @param {String} orderState - 订单状态：1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 */
export const findOrderList = ({ page, pageSize, orderState }) => {
  return request('/member/order', 'get', { page, pageSize, orderState })
}

/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const cancelOrder = (orderId, cancelReason) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
export const delteOrder = (ids) => {
  return request('/member/order', 'delete', { ids })
}

/**
 * 确认收货
 * @param {String} id - 订单ID
 * @returns
 */
export const confirmOrder = (id) => {
  return request(`/member/order/${id}/receipt`, 'put')
}

/**
 * 查看物流
 * @param {String} id - 订单ID
 * @returns
 */
export const logisticsOrder = (id) => {
  return request(`/member/order/${id}/logistics`, 'get')
}
