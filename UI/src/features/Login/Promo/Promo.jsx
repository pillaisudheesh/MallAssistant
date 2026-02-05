import React from 'react';
import QRCode from '../../../components/QRCode/QRCode';

const Promo = () => {
  // supply a dynamic chat URL (e.g. include token/session)
  const chatUrl = "https://e2766c1cf298.ngrok-free.app/login";

  return (
    <div>
      <QRCode url={chatUrl} />
    </div>
  );
}

export default Promo
