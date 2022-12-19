// eslint-disable-next-line
import { Routes, Route } from "react-router-dom";
import {
  Main,
  AddressPage,
  BlockPage,
  BlockTransactionsPage,
  TransactionPage,
  AllTransactionPage,
  AllBlocksPage,
  NotFound,
  ChartsPage,
} from "./pages/_index";
import { Header, SearchBar, Footer } from "./components/_index";

function App() {
  return (
    <div className="app">
      <Header />
      <SearchBar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Main />} />
        <Route path="/address/:params" element={<AddressPage />} />
        <Route path="/block/:params" element={<BlockPage />} />
        <Route path="/blocks" element={<AllBlocksPage />} />
        <Route path="/tx/:params" element={<TransactionPage />} />
        <Route path="/txs/:params" element={<BlockTransactionsPage />} />
        <Route path="/txs" element={<AllTransactionPage />} />
        <Route path="/charts" element={<ChartsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
