import Head from 'next/head';
import { useState } from 'react';

export default function TradeDetails() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState();

  const handleSearch = async () => {
    const res = await fetch('/api/search?query=' + query);
    const data = await res.json();
    setResults(data);
  };

  return (
    <form onSubmit={e=>{e.preventDefault(),handleSearch()}} className='w-full flex justify-center relative'>
      <Head><title>{query}</title></Head>
    <div className="h-full   p10 w-full  flex flex-col gap-5 justify-center rounded shadow fixed top-0">
      <div className="h-fit  bg-white p-6 ">
        <h1 className="text-2xl font-bold mb-4">Enter Trade Id</h1>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      
      <div className=" h-full w-full overflow-auto flex justify-center itemscenter gap-5">
       {results?.length?  <TradeDashboard trades={results}/>:<div>not found</div>}
        </div>
    </div>
    </form>
  );
}

 function TradeDashboard({ trades }) {
  const fieldsToShow = [
    "TradeID",
    "Counterparty",
    "ConfirmationTimestamp",
    "ConfirmationMethod",
    "ConfirmationStatus",
  ];

  return (
    <div className="w-full mt overflow-auto  bg-gradient-to-br from-slate-100 to-blue-50 py-10 px-6 rounded-md">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Found Trade Details
      </h1>

<div className='hfull '>

      {trades.map((item) => (
        <div  className="mb-4  hfull">
         
          <div className="flex items-center justify-between flex-wrap gap-4"> 
            {fieldsToShow.map((fieldKey) => (
              <div
                key={fieldKey}
                className="bg-white border flex-1 border-gray-200 rounded-xl shadow p-5 hover:shadow-md transition"
              >
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {fieldKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
                <div className="text-sm font-semibold text-gray-800 break-all">
                  {item[fieldKey]?.toString() || "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}




