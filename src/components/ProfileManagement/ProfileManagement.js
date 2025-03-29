import React, { useState } from 'react';
import '../../styles/ProfileManagement.css';

function ProfileManagement({ userData, onProfileUpdate }) {
  const [activeSection, setActiveSection] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone
  });
  const [addresses, setAddresses] = useState(userData.addresses);
  const [paymentMethods, setPaymentMethods] = useState(userData.paymentMethods);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    isDefault: false
  });
  
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value
    });
  };
  
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    onProfileUpdate({ ...userData, ...personalInfo });
    alert('Personal information updated successfully!');
  };
  
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (editingAddress !== null) {
      // Editing existing address
      const updatedAddresses = [...addresses];
      if (type === 'checkbox') {
        updatedAddresses[editingAddress] = {
          ...updatedAddresses[editingAddress],
          [name]: checked
        };
        
        // If setting as default, update other addresses
        if (name === 'isDefault' && checked) {
          updatedAddresses.forEach((addr, index) => {
            if (index !== editingAddress) {
              updatedAddresses[index] = { ...addr, isDefault: false };
            }
          });
        }
      } else {
        updatedAddresses[editingAddress] = {
          ...updatedAddresses[editingAddress],
          [name]: value
        };
      }
      setAddresses(updatedAddresses);
    } else {
      // Adding new address
      if (type === 'checkbox') {
        setNewAddress({
          ...newAddress,
          [name]: checked
        });
        
        // If setting as default, update other addresses
        if (name === 'isDefault' && checked) {
          const updatedAddresses = addresses.map(addr => ({
            ...addr,
            isDefault: false
          }));
          setAddresses(updatedAddresses);
        }
      } else {
        setNewAddress({
          ...newAddress,
          [name]: value
        });
      }
    }
  };
  
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddress !== null) {
      // Update existing address
      onProfileUpdate({
        ...userData,
        addresses
      });
      setEditingAddress(null);
    } else {
      // Add new address
      const updatedAddresses = [...addresses, { ...newAddress, id: Date.now().toString() }];
      setAddresses(updatedAddresses);
      onProfileUpdate({
        ...userData,
        addresses: updatedAddresses
      });
      setNewAddress({
        type: 'Home',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        isDefault: false
      });
    }
  };
  
  const handleRemoveAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
    onProfileUpdate({
      ...userData,
      addresses: updatedAddresses
    });
    
    if (editingAddress === index) {
      setEditingAddress(null);
    }
  };
  
  const handleEditAddress = (index) => {
    setEditingAddress(index);
  };
  
  const handleCancelEdit = () => {
    setEditingAddress(null);
    setAddresses(userData.addresses);
  };
  
  return (
    <div className="profile-management">
      <div className="profile-tabs">
        <button 
          className={`profile-tab ${activeSection === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveSection('personal')}
        >
          Personal Information
        </button>
        <button 
          className={`profile-tab ${activeSection === 'addresses' ? 'active' : ''}`}
          onClick={() => setActiveSection('addresses')}
        >
          Address Book
        </button>
        <button 
          className={`profile-tab ${activeSection === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveSection('payment')}
        >
          Payment Methods
        </button>
      </div>
      
      <div className="profile-content">
        {activeSection === 'personal' && (
          <div className="personal-info">
            <h2>Personal Information</h2>
            <form onSubmit={handlePersonalInfoSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-button">Save Changes</button>
              </div>
            </form>
          </div>
        )}
        
        {activeSection === 'addresses' && (
          <div className="address-book">
            <h2>Address Book</h2>
            
            <div className="addresses-list">
              {addresses.map((address, index) => (
                <div key={address.id} className="address-card">
                  {editingAddress === index ? (
                    <form onSubmit={handleAddressSubmit}>
                      <div className="form-group">
                        <label htmlFor="type">Address Type</label>
                        <select 
                          id="type"
                          name="type"
                          value={address.type}
                          onChange={handleAddressChange}
                        >
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="street">Street Address</label>
                        <input 
                          type="text" 
                          id="street"
                          name="street"
                          value={address.street}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="city">City</label>
                          <input 
                            type="text" 
                            id="city"
                            name="city"
                            value={address.city}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="state">State</label>
                          <input 
                            type="text" 
                            id="state"
                            name="state"
                            value={address.state}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="zipCode">ZIP Code</label>
                          <input 
                            type="text" 
                            id="zipCode"
                            name="zipCode"
                            value={address.zipCode}
                            onChange={handleAddressChange}
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="country">Country</label>
                          <select 
                            id="country"
                            name="country"
                            value={address.country}
                            onChange={handleAddressChange}
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="form-group checkbox-group">
                        <input 
                          type="checkbox" 
                          id="isDefault"
                          name="isDefault"
                          checked={address.isDefault}
                          onChange={handleAddressChange}
                        />
                        <label htmlFor="isDefault">Set as default address</label>
                      </div>
                      
                      <div className="form-actions">
                        <button type="submit" className="save-button">Save Address</button>
                        <button 
                          type="button" 
                          className="cancel-button"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="address-header">
                        <div className="address-type">{address.type}</div>
                        {address.isDefault && <div className="default-badge">Default</div>}
                      </div>
                      
                      <div className="address-details">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                        <p>{address.country}</p>
                      </div>
                      
                      <div className="address-actions">
                        <button 
                          className="edit-button"
                          onClick={() => handleEditAddress(index)}
                        >
                          Edit
                        </button>
                        <button 
                          className="remove-button"
                          onClick={() => handleRemoveAddress(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            
            {editingAddress === null && (
              <div className="add-address">
                <h3>Add New Address</h3>
                <form onSubmit={handleAddressSubmit}>
                  <div className="form-group">
                    <label htmlFor="newType">Address Type</label>
                    <select 
                      id="newType"
                      name="type"
                      value={newAddress.type}
                      onChange={handleAddressChange}
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newStreet">Street Address</label>
                    <input 
                      type="text" 
                      id="newStreet"
                      name="street"
                      value={newAddress.street}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="newCity">City</label>
                      <input 
                        type="text" 
                        id="newCity"
                        name="city"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newState">State</label>
                      <input 
                        type="text" 
                        id="newState"
                        name="state"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="newZipCode">ZIP Code</label>
                      <input 
                        type="text" 
                        id="newZipCode"
                        name="zipCode"
                        value={newAddress.zipCode}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newCountry">Country</label>
                      <select 
                        id="newCountry"
                        name="country"
                        value={newAddress.country}
                        onChange={handleAddressChange}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <input 
                      type="checkbox" 
                      id="newIsDefault"
                      name="isDefault"
                      checked={newAddress.isDefault}
                      onChange={handleAddressChange}
                    />
                    <label htmlFor="newIsDefault">Set as default address</label>
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" className="save-button">Add Address</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'payment' && (
          <div className="payment-methods">
            <h2>Payment Methods</h2>
            
            <div className="payment-list">
              {paymentMethods.map((payment, index) => (
                <div key={payment.id} className="payment-card">
                  <div className="payment-header">
                    <div className="payment-type">{payment.type}</div>
                    {payment.isDefault && <div className="default-badge">Default</div>}
                  </div>
                  
                  <div className="payment-details">
                    <p>{payment.cardNumber}</p>
                    <p>Expires: {payment.expiryDate}</p>
                  </div>
                  
                  <div className="payment-actions">
                    <button className="edit-button">Edit</button>
                    <button className="remove-button">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="add-payment">
              <button className="add-payment-button">Add Payment Method</button>
              <p className="security-note">
                <span className="security-icon">🔒</span>
                Your payment information is securely stored and encrypted.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileManagement;
