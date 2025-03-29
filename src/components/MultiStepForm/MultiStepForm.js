import React from 'react';
import '../../styles/MultiStepForm.css';

// Step components
const ShippingForm = ({ data, onChange }) => (
  <div className="form-step">
    <h2>Shipping Information</h2>
    <div className="form-group">
      <label htmlFor="fullName">Full Name</label>
      <input
        type="text"
        id="fullName"
        value={data.fullName || ''}
        onChange={(e) => onChange({ fullName: e.target.value })}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        value={data.address || ''}
        onChange={(e) => onChange({ address: e.target.value })}
        required
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={data.city || ''}
          onChange={(e) => onChange({ city: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          value={data.state || ''}
          onChange={(e) => onChange({ state: e.target.value })}
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
          value={data.zipCode || ''}
          onChange={(e) => onChange({ zipCode: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          value={data.country || 'US'}
          onChange={(e) => onChange({ country: e.target.value })}
          required
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="UK">United Kingdom</option>
          <option value="AU">Australia</option>
        </select>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        value={data.phone || ''}
        onChange={(e) => onChange({ phone: e.target.value })}
        required
      />
    </div>
  </div>
);

const BillingForm = ({ data, onChange, sameAsShipping, onSameAsShippingChange, shippingData }) => (
  <div className="form-step">
    <h2>Billing Information</h2>
    <div className="form-group checkbox-group">
      <input
        type="checkbox"
        id="sameAsShipping"
        checked={sameAsShipping}
        onChange={(e) => onSameAsShippingChange(e.target.checked)}
      />
      <label htmlFor="sameAsShipping">Same as shipping address</label>
    </div>
    
    {!sameAsShipping && (
      <>
        <div className="form-group">
          <label htmlFor="billingFullName">Full Name</label>
          <input
            type="text"
            id="billingFullName"
            value={data.fullName || ''}
            onChange={(e) => onChange({ fullName: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="billingAddress">Address</label>
          <input
            type="text"
            id="billingAddress"
            value={data.address || ''}
            onChange={(e) => onChange({ address: e.target.value })}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="billingCity">City</label>
            <input
              type="text"
              id="billingCity"
              value={data.city || ''}
              onChange={(e) => onChange({ city: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="billingState">State</label>
            <input
              type="text"
              id="billingState"
              value={data.state || ''}
              onChange={(e) => onChange({ state: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="billingZipCode">ZIP Code</label>
            <input
              type="text"
              id="billingZipCode"
              value={data.zipCode || ''}
              onChange={(e) => onChange({ zipCode: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="billingCountry">Country</label>
            <select
              id="billingCountry"
              value={data.country || 'US'}
              onChange={(e) => onChange({ country: e.target.value })}
              required
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>
      </>
    )}
  </div>
);

const ReviewForm = ({ shippingData, billingData, sameAsBilling }) => (
  <div className="form-step">
    <h2>Review Order</h2>
    <div className="review-section">
      <h3>Shipping Information</h3>
      <div className="review-info">
        <p>{shippingData.fullName}</p>
        <p>{shippingData.address}</p>
        <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
        <p>{shippingData.country}</p>
        <p>Phone: {shippingData.phone}</p>
      </div>
    </div>
    
    <div className="review-section">
      <h3>Billing Information</h3>
      {sameAsBilling ? (
        <p>Same as shipping address</p>
      ) : (
        <div className="review-info">
          <p>{billingData.fullName}</p>
          <p>{billingData.address}</p>
          <p>{billingData.city}, {billingData.state} {billingData.zipCode}</p>
          <p>{billingData.country}</p>
        </div>
      )}
    </div>
  </div>
);

function MultiStepForm({ currentStep, onStepChange, checkoutData, onDataChange }) {
  const handleShippingChange = (data) => {
    onDataChange('shipping', data);
  };
  
  const handleBillingChange = (data) => {
    onDataChange('billing', data);
  };
  
  const handleSameAsBillingChange = (value) => {
    onDataChange('sameAsBilling', value);
  };
  
  const goToStep = (step) => {
    onStepChange(step);
  };
  
  return (
    <div className="multi-step-form">
      <div className="form-steps-indicator">
        <div 
          className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}
          onClick={() => goToStep(1)}
        >
          <div className="step-number">1</div>
          <div className="step-label">Shipping</div>
        </div>
        <div className="step-connector"></div>
        <div 
          className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}
          onClick={() => goToStep(2)}
        >
          <div className="step-number">2</div>
          <div className="step-label">Billing</div>
        </div>
        <div className="step-connector"></div>
        <div 
          className={`step-indicator ${currentStep >= 3 ? 'active' : ''}`}
          onClick={() => goToStep(3)}
        >
          <div className="step-number">3</div>
          <div className="step-label">Payment</div>
        </div>
        <div className="step-connector"></div>
        <div 
          className={`step-indicator ${currentStep >= 4 ? 'active' : ''}`}
          onClick={() => goToStep(4)}
        >
          <div className="step-number">4</div>
          <div className="step-label">Review</div>
        </div>
      </div>
      
      <div className="form-content">
        {currentStep === 1 && (
          <ShippingForm 
            data={checkoutData.shipping} 
            onChange={handleShippingChange} 
          />
        )}
        
        {currentStep === 2 && (
          <BillingForm 
            data={checkoutData.billing}
            onChange={handleBillingChange}
            sameAsShipping={checkoutData.sameAsBilling}
            onSameAsShippingChange={handleSameAsBillingChange}
            shippingData={checkoutData.shipping}
          />
        )}
        
        {currentStep === 4 && (
          <ReviewForm 
            shippingData={checkoutData.shipping}
            billingData={checkoutData.billing}
            sameAsBilling={checkoutData.sameAsBilling}
          />
        )}
      </div>
      
      <div className="form-navigation">
        {currentStep > 1 && (
          <button 
            className="back-button"
            onClick={() => goToStep(currentStep - 1)}
          >
            Back
          </button>
        )}
        
        {currentStep < 4 && (
          <button 
            className="next-button"
            onClick={() => goToStep(currentStep + 1)}
          >
            {currentStep === 3 ? 'Review Order' : 'Continue'}
          </button>
        )}
        
        {currentStep === 4 && (
          <button className="place-order-button">
            Place Order
          </button>
        )}
      </div>
    </div>
  );
}

export default MultiStepForm;
