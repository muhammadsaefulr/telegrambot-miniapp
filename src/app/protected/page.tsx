"use client"
import React, { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

interface UserTypes {
  id: number;
  username: string,
  first_name?: string,
  last_name?: string,
  is_premium?: boolean,
  language_code: string,
}

export default function Home() {

  const [userData, setUserData] = useState<UserTypes | null>(null)
  
  useEffect(() => {
    if(WebApp.initDataUnsafe.user){
      setUserData(WebApp.initDataUnsafe.user as UserTypes);
    }
  }, [])

  // WebApp.showAlert("Hello There, Im Learning Telegram webaps");

  return (
    <div className="p-4">
      <div className="">
        <p>Username: {userData?.username}</p>
        <p>Is Premium: {userData?.is_premium}</p>
        <p>Language Code: {userData?.language_code}</p>
      </div>
    </div>
  );
}
