import React, { useState } from 'react';

interface ContactDetails {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface HotelContactProps {
  contactDetails?: ContactDetails;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
}

const HotelContact: React.FC<HotelContactProps> = ({ contactDetails }) => {
  const [contact, setContactDetails] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "", 
    description: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessages, setErrors] = useState<string[]>([]);

  const updateContact = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setContactDetails(prevContact => ({
      ...prevContact,
      [id]: value
    }));
  };

  const submitForm = async () => {
    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errorMessages || ['An error occurred while submitting your message']);
        return;
      }
      
      setSubmitted(true);
      setErrors([]);
    } catch (error) {
      console.error('Error submitting message:', error);
      setErrors(['An unexpected error occurred. Please try again later.']);
    }
  };

  let form: JSX.Element;
  let errors: JSX.Element = <></>;

  if (errorMessages.length > 0) {
    errors = (
      <div className="alert alert-danger" style={{ marginBottom: "5rem" }}>
        {errorMessages.map((value, id) => (
          <p key={id}>{value}</p>
        ))}
      </div>
    );
  }

  if (submitted) {
    form = (
      <div style={{ height: "412px" }}>
        <h2>Thanks for getting in touch {contact.name}!</h2>
        <p>We'll get back to you about</p>
        <p style={{ fontWeight: "bold" }}>{contact.subject}</p>
        <p>as soon as possible.</p>
      </div>
    );
  } else {
    form = (
      <form>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1"><span className="fa fa-id-card"></span></span>
          </div>
          <input 
            type="text" 
            data-testid="ContactName" 
            className="form-control" 
            placeholder="Name" 
            aria-label="Name" 
            id="name" 
            aria-describedby="basic-addon1" 
            onChange={updateContact} 
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1"><span className="fa fa-envelope"></span></span>
          </div>
          <input 
            type="text" 
            data-testid="ContactEmail" 
            className="form-control" 
            placeholder="Email" 
            aria-label="Email" 
            id="email" 
            aria-describedby="basic-addon1" 
            onChange={updateContact} 
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1"><span className="fa fa-phone"></span></span>
          </div>
          <input 
            type="text" 
            data-testid="ContactPhone" 
            className="form-control" 
            placeholder="Phone" 
            aria-label="Phone" 
            id="phone" 
            aria-describedby="basic-addon1" 
            onChange={updateContact} 
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1"><span className="fa fa-envelope"></span></span>
          </div>
          <input 
            type="text" 
            data-testid="ContactSubject" 
            className="form-control" 
            placeholder="Subject" 
            aria-label="Subject" 
            id="subject" 
            aria-describedby="basic-addon1" 
            onChange={updateContact} 
          />
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Message</span>
          </div>
          <textarea 
            data-testid="ContactDescription" 
            className="form-control" 
            aria-label="Description" 
            id="description" 
            rows={5} 
            onChange={updateContact}
          ></textarea>
        </div>
        <br />
        {errors}
        <button 
          type='button' 
          className='btn btn-outline-primary float-right' 
          id="submitContact" 
          onClick={submitForm}
        >
          Submit
        </button>
      </form>
    );
  }

  if (contactDetails) {
    return (
      <div className='row contact'>
        <div className='col-sm-1'></div>
        <div className='col-sm-5'>
          {form}
        </div>
        <div className='col-sm-5'>
          <p><span className="fa fa-home"></span> {contactDetails.name}</p>
          <p><span></span> {contactDetails.address}</p>
          <p><span className="fa fa-phone"></span> {contactDetails.phone}</p>
          <p><span className="fa fa-envelope"></span> {contactDetails.email}</p>
        </div>
        <div className='col-sm-1'></div>
      </div>
    );
  } else {
    return <div className="row contact"></div>;
  }
};

export default HotelContact; 