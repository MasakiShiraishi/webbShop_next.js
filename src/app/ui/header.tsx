import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Header() {
          return (
                    <header className="bg-neutral-100">
                              <div className="flex py-4 px-4">
                                        <Bars3Icon className="h-12 w-11" />
                                        <img className="ml-2 h-12 w-28" src="/webbshop.png" alt="Webb Shop" />
                                        <div className="ml-auto">
                                                  <ShoppingCartIcon className="h-12 w-11" />
                                        </div>
                              </div>
                    </header>                    
          );
}
