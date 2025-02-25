import React, { useEffect, useState } from 'react';

interface MessageProps {
  messageId: number;
  closeMessage: () => void;
  refreshMessageList: () => void;
}

interface MessageDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  read: boolean;
}

const Message: React.FC<MessageProps> = ({ messageId, closeMessage, refreshMessageList }) => {
  const [message, setMessage] = useState<MessageDetails | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`/api/admin/messages/${messageId}`);
        if (response.ok) {
          const data = await response.json();
          setMessage(data);
          
          // Mark as read if not already
          if (data && !data.read) {
            markAsRead();
          }
        }
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchMessage();
  }, [messageId]);

  const markAsRead = async () => {
    try {
      await fetch(`/api/admin/messages/${messageId}/read`, {
        method: 'PUT',
      });
      refreshMessageList();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  if (!message) {
    return <div>Loading message...</div>;
  }

  return (
    <div className="row message-detail">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-sm-1">
                <button 
                  type="button" 
                  className="btn btn-outline-primary" 
                  onClick={closeMessage}
                >
                  Back
                </button>
              </div>
              <div className="col-sm-11">
                <h4>{message.subject}</h4>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12">
                <p>From: {message.name} ({message.email})</p>
                {message.phone && <p>Phone: {message.phone}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <p>{message.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message; 