import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import ContactDetails from "./Pages/ContactDetails/ContactDetails";
import Version from "./Pages/Controls/Version";
import GameSetting from "./Pages/GameSetting/GameSetting";
import AddCash from "./Pages/Payment/AddCash";
// import Bet from "./Pages/Payment/Bet";
import History from "./Pages/Payment/History";
// import Payout from "./Pages/Payment/Payout";
// import Win from "./Pages/Payment/Win";
// import LivePlayerApp from "./Pages/Player/LivePlayerApp";
// import LivePlayerGame from "./Pages/Player/LivePlayerGame";
import PlayerBanned from "./Pages/Player/PlayerBanned";
// import AndroidPlayer from "./Pages/Player/AndroidPlayer";
// import IosPlayer from "./Pages/Player/IosPlayer";
// import PendingKycPlayer from "./Pages/Player/PendingKycPlayer";
import PlayerList from "./Pages/Player/PlayerList";
// import HistoryReports from "./Pages/Reports/HistoryReports";
// import PlayerReports from "./Pages/Reports/PlayerReports";
import SendNotification from "./Pages/Controls/SendNotification";
import AdminList from "./Pages/Admin/AdminList";
import AccessUser from "./Pages/Admin/AccessUser";
import CoinPackage from "./Pages/Controls/CoinPackage";
import Social from "./Pages/Controls/Social";
import Notification from "./Pages/Controls/Notification";
import BotForm from "./Pages/Controls/BotForm";
import RoomTier from "./Pages/Controls/RoomTier";
import RestrictedArea from "./Pages/Controls/RestrictedArea";
import Bonus from "./Pages/GameSetting/Bonus";
import GameHandle from "./Pages/GameSetting/GameHandle";
import GameVersion from "./Pages/GameSetting/GameVersion";
import Withdraw from "./Pages/GameSetting/Withdraw";
import AddMoney from "./Pages/GameSetting/AddMoney";

// income route
import IncomeDetails from "./Pages/Income/IncomeDetails";
// import BlockBlastIncome from "./Pages/Income/BlockBlastIncome";
// import CandyCreamIncome from "./Pages/Income/CandyCreamIncome";
// import LogicLineIncome from "./Pages/Income/LogicLineIncome";
// import SmashBlockIncome from "./Pages/Income/SmashBlockIncome";
// import TicTacToeIncome from "./Pages/Income/TicTacToeIncome";
// import WordBookIncome from "./Pages/Income/WordBookIncome";
// import NumberPuzzle2248Income from "./Pages/Income/NumberPuzzle2248Income";
// import ChessGameBitIncome from "./Pages/Income/ChessGameBitIncome";
import SeparateNotification from "./Pages/Controls/SeparateNotification";
import GameList from "./Pages/Game/GameList";
import SpinWheel from "./Pages/Controls/SpinWheel";
import CoinShop from "./Pages/Controls/CoinShop";
import GuestUser from "./Pages/Player/GuestUser";
import CustomerList from "./component/CustomerList";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer-list" element={<CustomerList />} />

       
      </Routes>
    </div>
  );
}
