import { XMarkIcon } from "@heroicons/react/24/outline";

interface CartProps{
          isOpen: boolean;
          onClose: () => void;
}

export default function Cart({ isOpen, onClose }:CartProps) {
          if (!isOpen) return null
          return (
                    <>
                    <div className="fixed inset-0 bg-black opacity-70 z-40" onClick={onClose}></div>
                    <div className="fixed top-4 right-4 h-5/6 z-50 w-11/12 bg-slate-50 py-4 px-2 border border-gray-200 shadow-md"> 
                    <div className="flex justify-between items-center">
                       <span className="text-2xl font-bold">Cart</span>
                       <XMarkIcon className="h-8 w-8 cursor-pointer" onClick={onClose} />
                    </div>
                       
                           <div className="flex justify-center mt-40">
                             <div className="text-center"> 
                              <h5 className="text-2xl text-white font-bold p-2 border-solid border-2 border-slate-950 rounded-3xl bg-blue-300">Proceed to Checkout</h5>
                             </div>
                    </div>
                    </div>                     
                    </>
          )
}