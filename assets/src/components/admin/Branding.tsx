import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

interface BrandingState {
  map: {
    latitude: number;
    longitude: number;
  };
  logoUrl: string;
  description: string;
  name: string;
  contact: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
}

const Branding: React.FC = () => {
  const [branding, setBranding] = useState<BrandingState>({
    map: {
      latitude: 0,
      longitude: 0
    },
    logoUrl: '',
    description: '',
    name: '',
    contact: {
      name: '',
      address: '',
      phone: '',
      email: ''
    }
  });
  const [showModal, toggleModal] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const response = await fetch('/api/branding', {
          cache: 'force-cache'
        });
        if (response.ok) {
          const data = await response.json();
          setBranding(data);
        }
      } catch (error) {
        console.error('Error fetching branding:', error);
      }
    };

    fetchBranding();
  }, []);

  const doUpdate = async () => {
    try {
      const response = await fetch('/api/branding', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(branding),
      });

      if (response.ok) {
        toggleModal(true);
        setErrors([]);
      } else {
        const data = await response.json();
        setErrors(data.fieldErrors || ['Failed to update branding']);
      }
    } catch (error) {
      console.error('Error updating branding:', error);
      setErrors(['An unexpected error occurred']);
    }
  };

  const updateState = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;

    setBranding(prevState => {
      const newState = { ...prevState };

      switch (id) {
        case 'latitude':
          newState.map.latitude = parseFloat(value) || 0;
          break;
        case 'longitude':
          newState.map.longitude = parseFloat(value) || 0;
          break;
        case 'contactName':
          newState.contact.name = value;
          break;
        case 'contactAddress':
          newState.contact.address = value;
          break;
        case 'contactPhone':
          newState.contact.phone = value;
          break;
        case 'contactEmail':
          newState.contact.email = value;
          break;
        default:
          (newState as any)[id] = value;
          break;
      }

      return newState;
    });
  };

  return (
    <div className="branding-form">
      <h2>B&amp;B details</h2>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Name</span>
        </div>
        <input 
          type="text" 
          className="form-control" 
          id="name" 
          value={branding.name} 
          onChange={updateState} 
          placeholder="Enter B&amp;B name" 
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Logo</span>
        </div>
        <input 
          type="text" 
          className="form-control" 
          id="logoUrl" 
          value={branding.logoUrl} 
          onChange={updateState} 
          placeholder="Enter image url" 
        />
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Description</span>
        </div>
        <textarea 
          className="form-control" 
          value={branding.description} 
          onChange={updateState} 
          id="description" 
          rows={5}
        ></textarea>
      </div>
      <br />
      <h2>Map details</h2>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Latitude</span>
        </div>
        <input 
          type="text" 
          className="form-control" 
          id="latitude" 
          value={branding.map.latitude} 
          onChange={updateState} 
          placeholder="Enter Latitude" 
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Longitude</span>
        </div>
        <input 
          type="text" 
          className="form-control" 
          id="longitude" 
          value={branding.map.longitude} 
          onChange={updateState} 
          placeholder="Enter Longitude" 
        />
      </div>
      <br />
      <h2>Contact details</h2>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Name</span>
        </div>
        <input 
          type="text" 
          className="form-control" 
          id="contactName" 
          value={branding.contact.name} 
          onChange={updateState} 
          placeholder="Enter Contact Name" 
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Address</span>
        </div>
        <input 
          type="text" 
          className="form-control" 
          id="contactAddress" 
          value={branding.contact.address} 
          onChange={updateState} 
          placeholder="Enter Address" 
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Phone</span>
        </div>
        <input 
          type="text" 
          className="form-control" 
          id="contactPhone" 
          value={branding.contact.phone} 
          onChange={updateState} 
          placeholder="Enter Phone Number" 
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Email</span>
        </div>
        <input 
          type="email" 
          className="form-control" 
          id="contactEmail" 
          value={branding.contact.email} 
          onChange={updateState} 
          placeholder="Enter Email Address" 
        />
      </div>
      <button 
        type="submit" 
        id="updateBranding" 
        className="btn btn-outline-primary" 
        onClick={doUpdate}
      >
        Submit
      </button>
      
      <ReactModal 
        isOpen={showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={() => toggleModal(false)}
        className="Modal"
      >
        <div className="form-row text-center">
          <div className="col-12">
            <p>Branding updated!</p>
            <button 
              className="btn btn-outline-primary" 
              onClick={() => toggleModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </ReactModal>

      {errors.length > 0 && (
        <div className="alert alert-danger" style={{ marginTop: "1rem" }}>
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Branding; 