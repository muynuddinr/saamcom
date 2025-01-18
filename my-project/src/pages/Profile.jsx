import React, { useState } from 'react';

const Profile = () => {
  // Add state for user data and preferences
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false
  });
  
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    membershipType: 'Premium Member',
    profileImage: 'https://via.placeholder.com/150',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  // Add new state for orders
  const [orders, setOrders] = useState([
    {
      id: '123456',
      items: 3,
      total: 149.99,
      status: 'Delivered',
      date: 'March 15, 2024'
    },
    {
      id: '223456',
      items: 2,
      total: 89.99,
      status: 'Delivered',
      date: 'March 16, 2024'
    }
  ]);
  const [showAllOrders, setShowAllOrders] = useState(false);

  // Add state for order details modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add new state for payment methods and addresses
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      last4: '4242',
      expiryDate: '12/24',
      type: 'visa'
    }
  ]);
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      type: 'Home',
      street: '123 Main Street',
      apt: '101',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105'
    },
    {
      id: '2',
      type: 'Work',
      street: '456 Market Street',
      apt: '201',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105'
    }
  ]);

  // Handlers for various interactions
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes
      // Here you would typically make an API call to update the user data
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new handlers
  const handleViewAllOrders = (e) => {
    e.preventDefault();
    setShowAllOrders(true);
  };

  const handleViewOrderDetails = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Add new handlers
  const handleAddPayment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPayment = {
      id: Date.now().toString(),
      last4: formData.get('cardNumber').slice(-4),
      expiryDate: formData.get('expiryDate'),
      type: 'visa'
    };
    setPaymentMethods([...paymentMethods, newPayment]);
    setIsAddPaymentModalOpen(false);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAddress = {
      id: Date.now().toString(),
      type: formData.get('type'),
      street: formData.get('street'),
      apt: formData.get('apt'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip: formData.get('zip')
    };
    setAddresses([...addresses, newAddress]);
    setIsAddAddressModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </label>
              </div>
              <div className="ml-6">
                {editMode ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                    <p className="text-gray-600">{userData.membershipType}</p>
                    <p className="text-gray-600">{userData.email}</p>
                    <p className="text-gray-600">{userData.phone}</p>
                  </>
                )}
                <div className="mt-2 flex items-center">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                    Verified Buyer
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={handleEditToggle}
                className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {editMode ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {showAllOrders ? 'All Orders' : 'Recent Orders'}
                </h2>
                {!showAllOrders && (
                  <a 
                    href="#" 
                    onClick={handleViewAllOrders}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View All Orders
                  </a>
                )}
              </div>
              <div className="space-y-4">
                {orders.slice(0, showAllOrders ? orders.length : 2).map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Order #{order.id}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{order.items} items • ${order.total}</p>
                      <p className="mt-1">Delivered on {order.date}</p>
                    </div>
                    <button 
                      onClick={() => handleViewOrderDetails(order.id)}
                      className="mt-3 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      View Order Details
                    </button>
                  </div>
                ))}
              </div>
              {showAllOrders && orders.length > 2 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowAllOrders(false)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    Show Less
                  </button>
                </div>
              )}
            </div>

            {/* Saved Addresses */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                <button 
                  onClick={() => setIsAddAddressModalOpen(true)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Add New Address
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{address.type}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.street}, {address.apt}
                          <br />
                          {address.city}, {address.state} {address.zip}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Account Summary */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Account Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-medium text-gray-900">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reward Points</span>
                  <span className="font-medium text-gray-900">2,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Wishlist Items</span>
                  <span className="font-medium text-gray-900">12</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
                <button 
                  onClick={() => setIsAddPaymentModalOpen(true)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Add New
                </button>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="ml-3 text-gray-900">•••• {payment.last4}</span>
                    </div>
                    <span className="text-sm text-gray-600">Expires {payment.expiryDate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white shadow-sm rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email Notifications</span>
                  <button
                    onClick={() => toggleNotification('email')}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                      notifications.email ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">SMS Updates</span>
                  <button
                    onClick={() => toggleNotification('sms')}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                      notifications.sms ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        notifications.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Order Details #{selectedOrder.id}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Order Date</span>
                  <span className="text-gray-900">{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Items</span>
                  <span className="text-gray-900">{selectedOrder.items}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-gray-900 font-medium">${selectedOrder.total}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={() => {
                    // Add tracking or support functionality here
                    console.log('Track order or contact support');
                  }}
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {isAddPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add Payment Method</h2>
              <button
                onClick={() => setIsAddPaymentModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  pattern="\d{16}"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  required
                  pattern="\d{2}/\d{2}"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  required
                  pattern="\d{3,4}"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="123"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddPaymentModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Payment Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {isAddAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
              <button
                onClick={() => setIsAddAddressModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Type</label>
                <input
                  type="text"
                  name="type"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Home, Work, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                <input
                  type="text"
                  name="street"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Apartment/Suite</label>
                <input
                  type="text"
                  name="apt"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  required
                  pattern="\d{5}"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddAddressModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
