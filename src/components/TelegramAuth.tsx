"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TelegramAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
      const response = await fetch("/api/session");
     
      if (response.ok) {
        setIsAuthenticated(true);
      }
    
  };

  const authenticateUser = async () => {
    const webApp = (await import("@twa-dev/sdk")).default;

    webApp.ready();

    const initData = webApp.initData;
    console.log(initData)

    if (initData) {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initData }),
        });

        if (response.ok) {
          setIsAuthenticated(true);
          router.refresh();
        } else {
          console.error("Authentication failed");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        setIsAuthenticated(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      {isAuthenticated ? (
        <>
          <p>Authenticated!</p>
          <button
            onClick={() => router.push("/protected")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Access Protected Page
          </button>
        </>
      ) : (
        <div className="mx-auto">
          <p className="text-center py-3">
            You need to be an owner of this account
          </p>
          <button
            onClick={authenticateUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Authenticate
          </button>
        </div>
      )}
    </div>
  );
}
