import Link from "next/link";

export default function SearchTag(){
          return(
                    <ul className="flex flex-wrap items-center justify-center text-lg my-10 space-x-3 sm:space-x-10 space-y-6">
                    <Link href="/products">
                      <li className="border border-slate-500 bg-slate-100 hover:bg-sky-200 rounded-3xl py-1 px-4 mt-6">All products</li>
                    </Link>
                    <Link href="/products/mens-clothing">
                      <li className="border border-slate-500 bg-slate-100 hover:bg-sky-200 rounded-3xl py-1 px-4">Men&apos;s clothing</li>
                    </Link>
                    <Link href="/products/jewelery">
                      <li className="border border-slate-500 bg-slate-100 hover:bg-sky-200 rounded-3xl py-1 px-4">Jewelery</li>
                    </Link>
                    <Link href="/products/electronics">
                      <li className="border border-slate-500 bg-slate-100 hover:bg-sky-200 rounded-3xl py-1 px-4">Electronics</li>
                    </Link>
                    <Link href="/products/womens-clothing">
                      <li className="border border-slate-500 bg-slate-100 hover:bg-sky-200 rounded-3xl py-1 px-4">Women&apos;s clothing</li>
                    </Link>                    
                  </ul>
          )
}