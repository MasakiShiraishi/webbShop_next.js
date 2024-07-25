'use client'
import { useEffect } from "react";

export default function sendOrder(){
          useEffect (() => {
                    if (window.location.pathname === '/order/sendOrder') {
                       const timer = setTimeout(() => {
                        window.location.href = '/';
                      }, 3000);
                      return () => clearTimeout(timer);
                    }
                  }, []);
          return(
                    <h4 className="text-3xl text-center mt-20">Thank you for your order.</h4>
          )
}