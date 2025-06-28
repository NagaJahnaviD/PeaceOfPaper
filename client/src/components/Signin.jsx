import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function Signin() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}

export default Signin;
