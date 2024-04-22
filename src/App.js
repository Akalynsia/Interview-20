import React, { useMemo, useState } from "react";
import axios from "axios";

const CURRENCY_NAME_TO_CODE = {
  "United Arab Emirates Dirham": "AED",
  "Afghan Afghani": "AFN",
  "Albanian Lek": "ALL",
  "Armenian Dram": "AMD",
  "Netherlands Antillean Guilder": "ANG",
  "Angolan Kwanza": "AOA",
  "Argentine Peso": "ARS",
  "Australian Dollar": "AUD",
  "Aruban Florin": "AWG",
  "Azerbaijani Manat": "AZN",
  "Bosnia-Herzegovina Convertible Mark": "BAM",
  "Barbadian Dollar": "BBD",
  "Bangladeshi Taka": "BDT",
  "Bulgarian Lev": "BGN",
  "Bahraini Dinar": "BHD",
  "Burundian Franc": "BIF",
  "Bermudan Dollar": "BMD",
  "Brunei Dollar": "BND",
  "Bolivian Boliviano": "BOB",
  "Brazilian Real": "BRL",
  "Bahamian Dollar": "BSD",
  Bitcoin: "BTC",
  "Bhutanese Ngultrum": "BTN",
  "Botswanan Pula": "BWP",
  "Belarusian Ruble": "BYN",
  "Belize Dollar": "BZD",
  "Canadian Dollar": "CAD",
  "Congolese Franc": "CDF",
  "Swiss Franc": "CHF",
  "Chilean Unit of Account (UF)": "CLF",
  "Chilean Peso": "CLP",
  "Chinese Yuan (Offshore)": "CNH",
  "Chinese Yuan": "CNY",
  "Colombian Peso": "COP",
  "Costa Rican Colón": "CRC",
  "Cuban Convertible Peso": "CUC",
  "Cuban Peso": "CUP",
  "Cape Verdean Escudo": "CVE",
  "Czech Republic Koruna": "CZK",
  "Djiboutian Franc": "DJF",
  "Danish Krone": "DKK",
  "Dominican Peso": "DOP",
  "Algerian Dinar": "DZD",
  "Egyptian Pound": "EGP",
  "Eritrean Nakfa": "ERN",
  "Ethiopian Birr": "ETB",
  Euro: "EUR",
  "Fijian Dollar": "FJD",
  "Falkland Islands Pound": "FKP",
  "British Pound Sterling": "GBP",
  "Georgian Lari": "GEL",
  "Guernsey Pound": "GGP",
  "Ghanaian Cedi": "GHS",
  "Gibraltar Pound": "GIP",
  "Gambian Dalasi": "GMD",
  "Guinean Franc": "GNF",
  "Guatemalan Quetzal": "GTQ",
  "Guyanaese Dollar": "GYD",
  "Hong Kong Dollar": "HKD",
  "Honduran Lempira": "HNL",
  "Croatian Kuna": "HRK",
  "Haitian Gourde": "HTG",
  "Hungarian Forint": "HUF",
  "Indonesian Rupiah": "IDR",
  "Israeli New Sheqel": "ILS",
  "Manx pound": "IMP",
  "Indian Rupee": "INR",
  "Iraqi Dinar": "IQD",
  "Iranian Rial": "IRR",
  "Icelandic Króna": "ISK",
  "Jersey Pound": "JEP",
  "Jamaican Dollar": "JMD",
  "Jordanian Dinar": "JOD",
  "Japanese Yen": "JPY",
  "Kenyan Shilling": "KES",
  "Kyrgystani Som": "KGS",
  "Cambodian Riel": "KHR",
  "Comorian Franc": "KMF",
  "North Korean Won": "KPW",
  "South Korean Won": "KRW",
  "Kuwaiti Dinar": "KWD",
  "Cayman Islands Dollar": "KYD",
  "Kazakhstani Tenge": "KZT",
  "Laotian Kip": "LAK",
  "Lebanese Pound": "LBP",
  "Sri Lankan Rupee": "LKR",
  "Liberian Dollar": "LRD",
  "Lesotho Loti": "LSL",
  "Libyan Dinar": "LYD",
  "Moroccan Dirham": "MAD",
  "Moldovan Leu": "MDL",
  "Malagasy Ariary": "MGA",
  "Macedonian Denar": "MKD",
  "Myanma Kyat": "MMK",
  "Mongolian Tugrik": "MNT",
  "Macanese Pataca": "MOP",
  "Mauritanian Ouguiya": "MRU",
  "Mauritian Rupee": "MUR",
  "Maldivian Rufiyaa": "MVR",
  "Malawian Kwacha": "MWK",
  "Mexican Peso": "MXN",
  "Malaysian Ringgit": "MYR",
  "Mozambican Metical": "MZN",
  "Namibian Dollar": "NAD",
  "Nigerian Naira": "NGN",
  "Nicaraguan Córdoba": "NIO",
  "Norwegian Krone": "NOK",
  "Nepalese Rupee": "NPR",
  "New Zealand Dollar": "NZD",
  "Omani Rial": "OMR",
  "Panamanian Balboa": "PAB",
  "Peruvian Nuevo Sol": "PEN",
  "Papua New Guinean Kina": "PGK",
  "Philippine Peso": "PHP",
  "Pakistani Rupee": "PKR",
  "Polish Zloty": "PLN",
  "Paraguayan Guarani": "PYG",
  "Qatari Rial": "QAR",
  "Romanian Leu": "RON",
  "Serbian Dinar": "RSD",
  "Russian Ruble": "RUB",
  "Rwandan Franc": "RWF",
  "Saudi Riyal": "SAR",
  "Solomon Islands Dollar": "SBD",
  "Seychellois Rupee": "SCR",
  "Sudanese Pound": "SDG",
  "Swedish Krona": "SEK",
  "Singapore Dollar": "SGD",
  "Saint Helena Pound": "SHP",
  "Sierra Leonean Leone": "SLL",
  "Somali Shilling": "SOS",
  "Surinamese Dollar": "SRD",
  "South Sudanese Pound": "SSP",
  "São Tomé and Príncipe Dobra (pre-2018)": "STD",
  "São Tomé and Príncipe Dobra": "STN",
  "Salvadoran Colón": "SVC",
  "Syrian Pound": "SYP",
  "Swazi Lilangeni": "SZL",
  "Thai Baht": "THB",
  "Tajikistani Somoni": "TJS",
  "Turkmenistani Manat": "TMT",
  "Tunisian Dinar": "TND",
  "Tongan Pa'anga": "TOP",
  "Turkish Lira": "TRY",
  "Trinidad and Tobago Dollar": "TTD",
  "New Taiwan Dollar": "TWD",
  "Tanzanian Shilling": "TZS",
  "Ukrainian Hryvnia": "UAH",
  "Ugandan Shilling": "UGX",
  "United States Dollar": "USD",
  "Uruguayan Peso": "UYU",
  "Uzbekistan Som": "UZS",
  "Venezuelan Bolívar Soberano": "VES",
  "Vietnamese Dong": "VND",
  "Vanuatu Vatu": "VUV",
  "Samoan Tala": "WST",
  "CFA Franc BEAC": "XAF",
  "East Caribbean Dollar": "XCD",
  "Special Drawing Rights": "XDR",
  "CFA Franc BCEAO": "XOF",
  "CFP Franc": "XPF",
  "Yemeni Rial": "YER",
  "South African Rand": "ZAR",
  "Zambian Kwacha": "ZMW",
  "Zimbabwean Dollar": "ZWL",
};

function App() {
  return <CurrencyConverter />;
}

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const API_KEY = "f251c26f8bee0c3d85ce653d";
    const endpoint = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

    try {
      const response = await axios.get(endpoint);
      console.log("Response data:", response.data);

      const rates = response.data.conversion_rates;
      console.log("Rates:", rates);

      const fromRate = rates[fromCurrency];
      const toRate = rates[toCurrency];

      if (!fromRate || !toRate) {
        throw new Error("Invalid currency code.");
      }

      const converted = (amount / fromRate) * toRate;
      console.log("Converted amount:", converted);

      setConvertedAmount(converted.toFixed(2));
    } catch (error) {
      setError(
        "Dönüşüm yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    }

    setLoading(false);
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <form onSubmit={handleFormSubmit}>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Miktar"
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          required
        />
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        >
          {Object.entries(CURRENCY_NAME_TO_CODE).map(([name, code]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        >
          {Object.entries(CURRENCY_NAME_TO_CODE).map(([name, code]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="block w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Dönüştür
        </button>
      </form>
      {loading && <p className="text-center">Yükleniyor...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {convertedAmount && (
        <p className="text-center">
          {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default App;
